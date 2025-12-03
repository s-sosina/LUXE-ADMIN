"use client";

import { useState } from "react";
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
import { Eye } from "lucide-react";
import { Pagination } from "@/components/pagination-component";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { VerificationRequestDetails } from "./VerificationRequestDetails";

import { MOCK_VERIFICATION_REQUESTS } from "@/lib/data/mock-user-verification";

// Type definitions
type VerificationStatus = "pending" | "approved" | "rejected";

interface VerificationUser {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface VerificationRequest {
  id: string;
  user: VerificationUser;
  nin: string;
  submittedAt: string;
  status: VerificationStatus;
}

interface VerificationResponse {
  data: VerificationRequest[];
  totalPages: number;
  currentPage: number;
}

export function VerificationTable() {
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] =
    useState<VerificationRequest | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<VerificationResponse>({
    queryKey: ["verification-requests", page],
    queryFn: async () => {
      // In a real app, this would be:
      // const res = await fetch(`/api/verifications?page=${page}&limit=10`)
      // return res.json()

      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        data: MOCK_VERIFICATION_REQUESTS as unknown as VerificationRequest[],
        totalPages: 1,
        currentPage: page,
      };
    },
  });

  const handleReview = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const handleApprove = async (id: string) => {
    toast({
      title: "Processing...",
      description: "Approving verification request",
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update cache
    queryClient.setQueryData<VerificationResponse>(
      ["verification-requests", page],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((req) =>
            req.id === id ? { ...req, status: "approved" } : req
          ),
        };
      }
    );

    toast({
      title: "Success",
      description: "Verification request approved",
      variant: "default",
    });
    setIsDetailsOpen(false);
  };

  const handleReject = async (id: string) => {
    toast({
      title: "Processing...",
      description: "Rejecting verification request",
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update cache
    queryClient.setQueryData<VerificationResponse>(
      ["verification-requests", page],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((req) =>
            req.id === id ? { ...req, status: "rejected" } : req
          ),
        };
      }
    );

    toast({
      title: "Success",
      description: "Verification request rejected",
      variant: "destructive",
    });
    setIsDetailsOpen(false);
  };

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0">
            Pending Review
          </Badge>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <p className="text-center text-muted-foreground">Loading requests...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-foreground">
                User
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                NIN
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Date Submitted
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Status
              </TableHead>
              <TableHead className="font-semibold text-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.user.avatar} />
                      <AvatarFallback>
                        {request.user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {request.user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.user.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.user.phone}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{request.nin}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(request.submittedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleReview(request)}
                  >
                    <Eye className="h-4 w-4" />
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={data?.totalPages || 1}
          totalItems={data?.data.length || 0}
          itemsPerPage={10}
          itemLabel="requests"
          onPageChange={setPage}
        />
      </div>

      <VerificationRequestDetails
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        request={selectedRequest}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
}
