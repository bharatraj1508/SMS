"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentSelectBox({
  children,
  selectedStudentId,
}: {
  children: Student[];
  selectedStudentId: string;
}) {
  const router = useRouter();
  const handleChange = (value: string) => {
    selectedStudentId = value;
    router.push(`?child=${selectedStudentId}`);
  };
  return (
    <Select value={selectedStudentId} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {children.map((child, key) => (
          <SelectItem value={child.id} key={key}>
            {child.firstName + " " + child.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
