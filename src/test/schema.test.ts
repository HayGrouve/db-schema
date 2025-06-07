import { db } from "../db";
import { footballScores, apiCache, forecastHistory } from "../schema";

describe("Schema Tests", () => {
  it("should have valid table definitions", () => {
    expect(footballScores).toBeDefined();
    expect(apiCache).toBeDefined();
    expect(forecastHistory).toBeDefined();
  });

  it("should have required columns in football scores table", () => {
    expect(footballScores.id).toBeDefined();
    expect(footballScores.fixtureId).toBeDefined();
    expect(footballScores.startTime).toBeDefined();
    expect(footballScores.status).toBeDefined();
    expect(footballScores.home).toBeDefined();
    expect(footballScores.away).toBeDefined();
    expect(footballScores.score).toBeDefined();
    expect(footballScores.league).toBeDefined();
  });
});
