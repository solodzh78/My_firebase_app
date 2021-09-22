import "./mui/mui.min.js";
import { isValid, createModal } from "./utils";
import { Question } from "./question";
import { authWithEmailAndPassword, getAuthForm } from "./auth";

import "./mui/mui.min.css";
import "./style.css";

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");
const modalBtn = document.getElementById("modal-btn");

const submitFormHandler = async e => {
  e.preventDefault();
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;

    await Question.create(question); //Async запрос

    console.log(question);
    input.value = "";
    input.className = "";
    submitBtn.disabled = false;
  }
};
const renderModalAfterAuth = content => {
  if (typeof(content) === 'string') {
    createModal("Ошибка", content);
  } else {
    createModal('Список вопросов', Question.listToHTML(content));
  }
};
const authFormHandler = async e => {
  e.preventDefault();

  const email = e.target.querySelector("#email").value;
  const password = e.target.querySelector("#password").value;
  const btn = e.target.querySelector("button");

  btn.disabled = true;
  const token = await authWithEmailAndPassword(email, password);
  const content = await Question.fetch(token);
  renderModalAfterAuth(content);
  btn.disabled = false;

};
const openModal = () => {
  createModal("Авторизация", getAuthForm());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
};

modalBtn.addEventListener("click", openModal);
window.addEventListener("load", Question.renderList);
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});
