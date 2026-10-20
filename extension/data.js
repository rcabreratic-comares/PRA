const SENECA_SECTIONS = [
    {
        id: 1,
        title: "1. TIPOS DE ACTIVIDADES Y TAREAS",
        shortTitle: "1. Actividades y Tareas",
        icon: "fa-list-check",
        color: "emerald"
    },
    {
        id: 2,
        title: "2. FORMAS DE ACCESO A LA INFORMACIÓN",
        shortTitle: "2. Acceso a la Información",
        icon: "fa-universal-access",
        color: "teal"
    },
    {
        id: 3,
        title: "3. RECURSOS DIDÁCTICOS",
        shortTitle: "3. Recursos Didácticos",
        icon: "fa-book-open-reader",
        color: "cyan"
    },
    {
        id: 4,
        title: "4. AGRUPAMIENTOS, DISTRIBUCIÓN DE ESPACIOS Y TIEMPOS",
        shortTitle: "4. Agrupamientos, Espacios y Tiempos",
        icon: "fa-users-rectangle",
        color: "sky"
    },
    {
        id: 5,
        title: "5. INSTRUMENTOS DE EVALUACIÓN",
        shortTitle: "5. Instrumentos de Evaluación",
        icon: "fa-file-signature",
        color: "indigo"
    }
];

const TYPOLOGIES = [
    { id: "tdah", label: "NEAE - TDAH", icon: "fa-bolt", badgeBg: "bg-amber-100 text-amber-800" },
    { id: "dea_lectura", label: "DEA - Lectura / Dislexia", icon: "fa-book-bookmark", badgeBg: "bg-blue-100 text-blue-800" },
    { id: "dea_escritura", label: "DEA - Escritura / Disgrafía", icon: "fa-pen-nib", badgeBg: "bg-indigo-100 text-indigo-800" },
    { id: "dea_calculo", label: "DEA - Cálculo / Discalculia", icon: "fa-calculator", badgeBg: "bg-purple-100 text-purple-800" },
    { id: "nee_intelectual", label: "NEE - Discapacidad Intelectual", icon: "fa-brain", badgeBg: "bg-rose-100 text-rose-800" },
    { id: "nee_tea", label: "NEE - Trastorno Espectro Autista (TEA)", icon: "fa-puzzle-piece", badgeBg: "bg-teal-100 text-teal-800" },
    { id: "nee_sensorial", label: "NEE - Sensorial / Motor", icon: "fa-wheelchair", badgeBg: "bg-cyan-100 text-cyan-800" },
    { id: "alcain", label: "Altas Capacidades (ALCAIN)", icon: "fa-lightbulb", badgeBg: "bg-emerald-100 text-emerald-800" },
    { id: "ecophe", label: "ECOPHE / Int. Tardía", icon: "fa-globe", badgeBg: "bg-orange-100 text-orange-800" },
    { id: "pendientes", label: "Asignatura Pendiente", icon: "fa-clock-rotate-left", badgeBg: "bg-red-100 text-red-800" },
    { id: "repetidor", label: "Alumnado Repetidor", icon: "fa-arrows-rotate", badgeBg: "bg-slate-200 text-slate-800" },
    { id: "general", label: "Refuerzo Ordinario General", icon: "fa-shield-halved", badgeBg: "bg-gray-100 text-gray-800" }
];

// Catálogo completo de propuestas para Séneca clasificadas por apartado y tipología
const MEASURES_DATABASE = [
    // --- APARTADO 1: TIPOS DE ACTIVIDADES Y TAREAS ---
    { sectionId: 1, typology: "tdah", text: "Fraccionar las tareas en secuencias cortas con pasos intermedios definidos." },
    { sectionId: 1, typology: "tdah", text: "Proporcionar enunciados de tareas concisos, resaltando las palabras clave en negrita." },
    { sectionId: 1, typology: "tdah", text: "Alternar actividades que requieren alta concentración con tareas más manipulativas o dinámicas." },
    
    { sectionId: 1, typology: "dea_lectura", text: "Simplificación sintáctica de enunciados complejos y apoyos gráficos explicativos." },
    { sectionId: 1, typology: "dea_lectura", text: "Priorizar tareas de respuesta corta, selección múltiple o esquemas sobre amplios desarrollos redactados." },
    
    { sectionId: 1, typology: "dea_escritura", text: "Permitir respuestas esquemáticas o en formato digital para reducir la fatiga en la copia." },
    { sectionId: 1, typology: "dea_escritura", text: "Proporcionar plantillas con estructura de respuesta guiada o mapas conceptuales semirellenos." },

    { sectionId: 1, typology: "dea_calculo", text: "Uso de problemas contextualizados apoyados en material visual o situaciones cotidianas." },
    { sectionId: 1, typology: "dea_calculo", text: "Descomposición de procedimientos matemáticos complejos en guía paso a paso." },

    { sectionId: 1, typology: "nee_intelectual", text: "Adaptación de actividades a su nivel de competencia curricular con enfoque muy funcional." },
    { sectionId: 1, typology: "nee_intelectual", text: "Actividades con modelado previo por parte del docente e instrucciones altamente guiadas." },

    { sectionId: 1, typology: "nee_tea", text: "Estructuración clara de actividades con listas de verificación visual (inicio, proceso y fin)." },
    { sectionId: 1, typology: "nee_tea", text: "Presentación de consignas literales evitando ambigüedades, metáforas o dobles sentidos." },

    { sectionId: 1, typology: "alcain", text: "Proponer actividades de profundización, investigación abierta y retos de pensamiento crítico." },
    { sectionId: 1, typology: "alcain", text: "Diseño de proyectos de transferencia interdisciplinar y síntesis creativa." },

    { sectionId: 1, typology: "ecophe", text: "Actividades con glosarios terminológicos bilingües/de apoyo y vocabulario clave priorizado." },

    { sectionId: 1, typology: "pendientes", text: "Tareas centradas en el cuadernillo de recuperación de contenidos mínimos de cursos anteriores." },
    { sectionId: 1, typology: "pendientes", text: "Ejercicios tipo examen focalizados en los saberes básicos no alcanzados." },

    { sectionId: 1, typology: "repetidor", text: "Actividades de afianzamiento y consolidación de contenidos fundamentales del curso actual." },
    { sectionId: 1, typology: "general", text: "Variedad en la tipología de tareas (ejercicios prácticos, casos reales, indagación y síntesis)." },


    // --- APARTADO 2: FORMAS DE ACCESO A LA INFORMACIÓN ---
    { sectionId: 2, typology: "tdah", text: "Combinar la explicación verbal con apoyo visual constante en pizarra o pantalla." },
    { sectionId: 2, typology: "tdah", text: "Asegurar el contacto visual directo y realizar comprobaciones periódicas de comprensión." },

    { sectionId: 2, typology: "dea_lectura", text: "Lectura en voz alta de enunciados e instrucciones por parte del docente o un compañero." },
    { sectionId: 2, typology: "dea_lectura", text: "Uso de fuentes tipográficas claras de fácil lectura (Arial/Calibri), tamaño ampliado (12-14pt) y interlineado holgado." },

    { sectionId: 2, typology: "dea_escritura", text: "Facilitar apuntes, esquemas e infografías previamente elaborados o digitalizados." },

    { sectionId: 2, typology: "nee_sensorial", text: "Adaptación del formato del texto (macrotipos, alto contraste) o soporte auditivo/digital." },
    { sectionId: 2, typology: "nee_sensorial", text: "Uso de sistemas FM/emisora en el aula y subtitulado de material audiovisual." },

    { sectionId: 2, typology: "nee_tea", text: "Uso de apoyos visuales organizados (pictogramas, guías visuales paso a paso)." },
    { sectionId: 2, typology: "nee_tea", text: "Anticipación explícita de cambios de rutina o secuencias de trabajo de la sesión." },

    { sectionId: 2, typology: "ecophe", text: "Uso de traductores digitales, diccionarios visuales e ilustraciones explicativas de contexto." },

    { sectionId: 2, typology: "pendientes", text: "Acceso permanente a la guía de pendientes y materiales de estudio en el aula virtual / Google Classroom." },
    { sectionId: 2, typology: "general", text: "Digitalización de materiales y esquemas descargables en la plataforma educativa del centro." },


    // --- APARTADO 3: RECURSOS DIDÁCTICOS ---
    { sectionId: 3, typology: "tdah", text: "Organizadores gráficos de tareas, temporizador/cronómetro visual para autogestión del tiempo." },
    { sectionId: 3, typology: "tdah", text: "Uso de listas de chequeo (checklists) para revisión del material e itinerario de clase." },

    { sectionId: 3, typology: "dea_lectura", text: "Uso de regla o guía de lectura, marcapáginas y programas de lectura por síntesis de voz." },

    { sectionId: 3, typology: "dea_calculo", text: "Permitir el uso continuo de tabla pitagórica, tablas de fórmulas y calculadora básica." },
    { sectionId: 3, typology: "dea_calculo", text: "Materiales manipulativos (bloques multibase, rectas numéricas, plantillas de organización gráfica de operaciones)." },

    { sectionId: 3, typology: "nee_intelectual", text: "Fichas adaptadas simplificadas con apoyos icónicos y alto contenido manipulativo." },

    { sectionId: 3, typology: "alcain", text: "Plataformas de aprendizaje avanzado, lecturas complejas, laboratorios virtuales y kits de ampliación." },

    { sectionId: 3, typology: "pendientes", text: "Cuadernillo autonómico/departamental de tareas de recuperación con solucionarios guiados." },

    { sectionId: 3, typology: "repetidor", text: "Fichas de refuerzo escalonado con soluciones comentadas y mapas de conceptos clave." },
    { sectionId: 3, typology: "general", text: "Uso de recursos multimedia interactivos, esquemas conceptuales dinámicos y presentaciones visuales." },


    // --- APARTADO 4: AGRUPAMIENTOS, DISTRIBUCIÓN DE ESPACIOS Y TIEMPOS ---
    { sectionId: 4, typology: "tdah", text: "Ubicación en las primeras filas, cerca de la mesa del profesor/a y alejado de distractores (ventanas/puertas)." },
    { sectionId: 4, typology: "tdah", text: "Flexibilidad en la gestión del tiempo permitiendo descansos activos breves organizados." },

    { sectionId: 4, typology: "dea_lectura", text: "Concesión de tiempo adicional (hasta un 25-50% más) en la realización de lecturas y exámenes." },

    { sectionId: 4, typology: "dea_escritura", text: "Ubicación con un/a compañero/a tutor/a que colabore en la verificación de copia de tareas de la pizarra." },

    { sectionId: 4, typology: "nee_tea", text: "Puesto de trabajo fijo, delimitado y predecible, libre de sobreestimulación sensorial innecesaria." },

    { sectionId: 4, typology: "nee_sensorial", text: "Ubicación en primera fila orientada al docente para facilitar la lectura labiofacial/visión óptima." },

    { sectionId: 4, typology: "alcain", text: "Agrupamientos flexibles: trabajo autónomo de investigación y roles de liderazgo en proyectos cooperativos." },

    { sectionId: 4, typology: "pendientes", text: "Planificación de tutorías periódicas de seguimiento individualizado durante el curso." },

    { sectionId: 4, typology: "general", text: "Alternancia entre trabajo individual enfocado, parejas cooperativas y pequeños grupos de nivel/heterogéneos." },


    // --- APARTADO 5: INSTRUMENTOS DE EVALUACIÓN ---
    { sectionId: 5, typology: "tdah", text: "Exámenes fraccionados en dos partes o realizables en diferentes momentos si es necesario." },
    { sectionId: 5, typology: "tdah", text: "Supervisión del docente al inicio y durante el examen para asegurar que ha comprendido las preguntas." },

    { sectionId: 5, typology: "dea_lectura", text: "Lectura individualizada de los enunciados del examen por parte del docente antes de comenzar." },
    { sectionId: 5, typology: "dea_lectura", text: "Posibilidad de realizar pruebas orales o con soporte digital en sustitución de pruebas escritas." },

    { sectionId: 5, typology: "dea_escritura", text: "No penalización cuantitativa de las faltas de ortografía o grafía derivada de la dificultad específica." },
    { sectionId: 5, typology: "dea_escritura", text: "Permitir formato tipo test, preguntas de completar o de unir con flechas." },

    { sectionId: 5, typology: "dea_calculo", text: "Permitir el uso de calculadora o tablas de apoyo en exámenes donde el objetivo no sea el cálculo mecánico." },

    { sectionId: 5, typology: "nee_intelectual", text: "Pruebas de evaluación adaptadas formalmente en extensión y nivel a sus criterios de evaluación priorizados." },
    { sectionId: 5, typology: "nee_intelectual", text: "Uso prioritario de observación directa, escalas de estimación y carpetas de aprendizaje (portafolio)." },

    { sectionId: 5, typology: "nee_tea", text: "Formato de prueba claro, sin preguntas con enunciados redactados de forma ambigua." },

    { sectionId: 5, typology: "alcain", text: "Evaluación mediante rúbricas de producto final, proyectos, autoevaluación y coevaluación exigentemente guiada." },

    { sectionId: 5, typology: "pendientes", text: "Pruebas escritas/prácticas específicas trimestrales combinadas con la valoración del cuadernillo (30-40%)." },

    { sectionId: 5, typology: "repetidor", text: "Evaluación continua ponderando progresos de aprendizaje, proyectos prácticos y seguimiento diario." },
    { sectionId: 5, typology: "general", text: "Diversificación de instrumentos: rúbricas de proyectos, listas de cotejo de trabajos y exámenes objetivamente ponderados." }
];
