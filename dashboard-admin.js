/**
 * Dashboard Admin - Lógica principal
 * Sistema completo integrado con localStorage
 */

const STORAGE_KEYS = {
    projects: 'portafolio_projects',
    experiences: 'portafolio_experiences',
    skills: 'portafolio_skills',
    certificates: 'portafolio_certificates'
};

let currentSection = 'proyectos';
let editingId = null;
let allData = {};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadAllData();
    setupRealtimeSync();
});

// ==================== CARGAR DATOS ====================
function loadAllData() {
    allData = {
        projects: JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '[]'),
        experiences: JSON.parse(localStorage.getItem(STORAGE_KEYS.experiences) || '[]'),
        skills: JSON.parse(localStorage.getItem(STORAGE_KEYS.skills) || '[]'),
        certificates: JSON.parse(localStorage.getItem(STORAGE_KEYS.certificates) || '[]')
    };
    renderAllLists();
}

function setupRealtimeSync() {
    window.addEventListener('storage', (event) => {
        if (Object.values(STORAGE_KEYS).includes(event.key)) {
            loadAllData();
        }
    });
}

// ==================== RENDER ====================
function renderAllLists() {
    renderProjects();
    renderExperiences();
    renderSkills();
    renderCertificates();
}

function renderProjects() {
    const projects = allData.projects;
    const list = document.getElementById('proyectos-list');

    if (projects.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>📭 Sin proyectos</p></div>';
    } else {
        list.innerHTML = projects.map(p => `
            <div class="table-row">
                <div class="item-name">${p.title}</div>
                <div class="item-detail">${p.company}</div>
                <div><span class="badge badge-primary">${p.type}</span></div>
                <div><span class="badge ${p.status === 'Terminado' ? 'badge-success' : 'badge-warning'}">${p.status}</span></div>
                <div class="row-actions">
                    <button class="btn-sm btn-edit" onclick="openModal('proyectos', ${p.id})">✏️</button>
                    <button class="btn-sm btn-delete" onclick="deleteItem('proyectos', ${p.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Actualizar stats
    document.getElementById('proj-total').textContent = projects.length;
    document.getElementById('proj-apps').textContent = projects.filter(p => p.type === 'App').length;
    document.getElementById('proj-finished').textContent = projects.filter(p => p.status === 'Terminado').length;
}

function renderExperiences() {
    const experiences = allData.experiences;
    const list = document.getElementById('trayectoria-list');

    if (experiences.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>📭 Sin experiencias</p></div>';
    } else {
        list.innerHTML = experiences.map(e => `
            <div class="table-row">
                <div class="item-name">${e.title}</div>
                <div class="item-detail">${e.company}</div>
                <div class="item-detail">${e.startDate}</div>
                <div class="item-detail">${e.endDate || 'Actual'}</div>
                <div class="row-actions">
                    <button class="btn-sm btn-edit" onclick="openModal('trayectoria', ${e.id})">✏️</button>
                    <button class="btn-sm btn-delete" onclick="deleteItem('trayectoria', ${e.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('exp-total').textContent = experiences.length;
    document.getElementById('exp-current').textContent = experiences.filter(e => !e.endDate).length;
}

function renderSkills() {
    const skills = allData.skills;
    const list = document.getElementById('habilidades-list');

    if (skills.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>📭 Sin habilidades</p></div>';
    } else {
        list.innerHTML = skills.map(s => `
            <div class="table-row">
                <div class="item-name">${s.emoji || ''} ${s.name}</div>
                <div class="item-detail">${s.category}</div>
                <div><span class="badge badge-primary">${s.level}/5</span></div>
                <div class="item-detail">${s.image ? '✓' : '—'}</div>
                <div class="row-actions">
                    <button class="btn-sm btn-edit" onclick="openModal('habilidades', ${s.id})">✏️</button>
                    <button class="btn-sm btn-delete" onclick="deleteItem('habilidades', ${s.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('skill-total').textContent = skills.length;
    const cats = new Set(skills.map(s => s.category)).size;
    document.getElementById('skill-cats').textContent = cats;
}

function renderCertificates() {
    const certificates = allData.certificates;
    const list = document.getElementById('certificados-list');

    if (certificates.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>📭 Sin certificados</p></div>';
    } else {
        list.innerHTML = certificates.map(c => `
            <div class="table-row">
                <div class="item-name">${c.title}</div>
                <div class="item-detail">${c.issuer}</div>
                <div class="item-detail">${c.year}</div>
                <div class="item-detail">${c.description || '—'}</div>
                <div class="row-actions">
                    <button class="btn-sm btn-edit" onclick="openModal('certificados', ${c.id})">✏️</button>
                    <button class="btn-sm btn-delete" onclick="deleteItem('certificados', ${c.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('cert-total').textContent = certificates.length;
}

// ==================== MODAL ====================
function openModal(type, id) {
    const modal = document.getElementById('modal');
    const form = document.getElementById('modal-form');
    const body = document.getElementById('modal-body');

    editingId = id;
    let item = null;
    let title = '';

    if (id) {
        item = allData[type].find(i => i.id === id);
    }

    // Generar formulario según tipo
    if (type === 'proyectos') {
        title = item ? 'Editar Proyecto' : 'Nuevo Proyecto';
        body.innerHTML = `
            <div class="form-group">
                <label>Nombre *</label>
                <input type="text" id="proj-title" value="${item?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>Descripción *</label>
                <textarea id="proj-desc" required>${item?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Empresa *</label>
                <select id="proj-company" required>
                    <option value="Iencinas" ${item?.company === 'Iencinas' ? 'selected' : ''}>Iencinas</option>
                    <option value="Yencinas" ${item?.company === 'Yencinas' ? 'selected' : ''}>Yencinas</option>
                    <option value="Constructora PDS" ${item?.company === 'Constructora PDS' ? 'selected' : ''}>Constructora PDS</option>
                    <option value="Proyecto Personal" ${item?.company === 'Proyecto Personal' ? 'selected' : ''}>Proyecto Personal</option>
                </select>
            </div>
            <div class="form-group">
                <label>Tipo *</label>
                <select id="proj-type" required>
                    <option value="App" ${item?.type === 'App' ? 'selected' : ''}>App</option>
                    <option value="Web" ${item?.type === 'Web' ? 'selected' : ''}>Web</option>
                </select>
            </div>
            <div class="form-group">
                <label>Estado *</label>
                <select id="proj-status" required>
                    <option value="Terminado" ${item?.status === 'Terminado' ? 'selected' : ''}>Terminado</option>
                    <option value="En Desarrollo" ${item?.status === 'En Desarrollo' ? 'selected' : ''}>En Desarrollo</option>
                </select>
            </div>
            <div class="form-group">
                <label>Año *</label>
                <input type="number" id="proj-year" value="${item?.year || 2024}" required>
            </div>
            <div class="form-group">
                <label>Imagen *</label>
                <input type="text" id="proj-image" value="${item?.image || '/projects/'}" placeholder="/projects/logo.png" required>
            </div>
            <div class="form-group">
                <label>GitHub</label>
                <input type="text" id="proj-github" value="${item?.github || ''}">
            </div>
            <div class="form-group">
                <label>Demo</label>
                <input type="text" id="proj-demo" value="${item?.demo || ''}">
            </div>
        `;
        form.dataset.type = 'proyectos';
    } else if (type === 'trayectoria') {
        title = item ? 'Editar Experiencia' : 'Nueva Experiencia';
        body.innerHTML = `
            <div class="form-group">
                <label>Título *</label>
                <input type="text" id="exp-title" value="${item?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>Empresa *</label>
                <input type="text" id="exp-company" value="${item?.company || ''}" required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="exp-desc">${item?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Fecha Inicio *</label>
                <input type="date" id="exp-start" value="${item?.startDate || ''}" required>
            </div>
            <div class="form-group">
                <label>Fecha Fin</label>
                <input type="date" id="exp-end" value="${item?.endDate || ''}">
            </div>
            <div class="form-group">
                <label>Badge</label>
                <select id="exp-badge">
                    <option value="Actual" ${item?.badge === 'Actual' ? 'selected' : ''}>Actual</option>
                    <option value="Entrada" ${item?.badge === 'Entrada' ? 'selected' : ''}>Entrada</option>
                    <option value="Aprendizaje" ${item?.badge === 'Aprendizaje' ? 'selected' : ''}>Aprendizaje</option>
                    <option value="Liderazgo" ${item?.badge === 'Liderazgo' ? 'selected' : ''}>Liderazgo</option>
                </select>
            </div>
        `;
        form.dataset.type = 'trayectoria';
    } else if (type === 'habilidades') {
        title = item ? 'Editar Habilidad' : 'Nueva Habilidad';
        body.innerHTML = `
            <div class="form-group">
                <label>Categoría *</label>
                <input type="text" id="skill-category" value="${item?.category || ''}" required>
            </div>
            <div class="form-group">
                <label>Nombre *</label>
                <input type="text" id="skill-name" value="${item?.name || ''}" required>
            </div>
            <div class="form-group">
                <label>Emoji</label>
                <input type="text" id="skill-emoji" value="${item?.emoji || '💻'}" maxlength="2">
            </div>
            <div class="form-group">
                <label>Imagen</label>
                <input type="text" id="skill-image" value="${item?.image || '/skills/'}" placeholder="/skills/logo.png">
            </div>
            <div class="form-group">
                <label>Nivel (1-5)</label>
                <input type="number" id="skill-level" min="1" max="5" value="${item?.level || 3}">
            </div>
        `;
        form.dataset.type = 'habilidades';
    } else if (type === 'certificados') {
        title = item ? 'Editar Certificado' : 'Nuevo Certificado';
        body.innerHTML = `
            <div class="form-group">
                <label>Título *</label>
                <input type="text" id="cert-title" value="${item?.title || ''}" required>
            </div>
            <div class="form-group">
                <label>Emisor *</label>
                <input type="text" id="cert-issuer" value="${item?.issuer || ''}" required>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea id="cert-desc">${item?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Año *</label>
                <input type="number" id="cert-year" value="${item?.year || 2024}" required>
            </div>
            <div class="form-group">
                <label>Imagen del Certificado</label>
                <input type="text" id="cert-image" value="${item?.image || '/certificates/'}" placeholder="/certificates/cert.jpg">
            </div>
            <div class="form-group">
                <label>Logo Emisor</label>
                <input type="text" id="cert-logo" value="${item?.logo || '/certificates/'}" placeholder="/certificates/logo.jpg">
            </div>
        `;
        form.dataset.type = 'certificados';
    }

    document.getElementById('modal-title').textContent = title;
    document.getElementById('submit-btn').textContent = item ? '💾 Guardar Cambios' : '➕ Crear';
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    editingId = null;
}

function handleSubmit(e) {
    e.preventDefault();
    const type = e.target.dataset.type;

    if (type === 'proyectos') {
        const data = {
            title: document.getElementById('proj-title').value,
            description: document.getElementById('proj-desc').value,
            company: document.getElementById('proj-company').value,
            type: document.getElementById('proj-type').value,
            status: document.getElementById('proj-status').value,
            year: parseInt(document.getElementById('proj-year').value),
            image: document.getElementById('proj-image').value,
            github: document.getElementById('proj-github').value,
            demo: document.getElementById('proj-demo').value
        };

        if (editingId) {
            const index = allData.projects.findIndex(p => p.id === editingId);
            allData.projects[index] = { ...allData.projects[index], ...data };
            mostrarFeedback('✏️ Proyecto actualizado');
        } else {
            allData.projects.push({ id: Date.now(), ...data });
            mostrarFeedback('✅ Proyecto creado');
        }
        localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(allData.projects));
    } else if (type === 'trayectoria') {
        const data = {
            title: document.getElementById('exp-title').value,
            company: document.getElementById('exp-company').value,
            description: document.getElementById('exp-desc').value,
            startDate: document.getElementById('exp-start').value,
            endDate: document.getElementById('exp-end').value,
            badge: document.getElementById('exp-badge').value
        };

        if (editingId) {
            const index = allData.experiences.findIndex(e => e.id === editingId);
            allData.experiences[index] = { ...allData.experiences[index], ...data };
            mostrarFeedback('✏️ Experiencia actualizada');
        } else {
            allData.experiences.push({ id: Date.now(), ...data });
            mostrarFeedback('✅ Experiencia creada');
        }
        localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(allData.experiences));
    } else if (type === 'habilidades') {
        const data = {
            category: document.getElementById('skill-category').value,
            name: document.getElementById('skill-name').value,
            emoji: document.getElementById('skill-emoji').value,
            image: document.getElementById('skill-image').value,
            level: parseInt(document.getElementById('skill-level').value)
        };

        if (editingId) {
            const index = allData.skills.findIndex(s => s.id === editingId);
            allData.skills[index] = { ...allData.skills[index], ...data };
            mostrarFeedback('✏️ Habilidad actualizada');
        } else {
            allData.skills.push({ id: Date.now(), ...data });
            mostrarFeedback('✅ Habilidad creada');
        }
        localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(allData.skills));
    } else if (type === 'certificados') {
        const data = {
            title: document.getElementById('cert-title').value,
            issuer: document.getElementById('cert-issuer').value,
            description: document.getElementById('cert-desc').value,
            year: parseInt(document.getElementById('cert-year').value),
            image: document.getElementById('cert-image').value,
            logo: document.getElementById('cert-logo').value
        };

        if (editingId) {
            const index = allData.certificates.findIndex(c => c.id === editingId);
            allData.certificates[index] = { ...allData.certificates[index], ...data };
            mostrarFeedback('✏️ Certificado actualizado');
        } else {
            allData.certificates.push({ id: Date.now(), ...data });
            mostrarFeedback('✅ Certificado creado');
        }
        localStorage.setItem(STORAGE_KEYS.certificates, JSON.stringify(allData.certificates));
    }

    closeModal();
    loadAllData();
    notificaAlPortafolio('Datos actualizados');
}

function deleteItem(type, id) {
    if (confirm('¿Eliminar este elemento?')) {
        allData[type] = allData[type].filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(allData[type]));
        mostrarFeedback('🗑️ Elemento eliminado');
        renderAllLists();
        notificaAlPortafolio('Datos actualizados');
    }
}

// ==================== NAVEGACIÓN ====================
function switchSection(section) {
    currentSection = section;

    // Ocultar todas las secciones
    document.querySelectorAll('[id$="-section"]').forEach(s => s.style.display = 'none');

    // Mostrar sección activa
    document.getElementById(`${section}-section`).style.display = 'block';

    // Actualizar botones activos
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

function filterTable(type) {
    const search = event.target.value.toLowerCase();
    const listId = `${type}-list`;
    const list = document.getElementById(listId);
    const rows = list.querySelectorAll('.table-row');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
}

// ==================== UTILIDADES ====================
function mostrarFeedback(mensaje) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = mensaje;
    feedback.classList.add('show');
    setTimeout(() => feedback.classList.remove('show'), 3000);
}

function notificaAlPortafolio(mensaje) {
    window.dispatchEvent(new CustomEvent('portafolioDataUpdated', {
        detail: { message: mensaje, timestamp: new Date() }
    }));
}
