import queries from "@/db/queries";
import {
  CACHE_DURATION_LONG,
  CACHE_DURATION_SHORT,
  _cachedListingsWithCoords,
  _cachedMonthlyHousePrice,
  _cachedOneMonthZoneDiffs,
  _cachedPurchasingTips,
  _cachedTodaysMetrics,
} from "@/cache";
import getTodaysListingsWithCoords from "../../../maps";

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
      new Date().getTime() + CACHE_DURATION_LONG;
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

  let purchasingTips;

  if (new Date().getTime() < _cachedPurchasingTips.expiration) {
    console.log("Cache hit for purchasingTips");
    purchasingTips = _cachedPurchasingTips.value;
  } else {
    console.log("Cache miss for purchasingTips");
    purchasingTips = await queries.getPurchasingTips();
    _cachedPurchasingTips.value = purchasingTips;
    _cachedPurchasingTips.expiration =
      new Date().getTime() + CACHE_DURATION_SHORT;
  }

  let todaysListingsWithCoords;

  if (new Date().getTime() < _cachedListingsWithCoords.expiration) {
    console.log("Cache hit for todaysListingsWithCoords");
    todaysListingsWithCoords = _cachedListingsWithCoords.value;
  } else {
    console.log("Cache miss for todaysListingsWithCoords");
    todaysListingsWithCoords = await getTodaysListingsWithCoords();
    _cachedListingsWithCoords.value = todaysListingsWithCoords;
    _cachedListingsWithCoords.expiration =
      new Date().getTime() + CACHE_DURATION_LONG;
  }

  return new Response(
    JSON.stringify({
      todaysMetrics,
      monthlyHousePrice,
      oneMonthZoneDiffs,
      purchasingTips,
      todaysListingsWithCoords,
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
