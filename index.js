const app = document.getElementById("app");

// Usuários já cadastrados (exemplo)
const users = [
  { email: 'teste@test.com', phone: '999999999', ref: 100, refBy: null },
  { email: 'tust@tust.com', phone: '999999999', ref: 200, refBy: 100 },
  { email: 'tost@tost.com', phone: '999999999', ref: 300, refBy: 200 }
];

// Busca usuário existente por email
const getUser = (userData) => {
  return users.find(user => user.email === userData.email);
};

// Conta quantas inscrições foram feitas pelo usuário (refBy)
const getTotalSubscribers = (userData) => {
  return users.filter(user => user.refBy === userData.ref).length;
};

// Exibe a página de convite após inscrição
const showInvite = (userData) => {
  app.innerHTML = `
    <header>
      <img src="https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/logo.svg" alt="Logo">
      <h1>
        <div>CodeCraft</div>
        Summit 2025
      </h1>
    </header>

    <main>
      <h3>Inscrição confirmada!</h3>
      <p class="invite-message">
        Convide mais pessoas e concorra a prêmios! Compartilhe o link e acompanhe as inscrições:
      </p>

      <div class="input-copy-wrapper">
        <div class="input-group">
          <input type="text" id="link" value="devstage.com/codecraft-summit-2025/7289" readonly>
          <button id="btn-copy" class="btn-icon" title="Copiar link" aria-label="Copiar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#6F9DE2">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/>
            </svg>
          </button>
        </div>
        <small id="copy-status" class="hidden">Copiado!</small>
      </div>

      <section class="stats">
        <h4>${getTotalSubscribers(userData)}</h4>
        <p>Inscrições feitas</p>
      </section>

      <button id="btn-voltar" class="btn-back">Voltar para inscrição</button>
    </main>
  `;

  app.classList.add('page-invite');

  document.getElementById('btn-voltar').addEventListener('click', () => location.reload());

  document.getElementById('btn-copy').addEventListener('click', () => {
    const inputLink = document.getElementById('link');
    const copyStatus = document.getElementById('copy-status');

    navigator.clipboard.writeText(inputLink.value)
      .then(() => {
        copyStatus.classList.remove('hidden');
        setTimeout(() => copyStatus.classList.add('hidden'), 2000);
      })
      .catch(() => alert("Erro ao copiar o link."));
  });
};

// Salva novo usuário na lista (simulação)
const saveUser = (userData) => {
  const url = new URL(window.location.href);
  const refBy = Number(url.searchParams.get('ref')) || null;

  const newUser = {
    ...userData,
    ref: Math.floor(Math.random() * 4000) + 1,
    refBy
  };

  users.push(newUser);
  return newUser;
};

// Função para configurar ação do formulário
const formAction = () => {
  const form = document.getElementById('form');

  form.onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone')
    };

    const user = getUser(userData);
    if (user) {
      showInvite(user);
    } else {
      const newUser = saveUser(userData);
      showInvite(newUser);
    }
  };
};

formAction();

