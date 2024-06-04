import { getData } from "@/api/utils";
import _cache from "@/cache";
import queries from "@/db/queries";
import { OneMonthZoneDiff } from "@/db/queries/oneMonthZoneDiffs";

export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      oneMonthZoneDiffs: await getData<OneMonthZoneDiff[]>(
        queries.getOneMonthZoneDiffs,
        _cache._cachedOneMonthZoneDiffs
      ),
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
