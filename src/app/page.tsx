import TodaysMetrics from "./components/todaysMetrics";
import MonthlyGraph from "./components/monthlyGraph";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data`, {
    cache: "no-store",
  });

  const data = await res.json();

  console.log(data);

  return (
    <div>
      <div className="my-48">
        <TodaysMetrics todaysMetrics={data.todaysMetrics} />
      </div>
      <div className="my-48">
        <MonthlyGraph monthlyHousePrice={data.monthlyHousePrice} />
      </div>
    </div>
  );
}
