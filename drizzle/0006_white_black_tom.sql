DROP INDEX "row_fixture_idx";--> statement-breakpoint
ALTER TABLE "api_cache" ALTER COLUMN "last_fetched" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "football_scores" ALTER COLUMN "start_time" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "football_scores" ALTER COLUMN "last_updated" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "forecast_history" ALTER COLUMN "forecast" SET DATA TYPE varchar(3);--> statement-breakpoint
ALTER TABLE "forecast_history" ALTER COLUMN "is_correct" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "forecast_history" ALTER COLUMN "is_correct" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "forecast_history" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "forecast_history" ADD COLUMN "week_section_id" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "forecast_history" ADD COLUMN "actual_outcome" varchar(1);--> statement-breakpoint
CREATE UNIQUE INDEX "fixture_week_section_unq_idx" ON "forecast_history" USING btree ("fixture_id","week_section_id");