// Config
const API = 'http://127.0.0.1:8000';

// Helpers
const $ = s => document.querySelector(s);
const listEl = $('#list');
const totalInfo = $('#totalInfo');
const searchResult = $('#searchResult');

// Render lista
function renderList(livres) {
  listEl.innerHTML = '';
  if (!livres || !livres.length) {
    listEl.innerHTML = '<p class="muted">Aucun livre trouvé.</p>';
    return;
  }
  for (const l of livres) {
    const card = document.createElement('div');
    card.className = 'card-livre';
    card.innerHTML = `
      <img src="${l.picture}" alt="${l.nameLivre}" onerror="this.src='https://via.placeholder.com/600x400?text=Livre';" />
      <div class="info">
        <h3>${l.nameLivre}</h3>
        <p><strong>Auteur:</strong> ${l.auteur}</p>
        <p class="muted">${l.bio}</p>
      </div>`;
    listEl.appendChild(card);
  }
}

// Cargar todos
async function getLivres() {
  try {
    const { data } = await axios.get(`${API}/livres`);
    renderList(data);
  } catch (err) {
    console.error('Erreur GET /livres:', err);
    alert('Erreur en obtenant la liste.');
  }
}

// Total
async function getTotal() {
  try {
    const { data } = await axios.get(`${API}/total_livres`);
    totalInfo.textContent = `📚 Total : ${data.total}`;
  } catch (err) {
    console.error('Erreur GET /total_livres:', err);
    alert('Erreur en obtenant le total.');
  }
}

// Crear
$('#formCreate').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const livre = Object.fromEntries(fd.entries());
  livre.id = Number(livre.id);
  try {
    await axios.post(`${API}/livre`, livre);
    alert('Livre créé ✅');
    e.target.reset();
    await getLivres();
    await getTotal();
  } catch (err) {
    console.error('Erreur POST /livre:', err);
    alert('Erreur en créant le livre.');
  }
});

// Update (PUT)
$('#formUpdate').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const id = Number(fd.get('id'));
  const payload = {
    nameLivre: fd.get('nameLivre'),
    bio: fd.get('bio'),
    auteur: fd.get('auteur'),
    picture: fd.get('picture')
  };
  try {
    await axios.put(`${API}/livre/${id}`, payload);
    alert('Livre modifié ✏️');
    e.target.reset();
    await getLivres();
  } catch (err) {
    console.error('Erreur PUT /livre/{id}:', err);
    alert('Erreur en modifiant le livre.');
  }
});

// Delete
$('#formDelete').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = Number(new FormData(e.target).get('id'));
  if (!confirm(`Supprimer le livre ${id} ?`)) return;
  try {
    await axios.delete(`${API}/livre/${id}`);
    alert('Livre supprimé 🗑️');
    e.target.reset();
    await getLivres();
    await getTotal();
  } catch (err) {
    console.error('Erreur DELETE /livre/{id}:', err);
    alert('Erreur en supprimant le livre.');
  }
});

// Search by ID
$('#formSearch').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = Number(new FormData(e.target).get('id'));
  try {
    const { data } = await axios.get(`${API}/livre/${id}`);
    searchResult.innerHTML = `
      <div class="card-livre">
        <img src="${data.picture}" alt="${data.nameLivre}" onerror="this.src='https://via.placeholder.com/600x400?text=Livre';" />
        <div class="info">
          <h3>${data.nameLivre}</h3>
          <p><strong>Auteur:</strong> ${data.auteur}</p>
          <p class="muted">${data.bio}</p>
        </div>
      </div>`;
  } catch (err) {
    console.error('Erreur GET /livre/{id}:', err);
    searchResult.innerHTML = `<p class="muted">Livre non trouvé.</p>`;
  }
});

// Botones superiores
$('#btnLoad').addEventListener('click', getLivres);
$('#btnTotal').addEventListener('click', getTotal);

// Carga inicial opcional
// getLivres(); getTotal();
