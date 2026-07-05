/* LookupScreen — read-only view of a submission, reached from the duplicate
   notice or the completion screen. */

function LookupScreen({ applicant, submission, onHome }) {
  const { Button, Icon } = window.HarvestDesignSystem_eb006c;
  const spaces = window.CONTEST_SPACES;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "24px 26px 4px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-heading-lg)", fontWeight: 600, letterSpacing: "0.015em", color: "var(--text-primary)" }}>
            제출하신 내용
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", letterSpacing: "0.015em", color: "var(--text-secondary)" }}>
            읽기 전용 · 제출은 최종 완료되었습니다.
          </p>
        </div>

        {/* Applicant summary */}
        <div style={{ display: "flex", gap: 20, background: "var(--surface-card)", borderRadius: "var(--radius-2xl)", padding: "14px 18px", boxShadow: "var(--shadow-sm)" }}>
          <SummaryItem icon="user" label="이름" value={applicant.name} />
          <div style={{ width: 1, background: "var(--border-divider)" }}></div>
          <SummaryItem icon="phone" label="연락처" value={applicant.phone} />
        </div>
      </div>

      <div style={{ padding: "16px 26px 8px", display: "flex", flexDirection: "column", gap: 16 }}>
        {spaces.map((sp) => (
          <SpaceCard key={sp.id} space={sp} values={submission[sp.id]} readOnly />
        ))}
      </div>

      <div style={{ padding: "10px 26px 34px" }}>
        <Button variant="ghost" size="md" fullWidth leftIcon="arrow-left" onClick={onHome}>
          처음으로
        </Button>
      </div>
    </div>
  );
}

function SummaryItem({ icon, label, value }) {
  const { Icon } = window.HarvestDesignSystem_eb006c;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
        <Icon name={icon} size={13} /> {label}
      </span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-body)", fontWeight: 500, letterSpacing: "0.015em", color: "var(--text-primary)" }}>{value}</span>
    </div>
  );
}

window.LookupScreen = LookupScreen;
