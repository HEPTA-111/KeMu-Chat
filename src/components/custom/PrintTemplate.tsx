import KemuChatResponse from "@/app/interfaces/KemuChatResponse";
import KemuLoginLog from "@/app/interfaces/KemuLoginLog";
import { forwardRef } from "react";

import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PiChalkboardTeacher, PiStudent } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import PerformanceChart from "./PerfomanceChart";
import { UserActivityChart } from "./UserActivityChart";
import { DailyUserCount } from "@/app/hooks/useWeeklyUserActivity";

interface Props {
  allChatResponses: KemuChatResponse[];
  trendPercentage: number;
  userRolesCount: {
    totalUsers: number;
    adminUsers: number;
    staffUsers: number;
    studentUsers: number;
  };
  allLoginLogs: KemuLoginLog[];
  userActivity: DailyUserCount | null;
}

const PrintTemplate = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    allChatResponses,
    trendPercentage,
    userRolesCount,
    allLoginLogs,
    userActivity,
  } = props;

  return (
    // <div className=" z-50 absolute overflow-hidden w-screen">
    <div className="h-0 z-50 absolute overflow-hidden">
      <div
        ref={ref}
        className="w-full max-w-[210mm] mx-auto bg-white text-black"
      >
        {/* Page 1 */}
        <div className="p-8  ">
          <h1 className="text-3xl font-bold mb-6">Platform Report</h1>

          {/* Top Cards */}
          <div className="grid gap-4 grid-cols-4 mb-8">
            <Card className="shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Total Users
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {userRolesCount.totalUsers}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Students
                  <PiStudent className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {userRolesCount.studentUsers}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Staff
                  <PiChalkboardTeacher className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {userRolesCount.staffUsers}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  Admins
                  <GrUserAdmin className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {userRolesCount.adminUsers}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Activity */}
          <div className="">
            <h2 className="text-xl font-semibold mb-4">User Activity</h2>

            <UserActivityChart userActivity={userActivity} />
          </div>
        </div>

        {/* Page 2 */}
        {/* Performance Chart */}

        <div className="p-8  break-before-page">
          <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>

          <div className="">
            <PerformanceChart
              allChatResponses={allChatResponses}
              trendPercentage={trendPercentage}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

PrintTemplate.displayName = "PrintTemplate";
export default PrintTemplate;
