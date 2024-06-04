import PurchasingTipsComponent from "@/components/purchasingTips";
import { getData } from "../api/data/tips";

export default async function PurchasingTips() {
  const purchasingTips = await getData();

  return <PurchasingTipsComponent purchasingTips={purchasingTips} />;
}
