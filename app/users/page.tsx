"use client";

import { UserMetricsCards } from "@/components/users/user-metric-cards";
import { UsersTable } from "@/components/users/users-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

export default function UsersPage() {
     const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  return (
    <main>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Users Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all users on the platform
          </p>
        </div>

        {/* Metrics Cards */}
        <UserMetricsCards />

        {/* Filters */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search users by name, phone number or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 h-12"
            />
          </div>

          {/* Role Filter */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200 h-12">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="tour-guide">Tour Guide</SelectItem>
              <SelectItem value="traveler">Traveler</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200 h-12">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users Table */}
        <UsersTable
          searchQuery={searchQuery}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
        />
      </div>
    </main>
  );
}
