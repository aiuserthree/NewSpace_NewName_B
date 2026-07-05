/* shared.jsx — 공간 이름 공모전 공용 데이터 · 설정 · 저장소 · Shell · 헬퍼
   모든 페이지가 이 파일을 로드한다. (window 전역으로 노출) */

/* ------------------------------------------------------------------ *
 * 1. 설정 (CONFIG) — 임시 문구는 확정 후 이 곳만 교체하면 됩니다.
 * ------------------------------------------------------------------ */
window.SNC_CONFIG = {
  title: "공간 이름 공모전",
  church: "우리 교회",
  // ⚠️ 임시 마감일 — 공모 마감일 확정 후 교체 (열린 이슈 #2)
  deadline: "2026년 7월 25일(토) 밤 12시",
  deadlineShort: "7월 25일(토)까지",
  isTempDeadline: true,
  // ⚠️ 임시 개인정보 안내 문구 — 확정 후 교체 (열린 이슈 #5)
  privacyNotice:
    "입력하신 이름과 연락처는 공모 진행과 중복 확인을 위해서만 사용되며, 공모 종료 후 안전하게 파기됩니다.",
  isTempPrivacy: true,
  voteNotice:
    "제안해 주신 이름 중 상위 후보는 추후 현장 스티커 투표로 최종 결정됩니다.",
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
};
window.goPage = function (key, params) {
  const base = window.SNC_PAGES[key] || key;
  const q = params ? "?" + new URLSearchParams(params).toString() : "";
  window.location.href = base + q;
};

/* ------------------------------------------------------------------ *
 * 4. 저장소 (localStorage) — 핸드폰 번호를 고유 키로 사용
 *    데모 번호 010-0000-0000 은 항상 "기존 신청자"로 판별되도록 시드.
 * ------------------------------------------------------------------ */
window.SNC = (function () {
  const SUB_KEY = "snc.submissions.v1";
  const CUR_KEY = "snc.current.v1";
  const LAST_KEY = "snc.lastPhone.v1";
  const DEMO_PHONE = "01000000000";
  const DEMO_RECORD = {
    name: "김은혜",
    phone: "010-0000-0000",
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
  function readMap() {
    const m = parse(localStorage.getItem(SUB_KEY), {});
    if (!m[DEMO_PHONE]) {
      m[DEMO_PHONE] = DEMO_RECORD;
      try { localStorage.setItem(SUB_KEY, JSON.stringify(m)); } catch (e) {}
    }
    return m;
  }
  return {
    DEMO_PHONE,
    DEMO_RECORD,
    digits,
    find(phone) {
      const d = digits(phone);
      if (!d) return null;
      return readMap()[d] || null;
    },
    exists(phone) {
      return !!this.find(phone);
    },
    saveCurrent(obj) {
      try { localStorage.setItem(CUR_KEY, JSON.stringify(obj)); } catch (e) {}
    },
    readCurrent() {
      return parse(localStorage.getItem(CUR_KEY), null);
    },
    saveSubmission(rec) {
      const d = digits(rec.phone);
      const m = readMap();
      m[d] = Object.assign({}, rec, { submittedAt: new Date().toISOString() });
      try {
        localStorage.setItem(SUB_KEY, JSON.stringify(m));
        localStorage.setItem(LAST_KEY, d);
      } catch (e) {}
      return d;
    },
    lastPhone() {
      return localStorage.getItem(LAST_KEY) || "";
    },
    lastRecord() {
      const d = this.lastPhone();
      return d ? readMap()[d] || null : null;
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
window.isValidPhone = function (v) {
  return /^01[016789]\d{7,8}$/.test((v || "").replace(/\D/g, ""));
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
