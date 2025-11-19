// components/dashboard/ActivityAndToursTabs.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RecentActivitySection } from "@/components/recent-activities";

export function ActivityAndToursTabs() {
  return (
    <div className="mt-8">
      <Tabs defaultValue="activities" className="w-full">
        <div className="mb-4">
          <TabsList className="inline-flex h-10 rounded-full bg-gray-100 p-1 text-sm font-medium text-gray-500">
            <TabsTrigger
              value="activities"
              className="rounded-full px-4 py-2 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Recent Activities
            </TabsTrigger>
            <TabsTrigger
              value="tours"
              className="rounded-full px-4 py-2 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
            >
              Top Performing Tours
            </TabsTrigger>
          </TabsList>
        </div>

        <Card className="border border-gray-100 rounded-2xl shadow-sm">
          <CardContent className="px-0 pt-4">
            <TabsContent value="activities" className="mt-0">
              <RecentActivitySection />
            </TabsContent>

            <TabsContent value="tours" className="mt-0">
              <div className="px-6 text-center py-12 text-sm text-gray-500">
                Top Performing Tours coming soon
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
