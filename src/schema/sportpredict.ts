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
  boolean,
  varchar,
} from "drizzle-orm/pg-core";

// --- footballScores Table  ---
export const footballScores = pgTable("football_scores", {
  id: serial("id").primaryKey(),
  fixtureId: integer("fixture_id").notNull().unique(),
  rowNumber: integer("row_number").notNull(),
  day: text("day").notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
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
  odds: json("odds").$type<{
    home: string | null;
    draw: string | null;
    away: string | null;
  }>(),
  lastUpdated: timestamp("last_updated", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// --- apiCache Table (No changes needed) ---
export const apiCache = pgTable("api_cache", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  lastFetched: timestamp("last_fetched", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// --- forecastHistory Table ---
export const forecastHistory = pgTable(
  "forecast_history",
  {
    id: serial("id").primaryKey(),
    weekSectionId: varchar("week_section_id", { length: 50 }).notNull(),
    rowNumber: integer("row_number").notNull(),
    fixtureId: integer("fixture_id").notNull(),
    forecast: varchar("forecast", { length: 3 }).notNull(),
    isCorrect: boolean("is_correct"),
    actualOutcome: varchar("actual_outcome", { length: 1 }), // '1', 'X', '2', or null
    createdAt: timestamp("created_at", { withTimezone: true })
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

// --- Types ---
export type FootballScoreDb = typeof footballScores.$inferSelect;
export type ApiCache = typeof apiCache.$inferSelect;
export type ForecastHistory = typeof forecastHistory.$inferSelect;

export type FootballScore = Omit<FootballScoreDb, "odds"> & {
  odds: {
    home: string;
    draw: string;
    away: string;
  };
};
