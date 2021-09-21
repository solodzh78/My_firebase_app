const getQuestionsFromLocalStorage = () => JSON.parse(localStorage.getItem('questions') || '[]');
const addToLocalStorage = question => {
  const all = getQuestionsFromLocalStorage();
  console.log('all: ', all);

  all.push(question);
  localStorage.setItem('questions', JSON.stringify(all));
};
const toCard = question => `
  <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div>${question.text}</div>
  <br>
`;

export class Question {
  static async create(question) {
    const url = 'https://my-firebase-app-89155-default-rtdb.europe-west1.firebasedatabase.app/questions.json';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'aplication/json'
      }
    });
    const response1 = await response.json();
    question.id = response1.name;
    addToLocalStorage(question);
    Question.renderList();
    return question;
  }
  static renderList() {
    const question = getQuestionsFromLocalStorage();

    const html = question.length ?
      question.map(toCard).join(' ') :
      '<div class="mui--text-headline">Вы пока ничего не спрашивали</div>';

    const list = document.getElementById('list');
    list.innerHTML = html;
  }
  static async fetch(token) {
    const url = 'https://my-firebase-app-89155-default-rtdb.europe-west1.firebasedatabase.app/questions.json';
    const response = await fetch(url.concat(token));
    const data = await response.json();
    console.log(data);
  }
}
