import HomeLanding from "@/components/HomeLanding";
import { loadHome } from "@/lib/loadHome";

export default async function Page() {
  const homeContent = loadHome();

  return <HomeLanding content={homeContent} />;
}
