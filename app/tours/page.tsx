"use client";

import { useState, useMemo } from "react";
import { TourStats } from "@/components/tours/tours-stats";
import { TourFilters } from "@/components/tours/tours-filters";
import { TourCard } from "@/components/tours/tours-card";
import { Pagination } from "@/components/pagination-component";
import { TOURS_DATA } from "@/lib/data/mock-tours-data";

const ITEMS_PER_PAGE = 6;

export default function ToursPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      // Search Filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        tour.title.toLowerCase().includes(searchLower) ||
        tour.location.toLowerCase().includes(searchLower) ||
        tour.guide.toLowerCase().includes(searchLower);

      // Status Filter
      const matchesStatus =
        statusFilter === "All Status" || tour.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Reset to page 1 when filters change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalItems = filteredTours.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedTours = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredTours.slice(startIndex, endIndex);
  }, [filteredTours, currentPage]);

  return (
    <main className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tours Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and manage all tours on the platform
        </p>
      </div>

      {/* Stats */}
      <TourStats />

      {/* Filters and List in a container */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-6">
        <TourFilters
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          statusFilter={statusFilter}
          setStatusFilter={handleStatusChange}
        />

        {/* List */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {paginatedTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
          {filteredTours.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No tours found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            itemLabel="tours"
            onPageChange={setCurrentPage}
            className="-mx-6 -mb-6 rounded-b-xl"
          />
        )}
      </div>
    </main>
  );
}
