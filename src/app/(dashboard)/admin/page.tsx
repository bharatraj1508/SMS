import AdminUserCard from "@/components/AdminUserCard";
import Announcements from "@/components/Announcement";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { FinanceChart } from "@/components/FinanceChart";
import StudentChartContainer from "@/components/StudentChartContainer";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function AdminPage({ searchParams }: Props) {
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
            <StudentChartContainer />

            {/* Attendance Chart */}

            <AttendanceChartContainer />
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
