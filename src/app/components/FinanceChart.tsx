"use client";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Feb",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Mar",
    income: 2000,
    expense: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    income: 2780,
    expense: 3908,
  },
  {
    name: "May",
    income: 1890,
    expense: 4800,
  },
  {
    name: "June",
    income: 2390,
    expense: 3800,
  },
  {
    name: "July",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Aug",
    income: 3435,
    expense: 2324,
  },
  {
    name: "Sept",
    income: 7558,
    expense: 4893,
  },
  {
    name: "Oct",
    income: 3454,
    expense: 4221,
  },
  {
    name: "Nov",
    income: 3434,
    expense: 2352,
  },
  {
    name: "Dec",
    income: 2324,
    expense: 2366,
  },
];
export default function FinanceChart() {
  return (
    <div className="h-full bg-white rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" alt="more-icon" width={20} height={20} />
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#C3EBFA"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#CFCEFF"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
