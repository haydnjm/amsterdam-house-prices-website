import { buildQuery } from "../bigQueryClient";

export type OneMonthZoneDiff = {
  zone: string;
  thisMonth: number;
  lastMonth: number;
};

/**
 *
 * @param monthsAgo 0 = the last month, 1 = the month before the last month, etc.
 * @returns
 */
async function getStatsPerZone(monthsAgo: number) {
  const res = await buildQuery({
    select: `zone, AVG(price_per_m2) as average_price_per_m2`,
    where: `DATE(inserted_date) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL ${
      monthsAgo + 1
    } MONTH) AND DATE_SUB(CURRENT_DATE(), INTERVAL ${monthsAgo} MONTH)`,
    groupBy: `zone`,
  });

  return res[0];
}

async function getOneMonthZoneDiffs(): Promise<OneMonthZoneDiff[]> {
  // Get the average price per square meter per zone this calendar month
  const thisMonth = await getStatsPerZone(0);
  const lastMonth = await getStatsPerZone(1);

  return thisMonth.map((zone, i) => ({
    zone: zone.zone,
    thisMonth: zone.average_price_per_m2,
    lastMonth: lastMonth[i].average_price_per_m2,
  }));
}

export default getOneMonthZoneDiffs;
