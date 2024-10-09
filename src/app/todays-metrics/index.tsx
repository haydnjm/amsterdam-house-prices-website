import DataTile from "@/components/dataTile";
import { getData } from "../api/data/today";

export default async function TodaysMetrics() {
  const todaysMetrics = await getData();

  return (
    <>
      <h2 className="text-3xl mb-3">today (so far):</h2>
      <div className="flex -mx-2 flex-wrap">
        <DataTile
          title="the most new listings are in:"
          value={todaysMetrics.mostNewListingArea || "Unknown"}
        />
        <DataTile
          title="total houses listed:"
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
