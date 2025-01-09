import AttendanceChart from "@/app/components/AttendanceChart";
import CountChart from "@/app/components/CountChart";
import FinanceChart from "@/app/components/FinanceChart";
import UserCard from "@/app/components/UserCard";

export default function AdminPage() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* count chart  */}
          <div className="w-full lg:w-1/3 h-[400px]">
            <CountChart />
          </div>
          {/* bar chart */}
          <div className="w-full lg:w-2/3 h-[400px]">
            <AttendanceChart />
          </div>
        </div>
        {/* bottom charts */}
        <div className="w-full h-[450px]">
          <FinanceChart />
        </div>
      </div>

      {/* right */}
      <div className="w-full lg:w-1/3">r</div>
    </div>
  );
}
