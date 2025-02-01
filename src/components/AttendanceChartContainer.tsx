import { prisma } from "@/lib/prisma";
import { AttendanceChart } from "./AttendanceChart";

export default async function AttendanceChartContainer() {
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
    <div className="w-full lg:w-2/3 bg-neutral-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
      <AttendanceChart chartData={attendanceData} />
    </div>
  );
}
