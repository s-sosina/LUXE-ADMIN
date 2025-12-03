"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface SuspendUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  isSuspending?: boolean;
}

export default function SuspendUserModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
  isSuspending = false,
}: SuspendUserModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <div className="p-8 flex flex-col items-center gap-5">
          {/* Icon */}
          <div className="rounded-full bg-red-50 p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <DialogHeader className="text-center w-full space-y-2">
            <DialogTitle className="text-xl font-semibold text-center text-gray-900">
              Suspend User Account
            </DialogTitle>
          </DialogHeader>

          <div className="text-center text-gray-500 text-sm leading-relaxed">
            Are you sure you want to suspend{" "}
            <span className="font-semibold text-gray-900">{userName}</span>s
            account? This action will prevent the user from accessing the
            platform and performing any activities.
          </div>

          <div className="w-full rounded-lg border border-orange-100 bg-[#FFFDF5] p-4 text-xs text-orange-800 leading-relaxed">
            <span className="font-bold text-orange-900">Note:</span> The user
            will be notified via email about the suspension. All active tours
            will be paused and removed from the platform. Existing bookings will
            be cancelled and refunded.
          </div>
        </div>

        <DialogFooter className="p-8 pt-0 gap-3 sm:justify-center w-full sm:space-x-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-[140px] border-gray-200 text-gray-700 h-10 font-medium"
            disabled={isSuspending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="w-full sm:w-[140px] bg-red-600 hover:bg-red-700 h-10 font-medium"
            disabled={isSuspending}
          >
            {isSuspending ? "Suspending..." : "Suspend User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
