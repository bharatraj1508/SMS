import { lessonsData } from "../../../../lib/data";
import { role } from "../../../../lib/data";
import Image from "next/image";
import { TableCell, TableRow } from "@/components/ui/table";

import { SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import InfoTable from "@/components/InfoTable";
import FormModal from "@/components/FormModal";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
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

export default function LessonListPage() {
  const row = (item: Lesson) => (
    <TableRow className="even:bg-gray-100">
      <TableCell className="text-xs">{item.subject}</TableCell>
      <TableCell className="text-xs hidden md:table-cell">
        {item.class}
      </TableCell>
      <TableCell className="text-xs">{item.teacher}</TableCell>
      <TableCell>
        <div className="flex items-center justify-evenly gap-2">
          <FormModal type="update" table="subject" />
          {role === ("admin" || "teacher") && (
            <FormModal type="delete" table="lesson" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-xl font-semibold">All Lessons</h1>
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
              <FormModal type="create" table="lesson" />
            )}
          </div>
        </div>
      </div>
      <InfoTable columns={columns} row={row} data={lessonsData} />
    </div>
  );
}
