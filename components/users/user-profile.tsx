"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"


import { CheckCircle2, Calendar, Clock } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: "tour-guide" | "traveler";
  status: "active" | "inactive" | "suspended";
  isVerified: boolean;
  dateJoined: string;
  lastLogin: string;
  lastTourCreated: string | null;
  nin: string | null;
}
interface UserProfileCardProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileCardProps) {
  const queryClient = useQueryClient()


 const { data: user, isLoading: loading } = useQuery<UserProfile>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error("Failed to fetch user")
      return res.json()
    }
  })
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
        <p className="text-center text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
        <p className="text-center text-red-500">User not found</p>
      </div>
    );
  }
  return (
    <main className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
      {/* Profile header  */}
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage
            src={
              user.avatar ||
              "/placeholder.svg?height=96&width=96&query=user avatar"
            }
          />
          <AvatarFallback className="text-2xl">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <CheckCircle2 className="w-5 h-5 text-green-600 fill-green-100" />
        </div>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <p className="text-gray-500 text-sm">{user.phone}</p>

        {/* Badges  */}
        <div className="flex gap-2 m-4">
          <Badge className="border-orange-300 text-orange-800 bg-orange-50">
            {user.role === "tour-guide" ? "Tour Guide" : "Traveler"}
          </Badge>
          <Badge
            className={
              user.status === "active"
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : user.status === "suspended"
                ? "bg-red-100 text-red-700 hover:bg-red-100"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
            }
          >
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </Badge>
          {user.isVerified ? (
            <Badge
              variant="outline"
              className="border-green-300 text-green-600 bg-green-50"
            >
              Verified
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-900 hover:bg-gray-100 border-none shadow-none">
              Unverified
            </Badge>
          )}
        </div>

        {/* METADATA  */}
        <div className="grid grid-cols-4 gap-6 border-t pt-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">Date Joined</p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-gray-400" />
              {formatDate(user.dateJoined)}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Last Login</p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock className="w-4 h-4 text-gray-400" />
              {formatDate(user.lastLogin)}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Last Tour Created</p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock className="w-4 h-4 text-gray-400" />
              {formatDate(user.lastTourCreated)}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">NIN</p>
            <p className="text-sm text-gray-700">{user.nin || "-"}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
