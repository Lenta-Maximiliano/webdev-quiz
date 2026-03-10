# 🧠 WebDev Quiz

**WebDev Quiz** es una aplicación web interactiva pensada para practicar y evaluar conocimientos de desarrollo web (HTML, CSS, JavaScript y React). Incluye sistema de autenticación, persistencia de puntajes y manejo completo del ciclo de una sesión de quiz.

El proyecto está construido con **React**, **Firebase** y **Tailwind CSS**, aplicando buenas prácticas modernas de arquitectura, hooks personalizados y manejo de estado.

---

## Tabla de Contenidos
- [Enlaces](#enlaces)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Características](#características)
- [Aprendizajes](#aprendizajes)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Futuras Mejoras](#futuras-mejoras)
- [¿Cómo Ejecutar Localmente?](#cómo-ejecutar-localmente)
- [Autor](#autor)

---

## Enlaces

- **URL del Sitio en Vivo**: [Ver sitio aquí](https://webdevquiz-app.netlify.app/)

## Tecnologías Utilizadas

### Frontend
- React
- React Router
- Tailwind CSS
- Vite

### Backend / Servicios
- Firebase (Authentication, Firestore)

### Fuente de Datos
- Archivo local `questions.json` (banco de preguntas del quiz)

### Utilidades
- NanoID
- LocalStorage

---

## Características

- Quiz interactivo con preguntas **Multiple Choice** y **True / False**
- Selección aleatoria de preguntas por sesión
- Filtro por categorías:
    - HTML / CSS 
    - JavaScript
    - React
    - Todas
- Autenticación de usuarios con Firebase (login, registro, logout)
- Persistencia de puntajes en **Firestore**
- Guardado offline de partidas cuando el usuario no está logueado
- Sin duplicación de partidas (guardado idempotente)
- Registro de mejor puntaje por usuario
- Diseño responsive (mobile, tablet, desktop)
- Soporte para modo oscuro
- Manejo completo del ciclo de una sesión de quiz (inicio, progreso, finalización y persistencia de datos)

---

## Aprendizajes

Durante el desarrollo de este proyecto reforcé y apliqué los siguientes conceptos:

- **Integración con Firebase**: autenticación de usuarios, persistencia de datos en Firestore y reglas de seguridad. Comprensión del flujo frontend ↔ backend.
- **Componentización en React**: creación de componentes reutilizables como `NavBar`, `Footer`, `QuizApp`, `QuizCard`, `Question`, `CategorySelector`, `QuizResultCard`, manteniendo una clara separación de responsabilidades.
- **Hooks personalizados**: diseño e implementación de hooks como `useQuizSession` y `useScorePersistence` para encapsular lógica compleja y reutilizable.
- **Manejo de estado y flujo de la aplicación**: control de estados derivados (`answered`, `finished`, `saving`) y sincronización mediante `useEffect`.
- **Persistencia condicional**: estrategia para guardar datos en LocalStorage y sincronizarlos con Firestore tras la autenticación del usuario.
- **Estilos con Tailwind CSS**: uso de utilidades, variables y diseño responsive con una paleta visual consistente.
- **Buenas prácticas con Git**: trabajo con ramas (dev y main) y commits descriptivos para mantener un historial claro y profesional.
- **Manejo de errores y depuración**: validaciones, control de promesas, estados inválidos y feedback visual al usuario.


## Estructura del proyecto

```bash
src/
├── components/
│   ├── layout/
│   │   ├── NavBar.jsx
│   │   └── Footer.jsx
│
│   ├── quiz/
│   │   ├── hooks/
│   │   │   ├── useQuizSession.js
│   │   │   └── useScorePersistence.js
│   │   │
│   │   ├── selectors/
│   │   │   ├── CategorySelector.jsx
│   │   │   └── QuestionsAmountSelect.jsx
│   │   │   └── TimerSelector.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── buildSessionQuestions.js
│   │   │
│   │   ├── Question.jsx
│   │   ├── QuestionTimer.jsx
│   │   ├── QuizApp.jsx
│   │   ├── QuizCard.jsx
│   │   └── QuizResultCard.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── data/
│   └── questions.json
│
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── Profile.jsx
│   └── Home.jsx
│
├── services/
│   └── firestoreService.js
│
└── App.jsx
└── main.jsx

```

## Futuras mejoras

- Migrar el banco de preguntas desde `questions.json` a Firestore o una API externa.
- Implementar ranking global de usuarios.

## Cómo Ejecutar Localmente

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Lenta-Maximiliano/webdev-quiz.git

2. **Ingresar al directorio del proyecto:**
    ```bash
    cd webdev-quiz

3. **Instalar dependencias:**
    ```bash
    npm install

4. **Configurar variables de entorno**
    Crea un archivo .env en la raíz del proyecto con tus credenciales de Firebase:
    
    VITE_FIREBASE_API_KEY=tu_api_key
    VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
    VITE_FIREBASE_PROJECT_ID=tu_project_id
    VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
    VITE_FIREBASE_APP_ID=tu_app_id

5. **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
---

## Autor
- **GitHub**: [Lenta-Maximiliano](https://github.com/Lenta-Maximiliano)
- **LinkedIn**: [Lenta, Maximiliano Carlos](https://www.linkedin.com/in/maximiliano-l-72a9b539a/)

Este proyecto forma parte de mi proceso de aprendizaje y crecimiento como desarrollador frontend, aplicando patrones y buenas prácticas utilizadas en entornos profesionales.
