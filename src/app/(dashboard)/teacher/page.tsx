import Announcements from "@/components/Announcement";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import BigCalendar from "@/components/BigCalendar";
import StudentChartContainer from "@/components/StudentChartContainer";
import { prisma } from "@/lib/prisma";
import { getUserID } from "@/lib/role";
import { updatedStartAndEndDateTime } from "@/lib/utils";

export default async function TeacherPage() {
  const currentUserId = await getUserID();

  const data = await prisma.lesson.findMany({
    where: { teacherId: currentUserId! },
  });

  const schedule = updatedStartAndEndDateTime(data);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="lg:w-2/3 w-full flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-6 ">
          {/* Student Charts */}

          <StudentChartContainer />

          {/* Attendance Chart */}
          <AttendanceChartContainer />
        </div>
        <div className="bg-white p-4 h-screen">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendar schedule={schedule} />
        </div>
      </div>
      <div className="lg:w-1/3 w-full flex flex-col gap-4">
        <div>
          <Announcements />
        </div>
      </div>
    </div>
  );
}
