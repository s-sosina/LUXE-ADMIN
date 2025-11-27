import Link from "next/link";
import { ArrowLeft, Edit, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/users/user-profile";
import { UserStats } from "@/components/users/user-stats";
import { notFound } from "next/navigation";
import { MOCK_USERS } from "@/lib/data/mock-user-details";
import { UserDetailsTab } from "@/components/users/user-details-tabs";

interface UserDetailsPageProps {
  params: Promise<{ id: string }>;
}
async function getUserData(userId: string) {
  /**
   * BACKEND: Replace with actual API call
   * const res = await fetch(`${process.env.API_URL}/users/${userId}`)
   * return res.json()
   */

  // Use shared mock data for consistency
  const user = MOCK_USERS[userId];

  if (!user) {
    // This will trigger Next.js 404 page
    notFound();
  }

  return user;
}
export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const { id } = await params;
  const userData = await getUserData(id);


  return (
    <main>
      {/* Back Navigation */}
      <Link
        href="/users"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Users</span>
      </Link>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-500 mt-1">View and manage user information</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Edit className="w-4 h-4" />
            Edit Details
          </Button>
          <Button
            variant="outline"
            className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-transparent"
          >
            <Ban className="w-4 h-4" />
            Suspend User
          </Button>
        </div>
      </div>
      {/* User Profile Card  */}
      <UserProfile userId={id} />
      {/* User Stats Grid */}
      <UserStats userId={id} userRole={userData.role} isVerified={userData.isVerified} />

      {/* Tours, Transactions, Reviews Tabs - with role-based conditional rendering */}
      <UserDetailsTab
        userId={id}
        userRole={userData.role}
        userStatus={userData.status}
        isVerified={userData.isVerified}
      />
    </main>
  );
}
