import TodaysMetrics from "./components/todaysMetrics";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div>
      <div>
        <TodaysMetrics todaysMetrics={data.todaysMetrics} />
      </div>
    </div>
  );
}
