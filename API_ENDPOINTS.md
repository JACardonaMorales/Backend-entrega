# 🏋️ Fitness App API Endpoints

## Base URL: `http://localhost:3001`

---

## 👤 Users

### `POST /users`
Crear un nuevo usuario (y su perfil por defecto si se proporcionan firstName/lastName)

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "user@example.com",
  "password": "password123",
  "age": 28,
  "weight": 75.5,
  "height": 175
}
```

### `GET /users`
Obtener todos los usuarios con sus perfiles

### `GET /users/:id`
Obtener un usuario específico con su perfil

### `PATCH /users/:id`
Actualizar un usuario

**Body:**
```json
{
  "name": "Juan Pérez Actualizado",
  "email": "newemail@example.com",
  "age": 29,
  "weight": 76.0,
  "height": 176,
  "isActive": true
}
```

### `DELETE /users/:id`
Eliminar un usuario

### `GET /users/:id/routines`
Obtener todas las rutinas de un usuario

---

## 👥 Profiles

### `GET /profiles/:userId`
Obtener el perfil de un usuario específico

### `PUT /profiles/:userId`
Actualizar el perfil de un usuario

**Body:**
```json
{
  "goal": "GAIN_MUSCLE",
  "activityLevel": "ACTIVE"
}
```

---

## 📅 Routines (Weekly Routines)

### `POST /routines`
Crear una nueva rutina semanal

**Body:**
```json
{
  "dayOfWeek": "MONDAY",
  "notes": "Rutina de fuerza para lunes",
  "userId": 1
}
```

### `GET /routines`
Obtener todas las rutinas (con filtros opcionales)

**Query Parameters:**
- `dayOfWeek`: Filtrar por día de la semana (1-7)
- `completed`: Filtrar por completadas (true/false)
- `userId`: Filtrar por usuario específico

**Ejemplos:**
- `GET /routines?dayOfWeek=1&completed=false`
- `GET /routines?userId=1`

### `GET /routines/:id`
Obtener una rutina específica con sus ejercicios

### `PATCH /routines/:id`
Actualizar una rutina

**Body:**
```json
{
  "dayOfWeek": "TUESDAY",
  "completed": true,
  "notes": "Rutina completada exitosamente"
}
```

### `DELETE /routines/:id`
Eliminar una rutina

### `PATCH /routines/:id/complete`
Marcar una rutina como completada

### `POST /routines/:routineId/exercises`
Agregar un ejercicio existente a una rutina

**Body:**
```json
{
  "exerciseId": 1
}
```

### `DELETE /routines/:routineId/exercises/:exerciseId`
Quitar un ejercicio de una rutina

---

## 💪 Exercises

### `POST /exercises`
Crear un nuevo ejercicio

**Body:**
```json
{
  "name": "Press de Banca",
  "reps": "4 series de 8-10 repeticiones",
  "videoUrl": "https://example.com/videos/bench-press.mp4"
}
```

### `GET /exercises`
Obtener todos los ejercicios (con filtros opcionales)

**Query Parameters:**
- `dayOfWeek`: Filtrar por día de la semana (1-7)
- `category`: Filtrar por categoría (cardio, strength, flexibility, sports)
- `difficulty`: Filtrar por dificultad (easy, medium, hard)

**Ejemplos:**
- `GET /exercises?dayOfWeek=1`
- `GET /exercises?category=strength`
- `GET /exercises?difficulty=medium`

### `GET /exercises/:id`
Obtener un ejercicio específico

### `PATCH /exercises/:id`
Actualizar un ejercicio

**Body:**
```json
{
  "name": "Press de Banca Inclinado",
  "reps": "4 series de 6-8 repeticiones",
  "videoUrl": "https://example.com/videos/incline-bench-press.mp4"
}
```

### `DELETE /exercises/:id`
Eliminar un ejercicio

---

## 🔗 Relaciones entre Entidades

- **User** ↔ **Profile** (1:1)
- **Profile** → **WeeklyRoutine** (1:N)
- **WeeklyRoutine** ↔ **Exercise** (N:M)

---

## 📝 Validaciones

Todos los endpoints utilizan `class-validator` para validar las entradas:

- **Email**: Formato de email válido
- **Password**: Mínimo 6 caracteres
- **Enum values**: Valores predefinidos para gender, fitnessLevel, goals, difficulty, category
- **Numbers**: Validación de tipos numéricos
- **Dates**: Formato ISO 8601 para fechas

---

## 🚀 Pruebas con Postman

1. **Importa la colección**: Puedes crear una colección de Postman con estos endpoints
2. **Variables de entorno**: Configura `{{baseUrl}}` como `http://localhost:3001`
3. **Headers**: Asegúrate de usar `Content-Type: application/json` para POST/PATCH/PUT

---

## 📊 Ejemplo de Flujo Completo

1. **Crear usuario**: `POST /users`
2. **Actualizar perfil**: `PUT /profiles/:userId`
3. **Crear rutina**: `POST /routines`
4. **Crear ejercicios**: `POST /exercises`
5. **Agregar ejercicios a rutina**: `POST /routines/:routineId/exercises`
6. **Marcar como completado**: `PATCH /routines/:id/complete`
