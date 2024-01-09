import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";

const listRandomQuestion = async ({ response }) => {
  const topics = await topicService.listTopics();
  const randomTopicIndex = Math.floor(Math.random() * topics.length);

  const questions = await questionService.listQuestions(
    topics[randomTopicIndex].id
  );

  if (questions.length === 0) {
    response.body = {};
    return;
  }
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];

  const options = await questionService.listAnswerOption(randomQuestion.id);

  const data = {
    questionId: randomQuestion.id,
    questionText: randomQuestion.question_text,
    answerOptions: options.map((option) => ({
      optionId: option.id,
      optionText: option.option_text,
    })),
  };

  response.body = data;
};

const checkAnswer = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const params = await body.value;

  const questionId = params.questionId;
  const optionId = params.optionId;

  const result = await questionService.checkAnswer(questionId, optionId);

  response.body = { correct: result[0].is_correct };
};
export { listRandomQuestion, checkAnswer };
