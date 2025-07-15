
-- Users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  credits integer DEFAULT 10,
  created_at timestamp DEFAULT now()
);
-- Trends
CREATE TABLE trends (
  id serial PRIMARY KEY,
  title text,
  source text,
  category text,
  url text,
  created_at timestamp DEFAULT now()
);
-- Content
CREATE TABLE content (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  trend_id integer REFERENCES trends(id),
  summary text,
  created_at timestamp DEFAULT now()
);
-- Payments
CREATE TABLE payments (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  amount integer,
  stripe_id text,
  created_at timestamp DEFAULT now()
);
-- Procedure
CREATE OR REPLACE FUNCTION decrement_credits(uid uuid)
RETURNS void AS $$
BEGIN
  UPDATE users SET credits = credits - 1 WHERE id = uid AND credits > 0;
END;
$$ LANGUAGE plpgsql;
