import { FileTextIcon, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PiChalkboardTeacher, PiStudent } from "react-icons/pi";
import { GrUserAdmin } from "react-icons/gr";
import KemuChatResponse from "@/app/interfaces/KemuChatResponse";
import PerformanceChart from "./PerfomanceChart";
import KemuLoginLog from "@/app/interfaces/KemuLoginLog";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintTemplate from "./PrintTemplate";
import { DatePickerWithRange } from "./DatePickerWithRange";
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
export function AdminDashboard({
  allChatResponses,
  trendPercentage,
  userRolesCount,
  allLoginLogs,
  userActivity,
}: Props) {
  const contentToPrint = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: "Site Report",
    onBeforeGetContent: () => console.log("before getting content..."),
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    onPrintError: (errorLocation, error) => {
      console.log(errorLocation, error);
    },
    removeAfterPrint: true,
    suppressErrors: process.env.NODE_ENV === "production",
    content: () => contentToPrint.current,
  });
  return (
    <>
      <div>
        <PrintTemplate
          ref={contentToPrint}
          allChatResponses={allChatResponses}
          trendPercentage={trendPercentage}
          userRolesCount={userRolesCount}
          allLoginLogs={allLoginLogs}
          userActivity={userActivity}
        />
      </div>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className=" flex justify-end  ">
            <div className="flex gap-6">
              {/* <DatePickerWithRange /> */}
              <Button onClick={handlePrint} className="py-4 flex gap-2">
                <FileTextIcon className="size-4" /> Download Report
              </Button>
            </div>
          </div>
          {/* Top Card */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRolesCount.totalUsers}
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <PiStudent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRolesCount.studentUsers}
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Staff</CardTitle>
                <PiChalkboardTeacher className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRolesCount.staffUsers}
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Admins</CardTitle>
                <GrUserAdmin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userRolesCount.adminUsers}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 ">
            {/* Performance Chart */}
            <div className="xl:col-span-2" x-chunk="dashboard-01-chunk-5">
              <PerformanceChart
                allChatResponses={allChatResponses}
                trendPercentage={trendPercentage}
              />
            </div>

            {/* Activity */}

            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Activity</CardTitle>
                  <CardDescription>
                    Recent activities from your app.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell lg:hidden xl:table-column">
                        Role
                      </TableHead>
                      <TableHead className="text-right">Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allLoginLogs.map((loginLog, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">
                            {loginLog.firstName} {loginLog.lastName}
                          </div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {loginLog.email}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                          {loginLog?.userRole.charAt(0).toUpperCase()}
                          {loginLog?.userRole.slice(1)}
                        </TableCell>
                        <TableCell className="text-right">
                          {loginLog.last_login.toDate().toDateString()}
                          {", "}
                          {loginLog.last_login
                            .toDate()
                            .toLocaleTimeString("en-US")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
