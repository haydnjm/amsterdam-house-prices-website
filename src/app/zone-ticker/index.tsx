import { OneMonthZoneDiff } from "@/db/queries/oneMonthZoneDiffs";
import ZoneTickerComponent from "@/components/zoneTicker";

export default async function ZoneTicker() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/data/zone-diffs`,
    {
      cache: "no-cache",
    }
  );
  const oneMonthZoneDiffs = (await data.json())
    .oneMonthZoneDiffs as OneMonthZoneDiff[];

  return <ZoneTickerComponent oneMonthZoneDiffs={oneMonthZoneDiffs} />;
}
