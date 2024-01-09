import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};
const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  };
};
const addTopic = async ({ request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const topicData = await getTopicData(request);
  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules
  );

  if (!passes) {
    topicData.validationErrors = errors;
    render("topics.eta", topicData);
  } else {
    await topicService.addTopic(user.id, params.get("name"));
    response.redirect("/topics");
  }
};

const listTopics = async ({ render, user }) => {
  render("topics.eta", {
    topics: await topicService.listTopics(),
  });
};

const listQuizTopics = async ({ render, user }) => {
  render("quiz.eta", {
    topics: await topicService.listTopics(),
  });
};

const deleteTopic = async ({ params, response, user }) => {
  if (user.admin) {
    await topicService.deleteTopic(params.id);
  }
  response.redirect("/topics");
};

const completeChore = async ({ params, response, user }) => {
  await choreService.completeChore(params.id, user.id);

  response.redirect("/chores");
};

export {
  addTopic,
  deleteTopic,
  completeChore,
  listTopics,
  listQuizTopics,
  topicValidationRules,
};
