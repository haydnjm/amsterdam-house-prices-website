import NewListingsComponent from "@/components/newListingsOverview";
import { getData } from "../api/data/listings-with-coords";
import { getTodaysListings } from "../../db/queries/todaysMetrics";

export default async function NewListings() {
  const markers = await getData(0);
  const totalMarkerCount = (await getTodaysListings()).length;

  return (
    <NewListingsComponent
      initialMarkers={markers}
      totalMarkerCount={totalMarkerCount}
    />
  );
}
