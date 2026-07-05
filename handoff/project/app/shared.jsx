/* shared.jsx — 공간 이름 공모전 공용 데이터 · 설정 · 저장소 · Shell · 헬퍼
   모든 페이지가 이 파일을 로드한다. (window 전역으로 노출) */

/* ------------------------------------------------------------------ *
 * 1. 설정 (CONFIG) — 임시 문구는 확정 후 이 곳만 교체하면 됩니다.
 * ------------------------------------------------------------------ */
window.SNC_CONFIG = {
  title: "영암교회 새 공간 이름 공모전",
  church: "우리 교회",
  // ⚠️ 임시 마감일 — 공모 마감일 확정 후 교체 (열린 이슈 #2)
  deadline: "2026년 7월 25일(토) 밤 12시",
  deadlineShort: "7월 25일(토)까지",
  isTempDeadline: true,
  // ⚠️ 임시 개인정보 안내 문구 — 확정 후 교체 (열린 이슈 #5)
  privacyNotice:
    "입력하신 이름, 연락처, 소속(선택)은 공모 진행과 중복 확인을 위해서만 사용되며, 공모 종료 후 안전하게 파기됩니다.",
  isTempPrivacy: true,
  privacyTerms: {
    title: "개인정보 수집·이용 동의",
    updatedAt: "2026년 7월 5일",
    sections: [
      {
        heading: "1. 수집·이용 목적",
        body: "공간 이름 공모전 참여 접수, 중복 신청 확인, 공모 진행 안내 및 결과 통보",
      },
      {
        heading: "2. 수집 항목",
        body: "이름, 연락처(휴대전화 번호), 소속(선택)",
      },
      {
        heading: "3. 보유·이용 기간",
        body: "공모 종료 후 30일 이내 파기 (관련 법령에 따라 보관이 필요한 경우 해당 기간까지 보관)",
      },
      {
        heading: "4. 동의 거부 권리",
        body: "개인정보 수집·이용에 동의하지 않을 권리가 있으나, 동의하지 않을 경우 공모 참여가 제한될 수 있습니다.",
      },
      {
        heading: "5. 문의",
        body: "개인정보 처리와 관련한 문의는 교회 사무실로 연락해 주세요.",
      },
    ],
  },
  voteNotice:
    "제안해 주신 이름 중 상위 후보는 추후 현장 스티커 투표로 최종 결정됩니다.",
  phoneCorrectionNotice: {
    title: "이름과 연락처를 잘못 입력하셨나요?",
    body: "신청 내용 확인은 이름과 연락처가 모두 일치해야 합니다. 제출 후에는 웹에서 직접 수정할 수 없으므로, 공모 기간 중 최에스겔 목사(010-8255-6308) 에게 연락해 주시면 신청 정보를 확인·수정해 드립니다.",
    contactLabel: "문의",
    contact: "최에스겔 목사(010-8255-6308)",
    isTempContact: false,
  },
  checkEntryGuide:
    "공모 참여 시 입력한 이름과 연락처가 모두 일치해야 신청 내용을 확인할 수 있어요.",
};

/* ------------------------------------------------------------------ *
 * 2. 공모 대상 공간 (본당 → 소예배실 → 새가족부실)
 *    ※ 예시 이름은 제공하지 않는다 (창의성 저해 방지) → placeholder는 중립적으로.
 * ------------------------------------------------------------------ */
window.CONTEST_SPACES = [
  {
    id: "bondang",
    order: "①",
    name: "본당",
    tagline: "신축 · 조감도",
    description: "새로 짓는 본당입니다. 조감도를 보며 어울리는 이름을 함께 상상해 주세요.",
    image: "images/bondang.png",
    icon: "church",
  },
  {
    id: "soyebae",
    order: "②",
    name: "소예배실",
    tagline: "리모델링 · 사진",
    description: "청년과 청소년을 위한 액티브한 공간입니다.",
    image: "images/soyebae.png",
    icon: "heart",
  },
  {
    id: "saega",
    order: "③",
    name: "새가족부실",
    tagline: "리모델링 · 사진",
    description: "새가족을 처음 맞이하는 따뜻한 공간입니다.",
    image: "images/saega.png",
    icon: "users",
  },
];

window.getSpaceImages = function getSpaceImages(space) {
  if (!space) return [];
  if (Array.isArray(space.images) && space.images.length > 0) return space.images;
  return space.image ? [space.image] : [];
};

window.SNC_INPUT = {
  requiredPlaceholder: "떠오르는 이름을 적어주세요",
  optionalPlaceholder: "한 개 더 제안할 수 있어요",
};

/* ------------------------------------------------------------------ *
 * 3. 페이지 라우팅 (각 페이지는 단독 실행 — 실제 페이지 이동으로 연결)
 * ------------------------------------------------------------------ */
window.SNC_PAGES = {
  intro: "P0-intro.html",
  apply: "P1-apply.html",
  submit: "P2-submit.html",
  complete: "P3-complete.html",
  lookup: "P4-lookup.html",
  check: "P5-check.html",
  admin: "P6-admin.html",
};
window.goPage = function (key, params) {
  const base = window.SNC_PAGES[key] || key;
  const q = params ? "?" + new URLSearchParams(params).toString() : "";
  window.location.href = base + q;
};

/* ------------------------------------------------------------------ *
 * 4. 저장소 — Supabase(원격) + localStorage(세션/폴백)
 *    고유 키: 이름 + 연락처 조합
 * ------------------------------------------------------------------ */
window.SNC = (function () {
  const SUB_KEY = "snc.submissions.v2";
  const CUR_KEY = "snc.current.v1";
  const LAST_KEY = "snc.lastKey.v2";
  const LAST_REC_KEY = "snc.lastRecord.v1";
  const DEMO_PHONE = "01000000000";
  const DEMO_NAME = "김은혜";
  const DEMO_RECORD = {
    name: DEMO_NAME,
    affiliation: "청년부",
    phone: DEMO_PHONE,
    submittedAt: "2026-07-04T10:24:00",
    demo: true,
    spaces: {
      bondang: { required: "빛나는 성전", optional: "은혜의 뜰" },
      soyebae: { required: "청년의 다락방", optional: "" },
      saega: { required: "만남의 방", optional: "첫걸음실" },
    },
  };
  const parse = (s, f) => {
    try {
      const v = JSON.parse(s);
      return v == null ? f : v;
    } catch (e) {
      return f;
    }
  };
  const digits = (v) => (v || "").replace(/\D/g, "");
  const normalizeName = (v) => (v || "").trim().replace(/\s+/g, " ");
  const makeKey = (name, phone) => `${normalizeName(name)}|${digits(phone)}`;
  const useRemote = () => window.SNC_DB && window.SNC_DB.isConfigured();

  function readMap() {
    const m = parse(localStorage.getItem(SUB_KEY), {});
    const demoKey = makeKey(DEMO_NAME, DEMO_PHONE);
    if (!m[demoKey]) {
      m[demoKey] = DEMO_RECORD;
      try { localStorage.setItem(SUB_KEY, JSON.stringify(m)); } catch (e) {}
    }
    return m;
  }

  function findLocal(name, phone) {
    const key = makeKey(name, phone);
    if (!key || key === "|") return null;
    return readMap()[key] || null;
  }

  return {
    DEMO_PHONE,
    DEMO_NAME,
    DEMO_RECORD,
    digits,
    normalizeName,
    makeKey,
    useRemote,
    lookupParams(name, phone) {
      return { name: normalizeName(name), phone: digits(phone) };
    },
    async find(name, phone) {
      if (useRemote()) {
        try {
          return await window.SNC_DB.find(name, phone);
        } catch (e) {
          console.error("[SNC] find remote failed", e);
          throw e;
        }
      }
      return findLocal(name, phone);
    },
    async exists(name, phone) {
      if (useRemote()) {
        try {
          return await window.SNC_DB.exists(name, phone);
        } catch (e) {
          console.error("[SNC] exists remote failed", e);
          throw e;
        }
      }
      return !!findLocal(name, phone);
    },
    saveCurrent(obj) {
      try { localStorage.setItem(CUR_KEY, JSON.stringify(obj)); } catch (e) {}
    },
    readCurrent() {
      return parse(localStorage.getItem(CUR_KEY), null);
    },
    async saveSubmission(rec) {
      const normalized = {
        name: normalizeName(rec.name),
        phone: digits(rec.phone),
        affiliation: (rec.affiliation || "").trim(),
        spaces: rec.spaces || {},
      };
      let saved;
      if (useRemote()) {
        saved = await window.SNC_DB.saveSubmission(normalized);
      } else {
        const key = makeKey(normalized.name, normalized.phone);
        const m = readMap();
        saved = Object.assign({}, normalized, { submittedAt: new Date().toISOString() });
        m[key] = saved;
        try { localStorage.setItem(SUB_KEY, JSON.stringify(m)); } catch (e) {}
      }
      try {
        localStorage.setItem(LAST_KEY, makeKey(saved.name, saved.phone));
        localStorage.setItem(LAST_REC_KEY, JSON.stringify(saved));
      } catch (e) {}
      return saved;
    },
    lastKey() {
      return localStorage.getItem(LAST_KEY) || "";
    },
    lastRecord() {
      const cached = parse(localStorage.getItem(LAST_REC_KEY), null);
      if (cached) return cached;
      const key = this.lastKey();
      return key ? readMap()[key] || null : null;
    },
  };
})();

/* ------------------------------------------------------------------ *
 * 5. 헬퍼 — 전화번호 포맷/검증, 날짜
 * ------------------------------------------------------------------ */
window.formatPhone = function (v) {
  const d = (v || "").replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 7) return d.slice(0, 3) + "-" + d.slice(3);
  if (d.length < 11) return d.slice(0, 3) + "-" + d.slice(3, 6) + "-" + d.slice(6);
  return d.slice(0, 3) + "-" + d.slice(3, 7) + "-" + d.slice(7);
};
window.normalizePhoneInput = function (v) {
  return (v || "").replace(/\D/g, "").slice(0, 11);
};
window.MOBILE_PREFIXES = ["010", "011", "016", "017", "018", "019"];
window.validatePhone = function (v) {
  const d = (v || "").replace(/\D/g, "");

  if (d.length === 0) {
    return { valid: false, error: "연락처를 입력해 주세요." };
  }
  if (d.length < 10 || d.length > 11) {
    return { valid: false, error: "연락처는 10~11자리 숫자로 입력해 주세요." };
  }

  const prefix = d.slice(0, 3);
  if (!window.MOBILE_PREFIXES.includes(prefix)) {
    return { valid: false, error: "사용할 수 없는 휴대전화 앞자리 번호입니다." };
  }

  if (prefix === "010" && d.length !== 11) {
    return { valid: false, error: "010 번호는 11자리로 입력해 주세요." };
  }
  if (prefix !== "010" && d.length !== 10) {
    return { valid: false, error: "연락처는 10~11자리 숫자로 입력해 주세요." };
  }

  return { valid: true, error: null };
};
window.isValidPhone = function (v) {
  return window.validatePhone(v).valid;
};
window.formatSubmittedAt = function (iso) {
  if (!iso) return "";
  const dt = new Date(iso);
  if (isNaN(dt)) return "";
  const p = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}. ${p(dt.getMonth() + 1)}. ${p(dt.getDate())} ${p(dt.getHours())}:${p(dt.getMinutes())}`;
};

/* ------------------------------------------------------------------ *
 * 6. Shell — 모바일 웹 프레임 (데스크톱에서는 중앙 정렬된 폰 컬럼)
 * ------------------------------------------------------------------ */
function Shell({ children }) {
  const { Icon } = window.HarvestDesignSystem_eb006c;
  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          background: "var(--surface-page)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0 0 80px rgba(227, 214, 197, 0.45)",
        }}
      >
        <header
          onClick={() => window.goPage("intro")}
          style={{
            height: 54,
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            borderBottom: "1px solid var(--border-divider)",
            background: "var(--surface-page)",
            position: "sticky",
            top: 0,
            zIndex: 20,
            cursor: "pointer",
          }}
        >
          <span style={{ color: "var(--accent)", display: "inline-flex" }}>
            <Icon name="church" size={19} />
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            {window.SNC_CONFIG.title}
          </span>
        </header>
        <main style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>{children}</main>
      </div>
    </div>
  );
}

window.Shell = Shell;

/* ------------------------------------------------------------------ *
 * 7. 이름·연락처 오입력 안내 — 공모 기간 중 사무실/담당자 수동 확인·수정
 * ------------------------------------------------------------------ */
function PhoneCorrectionNotice({ compact = false }) {
  const { Notice } = window.HarvestDesignSystem_eb006c;
  const n = window.SNC_CONFIG.phoneCorrectionNotice;

  return (
    <Notice tone="info" icon="info" title={compact ? undefined : n.title} style={compact ? { padding: "12px 14px" } : undefined}>
      {compact ? (
        <>
          <strong style={{ color: "var(--text-primary)" }}>{n.title}</strong>
          {" "}
          {n.body}
        </>
      ) : (
        n.body
      )}
      <br /><br />
      <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{n.contactLabel}</span>
      {" · "}
      {n.contact}
      {n.isTempContact ? (
        <>
          <br />
          <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>※ 담당자 연락처는 확정 후 안내 예정입니다.</span>
        </>
      ) : null}
    </Notice>
  );
}

window.PhoneCorrectionNotice = PhoneCorrectionNotice;
