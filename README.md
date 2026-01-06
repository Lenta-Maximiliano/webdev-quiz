# 🧠 WebDev Quiz

**WebDev Quiz** es una aplicación web interactiva para practicar y evaluar conocimientos de desarrollo web (HTML, CSS, JavaScript y React), con sistema de autenticación, persistencia de puntajes y lógica de sesiones de quiz.

El proyecto está construido con **React**, **Firebase** y **Tailwind CSS**, aplicando buenas prácticas modernas de arquitectura, hooks personalizados y manejo de estado.

---

## Tabla de Contenidos
- [Enlaces](#enlaces)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Características](#características)
- [Aprendizajes](#aprendizajes)
- [Autor](#autor)
- [Futuras Mejoras](#futuras-mejoras)
- [¿Cómo Ejecutar Localmente?](#cómo-ejecutar-localmente)

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

- Quiz interactivo con preguntas **MCQ** y **True / False**
- Selección aleatoria de preguntas por sesión
- Filtro por categorías (HTML/CSS, JavaScript, React, Todas)
- Autenticación de usuarios con Firebase (login, registro, logout)
- Persistencia de puntajes en **Firestore**
- Guardado offline de partidas si el usuario no está logueado
- Sin duplicación de partidas (guardado idempotente)
- Registro de mejor puntaje por usuario
- Diseño responsive con Tailwind CSS
- Soporte para modo oscuro

---

## Aprendizajes

En este proyecto reforcé los siguientes conceptos:

- **Integración con Firebase**: implementación de autenticación, persistencia de datos (Firestore) y reglas de seguridad; comprensión del flujo frontend ↔ backend.
- **Componentización en React**: creación de componentes reutilizables como `NavBar`, `Footer`, `QuizApp`, `QuizCard`, `Question`, `CategorySelector`, `QuizResultCard`, manteniendo separación de responsabilidades y escalabilidad.
- **Estilos con Tailwind CSS**: uso de utilidades y variables CSS para una paleta consistente y un diseño responsivo en mobile, tablet y desktop.
- **Buenas prácticas con Git**: trabajo con ramas (`dev`, `main`) y commits descriptivos para un historial claro y colaborativo.
- **Manejo de errores y depuración**: control de estados inválidos, manejo de promesas, validaciones y feedback al usuario.
- **Hooks personalizados**: diseño y uso de hooks como `useQuizSession` y `useScorePersistence` para encapsular lógica compleja y reutilizable.
- **Control del flujo de la aplicación**: manejo de estados derivados (`finished`, `answered`, `saving`) y efectos sincronizados con `useEffect`.
- **Persistencia condicional**: estrategia para guardar datos localmente y sincronizarlos con Firestore tras la autenticación.


## 📂 Estructura del proyecto

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
│   │   ├── utils/
│   │   │   └── buildSessionQuestions.js
│   │   │
│   │   ├── QuizCard.jsx
│   │   ├── Question.jsx
│   │   ├── QuizResultCard.jsx
│   │   ├── CategorySelector.jsx
│   │   └── QuizApp.jsx
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
 
- Que el usuario tenga la posibilidad de elegir el número de preguntas que va a tener la partida.
- Que al clickear fuera del menú hamburguesa al estar abierto, éste se cierre.
- Que si el usuario juega una partida con un número de preguntas igual o mayor a 5 y responde todas de forma correcta, aparezca un evento con "fuegos artificiales" en la pantalla.
- Que el usuario tenga la posibilidad de elegir jugar con un timer de 15 segundos por pregunta, con un contador visual, en caso de terminar el tiempo, se marque en verde la respuesta que hubiera sido correcta, con la explicacion, pero que el score no sume puntos
- Migrar el banco de preguntas desde `questions.json` a Firestore o una API externa.

## Autor
- **Perfil en GitHub**: [Lenta-Maximiliano](https://github.com/Lenta-Maximiliano)
- **LinkedIn**: [Lenta, Maximiliano Carlos](https://www.linkedin.com/in/maximiliano-l-72a9b539a/)

## Cómo Ejecutar Localmente

1. **Clona este repositorio:**
   ```bash
   git clone https://github.com/Lenta-Maximiliano/webdev-quiz.git

2. **Navega a la carpeta del proyecto:**
    ```bash
    cd webdev-quiz

3. **Instala las dependencias:**
    ```bash
    npm install

4. **Configura las variables de entorno**
    Crea un archivo .env en la raíz del proyecto con tus credenciales de Firebase:
    
    VITE_FIREBASE_API_KEY=tu_api_key
    VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
    VITE_FIREBASE_PROJECT_ID=tu_project_id
    VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
    VITE_FIREBASE_APP_ID=tu_app_id

5. **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
---

Este proyecto forma parte de mi proceso de aprendizaje y crecimiento como desarrollador frontend, aplicando buenas prácticas y patrones utilizados en entornos reales.
