/**
 * Página de Política de Privacidad de la aplicación.
 *
 * Propósito:
 * - Informar a los usuarios sobre qué datos se recopilan.
 * - Explicar cómo se utilizan dentro de la aplicación.
 * - Indicar el uso de servicios de terceros (Firebase Authentication).
 *
 * Esta página se accede desde el footer mediante la ruta "/privacy"
 * y forma parte de las páginas informativas del sitio.
 */
export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 dark:text-white">
      <h1 className="text-2xl font-semibold mb-6">Política de Privacidad</h1>

      <p className="mb-4">
        WebDev Quiz respeta tu privacidad. Esta página explica qué información
        recopilamos y cómo se utiliza dentro de la aplicación.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        Información que recopilamos
      </h2>
      <p>
        Cuando creas una cuenta, podemos almacenar tu dirección de email y,
        opcionalmente, tu nombre.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        Uso de la información
      </h2>
      <p>
        La información se utiliza únicamente para autenticar usuarios y
        permitir el acceso a las funcionalidades de la aplicación.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        Servicios de terceros
      </h2>
      <p>
        La autenticación es gestionada mediante Firebase Authentication, un
        servicio proporcionado por Google.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">
        Contacto
      </h2>
      <p>
        Si tienes preguntas sobre esta política de privacidad, puedes
        contactarme a través de mi repositorio de GitHub.
      </p>
    </div>
  );
}