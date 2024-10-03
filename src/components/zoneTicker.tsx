import { useMemo } from "react";
import { OneMonthZoneDiff } from "@/db/queries/oneMonthZoneDiffs";
import "./ticker.css";

function TickerItem({ zoneDiff }: { zoneDiff: OneMonthZoneDiff }) {
  const percentageChange = useMemo(
    () => Number(zoneDiff.thisMonth) / Number(zoneDiff.lastMonth) - 1,
    [zoneDiff]
  );
  const hasIncreased = percentageChange > 0;
  const hasValidData = zoneDiff.thisMonth && zoneDiff.lastMonth;
  const symbol = !hasValidData ? "?" : hasIncreased ? "↑" : "↓";
  const value = hasValidData ? Math.abs(percentageChange * 100).toFixed(1) : "";

  return (
    <div className="mx-2 p-3 flex font-mono text-2xl">
      <p className="mx-2">{zoneDiff.zone}</p>
      <p className="mx-2">€{(Number(zoneDiff.thisMonth) / 1000).toFixed(2)}k</p>
      <p
        className={`mx-2 ${
          !hasValidData
            ? "text-slate-600"
            : hasIncreased
            ? "text-red-400"
            : "text-green-400"
        }`}
      >
        {symbol}
        {value}%
      </p>
    </div>
  );
}

function ZoneTicker({
  oneMonthZoneDiffs,
}: {
  oneMonthZoneDiffs: OneMonthZoneDiff[];
}) {
  return (
    <>
      <div className="ticker-container bg-gray-800 text-white py-4">
        <div className="ticker-move">
          {oneMonthZoneDiffs.map((zoneDiff) => (
            <TickerItem key={`1 ${zoneDiff.zone}`} zoneDiff={zoneDiff} />
          ))}
          {/* Duplicate for continuity */}
          {oneMonthZoneDiffs.map((zoneDiff) => (
            <TickerItem key={`2 ${zoneDiff.zone}`} zoneDiff={zoneDiff} />
          ))}
        </div>
      </div>
      <div className="max-w-5xl m-auto">
        <p className="text-xs">
          average ppm&sup2; over the last month, compared to the previous month
        </p>
      </div>
    </>
  );
}

export default ZoneTicker;
