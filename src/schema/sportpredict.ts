// src/server/db/schema.ts
import {
  integer,
  text,
  timestamp,
  pgTable,
  serial,
  json,
  primaryKey,
  uniqueIndex,
  boolean, // Using boolean for isCorrect
  varchar, // For weekSectionId and actualOutcome
} from "drizzle-orm/pg-core";

// --- footballScores Table (No changes needed here) ---
export const footballScores = pgTable("football_scores", {
  id: serial("id").primaryKey(),
  fixtureId: integer("fixture_id").notNull().unique(),
  rowNumber: integer("row_number").notNull(),
  day: text("day").notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(), // Added withTimezone
  status: json("status").notNull().$type<{
    long: string;
    short: string;
    elapsed: number | null;
  }>(),
  home: json("home").notNull().$type<{
    id: number;
    name: string;
    logo: string;
    winner: boolean | null;
  }>(),
  away: json("away").notNull().$type<{
    id: number;
    name: string;
    logo: string;
    winner: boolean | null;
  }>(),
  score: json("score").notNull().$type<{
    home: number | null;
    away: number | null;
  }>(),
  league: json("league").notNull().$type<{
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  }>(),
  odds: json("odds").notNull().$type<{
    home: string | null;
    draw: string | null;
    away: string | null;
  }>(),
  lastUpdated: timestamp("last_updated", { withTimezone: true }) // Added withTimezone
    .defaultNow()
    .notNull(),
});

// --- apiCache Table (No changes needed here) ---
export const apiCache = pgTable("api_cache", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  lastFetched: timestamp("last_fetched", { withTimezone: true }) // Added withTimezone
    .defaultNow()
    .notNull(),
});

// --- forecastHistory Table (UPDATED) ---
export const forecastHistory = pgTable(
  "forecast_history",
  {
    id: serial("id").primaryKey(),
    // Identifier for the week section (e.g., "2025-W15-SatMon")
    weekSectionId: varchar("week_section_id", { length: 50 }).notNull(),
    rowNumber: integer("row_number").notNull(), // Row number within that section
    fixtureId: integer("fixture_id").notNull(),
    forecast: varchar("forecast", { length: 3 }).notNull(), // "1/X", "X/2", "1/2"
    isCorrect: boolean("is_correct"), // Null until checked, then true/false
    actualOutcome: varchar("actual_outcome", { length: 1 }), // '1', 'X', '2', or null
    createdAt: timestamp("created_at", { withTimezone: true }) // Added withTimezone
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      fixtureWeekSectionUnqIdx: uniqueIndex("fixture_week_section_unq_idx").on(
        table.fixtureId,
        table.weekSectionId
      ),
    };
  }
);

// --- Optional: weekSections Table (Recommended for tracking) ---
// You can add this if you want to explicitly track processed sections
// export const weekSections = pgTable("week_sections", {
//   id: varchar("id", { length: 50 }).primaryKey(), // e.g., "2025-W15-SatMon"
//   startDate: timestamp("start_date", { withTimezone: true }).notNull(),
//   endDate: timestamp("end_date", { withTimezone: true }).notNull(),
//   predictionsProcessedAt: timestamp("predictions_processed_at", { withTimezone: true }),
// });

// --- Types ---
export type FootballScore = typeof footballScores.$inferSelect;
export type ApiCache = typeof apiCache.$inferSelect;
export type ForecastHistory = typeof forecastHistory.$inferSelect;
// export type WeekSection = typeof weekSections.$inferSelect; // Uncomment if using weekSections table
