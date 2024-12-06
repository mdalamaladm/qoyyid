DROP DATABASE qoyyid;

SELECT 'CREATE DATABASE qoyyid'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'qoyyid')\gexec

\c qoyyid;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR,
  username VARCHAR UNIQUE NOT NULL,
  password VARCHAR
);

CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR,
  content VARCHAR
);

CREATE TABLE IF NOT EXISTS words (
  note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  text VARCHAR NOT NULL,
  sequence INTEGER NOT NULL,
  PRIMARY KEY (note_id, sequence)
);

CREATE TABLE IF NOT EXISTS subnotes (
  id UUID PRIMARY KEY,
  note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  word_id VARCHAR UNIQUE NOT NULL,
  text VARCHAR
);