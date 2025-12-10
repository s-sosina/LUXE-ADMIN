import { BookingsTable } from "@/components/bookings/bookings-table";

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
      <div className="flex items-start justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Bookings Management
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage all tour bookings
          </p>
        </div>
      </div>
      <BookingsTable />
    </div>
  );
}
