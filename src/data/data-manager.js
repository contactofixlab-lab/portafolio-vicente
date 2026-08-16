/**
 * Data Manager - API compartida entre Consola Admin y Portafolio
 * Usa localStorage como base de datos en tiempo real
 */

const STORAGE_KEYS = {
    projects: 'portafolio_projects',
    experiences: 'portafolio_experiences',
    skills: 'portafolio_skills',
    certificates: 'portafolio_certificates'
};

// Datos por defecto (bootstrap inicial)
const DEFAULT_DATA = {
    projects: [
        {
            id: 1,
            title: 'Iencinas Analytics',
            description: 'Dashboard de BI para análisis de datos empresariales con reportes interactivos',
            company: 'Iencinas',
            type: 'App',
            status: 'Terminado',
            year: 2024,
            image: '/projects/analytics-logo.png',
            github: 'https://github.com/contactofixlab-lab/iencinas-analytics',
            demo: 'https://iencinas-analytics.vercel.app'
        }
    ],
    experiences: [],
    skills: [],
    certificates: []
};

/**
 * Obtener todos los proyectos
 */
export function getProjects() {
    const data = localStorage.getItem(STORAGE_KEYS.projects);
    return data ? JSON.parse(data) : DEFAULT_DATA.projects;
}

/**
 * Agregar proyecto
 */
export function addProject(project) {
    const projects = getProjects();
    const newProject = {
        id: Date.now(),
        ...project
    };
    projects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    notifySubscribers('projects', projects);
    return newProject;
}

/**
 * Actualizar proyecto
 */
export function updateProject(id, updates) {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
        projects[index] = { ...projects[index], ...updates };
        localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
        notifySubscribers('projects', projects);
    }
    return projects[index];
}

/**
 * Eliminar proyecto
 */
export function deleteProject(id) {
    const projects = getProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
    notifySubscribers('projects', projects);
}

/**
 * Obtener todas las experiencias
 */
export function getExperiences() {
    const data = localStorage.getItem(STORAGE_KEYS.experiences);
    return data ? JSON.parse(data) : DEFAULT_DATA.experiences;
}

/**
 * Agregar experiencia
 */
export function addExperience(experience) {
    const experiences = getExperiences();
    const newExperience = {
        id: Date.now(),
        ...experience
    };
    experiences.push(newExperience);
    localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(experiences));
    notifySubscribers('experiences', experiences);
    return newExperience;
}

/**
 * Eliminar experiencia
 */
export function deleteExperience(id) {
    const experiences = getExperiences().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(experiences));
    notifySubscribers('experiences', experiences);
}

/**
 * Obtener todas las habilidades
 */
export function getSkills() {
    const data = localStorage.getItem(STORAGE_KEYS.skills);
    return data ? JSON.parse(data) : DEFAULT_DATA.skills;
}

/**
 * Agregar habilidad
 */
export function addSkill(skill) {
    const skills = getSkills();
    const newSkill = {
        id: Date.now(),
        ...skill
    };
    skills.push(newSkill);
    localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills));
    notifySubscribers('skills', skills);
    return newSkill;
}

/**
 * Eliminar habilidad
 */
export function deleteSkill(id) {
    const skills = getSkills().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills));
    notifySubscribers('skills', skills);
}

/**
 * Obtener todos los certificados
 */
export function getCertificates() {
    const data = localStorage.getItem(STORAGE_KEYS.certificates);
    return data ? JSON.parse(data) : DEFAULT_DATA.certificates;
}

/**
 * Agregar certificado
 */
export function addCertificate(certificate) {
    const certificates = getCertificates();
    const newCertificate = {
        id: Date.now(),
        ...certificate
    };
    certificates.push(newCertificate);
    localStorage.setItem(STORAGE_KEYS.certificates, JSON.stringify(certificates));
    notifySubscribers('certificates', certificates);
    return newCertificate;
}

/**
 * Eliminar certificado
 */
export function deleteCertificate(id) {
    const certificates = getCertificates().filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.certificates, JSON.stringify(certificates));
    notifySubscribers('certificates', certificates);
}

/**
 * Sistema de suscriptores para actualización en tiempo real
 */
const subscribers = {
    projects: [],
    experiences: [],
    skills: [],
    certificates: []
};

export function subscribe(type, callback) {
    if (subscribers[type]) {
        subscribers[type].push(callback);
        return () => {
            subscribers[type] = subscribers[type].filter(cb => cb !== callback);
        };
    }
}

function notifySubscribers(type, data) {
    if (subscribers[type]) {
        subscribers[type].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error notifying subscriber for ${type}:`, error);
            }
        });
    }
}

/**
 * Exportar todos los datos
 */
export function exportAllData() {
    return {
        projects: getProjects(),
        experiences: getExperiences(),
        skills: getSkills(),
        certificates: getCertificates()
    };
}

/**
 * Importar datos (para restaurar desde JSON)
 */
export function importData(data) {
    if (data.projects) {
        localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(data.projects));
        notifySubscribers('projects', data.projects);
    }
    if (data.experiences) {
        localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(data.experiences));
        notifySubscribers('experiences', data.experiences);
    }
    if (data.skills) {
        localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(data.skills));
        notifySubscribers('skills', data.skills);
    }
    if (data.certificates) {
        localStorage.setItem(STORAGE_KEYS.certificates, JSON.stringify(data.certificates));
        notifySubscribers('certificates', data.certificates);
    }
}

/**
 * Limpiar todo (solo para desarrollo)
 */
export function clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
    Object.values(subscribers).forEach(subs => subs.length = 0);
}

export default {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
    getExperiences,
    addExperience,
    deleteExperience,
    getSkills,
    addSkill,
    deleteSkill,
    getCertificates,
    addCertificate,
    deleteCertificate,
    subscribe,
    exportAllData,
    importData,
    clearAllData
};
