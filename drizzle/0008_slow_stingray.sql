-- Drop existing table and sequence if they exist
DROP TABLE IF EXISTS recipe;
DROP SEQUENCE IF EXISTS recipe_id_seq;

-- Create sequence for recipe id
CREATE SEQUENCE recipe_id_seq;

-- Create recipe table
CREATE TABLE recipe (
    id INTEGER PRIMARY KEY DEFAULT nextval('recipe_id_seq'),
    title VARCHAR(256) NOT NULL,
    description TEXT,
    ingredients JSONB NOT NULL,
    instructions TEXT NOT NULL,
    categories JSONB NOT NULL,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    image_url VARCHAR(256),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,
    user_id VARCHAR(256) NOT NULL
);

-- Create index on user_id
CREATE INDEX recipe_user_id_idx ON recipe(user_id); 