import DataTile from "./components/dataTile";

export default function Loading() {
  return (
    <>
      <h2 className="text-3xl mb-3">today (so far):</h2>
      <div className="flex -mx-2">
        <DataTile title="the most new listings are in:" value={"..."} loading />
        <DataTile title="the amount of houses listed:" value={"..."} loading />
        <DataTile
          title="the average listing price for the houses listed:"
          value={"..."}
          loading
        />
        <DataTile
          title="the average price per m2 for the houses listed:"
          value={"..."}
          loading
        />
      </div>
    </>
  );
}
