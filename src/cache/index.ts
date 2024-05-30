import { TodaysMetrics } from "@/db/queries";

export const CACHE_DURATION = process.env.CACHE_DURATION
  ? Number(process.env.CACHE_DURATION)
  : 1000 * 60 * 60; // 60 minutes

type CacheEntry<T> = {
  /** timestamp */
  expiration: number;
  value: T;
};

const todaysMetrics: TodaysMetrics = {};

export const _cachedTodaysMetrics: CacheEntry<TodaysMetrics> = {
  expiration: 0,
  value: todaysMetrics,
};
