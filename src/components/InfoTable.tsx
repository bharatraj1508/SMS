import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";

export default function InfoTable({
  columns,
  row,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];

  row: (item: any) => React.ReactNode;
  data: any[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <Table>
        <TableCaption>A list of all the teachers.</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((cl) => (
              <TableHead key={cl.accessor} className={cl.className}>
                {cl.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{data.map((item) => row(item))}</TableBody>
      </Table>
    </div>
  );
}
