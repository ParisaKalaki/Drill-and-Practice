import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registerValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};
const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    email: params.get("email"),
    password: params.get("password"),
  };
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = await getTopicData(request);
  const [passes, errors] = await validasaur.validate(
    data,
    registerValidationRules
  );
  if (!passes) {
    data.validationErrors = errors;
    render("register.eta", data);
  } else {
    await userService.addUser(
      params.get("email"),
      await bcrypt.hash(params.get("password"))
    );
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

export { registerUser, showRegistrationForm, registerValidationRules };
