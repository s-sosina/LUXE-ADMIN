import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User, Calendar, Eye } from "lucide-react";
import { Tour } from "@/lib/data/mock-tours-data";
import { cn } from "@/lib/utils";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 hover:bg-green-100/80";
      case "Pending Review":
        return "bg-amber-100 text-amber-700 hover:bg-amber-100/80";
      case "Completed":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100/80";
      case "Paused":
        return "bg-gray-100 text-gray-700 hover:bg-gray-100/80";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2">
              {tour.title}
            </h3>
            <span className="font-bold text-orange-500 whitespace-nowrap">
              {formatCurrency(tour.price)}
            </span>
          </div>

          <Badge
            className={cn(
              "mb-3 border-0 rounded-md font-medium px-2.5 py-0.5",
              getStatusColor(tour.status)
            )}
          >
            {tour.status}
          </Badge>

          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="truncate">{tour.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 shrink-0" />
              <span className="truncate">Guide: {tour.guide}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">{tour.dates}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-600">
            Bookings: {tour.bookings}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2 rounded-lg text-gray-700"
          >
            <Eye className="w-3.5 h-3.5" />
            Review
          </Button>
        </div>
      </div>
    </div>
  );
}
