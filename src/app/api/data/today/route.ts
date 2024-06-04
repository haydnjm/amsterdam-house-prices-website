import { getData } from "@/api/utils";
import _cache, { CACHE_DURATION_SHORT } from "@/cache";
import queries from "@/db/queries";
import { TodaysMetrics } from "@/db/queries/todaysMetrics";

export async function GET(): Promise<Response> {
  const data = await getData<TodaysMetrics>(
    queries.getTodaysMetrics,
    _cache._cachedTodaysMetrics,
    CACHE_DURATION_SHORT
  );

  return new Response(
    JSON.stringify({
      todaysMetrics: data,
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
