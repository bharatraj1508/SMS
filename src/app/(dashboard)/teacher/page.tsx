import Announcements from "@/components/Announcement";
import { AttendanceChart } from "@/components/AttendanceChart";
import BigCalendar from "@/components/BigCalendar";
import { StudentChart } from "@/components/StudentChart";

export default function TeacherPage() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="lg:w-2/3 w-full flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-6 ">
          {/* Student Charts */}
          <div className="lg:w-1/3 bg-neutral-50 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
            <StudentChart />
          </div>

          {/* Attendance Chart */}
          <div className="w-full lg:w-2/3 bg-neutral-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
            <AttendanceChart />
          </div>
        </div>
        <div className="bg-white p-4 h-screen">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendar />
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
