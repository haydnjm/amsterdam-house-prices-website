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
          title="average listing price:"
          value={`€${
            (Number(todaysMetrics.averagePrice) / 1000).toFixed(0) || "?"
          }k`}
        />
        <DataTile
          title="average price per m&sup2; (ppm&sup2;):"
          value={`€${todaysMetrics.averagePricePerM2?.toFixed(0) || "?"}`}
        />
      </div>
    </>
  );
}
