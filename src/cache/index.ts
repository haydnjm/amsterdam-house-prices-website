import { TodaysMetrics } from "@/db/queries/todaysMetrics";
import { MonthlyHousePrice } from "../db/queries/monthlyHousePrice";
import {
  testListingsWithCoords,
  testMonthlyHousePrice,
  testOneMonthZoneDiffs,
  testPurchasingTips,
  testTodaysMetrics,
} from "./testData";
import { OneMonthZoneDiff } from "../db/queries/oneMonthZoneDiffs";
import { PurchasingTipData } from "../db/queries/purchasingTips";
import { ListingWithCoords } from "../maps";

export const CACHE_DURATION_SHORT = process.env.CACHE_DURATION_SHORT
  ? Number(process.env.CACHE_DURATION_SHORT)
  : 1000 * 60 * 60 * 2; // 120 minutes
export const CACHE_DURATION_LONG = process.env.CACHE_DURATION_LONG
  ? Number(process.env.CACHE_DURATION_LONG)
  : 1000 * 60 * 60 * 24; // 1 day

type CacheEntry<T> = {
  /** timestamp */
  expiration: number;
  value: T | undefined;
};

// const _cachedTodaysMetrics = testTodaysMetrics;
const _cachedTodaysMetrics: CacheEntry<TodaysMetrics> = {
  expiration: 0,
  value: undefined,
};

// const _cachedMonthlyHousePrice = testMonthlyHousePrice;
const _cachedMonthlyHousePrice: CacheEntry<MonthlyHousePrice> = {
  expiration: 0,
  value: undefined,
};

// const _cachedOneMonthZoneDiffs = testOneMonthZoneDiffs;
const _cachedOneMonthZoneDiffs: CacheEntry<OneMonthZoneDiff[]> = {
  expiration: 0,
  value: undefined,
};

// const _cachedPurchasingTips = testPurchasingTips;
const _cachedPurchasingTips: CacheEntry<PurchasingTipData> = {
  expiration: 0,
  value: undefined,
};

// const _cachedListingsWithCoords = testListingsWithCoords;
const _cachedListingsWithCoords: CacheEntry<ListingWithCoords[]> = {
  expiration: 0,
  value: undefined,
};

export {
  _cachedTodaysMetrics,
  _cachedMonthlyHousePrice,
  _cachedOneMonthZoneDiffs,
  _cachedPurchasingTips,
  _cachedListingsWithCoords,
};
