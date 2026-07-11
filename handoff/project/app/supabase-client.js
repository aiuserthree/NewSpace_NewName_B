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

  function mapRpcError(error, context) {
    if (!error) return error;
    const msg = String(error.message || "");
    const code = String(error.code || "");
    if (code === "PGRST202" || msg.includes("Could not find the function")) {
      const err = new Error("RPC_NOT_DEPLOYED");
      err.code = "RPC_NOT_DEPLOYED";
      err.detail = msg;
      err.context = context;
      return err;
    }
    if (msg.includes("DEADLINE_PASSED")) {
      const err = new Error("DEADLINE_PASSED");
      err.code = "DEADLINE_PASSED";
      err.detail = msg;
      return err;
    }
    if (msg.includes("PHONE_DUPLICATE")) {
      const err = new Error("PHONE_DUPLICATE");
      err.code = "PHONE_DUPLICATE";
      err.detail = msg;
      return err;
    }
    return error;
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
    // Anon role may INSERT but not SELECT (RLS). Do not chain .select() here.
    const { error } = await sb.from("submissions").insert(payload);
    if (error) {
      if (error.code === "23505") {
        const dup = new Error("DUPLICATE");
        dup.code = "DUPLICATE";
        throw dup;
      }
      throw error;
    }
    return mapRow({
      ...payload,
      submitted_at: new Date().toISOString(),
    });
  }

  async function updateSubmission(rec) {
    const sb = getClient();
    if (!sb) throw new Error("Supabase가 설정되지 않았습니다.");
    const payload = {
      p_name: window.SNC.normalizeName(rec.name),
      p_phone: window.SNC.digits(rec.phone),
      p_name_new: window.SNC.normalizeName(rec.nameNew != null ? rec.nameNew : rec.name),
      p_phone_new: window.SNC.digits(rec.phoneNew != null ? rec.phoneNew : rec.phone),
      p_affiliation: (rec.affiliation || "").trim(),
      p_spaces: rec.spaces || {},
    };
    const { data, error } = await sb.rpc("update_submission", payload);
    if (error) {
      console.error("[SNC_DB] update_submission RPC failed", { payload, error });
      throw mapRpcError(error, "update_submission");
    }
    if (!data) {
      const err = new Error("NOT_FOUND");
      err.code = "NOT_FOUND";
      throw err;
    }
    return mapRow(data);
  }

  function isAuthError(error) {
    if (!error) return false;
    const msg = String(error.message || "").toLowerCase();
    return error.status === 401
      || (error.status === 400 && msg.includes("refresh token"))
      || error.name === "AuthApiError"
      || msg.includes("jwt")
      || error.code === "PGRST301";
  }

  async function listAll() {
    const sb = getClient();
    if (!sb) return [];
    const { data, error } = await sb
      .from("submissions")
      .select("id, name, phone, affiliation, spaces, submitted_at")
      .order("submitted_at", { ascending: false });
    if (error) {
      if (isAuthError(error)) {
        await signOut();
        const err = new Error("SESSION_EXPIRED");
        err.code = "SESSION_EXPIRED";
        throw err;
      }
      throw error;
    }
    return (data || []).map(mapRow);
  }

  function subscribe(onChange, onStatus) {
    const sb = getClient();
    if (!sb) return null;
    const channel = sb.channel("admin-submissions");
    ["INSERT", "UPDATE", "DELETE"].forEach((event) => {
      channel.on(
        "postgres_changes",
        { event, schema: "public", table: "submissions" },
        (payload) => {
          if (onChange) onChange({ event, payload });
        }
      );
    });
    channel.subscribe((status, err) => {
      if (onStatus) onStatus(status, err);
      if (status === "SUBSCRIBED") {
        console.info("[SNC_DB] realtime subscribed (INSERT/UPDATE/DELETE)");
      } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error("[SNC_DB] realtime subscription failed", status, err);
      }
    });
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
    const { data: userData, error: userError } = await sb.auth.getUser();
    if (userError || !userData.user) {
      if (userError && isAuthError(userError)) await signOut();
      return null;
    }
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

  return {
    isConfigured,
    configStatus,
    getClient,
    mapRow,
    find,
    exists,
    saveSubmission,
    updateSubmission,
    listAll,
    subscribe,
    signIn,
    signOut,
    getSession,
    isAdmin,
  };
})();
