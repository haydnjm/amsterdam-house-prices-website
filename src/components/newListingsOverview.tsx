"use client";

import { ListingWithCoords } from "@/maps";
import TodaysListingsMap from "./map";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const cellStyling = "flex items-center px-1";

function ListingRow({ listing }: { listing: ListingWithCoords }) {
  return (
    <div className="flex w-full my-3">
      <div className="overflow-hidden flex items-center">
        <Image
          width={100}
          height={100}
          src={listing.image}
          alt={`${listing.house_name_number} image`}
        />
      </div>
      <div className="flex w-full flex-wrap border-b border-slate-700 bg-slate-50">
        <div
          className={`${cellStyling} w-full md:w-6/12 flex-col items-baseline justify-center`}
        >
          <Link className="underline" href={listing.link}>
            <h3 className="text-lg">{listing.house_name_number}</h3>
          </Link>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-1/12`}>
          <p className="text-sm">{listing.zone}</p>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-2/12`}>
          <p className="text-sm">{listing.bedrooms} bedrooms</p>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-1/12`}>
          <p className="text-sm">{listing.floor_space}m&sup2;</p>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-1/12`}>
          <p className="text-sm">
            €{(Number(listing.price_sale) / 1000).toFixed(0)}k
          </p>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-1/12`}>
          <p className="text-sm text-right">€{listing.price_per_m2}/m&sup2;</p>
        </div>
      </div>
    </div>
  );
}

function NewListingsOverview({ markers }: { markers: ListingWithCoords[] }) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const noRight = useMemo(
    () => currentPage === Math.ceil(markers.length / pageSize),
    [currentPage, markers.length]
  );

  const noLeft = useMemo(() => currentPage === 1, [currentPage]);

  return (
    <>
      <TodaysListingsMap
        markers={markers.map((l, i) => ({
          ...l,
          showing:
            i >= (currentPage - 1) * pageSize && i < currentPage * pageSize,
        }))}
      />
      <div className="flex justify-between my-2">
        <h2 className="text-3xl">today&apos;s listings:</h2>
        <div className="ext-sm flex items-end justify-end">
          <button
            className={`btn ${noLeft ? "btn-disabled" : ""} mx-2`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={noLeft}
          >
            &lt;
          </button>
          <button
            className={`btn ${noRight ? "btn-disabled" : ""}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={noRight}
          >
            &gt;
          </button>
        </div>
      </div>
      {markers
        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
        .map((marker) => (
          <ListingRow key={marker.link} listing={marker} />
        ))}
    </>
  );
}

export default NewListingsOverview;
