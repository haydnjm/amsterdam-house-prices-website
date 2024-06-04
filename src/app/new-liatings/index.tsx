import { ListingWithCoords } from "@/maps";
import NewListingsComponent from "@/components/newListingsOverview";

export default async function NewListings() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/data/listings-with-coords`,
    {
      cache: "no-cache",
    }
  );
  const json = await data.json();
  const markers = json.todaysListingsWithCoords as ListingWithCoords[];

  return <NewListingsComponent markers={markers} />;
}
