export default function DataTile({
  title,
  value,
  loading,
}: {
  title: string;
  value: string;
  loading?: boolean;
}) {
  return (
    <div className={`w-full sm:w-1/2 lg:w-1/4 p-2`}>
      <div
        className={`bg-background p-2 rounded-md shadow-sm flex flex-col justify-between ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <p className="mb-12">{title}</p>
        <p className="text-4xl font-bold">{value}</p>
      </div>
    </div>
  );
}
