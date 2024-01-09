CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  admin BOOLEAN DEFAULT FALSE,
  password VARCHAR(255)
);

CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) UNIQUE
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  topic_id INTEGER REFERENCES topics(id),
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id)
);

CREATE UNIQUE INDEX ON users((lower(email)));

INSERT INTO users (email, password, admin)
  VALUES ('admin@admin.com','$2a$10$IML8QCf6xA.alRbW.CG5PuvYc3Qs94vJvoTwbsSehs8s515cUMuZa', true);

INSERT INTO topics (user_id, name)
  VALUES ((SELECT id FROM users WHERE email = 'admin@admin.com'), 'Finnish language');


-- INSERT INTO topics
--       (user_id, name)
--         VALUES ('1', 'History');
-- INSERT INTO questions
--       (user_id, question_text, topic_id)
--         VALUES ('1', 'Who was the first president of United State', '1');

-- INSERT INTO question_answer_options
--         (question_id, option_text, is_correct)
--           VALUES ('1', 'Thomas Jefferson', FALSE);
-- INSERT INTO question_answer_options
--         (question_id, option_text, is_correct)
--           VALUES ('1', 'George Washington', TRUE);
-- INSERT INTO question_answer_options
--         (question_id, option_text, is_correct)
--           VALUES ('1', 'Abraham Lincoln', FALSE);