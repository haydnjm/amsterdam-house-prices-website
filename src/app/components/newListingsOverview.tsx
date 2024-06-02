import { ListingWithCoords } from "@/maps";
import TodaysListingsMap from "./map";
import Image from "next/image";
import Link from "next/link";

const cellStyling = "w-1/12 flex items-center px-1";

function NewListingsOverview({ markers }: { markers: ListingWithCoords[] }) {
  return (
    <>
      <h2 className="text-3xl mb-3">today&apos;s listings:</h2>
      <TodaysListingsMap markers={markers} />
      {markers.map((marker) => (
        <div key={marker.link} className="flex w-full my-3">
          <div className="rounded-lg overflow-hidden">
            <Image
              width={100}
              height={100}
              src={marker.image}
              alt={`${marker.house_name_number} image`}
            />
          </div>
          <div
            className={`${cellStyling} w-6/12 flex-col items-baseline justify-center`}
          >
            <Link className="underline" href={marker.link}>
              <h3 className="text-lg">{marker.house_name_number}</h3>
            </Link>
            <p className="text-sm">{marker.zone}</p>
          </div>
          <div className={`${cellStyling} w-2/12`}>
            <p className="text-sm">{marker.bedrooms} bedrooms</p>
          </div>
          <div className={`${cellStyling}`}>
            <p className="text-sm">{marker.floor_space}m&sup2;</p>
          </div>
          <div className={`${cellStyling}`}>
            <p className="text-sm">
              €{(Number(marker.price_sale) / 1000).toFixed(0)}k
            </p>
          </div>
          <div className={`${cellStyling}`}>
            <p className="text-sm">€{marker.price_per_m2}/m&sup2;</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default NewListingsOverview;
