import { getData } from "@/api/utils";
import _cache from "@/cache";
import queries from "@/db/queries";
import { MonthlyHousePrice } from "@/db/queries/monthlyHousePrice";

export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      monthlyHousePrice: await getData<MonthlyHousePrice>(
        queries.monthlyHousePrice,
        _cache._cachedMonthlyHousePrice
      ),
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
