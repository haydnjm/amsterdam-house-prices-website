import { fetchData } from "@/api/utils";
import _cache, { CACHE_DURATION_LONG } from "@/cache";
import queries from "@/db/queries";
import { PurchasingTipData } from "@/db/queries/purchasingTips";

export async function getData(): Promise<PurchasingTipData> {
  return fetchData<PurchasingTipData>(
    queries.getPurchasingTips,
    _cache._cachedPurchasingTips,
    CACHE_DURATION_LONG,
    "purchasing tips"
  );
}
