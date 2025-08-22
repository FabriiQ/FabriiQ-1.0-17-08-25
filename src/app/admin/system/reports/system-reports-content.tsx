"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Search, Calendar, BarChart2, Users, Building2, Activity } from "lucide-react";
import { api } from "@/trpc/react";

export default function SystemReportsContent() {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<{ start?: string; end?: string }>({});

  // Basic analytics hooks from existing systemAnalytics router
  const { data: userActivity } = api.systemAnalytics.getUserActivity.useQuery({ days: 7 });
  const { data: userDistribution } = api.systemAnalytics.getUserDistribution.useQuery();
  const { data: campusPerformance } = api.systemAnalytics.getCampusPerformance.useQuery();
  const { data: institutionPerformance } = api.systemAnalytics.getInstitutionPerformance.useQuery();

  // Simple placeholders for export actions – wiring to export endpoints can be added later
  const handleExport = (format: "csv" | "excel" | "pdf") => {
    // TODO: wire to export endpoints when available
    console.log("Export requested:", format, { dateRange, search });
  };

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports, metrics..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" /> Date Range
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" onClick={() => handleExport("csv")}>CSV</Button>
          <Button variant="outline" onClick={() => handleExport("excel")}>Excel</Button>
          <Button onClick={() => handleExport("pdf")}>
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campuses">Cross-Campus</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5" /> User Activity (7d)</CardTitle>
                <CardDescription>Logins, registrations, active users</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-muted-foreground max-h-40 overflow-auto bg-muted/30 p-2 rounded-md">
                  {JSON.stringify(userActivity || [], null, 2)}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> User Distribution</CardTitle>
                <CardDescription>Active users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-muted-foreground max-h-40 overflow-auto bg-muted/30 p-2 rounded-md">
                  {JSON.stringify(userDistribution || [], null, 2)}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart2 className="h-5 w-5" /> System Health</CardTitle>
                <CardDescription>Basic system metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Additional KPIs can be added here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cross-campus */}
        <TabsContent value="campuses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Campus Performance</CardTitle>
              <CardDescription>Students, teachers and courses by campus</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground max-h-64 overflow-auto bg-muted/30 p-2 rounded-md">
                {JSON.stringify(campusPerformance || [], null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Users</CardTitle>
              <CardDescription>Distribution and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground max-h-64 overflow-auto bg-muted/30 p-2 rounded-md">
                {JSON.stringify(userDistribution || [], null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Institutions */}
        <TabsContent value="institutions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Institution Overview</CardTitle>
              <CardDescription>Campuses, students, teachers, courses</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground max-h-64 overflow-auto bg-muted/30 p-2 rounded-md">
                {JSON.stringify(institutionPerformance || [], null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

