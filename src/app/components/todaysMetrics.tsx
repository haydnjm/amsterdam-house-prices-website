import { TodaysMetrics as TTodaysMetrics } from "@/db/queries/todaysMetrics";
import DataTile from "./dataTile";

export default function TodaysMetrics({
  todaysMetrics,
}: {
  todaysMetrics: TTodaysMetrics;
}) {
  return (
    <>
      <h2 className="text-3xl mb-3">today (so far):</h2>
      <div className="flex -mx-2">
        <DataTile
          title="the most new listings are in:"
          value={todaysMetrics.mostNewListingArea || "Unknown"}
        />
        <DataTile
          title="the amount of houses listed:"
          value={todaysMetrics.listingsToday?.toString() || "Unknown"}
        />
        <DataTile
          title="the average listing price for the houses listed:"
          value={`€${
            (Number(todaysMetrics.averagePrice) / 1000).toFixed(0) || "?"
          }k`}
        />
        <DataTile
          title="the average price per m2 for the houses listed:"
          value={`€${todaysMetrics.averagePricePerM2?.toFixed(0) || "?"}`}
        />
      </div>
    </>
  );
}
