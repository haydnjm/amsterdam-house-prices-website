import queries from "@/db/queries";
import {
  CACHE_DURATION_LONG,
  CACHE_DURATION_SHORT,
  _cachedMonthlyHousePrice,
  _cachedOneMonthZoneDiffs,
  _cachedTodaysMetrics,
} from "@/cache";

export async function GET(): Promise<Response> {
  let todaysMetrics;

  if (new Date().getTime() < _cachedTodaysMetrics.expiration) {
    console.log("Cache hit for todaysMetrics");
    todaysMetrics = _cachedTodaysMetrics.value;
  } else {
    console.log("Cache miss for todaysMetrics");
    todaysMetrics = await queries.getTodaysMetrics();
    _cachedTodaysMetrics.value = todaysMetrics;
    _cachedTodaysMetrics.expiration =
      new Date().getTime() + CACHE_DURATION_SHORT;
  }

  let monthlyHousePrice;

  if (new Date().getTime() < _cachedMonthlyHousePrice.expiration) {
    console.log("Cache hit for monthlyHousePrice");
    monthlyHousePrice = _cachedMonthlyHousePrice.value;
  } else {
    console.log("Cache miss for monthlyHousePrice");
    monthlyHousePrice = await queries.monthlyHousePrice();
    _cachedMonthlyHousePrice.value = monthlyHousePrice;
    _cachedMonthlyHousePrice.expiration =
      new Date().getTime() + CACHE_DURATION_SHORT;
  }

  let oneMonthZoneDiffs;

  if (new Date().getTime() < _cachedOneMonthZoneDiffs.expiration) {
    console.log("Cache hit for oneMonthZoneDiffs");
    oneMonthZoneDiffs = _cachedOneMonthZoneDiffs.value;
  } else {
    console.log("Cache miss for oneMonthZoneDiffs");
    oneMonthZoneDiffs = await queries.getOneMonthZoneDiffs();
    _cachedOneMonthZoneDiffs.value = oneMonthZoneDiffs;
    _cachedOneMonthZoneDiffs.expiration =
      new Date().getTime() + CACHE_DURATION_LONG;
  }

  await queries.getOneMonthZoneDiffs();

  return new Response(
    JSON.stringify({ todaysMetrics, monthlyHousePrice, oneMonthZoneDiffs }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
