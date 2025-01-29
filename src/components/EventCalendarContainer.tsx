import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import Image from "next/image";

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function EventCalendarContainer({ searchParams }: Props) {
  const { date } = searchParams;
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <EventCalendar />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
}
