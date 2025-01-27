import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function InfoTable({
  columns,
  row,
  data,
  count,
}: {
  columns: { header: string; accessor: string; className?: string }[];

  row: (item: any) => React.ReactNode;
  data: any[];
  count: number;
}) {
  return (
    <div className="flex flex-col gap-8">
      <Table>
        <TableCaption>A total of {count} records.</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((cl) => (
              <TableHead key={cl.accessor} className={cl.className}>
                {cl.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <React.Fragment key={index}>{row(item)}</React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
