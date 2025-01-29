"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function StudentChart({ boys, girls }: { boys: number; girls: number }) {
  const chartData = [
    { gender: "Boys", count: boys, fill: "hsl(var(--chart-1))" },
    { gender: "Girls", count: girls, fill: "hsl(var(--chart-2))" },
  ];

  const chartConfig = {
    total: {
      label: "Total",
    },
    Boys: {
      label: "Boys",
      color: "hsl(var(--chart-1))",
    },
    Girls: {
      label: "Girls",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  const totalStudents = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="gender"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {totalStudents.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Students
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex items-center justify-center pb-4">
        <div className="flex justify-center gap-16">
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 bg-chart-1 rounded-full" />
            <h1 className="font-bold">{boys}</h1>
            <h2 className="text-xs text-neutral-800">
              Boys ({Math.round((boys / (boys + girls)) * 100)}%)
            </h2>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 bg-chart-2 rounded-full" />
            <h1 className="font-bold">{girls}</h1>
            <h2 className="text-xs text-neutral-800">
              Girls ({Math.round((girls / (boys + girls)) * 100)}%)
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
