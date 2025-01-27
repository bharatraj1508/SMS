import { lessonsData } from "../../../../lib/data";
import { role } from "../../../../lib/data";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";

import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";
import { Class, Lesson, Prisma, Subject, Teacher } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TablePagination from "@/components/TablePagination";
import { cn } from "@/lib/utils";
import TableSearch from "@/components/TableSearch";

type LessonList = Lesson & { teacher: Teacher; class: Class; subject: Subject };
type Props = {
  searchParams: { [key: string]: string | undefined };
};

const columns = [
  {
    header: "Subject",
    accessor: "subject",
    className: "text-left",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
  },
  {
    header: "Actions",
    accessor: "action",
    className: "text-center",
  },
];

const row = (item: LessonList) => (
  <TableRow className="even:bg-gray-100">
    <TableCell className="text-xs">{item.subject.name}</TableCell>
    <TableCell className="text-xs hidden md:table-cell">
      {item.class.name}
    </TableCell>
    <TableCell className="text-xs">
      {item.teacher.firstName + " " + item.teacher.lastName}
    </TableCell>
    <TableCell>
      <div className="flex items-center justify-evenly gap-2">
        <FormModal type="update" table="subject" />
        {role === "admin" && <FormModal type="delete" table="lesson" />}
      </div>
    </TableCell>
  </TableRow>
);
export default async function LessonListPage({ searchParams }: Props) {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        switch (key) {
          case "search":
            query.OR = [
              {
                subject: { name: { contains: value, mode: "insensitive" } },
              },
              {
                teacher: {
                  firstName: { contains: value, mode: "insensitive" },
                },
              },
            ];
            break;
          case "teacherId":
            query.teacherId = value;
            break;
          case "classId":
            query.classId = parseInt(value);
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      include: {
        teacher: { select: { firstName: true, lastName: true } },
        class: { select: { name: true } },
        subject: { select: { name: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.lesson.count({
      where: query,
    }),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Lessons</h1>
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
            {role === "admin" && <FormModal type="create" table="lesson" />}
          </div>
        </div>
      </div>
      <InfoTable columns={columns} row={row} data={data} count={count} />
      <div
        className={cn(
          Math.floor(count / ITEM_PER_PAGE) <= 1 ? "hidden" : "block"
        )}
      >
        <TablePagination page={p} count={count} />
      </div>
    </div>
  );
}
