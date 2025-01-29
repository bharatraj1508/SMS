import { prisma } from "@/lib/prisma";
import { getUserID, getUserRole } from "@/lib/role";

const Announcements = async () => {
  const role = await getUserRole();
  const currentUserId = await getUserID();

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    <div className="bg-white p-4 rounded-md border border-gray-300">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-rose-100 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[0].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {data[0].date.toLocaleDateString("en-US")}
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-1">{data[0].description}</p>
        </div>
        <div className="bg-emerald-100 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[1].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {data[1].date.toLocaleDateString("en-US")}
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-1">{data[1].description}</p>
        </div>
        <div className="bg-rose-100 rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">{data[2].title}</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              {data[2].date.toLocaleDateString("en-US")}
            </span>
          </div>
          <p className="text-sm text-neutral-400 mt-1">{data[2].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
