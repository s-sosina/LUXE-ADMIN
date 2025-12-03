import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, XCircle, CheckCircle2 } from "lucide-react";

interface VerificationRequest {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  nin: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

interface VerificationRequestDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: VerificationRequest | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function VerificationRequestDetails({
  open,
  onOpenChange,
  request,
  onApprove,
  onReject,
}: VerificationRequestDetailsProps) {
  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Verification Request Details</DialogTitle>
          <DialogDescription>
            Review the identity verification request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Profile */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={request.user.avatar} />
              <AvatarFallback>
                {request.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{request.user.name}</h3>
              <p className="text-muted-foreground">{request.user.email}</p>
            </div>
          </div>

          {/* NIN Card */}
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-gray-900">
                National Identity Number (NIN)
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 tracking-wide">
              {request.nin}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Submitted At</p>
              <p className="font-medium">
                {new Date(request.submittedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge
                variant="secondary"
                className={
                  request.status === "approved"
                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                    : request.status === "rejected"
                    ? "bg-red-100 text-red-700 hover:bg-red-100"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                }
              >
                {request.status === "pending"
                  ? "Pending Review"
                  : request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onApprove(request.id)}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Approve Verification
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => onReject(request.id)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject Verification
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
