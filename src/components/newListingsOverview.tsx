"use client";

import { ListingWithCoords } from "@/maps";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { getData } from "../app/api/data/listings-with-coords";
import TodaysListingsMap from "./map";

const cellStyling = "flex items-center justify-end text-right px-1";

function ListingRow({ listing }: { listing: ListingWithCoords }) {
  return (
    <div className="flex w-full my-3">
      <div className="overflow-hidden flex items-center">
        <Image
          className="object-cover object-center min-h-full"
          width={100}
          height={100}
          src={listing.image}
          alt={`${listing.house_name_number} image`}
        />
      </div>
      <div className="flex w-full flex-wrap border-b bg-background">
        <div
          className={`${cellStyling} w-full md:w-5/12 flex items-center justify-center md:pl-2`}
        >
          <h3 className="text-lg flex-1 text-left">
            {listing.house_name_number}
          </h3>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-1/12`}>
          <p className="text-sm">{listing.zone}</p>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-2/12`}>
          <p className="text-sm">
            {listing.bedrooms === 1
              ? "1 bedroom"
              : `${listing.bedrooms} bedrooms`}
          </p>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-1/12`}>
          <p className="text-sm">{listing.floor_space}m&sup2;</p>
        </div>

        <div className={`${cellStyling} w-1/2 sm:w-1/5 md:w-1/12`}>
          <p className="text-sm">
            €{(Number(listing.price_sale) / 1000).toFixed(0)}k
          </p>
        </div>

        <div className={`${cellStyling} w-full sm:w-1/5 md:w-2/12`}>
          <p className="text-sm text-right">€{listing.price_per_m2}/m&sup2;</p>
        </div>
      </div>
    </div>
  );
}

function NewListingsOverview({
  initialMarkers,
  totalMarkerCount,
}: {
  initialMarkers: ListingWithCoords[];
  totalMarkerCount: number;
}) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [markers, setMarkers] = useState(initialMarkers);
  const [loading, setLoading] = useState(false);

  const noRight = useMemo(
    () => currentPage === Math.ceil(totalMarkerCount / pageSize),
    [currentPage, totalMarkerCount]
  );

  const noLeft = useMemo(() => currentPage === 1, [currentPage]);

  const updatePage = useCallback((newPage: number) => {
    setLoading(true);
    getData(newPage)
      .then((m) => {
        setCurrentPage(newPage);
        setMarkers(m);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Make table of loading listings for when data is loading
  const loadingListings: ListingWithCoords[] = Array.from({
    length: pageSize,
  }).map((_, i) => ({
    link: `loading ${i}`,
    image: "/loading-thumb.png",
    price_sale: 0,
    bedrooms: 0,
    price_per_m2: 0,
    zone: "",
    postal_code: "",
    house_name_number: "Data loading...",
    floor_space: 0,
    coords: { lat: 0, lng: 0 },
  }));

  return (
    <>
      <TodaysListingsMap
        markers={
          loading
            ? []
            : markers.map((l, i) => ({
                ...l,
                showing: true,
              }))
        }
      />
      <div className="flex justify-between mt-16">
        <h1 className="text-3xl flex-1">{currentPage}</h1>
        <h2 className="text-3xl flex-1 text-center">today&apos;s listings:</h2>
        <div className="ext-sm flex items-end justify-end flex-1 justify-end">
          <button
            className={`bg-secondary px-6 py-2 rounded-sm shadow-sm mx-2 ${
              noLeft
                ? "opacity-50 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
            onClick={() => updatePage(currentPage - 1)}
            disabled={noLeft}
          >
            &lt;
          </button>
          <button
            className={`bg-secondary px-6 py-2 rounded-sm shadow-sm mx-2 ${
              noRight
                ? "opacity-50 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
            onClick={() => updatePage(currentPage + 1)}
            disabled={noRight}
          >
            &gt;
          </button>
        </div>
      </div>
      {(loading ? loadingListings : markers).map((marker) => (
        <ListingRow key={marker.link} listing={marker} />
      ))}

      <div className="flex justify-between">
        <h1 className="text-3xl">{currentPage}</h1>
        <div className="ext-sm flex items-end justify-end">
          <button
            className={`bg-secondary px-6 py-2 rounded-sm shadow-sm mx-2 ${
              noLeft
                ? "opacity-50 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
            onClick={() => updatePage(currentPage - 1)}
            disabled={noLeft}
          >
            &lt;
          </button>
          <button
            className={`bg-secondary px-6 py-2 rounded-sm shadow-sm mx-2 ${
              noRight
                ? "opacity-50 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
            onClick={() => updatePage(currentPage + 1)}
            disabled={noRight}
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default NewListingsOverview;
