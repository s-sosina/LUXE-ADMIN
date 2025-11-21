'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {MetricsCards} from "@/components/metric-card"
import { ActivityAndToursTabs } from "@/components/activities-section";
export default function DashboardPage() {
     const [selectedPeriod, setSelectedPeriod] = useState("this-quarter");
  return (
    <div>
      <div className="flex items-start justify-between ">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome to Luxe Admin Panel
          </p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-quarter">This Quarter</SelectItem>
            <SelectItem value="last-quarter">Last Quarter</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Metric Card  */}
      <MetricsCards period={selectedPeriod}/>

      {/* Tabs Section  */}
      <ActivityAndToursTabs />
    </div>
  );
}
