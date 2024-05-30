import { BigQuery } from "@google-cloud/bigquery";

export const datasetID = "houses-for-sale-392908.houses_for_sale.houses";

export type House = {
  price_sale: number;
  bedrooms: number;
  price_per_m2: number;
  zone: string;
};

export const bigQueryClient = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_BIG_QUERY_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_BIG_QUERY_KEY,
  },
});
