# 🔐 Admin Panel - Consola Administrativa Privada

## Acceso Restringido

El Admin Panel es una **consola completamente separada** del portafolio principal. Solo es accesible mediante contraseña y NO está vinculada en el URL del portafolio.

### URL de Acceso

```
file:///D:/Proyectos IT/Proyectos Personales/portafolio Vicente/admin-panel.html
```

O simplemente abre el archivo `admin-panel.html` en el navegador.

### Contraseña

```
vincente2026
```

⚠️ **Importante**: Cambiar la contraseña en el archivo antes de deploy a producción (modificar `ADMIN_PASSWORD` en el script incrustado).

---

## Características

### 📊 Dashboard Moderno
- Interfaz moderna con sidebar morado
- 4 secciones principales: Proyectos, Trayectoria, Habilidades, Certificados
- Stats en tiempo real mostrando totales
- Búsqueda integrada en cada sección

### 🎨 CRUD Completo
- ✏️ **Crear**: Botón "Nuevo [Item]" abre formulario modal
- 📝 **Editar**: Botón de lápiz en cada fila
- 🗑️ **Eliminar**: Botón de papelera con confirmación
- 💾 **Guardar**: Datos persisten en `localStorage`

### 🔄 Sincronización
- Los datos se guardan automáticamente en `localStorage`
- El portafolio React lee los mismos datos y se actualiza automáticamente
- Evento `portafolioDataUpdated` notifica al portafolio de cambios

### 🔒 Seguridad

#### Contraseña
- Validación en el lado del cliente
- `sessionStorage` mantiene sesión activa
- "Salir" limpia la sesión

#### Aislamiento
- **NO linked** desde el portafolio principal
- **NO indexable** por motores de búsqueda
- Acceso solo via URL directo o archivo local

---

## Gestión de Datos

### Proyectos
Campos: Título, Empresa, Descripción, Tipo (App/Web), Estado, Año, Imagen, GitHub URL, Demo URL

### Trayectoria
Campos: Título, Empresa, Descripción, Inicio (YYYY-MM-DD), Fin (vacío si actual), Badge

### Habilidades
Campos: Nombre, Categoría, Nivel, Imagen URL

### Certificados
Campos: Título, Emisor, Año, Descripción, Imagen URL

---

## Almacenamiento

Los datos se guardan en `localStorage` con estas claves:

```javascript
portafolio_projects      // Array de proyectos
portafolio_experiences   // Array de experiencias
portafolio_skills        // Array de habilidades
portafolio_certificates  // Array de certificados
```

### Backup Manual

Para hacer backup de los datos:

1. Abre DevTools (F12)
2. Console tab
3. Ejecuta:
```javascript
const backup = {
  projects: JSON.parse(localStorage.getItem('portafolio_projects')),
  experiences: JSON.parse(localStorage.getItem('portafolio_experiences')),
  skills: JSON.parse(localStorage.getItem('portafolio_skills')),
  certificates: JSON.parse(localStorage.getItem('portafolio_certificates'))
};
console.log(JSON.stringify(backup, null, 2));
```

4. Copia el output y guarda en un archivo JSON

### Restaurar Datos

1. Console → Ejecuta:
```javascript
const data = { /* pegá el JSON aquí */ };
localStorage.setItem('portafolio_projects', JSON.stringify(data.projects));
localStorage.setItem('portafolio_experiences', JSON.stringify(data.experiences));
localStorage.setItem('portafolio_skills', JSON.stringify(data.skills));
localStorage.setItem('portafolio_certificates', JSON.stringify(data.certificates));
location.reload();
```

---

## Integración con Portafolio

El portafolio React debe estar actualizado para leer datos de `localStorage`:

1. **App.jsx** debe usar `DataManager` o similar
2. Debe suscribirse a cambios con event listeners
3. Al guardar en admin → evento `portafolioDataUpdated` se dispara
4. El portafolio recarga datos automáticamente

Ver `APP_UPDATED_EXAMPLE.jsx` para referencia.

---

## Arquitectura

```
Admin Panel (admin-panel.html)
    ↓ (escribe/actualiza)
localStorage (portafolio_*)
    ↑ (lee/sincroniza)
Portafolio React (App.jsx)
```

---

## Desarrollo

### Cambiar Contraseña

1. Abre `admin-panel.html`
2. Busca: `const ADMIN_PASSWORD = 'vincente2026';`
3. Reemplaza con tu nueva contraseña

### Personalizar Estilos

Los estilos están incrustados en `<style>` dentro del HTML. Variables clave:

- Color principal: `#667eea` (azul/púrpura)
- Color secundario: `#764ba2` (púrpura oscuro)
- Ancho sidebar: `280px`
- Font: sistema por defecto

### Agregar Nuevas Secciones

1. Agrega botón en sidebar
2. Agrega `<section>` en main
3. Crea funciones `render[Item]()` y `getFormHTML()`
4. Integra en `loadAllData()` y `renderAllLists()`

---

## Troubleshooting

### "Contraseña incorrecta" después de login correcto
- Borra `sessionStorage`: F12 → Storage → sessionStorage → Clear
- Intenta de nuevo

### Datos no aparecen después de guardar
- Verifica que `localStorage` esté habilitado en el navegador
- F12 → Storage → localStorage → Busca claves `portafolio_*`
- Si están vacías, refresca el admin panel y crea datos nuevamente

### Portafolio no actualiza después de cambios
- Verifica que `App.jsx` tenga listeners para `portafolioDataUpdated`
- Abre F12 → Console → crea algo en admin
- Deberías ver "📡 Portafolio actualizado" en portafolio

---

## Notas de Seguridad

⚠️ **Antes de Deploy:**

1. ✅ Cambiar `ADMIN_PASSWORD` a algo fuerte
2. ✅ Usar HTTPS en producción
3. ✅ Considerar agregar 2FA (si se integra con backend)
4. ✅ Limitar acceso por IP si es posible
5. ✅ No compartir URL con terceros

---

## Próximos Pasos

- [ ] Integrar con React para auto-refresh
- [ ] Agregar autenticación backend (JWT)
- [ ] Backup automático en la nube
- [ ] Historial de cambios / auditoría
- [ ] Roles y permisos

---

**Versión**: 1.0 | **Última actualización**: 2026-08-16
