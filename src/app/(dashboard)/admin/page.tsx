import AdminUserCard from "@/components/AdminUserCard";
import Announcements from "@/components/Announcement";
import { AttendanceChart } from "@/components/AttendanceChart";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { FinanceChart } from "@/components/FinanceChart";
import { StudentChart } from "@/components/StudentChart";
import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function AdminPage({ searchParams }: Props) {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "MALE")?._count || 0;

  // LOGIC TO FETCH THE ATTENDANCE DATA AND GROUP THEM TO THE WEEKDAYS STARTING FROM MONDAY

  const today = new Date();

  const dayOfWeek = today.getDay();

  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);

  lastMonday.setDate(today.getDate() - daysSinceMonday);
  lastMonday.setHours(0, 0, 0, 0);

  const attDataRes = await prisma.attendance.findMany({
    where: {
      date: { gte: lastMonday },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
      Sat: { present: 0, absent: 0 },
    };

  attDataRes.map((item) => {
    if (dayOfWeek >= 1 && dayOfWeek <= 6) {
      const dayNum = item.date.getDay();

      const dayName = days[dayNum];

      item.present
        ? (attendanceMap[dayName].present += 1)
        : (attendanceMap[dayName].absent += 1);
    }
  });

  const attendanceData = days.map((item) => ({
    day: item,
    present: attendanceMap[item].present,
    absent: attendanceMap[item].absent,
  }));

  return (
    <>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="lg:w-2/3 w-full flex flex-col gap-8">
          <div className="flex gap-4 justify-between flex-wrap">
            {/* User Cards */}
            <AdminUserCard type="admin" bgColor="bg-chart-1" />
            <AdminUserCard type="student" bgColor="bg-chart-2" />
            <AdminUserCard type="parent" bgColor="bg-chart-3" />
            <AdminUserCard type="teacher" bgColor="bg-chart-5" />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 ">
            {/* Student Charts */}
            <div className="lg:w-1/3 bg-neutral-50 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
              <StudentChart boys={boys} girls={girls} />
            </div>

            {/* Attendance Chart */}
            <div className="w-full lg:w-2/3 bg-neutral-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
              <AttendanceChart chartData={attendanceData} />
            </div>
          </div>

          {/* Finance Chart */}
          <div className="w-full bg-neutral-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
            <FinanceChart />
          </div>
        </div>
        <div className="lg:w-1/3 w-full flex flex-col gap-4">
          {/* Calendar Events */}

          <EventCalendarContainer searchParams={searchParams} />

          {/* Announcements */}
          <div>
            <Announcements />
          </div>
        </div>
      </div>
    </>
  );
}
