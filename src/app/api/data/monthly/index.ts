import { fetchData } from "@/api/utils";
import _cache, { CACHE_DURATION_LONG } from "@/cache";
import queries from "@/db/queries";
import { MonthlyHousePrice } from "@/db/queries/monthlyHousePrice";

export async function getData(): Promise<MonthlyHousePrice> {
  return fetchData<MonthlyHousePrice>(
    queries.monthlyHousePrice,
    _cache._cachedMonthlyHousePrice,
    CACHE_DURATION_LONG,
    "monthly house price"
  );
}
