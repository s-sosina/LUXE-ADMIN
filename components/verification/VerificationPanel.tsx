import { AlertCircle } from "lucide-react"
import { Alert,  AlertTitle } from "@/components/ui/alert"
import { VerificationTable } from "@/components/verification/VerificationTable"
import { MOCK_VERIFICATION_REQUESTS } from "@/lib/data/mock-user-verification" 

export function VerificationPanel() {
  const pendingCount = MOCK_VERIFICATION_REQUESTS.filter(
    (req) => req.status === "pending"
  ).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Identity Verifications</h1>
        <p className="text-muted-foreground mt-1">
          Review and approve tour guide verification requests
        </p>
      </div>

      {/* Alert */}
      <Alert className="bg-orange-50 border-orange-200 text-orange-800">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-800 font-medium">
          You have {pendingCount} pending verifications waiting for review
        </AlertTitle>
      </Alert>

      {/* Table */}
      <VerificationTable />
    </div>
  )
}
