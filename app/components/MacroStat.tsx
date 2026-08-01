import IconCircle from "@/app/components/IconCircle";

export default function MacroStat({
  icon,
  bg,
  value,
  label
}: {
  icon: string;
  bg: string;
  value: string;
  label: string;
}) {
  return (
    <div className="macro-card">
      <IconCircle icon={icon} bg={bg} size="sm" />
      <div className="macro-val">{value}</div>
      <div className="macro-label">{label}</div>
    </div>
  );
}
