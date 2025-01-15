import { teachersData } from "../../../../lib/data";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";
import { role } from "../../../../lib/data";

import { Eye, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";

type Teacher = {
  id: number;
  teacherId: string;
  name: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

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
  {
    header: "Actions",
    accessor: "action",
    className: "text-center",
  },
];

export default function TeacherListPage() {
  const row = (item: Teacher) => (
    <TableRow className="even:bg-gray-100">
      <TableCell>
        <div className="flex items-center gap-2">
          <Image
            src={item.photo}
            alt="user"
            width={40}
            height={40}
            className="md:hidden xl:block rounded-full w-10 h-10 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-semibold">{item.name}</p>
            <p className="text-xs text-gray-500">{item.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.phone}
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.subjects.join(", ")}
      </TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.classes.join(", ")}
      </TableCell>
      <TableCell className="text-xs hidden lg:table-cell">
        {item.phone}
      </TableCell>
      <TableCell className="text-xs hidden lg:table-cell">
        {item.address}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-evenly gap-2">
          <Eye className="w-5 h-5 cursor-pointer hover:scale-110 transition-all duration-300" />
          {role === "admin" && <FormModal type="delete" table="teacher" />}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <Image src="/search.png" alt="" width={14} height={14} />
            <input
              type="text"
              placeholder="Search..."
              className="w-[200px] p-2 bg-transparent outline-none"
            />
          </div>
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
      <InfoTable columns={columns} row={row} data={teachersData} />
    </div>
  );
}
