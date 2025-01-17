import { classesData } from "../../../../lib/data";
import { role } from "../../../../lib/data";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";

import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string[];
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

export default function ClassListPage() {
  const row = (item: Class) => (
    <TableRow className="even:bg-gray-100">
      <TableCell className="text-xs">{item.name}</TableCell>
      <TableCell className="text-xs">{item.supervisor}</TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.capacity}
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {item.grade}
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-evenly gap-2">
          <FormModal type="update" table="subject" />
          {role === ("admin" || "teacher") && (
            <FormModal type="delete" table="class" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Classes</h1>
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
            {role === ("admin" || "teacher") && (
              <FormModal type="create" table="class" />
            )}
          </div>
        </div>
      </div>
      <InfoTable columns={columns} row={row} data={classesData} />
    </div>
  );
}
