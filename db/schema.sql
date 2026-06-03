CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO tickets (title, priority, status)
VALUES
  ('Rotate leaked CI token', 'high', 'open'),
  ('Fix Docker production image', 'medium', 'in_progress'),
  ('Document deployment runbook', 'low', 'open');
