import TodaysMetrics from "./todays-metrics";
import TodaysMetricsLoading from "./todays-metrics/loading";
import ZoneTicker from "./zone-ticker";
import ZoneTickerLoading from "./zone-ticker/loading";
import MonthlyGraph from "./monthly";
import MonthlyGraphLoading from "./monthly/loading";
import PurchasingTips from "./tips";
import PurchasingTipsLoading from "./tips/loading";
import NewListings from "./new-listings";
import NewListingsLoading from "./new-listings/loading";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <div className="max-w-5xl m-auto">
        <div className="my-32">
          <Suspense fallback={<TodaysMetricsLoading />}>
            <TodaysMetrics />
          </Suspense>
        </div>
      </div>
      {/* <div className="my-32">
        <Suspense fallback={<ZoneTickerLoading />}>
          <ZoneTicker />
        </Suspense>
      </div>
      <div className="max-w-5xl m-auto">
        <div className="my-32">
          <Suspense fallback={<MonthlyGraphLoading />}>
            <MonthlyGraph />
          </Suspense>
        </div>
        <div className="my-32">
          <Suspense fallback={<PurchasingTipsLoading />}>
            <PurchasingTips />
          </Suspense>
        </div>
        <div className="my-32">
          <Suspense fallback={<NewListingsLoading />}>
            <NewListings />
          </Suspense>
        </div>
      </div> */}
    </div>
  );
}
