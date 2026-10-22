import site from './site-content.json'

export { ui, seo } from './ui'
export const content = site
export const { header, hero, life, projectsHome, projectsPage, projectDetail, experienceHome, trajectoryPage, skills, certificates, contact, footer } = site
export const experiences = site.experiences
export const visibleProjects = site.projects.filter((p) => p.visible !== false)
export const findProject = (id) => visibleProjects.find((p) => p.id === Number(id))
