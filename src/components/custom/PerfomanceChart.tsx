import React, { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, LabelList } from "recharts";
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
import KemuChatResponse from "@/app/interfaces/KemuChatResponse";
import { Timestamp } from "firebase/firestore";

const chartConfig = {
  prompt: {
    label: "prompt",
    color: "hsl(var(--chart-1))",
  },
  response: {
    label: "response",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  allChatResponses: KemuChatResponse[];
  trendPercentage: number;
}

const CustomXAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize={12}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function PerformanceChart({
  allChatResponses,
  trendPercentage,
}: Props) {
  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const chartData = useMemo(() => {
    return allChatResponses
      .map((chatResponse) => ({
        time: formatDate(chatResponse.created_at),
        prompt: Math.round(chatResponse.prompt_eval_tks),
        response: Math.round(chatResponse.response_eval_tks),
        total: Math.round(
          chatResponse.prompt_eval_tks + chatResponse.response_eval_tks
        ),
      }))
      .reverse();
  }, [allChatResponses]);

  const trendingUpIcon = <TrendingUp className="h-4 w-4 text-green-500" />;
  const trendingDownIcon = <TrendingDown className="h-4 w-4 text-red-500" />;

  const dateRange = useMemo(() => {
    if (chartData.length === 0) return "No data available";
    const startDate = chartData[0].time;
    const endDate = chartData[chartData.length - 1].time;
    return `${startDate} - ${endDate}`;
  }, [chartData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
        <CardDescription>Average tokens per second over time</CardDescription>
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
            height={200}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tick={<CustomXAxisTick />}
              interval="preserveEnd"
              height={100}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="response"
              type="natural"
              fill="var(--color-response)"
              fillOpacity={0.4}
              stroke="var(--color-response)"
              stackId="a"
              dot={{ fill: "var(--color-response)" }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                dataKey="response"
                position="top"
                offset={10}
                className="fill-foreground"
                fontSize={12}
              />
            </Area>
            <Area
              dataKey="prompt"
              type="natural"
              fill="var(--color-prompt)"
              fillOpacity={0.4}
              stroke="var(--color-prompt)"
              stackId="a"
              dot={{ fill: "var(--color-prompt)" }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                dataKey="prompt"
                position="top"
                offset={10}
                className="fill-foreground"
                fontSize={12}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            {trendPercentage > 0 ? "Trending up" : "Trending down"} by{" "}
            {Math.abs(trendPercentage)}%
            {trendPercentage > 0 ? trendingUpIcon : trendingDownIcon}
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            {dateRange}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
