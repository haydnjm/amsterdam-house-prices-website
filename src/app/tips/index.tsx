import { PurchasingTipData } from "@/db/queries/purchasingTips";
import PurchasingTipsComponent from "@/components/purchasingTips";

export default async function MonthlyGraph() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/tips`, {
    cache: "no-cache",
  });
  const purchasingTips = (await data.json())
    .purchasingTips as PurchasingTipData;

  return <PurchasingTipsComponent purchasingTips={purchasingTips} />;
}
