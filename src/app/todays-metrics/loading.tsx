import DataTile from "@/components/dataTile";
import ZoneTicker from "@/components/zoneTicker";

export default function Loading() {
  return (
    <>
      <h2 className="text-3xl mb-3">today (so far):</h2>
      <div className="flex -mx-2">
        <DataTile title="the most new listings are in:" value={"..."} loading />
        <DataTile title="the amount of houses listed:" value={"..."} loading />
        <DataTile title="average listing price:" value={"..."} loading />
        <DataTile
          title="average price per m&sup2; (ppm&sup2;):"
          value={"..."}
          loading
        />
      </div>
    </>
  );
}
