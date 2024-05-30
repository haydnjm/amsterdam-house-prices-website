import assert from "node:assert";
import { describe, it } from "node:test";
import { calculateMostNewListingArea } from "./queries";
import { House } from "./bigQueryClient";

describe("calculateMostNewListingArea", () => {
  it("should return the zone with the most listings", () => {
    const listings = [
      { zone: "A" },
      { zone: "B" },
      { zone: "B" },
      { zone: "C" },
      { zone: "C" },
      { zone: "C" },
    ];

    const mostNewListingArea = calculateMostNewListingArea(listings as House[]);

    assert.strictEqual(mostNewListingArea, "C");
  });
  it("should return the zone with the most listings", () => {
    const listings = [
      { zone: "C" },
      { zone: "C" },
      { zone: "C" },
      { zone: "A" },
      { zone: "B" },
      { zone: "B" },
    ];

    const mostNewListingArea = calculateMostNewListingArea(listings as House[]);

    assert.strictEqual(mostNewListingArea, "C");
  });
});
