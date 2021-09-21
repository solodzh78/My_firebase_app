import {isValid} from './utils';
import {Question} from './question';
import "./style.css";

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

const submitFormHandler = async e => {
    e.preventDefault();
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        };

        submitBtn.disabled = true;
        await Question.create(question)
        // .then(() => {
            console.log(question);
            input.value = '';
            input.className = ''; 
            submitBtn.disabled = false;
        // });

    };
};

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
});