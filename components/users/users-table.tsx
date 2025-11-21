"use client";

import { useEffect, useTransition, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pagination } from "@/components/pagination-component";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "tour-guide" | "traveler";
  status: "active" | "inactive" | "pending";
  dateJoined: string;
  avatar?: string;
  isVerified: boolean;
}

interface UsersTableProps {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
}

export function UsersTable({
  searchQuery,
  roleFilter,
  statusFilter,
}: UsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const prevSearchQuery = useRef(searchQuery);
  const prevRoleFilter = useRef(roleFilter);
  const prevStatusFilter = useRef(statusFilter);

  useEffect(() => {
    const handler = () => {
      startTransition(() => {
        // Reset to page 1 if filters changed
        const filtersChanged =
          prevSearchQuery.current !== searchQuery ||
          prevRoleFilter.current !== roleFilter ||
          prevStatusFilter.current !== statusFilter;

        const page = filtersChanged ? 1 : currentPage;

        if (filtersChanged) {
          prevSearchQuery.current = searchQuery;
          prevRoleFilter.current = roleFilter;
          prevStatusFilter.current = statusFilter;
        }

        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (roleFilter !== "all") params.set("role", roleFilter);
        if (statusFilter !== "all") params.set("status", statusFilter);
        params.set("page", page.toString());
        params.set("limit", itemsPerPage.toString());

        fetch(`/api/users?${params.toString()}`, {
          cache: "no-store",
        })
          .then((res) => res.json())
          .then((data) => {
            setUsers(data.users || []);
            setTotalItems(data.totalItems || 0);
            setTotalPages(data.totalPages || 1);
            if (filtersChanged) {
              setCurrentPage(1);
            }
          })
          .catch((err) => {
            console.error("Failed to fetch users:", err);
            setUsers([]);
            setTotalItems(0);
            setTotalPages(1);
          });
      });
    };

    const timer = setTimeout(handler, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, roleFilter, statusFilter, currentPage, itemsPerPage]);

  const getRoleBadgeColor = (role: string) =>
    role === "tour-guide"
      ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
      : "bg-gray-100 text-gray-700 hover:bg-gray-100";

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "inactive":
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  const formatRole = (role: string) =>
    role === "tour-guide" ? "Tour Guide" : "Traveler";

  const formatStatus = (status: string) =>
    status.charAt(0).toUpperCase() + status.slice(1);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Skeleton Rows
  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8" />
      </TableCell>
    </TableRow>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-foreground">
              User
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Roles
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Date Joined
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            // Show 5 skeleton rows while loading
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-muted-foreground"
              >
                No users found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          {user.name}
                        </p>
                        {user.isVerified && (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.phone}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {formatRole(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(user.status)}>
                    {formatStatus(user.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(user.dateJoined)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Change Status</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          itemLabel="users"
          onPageChange={handlePageChange}
          loading={isPending}
        />
      )}
    </div>
  );
}
