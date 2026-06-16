/** Kangaroo from the welcome screen beach scene — shared by welcome background and joey pet. */
export function WelcomeBeachKangaroo() {
  return (
    <>
      <ellipse cx={0} cy={8} rx={14} ry={18} fill="#C4956A" />
      <circle cx={0} cy={-12} r={10} fill="#C4956A" />
      <ellipse cx={-14} cy={0} rx={5} ry={8} fill="#C4956A" />
      <path d="M -8 18 L -12 32 M 8 18 L 12 32" stroke="#C4956A" strokeWidth={4} strokeLinecap="round" />
      <circle cx={-3} cy={-14} r={2} fill="#2C3E50" />
    </>
  )
}
