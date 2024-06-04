import { fetchData } from "@/api/utils";
import _cache, { CACHE_DURATION_SHORT } from "@/cache";
import getTodaysListingsWithCoords, { ListingWithCoords } from "@/maps";

export async function getData(): Promise<ListingWithCoords[]> {
  return fetchData<ListingWithCoords[]>(
    getTodaysListingsWithCoords,
    _cache._cachedListingsWithCoords,
    CACHE_DURATION_SHORT
  );
}
