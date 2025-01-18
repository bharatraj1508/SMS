import { parentsData } from "../../../../lib/data";
import { role } from "../../../../lib/data";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";

import { Eye, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";

type Parent = {
  id: number;
  name: string;
  email?: string;
  students: string[];
  phone: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
    className: "text-left",
  },
  {
    header: "Students",
    accessor: "students",
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

export default function StudentListPage() {
  const row = (item: Parent) => (
    <TableRow className="even:bg-gray-100">
      <TableCell>
        <div className="flex flex-col">
          <p className="font-semibold">{item.name}</p>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.students.join(", ")}
      </TableCell>
      <TableCell className="text-xs hidden lg:table-cell">
        {item.phone}
      </TableCell>
      <TableCell className="text-xs hidden lg:table-cell">
        {item.address}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-evenly gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal
                type="update"
                table="parent"
                data={{
                  id: 1,
                  username: "deanguerrero",
                  email: "deanguerrero@gmail.com",
                  password: "password",
                  firstName: "Dean",
                  lastName: "Guerrero",
                  phone: "+1 234 567 89",
                  address: "1234 Main St, Anytown, USA",
                  sex: "male",
                  img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                }}
              />
              <FormModal type="delete" table="parent" />
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Parents</h1>
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
            {(role === "admin" || role === "teacher") && (
              <FormModal type="create" table="parent" />
            )}
          </div>
        </div>
      </div>
      <InfoTable columns={columns} row={row} data={parentsData} />
    </div>
  );
}
