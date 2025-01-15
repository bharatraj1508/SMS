"use client";

import AdminUserCard from "@/components/AdminUserCard";
import Announcements from "@/components/Announcement";
import { AttendanceChart } from "@/components/AttendanceChart";
import EventCalendar from "@/components/EventCalendar";
import { FinanceChart } from "@/components/FinanceChart";
import { StudentChart } from "@/components/StudentChart";

export default function AdminPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="lg:w-2/3 w-full flex flex-col gap-8">
          <div className="flex gap-4 justify-between flex-wrap">
            {/* User Cards */}
            <AdminUserCard type="Student" bgColor="bg-chart-1" />
            <AdminUserCard type="Parent" bgColor="bg-chart-2" />
            <AdminUserCard type="Teacher" bgColor="bg-chart-3" />
            <AdminUserCard type="Staff" bgColor="bg-chart-5" />
          </div>

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

          {/* Finance Chart */}
          <div className="w-full bg-neutral-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
            <FinanceChart />
          </div>
        </div>
        <div className="lg:w-1/3 w-full flex flex-col gap-4">
          {/* Calendar Events */}

          <EventCalendar />

          {/* Announcements */}
          <div>
            <Announcements />
          </div>
        </div>
      </div>
    </>
  );
}
