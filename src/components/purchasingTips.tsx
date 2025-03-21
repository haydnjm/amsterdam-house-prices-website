import {
  PurchasingTip as TPurchasingTip,
  PurchasingTipData,
} from "@/db/queries/purchasingTips";

function PurchasingTip({
  title,
  improvement,
  tip,
}: {
  title: string;
  improvement: number;
  tip: TPurchasingTip;
}) {
  return (
    <div className="p-2 w-full sm:w-1/2">
      <div className="p-3 bg-background rounded-lg shadow-sm">
        <h3 className="text-lg mb-5">{title}:</h3>
        <div className="text-sm">
          <p>
            in <b>{tip.bestMonth.toLocaleLowerCase()}</b> these houses were{" "}
            <b>{(improvement * 100).toFixed(1)}% cheaper</b> than the yearly
            average.
          </p>
          <p>
            the area with the most listings was <b>{tip.bestLocation.zone}</b>,
            with <b>{tip.bestLocation.count}</b>.
          </p>
        </div>
      </div>
    </div>
  );
}

function PurchasingTips({
  purchasingTips: {
    oneBedroom,
    greaterThan75M2,
    lessThan500k,
    moreThan2Bedrooms,
  },
}: {
  purchasingTips: PurchasingTipData;
}) {
  return (
    <div>
      <h2 className="text-3xl mb-3">when to buy:</h2>
      <div className="-m-2 flex flex-wrap">
        <PurchasingTip
          title="one bedroom"
          improvement={
            (oneBedroom.pricePerM2Average - oneBedroom.pricePerM2InBestMonth) /
            oneBedroom.pricePerM2Average
          }
          tip={oneBedroom}
        />
        <PurchasingTip
          title="larger than 75m&sup2;"
          improvement={
            (greaterThan75M2.pricePerM2Average -
              greaterThan75M2.pricePerM2InBestMonth) /
            greaterThan75M2.pricePerM2Average
          }
          tip={greaterThan75M2}
        />
        <PurchasingTip
          title="less than €500k"
          improvement={
            (lessThan500k.pricePerM2Average -
              lessThan500k.pricePerM2InBestMonth) /
            lessThan500k.pricePerM2Average
          }
          tip={lessThan500k}
        />
        <PurchasingTip
          title="more than 2 bedrooms"
          improvement={
            (moreThan2Bedrooms.pricePerM2Average -
              moreThan2Bedrooms.pricePerM2InBestMonth) /
            moreThan2Bedrooms.pricePerM2Average
          }
          tip={moreThan2Bedrooms}
        />
      </div>
    </div>
  );
}

export default PurchasingTips;
