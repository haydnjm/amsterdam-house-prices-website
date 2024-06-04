import { getData } from "@/api/utils";
import _cache from "@/cache";
import queries from "@/db/queries";
import { PurchasingTipData } from "../../../../db/queries/purchasingTips";

export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      purchasingTips: await getData<PurchasingTipData>(
        queries.getPurchasingTips,
        _cache._cachedPurchasingTips
      ),
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
}
