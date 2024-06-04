import NewListingsComponent from "@/components/newListingsOverview";
import { getData } from "../api/data/listings-with-coords";

export default async function NewListings() {
  const markers = await getData();

  return <NewListingsComponent markers={markers} />;
}
