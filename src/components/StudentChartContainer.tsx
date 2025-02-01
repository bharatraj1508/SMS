import { prisma } from "@/lib/prisma";
import { StudentChart } from "./StudentChart";

export default async function StudentChartContainer() {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "MALE")?._count || 0;

  return (
    <>
      <div className="lg:w-1/3 bg-neutral-50 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
        <StudentChart boys={boys} girls={girls} />
      </div>
    </>
  );
}
