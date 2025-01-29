import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";

import { Eye, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";
import Link from "next/link";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import TablePagination from "@/components/TablePagination";
import { cn } from "@/lib/utils";
import TableSearch from "@/components/TableSearch";
import { getUserRole } from "@/lib/role";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };
type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function TeacherListPage({ searchParams }: Props) {
  const role = await getUserRole();
  const columns = [
    {
      header: "Info",
      accessor: "info",
      className: "text-left",
    },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
            className: "text-center",
          },
        ]
      : []),
  ];

  const row = (item: TeacherList) => (
    <TableRow className="even:bg-gray-100">
      <TableCell>
        <div className="flex items-center gap-2">
          <Image
            src={item.img || "/noAvatar.png"}
            alt="user"
            width={40}
            height={40}
            className="md:hidden xl:block rounded-full w-10 h-10 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-semibold">
              {item.firstName} {item.lastName}
            </p>
            <p className="text-xs text-gray-500">{item.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs">{item.id}</TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.subjects.map((subject) => subject.name).join(", ")}
      </TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.classes.map((classItem) => classItem.name).join(", ")}
      </TableCell>
      <TableCell className="text-xs hidden lg:table-cell">
        {item.phone}
      </TableCell>
      <TableCell className="text-xs hidden lg:table-cell">
        {item.address}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-evenly gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <Eye className="w-5 h-5 cursor-pointer hover:scale-110 transition-all duration-300" />
          </Link>
          {role === "admin" && (
            <>
              <FormModal
                type="update"
                table="teacher"
                data={{
                  id: 1,
                  username: "deanguerrero",
                  email: "deanguerrero@gmail.com",
                  password: "password",
                  firstName: "Dean",
                  lastName: "Guerrero",
                  phone: "+1 234 567 89",
                  address: "1234 Main St, Anytown, USA",
                  bloodType: "A+",
                  dateOfBirth: "2000-01-01",
                  sex: "male",
                  img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                }}
              />
              <FormModal type="delete" table="teacher" />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: { classId: parseInt(queryParams.classId!) },
            };
            break;
          case "search":
            query.firstName = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: { subjects: true, classes: true },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({
      where: query,
    }),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Teachers</h1>
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

            {role === "admin" && <FormModal type="create" table="teacher" />}
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
