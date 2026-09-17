"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Calendar, MapPin, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { MOCK_EVENTS, EventItem } from "@/data/mock";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["All", "Summit", "Hackathon", "Pitching", "Workshop", "Speaker"];
  const priceFilters = ["All", "Free", "Paid"];

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || evt.category === selectedCategory;

      const matchesPrice =
        selectedPriceFilter === "All" ||
        (selectedPriceFilter === "Free" && evt.isFree) ||
        (selectedPriceFilter === "Paid" && !evt.isFree);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedPriceFilter]);

  const displayedEvents = filteredEvents.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3 text-center sm:text-left">
        <Badge variant="brand">Events Directory</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Explore Swayam Events & Hackathons
        </h1>
        <p className="text-base text-gray-300 max-w-2xl">
          Filter through flagship summits, national code sprints, pitching battles, and tech workshops.
        </p>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-white/10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5">
            <Input
              placeholder="Search by event title, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-gray-400" />}
            />
          </div>

          {/* Category Tabs */}
          <div className="md:col-span-7 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "dynamic-glow-button"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Sub-Filter: Price options */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-300">
            <Filter className="w-4 h-4 glow-text-accent" />
            <span className="font-semibold">Fee Filter:</span>
            {priceFilters.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriceFilter(p)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedPriceFilter === p
                    ? "bg-white/20 text-white font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="text-gray-400">
            Showing <span className="text-white font-bold">{displayedEvents.length}</span> of{" "}
            <span className="text-white font-bold">{filteredEvents.length}</span> events
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {displayedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedEvents.map((evt) => (
            <Card key={evt.id} interactive className="flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="relative h-48 w-full rounded-xl overflow-hidden">
                  <Image
                    src={evt.poster}
                    alt={evt.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="brand" size="sm">{evt.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant={evt.isFree ? "success" : "info"} size="sm">
                      {evt.price}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-white line-clamp-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {evt.tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="space-y-1.5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 glow-text-accent" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 glow-text-accent" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-gray-400">
                    {evt.slotsFilled} / {evt.slotsTotal} slots
                  </span>
                  <Link href={`/events/${evt.id}`}>
                    <Button variant="primary" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State Illustration */
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4 border border-white/10 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto glow-text-accent">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Events Found</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            No events match your current filter settings. Try clearing your search query or selecting "All" categories.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedPriceFilter("All");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredEvents.length && (
        <div className="text-center pt-6">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Load More Events
          </Button>
        </div>
      )}

    </div>
  );
}
