import { ListingWithCoords } from "@/maps";
import TodaysListingsMap from "./map";
import Image from "next/image";
import Link from "next/link";

const cellStyling = "w-1/12 flex items-center px-1";

function ListingRow({ listing }: { listing: ListingWithCoords }) {
  return (
    <div className="flex w-full my-3">
      <div className="rounded-lg overflow-hidden">
        <Image
          width={100}
          height={100}
          src={listing.image}
          alt={`${listing.house_name_number} image`}
        />
      </div>
      <div
        className={`${cellStyling} w-6/12 flex-col items-baseline justify-center`}
      >
        <Link className="underline" href={listing.link}>
          <h3 className="text-lg">{listing.house_name_number}</h3>
        </Link>
        <p className="text-sm">{listing.zone}</p>
      </div>
      <div className={`${cellStyling} w-2/12`}>
        <p className="text-sm">{listing.bedrooms} bedrooms</p>
      </div>
      <div className={`${cellStyling}`}>
        <p className="text-sm">{listing.floor_space}m&sup2;</p>
      </div>
      <div className={`${cellStyling}`}>
        <p className="text-sm">
          €{(Number(listing.price_sale) / 1000).toFixed(0)}k
        </p>
      </div>
      <div className={`${cellStyling}`}>
        <p className="text-sm">€{listing.price_per_m2}/m&sup2;</p>
      </div>
    </div>
  );
}

function NewListingsOverview({ markers }: { markers: ListingWithCoords[] }) {
  return (
    <>
      <h2 className="text-3xl mb-3">today&apos;s listings:</h2>
      <TodaysListingsMap markers={markers} />
      {markers.map((marker) => (
        <ListingRow key={marker.link} listing={marker} />
      ))}
    </>
  );
}

export default NewListingsOverview;
