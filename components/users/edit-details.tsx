"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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

interface EditDetailsProps {
  user: UserProfile;
  onCancel: () => void;
  onSuccess: (updatedUser: UserProfile) => void;
}

export default function EditDetails({ user, onCancel, onSuccess }: EditDetailsProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const { mutate: saveUser, isPending: isSaving } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      return res.json();
    },
    onSuccess: (updatedUser) => {
      onSuccess(updatedUser);
      router.refresh();
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const handleSave = () => {
    saveUser();
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <Avatar className="w-24 h-24 mb-6">
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

      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2"> 
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-50/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-gray-50/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="bg-gray-50/50"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
