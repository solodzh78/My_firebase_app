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

    if (!token) return Promise.resolve('<p class="error">У вас нет токена</p>');
    const url = 'https://my-firebase-app-89155-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=';
    const response = await fetch(url.concat(token));
    const response1 = await response.json();

    if (response1 && response1.error) {
      return Promise.resolve(`<p class="error">${response1.error}</p>`);
    } else {
      return response1 ?
        Object.keys(response1).map(key => (
          {
            ...response1[key],
            id: key,
          }
        )) :
        [];
    }
  }

  static listToHTML(questions) {
    return questions.length
      ? `<ol>${questions.map((q) => `<li>${q.text}</li>`).join("")}</ol>`
      : "<p>Вопросов пока нет</p>";
  }
}
