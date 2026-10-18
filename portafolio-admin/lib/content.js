export const REQUIRED_KEYS = [
  'header', 'hero', 'life', 'projectsHome', 'projectsPage', 'projectDetail', 'projects',
  'experienceHome', 'trajectoryPage', 'experiences', 'skills', 'certificates', 'contact', 'footer',
];

export function missingKeys(content) {
  if (!content || typeof content !== 'object' || Array.isArray(content)) return REQUIRED_KEYS;
  return REQUIRED_KEYS.filter((key) => !(key in content));
}
