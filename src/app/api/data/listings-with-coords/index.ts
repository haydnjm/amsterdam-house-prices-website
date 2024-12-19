"use server";

import { fetchData } from "@/api/utils";
import _cache from "@/cache";
import getTodaysListingsWithCoords, { ListingWithCoords } from "@/maps";

export async function getData(page: number): Promise<ListingWithCoords[]> {
  return fetchData<ListingWithCoords[]>(
    () => getTodaysListingsWithCoords(page),
    _cache._cachedListingsWithCoords,
    0,
    "listings with coords"
  );
}
