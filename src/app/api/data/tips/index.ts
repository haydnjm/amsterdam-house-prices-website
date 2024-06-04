import { fetchData } from "@/api/utils";
import _cache from "@/cache";
import queries from "@/db/queries";
import { PurchasingTipData } from "@/db/queries/purchasingTips";

export async function getData(): Promise<PurchasingTipData> {
  return fetchData<PurchasingTipData>(
    queries.getPurchasingTips,
    _cache._cachedPurchasingTips
  );
}
