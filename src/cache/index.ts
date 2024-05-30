import { TodaysMetrics } from "@/db/queries/todaysMetrics";
import { MonthlyHousePrice } from "../db/queries/monthlyHousePrice";

export const CACHE_DURATION = process.env.CACHE_DURATION
  ? Number(process.env.CACHE_DURATION)
  : 1000 * 60 * 60; // 60 minutes

type CacheEntry<T> = {
  /** timestamp */
  expiration: number;
  value: T;
};

const todaysMetrics: TodaysMetrics = {};

// export const _cachedTodaysMetrics: CacheEntry<TodaysMetrics> = {
//   expiration: 0,
//   value: todaysMetrics,
// };
export const _cachedTodaysMetrics: CacheEntry<TodaysMetrics> = {
  expiration: 1817077234684,
  value: {
    mostNewListingArea: "boop",
    listingsToday: 1,
    averagePrice: 2000,
    averagePricePerM2: 3000,
  },
};

const monthlyHousePrice: MonthlyHousePrice = [];

// export const _cachedMonthlyHousePrice: CacheEntry<MonthlyHousePrice> = {
//   expiration: 0,
//   value: monthlyHousePrice,
// };
export const _cachedMonthlyHousePrice: CacheEntry<MonthlyHousePrice> = {
  expiration: 1817077234684,
  value: [
    {
      month: "July",
      averagePrice: 577289.6861924684,
      averagePricePerM2: 7026.238493723852,
      totalListings: 239,
    },
    {
      month: "August",
      averagePrice: 592794.4971264371,
      averagePricePerM2: 7134.27203065134,
      totalListings: 1044,
    },
    {
      month: "September",
      averagePrice: 735396.3753308618,
      averagePricePerM2: 7681.240868184217,
      totalListings: 1889,
    },
    {
      month: "October",
      averagePrice: 729295.2509197938,
      averagePricePerM2: 7745.845474613701,
      totalListings: 1359,
    },
    {
      month: "November",
      averagePrice: 721886.3923585601,
      averagePricePerM2: 7526.044085231439,
      totalListings: 1361,
    },
    {
      month: "December",
      averagePrice: 685492.5924479162,
      averagePricePerM2: 7344.0872395833285,
      totalListings: 768,
    },
    {
      month: "January",
      averagePrice: 653023.0084388177,
      averagePricePerM2: 7357.747679324898,
      totalListings: 1185,
    },
    {
      month: "February",
      averagePrice: 691231.6491969564,
      averagePricePerM2: 7437.916314454773,
      totalListings: 1183,
    },
    {
      month: "March",
      averagePrice: 731502.665948276,
      averagePricePerM2: 7627.168821839077,
      totalListings: 1392,
    },
    {
      month: "April",
      averagePrice: 801297.1377744144,
      averagePricePerM2: 7888.068130204395,
      totalListings: 1321,
    },
    {
      month: "May",
      averagePrice: 760614.328428094,
      averagePricePerM2: 7844.6809364548435,
      totalListings: 1495,
    },
  ],
};
