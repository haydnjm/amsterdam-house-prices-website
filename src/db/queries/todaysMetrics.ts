import { House, buildQuery } from "@/db/bigQueryClient";

export type TodaysMetrics = {
  mostNewListingArea: string;
  listingsToday: number;
  averagePrice: number;
  averagePricePerM2: number;
};

/**
 * Calculate the zone with the most new listings
 * @returns
 */
export function calculateMostNewListingArea(listings: House[]): string {
  const groupedListings = listings.reduce((a, l) => {
    if (!a[l.zone]) {
      a[l.zone] = 0;
    }
    a[l.zone]++;
    return a;
  }, {} as Record<string, number>);

  return Object.keys(groupedListings).reduce(
    (a, b) => (groupedListings[a] > groupedListings[b] ? a : b),
    ""
  );
}

/**
 * Calculate the average price of all listings
 */
export function calculateAveragePrice(listings: House[]): number {
  return listings.reduce((a, l) => a + l.price_sale, 0) / listings.length;
}

/**
 * Calculate the average price per m2 of all listings
 */
export function calculateAveragePricePerM2(listings: House[]): number {
  return listings.reduce((a, l) => a + l.price_per_m2, 0) / listings.length;
}

/**
 * Get all listings from today
 * @returns
 */
export async function getTodaysListings(): Promise<House[]> {
  try {
    const listingsRes = await buildQuery({
      select:
        "zone, price_sale, price_per_m2, postal_code, link, bedrooms, image, house_name_number, floor_space",
      where: `DATE(inserted_date)=CURRENT_DATE()`,
    });

    return listingsRes[0];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Aggregate all metrics for today
 */
async function getTodayMetrics(): Promise<TodaysMetrics> {
  const todaysListings = await getTodaysListings();

  const mostNewListingArea = calculateMostNewListingArea(todaysListings);

  return {
    mostNewListingArea,
    listingsToday: todaysListings.length,
    averagePrice: calculateAveragePrice(todaysListings),
    averagePricePerM2: calculateAveragePricePerM2(todaysListings),
  };
}

export default getTodayMetrics;
