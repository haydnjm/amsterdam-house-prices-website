import { getData } from "@/api/utils";
import _cache, { CACHE_DURATION_SHORT } from "@/cache";
import getTodaysListingsWithCoords, {
  ListingWithCoords,
} from "../../../../maps";

export async function GET(): Promise<Response> {
  const listingsData = await getData<ListingWithCoords[]>(
    getTodaysListingsWithCoords,
    _cache._cachedListingsWithCoords,
    CACHE_DURATION_SHORT
  );

  return new Response(
    JSON.stringify({
      todaysListingsWithCoords: listingsData,
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
