import ZoneTicker from "@/components/zoneTicker";

export default function Loading() {
  return (
    <ZoneTicker
      oneMonthZoneDiffs={[{ zone: "...", thisMonth: 0, lastMonth: 0 }]}
    />
  );
}
