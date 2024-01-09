import { sql } from "../database/database.js";

const addQuestion = async (userId, question_text, topic_id) => {
  await sql`INSERT INTO questions
      (user_id, question_text, topic_id)
        VALUES (${userId}, ${question_text}, ${topic_id})`;
};

const listQuestions = async (id) => {
  const rows = await sql`SELECT * FROM questions WHERE topic_id=${id}`;
  return rows;
};

const showQuestion = async (qId) => {
  const row = await sql`SELECT * FROM questions WHERE id = ${qId}`;

  return row[0];
};
const addAnswerOption = async (question_id, option_text, is_correct) => {
  await sql`INSERT INTO question_answer_options
        (question_id, option_text, is_correct)
          VALUES (${question_id}, ${option_text}, ${is_correct})`;
};

const listAnswerOption = async (qId) => {
  const rows =
    await sql`SELECT * FROM question_answer_options WHERE question_id=${qId} `;
  return rows;
};
const findAnswerOptionById = async (id) => {
  const rows =
    await sql`SELECT * FROM question_answer_options WHERE question_id=${id}`;
  return rows;
};

const deleteQuestion = async (qId) => {
  await sql`DELETE FROM question_answers WHERE question_id= ${qId};`;
  await sql`DELETE FROM question_answer_options WHERE question_id = ${qId};`;
  await sql`DELETE FROM questions WHERE id = ${qId};`;
};

const deleteOption = async (oId) => {
  await sql`DELETE FROM question_answer_options WHERE id = ${oId};`;
  await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${oId};`;
};

const storeUserAnswer = async (uId, qId, oId) => {
  await sql`INSERT INTO question_answers
      (user_id, question_id, question_answer_option_id)
        VALUES (${uId}, ${qId}, ${oId})`;
};

const isAnswerCorrect = async (oId) => {
  const result =
    await sql`SELECT * FROM question_answer_options WHERE id=${oId} `;
  return result[0];
};

const checkAnswer = async (qId, oId) => {
  const result =
    await sql`SELECT * FROM question_answer_options WHERE question_id=${qId} AND id=${oId} `;
  console.log(result);
  return result;
};

export {
  addQuestion,
  showQuestion,
  listAnswerOption,
  addAnswerOption,
  listQuestions,
  deleteOption,
  findAnswerOptionById,
  storeUserAnswer,
  isAnswerCorrect,
  checkAnswer,
  deleteQuestion,
};
