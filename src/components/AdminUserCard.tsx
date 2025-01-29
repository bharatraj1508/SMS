import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export default async function AdminUserCard({
  type,
  bgColor,
}: {
  type: "admin" | "teacher" | "student" | "parent";
  bgColor: string;
}) {
  const moduleMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    parent: prisma.parent,
    student: prisma.student,
  };

  const count = await moduleMap[type].count();

  return (
    <div
      className={cn(
        "rounded-2xl p-4 flex-1 min-w-[130px] hover:shadow-2xl hover:scale-105 transition-all duration-500",
        bgColor
      )}
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full font-semibold text-neutral-800">
          2024/25
        </span>
      </div>
      <h1 className="text-2xl font-semibold my-4 text-white">{count}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-100">{type}s</h2>
    </div>
  );
}
