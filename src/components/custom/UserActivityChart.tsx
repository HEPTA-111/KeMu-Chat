import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

export interface DailyUserCount {
  [day: string]: number;
}

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

interface Props {
  userActivity: DailyUserCount | null;
}

export function UserActivityChart({ userActivity }: Props) {
  const chartData = userActivity
    ? Object.entries(userActivity).map(([day, count]) => ({
        day,
        users: count,
      }))
    : [];

  const totalUsers = chartData.reduce((sum, day) => sum + day.users, 0);
  const averageUsers = totalUsers / 7;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily User Activity</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="day"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="users" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="users"
              layout="vertical"
              fill="var(--color-users)"
              radius={4}
            >
              <LabelList
                dataKey="day"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="users"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Average {averageUsers.toFixed(1)} users per day
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
