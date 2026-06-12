# ThemeForge AI Studio

# Database Design Document (DDD)

## Versión 1.0

---

# 1. OBJETIVO

Definir la estructura completa de la base de datos de ThemeForge AI Studio.

La base de datos debe soportar:

* Gestión de proyectos.
* Wallpapers.
* Packs de iconos.
* Tendencias.
* Marketing.
* Exportaciones.
* Historial IA.
* Funciones futuras.

Motor:

PostgreSQL (Supabase)

---

# 2. MODELO GENERAL

USER

↓

PROJECTS

↓

WALLPAPERS

↓

ICON_PACKS

↓

MARKETING_ASSETS

↓

EXPORTS

---

# 3. TABLA USERS

## Descripción

Usuario propietario del sistema.

### Campos

user_id UUID PK

email VARCHAR(255)

full_name VARCHAR(255)

avatar_url TEXT

created_at TIMESTAMP

updated_at TIMESTAMP

---

# 4. TABLA PROJECTS

## Descripción

Contenedor principal de recursos.

### Campos

project_id UUID PK

user_id UUID FK

name VARCHAR(255)

description TEXT

category VARCHAR(100)

status VARCHAR(50)

thumbnail_url TEXT

favorite BOOLEAN

created_at TIMESTAMP

updated_at TIMESTAMP

deleted_at TIMESTAMP

---

# 5. TABLA PROJECT_TAGS

## Descripción

Etiquetas asociadas a proyectos.

### Campos

tag_id UUID PK

project_id UUID FK

tag_name VARCHAR(100)

created_at TIMESTAMP

---

# 6. TABLA WALLPAPERS

## Descripción

Wallpapers generados por IA.

### Campos

wallpaper_id UUID PK

project_id UUID FK

title VARCHAR(255)

prompt TEXT

negative_prompt TEXT

style VARCHAR(100)

resolution VARCHAR(50)

aspect_ratio VARCHAR(20)

image_url TEXT

thumbnail_url TEXT

generation_model VARCHAR(100)

version INTEGER

is_favorite BOOLEAN

created_at TIMESTAMP

---

# 7. TABLA WALLPAPER_VERSIONS

## Descripción

Versionado de wallpapers.

### Campos

version_id UUID PK

wallpaper_id UUID FK

version_number INTEGER

image_url TEXT

notes TEXT

created_at TIMESTAMP

---

# 8. TABLA ICON_PACKS

## Descripción

Packs completos de iconos.

### Campos

pack_id UUID PK

project_id UUID FK

name VARCHAR(255)

style VARCHAR(100)

theme_color VARCHAR(50)

preview_url TEXT

total_icons INTEGER

created_at TIMESTAMP

---

# 9. TABLA ICONS

## Descripción

Iconos individuales.

### Campos

icon_id UUID PK

pack_id UUID FK

app_name VARCHAR(255)

icon_type VARCHAR(100)

image_url TEXT

svg_url TEXT

created_at TIMESTAMP

---

# 10. TABLA AI_CONVERSATIONS

## Descripción

Conversaciones con Forge AI.

### Campos

conversation_id UUID PK

project_id UUID FK

title VARCHAR(255)

created_at TIMESTAMP

updated_at TIMESTAMP

---

# 11. TABLA AI_MESSAGES

## Descripción

Mensajes individuales.

### Campos

message_id UUID PK

conversation_id UUID FK

role VARCHAR(50)

content TEXT

tokens_used INTEGER

created_at TIMESTAMP

---

# 12. TABLA TRENDS

## Descripción

Tendencias identificadas.

### Campos

trend_id UUID PK

title VARCHAR(255)

category VARCHAR(100)

source VARCHAR(100)

score NUMERIC

growth_percentage NUMERIC

keyword VARCHAR(255)

created_at TIMESTAMP

---

# 13. TABLA TREND_REPORTS

## Descripción

Análisis generados por IA.

### Campos

report_id UUID PK

trend_id UUID FK

summary TEXT

opportunity_score INTEGER

competition_score INTEGER

recommended_action TEXT

created_at TIMESTAMP

---

# 14. TABLA MARKETING_ASSETS

## Descripción

Material promocional.

### Campos

asset_id UUID PK

project_id UUID FK

asset_type VARCHAR(100)

title VARCHAR(255)

content TEXT

language VARCHAR(50)

created_at TIMESTAMP

---

# 15. TABLA MOCKUPS

## Descripción

Mockups generados.

### Campos

mockup_id UUID PK

project_id UUID FK

title VARCHAR(255)

image_url TEXT

device_type VARCHAR(100)

created_at TIMESTAMP

---

# 16. TABLA EXPORTS

## Descripción

Historial de exportaciones.

### Campos

export_id UUID PK

project_id UUID FK

export_type VARCHAR(100)

file_url TEXT

file_size BIGINT

created_at TIMESTAMP

---

# 17. TABLA COPYRIGHT_REPORTS

## Descripción

Análisis de copyright.

### Campos

report_id UUID PK

project_id UUID FK

asset_type VARCHAR(100)

asset_id UUID

risk_score INTEGER

risk_level VARCHAR(50)

analysis TEXT

recommendations TEXT

created_at TIMESTAMP

---

# 18. TABLA SETTINGS

## Descripción

Configuraciones del sistema.

### Campos

setting_id UUID PK

user_id UUID FK

theme_mode VARCHAR(50)

language VARCHAR(50)

default_resolution VARCHAR(50)

ai_model VARCHAR(100)

created_at TIMESTAMP

---

# 19. TABLAS FUTURAS V2

CHARACTERS

CHARACTER_DIALOGS

CHARACTER_ANIMATIONS

EVENTS

NEWS_FEEDS

NOTIFICATIONS

---

# 20. TABLAS FUTURAS V3

CHAOS_MODES

CHAOS_ANIMATIONS

INTERACTIVE_ICONS

APP_INTERACTIONS

LAUNCHER_CONFIGS

USER_BEHAVIORS

---

# 21. ÍNDICES RECOMENDADOS

PROJECTS

* user_id
* category
* status

WALLPAPERS

* project_id
* style

ICONS

* pack_id
* app_name

TRENDS

* keyword
* score

---

# 22. SEGURIDAD

Row Level Security:

Activado.

Acceso:

Solo propietario.

---

# 23. BACKUPS

Backup automático diario.

Retención:

30 días.

---

# 24. CRITERIOS DE ACEPTACIÓN

✓ Gestión de proyectos.

✓ Wallpapers.

✓ Packs de iconos.

✓ Historial IA.

✓ Tendencias.

✓ Marketing.

✓ Exportaciones.

✓ Preparación para futuras versiones.
