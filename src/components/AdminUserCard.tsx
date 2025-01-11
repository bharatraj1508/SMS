import { cn } from "@/lib/utils";

export default function AdminUserCard({
  type,
  bgColor,
}: {
  type: string;
  bgColor: string;
}) {
  return (
    <div className={cn("rounded-2xl p-4 flex-1 min-w-[130px]", bgColor)}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full font-semibold text-neutral-800">
          2024/25
        </span>
      </div>
      <h1 className="text-2xl font-semibold my-4 text-white">1,234</h1>
      <h2 className="capitalize text-sm font-medium text-gray-100">{type}s</h2>
    </div>
  );
}
