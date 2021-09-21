export const getAuthForm = () => `
  <form class="mui-form" id="auth-form">
  <div class="mui-textfield mui-textfield--float-label">
    <input type="email" id="email" required autocomplete="username">
    <label for="email">Email</label>
  </div>
  <div class="mui-textfield mui-textfield--float-label">
    <input type="password" id="password" required autocomplete="current-password">
    <label for="password">Пароль</label>
  </div>

  <button 
    type="submit" 
    class="mui-btn mui-btn--raised mui-btn--primary"
  >
    Войти
  </button>
</form>`;

export const authWithEmailAndPassword = async (email, password) => {
  const apiKey = 'AIzaSyCYlowP0NApdkpdnuBmtpwwW17rXL-ry_U';
  const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  const response = await fetch(url.concat(apiKey), {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.idToken;
};
