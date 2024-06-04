import MonthlyGraphComponent from "@/components/monthlyGraph";
import { getData } from "../api/data/monthly";

export default async function MonthlyGraph() {
  const monthlyHousePrice = await getData();

  return <MonthlyGraphComponent monthlyHousePrice={monthlyHousePrice} />;
}
