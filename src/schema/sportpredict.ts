import {
  integer,
  text,
  timestamp,
  pgTable,
  serial,
  json,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const footballScores = pgTable("football_scores", {
  id: serial("id").primaryKey(),
  fixtureId: integer("fixture_id").notNull().unique(),
  rowNumber: integer("row_number").notNull(),
  day: text("day").notNull(),
  startTime: timestamp("start_time").notNull(),
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
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Table to track when we last fetched from the API
export const apiCache = pgTable("api_cache", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  lastFetched: timestamp("last_fetched").defaultNow().notNull(),
});

// Table for forecast history
export const forecastHistory = pgTable(
  "forecast_history",
  {
    id: serial("id").primaryKey(),
    rowNumber: integer("row_number").notNull(),
    fixtureId: integer("fixture_id").notNull(),
    forecast: text("forecast").notNull(),
    isCorrect: integer("is_correct").notNull(), // 1 for correct, 0 for incorrect
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      rowFixtureIdx: uniqueIndex("row_fixture_idx").on(
        table.rowNumber,
        table.fixtureId
      ),
    };
  }
);

export type FootballScore = typeof footballScores.$inferSelect;
export type ApiCache = typeof apiCache.$inferSelect;
export type ForecastHistory = typeof forecastHistory.$inferSelect;
