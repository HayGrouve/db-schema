CREATE TABLE "recipe" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"ingredients" jsonb NOT NULL,
	"instructions" text NOT NULL,
	"categories" jsonb NOT NULL,
	"prep_time" integer,
	"cook_time" integer,
	"servings" integer,
	"image_url" varchar(256),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"last_fetched" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "api_cache_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "football_scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"fixture_id" integer NOT NULL,
	"row_number" integer NOT NULL,
	"day" text NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"status" json NOT NULL,
	"home" json NOT NULL,
	"away" json NOT NULL,
	"score" json NOT NULL,
	"league" json NOT NULL,
	"odds" json,
	"last_updated" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "football_scores_fixture_id_unique" UNIQUE("fixture_id")
);
--> statement-breakpoint
CREATE TABLE "forecast_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"week_section_id" varchar(50) NOT NULL,
	"row_number" integer NOT NULL,
	"fixture_id" integer NOT NULL,
	"forecast" varchar(3) NOT NULL,
	"is_correct" boolean,
	"actual_outcome" varchar(1),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "recipe_user_id_idx" ON "recipe" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "fixture_week_section_unq_idx" ON "forecast_history" USING btree ("fixture_id","week_section_id");