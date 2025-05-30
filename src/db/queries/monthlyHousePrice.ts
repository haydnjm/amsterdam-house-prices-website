import moment from "moment";
import { buildQuery } from "../bigQueryClient";

export type MonthlyHousePrice = Array<{
  month: string;
  averagePrice: number;
  averagePricePerM2: number;
  totalListings: number;
}>;

async function getMonthlyHousePrice(): Promise<MonthlyHousePrice> {
  try {
    const startDate = moment().subtract(1, "year").endOf("month");

    const res = await buildQuery({
      select: `
        EXTRACT(YEAR FROM inserted_date) AS year,
        EXTRACT(MONTH FROM inserted_date) AS month,
        AVG(price_sale) AS price_sale,
        AVG(price_per_m2) AS price_per_m2,
        COUNT(*) AS count
      `,
      where: `Date(inserted_date)>"${startDate.format("YYYY-MM-DD")}"`,
      groupBy: `year, month`,
      orderBy: `year, month`,
    });

    if (res?.[0]?.[0]) {
      return res[0].map((row: any) => {
        return {
          month: moment(row.month, "M").format(`MMMM`),
          averagePrice: row.price_sale,
          averagePricePerM2: row.price_per_m2,
          totalListings: row.count,
        };
      });
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getMonthlyHousePrice;
