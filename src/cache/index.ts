import { TodaysMetrics } from "@/db/queries/todaysMetrics";
import { MonthlyHousePrice } from "../db/queries/monthlyHousePrice";
import {
  testMonthlyHousePrice,
  testOneMonthZoneDiffs,
  testTodaysMetrics,
} from "./testData";
import { OneMonthZoneDiffs } from "../db/queries/oneMonthZoneDiffs";

export const CACHE_DURATION_SHORT = process.env.CACHE_DURATION_SHORT
  ? Number(process.env.CACHE_DURATION)
  : 1000 * 60 * 60; // 60 minutes
export const CACHE_DURATION_LONG = process.env.CACHE_DURATION_LONG
  ? Number(process.env.CACHE_DURATION)
  : 1000 * 60 * 60; // 60 minutes

type CacheEntry<T> = {
  /** timestamp */
  expiration: number;
  value: T;
};

const todaysMetrics: TodaysMetrics = {};

const _cachedTodaysMetrics = testTodaysMetrics;
// export const _cachedTodaysMetrics: CacheEntry<TodaysMetrics> = {
//   expiration: 0,
//   value: todaysMetrics,
// };

const monthlyHousePrice: MonthlyHousePrice = [];

const _cachedMonthlyHousePrice = testMonthlyHousePrice;
// export const _cachedMonthlyHousePrice: CacheEntry<MonthlyHousePrice> = {
//   expiration: 0,
//   value: monthlyHousePrice,
// };

const oneMonthZoneDiffs: OneMonthZoneDiffs = [];

const _cachedOneMonthZoneDiffs = testOneMonthZoneDiffs;
// export const _cachedOneMonthZoneDiffs: CacheEntry<OneMonthZoneDiffs> = {
//   expiration: 0,
//   value: oneMonthZoneDiffs,
// };

export {
  _cachedTodaysMetrics,
  _cachedMonthlyHousePrice,
  _cachedOneMonthZoneDiffs,
};
