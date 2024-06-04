import { MonthlyHousePrice } from "@/db/queries/monthlyHousePrice";
import MonthlyGraphComponent from "@/components/monthlyGraph";

export default async function MonthlyGraph() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/monthly`, {
    cache: "no-cache",
  });
  const monthlyHousePrice = (await data.json())
    .monthlyHousePrice as MonthlyHousePrice;

  return <MonthlyGraphComponent monthlyHousePrice={monthlyHousePrice} />;
}
