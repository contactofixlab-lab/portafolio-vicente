# 🔐 Cómo Acceder al Admin Panel

## ⚠️ IMPORTANTE: Acceso Correcto

El Admin Panel DEBE accederse directamente desde el navegador, **NO desde preview o data: URLs**.

### ✅ Forma CORRECTA

#### Opción 1: Abrir archivo directamente
1. Abre el explorador de archivos (Windows Explorer)
2. Navega a: `D:\Proyectos IT\Proyectos Personales\portafolio Vicente\`
3. Haz doble clic en `admin-panel.html`
4. Se abrirá en tu navegador predeterminado

#### Opción 2: Desde el navegador
1. Abre tu navegador favorito (Chrome, Firefox, Edge, etc.)
2. Presiona `Ctrl + L` (o haz clic en la barra de direcciones)
3. Escribe: `file:///D:/Proyectos%20IT/Proyectos%20Personales/portafolio%20Vicente/admin-panel.html`
4. Presiona Enter

#### Opción 3: Acceso rápido
**En Windows, crea un atajo:**
1. Haz clic derecho en el escritorio
2. Nuevo → Acceso directo
3. Ubicación: `file:///D:/Proyectos%20IT/Proyectos%20Personales/portafolio%20Vicente/admin-panel.html`
4. Nombre: Admin Panel
5. ✅ Crear

Luego solo haz doble clic en el acceso directo.

---

## ❌ Forma INCORRECTA (no funcionará)

- ❌ NO abrir desde Claude Code preview
- ❌ NO usar data: URLs
- ❌ NO esperar que funcione en navegadores sandboxed

**Razón**: Las `data: URLs` no pueden acceder a `localStorage` por razones de seguridad.

---

## 🔑 Login

**Contraseña**: `vincente2026`

---

## 📊 Datos Iniciales

Al abrir el admin panel por primera vez, se cargan automáticamente:

- ✅ **10 Proyectos**: Iencinas Analytics, Yencinas Bodega, TRAZA, Constructora PDS, PokeTask, Vortex, FamilyColab, NEXORA, Plataforma Videojuegos, RecipeHub
- ✅ **7 Experiencias**: Todas desde 2020 hasta 2026
- ✅ **9 Habilidades**: JavaScript, SQL, Python, Power BI, y más
- ✅ **5 Certificados**: Excel, Hardware, Power BI, Project Management, Alibaba

---

## 🔄 Sincronización

Cualquier cambio que hagas en el Admin Panel se:
1. ✅ Guarda automáticamente en `localStorage`
2. ✅ Se refleja en el portafolio React al refrescar
3. ✅ Persiste entre sesiones

---

## 📋 Troubleshooting

### "Contraseña incorrecta" o no carga datos
- Verifica que estés usando `file://` URL (no `data:` URL)
- Abre DevTools (F12) → Storage → localStorage
- Deberías ver claves: `portafolio_projects`, `portafolio_experiences`, etc.

### Si localStorage está vacío
- Es normal la primera vez
- Recarga la página (F5)
- Los datos se inicializarán automáticamente

### Los datos se pierden después de cerrar
- Normal si abriste desde data: URL (no se persiste)
- Usa `file://` URL correctamente
- localStorage persiste indefinidamente con `file://`

---

## 🚀 Acceso Rápido - Scripts

**Para Windows (PowerShell):**
```powershell
# Abrir admin panel en navegador predeterminado
Start-Process "file:///D:/Proyectos IT/Proyectos Personales/portafolio Vicente/admin-panel.html"
```

**Para macOS/Linux:**
```bash
# Abrir admin panel en navegador predeterminado
open "file:///D:/Proyectos%20IT/Proyectos%20Personales/portafolio%20Vicente/admin-panel.html"
```

---

## 📱 Desde Teléfono/Tablet

Para acceder desde otro dispositivo en la red:
1. Necesitas un servidor local (Python, Node.js, etc.)
2. O compartir la carpeta en red
3. O deployar a un servidor (AWS, Vercel, etc.)

**Para testing local en otro dispositivo:**
```bash
cd "D:/Proyectos IT/Proyectos Personales/portafolio Vicente"
python -m http.server 8000
```

Luego accede desde otro device: `http://TU_IP:8000/admin-panel.html`

---

**Versión**: 1.0 | **Última actualización**: 2026-08-16
