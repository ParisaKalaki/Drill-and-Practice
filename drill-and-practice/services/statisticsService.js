import { sql } from "../database/database.js";

const totalTopics = async () => {
  const numberofTopics = await sql`SELECT COUNT(*) FROM topics`;

  return numberofTopics[0] ? numberofTopics[0].count : 0;
};

const totalQuestions = async () => {
  const numberofQuestions = await sql`SELECT COUNT(*) FROM questions`;

  return numberofQuestions[0] ? numberofQuestions[0].count : 0;
};
const totalAnswers = async () => {
  const numberofAnswers = await sql`SELECT COUNT(*) FROM question_answers`;

  return numberofAnswers[0] ? numberofAnswers[0].count : 0;
};

export { totalTopics, totalQuestions, totalAnswers };
