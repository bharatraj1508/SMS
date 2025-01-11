"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", income: 250, expense: 120 },
  { month: "February", income: 320, expense: 180 },
  { month: "March", income: 275, expense: 140 },
  { month: "April", income: 150, expense: 210 },
  { month: "May", income: 300, expense: 170 },
  { month: "June", income: 280, expense: 150 },
  { month: "July", income: 310, expense: 245 },
  { month: "August", income: 290, expense: 190 },
  { month: "September", income: 270, expense: 170 },
  { month: "October", income: 260, expense: 180 },
  { month: "November", income: 295, expense: 200 },
  { month: "December", income: 310, expense: 220 },
];

const chartConfig = {
  income: {
    label: "income",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "expense",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function FinanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>School Expense Report</CardTitle>
        <CardDescription>Januray - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              stackId="a"
            />
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
