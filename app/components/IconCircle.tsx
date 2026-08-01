export default function IconCircle({
  icon,
  bg,
  size = "md"
}: {
  icon: string;
  bg: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={`icon-circle icon-circle-${size}`} style={{ background: bg }}>
      {icon}
    </div>
  );
}
