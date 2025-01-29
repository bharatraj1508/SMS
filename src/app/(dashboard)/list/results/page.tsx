import { TableCell, TableRow } from "@/components/ui/table";

import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TableSearch from "@/components/TableSearch";
import { cn } from "@/lib/utils";
import TablePagination from "@/components/TablePagination";
import { getUserID, getUserRole } from "@/lib/role";

type ResultList = {
  id: number;
  title: string;
  class: string;
  teacherName: string;
  studentName: string;
  examType: string;
  score: number;
  date: Date;
};
type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function ResultListPage({ searchParams }: Props) {
  const role = await getUserRole();
  const currentUserId = await getUserID();

  const columns = [
    {
      header: "Title",
      accessor: "title",
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
      className: "hidden md:table-cell",
    },
    {
      header: "Student",
      accessor: "student",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Type",
      accessor: "type",
      className: "hidden md:table-cell",
    },
    {
      header: "Score",
      accessor: "score",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
            className: "text-center",
          },
        ]
      : []),
  ];

  const row = (item: ResultList) => (
    <TableRow className="even:bg-gray-100">
      <TableCell className="text-xs">{item.title}</TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.class}
      </TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.teacherName}
      </TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.studentName}
      </TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.date)}
      </TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.examType}
      </TableCell>
      <TableCell className="text-xs">{item.score}</TableCell>
      <TableCell>
        <div className="flex items-center justify-evenly gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal type="update" table="subject" />
              <FormModal type="delete" table="result" />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        switch (key) {
          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              {
                assignment: { title: { contains: value, mode: "insensitive" } },
              },
              {
                student: {
                  firstName: { contains: value, mode: "insensitive" },
                },
              },
            ];
            break;
          case "studentId":
            query.studentId = value;
            break;
          default:
            break;
        }
      }
    }
  }

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { exam: { lesson: { teacherId: currentUserId! } } },
        { assignment: { lesson: { teacherId: currentUserId! } } },
      ];
      break;
    case "student":
      query.studentId = currentUserId!;
      break;
    case "parent":
      query.student = {
        parentId: currentUserId!,
      };
      break;

    default:
      break;
  }

  const [dataResponse, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: {
          select: { firstName: true, lastName: true },
        },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { firstName: true, lastName: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { firstName: true, lastName: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({
      where: query,
    }),
  ]);

  const data = dataResponse.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      class: assessment.lesson.class.name,
      teacherName:
        assessment.lesson.teacher.firstName +
        " " +
        assessment.lesson.teacher.lastName,
      studentName: item.student.firstName + " " + item.student.lastName,
      examType: isExam ? "exam" : "assignment",
      score: item.score,
      date: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Results</h1>
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
            {(role === "admin" || role === "teacher") && (
              <FormModal type="create" table="result" />
            )}
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
