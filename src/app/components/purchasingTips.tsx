import {
  PurchasingTip as TPurchasingTip,
  PurchasingTipData,
} from "../../db/queries/purchasingTips";

function PurchasingTip({
  title,
  category,
  improvement,
  tip,
}: {
  title: string;
  category: string;
  improvement: number;
  tip: TPurchasingTip;
}) {
  return (
    <div className="p-2 w-1/2">
      <div className="p-3 bg-gray-300 rounded-lg">
        <h3 className="text-lg mb-5">{title}:</h3>
        <div className="text-sm">
          <p>
            in <b>{tip.bestMonth.toLocaleLowerCase()}</b>, these houses were{" "}
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
      <h2 className="text-3xl mb-3">tips:</h2>
      <div className="-m-2 flex flex-wrap">
        <PurchasingTip
          title="one bedroom"
          category="houses with one bedroom"
          improvement={
            (oneBedroom.pricePerM2Average - oneBedroom.pricePerM2InBestMonth) /
            oneBedroom.pricePerM2Average
          }
          tip={oneBedroom}
        />
        <PurchasingTip
          title="larger than 75m&sup2;"
          category="houses larger than 75m&sup2;"
          improvement={
            (greaterThan75M2.pricePerM2Average -
              greaterThan75M2.pricePerM2InBestMonth) /
            greaterThan75M2.pricePerM2Average
          }
          tip={greaterThan75M2}
        />
        <PurchasingTip
          title="less than €500k"
          category="houses listed at less than €500k"
          improvement={
            (lessThan500k.pricePerM2Average -
              lessThan500k.pricePerM2InBestMonth) /
            lessThan500k.pricePerM2Average
          }
          tip={lessThan500k}
        />
        <PurchasingTip
          title="more than 2 bedrooms"
          category="houses with more than 2 bedrooms"
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
