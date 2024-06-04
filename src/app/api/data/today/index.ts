import { fetchData } from "@/api/utils";
import _cache, { CACHE_DURATION_SHORT } from "@/cache";
import queries from "@/db/queries";
import { TodaysMetrics } from "@/db/queries/todaysMetrics";

export async function getData(): Promise<TodaysMetrics> {
  return fetchData<TodaysMetrics>(
    queries.getTodaysMetrics,
    _cache._cachedTodaysMetrics,
    CACHE_DURATION_SHORT
  );
}
