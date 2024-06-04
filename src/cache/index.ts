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

export type CacheEntry<T> = {
  /** timestamp */
  expiration: number;
  value: T | undefined;
};

const IS_TEST = false;

const _cachedTodaysMetrics: CacheEntry<TodaysMetrics> = {
  expiration: 0,
  value: undefined,
};

const _cachedMonthlyHousePrice: CacheEntry<MonthlyHousePrice> = {
  expiration: 0,
  value: undefined,
};

const _cachedOneMonthZoneDiffs: CacheEntry<OneMonthZoneDiff[]> = {
  expiration: 0,
  value: undefined,
};

const _cachedPurchasingTips: CacheEntry<PurchasingTipData> = {
  expiration: 0,
  value: undefined,
};

const _cachedListingsWithCoords: CacheEntry<ListingWithCoords[]> = {
  expiration: 0,
  value: undefined,
};

const cache = IS_TEST
  ? {
      // _cachedTodaysMetrics,
      _cachedTodaysMetrics: {
        expiration: 1817077234684,
        value: testTodaysMetrics,
      },
      // _cachedMonthlyHousePrice,
      _cachedMonthlyHousePrice: {
        expiration: 1817077234684,
        value: testMonthlyHousePrice,
      },
      _cachedOneMonthZoneDiffs: {
        expiration: 1817077234684,
        value: testOneMonthZoneDiffs,
      },
      _cachedPurchasingTips: {
        expiration: 1817077234684,
        value: testPurchasingTips,
      },
      _cachedListingsWithCoords: {
        expiration: 1817077234684,
        value: testListingsWithCoords,
      },
    }
  : {
      _cachedTodaysMetrics,
      _cachedMonthlyHousePrice,
      _cachedOneMonthZoneDiffs,
      _cachedPurchasingTips,
      _cachedListingsWithCoords,
    };

export default cache;
