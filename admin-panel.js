// ==================== CONFIG ====================
const ADMIN_PASSWORD = 'vincente2026'; // Cambiar después en producción
let currentSection = 'proyectos';
let currentEditId = null;

// ==================== LOGIN ====================
function handleLogin(event) {
  event.preventDefault();
  const password = document.getElementById('password').value;

  if (password === ADMIN_PASSWORD) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    sessionStorage.setItem('adminLoggedIn', 'true');
    loadAllData();
    renderAllLists();
  } else {
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = '❌ Contraseña incorrecta';
    errorEl.classList.add('show');
    document.getElementById('password').value = '';
    setTimeout(() => errorEl.classList.remove('show'), 3000);
  }
}

function handleLogout() {
  sessionStorage.removeItem('adminLoggedIn');
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('dashboard').classList.remove('active');
  document.getElementById('password').value = '';
}

// Verificar si ya está logueado
window.addEventListener('load', () => {
  if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    loadAllData();
    renderAllLists();
  }
});

// ==================== DATA MANAGEMENT ====================
let allData = {
  proyectos: [],
  trayectoria: [],
  habilidades: [],
  certificados: []
};

function loadAllData() {
  allData.proyectos = JSON.parse(localStorage.getItem('portafolio_projects')) || [];
  allData.trayectoria = JSON.parse(localStorage.getItem('portafolio_experiences')) || [];
  allData.habilidades = JSON.parse(localStorage.getItem('portafolio_skills')) || [];
  allData.certificados = JSON.parse(localStorage.getItem('portafolio_certificates')) || [];
}

function renderAllLists() {
  renderProjects();
  renderExperiences();
  renderSkills();
  renderCertificates();
}

// ==================== PROYECTOS ====================
function renderProjects() {
  const projects = allData.proyectos;
  const container = document.getElementById('proyectos-list');

  // Stats
  document.getElementById('proj-total').textContent = projects.length;
  document.getElementById('proj-apps').textContent = projects.filter(p => p.type === 'App').length;
  document.getElementById('proj-finished').textContent = projects.filter(p => p.status === 'Terminado').length;

  // Items
  if (projects.length === 0) {
    container.innerHTML = '<div class="empty-state">No hay proyectos aún 📭</div>';
    return;
  }

  container.innerHTML = projects.map(project => `
    <div class="table-row">
      <div class="item-name">${project.title}</div>
      <div class="item-detail">${project.company}</div>
      <div><span class="badge badge-primary">${project.type}</span></div>
      <div><span class="badge ${project.status === 'Terminado' ? 'badge-success' : 'badge-warning'}">${project.status}</span></div>
      <div class="row-actions">
        <button class="btn-sm btn-edit" onclick="openModal('proyectos', '${project.id}')">✏️</button>
        <button class="btn-sm btn-delete" onclick="deleteItem('proyectos', '${project.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

// ==================== TRAYECTORIA ====================
function renderExperiences() {
  const experiences = allData.trayectoria;
  const container = document.getElementById('trayectoria-list');

  // Stats
  document.getElementById('exp-total').textContent = experiences.length;
  document.getElementById('exp-current').textContent = experiences.filter(e => !e.endDate).length;

  // Items
  if (experiences.length === 0) {
    container.innerHTML = '<div class="empty-state">No hay experiencias aún 📭</div>';
    return;
  }

  container.innerHTML = experiences.map(exp => `
    <div class="table-row">
      <div class="item-name">${exp.title}</div>
      <div class="item-detail">${exp.company}</div>
      <div class="item-detail">${exp.startDate}</div>
      <div class="item-detail">${exp.endDate || 'Actual'}</div>
      <div class="row-actions">
        <button class="btn-sm btn-edit" onclick="openModal('trayectoria', '${exp.id}')">✏️</button>
        <button class="btn-sm btn-delete" onclick="deleteItem('trayectoria', '${exp.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

// ==================== HABILIDADES ====================
function renderSkills() {
  const skills = allData.habilidades;
  const container = document.getElementById('habilidades-list');

  // Stats
  document.getElementById('skill-total').textContent = skills.length;
  const categories = new Set(skills.map(s => s.category)).size;
  document.getElementById('skill-cats').textContent = categories;

  // Items
  if (skills.length === 0) {
    container.innerHTML = '<div class="empty-state">No hay habilidades aún 📭</div>';
    return;
  }

  container.innerHTML = skills.map(skill => `
    <div class="table-row">
      <div class="item-name">${skill.name}</div>
      <div class="item-detail">${skill.category}</div>
      <div class="item-detail">${skill.level || 'N/A'}</div>
      <div class="item-detail">${skill.image || 'No img'}</div>
      <div class="row-actions">
        <button class="btn-sm btn-edit" onclick="openModal('habilidades', '${skill.id}')">✏️</button>
        <button class="btn-sm btn-delete" onclick="deleteItem('habilidades', '${skill.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

// ==================== CERTIFICADOS ====================
function renderCertificates() {
  const certificates = allData.certificados;
  const container = document.getElementById('certificados-list');

  // Stats
  document.getElementById('cert-total').textContent = certificates.length;

  // Items
  if (certificates.length === 0) {
    container.innerHTML = '<div class="empty-state">No hay certificados aún 📭</div>';
    return;
  }

  container.innerHTML = certificates.map(cert => `
    <div class="table-row">
      <div class="item-name">${cert.title}</div>
      <div class="item-detail">${cert.issuer}</div>
      <div class="item-detail">${cert.year}</div>
      <div class="item-detail">${cert.description.substring(0, 20)}...</div>
      <div class="row-actions">
        <button class="btn-sm btn-edit" onclick="openModal('certificados', '${cert.id}')">✏️</button>
        <button class="btn-sm btn-delete" onclick="deleteItem('certificados', '${cert.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

// ==================== NAVIGATION ====================
function switchSection(section) {
  currentSection = section;
  currentEditId = null;

  // Update sidebar
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  });
  event.target.classList.add('active');

  // Update sections
  document.querySelectorAll('main > section').forEach(sec => {
    sec.style.display = 'none';
  });
  document.getElementById(`${section}-section`).style.display = 'block';
}

// ==================== MODAL ====================
function openModal(type, id) {
  currentEditId = id;
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const submitBtn = document.getElementById('submit-btn');

  let isEdit = !!id;
  let data = null;

  if (isEdit) {
    if (type === 'proyectos') data = allData.proyectos.find(p => p.id == id);
    else if (type === 'trayectoria') data = allData.trayectoria.find(e => e.id == id);
    else if (type === 'habilidades') data = allData.habilidades.find(s => s.id == id);
    else if (type === 'certificados') data = allData.certificados.find(c => c.id == id);
  }

  title.textContent = isEdit ? `Editar ${getTypeName(type)}` : `Nuevo ${getTypeName(type)}`;
  submitBtn.textContent = isEdit ? 'Guardar Cambios' : 'Crear';

  body.innerHTML = getFormHTML(type, data);
  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  currentEditId = null;
}

function getTypeName(type) {
  const names = {
    proyectos: 'Proyecto',
    trayectoria: 'Experiencia',
    habilidades: 'Habilidad',
    certificados: 'Certificado'
  };
  return names[type];
}

function getFormHTML(type, data) {
  if (type === 'proyectos') {
    return `
      <div class="form-group">
        <label>Título *</label>
        <input type="text" id="form-title" value="${data?.title || ''}" required>
      </div>
      <div class="form-group">
        <label>Empresa *</label>
        <input type="text" id="form-company" value="${data?.company || ''}" required>
      </div>
      <div class="form-group">
        <label>Descripción *</label>
        <textarea id="form-description" required>${data?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <select id="form-type">
          <option value="App" ${data?.type === 'App' ? 'selected' : ''}>App</option>
          <option value="Web" ${data?.type === 'Web' ? 'selected' : ''}>Web</option>
        </select>
      </div>
      <div class="form-group">
        <label>Estado</label>
        <select id="form-status">
          <option value="Terminado" ${data?.status === 'Terminado' ? 'selected' : ''}>Terminado</option>
          <option value="En Desarrollo" ${data?.status === 'En Desarrollo' ? 'selected' : ''}>En Desarrollo</option>
        </select>
      </div>
      <div class="form-group">
        <label>Año</label>
        <input type="number" id="form-year" value="${data?.year || new Date().getFullYear()}">
      </div>
      <div class="form-group">
        <label>Imagen (URL)</label>
        <input type="text" id="form-image" value="${data?.image || ''}">
      </div>
      <div class="form-group">
        <label>GitHub URL</label>
        <input type="text" id="form-github" value="${data?.github || ''}">
      </div>
      <div class="form-group">
        <label>Demo URL</label>
        <input type="text" id="form-demo" value="${data?.demo || ''}">
      </div>
    `;
  } else if (type === 'trayectoria') {
    return `
      <div class="form-group">
        <label>Título *</label>
        <input type="text" id="form-title" value="${data?.title || ''}" required>
      </div>
      <div class="form-group">
        <label>Empresa *</label>
        <input type="text" id="form-company" value="${data?.company || ''}" required>
      </div>
      <div class="form-group">
        <label>Descripción</label>
        <textarea id="form-description">${data?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Inicio (YYYY-MM-DD)</label>
        <input type="text" id="form-startDate" value="${data?.startDate || ''}" placeholder="2026-01-15">
      </div>
      <div class="form-group">
        <label>Fin (YYYY-MM-DD) - Dejar vacío si es actual</label>
        <input type="text" id="form-endDate" value="${data?.endDate || ''}" placeholder="2026-06-30">
      </div>
      <div class="form-group">
        <label>Badge</label>
        <select id="form-badge">
          <option value="Actual" ${data?.badge === 'Actual' ? 'selected' : ''}>Actual</option>
          <option value="Entrada" ${data?.badge === 'Entrada' ? 'selected' : ''}>Entrada</option>
          <option value="Aprendizaje" ${data?.badge === 'Aprendizaje' ? 'selected' : ''}>Aprendizaje</option>
        </select>
      </div>
    `;
  } else if (type === 'habilidades') {
    return `
      <div class="form-group">
        <label>Nombre *</label>
        <input type="text" id="form-name" value="${data?.name || ''}" required>
      </div>
      <div class="form-group">
        <label>Categoría *</label>
        <input type="text" id="form-category" value="${data?.category || ''}" required>
      </div>
      <div class="form-group">
        <label>Nivel</label>
        <input type="text" id="form-level" value="${data?.level || ''}">
      </div>
      <div class="form-group">
        <label>Imagen (URL)</label>
        <input type="text" id="form-image" value="${data?.image || ''}">
      </div>
    `;
  } else if (type === 'certificados') {
    return `
      <div class="form-group">
        <label>Título *</label>
        <input type="text" id="form-title" value="${data?.title || ''}" required>
      </div>
      <div class="form-group">
        <label>Emisor *</label>
        <input type="text" id="form-issuer" value="${data?.issuer || ''}" required>
      </div>
      <div class="form-group">
        <label>Año</label>
        <input type="number" id="form-year" value="${data?.year || new Date().getFullYear()}">
      </div>
      <div class="form-group">
        <label>Descripción</label>
        <textarea id="form-description">${data?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Imagen (URL)</label>
        <input type="text" id="form-image" value="${data?.image || ''}">
      </div>
    `;
  }
}

// ==================== CRUD OPERATIONS ====================
function handleSubmit(event) {
  event.preventDefault();

  let formData = {};
  const type = currentSection;

  if (type === 'proyectos') {
    formData = {
      id: currentEditId || Date.now(),
      title: document.getElementById('form-title').value,
      company: document.getElementById('form-company').value,
      description: document.getElementById('form-description').value,
      type: document.getElementById('form-type').value,
      status: document.getElementById('form-status').value,
      year: parseInt(document.getElementById('form-year').value),
      image: document.getElementById('form-image').value,
      github: document.getElementById('form-github').value,
      demo: document.getElementById('form-demo').value
    };

    if (currentEditId) {
      const index = allData.proyectos.findIndex(p => p.id == currentEditId);
      allData.proyectos[index] = { ...allData.proyectos[index], ...formData };
    } else {
      allData.proyectos.push(formData);
    }
    localStorage.setItem('portafolio_projects', JSON.stringify(allData.proyectos));

  } else if (type === 'trayectoria') {
    formData = {
      id: currentEditId || Date.now(),
      title: document.getElementById('form-title').value,
      company: document.getElementById('form-company').value,
      description: document.getElementById('form-description').value,
      startDate: document.getElementById('form-startDate').value,
      endDate: document.getElementById('form-endDate').value,
      badge: document.getElementById('form-badge').value
    };

    if (currentEditId) {
      const index = allData.trayectoria.findIndex(e => e.id == currentEditId);
      allData.trayectoria[index] = { ...allData.trayectoria[index], ...formData };
    } else {
      allData.trayectoria.push(formData);
    }
    localStorage.setItem('portafolio_experiences', JSON.stringify(allData.trayectoria));

  } else if (type === 'habilidades') {
    formData = {
      id: currentEditId || Date.now(),
      name: document.getElementById('form-name').value,
      category: document.getElementById('form-category').value,
      level: document.getElementById('form-level').value,
      image: document.getElementById('form-image').value
    };

    if (currentEditId) {
      const index = allData.habilidades.findIndex(s => s.id == currentEditId);
      allData.habilidades[index] = { ...allData.habilidades[index], ...formData };
    } else {
      allData.habilidades.push(formData);
    }
    localStorage.setItem('portafolio_skills', JSON.stringify(allData.habilidades));

  } else if (type === 'certificados') {
    formData = {
      id: currentEditId || Date.now(),
      title: document.getElementById('form-title').value,
      issuer: document.getElementById('form-issuer').value,
      year: parseInt(document.getElementById('form-year').value),
      description: document.getElementById('form-description').value,
      image: document.getElementById('form-image').value
    };

    if (currentEditId) {
      const index = allData.certificados.findIndex(c => c.id == currentEditId);
      allData.certificados[index] = { ...allData.certificados[index], ...formData };
    } else {
      allData.certificados.push(formData);
    }
    localStorage.setItem('portafolio_certificates', JSON.stringify(allData.certificados));
  }

  notificaAlPortafolio();
  closeModal();
  loadAllData();
  renderAllLists();
  mostrarFeedback();
}

function deleteItem(type, id) {
  if (!confirm('¿Estás seguro de que quieres eliminar?')) return;

  if (type === 'proyectos') {
    allData.proyectos = allData.proyectos.filter(p => p.id != id);
    localStorage.setItem('portafolio_projects', JSON.stringify(allData.proyectos));
  } else if (type === 'trayectoria') {
    allData.trayectoria = allData.trayectoria.filter(e => e.id != id);
    localStorage.setItem('portafolio_experiences', JSON.stringify(allData.trayectoria));
  } else if (type === 'habilidades') {
    allData.habilidades = allData.habilidades.filter(s => s.id != id);
    localStorage.setItem('portafolio_skills', JSON.stringify(allData.habilidades));
  } else if (type === 'certificados') {
    allData.certificados = allData.certificados.filter(c => c.id != id);
    localStorage.setItem('portafolio_certificates', JSON.stringify(allData.certificados));
  }

  notificaAlPortafolio();
  loadAllData();
  renderAllLists();
  mostrarFeedback('Eliminado correctamente');
}

// ==================== SEARCH ====================
function filterTable(type) {
  const searchTerm = event.target.value.toLowerCase();
  const rows = document.querySelectorAll(`#${type}-list .table-row`);

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? '' : 'none';
  });
}

// ==================== FEEDBACK ====================
function mostrarFeedback(mensaje = '✅ Guardado correctamente') {
  const feedback = document.getElementById('feedback');
  feedback.textContent = mensaje;
  feedback.classList.add('show');
  setTimeout(() => feedback.classList.remove('show'), 2500);
}

function notificaAlPortafolio() {
  window.dispatchEvent(
    new CustomEvent('portafolioDataUpdated', {
      detail: { message: 'Datos actualizado desde admin panel' }
    })
  );
}

// ==================== ESCAPE KEY ====================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
