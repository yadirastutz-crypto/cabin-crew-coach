import { useState } from "react";
import { Link } from "wouter";
import { airportCodes } from "@/data/airportCodes";
import { ChevronLeft, Search } from "lucide-react";

export default function Airports() {
  const [search, setSearch] = useState("");

  const filteredCodes = airportCodes.filter(a =>
    a.code.toLowerCase().includes(search.toLowerCase()) ||
    a.city.toLowerCase().includes(search.toLowerCase()) ||
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const top25 = filteredCodes.filter(a => a.isTop25);
  const additional = filteredCodes.filter(a => !a.isTop25);

  return (
    <div className="min-h-[100dvh] pb-24 bg-background flex flex-col">
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground pt-12 pb-4 px-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link href="/academy">
              <button className="p-2 -ml-2">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </Link>
            <h1 className="ml-2 text-xl font-bold">Airport Codes</h1>
          </div>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/50" />
          <input
            type="text"
            placeholder="Search code, city, or airport..."
            className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:bg-white/20 transition-colors"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="px-5 py-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Top 25 Must-Know</h2>
          <div className="grid grid-cols-1 gap-3">
            {top25.map(apt => (
              <div key={apt.id} className="bg-card border border-card-border p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground">{apt.city}, {apt.country}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{apt.name}</p>
                </div>
                <div className="bg-accent/10 text-accent font-mono font-bold text-lg px-3 py-1.5 rounded-lg border border-accent/20">
                  {apt.code}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Additional 50</h2>
          <div className="grid grid-cols-1 gap-3">
            {additional.map(apt => (
              <div key={apt.id} className="bg-card border border-card-border p-4 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground">{apt.city}, {apt.country}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{apt.name}</p>
                </div>
                <div className="bg-primary/5 text-primary font-mono font-bold text-lg px-3 py-1.5 rounded-lg border border-primary/10">
                  {apt.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
