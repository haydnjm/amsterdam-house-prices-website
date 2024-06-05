import { fetchData } from "@/api/utils";
import _cache, { CACHE_DURATION_LONG } from "@/cache";
import queries from "@/db/queries";
import { OneMonthZoneDiff } from "@/db/queries/oneMonthZoneDiffs";

export async function getData(): Promise<OneMonthZoneDiff[]> {
  return fetchData<OneMonthZoneDiff[]>(
    queries.getOneMonthZoneDiffs,
    _cache._cachedOneMonthZoneDiffs,
    CACHE_DURATION_LONG,
    "one month zone diffs"
  );
}
