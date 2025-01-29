import { TableCell, TableRow } from "@/components/ui/table";

import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";
import { Prisma, Subject, Teacher } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TablePagination from "@/components/TablePagination";
import { cn } from "@/lib/utils";
import TableSearch from "@/components/TableSearch";
import { getUserRole } from "@/lib/role";

type SubjectList = Subject & { teachers: Teacher[] };
type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function SubjectListPage({ searchParams }: Props) {
  const role = await getUserRole();
  const columns = [
    {
      header: "Subject",
      accessor: "name",
      className: "text-left",
    },
    {
      header: "Teachers",
      accessor: "teachers",
    },
    {
      header: "Actions",
      accessor: "action",
      className: "text-center",
    },
  ];

  const row = (item: SubjectList) => (
    <TableRow className="even:bg-gray-100">
      <TableCell className="text-xs">{item.name}</TableCell>
      <TableCell className="text-xs">
        {item.teachers.map((teacher) => teacher.firstName).join(", ")}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-evenly gap-2">
          <FormModal type="update" table="subject" />
          {role === "admin" && <FormModal type="delete" table="subject" />}
        </div>
      </TableCell>
    </TableRow>
  );
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        switch (key) {
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
    prisma.subject.findMany({
      where: query,
      include: { teachers: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({
      where: query,
    }),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Subjects</h1>
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
            {role === "admin" && <FormModal type="create" table="subject" />}
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
