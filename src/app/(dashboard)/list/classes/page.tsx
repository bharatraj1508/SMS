import { classesData } from "../../../../lib/data";
import { role } from "../../../../lib/data";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";

import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";
import { Class, Prisma, Teacher } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TablePagination from "@/components/TablePagination";
import { cn } from "@/lib/utils";
import TableSearch from "@/components/TableSearch";

type ClassList = Class & { supervisor: Teacher };
type Props = {
  searchParams: { [key: string]: string | undefined };
};

const columns = [
  {
    header: "Class",
    accessor: "name",
    className: "text-left",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },

  {
    header: "Actions",
    accessor: "action",
    className: "text-center",
  },
];

const row = (item: ClassList) => (
  <TableRow className="even:bg-gray-100">
    <TableCell className="text-xs">{item.name}</TableCell>
    <TableCell className="text-xs">
      {item.supervisor.firstName + " " + item.supervisor.lastName}
    </TableCell>
    <TableCell className="hidden md:table-cell text-xs">
      {item.capacity}
    </TableCell>
    <TableCell className="hidden md:table-cell text-xs">
      {item.name[0]}
    </TableCell>

    <TableCell>
      <div className="flex items-center justify-evenly gap-2">
        <FormModal type="update" table="subject" />
        {role === "admin" && <FormModal type="delete" table="class" />}
      </div>
    </TableCell>
  </TableRow>
);
export default async function ClassListPage({ searchParams }: Props) {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        switch (key) {
          case "teacherId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: { supervisor: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({
      where: query,
    }),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-chart-1">
              <SlidersHorizontal
                width={18}
                height={18}
                className="text-white"
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-chart-2">
              <ArrowDownWideNarrow
                width={18}
                height={18}
                className="text-white"
              />
            </button>
            {role === "admin" && <FormModal type="create" table="class" />}
          </div>
        </div>
      </div>
      <InfoTable columns={columns} row={row} data={data} count={count} />
      <div
        className={cn(
          Math.floor(count / ITEM_PER_PAGE) == 0 ? "hidden" : "block"
        )}
      >
        <TablePagination page={p} count={count} />
      </div>
    </div>
  );
}
