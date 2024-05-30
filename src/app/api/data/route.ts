import queries from "@/db/queries";
import { CACHE_DURATION, _cachedTodaysMetrics } from "@/cache";

export async function GET(): Promise<Response> {
  console.log("Attempting to get today's metrics");

  let res;

  if (new Date().getTime() < _cachedTodaysMetrics.expiration) {
    console.log("Cache hit");
    res = _cachedTodaysMetrics.value;
  } else {
    console.log("Cache miss");
    res = await queries.getTodayMetrics();
    _cachedTodaysMetrics.value = res;
    _cachedTodaysMetrics.expiration = new Date().getTime() + CACHE_DURATION;
  }

  return new Response(JSON.stringify({ todaysMetrics: res }), {
    headers: { "content-type": "application/json" },
  });
}
