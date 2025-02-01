import Announcements from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { prisma } from "@/lib/prisma";
import { getUserID } from "@/lib/role";
import { updatedStartAndEndDateTime } from "@/lib/utils";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function StudentPage({ searchParams }: Props) {
  const currentUserId = await getUserID();

  const data = await prisma.lesson.findMany({
    where: { class: { students: { some: { id: currentUserId! } } } },
  });

  const schedule = updatedStartAndEndDateTime(data);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full w-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <div className="h-screen">
            <BigCalendar schedule={schedule} />
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
}
