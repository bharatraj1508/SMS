"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { day: "Monday", present: 186, absent: 80 },
  { day: "Tuesday", present: 305, absent: 200 },
  { day: "Wednesday", present: 237, absent: 120 },
  { day: "Thursday", present: 73, absent: 190 },
  { day: "Friday", present: 209, absent: 130 },
  { day: "Saturday", present: 214, absent: 140 },
];

const chartConfig = {
  present: {
    label: "present",
    color: "hsl(var(--chart-2))",
  },
  absent: {
    label: "absent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Student Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="present"
              stackId="a"
              fill="var(--color-present)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="absent"
              stackId="a"
              fill="var(--color-absent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
