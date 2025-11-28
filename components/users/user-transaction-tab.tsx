"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

/**
 * =============================================================================
 * BACKEND REQUIREMENTS: User Transactions API
 * =============================================================================
 *
 * Endpoint: GET /api/users/[id]/transactions?page={page}&limit={limit}
 *
 * Expected Response:
 * {
 *   transactions: [
 *     {
 *       id: string,
 *       type: "tour_earnings" | "withdrawal",
 *       date: string (ISO date),
 *       description: string,
 *       tourName?: string,
 *       tourCost?: number,
 *       platformCommission?: number,
 *       guideReceives?: number,
 *       bankAccount?: string,
 *       amount: number,
 *       status: "completed" | "pending" | "failed"
 *     }
 *   ],
 *   pagination: { currentPage, totalPages, totalItems, itemsPerPage }
 * }
 *
 * =============================================================================
 */

interface Transaction {
  id: string;
  type: "tour_earnings" | "withdrawal";
  date: string;
  description: string;
  tourName?: string;
  tourCost?: number;
  platformCommission?: number;
  guideReceives?: number;
  bankAccount?: string;
  amount: number;
  status: "completed" | "pending" | "failed";
}

interface TransactionsResponse {
  transactions: Transaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface UserTransactionsTabProps {
  userId: string;
}

export function UserTransactionsTab({ userId }: UserTransactionsTabProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery<TransactionsResponse>({
    queryKey: ["user-transactions", userId, currentPage],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/transactions?page=${currentPage}&limit=10`)
      if (!res.ok) throw new Error("Failed to fetch transactions")
      return res.json()
    },
    placeholderData: keepPreviousData,
  })

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTypeBadge = (type: string) => {
    if (type === "tour_earnings") {
      return (
        <Badge className="bg-green-500 text-white hover:bg-green-500 font-medium px-3 py-1">
          Tour Earnings
        </Badge>
      );
    }
    return (
      <Badge className="bg-orange-500 text-white hover:bg-orange-500 font-medium px-3 py-1">
        Withdrawal
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-medium border-green-200">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 font-medium border-yellow-200">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 font-medium border-red-200">
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  const transactions = data?.transactions || [];
  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  };
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems
  );

  if (isLoading && !data) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">
            Loading transactions...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>
          Complete transaction history for this user
        </CardDescription>
      </CardHeader>
      <CardContent className={isLoading ? "opacity-50 transition-opacity" : ""}>
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No transactions found
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="align-top whitespace-nowrap text-muted-foreground">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell className="align-top">
                    {getTypeBadge(transaction.type)}
                  </TableCell>
                  <TableCell className="align-top">
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      {transaction.type === "tour_earnings" &&
                        transaction.tourName && (
                          <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                            <p>Tour: {transaction.tourName}</p>
                            {transaction.tourCost && (
                              <p>
                                Tour cost:{" "}
                                {formatCurrency(transaction.tourCost)}
                              </p>
                            )}
                            {transaction.platformCommission && (
                              <p className="text-red-500">
                                Platform commission (5%): -
                                {formatCurrency(transaction.platformCommission)}
                              </p>
                            )}
                            {transaction.guideReceives && (
                              <p className="text-green-600">
                                Guide receives:{" "}
                                {formatCurrency(transaction.guideReceives)}
                              </p>
                            )}
                          </div>
                        )}
                      {transaction.type === "withdrawal" &&
                        transaction.bankAccount && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Payout to {transaction.bankAccount}
                          </p>
                        )}
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <span
                      className={`font-semibold ${
                        transaction.type === "tour_earnings"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "tour_earnings" ? "+" : "-"}{" "}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </TableCell>
                  <TableCell className="align-top">
                    {getStatusBadge(transaction.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-6">
        <p className="text-sm text-muted-foreground">
          Showing {pagination.totalItems > 0 ? startItem : 0} to {endItem} of{" "}
          {pagination.totalItems} transaction
          {pagination.totalItems !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="gap-1"
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Page {pagination.currentPage} of {pagination.totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={currentPage >= pagination.totalPages}
            className="gap-1"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
