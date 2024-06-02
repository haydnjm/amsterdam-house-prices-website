import { House } from "../db/bigQueryClient";
import { getTodaysListings } from "../db/queries/todaysMetrics";

export type LatLng = {
  lat: number;
  lng: number;
};

export type ListingWithCoords = House & { coords: LatLng };

async function convertPostcodeToCoords(postcode: string): Promise<LatLng> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode},NL&key=${process.env.PRIVATE_GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();
  if (data?.results?.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  }
  throw new Error("Unable to find postcode");
}

async function getTodaysListingsWithCoords(): Promise<ListingWithCoords[]> {
  try {
    const todaysListings = await getTodaysListings();
    const listingsWithCoords = await Promise.all(
      todaysListings.map(async (listing) => {
        return {
          ...listing,
          coords: await convertPostcodeToCoords(listing.postal_code),
        };
      })
    );
    return listingsWithCoords;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getTodaysListingsWithCoords;
