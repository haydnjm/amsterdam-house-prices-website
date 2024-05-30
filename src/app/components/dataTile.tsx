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
    <div
      className={`bg-gray-300 p-2 rounded-md shadow-sm mx-2 flex-1 flex flex-col justify-between ${
        loading ? "animate-pulse" : ""
      }`}
    >
      <p className="mb-14">{title}</p>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}
