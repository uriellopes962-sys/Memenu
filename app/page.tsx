import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import PlanApp from "@/app/components/PlanApp";

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return <PlanApp username={session.username} />;
}
