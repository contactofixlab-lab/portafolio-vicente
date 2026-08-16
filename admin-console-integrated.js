/**
 * Consola Admin Integrada - Usa localStorage como base de datos
 * Sincronizada con el portafolio en tiempo real
 */

const STORAGE_KEYS = {
    projects: 'portafolio_projects',
    experiences: 'portafolio_experiences',
    skills: 'portafolio_skills',
    certificates: 'portafolio_certificates'
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadAllData();
    setupRealtimeSync();
});

// Sincronización en tiempo real entre pestañas
function setupRealtimeSync() {
    window.addEventListener('storage', (event) => {
        if (Object.values(STORAGE_KEYS).includes(event.key)) {
            loadAllData();
        }
    });
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('projectForm').addEventListener('submit', addProject);
    document.getElementById('experienceForm').addEventListener('submit', addExperience);
    document.getElementById('skillForm').addEventListener('submit', addSkill);
    document.getElementById('certForm').addEventListener('submit', addCertificate);
}

// ==================== PROYECTOS ====================
function addProject(e) {
    e.preventDefault();
    const project = {
        id: Date.now(),
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

    const projects = getProjects();
    projects.push(project);
    saveProjects(projects);

    document.getElementById('projectForm').reset();
    loadProjects();
    mostrarFeedback('✅ Proyecto agregado - Cambios en vivo');
}

function getProjects() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.projects) || '[]');
}

function saveProjects(projects) {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    notificaAlPortafolio('Proyectos actualizado');
}

function loadProjects() {
    const projects = getProjects();
    const list = document.getElementById('proyectos-list');

    if (projects.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>📭 Sin proyectos</p></div>';
        updateStats('proyectos', projects);
        return;
    }

    list.innerHTML = projects.map(p => `
        <div class="item-card">
            <h3>${p.title} <span style="font-size: 0.8em; color: #64748b;">#${p.id}</span></h3>
            <p>${p.description}</p>
            <div class="item-meta">
                <span class="badge">${p.company}</span>
                <span class="badge">${p.type}</span>
                <span class="badge">${p.status}</span>
                <span class="badge">${p.year}</span>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editProject(${p.id})">✏️ Editar</button>
                <button class="btn-delete" onclick="deleteProject(${p.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');

    updateStats('proyectos', projects);
}

function deleteProject(id) {
    if (confirm('¿Eliminar este proyecto?')) {
        const projects = getProjects().filter(p => p.id !== id);
        saveProjects(projects);
        loadProjects();
        mostrarFeedback('🗑️ Proyecto eliminado - Cambios en vivo');
    }
}

function filterProjects() {
    const search = event.target.value.toLowerCase();
    const projects = getProjects();
    const filtered = projects.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.company.toLowerCase().includes(search)
    );
    displayFilteredProjects(filtered);
}

function displayFilteredProjects(filtered) {
    const list = document.getElementById('proyectos-list');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>Sin resultados</p></div>';
        return;
    }

    list.innerHTML = filtered.map(p => `
        <div class="item-card">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <div class="item-meta">
                <span class="badge">${p.company}</span>
                <span class="badge">${p.type}</span>
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteProject(${p.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// ==================== TRAYECTORIA ====================
function addExperience(e) {
    e.preventDefault();
    const experience = {
        id: Date.now(),
        title: document.getElementById('exp-title').value,
        company: document.getElementById('exp-company').value,
        description: document.getElementById('exp-desc').value,
        startDate: document.getElementById('exp-start').value,
        endDate: document.getElementById('exp-end').value,
        badge: document.getElementById('exp-badge').value
    };

    const experiences = getExperiences();
    experiences.push(experience);
    saveExperiences(experiences);

    document.getElementById('experienceForm').reset();
    loadExperiences();
    mostrarFeedback('✅ Experiencia agregada - Cambios en vivo');
}

function getExperiences() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.experiences) || '[]');
}

function saveExperiences(experiences) {
    localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(experiences));
    notificaAlPortafolio('Trayectoria actualizada');
}

function loadExperiences() {
    const experiences = getExperiences();
    const list = document.getElementById('experiences-list');

    if (experiences.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>📭 Sin experiencias</p></div>';
        updateStats('trayectoria', experiences);
        return;
    }

    list.innerHTML = experiences.map(e => `
        <div class="item-card">
            <h3>${e.title}</h3>
            <p>${e.company}</p>
            <p style="font-size: 0.85em; color: #94a3b8;">${e.description}</p>
            <div class="item-meta">
                <span class="badge">${e.startDate}</span>
                <span class="badge">${e.endDate || 'Actual'}</span>
                <span class="badge">${e.badge}</span>
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteExperience(${e.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');

    updateStats('trayectoria', experiences);
}

function deleteExperience(id) {
    if (confirm('¿Eliminar esta experiencia?')) {
        const experiences = getExperiences().filter(e => e.id !== id);
        saveExperiences(experiences);
        loadExperiences();
        mostrarFeedback('🗑️ Experiencia eliminada - Cambios en vivo');
    }
}

function filterExperiences() {
    const search = event.target.value.toLowerCase();
    const experiences = getExperiences();
    const filtered = experiences.filter(e =>
        e.title.toLowerCase().includes(search) ||
        e.company.toLowerCase().includes(search)
    );
    displayFilteredExperiences(filtered);
}

function displayFilteredExperiences(filtered) {
    const list = document.getElementById('experiences-list');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>Sin resultados</p></div>';
        return;
    }

    list.innerHTML = filtered.map(e => `
        <div class="item-card">
            <h3>${e.title}</h3>
            <p>${e.company}</p>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteExperience(${e.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// ==================== HABILIDADES ====================
function addSkill(e) {
    e.preventDefault();
    const skill = {
        id: Date.now(),
        category: document.getElementById('skill-category').value,
        name: document.getElementById('skill-name').value,
        emoji: document.getElementById('skill-emoji').value,
        image: document.getElementById('skill-image').value,
        level: parseInt(document.getElementById('skill-level').value)
    };

    const skills = getSkills();
    skills.push(skill);
    saveSkills(skills);

    document.getElementById('skillForm').reset();
    loadSkills();
    mostrarFeedback('✅ Habilidad agregada - Cambios en vivo');
}

function getSkills() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.skills) || '[]');
}

function saveSkills(skills) {
    localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills));
    notificaAlPortafolio('Habilidades actualizado');
}

function loadSkills() {
    const skills = getSkills();
    const list = document.getElementById('skills-list');

    if (skills.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>📭 Sin habilidades</p></div>';
        updateStats('habilidades', skills);
        return;
    }

    list.innerHTML = skills.map(s => `
        <div class="item-card">
            <h3>${s.emoji} ${s.name}</h3>
            <p style="font-size: 0.85em; color: #94a3b8;">${s.category}</p>
            <div class="item-meta">
                <span class="badge">Nivel: ${s.level}/5</span>
                ${s.image ? `<span class="badge">${s.image}</span>` : ''}
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteSkill(${s.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');

    updateStats('habilidades', skills);
}

function deleteSkill(id) {
    if (confirm('¿Eliminar esta habilidad?')) {
        const skills = getSkills().filter(s => s.id !== id);
        saveSkills(skills);
        loadSkills();
        mostrarFeedback('🗑️ Habilidad eliminada - Cambios en vivo');
    }
}

function filterSkills() {
    const search = event.target.value.toLowerCase();
    const skills = getSkills();
    const filtered = skills.filter(s =>
        s.name.toLowerCase().includes(search) ||
        s.category.toLowerCase().includes(search)
    );
    displayFilteredSkills(filtered);
}

function displayFilteredSkills(filtered) {
    const list = document.getElementById('skills-list');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>Sin resultados</p></div>';
        return;
    }

    list.innerHTML = filtered.map(s => `
        <div class="item-card">
            <h3>${s.emoji} ${s.name}</h3>
            <p>${s.category}</p>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteSkill(${s.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// ==================== CERTIFICADOS ====================
function addCertificate(e) {
    e.preventDefault();
    const cert = {
        id: Date.now(),
        title: document.getElementById('cert-title').value,
        issuer: document.getElementById('cert-issuer').value,
        description: document.getElementById('cert-desc').value,
        year: parseInt(document.getElementById('cert-year').value),
        image: document.getElementById('cert-image').value,
        logo: document.getElementById('cert-logo').value
    };

    const certs = getCertificates();
    certs.push(cert);
    saveCertificates(certs);

    document.getElementById('certForm').reset();
    loadCertificates();
    mostrarFeedback('✅ Certificado agregado - Cambios en vivo');
}

function getCertificates() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.certificates) || '[]');
}

function saveCertificates(certs) {
    localStorage.setItem(STORAGE_KEYS.certificates, JSON.stringify(certs));
    notificaAlPortafolio('Certificados actualizado');
}

function loadCertificates() {
    const certs = getCertificates();
    const list = document.getElementById('certs-list');

    if (certs.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>📭 Sin certificados</p></div>';
        updateStats('certificados', certs);
        return;
    }

    list.innerHTML = certs.map(c => `
        <div class="item-card">
            <h3>${c.title}</h3>
            <p>${c.issuer}</p>
            <p style="font-size: 0.85em; color: #94a3b8;">${c.description}</p>
            <div class="item-meta">
                <span class="badge">${c.year}</span>
            </div>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteCertificate(${c.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');

    updateStats('certificados', certs);
}

function deleteCertificate(id) {
    if (confirm('¿Eliminar este certificado?')) {
        const certs = getCertificates().filter(c => c.id !== id);
        saveCertificates(certs);
        loadCertificates();
        mostrarFeedback('🗑️ Certificado eliminado - Cambios en vivo');
    }
}

function filterCerts() {
    const search = event.target.value.toLowerCase();
    const certs = getCertificates();
    const filtered = certs.filter(c =>
        c.title.toLowerCase().includes(search) ||
        c.issuer.toLowerCase().includes(search)
    );
    displayFilteredCerts(filtered);
}

function displayFilteredCerts(filtered) {
    const list = document.getElementById('certs-list');
    if (filtered.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>Sin resultados</p></div>';
        return;
    }

    list.innerHTML = filtered.map(c => `
        <div class="item-card">
            <h3>${c.title}</h3>
            <p>${c.issuer}</p>
            <div class="item-actions">
                <button class="btn-delete" onclick="deleteCertificate(${c.id})">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// ==================== FUNCIONES GENERALES ====================
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

function loadAllData() {
    loadProjects();
    loadExperiences();
    loadSkills();
    loadCertificates();
}

function updateStats(section, data) {
    if (section === 'proyectos') {
        document.getElementById('proj-total').textContent = data.length;
        document.getElementById('proj-apps').textContent = data.filter(p => p.type === 'App').length;
        document.getElementById('proj-fin').textContent = data.filter(p => p.status === 'Terminado').length;
    } else if (section === 'trayectoria') {
        document.getElementById('exp-total').textContent = data.length;
        document.getElementById('exp-actual').textContent = data.filter(e => !e.endDate).length;
    } else if (section === 'habilidades') {
        document.getElementById('skills-total').textContent = data.length;
        const cats = new Set(data.map(s => s.category)).size;
        document.getElementById('skills-cats').textContent = cats;
    } else if (section === 'certificados') {
        document.getElementById('certs-total').textContent = data.length;
    }
}

function exportJSON() {
    const data = {
        projects: getProjects(),
        experiences: getExperiences(),
        skills: getSkills(),
        certificates: getCertificates()
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portafolio-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
    mostrarFeedback('💾 Datos exportados');
}

function copyAllJSON() {
    const data = {
        projects: getProjects(),
        experiences: getExperiences(),
        skills: getSkills(),
        certificates: getCertificates()
    };

    const json = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(json).then(() => {
        mostrarFeedback('📋 JSON copiado al portapapeles');
    });
}

function exportAllData() {
    exportJSON();
}

function mostrarFeedback(mensaje) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = mensaje;
    feedback.classList.add('show');
    setTimeout(() => feedback.classList.remove('show'), 3000);
}

function notificaAlPortafolio(mensaje) {
    // Notificación que el portafolio puede captar si está abierto
    window.dispatchEvent(new CustomEvent('portafolioDataUpdated', {
        detail: { message: mensaje, timestamp: new Date() }
    }));
}
