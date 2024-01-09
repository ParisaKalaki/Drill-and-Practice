import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
  await sql`INSERT INTO topics
      (user_id, name)
        VALUES (${userId}, ${name})`;
};

const deleteTopic = async (tId) => {
  await sql`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${tId})`;
  await sql`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${tId})`;
  await sql`DELETE FROM questions WHERE topic_id = ${tId};`;
  await sql`DELETE FROM topics WHERE id = ${tId};`;
};

const listTopics = async () => {
  const rows = await sql`SELECT * FROM topics
    ORDER BY name ASC;`;

  return rows;
};
const listAvailableChores = async () => {
  const rows = await sql`SELECT * FROM chores
      WHERE (due_date IS NULL OR due_date > NOW())
      AND id NOT IN (SELECT chore_id FROM chore_assignments)`;

  return rows;
};

const listUserChores = async (userId) => {
  const rows = await sql`SELECT * FROM chores
      WHERE id IN (
        SELECT chore_id FROM chore_assignments
          WHERE user_id = ${userId} AND completed_at IS NULL
      )`;

  return rows;
};

const completeChore = async (choreId, userId) => {
  await sql`UPDATE chore_assignments SET completed_at = NOW()
          WHERE chore_id = ${choreId} AND user_id = ${userId}`;

  const coinsRes =
    await sql`SELECT chorecoins FROM chores WHERE id = ${choreId}`;

  const coins = coinsRes[0].chorecoins;
  if (coins === 0) {
    return;
  }

  await sql`UPDATE users SET
          chorecoins = chorecoins + ${coins}
          WHERE id = ${userId}`;

  await sql`UPDATE users SET
          chorecoins = chorecoins - ${coins}
          WHERE id IN (SELECT user_id FROM chores WHERE id = ${choreId})`;
};

//
export {
  addTopic,
  deleteTopic,
  completeChore,
  listAvailableChores,
  listUserChores,
  listTopics,
};
