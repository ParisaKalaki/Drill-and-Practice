import * as statisticsService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
  const totalNumberOfTopics = await statisticsService.totalTopics();
  const totalNumberOfQuestions = await statisticsService.totalQuestions();
  const totalNumberOfAnswers = await statisticsService.totalAnswers();

  render("main.eta", {
    totalNumberOfTopics: totalNumberOfTopics,
    totalNumberOfQuestions: totalNumberOfQuestions,
    totalNumberOfAnswers: totalNumberOfAnswers,
  });
};

export { showMain };
