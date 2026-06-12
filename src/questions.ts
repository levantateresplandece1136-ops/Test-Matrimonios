import { Question } from "./types";

export const QUESTIONS: Question[] = [
  // ==================== PARTE 1: MI LUCHA PERSONAL ====================
  // Emociones dominantes (8 ítems)
  {
    id: 1,
    text: "Siento ansiedad, temor o preocupación constante por nuestro futuro o estabilidad.",
    part: 1,
    subGroup: "Emociones dominantes"
  },
  {
    id: 2,
    text: "Siento ira, enojo persistente o resentimiento callado hacia mi cónyuge.",
    part: 1,
    subGroup: "Emociones dominantes"
  },
  {
    id: 3,
    text: "Siento desesperanza o cansancio emocional, sintiendo que nuestra situación nunca cambiará.",
    part: 1,
    subGroup: "Emociones dominantes"
  },
  {
    id: 4,
    text: "Me culpo con severidad por mis errores relacionales del pasado.",
    part: 1,
    subGroup: "Emociones dominantes"
  },
  {
    id: 5,
    text: "Experimento inseguridad personal profunda o celos recurrentes en mi relación.",
    part: 1,
    subGroup: "Emociones dominantes"
  },
  {
    id: 6,
    text: "Me frustro con rapidez cuando mi cónyuge no reacciona como yo espero.",
    part: 1,
    subGroup: "Emociones dominantes"
  },
  {
    id: 7,
    text: "Siento un agudo sentimiento de rechazo, sintiendo que no soy verdaderamente valorado o amado.",
    part: 1,
    subGroup: "Emociones dominantes"
  },
  {
    id: 8,
    text: "Siento la necesidad de complacer a mi cónyuge por temor a desatar su desagrado.",
    part: 1,
    subGroup: "Emociones dominantes"
  },

  // Patrones de respuesta (8 ítems)
  {
    id: 9,
    text: "Intento controlar los ritmos diarios, el dinero, la agenda o las opiniones de mi cónyuge.",
    part: 1,
    subGroup: "Patrones de respuesta"
  },
  {
    id: 10,
    text: "Me retiro emocionalmente o construyo barreras de hielo en vez de verbalizar mi dolor.",
    part: 1,
    subGroup: "Patrones de respuesta"
  },
  {
    id: 11,
    text: "Prefiero aislarme físicamente del espacio común cuando asoma una discusión.",
    part: 1,
    subGroup: "Patrones de respuesta"
  },
  {
    id: 12,
    text: "Respondo con críticas descalificadoras o comentarios sutilmente sarcásticos.",
    part: 1,
    subGroup: "Patrones de respuesta"
  },
  {
    id: 13,
    text: "Busco anestesiar la tensión refugiándome excesivamente en el trabajo, pantallas u otros hábitos.",
    part: 1,
    subGroup: "Patrones de respuesta"
  },
  {
    id: 14,
    text: "Justifico mi conducta inadecuada en las ofensas de mi cónyuge o en la pesadez del día.",
    part: 1,
    subGroup: "Patrones de respuesta"
  },
  {
    id: 15,
    text: "Evito abordar temas difíciles o dolorosos por miedo a que el conflicto se salga de cauce.",
    part: 1,
    subGroup: "Patrones de respuesta"
  },
  {
    id: 16,
    text: "Busco alivios rápidos fuera del matrimonio (gastos compulsivos, adicciones silenciosas o distracciones).",
    part: 1,
    subGroup: "Patrones de respuesta"
  },

  // Lo que más me preocupa (8 ítems)
  {
    id: 17,
    text: "Que la fragilidad económica o imprevistos financieros arrastren nuestro hogar.",
    part: 1,
    subGroup: "Lo que más me preocupa"
  },
  {
    id: 18,
    text: "Que el amor muera definitivamente y terminemos viviendo con un extraño para siempre.",
    part: 1,
    subGroup: "Lo que más me preocupa"
  },
  {
    id: 19,
    text: "Que la fricción afecte la estabilidad emocional o el crecimiento sano de nuestros hijos.",
    part: 1,
    subGroup: "Lo que más me preocupa"
  },
  {
    id: 20,
    text: "El qué dirán o que la imagen espiritual e íntegra de nuestra familia colapse ante la vista ajena.",
    part: 1,
    subGroup: "Lo que más me preocupa"
  },
  {
    id: 21,
    text: "Ver vulnerada mi libertad, perder mi autonomía e individualidad o sentirme atrapado/a.",
    part: 1,
    subGroup: "Lo que más me preocupa"
  },
  {
    id: 22,
    text: "Que mi cónyuge me traicione, me sea infiel o mantenga una vida oculta profunda.",
    part: 1,
    subGroup: "Lo que más me preocupa"
  },
  {
    id: 23,
    text: "Que el estrés de la fricción relacional acabe enfermando a mi cuerpo o mi mente.",
    part: 1,
    subGroup: "Lo que más me preocupa"
  },
  {
    id: 24,
    text: "Llegar a la vejez con la amarga convicción de que desperdicié mi vida matrimonial.",
    part: 1,
    subGroup: "Lo que más me preocupa"
  },

  // ==================== PARTE 2: DE LO QUE MÁS ME QUEJO ====================
  // (11 ítems con escala 0-4)
  {
    id: 25,
    text: "Siento que mi cónyuge no me escucha de manera activa ni le interesa comprender mi sentir.",
    part: 2
  },
  {
    id: 26,
    text: "Percibo a mi cónyuge demasiado impaciente, severo/a o abiertamente crítico conmigo.",
    part: 2
  },
  {
    id: 27,
    text: "Las opiniones o decisiones trascendentes del hogar son tomadas sin consultarme de verdad.",
    part: 2
  },
  {
    id: 28,
    text: "Hay una carencia abismal de afecto físico espontáneo, palabras de afirmación o mimos.",
    part: 2
  },
  {
    id: 29,
    text: "La distribución de tareas domésticas y responsabilidades cotidianas recae desequilibradamente en mí.",
    part: 2
  },
  {
    id: 30,
    text: "Mi cónyuge está continuamente distraído/a (con el móvil, videojuegos, pasatiempos o exceso laboral).",
    part: 2
  },
  {
    id: 31,
    text: "Encuentro imposible conciliar acuerdos financieros o de cómo manejar la economía común.",
    part: 2
  },
  {
    id: 32,
    text: "Las actitudes o el lenguaje corporal de mi pareja me transmiten desprecio o incompetencia.",
    part: 2
  },
  {
    id: 33,
    text: "La familia de origen de mi cónyuge interfiere dañinamente en la privacidad de nuestra pareja.",
    part: 2
  },
  {
    id: 34,
    text: "La vida íntima y de sexualidad compartida se siente estancada, frustrante o ausente.",
    part: 2
  },
  {
    id: 35,
    text: "Mi cónyuge demuestra resistencia evidente a crecer en el ámbito espiritual o a buscar consejería seria.",
    part: 2
  },

  // ==================== PARTE 3: MI MATRIMONIO ====================
  // Nuestra relación (7 ítems)
  {
    id: 36,
    text: "Nos resulta sumamente difícil sentarnos a conversar profundamente sin que se vuelva logístico o termine en debate.",
    part: 3,
    subGroup: "Nuestra relación"
  },
  {
    id: 37,
    text: "Sentimos que operamos como compañeros de piso antes que como un solo equipo integrado bajo un propósito divino.",
    part: 3,
    subGroup: "Nuestra relación"
  },
  {
    id: 38,
    text: "La sospecha, la desconfianza o la incredulidad han ganado terreno sobre la fe mutua.",
    part: 3,
    subGroup: "Nuestra relación"
  },
  {
    id: 39,
    text: "El resentimiento acumulado por heridas del pasado oscurece e intoxica cualquier gesto del presente.",
    part: 3,
    subGroup: "Nuestra relación"
  },
  {
    id: 40,
    text: "Siento que ocultamos porciones de nuestra intimidad por miedo a ser malinterpretados o heridos.",
    part: 3,
    subGroup: "Nuestra relación"
  },
  {
    id: 41,
    text: "Nos cuesta alegrarnos u honrar genuinamente los pequeños triunfos o cualidades del otro.",
    part: 3,
    subGroup: "Nuestra relación"
  },
  {
    id: 42,
    text: "La rutina monótona y el deber han erosionado la risa compartida, la diversión y el juego.",
    part: 3,
    subGroup: "Nuestra relación"
  },

  // Durante los conflictos (7 ítems)
  {
    id: 43,
    text: "Cuando discutimos, insisto en persistir hasta que mi pareja ceda y admita mi razón.",
    part: 3,
    subGroup: "Durante los conflictos"
  },
  {
    id: 44,
    text: "Alzo el volumen de mi voz, uso gestos demandantes o empleo tonos secos y duros.",
    part: 3,
    subGroup: "Durante los conflictos"
  },
  {
    id: 45,
    text: "Recurro a la ironía hiriente o utilizo generalizaciones amargas como 'siempre' o 'nunca'.",
    part: 3,
    subGroup: "Durante los conflictos"
  },
  {
    id: 46,
    text: "Resucito ofensas pasadas que supuestamente ya habían sido dadas por perdonadas y saldadas.",
    part: 3,
    subGroup: "Durante los conflictos"
  },
  {
    id: 47,
    text: "Me planto en un silencio punitivo o me encierro con un mutismo que incomunica la casa.",
    part: 3,
    subGroup: "Durante los conflictos"
  },
  {
    id: 48,
    text: "Interrumpo ansiosamente las frases de mi pareja impidiendo que termine de expresar su postura.",
    part: 3,
    subGroup: "Durante los conflictos"
  },
  {
    id: 49,
    text: "Lanzo ultimátums sobre separarnos o rendirnos con tal de frenar la conversación o forzar obediencia.",
    part: 3,
    subGroup: "Durante los conflictos"
  },

  // Intimidad y cercanía (8 ítems)
  {
    id: 50,
    text: "Retraigo mi vulnerabilidad emocional para mantener una distancia protectora de seguridad.",
    part: 3,
    subGroup: "Intimidad y cercanía"
  },
  {
    id: 51,
    text: "Los encuentros conyugales carecen de ternura, pareciendo una obligación fría antes que amor.",
    part: 3,
    subGroup: "Intimidad y cercanía"
  },
  {
    id: 52,
    text: "Me doy cuenta de que desconozco los temores, anhelos o el mapa mental contemporáneo de mi cónyuge.",
    part: 3,
    subGroup: "Intimidad y cercanía"
  },
  {
    id: 53,
    text: "La palabra 'perdóname, estuve mal' nos resulta titánica e inusual de pronunciar sin peros.",
    part: 3,
    subGroup: "Intimidad y cercanía"
  },
  {
    id: 54,
    text: "Me pongo inmediatamente en guardia o respondo a la defensiva cuando mi cónyuge trae un dolor.",
    part: 3,
    subGroup: "Intimidad y cercanía"
  },
  {
    id: 55,
    text: "Delegamos el tiempo para estar solos al final de la cola de prioridades cotidianas.",
    part: 3,
    subGroup: "Intimidad y cercanía"
  },
  {
    id: 56,
    text: "El temor a la crítica u ofensas previas marchita mi disposición a iniciar abrazos o cercanía.",
    part: 3,
    subGroup: "Intimidad y cercanía"
  },
  {
    id: 57,
    text: "Asumo que el matrimonio fluirá solo, olvidando la necesidad de abonarlo con intencionalidad.",
    part: 3,
    subGroup: "Intimidad y cercanía"
  },

  // ==================== PARTE 4: RADIOGRAFÍA DEL CORAZÓN ====================
  // En el fondo necesito... (8 ítems)
  {
    id: 58,
    text: "Tener la infalible razón moral en las discusiones y que el otro baje los brazos abrumado.",
    part: 4,
    subGroup: "En el fondo necesito..."
  },
  {
    id: 59,
    text: "Que mi conveniencia, mis esfuerzos y mis demandas de confort estén en primer término.",
    part: 4,
    subGroup: "En el fondo necesito..."
  },
  {
    id: 60,
    text: "La reafirmación, alabanza y admiración incondicional de mi pareja para validar mi autoimagen.",
    part: 4,
    subGroup: "En el fondo necesito..."
  },
  {
    id: 61,
    text: "Evadir a cualquier costo el sufrimiento, el autosacrificio o la fatiga de amar a un pecador.",
    part: 4,
    subGroup: "En el fondo necesito..."
  },
  {
    id: 62,
    text: "Tener el timón absoluto y la gobernanza sobre el porvenir, las cuentas, la casa y los planes.",
    part: 4,
    subGroup: "En el fondo necesito..."
  },
  {
    id: 63,
    text: "Disfrutar de una paz ficticia (evitar tensiones cediendo en todo o ignorando problemas graves).",
    part: 4,
    subGroup: "En el fondo necesito..."
  },
  {
    id: 64,
    text: "Sentir que soy espiritualmente y moralmente más maduro/a o digno/a que mi cónyuge.",
    part: 4,
    subGroup: "En el fondo necesito..."
  },
  {
    id: 65,
    text: "Obtener de mi cónyuge la seguridad, plenitud e identidad absoluta que solo Dios puede proveer.",
    part: 4,
    subGroup: "En el fondo necesito..."
  },

  // Cuando no obtengo eso... (8 ítems)
  {
    id: 66,
    text: "Siento que me enciendo en una ira justiciera que dreno con desplantes, distancia o asfixia.",
    part: 4,
    subGroup: "Cuando no obtengo eso..."
  },
  {
    id: 67,
    text: "Me invaden oleadas de ansiedad, aprensión extrema y la necesidad urgente de solucionar todo yo.",
    part: 4,
    subGroup: "Cuando no obtengo eso..."
  },
  {
    id: 68,
    text: "Me rindo interiormente con desgano, asumiendo una postura de víctima resignada e impotente.",
    part: 4,
    subGroup: "Cuando no obtengo eso..."
  },
  {
    id: 69,
    text: "Sanciono silenciosamente a mi pareja con el aislamiento, negándole cordialidad, afecto o intimidad.",
    part: 4,
    subGroup: "Cuando no obtengo eso..."
  },
  {
    id: 70,
    text: "Decido replegarme egoístamente a complacer de forma solitaria mis propios placeres e intereses.",
    part: 4,
    subGroup: "Cuando no obtengo eso..."
  },
  {
    id: 71,
    text: "Me carcome la envidia o la autocompasión rumiante mirando matrimonios felices de terceros.",
    part: 4,
    subGroup: "Cuando no obtengo eso..."
  },
  {
    id: 72,
    text: "Intensifico mis exigencias emocionales y reclamos mediante chantajes, sollozos o arrebatos verbales.",
    part: 4,
    subGroup: "Cuando no obtengo eso..."
  },
  {
    id: 73,
    text: "Me hundo en un sentimiento lacerante de inutilidad, sintiendo que no valgo ni aporto nada a nadie.",
    part: 4,
    subGroup: "Cuando no obtengo eso..."
  },

  // ==================== PARTE 5: MI RELACIÓN CON DIOS ====================
  // (9 ítems)
  {
    id: 74,
    text: "Busco al Señor de forma sincera, diaria y madura en mi vida personal, más allá de la costumbre dominical.",
    part: 5
  },
  {
    id: 75,
    text: "Gozo de sincera libertad para arrodillarme frente a Dios, admitiendo con quebrantamiento mis propios pecados.",
    part: 5
  },
  {
    id: 76,
    text: "Experimento el refugio consolador y la soberanía del Señor cuando el conflicto relacional arrecia.",
    part: 5
  },
  {
    id: 77,
    text: "En mis oraciones, suplico ardientemente que Dios actúe en mí antes que rogar por correcciones ajenas.",
    part: 5
  },
  {
    id: 78,
    text: "Las Escrituras son para mí agua viva y dirección oportuna en vez de un libro de principios distantes.",
    part: 5
  },
  {
    id: 79,
    text: "Tengo transparencia para compartir mis flaquezas en el discipulado o comunidad, sin camuflar la crisis.",
    part: 5
  },
  {
    id: 80,
    text: "Descanso plenamente en que la gracia expiatoria de Cristo cubre mis culpas y renueva mi fidelidad relacional.",
    part: 5
  },
  {
    id: 81,
    text: "La gratitud por mi perdón divino me urge a extender compasión para condonar las deudas de mi pareja.",
    part: 5
  },
  {
    id: 82,
    text: "Me cuesta hondamente creer que Dios sea bueno, tierno o justo cuando las tempestades matrimoniales arrecian.",
    part: 5
  }
];
