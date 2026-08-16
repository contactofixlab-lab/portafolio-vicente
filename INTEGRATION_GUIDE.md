# 🚀 Guía de Integración - Consola Admin Conectada

## Arquitectura

```
┌─────────────────────────────────────────────────┐
│          CONSOLA ADMIN (admin-console.html)     │
│     - Crear/Editar/Eliminar proyectos           │
│     - Crear/Editar/Eliminar experiencias        │
│     - Crear/Editar/Eliminar habilidades         │
│     - Crear/Editar/Eliminar certificados        │
└────────────────────┬────────────────────────────┘
                     │
                     ↓ (Escribe/Lee)
          ┌──────────────────────┐
          │   localStorage       │
          │  (Base de datos)      │
          └──────────────────────┘
                     ↑
                     │ (Lee/Actualiza)
┌────────────────────┴────────────────────────────┐
│         PORTAFOLIO (App.jsx/React)             │
│     - Muestra proyectos                         │
│     - Muestra experiencias                      │
│     - Muestra habilidades                       │
│     - Muestra certificados                      │
└─────────────────────────────────────────────────┘
```

## Cómo Funciona

### 1. Consola Admin
- Abre `admin-console.html` en el navegador
- Crea/edita datos
- Los datos se guardan automáticamente en `localStorage`
- El navegador mantiene los datos incluso después de cerrar

### 2. Portafolio Web
- Lee datos de `localStorage` usando `data-manager.js`
- Se actualiza automáticamente cuando cambian los datos
- Los cambios aparecen en tiempo real al refrescar

### 3. Sincronización
- Ambas páginas comparten el mismo `localStorage`
- Evento `storage` sincroniza cambios entre pestañas
- Los cambios en la consola aparecen en el portafolio

---

## Pasos de Integración

### Paso 1: Actualizar App.jsx

Reemplaza la importación de datos estática con llamadas a localStorage:

```javascript
// ANTES:
import { projects } from './data/projects'
import { experiences } from './data/experiences'
import { skills } from './data/skills'

// DESPUÉS:
import DataManager from './data/data-manager'

// En el componente App:
function App() {
  const [projects, setProjects] = useState(DataManager.getProjects());
  const [experiences, setExperiences] = useState(DataManager.getExperiences());
  const [skills, setSkills] = useState(DataManager.getSkills());

  useEffect(() => {
    // Suscribirse a cambios
    const unsubscribe = DataManager.subscribe('projects', setProjects);
    return unsubscribe;
  }, []);

  // ... resto del código
}
```

### Paso 2: Usar data-manager.js

El archivo `src/data/data-manager.js` proporciona:

```javascript
// Obtener datos
getProjects()
getExperiences()
getSkills()
getCertificates()

// Agregar datos
addProject(data)
addExperience(data)
addSkill(data)
addCertificate(data)

// Eliminar datos
deleteProject(id)
deleteExperience(id)
deleteSkill(id)
deleteCertificate(id)

// Suscribirse a cambios
subscribe('projects', callback)

// Exportar/Importar
exportAllData()
importData(data)
```

### Paso 3: Usar Admin Console

1. Abre `admin-console.html` en un navegador
2. Crea nuevos proyectos, experiencias, etc.
3. Los datos se guardan automáticamente en localStorage
4. Abre el portafolio y actualiza (F5)
5. Los cambios aparecen automáticamente

---

## Almacenamiento localStorage

Los datos se guardan en estas claves:

```javascript
portafolio_projects      // Array de proyectos
portafolio_experiences   // Array de experiencias
portafolio_skills        // Array de habilidades
portafolio_certificates  // Array de certificados
```

Formato de datos ejemplo:

```json
{
  "projects": [
    {
      "id": 1628945632000,
      "title": "Mi Proyecto",
      "description": "Descripción...",
      "company": "Proyecto Personal",
      "type": "App",
      "status": "Terminado",
      "year": 2024,
      "image": "/projects/logo.png",
      "github": "https://...",
      "demo": "https://..."
    }
  ]
}
```

---

## Desarrollo vs Producción

### Desarrollo
- Usa localStorage (funciona sin servidor)
- Los datos persisten en el navegador
- Ideal para edición y testing

### Producción
- Opción 1: Exportar JSON desde admin → Subir a GitHub
- Opción 2: Usar servidor con BD real
- Opción 3: Mantener localStorage (datos locales por usuario)

---

## Troubleshooting

### Los cambios no aparecen
1. ¿Refrescaste el portafolio después de cambios?
2. ¿Estás usando el mismo navegador en ambas páginas?
3. Abre DevTools → Storage → localStorage → Verifica que existan las claves

### Datos vacíos
- Los datos por defecto se crean automáticamente
- Si no ves nada, borra localStorage y recarga: `localStorage.clear()`

### Sincronizar entre computadoras
- localStorage es local al navegador/computadora
- Para sincronizar entre dispositivos:
  1. Exporta JSON desde admin
  2. Comparte el archivo
  3. Importa en otra computadora

---

## Próximos Pasos

1. ✅ Crear estructura data-manager.js
2. ✅ Crear consola admin integrada
3. ⏳ Actualizar App.jsx con localStorage
4. ⏳ Aplicar diseño PDS a admin
5. ⏳ Deploy a Vercel

---

## Archivos Creados

- `admin-console.html` - Interfaz visual
- `admin-console-integrated.js` - Lógica integrada con localStorage
- `src/data/data-manager.js` - API compartida
- `INTEGRATION_GUIDE.md` - Este archivo

---

**¿Necesitas ayuda?** 📞 Revisa los comentarios en los archivos JavaScript o ejecuta en DevTools:
```javascript
// Ver todos los datos
console.log(JSON.parse(localStorage.getItem('portafolio_projects')))

// Limpiar todo (cuidado!)
localStorage.clear()
```
