import { BigQuery } from "@google-cloud/bigquery";

export const datasetID = `${process.env.GOOGLE_CLOUD_PROJECT_ID}.${process.env.BIGQUERY_TABLE}`;

export type House = {
  link: string;
  image: string;
  price_sale: number;
  bedrooms: number;
  price_per_m2: number;
  zone: string;
  postal_code: string;
  house_name_number: string;
  floor_space: number;
};

const bigQueryClient = new BigQuery({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_BIG_QUERY_EMAIL,
    private_key: `${process.env.GOOGLE_CLOUD_BIG_QUERY_KEY}`,
  },
});

/** Automatically fills out parking spaces */
export function buildQuery({
  select,
  where,
  orderBy,
  limit,
  offset,
  groupBy,
}: {
  select: string;
  where?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
  groupBy?: string;
}) {
  const q = `
  SELECT
      ${select}
  FROM
      \`${datasetID}\`
  WHERE floor_space > 25 ${where && ` and ${where}`}
  ${groupBy ? `GROUP BY ${groupBy}` : ""}
  ${orderBy ? `ORDER BY ${orderBy}` : ""}
  ${limit ? `LIMIT ${limit}` : ""}
  ${offset ? `OFFSET ${offset}` : ""}
  `;

  return bigQueryClient.query(q);
}
