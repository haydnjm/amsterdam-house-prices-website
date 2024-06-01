import moment from "moment";
import { buildQuery, datasetID } from "../bigQueryClient";

/**
 * Z has the most of these houses. The best time of year to look is Y, where the average price per m2 is X% lower than average.
 */
export type PurchasingTip = {
  bestMonth: string;
  salePriceInBestMonth: number;
  pricePerM2InBestMonth: number;
  totalPriceAverage: number;
  pricePerM2Average: number;
  bestLocation: {
    zone: string;
    count: number;
  };
};

export type PurchasingTipData = {
  oneBedroom: PurchasingTip;
  greaterThan75M2: PurchasingTip;
  lessThan500k: PurchasingTip;
  moreThan2Bedrooms: PurchasingTip;
};

async function getTipsData(condition: string) {
  // Add date condition
  condition = `
    Date(inserted_date)>"2023-07-31" and Date(inserted_date)<"${moment()
      .startOf("month")
      .format("YYYY-MM-DD")}" and ${condition}`;

  const data = await buildQuery({
    select: `
          EXTRACT(MONTH FROM inserted_date) AS month,
          AVG(price_sale) AS average_price_sale,
          AVG(price_per_m2) AS average_price_per_m2,
          COUNT(*) AS count,
          (select zone from (
            select zone, count(*) as c from \`${datasetID}\` WHERE ${condition} group by zone order by c desc limit 1
          )) as most_frequent_zone,
          (select count(*) as c from \`${datasetID}\` WHERE ${condition} group by zone order by c desc limit 1
          ) as count_in_most_frequent_zone,
          `,
    where: `${condition}`,
    groupBy: `month`,
    orderBy: `month`,
  });

  return data[0];
}

/**
 * Calculate the best month to buy a house
 */
export function calculateBestMonth(
  data: {
    month: number;
    average_price_sale: number;
    average_price_per_m2: number;
    count: number;
  }[],
  criteria:
    | "month"
    | "average_price_sale"
    | "average_price_per_m2" = "average_price_per_m2"
): Omit<PurchasingTip, "bestLocation"> {
  const averagePrice =
    data.reduce((acc: number, curr: any) => acc + curr.average_price_sale, 0) /
    data.length;

  const averagePricePerM2 =
    data.reduce(
      (acc: number, curr: any) => acc + curr.average_price_per_m2,
      0
    ) / data.length;

  let success = 0;
  let fail = 0;

  const bestMonth = data.reduce((best, curr) => {
    // Must have sample size of more than 10
    if (curr.count <= 10) {
      fail++;
      return best;
    }

    success++;
    return curr[criteria] < best[criteria] ? curr : best;
  }, data[0]);

  console.log("success", success, "fail", fail);

  return {
    bestMonth: moment(bestMonth.month, "M").format(`MMMM`),
    salePriceInBestMonth: bestMonth.average_price_sale,
    pricePerM2InBestMonth: bestMonth.average_price_per_m2,
    pricePerM2Average: averagePricePerM2,
    totalPriceAverage: averagePrice,
  };
}

async function aggregateData(
  data: {
    zone: string;
    average_price_sale: number;
    average_price_per_m2: number;
    month: number;
    count: number;
    most_frequent_zone: string;
    count_in_most_frequent_zone: number;
  }[],
  criteria:
    | "month"
    | "average_price_sale"
    | "average_price_per_m2" = "average_price_per_m2"
): Promise<PurchasingTip> {
  const bestLocation = {
    zone: data[0].most_frequent_zone,
    count: data[0].count_in_most_frequent_zone,
  };
  const bestMonthData = calculateBestMonth(data, criteria);

  const res = {
    ...bestMonthData,
    bestLocation: bestLocation,
  };

  return res;
}

async function getPurchasingTips(): Promise<PurchasingTipData> {
  // one bedroom
  const oneBedroomData = await aggregateData(
    await getTipsData("bedrooms = 1"),
    "average_price_sale"
  );

  // larger than 75m2
  const greaterThan75MData = await aggregateData(
    await getTipsData("floor_space > 75"),
    "average_price_sale"
  );

  // less than €500k
  const lessThan500kData = await aggregateData(
    await getTipsData("price_sale < 500000")
  );

  // more than 2 bedrooms
  const moreThan2BedroomsData = await aggregateData(
    await getTipsData("bedrooms > 2"),
    "average_price_sale"
  );

  return {
    oneBedroom: oneBedroomData,
    greaterThan75M2: greaterThan75MData,
    lessThan500k: lessThan500kData,
    moreThan2Bedrooms: moreThan2BedroomsData,
  };
}

export default getPurchasingTips;
