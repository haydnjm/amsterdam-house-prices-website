import TodaysMetrics from "./components/todaysMetrics";
import MonthlyGraph from "./components/monthlyGraph";
import ZoneTicker from "./components/zoneTicker";
import PurchasingTips from "./components/purchasingTips";
import TodaysListingsMap from "./components/map";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div>
      {/* 
      <div className="max-w-5xl m-auto">
        <div className="my-32">
          <TodaysMetrics todaysMetrics={data.todaysMetrics} />
        </div>
      </div>
      <div className="my-32">
        <ZoneTicker oneMonthZoneDiffs={data.oneMonthZoneDiffs} />
      </div> */}
      <div className="max-w-5xl m-auto">
        {/* <div className="my-32">
          <MonthlyGraph monthlyHousePrice={data.monthlyHousePrice} />
        </div>
        <div className="my-32">
          <PurchasingTips purchasingTips={data.purchasingTips} />
        </div> */}
        <div className="my-32">
          <TodaysListingsMap markers={data.todaysListingsWithCoords} />
        </div>
      </div>
    </div>
  );
}
