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
  id UUID PRIMARY KEY,
  note_id UUID NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  text VARCHAR NOT NULL,
  sequence INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS texts (
  id UUID PRIMARY KEY,
  text VARCHAR
);

CREATE TABLE IF NOT EXISTS subnotes (
  word_id UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  text_id UUID NOT NULL REFERENCES texts(id) ON DELETE CASCADE,
  PRIMARY KEY(word_id, text_id)
);