CREATE TABLE IF NOT EXISTS smm_feedback (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  type text NOT NULL CHECK (type IN ('useful', 'inaccuracy', 'issue')),
  question text,
  rewrite text,
  gap text,
  comment text,
  model text,
  prompt_version text,
  page text,
  user_agent text,
  source text,
  status text NOT NULL DEFAULT 'new',
  reviewed_at timestamptz,
  reviewer_note text
);

CREATE INDEX IF NOT EXISTS smm_feedback_created_at_idx ON smm_feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS smm_feedback_status_idx ON smm_feedback (status);
