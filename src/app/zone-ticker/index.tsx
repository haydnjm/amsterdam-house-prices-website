import ZoneTickerComponent from "@/components/zoneTicker";
import { getData } from "../api/data/zone-diffs";

export default async function ZoneTicker() {
  const oneMonthZoneDiffs = await getData();

  return <ZoneTickerComponent oneMonthZoneDiffs={oneMonthZoneDiffs} />;
}
