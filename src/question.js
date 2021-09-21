export class Question {
    static async create(question) {
        const response = await fetch('https://my-firebase-app-89155-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'aplication/json'
            }
        });
        const response_1 = await response.json();
        return console.log(response_1);
    }
}