import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);

router.post(
  "/topics/:id/questions/:qId/options/:oId/delete",
  questionController.deleteOption
);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);

router.get("/topics/:id/questions/:qId", questionController.showQuestion);
router.post(
  "/topics/:id/questions/:qId/delete",
  questionController.deleteQuestion
);
router.post(
  "/topics/:id/questions/:qId/options",
  questionController.addAnswerOption
);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", topicController.listQuizTopics);

router.get("/quiz/:id", questionController.selectRandomlyQuestion);
router.get("/quiz/:id/questions/:qId", questionController.showAnswerQuestion);

router.post(
  "/quiz/:id/questions/:qId/options/:oId",
  questionController.saveAnswer
);
router.get("/quiz/:id/questions/:qId/correct", questionController.showCorrect);

// Example route for the "Incorrect" page
router.get(
  "/quiz/:id/questions/:qId/incorrect",
  questionController.showIncorrect
);

router.get("/api/questions/random", questionApi.listRandomQuestion);
router.post("/api/questions/answer", questionApi.checkAnswer);

export { router };
