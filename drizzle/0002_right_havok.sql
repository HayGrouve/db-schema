CREATE TABLE "posts" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DROP INDEX "title_idx";--> statement-breakpoint
DROP INDEX "user_id_idx";--> statement-breakpoint
CREATE INDEX "posts_title_idx" ON "posts" USING btree ("title");--> statement-breakpoint
CREATE INDEX "posts_user_id_idx" ON "posts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "recipe_title_idx" ON "recipe" USING btree ("title");--> statement-breakpoint
CREATE INDEX "recipe_user_id_idx" ON "recipe" USING btree ("user_id");