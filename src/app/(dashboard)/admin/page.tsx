"use client";

import AdminUserCard from "@/components/AdminUserCard";
import Announcements from "@/components/Announcement";
import { AttendanceChart } from "@/components/AttendanceChart";
import EventCalendar from "@/components/EventCalendar";
import { FinanceChart } from "@/components/FinanceChart";
import { StudentChart } from "@/components/StudentChart";
import { useState } from "react";

export default function AdminPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
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
            <div className="w-full lg:w-1/3 flex flex-col bg-neutral-50 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-500">
              {/* Student Charts */}
              <StudentChart />
              <div className="flex items-center justify-center pb-4">
                <div className="flex justify-center gap-16">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 bg-chart-1 rounded-full" />
                    <h1 className="font-bold">875</h1>
                    <h2 className="text-xs text-neutral-800">Boys (55%)</h2>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 bg-chart-2 rounded-full" />
                    <h1 className="font-bold">620</h1>
                    <h2 className="text-xs text-neutral-800">Girls (45%)</h2>
                  </div>
                </div>
              </div>
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
