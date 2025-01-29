import { TableCell, TableRow } from "@/components/ui/table";

import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";
import { Class, Event, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TableSearch from "@/components/TableSearch";
import { cn } from "@/lib/utils";
import TablePagination from "@/components/TablePagination";
import { getUserID, getUserRole } from "@/lib/role";

type EventList = Event & { class: Class };
type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function EventListPage({ searchParams }: Props) {
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
      header: "Date",
      accessor: "date",
    },
    {
      header: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    ...(role === "admin " || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
            className: "text-center",
          },
        ]
      : []),
  ];

  const row = (item: EventList) => (
    <TableRow className="even:bg-gray-100">
      <TableCell className="text-xs">{item.title}</TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.class?.name || "all"}
      </TableCell>
      <TableCell className="text-xs">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-evenly gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal type="update" table="event" />
              <FormModal type="delete" table="event" />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  const query: Prisma.EventWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const roleCondition = {
    teacher: { lessons: { some: { teacherId: currentUserId } } },
    student: { students: { some: { id: currentUserId } } },
    parent: { students: { some: { parentId: currentUserId } } },
  };

  query.OR = [
    { classId: null },
    {
      class:
        (roleCondition[
          role as keyof typeof roleCondition
        ] as Prisma.ClassWhereInput) || {},
    },
  ];

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: { select: { name: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({
      where: query,
    }),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Events</h1>
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
              <FormModal type="create" table="event" />
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
