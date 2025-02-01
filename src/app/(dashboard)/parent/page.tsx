import Announcements from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import { prisma } from "@/lib/prisma";
import { getUserID } from "@/lib/role";
import { updatedStartAndEndDateTime } from "@/lib/utils";
import StudentSelectBox from "@/components/StudentSelectBox";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function ParentPage({ searchParams }: Props) {
  const currentUserId = await getUserID();

  const children = await prisma.student.findMany({
    where: { parent: { id: currentUserId! } },
  });

  const selectedStudent = searchParams.child
    ? searchParams.child
    : children[0].id;

  const data = await prisma.lesson.findMany({
    where: { class: { students: { some: { id: selectedStudent! } } } },
  });

  const schedule = updatedStartAndEndDateTime(data);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row h-screen">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Schedule for</h1>
            <div>
              <StudentSelectBox
                children={children}
                selectedStudentId={selectedStudent}
              />
            </div>
          </div>

          <div className="h-screen">
            <BigCalendar schedule={schedule} />
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
}
