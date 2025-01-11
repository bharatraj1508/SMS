import AdminUserCard from "@/components/AdminUserCard";

export default function AdminPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="lg:w-2/3  w-full">
          <div className="flex gap-4 justify-between flex-wrap">
            {/* User Cards */}
            <AdminUserCard type="Student" bgColor="bg-chart-1" />
            <AdminUserCard type="Parent" bgColor="bg-chart-2" />
            <AdminUserCard type="Teacher" bgColor="bg-chart-3" />
            <AdminUserCard type="Staff" bgColor="bg-chart-5" />
          </div>

          {/* Student Charts */}
          {/* Attendance Chart */}
          {/* Finance Chart */}
        </div>
        <div className="lg:w-1/3 w-full">
          {/* Calendar Events */}
          {/* Announcements */}
        </div>
      </div>
    </>
  );
}
