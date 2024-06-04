import { fetchData } from "@/api/utils";
import _cache from "@/cache";
import queries from "@/db/queries";
import { MonthlyHousePrice } from "@/db/queries/monthlyHousePrice";

export async function getData(): Promise<MonthlyHousePrice> {
  return fetchData<MonthlyHousePrice>(
    queries.monthlyHousePrice,
    _cache._cachedMonthlyHousePrice
  );
}
