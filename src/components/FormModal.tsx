import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "./ui/button";

export default function FormModal({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) {
  const GetIcon = (): React.ReactNode => {
    return type === "create" ? (
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-chart-3">
        <Plus width={18} height={18} className="text-white" />
      </div>
    ) : type === "delete" ? (
      <Trash2 className="w-5 h-5 cursor-pointer hover:scale-110 transition-all duration-300" />
    ) : type === "update" ? (
      <Pencil className="w-5 h-5 cursor-pointer hover:scale-110 transition-all duration-300" />
    ) : null;
  };

  const Form = () => {
    return type === "delete" ? (
      <>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure you want to delete this ?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <Button className="bg-red-500 text-white">
            Yes, I want to delete this
          </Button>
        </div>
      </>
    ) : type === "create" || "update" ? (
      "create or update"
    ) : (
      "wrong input"
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <GetIcon />
      </DialogTrigger>
      <DialogContent>
        <Form />
      </DialogContent>
    </Dialog>
  );
}
