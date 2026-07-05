/* supabase-client.js — Supabase 클라이언트 · DB API (사용자 + 관리자) */

window.SNC_DB = (function () {
  let client = null;

  function cfg() {
    return window.SUPABASE_CONFIG || {};
  }

  function getLib() {
    return window.supabase && window.supabase.createClient ? window.supabase : null;
  }

  function getClient() {
    const { url, anonKey } = cfg();
    const lib = getLib();
    if (!url || !anonKey || !lib) return null;
    if (!client) {
      client = lib.createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    }
    return client;
  }

  function isConfigured() {
    const { url, anonKey } = cfg();
    return Boolean(url && anonKey && getLib());
  }

  function configStatus() {
    const { url, anonKey } = cfg();
    if (!url || !anonKey) return "missing-config";
    if (!getLib()) return "missing-sdk";
    return "ready";
  }

  function mapRow(row) {
    if (!row) return null;
    return {
      id: row.id,
      name: row.name,
      phone: row.phone,
      affiliation: row.affiliation || "",
      spaces: row.spaces || {},
      submittedAt: row.submitted_at || row.submittedAt,
    };
  }

  async function find(name, phone) {
    const sb = getClient();
    if (!sb) return null;
    const { data, error } = await sb.rpc("lookup_submission", {
      p_name: name,
      p_phone: phone,
    });
    if (error) throw error;
    return mapRow(data);
  }

  async function exists(name, phone) {
    const sb = getClient();
    if (!sb) return false;
    const { data, error } = await sb.rpc("submission_exists", {
      p_name: name,
      p_phone: phone,
    });
    if (error) throw error;
    return !!data;
  }

  async function saveSubmission(rec) {
    const sb = getClient();
    if (!sb) throw new Error("Supabase가 설정되지 않았습니다.");
    const payload = {
      name: window.SNC.normalizeName(rec.name),
      phone: window.SNC.digits(rec.phone),
      affiliation: (rec.affiliation || "").trim(),
      spaces: rec.spaces || {},
    };
    const { data, error } = await sb.from("submissions").insert(payload).select().single();
    if (error) {
      if (error.code === "23505") {
        const dup = new Error("DUPLICATE");
        dup.code = "DUPLICATE";
        throw dup;
      }
      throw error;
    }
    return mapRow(data);
  }

  async function listAll() {
    const sb = getClient();
    if (!sb) return [];
    const { data, error } = await sb
      .from("submissions")
      .select("id, name, phone, affiliation, spaces, submitted_at")
      .order("submitted_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(mapRow);
  }

  function subscribe(onChange) {
    const sb = getClient();
    if (!sb) return null;
    const channel = sb
      .channel("admin-submissions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "submissions" },
        () => onChange()
      )
      .subscribe();
    return channel;
  }

  async function signIn(email, password) {
    const sb = getClient();
    if (!sb) throw new Error("Supabase가 설정되지 않았습니다.");
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async function signOut() {
    const sb = getClient();
    if (!sb) return;
    await sb.auth.signOut();
  }

  async function getSession() {
    const sb = getClient();
    if (!sb) return null;
    const { data } = await sb.auth.getSession();
    return data.session;
  }

  async function isAdmin() {
    const sb = getClient();
    if (!sb) return false;
    const session = await getSession();
    if (!session) return false;
    const { data, error } = await sb
      .from("admin_profiles")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle();
    if (error) throw error;
    return !!data;
  }

  async function clearAllSubmissions() {
    const sb = getClient();
    if (!sb) throw new Error("Supabase가 설정되지 않았습니다.");
    const admin = await isAdmin();
    if (!admin) throw new Error("관리자 권한이 필요합니다.");
    const { data, error } = await sb.rpc("clear_all_submissions");
    if (error) throw error;
    return data || 0;
  }

  return {
    isConfigured,
    configStatus,
    getClient,
    mapRow,
    find,
    exists,
    saveSubmission,
    listAll,
    subscribe,
    signIn,
    signOut,
    getSession,
    isAdmin,
    clearAllSubmissions,
  };
})();
