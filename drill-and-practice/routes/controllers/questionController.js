import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};
const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const getData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text"),
    option_text: params.get("option_text"),
  };
};

const addQuestion = async ({ request, response, user, params, render }) => {
  const body = request.body({ type: "form" });
  const param = await body.value;
  const data = await getData(request);
  const [passes, errors] = await validasaur.validate(
    data,
    questionValidationRules
  );

  if (!passes) {
    data.validationErrors = errors;
    render("questions.eta", data);
  } else {
    await questionService.addQuestion(
      user.id,
      param.get("question_text"),
      params.id
    );
    response.redirect(`/topics/${params.id}`);
  }
};

const listQuestions = async ({ render, params }) => {
  render("questions.eta", {
    questions: await questionService.listQuestions(params.id),
    topicID: params.id,
  });
};

const showQuestion = async ({ params, render }) => {
  render("question.eta", {
    question: await questionService.showQuestion(params.qId),
    topicID: params.id,
    answers: await questionService.listAnswerOption(params.qId),
  });
};
const addAnswerOption = async ({ request, response, params, render }) => {
  const body = request.body({ type: "form" });
  const param = await body.value;
  const data = await getData(request);
  let checkbox = false;
  if (param.get("is_correct")) checkbox = true;

  const [passes, errors] = await validasaur.validate(
    data,
    optionValidationRules
  );

  if (!passes) {
    render("question.eta", {
      validationErrors: errors,
      option_text: data.get("option_text"),
    });
    return;
  }

  await questionService.addAnswerOption(
    params.qId,
    param.get("option_text"),
    checkbox
  );
  response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

const listAnswerOption = async ({ render, user, params }) => {
  render("question.eta", {
    answers: await questionService.listAnswerOption(params.qId),
    topicID: params.id,
  });
};

const deleteOption = async ({ params, response }) => {
  await questionService.deleteOption(params.oId);

  response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};
const deleteQuestion = async ({ params, response }) => {
  await questionService.deleteQuestion(params.qId);

  response.redirect(`/topics/${params.id}`);
};

const selectRandomlyQuestion = async ({ params, response }) => {
  const topicId = params.id;
  const questions = await questionService.listQuestions(topicId);

  if (questions.length === 0) {
    response.body = "No questions available for this topic.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomIndex];

  response.redirect(`/quiz/${topicId}/questions/${randomQuestion.id}`);
};

const showAnswerQuestion = async ({ render, params }) => {
  render("questionAnswer.eta", {
    question: await questionService.showQuestion(params.qId),
    answers: await questionService.findAnswerOptionById(params.qId),
  });
};

const saveAnswer = async ({ user, params, response }) => {
  const topicId = params.id;
  const { qId, oId } = params;
  await questionService.storeUserAnswer(user.id, qId, oId);

  const result = await questionService.isAnswerCorrect(oId);

  if (result.is_correct) {
    response.redirect(`/quiz/${topicId}/questions/${qId}/correct`);
  } else {
    response.redirect(`/quiz/${topicId}/questions/${qId}/incorrect`);
  }
};

const showCorrect = async ({ render, params }) => {
  const data = {
    topicId: params.id,
  };
  render("correct.eta", data);
};

const showIncorrect = async ({ render, params }) => {
  const result = await questionService.listAnswerOption(params.qId);
  const filteredresult = result.filter((item) => item.is_correct === true);
  const data = {
    ...filteredresult[0],
    topicId: params.id,
  };
  render("incorrect.eta", data);
};

export {
  addQuestion,
  showQuestion,
  listQuestions,
  addAnswerOption,
  listAnswerOption,
  deleteOption,
  deleteQuestion,
  selectRandomlyQuestion,
  showAnswerQuestion,
  saveAnswer,
  showCorrect,
  showIncorrect,
  questionValidationRules,
};
