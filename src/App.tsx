import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Download, 
  RefreshCw, 
  Sparkles, 
  Heart, 
  Compass, 
  Calendar,
  AlertCircle,
  HelpCircle,
  Clock
} from "lucide-react";
import { QUESTIONS } from "./questions";
import { DiagnosticState, StruggleProfile } from "./types";

// Total questions
const TOTAL_QUESTIONS = QUESTIONS.length;

// Text interpretation details per struggle
const STRUGGLE_INTERPRETATIONS: Record<string, { desc: string; reflex: string }> = {
  "Ansiedad/Miedo": {
    desc: "El miedo opera en silencio y dirige muchas de tus reacciones. Tu corazón busca seguridad en lugares que no pueden garantizarla.",
    reflex: "¿En qué estás confiando más que en Dios cuando tienes miedo?"
  },
  "Control": {
    desc: "Necesitas que las cosas salgan como planeas. Cuando no lo hacen, el caos interno es intenso.",
    reflex: "¿Qué te costaría soltar el control y confiar en que Dios dirige?"
  },
  "Necesidad de aprobación": {
    desc: "La mirada de otros pesa mucho en tus decisiones. La aceptación humana funciona como oxígeno para ti.",
    reflex: "¿Cuya aprobación buscas más: la de Dios o la de las personas?"
  },
  "Crítica/Enojo": {
    desc: "Tienes expectativas claras de cómo deberían ser las cosas y las personas. Cuando no se cumplen, aparece la rabia o la corrección.",
    reflex: "¿Qué deseo no cumplido se esconde detrás de tu enojo?"
  },
  "Evasión/Aislamiento": {
    desc: "Prefieres la distancia al dolor del conflicto. Protegerte emocionalmente se siente más seguro que abrirte.",
    reflex: "¿De qué o de quién te estás escondiendo en realidad?"
  },
  "Queja dominante": {
    desc: "Tu bienestar está muy atado a lo que tu cónyuge haga o deje de hacer. Eso le otorga a él o ella demasiado poder sobre tu felicidad.",
    reflex: "¿Qué cambiaría en ti si tu cónyuge nunca cambia?"
  },
  "Conexión espiritual baja": {
    desc: "Dios está presente como doctrina o rutina, pero quizás no como refugio real y tierno en tu día a día.",
    reflex: "¿Qué te impide acercarte a Dios con lo que realmente sientes?"
  }
};

// SVG Icons for the 5 Parts
const PART_ICONS = [
  // Parte 1: Silueta humana con tormenta dentro
  <svg key="p1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <path d="M12 2a4 4 0 0 0-4 4v2c0 .6-.2 1.2-.6 1.6L5.3 11a2 2 0 0 0-.3 2.1c.3.7 1 1.2 1.8 1.2h2.2v4.5c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5V14.3h2.2c.8 0 1.5-.5 1.8-1.2.3-.7.2-1.5-.3-2.1L16.6 9.6c-.4-.4-.6-1-.6-1.6V6a4 4 0 0 0-4-4z" />
    <path d="M11 7l-2 3.5h3.5L11.5 14" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Parte 2: Bocadillo de conversación con espinas
  <svg key="p2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M9 11l2-2.5M15 11l-2-2.5M10 14.5l1.5-1M12.5 14l1.5 1" stroke="var(--color-alert)" strokeLinecap="round" />
  </svg>,
  // Parte 3: Dos manos casi tocándose
  <svg key="p3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M2 13c2.5-1 4.5-2.5 6-1.5s1 2.5-.5 3.5-4 .5-5.5-1M2 13c.8 1.5 2-.8 2.8-1.5" />
    <path d="M22 11c-2.5 1-4.5 2.5-6 1.5s-1-2.5.5-3.5 4-.5 5.5 1M22 11c-.8-1.5-2 .8-2.8 1.5" />
    <circle cx="12" cy="12" r="1.5" fill="var(--color-primary)" />
  </svg>,
  // Parte 4: Corazón con líneas de ECG
  <svg key="p4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" />
    <path d="M6 12h2.5l1.2-2.5 1.5 5 1.5-3.5 1 1H18" stroke="var(--color-alert)" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // Parte 5: Lámpara/Llama de fuego espiritual
  <svg key="p5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
    <path d="M8 17a4 4 0 0 0 8 0c0-3-4-8-4-8s-4 5-4 8z" stroke="var(--color-primary)" />
    <path d="M12 11c-.5.8-1 1.5-1 2.5 0 .55.45 1 1 1s1-.45 1-1" stroke="var(--color-alert)" />
    <path d="M6 17v1M18 17v1M12 5V4" stroke="currentColor" strokeLinecap="round" />
  </svg>
];

const WRITING_QUESTIONS = [
  "¿Qué es lo que más deseas que cambie en tu cónyuge?",
  "¿Qué crees que tu cónyuge diría que necesita que cambie en ti?",
  "¿Qué es lo peor que podría pasar en tu matrimonio?",
  "Si Dios decidiera no cambiar a tu cónyuge, ¿qué tendría que cambiar en ti para seguir obedeciéndolo con gozo?",
  "¿Qué esperas obtener de este proceso de consejería?"
];

export default function App() {
  const [state, setState] = useState<DiagnosticState>({
    name: "",
    answers: {},
    complaintInput: "",
    complaintTextarea: "",
    writeAnswers: ["", "", "", "", ""],
    currentScreen: 0,
    currentWriteQuestionIndex: 0,
    collapsedGroups: {}
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrolledToTopTrigger, setScrolledToTopTrigger] = useState(0);

  // Scroll to top on screen/sub-question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.currentScreen, state.currentWriteQuestionIndex, scrolledToTopTrigger]);

  // Toast auto-hide
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleStart = () => {
    setState(prev => ({
      ...prev,
      currentScreen: 1
    }));
  };

  const selectAnswer = (questionId: number, value: number) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value
      }
    }));
  };

  const toggleGroupCollapse = (groupKey: string) => {
    setState(prev => ({
      ...prev,
      collapsedGroups: {
        ...prev.collapsedGroups,
        [groupKey]: !prev.collapsedGroups[groupKey]
      }
    }));
  };

  // Check 80% completion before moving forward
  const getProgressInfo = (part: number) => {
    const partQuestions = QUESTIONS.filter(q => q.part === part);
    const totalInPart = partQuestions.length;
    const answeredInPart = partQuestions.filter(q => state.answers[q.id] !== undefined).length;
    const percent = totalInPart > 0 ? (answeredInPart / totalInPart) * 100 : 0;
    const requiredAnswers = Math.ceil(totalInPart * 0.82); // 80% - 82% threshold
    const isCompleted = answeredInPart >= requiredAnswers;
    return { answeredInPart, totalInPart, isCompleted, requiredAnswers, percent };
  };

  const handleNextPart = () => {
    const part = state.currentScreen;
    // Special validation for part 2: also check the "Si tan solo" text field (not blocking but nice to alert or validate)
    const { isCompleted, answeredInPart, requiredAnswers } = getProgressInfo(part);

    if (!isCompleted) {
      showToast(`Por favor responde al menos la mayoría de las preguntas (${answeredInPart}/${requiredAnswers} completadas) para continuar.`);
      return;
    }

    if (part === 2 && !state.complaintInput.trim()) {
      showToast("Tómate un instante para completar la frase de arriba antes de continuar.");
      return;
    }

    setState(prev => ({
      ...prev,
      currentScreen: prev.currentScreen + 1
    }));
  };

  const handlePrevPart = () => {
    setState(prev => ({
      ...prev,
      currentScreen: prev.currentScreen - 1
    }));
  };

  const handleWriteAnswersChange = (value: string) => {
    const updated = [...state.writeAnswers];
    updated[state.currentWriteQuestionIndex] = value;
    setState(prev => ({
      ...prev,
      writeAnswers: updated
    }));
  };

  const handleNextWriteQuestion = () => {
    if (!state.writeAnswers[state.currentWriteQuestionIndex].trim()) {
      showToast("Escribe una respuesta sincera para poder reflexionar y avanzar.");
      return;
    }

    if (state.currentWriteQuestionIndex < WRITING_QUESTIONS.length - 1) {
      setState(prev => ({
        ...prev,
        currentWriteQuestionIndex: prev.currentWriteQuestionIndex + 1
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentScreen: 7 // Go to results
      }));
    }
  };

  const handlePrevWriteQuestion = () => {
    if (state.currentWriteQuestionIndex > 0) {
      setState(prev => ({
        ...prev,
        currentWriteQuestionIndex: prev.currentWriteQuestionIndex - 1
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentScreen: 5 // Go back to Part 5
      }));
    }
  };

  const handleReset = () => {
    if (window.confirm("¿Seguro que deseas reiniciar el diagnóstico? Se borrarán todas las respuestas actuales.")) {
      setState({
        name: "",
        answers: {},
        complaintInput: "",
        complaintTextarea: "",
        writeAnswers: ["", "", "", "", ""],
        currentScreen: 0,
        currentWriteQuestionIndex: 0,
        collapsedGroups: {}
      });
    }
  };

  // --- RESULT MATHEMATIC CALCULATIONS ---
  const calculateResultScores = () => {
    // 1. Ansiedad/Miedo
    const anxietyIds = [1, 5, 17, 18, 19, 20, 21, 22, 23, 24];
    const anxietyScoresArr = anxietyIds.map(id => state.answers[id] ?? 0);
    const anxietyAvg = anxietyScoresArr.reduce((a, b) => a + b, 0) / anxietyScoresArr.length;

    // 2. Control
    const controlIds = [9, 43, 46];
    const controlScoresArr = controlIds.map(id => state.answers[id] ?? 0);
    const controlAvg = controlScoresArr.reduce((a, b) => a + b, 0) / controlScoresArr.length;

    // 3. Necesidad de aprobación
    const approvalIds = [7, 8, 47];
    const approvalScoresArr = approvalIds.map(id => state.answers[id] ?? 0);
    const approvalAvg = approvalScoresArr.reduce((a, b) => a + b, 0) / approvalScoresArr.length;

    // 4. Crítica/Enojo
    const angerIds = [2, 12, 44, 45, 46];
    const angerScoresArr = angerIds.map(id => state.answers[id] ?? 0);
    const angerAvg = angerScoresArr.reduce((a, b) => a + b, 0) / angerScoresArr.length;

    // 5. Evasión/Aislamiento
    const avoidanceIds = [10, 11, 15, 47, 50];
    const avoidanceScoresArr = avoidanceIds.map(id => state.answers[id] ?? 0);
    const avoidanceAvg = avoidanceScoresArr.reduce((a, b) => a + b, 0) / avoidanceScoresArr.length;

    // 6. Queja dominante
    const part2Questions = QUESTIONS.filter(q => q.part === 2);
    const complaintScoresArr = part2Questions.map(q => state.answers[q.id] ?? 0);
    const complaintAvg = complaintScoresArr.reduce((a, b) => a + b, 0) / (complaintScoresArr.length || 1);

    // 7. Conexión espiritual (average Part 5 with item 82 inverted in value: 4 - value)
    const part5Questions = QUESTIONS.filter(q => q.part === 5);
    const spiritualScoresArr = part5Questions.map(q => {
      const val = state.answers[q.id] ?? 0;
      if (q.id === 82) {
        return 4 - val; // Inverting the "Me cuesta creer que Dios sea bueno cuando las cosas van mal" statement
      }
      return val;
    });
    const spiritualAvg = spiritualScoresArr.reduce((a, b) => a + b, 0) / (spiritualScoresArr.length || 1);

    // Convert high connection into *low connection struggle* for top prioritization
    const spiritualDeficit = 4 - spiritualAvg;

    return {
      "Ansiedad/Miedo": Number(anxietyAvg.toFixed(2)),
      "Control": Number(controlAvg.toFixed(2)),
      "Necesidad de aprobación": Number(approvalAvg.toFixed(2)),
      "Crítica/Enojo": Number(angerAvg.toFixed(2)),
      "Evasión/Aislamiento": Number(avoidanceAvg.toFixed(2)),
      "Queja dominante": Number(complaintAvg.toFixed(2)),
      "Conexión espiritual baja": Number(spiritualDeficit.toFixed(2)),
      rawSpiritualScore: Number(spiritualAvg.toFixed(2))
    };
  };

  const getTopThreeStruggles = (scores: Record<string, number>): StruggleProfile[] => {
    // Exclude auxiliary calculation keys
    const items = Object.entries(scores)
      .filter(([key]) => key !== "rawSpiritualScore")
      .map(([name, score]) => ({
        name,
        score,
        description: STRUGGLE_INTERPRETATIONS[name]?.desc || "",
        reflectionQuestion: STRUGGLE_INTERPRETATIONS[name]?.reflex || ""
      }));

    // Sort by descending score
    return items.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // Generate conditional paragraph for "Lo que Dios parece estar trabajando"
  const generateWorkingParagraph = (topStruggles: StruggleProfile[]) => {
    const struggleNames = topStruggles.map(s => s.name);
    let workText = "";

    const hasSpiritual = struggleNames.includes("Conexión espiritual baja");
    const hasControl = struggleNames.includes("Control");
    const hasFear = struggleNames.includes("Ansiedad/Miedo");
    const hasApproval = struggleNames.includes("Necesidad de aprobación");
    const hasAnger = struggleNames.includes("Crítica/Enojo");
    const hasAvoidance = struggleNames.includes("Evasión/Aislamiento");
    const hasComplaint = struggleNames.includes("Queja dominante");

    if (hasSpiritual) {
      workText += "Dios está llamándote con ternura a derribar toda religión de mero esfuerzo relacional y sequedad interna. Él te invita a correr hacia ÉL no para cumplir una lista de deberes matrimoniales, sino a descubrirlo como tu refugio real y sanador en la tormenta cotidiana. ";
    }
    if (hasControl && hasFear) {
      workText += "El Señor busca desarmar sutilmente la pretensión de falsas garantías y salvaguardas que has querido construir debido a la desconfianza o la aprensión. Te está liberando del cansancio titánico de intentar gobernar los hilos invisibles de tu hogar; tu Padre anhela guiar cada rincón si rindes el control y entras en Su descanso soberano. ";
    } else if (hasControl) {
      workText += "Dios confronta con insistente amor tu fatiga relacional. Tratar de forzar a tu cónyuge a ajustarse al molde ideal es una carga que Dios nunca te diseñó para portar. Él quiere madurar tu fe relacional invitándote a confiar y soltar el control en Sus manos infinitas. ";
    } else if (hasFear) {
      workText += "El Señor te recuerda que tu estabilidad no depende de que el horizonte matrimonial esté libre de nubarrones. Él te está llamando a cimentar tu seguridad bajo las alas de Su providencia absoluta, sanando el pánico con Su presencia continua. ";
    }

    if (hasApproval) {
      workText += "El Padre Celestial te consuela revelándote que la mirada evaluativa o el afecto oscilante de tu cónyuge no definen el núcleo de tu valía. Te está liberando de la esclavitud de buscar validación constante, para afirmarte sobre el suelo inamovible del rescate de la Cruz. ";
    }

    if (hasAnger && hasComplaint) {
      workText += "El Espíritu Santo está apuntando Su luz hacia antiguas demandas, quejas e ídolos del bienestar que han reclamado el asiento real en tu afecto. Él te invita a cambiar el reclamo defensivo por un dolor honesto que clama al cielo, trocando la impaciencia por compasión de deudor perdonado. ";
    } else if (hasAnger) {
      workText += "Tus decepciones matrimoniales son el terreno donde Dios quiere tallar Su obediencia más gloriosa. Él te llama a desmontar la amargura que dicta sermones y correcciones hirientes, invitándote a vestir un corazón humilde que perdona setenta veces siete. ";
    } else if (hasComplaint) {
      workText += "Dios desea ayudarte a desligar tu gozo de las fallas de tu pareja. El bienestar de tu alma no puede ser esclavo absoluto de si el otro decide o no madurar hoy. Él se oferece como tu deleite único y superior. ";
    }

    if (hasAvoidance) {
      workText += "El Redentor te invita a dar un paso valiente fuera de la fortaleza fría del silencio y las convenientes evasiones cínicas. Él te promete sostener tu mano mientras corres el hermoso riesgo de hablar con franqueza y amar con vulnerabilidad sacrificial.";
    }

    if (!workText) {
      workText = "Dios está conduciendo tu corazón a través de una dulce transformación. Te está invitando a mirar con agudo discernimiento tus demandas más hondas, mostrándote que Su gracia no solo repara lo roto, sino que renueva la esperanza en el desierto.";
    }

    return workText.trim();
  };

  // --- EXPORT PDF FILE FUNCTION ---
  const handleDownload = () => {
    const scores = calculateResultScores();
    const topStruggles = getTopThreeStruggles(scores);
    const godWork = generateWorkingParagraph(topStruggles);
    const dateStr = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    let y = 20;
    const pageHeight = 280;
    const margin = 15;
    const width = 180;

    const checkNewPage = (neededHeight: number) => {
      if (y + neededHeight > pageHeight) {
        doc.addPage();
        y = 20;
      }
    };

    // Decorate cover top line
    doc.setDrawColor(201, 169, 110); // Golden line
    doc.setLineWidth(1.5);
    doc.line(margin, y, margin + width, y);
    y += 8;

    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(34, 34, 34);
    doc.text("RADIOGRAFÍA DEL CORAZÓN", margin, y);
    y += 7;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(123, 110, 168); // Soft purple accent
    doc.text("Un Diagnóstico de Consejería Bíblica Matrimonial", margin, y);
    y += 12;

    // Metadata Block box
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.setFillColor(248, 248, 248);
    doc.rect(margin, y, width, 22, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text("Evaluado / Nombre:", margin + 5, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(34, 34, 34);
    doc.text(state.name || "Invitado anónimo", margin + 45, y + 8);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(80, 80, 80);
    doc.text("Fecha del Informe:", margin + 5, y + 15);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(34, 34, 34);
    doc.text(dateStr, margin + 45, y + 15);
    y += 32;

    // SECTION 1: LUCHAS PREDOMINANTES
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(201, 169, 110); // Warm gold title
    doc.text("I. Las 3 Luchas Predominantes", margin, y);
    y += 6;

    doc.setDrawColor(201, 169, 110);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + width, y);
    y += 10;

    topStruggles.forEach((s, idx) => {
      checkNewPage(45);

      // Circle and numbers decoration
      doc.setFillColor(245, 240, 230);
      doc.circle(margin + 5, y, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(201, 169, 110);
      doc.text(`${idx + 1}`, margin + 4.2, y + 1.2);

      // Struggle name & Score
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(34, 34, 34);
      doc.text(`${s.name}`, margin + 12, y + 1.2);

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9.5);
      doc.setTextColor(110, 110, 110);
      doc.text(`Severidad: ${s.score} / 4.0`, margin + 140, y + 1);
      y += 8;

      // Description text (handles wrapper)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const splitDesc = doc.splitTextToSize(s.description, width - 15);
      doc.text(splitDesc, margin + 5, y);
      y += (splitDesc.length * 4.5) + 4;

      // Reflection Box
      checkNewPage(20);
      const splitReflex = doc.splitTextToSize(`Reflexión Bíblica: "${s.reflectionQuestion}"`, width - 20);
      const boxHeight = (splitReflex.length * 4.5) + 6;
      doc.setFillColor(242, 240, 248); // warm purple overlay background
      doc.setDrawColor(123, 110, 168); // Soft purple border
      doc.setLineWidth(0.5);
      doc.rect(margin + 5, y - 2, width - 10, boxHeight, "FD");

      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(123, 110, 168);
      doc.text(splitReflex, margin + 9, y + 2.5);
      
      y += boxHeight + 8;
    });

    // SECTION 2: LO QUE DIOS PARECE ESTAR TRABAJANDO
    checkNewPage(45);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(123, 110, 168); // Purple title
    doc.text("II. Lo que Dios parece estar trabajando en tu corazón", margin, y);
    y += 6;

    doc.setDrawColor(123, 110, 168);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + width, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(34, 34, 34);
    const splitWork = doc.splitTextToSize(godWork, width);
    doc.text(splitWork, margin, y);
    y += (splitWork.length * 5) + 12;

    // SECTION 3: PERFIL DE PUNTAJES DETALLADO
    checkNewPage(65);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text("III. Perfil Detallado del Corazón", margin, y);
    y += 6;

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + width, y);
    y += 10;

    const scoresTable = [
      { key: "Ansiedad / Miedo", val: `${scores["Ansiedad/Miedo"]} / 4.0` },
      { key: "Control", val: `${scores["Control"]} / 4.0` },
      { key: "Necesidad de aprobación", val: `${scores["Necesidad de aprobación"]} / 4.0` },
      { key: "Crítica / Enojo", val: `${scores["Crítica/Enojo"]} / 4.0` },
      { key: "Evasión / Aislamiento", val: `${scores["Evasión/Aislamiento"]} / 4.0` },
      { key: "Queja dominante (Relacional)", val: `${scores["Queja dominante"]} / 4.0` },
      { key: "Déficit de conexión espiritual", val: `${scores["Conexión espiritual baja"]} / 4.0` },
      { key: "Conexión espiritual directa (P5)", val: `${scores.rawSpiritualScore} / 4.0` }
    ];

    scoresTable.forEach((row, rIdx) => {
      checkNewPage(10);
      // alternate background striping
      if (rIdx % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, y - 4, width, 7.5, "F");
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(row.key, margin + 4, y + 1);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(34, 34, 34);
      doc.text(row.val, margin + 140, y + 1);
      y += 8;
    });
    y += 6;

    // SECTION 4: DATOS BIOGRÁFICOS
    checkNewPage(50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text("IV. Afectos y Biografía Relacional", margin, y);
    y += 6;

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + width, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("La frase de anhelos sustitutos completada:", margin, y);
    y += 5.5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10.5);
    doc.setTextColor(34, 34, 34);
    const splitInput = doc.splitTextToSize(`"Si tan solo ${state.complaintInput || "[Sin completar]"}, mi vida sería mucho mejor."`, width);
    doc.text(splitInput, margin, y);
    y += (splitInput.length * 5) + 8;

    checkNewPage(45);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Conflicto o patrón relacional del que más te quejas:", margin, y);
    y += 5.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(34, 34, 34);
    const splitCompl = doc.splitTextToSize(state.complaintTextarea || "[Sin detallar]", width);
    doc.text(splitCompl, margin, y);
    y += (splitCompl.length * 4.8) + 12;

    // SECTION 5: PREGUNTAS REVELADORAS
    checkNewPage(45);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text("V. Preguntas Reveladoras del Espejo", margin, y);
    y += 6;

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + width, y);
    y += 10;

    WRITING_QUESTIONS.forEach((qText, qIdx) => {
      checkNewPage(35);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(123, 110, 168);
      const splitQuestion = doc.splitTextToSize(`${qIdx + 1}. ${qText}`, width);
      doc.text(splitQuestion, margin, y);
      y += (splitQuestion.length * 4.5) + 4;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(34, 34, 34);
      const ansText = state.writeAnswers[qIdx] || "[Sin responder]";
      const splitAns = doc.splitTextToSize(`Respuesta: ${ansText}`, width - 8);
      
      // Draw left border line for answers
      const ansHt = (splitAns.length * 4.5);
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.5);
      doc.line(margin + 2, y - 2, margin + 2, y - 2 + ansHt);
      
      doc.text(splitAns, margin + 6, y);
      y += ansHt + 8;
    });

    // FOOTER END NOTE
    checkNewPage(35);
    y += 4;
    doc.setDrawColor(201, 169, 110);
    doc.setLineWidth(0.4);
    doc.line(margin, y, margin + width, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    const splitFoot = doc.splitTextToSize("Este informe confidencial ha sido diseñado para compartirse con tu consejero bíblico matrimonial. Él o ella te guiará bajo el sabio consejo de las Escrituras para ir aún más profundo en los afectos y motivaciones de tu corazón.", width);
    doc.text(splitFoot, margin, y);

    const sanitizedName = (state.name || "invitado").toLowerCase().replace(/[^a-z0-9]/g, "_");
    doc.save(`radiografia_corazon_${sanitizedName}.pdf`);
    showToast("¡Tu informe .pdf ha sido generado y descargado exitosamente!");
  };

  // Dynamic progress percentage calculation
  const getGlobalProgressWidth = () => {
    if (state.currentScreen === 0) return 0;
    if (state.currentScreen >= 1 && state.currentScreen <= 5) {
      // 15% per part, mapping 15% to 75%
      return state.currentScreen * 14;
    }
    if (state.currentScreen === 6) {
      // Write questions (75% to 92%)
      return 75 + state.currentWriteQuestionIndex * 4;
    }
    return 100;
  };

  // Render scale hint descriptions on hover or selection
  const getScaleLabel = (val: number) => {
    switch (val) {
      case 0: return "Nunca";
      case 1: return "Rara vez";
      case 2: return "Algunas veces";
      case 3: return "Frecuentemente";
      case 4: return "Casi siempre";
      default: return "";
    }
  };

  // Radar drawing calculation
  const renderRadarView = () => {
    const scores = calculateResultScores();
    const categoriesList = [
      { name: "Ansiedad / Miedo", val: scores["Ansiedad/Miedo"] },
      { name: "Control", val: scores["Control"] },
      { name: "Aprobación", val: scores["Necesidad de aprobación"] },
      { name: "Crítica / Enojo", val: scores["Crítica/Enojo"] },
      { name: "Evasión", val: scores["Evasión/Aislamiento"] },
      { name: "Quejo Dominante", val: scores["Queja dominante"] },
      { name: "Déficit Espiritual", val: scores["Conexión espiritual baja"] }
    ];

    const cx = 160;
    const cy = 160;
    const r = 100; // max radius for score of 4
    const totalAxes = categoriesList.length;

    // Outer grid rings
    const gridRings = [0.25, 0.5, 0.75, 1];
    
    // Coordinates generator helper
    const getCoordinate = (index: number, val: number) => {
      const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2; // -90 deg to start top
      const distance = (val / 4) * r;
      return {
        x: cx + distance * Math.cos(angle),
        y: cy + distance * Math.sin(angle)
      };
    };

    // Build grid polygon strings
    const gridPolys = gridRings.map(ratio => {
      const points = [];
      for (let i = 0; i < totalAxes; i++) {
        const pt = getCoordinate(i, ratio * 4);
        points.push(`${pt.x},${pt.y}`);
      }
      return points.join(" ");
    });

    // Build the actual data polygon
    const dataPoints = categoriesList.map((cat, i) => {
      const pt = getCoordinate(i, cat.val);
      return `${pt.x},${pt.y}`;
    }).join(" ");

    return (
      <div className="flex flex-col items-center justify-center my-6">
        <svg viewBox="0 0 320 320" className="w-full max-w-[280px] xs:max-w-[320px] h-auto overflow-visible">
          {/* Radial grids */}
          {gridPolys.map((points, idx) => (
            <polygon key={`grid-${idx}`} points={points} className="radar-grid" />
          ))}

          {/* Core axis lines */}
          {categoriesList.map((_, i) => {
            const endPt = getCoordinate(i, 4);
            return (
              <line 
                key={`axis-${i}`} 
                x1={cx} 
                y1={cy} 
                x2={endPt.x} 
                y2={endPt.y} 
                className="radar-axis" 
              />
            );
          })}

          {/* Filled radar data shape */}
          {dataPoints && (
            <polygon points={dataPoints} className="radar-polygon" />
          )}

          {/* Vertices points */}
          {categoriesList.map((cat, i) => {
            const pt = getCoordinate(i, cat.val);
            return (
              <circle 
                key={`vertex-${i}`} 
                cx={pt.x} 
                cy={pt.y} 
                r="4.5" 
                className="radar-vertex"
                id={`radar-vertex-${i}`}
              />
            );
          })}

          {/* Text labels surrounding radar */}
          {categoriesList.map((cat, i) => {
            const textPt = getCoordinate(i, 4.8); // push slightly outside radius
            // Adjust vertical offset for readability based on position
            let dy = "3px";
            if (i === 0) dy = "-8px";
            if (i > 0 && i < 3) dy = "3px";
            if (i >= 3 && i <= 4) dy = "14px";
            if (i > 4) dy = "3px";

            return (
              <text 
                key={`label-${i}`} 
                x={textPt.x} 
                y={textPt.y} 
                dy={dy}
                className="radar-text"
                id={`radar-label-${i}`}
              >
                {cat.name}
              </text>
            );
          })}
        </svg>
        <span className="text-[0.78rem] text-neutral-500 font-mono mt-4">
          * El eje Déficit Espiritual representa menor cercanía vivida con Dios
        </span>
      </div>
    );
  };

  return (
    <div className="app-container font-sans min-h-screen bg-[#0D0D12] text-[#EDE8DF] relative selection:bg-[#C9A96E]/30 selection:text-white">
      {/* Background aesthetics */}
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />

      {/* Floating particles background (pure CSS) */}
      <div className="particles-container">
        {[...Array(12)].map((_, i) => {
          const delay = i * 1.5;
          const left = Math.floor(Math.sin(i) * 45 + 50); // randomized horizontal positions
          return (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`,
                width: `${Math.max(3, i % 6)}px`,
                height: `${Math.max(3, i % 6)}px`
              }}
            />
          );
        })}
      </div>

      {/* Top golden progress indicator */}
      <div className="app-header-progress" id="app-progress-indicator">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${getGlobalProgressWidth()}%` }} 
        />
      </div>

      {/* Main container wrapper */}
      <div className="journey-wrapper">
        
        {/* ==================== PANTALLA 0: BIENVENIDA ==================== */}
        {state.currentScreen === 0 && (
          <div className="container-boxed text-center fade-slide-up" id="welcome-pane">
            <div className="w-12 h-12 rounded-full border border-[#C9A96E]/40 flex items-center justify-center mx-auto mb-6 text-[#C9A96E] shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            
            <h1 className="title-display">Radiografía del Corazón</h1>
            <p className="subtitle-heading">Un diagnóstico honesto para quienes quieren crecer</p>
            
            <p className="text-editorial max-w-lg mx-auto mb-8">
              Responde con honestidad radical y sin prisa.
            </p>

            <div className="max-w-sm mx-auto mb-10 text-left">
              <label htmlFor="user-name-input" className="block text-xs font-semibold text-[#8C8A9A] uppercase tracking-widest mb-2.5">
                ¿Cómo quieres que te llamemos? (Opcional)
              </label>
              <input 
                id="user-name-input"
                type="text" 
                placeholder="Ingresa tu nombre..." 
                className="input-text-cinema"
                value={state.name}
                onChange={(e) => setState(prev => ({ ...prev, name: e.target.value }))}
              />
              <span className="text-xs text-neutral-500 block mt-2 font-mono">
                * Tu nombre solo se ocupará para personalizar tu reporte de salida.
              </span>
            </div>

            <button 
              id="start-diagnostic-btn"
              onClick={handleStart} 
              className="btn-cinema"
            >
              Comenzar mi diagnóstico
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ==================== PANTALLAS 1 A 5: PARTES DEL DIAGNÓSTICO ==================== */}
        {state.currentScreen >= 1 && state.currentScreen <= 5 && (() => {
          const part = state.currentScreen;
          const partQuestions = QUESTIONS.filter(q => q.part === part);
          
          // Separate into subgroups if they exist
          const hasSubgroups = part === 1 || part === 3 || part === 4;
          const subgroups = hasSubgroups 
            ? Array.from(new Set(partQuestions.map(q => q.subGroup).filter(Boolean))) as string[]
            : [];

          const partTitle = 
            part === 1 ? "Parte 1 — Mi lucha personal" :
            part === 2 ? "Parte 2 — De lo que más me quejo" :
            part === 3 ? "Parte 3 — Mi matrimonio" :
            part === 4 ? "Parte 4 — Radiografía del corazón" :
            "Parte 5 — Mi relación con Dios";

          const partSubtitle = 
            part === 1 ? "Reconociendo mis emociones y reacciones internas profundas" :
            part === 2 ? "Mirando la raíz de mis reclamos relacionales cotidianos" :
            part === 3 ? "Identificando dinámicas de conflicto, cercanía y pacto" :
            part === 4 ? "Buscando anhelos y desilusiones secretas del alma" :
            "Examinando si busco a Dios como refugio o como regla de conducta";

          const partInstruction = 
            part === 1 ? "Por favor pondera cada frase con honestidad, marcando el nivel de concordancia de tu realidad habitual." :
            part === 2 ? "A menudo, nuestras quejas sobre el cónyuge encubren deudas y anhelos profundos de nuestro propio corazón." :
            part === 3 ? "Evalúa honestamente el comportamiento conjunto y tus reacciones automáticas en medio de la fricción." :
            part === 4 ? "Esta sección trata el núcleo motivacional del alma. Pondera con sosiego de espíritu ante Dios." :
            "Dios anhela que lo busquemos en nuestra fragilidad, no a través de una fachada de rectitud estéril.";

          const progress = getProgressInfo(part);

          return (
            <div 
              id={`diagnostic-part-${part}`}
              className={`container-boxed fade-slide-up ${part === 4 ? 'container-warm' : ''}`}
            >
              {/* Header section info */}
              <div className="section-icon-container" id={`part-icon-${part}`}>
                {PART_ICONS[part - 1]}
              </div>

              <div className="text-center mb-6">
                <span className="section-label">Sección {part} de 5</span>
                <span id={`part-progress-indicator-${part}`} className="text-xs text-amber-100/60 font-mono block mt-1">
                  ({progress.answeredInPart} de {progress.totalInPart} respondidas)
                </span>
                <h2 className="title-display" style={{ fontSize: "1.7rem", marginTop: "8px" }}>{partTitle}</h2>
                <p className="subtitle-heading" style={{ fontSize: "0.95rem", marginBottom: "12px" }}>{partSubtitle}</p>
                <div className="decorative-line" />
                <p className="text-[#8C8A9A] text-sm italic py-2">
                  &ldquo;{partInstruction}&rdquo;
                </p>
              </div>

              {/* Special Part 2 Fields at Top (Frase de completar) */}
              {part === 2 && (
                <div className="mb-10 p-5 rounded-12 bg-black/30 border border-neutral-800" id="part-2-fillins">
                  <label htmlFor="complaint-fillin-input" className="block text-sm font-semibold text-[#8C8A9A] mb-3">
                    Estudio de anhelos: Completa la siguiente frase:
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-neutral-300 font-serif text-lg">&ldquo;Si tan solo</span>
                    <input 
                      id="complaint-fillin-input"
                      type="text" 
                      placeholder="mi cónyuge cambiara / me prestara atención / tuviéramos dinero" 
                      className="input-text-cinema flex-1 border-b border-t-0 border-l-0 border-r-0 rounded-none focus:border-[#C9A96E]"
                      value={state.complaintInput}
                      onChange={(e) => setState(prev => ({ ...prev, complaintInput: e.target.value }))}
                    />
                    <span className="text-neutral-300 font-serif text-lg">, mi vida sería mucho mejor.&rdquo;</span>
                  </div>
                  <span className="text-xs text-neutral-500 block mt-2 font-mono">
                    * Tu respuesta revela qué salvador sustituto o comodidad persigue hoy tu corazón.
                  </span>
                </div>
              )}

              {/* Questions Renderer */}
              <div className="questions-container" id={`questions-list-part-${part}`}>
                {/* Render grouped questions */}
                {hasSubgroups ? (
                  subgroups.map(groupName => {
                    const groupQuestions = partQuestions.filter(q => q.subGroup === groupName);
                    const groupKey = `${part}-${groupName}`;
                    const isCollapsed = state.collapsedGroups[groupKey] ?? false;

                    return (
                      <div key={groupName} className="collapsible-group" id={`group-${groupKey.replace(/\s+/g, '_')}`}>
                        <div 
                          className="collapsible-header"
                          onClick={() => toggleGroupCollapse(groupKey)}
                        >
                          <div className="collapsible-header-title">
                            <Heart className="w-4 h-4 text-[#C9A96E]" />
                            <span>{groupName}</span>
                          </div>
                          <span className={`collapsible-indicator ${isCollapsed ? 'collapsed' : ''}`}>
                            {isCollapsed ? "▼ Mostrar" : "▲ Ocultar"}
                          </span>
                        </div>

                        <div className={`collapsible-content ${isCollapsed ? 'collapsed' : ''}`}>
                          {groupQuestions.map(q => (
                            <div key={q.id} className="question-item" id={`question-block-${q.id}`}>
                              <span className="question-text-title">
                                <span className="text-[#C9A96E]/50 font-mono text-xs mr-2">{q.id}.</span>
                                {q.text}
                              </span>
                              
                              <div className="scale-wrapper">
                                {[0, 1, 2, 3, 4].map(val => (
                                  <button
                                    key={val}
                                    onClick={() => selectAnswer(q.id, val)}
                                    className={`scale-pill ${state.answers[q.id] === val ? 'selected' : ''}`}
                                    aria-label={`Puntuar ${val}: ${getScaleLabel(val)}`}
                                  >
                                    {val}
                                  </button>
                                ))}
                                
                                <span className="scale-hint-text">
                                  {state.answers[q.id] !== undefined ? getScaleLabel(state.answers[q.id]) : "Selecciona una opción"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  /* Render plain lists */
                  partQuestions.map(q => (
                    <div key={q.id} className="question-item" id={`question-block-${q.id}`}>
                      <span className="question-text-title">
                        <span className="text-[#C9A96E]/50 font-mono text-xs mr-2">{q.id}.</span>
                        {q.text}
                      </span>
                      
                      <div className="scale-wrapper">
                        {[0, 1, 2, 3, 4].map(val => (
                          <button
                            key={val}
                            onClick={() => selectAnswer(q.id, val)}
                            className={`scale-pill ${state.answers[q.id] === val ? 'selected' : ''}`}
                            aria-label={`Puntuar ${val}: ${getScaleLabel(val)}`}
                          >
                            {val}
                          </button>
                        ))}
                        
                        <span className="scale-hint-text">
                          {state.answers[q.id] !== undefined ? getScaleLabel(state.answers[q.id]) : "Selecciona una opción"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Special Part 2 Open Question at Bottom */}
              {part === 2 && (
                <div className="mt-8 p-5 rounded-12 bg-black/20 border border-neutral-950" id="part-2-text-query">
                  <label htmlFor="complaint-textarea-input" className="block text-sm font-semibold text-[#8C8A9A] mb-3">
                    ¿Cuál es el conflicto o patrón relacional del que más te quejas o en el que chocan habitualmente?
                  </label>
                  <textarea 
                    id="complaint-textarea-input"
                    placeholder="Describe de forma sincera la dinámica relacional dolorosa o recurrente con tu cónyuge..." 
                    className="textarea-cinema"
                    value={state.complaintTextarea}
                    onChange={(e) => setState(prev => ({ ...prev, complaintTextarea: e.target.value }))}
                  />
                </div>
              )}

              {/* Navigation controls block */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-neutral-800">
                <button 
                  onClick={handlePrevPart}
                  className="btn-secondary-cinema"
                  id="part-prev-btn"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver {part === 1 ? "a la Bienvenida" : ""}
                </button>

                <div className="text-center font-mono text-xs text-neutral-500 hidden sm:block">
                  Progreso: {Math.round((Object.keys(state.answers).length / TOTAL_QUESTIONS) * 100)}% de preguntas respondidas
                </div>

                <button 
                  onClick={handleNextPart}
                  className="btn-cinema"
                  id="part-next-btn"
                >
                  Siguiente Sección
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Discret hint note for Part 5 */}
              {part === 5 && (
                <div className="text-center text-[0.78rem] text-neutral-600 mt-6 italic">
                  Este espacio es personal y sagrado. Solo tú y el Señor conocen estas respuestas.
                </div>
              )}
            </div>
          );
        })()}

        {/* ==================== PANTALLA 6: LAS 5 PREGUNTAS REVELADORAS ==================== */}
        {state.currentScreen === 6 && (
          <div className="container-boxed fade-slide-up" id="reflective-pane">
            <div className="w-12 h-12 rounded-full border border-[#7B6EA8]/40 flex items-center justify-center mx-auto mb-6 text-[#7B6EA8] shadow-sm">
              <Compass className="w-6 h-6" />
            </div>

            <div className="text-center mb-8">
              <span className="section-label">Indagación en el espejo</span>
              <span className="text-xs text-neutral-500 font-mono block mt-1">
                Pregunta {state.currentWriteQuestionIndex + 1} de {WRITING_QUESTIONS.length}
              </span>
              <div className="decorative-line" />
            </div>

            {/* Centered big question */}
            <div className="mb-10 text-center">
              <h3 className="title-display" style={{ fontSize: "1.45rem", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" }} id="reflective-question-text">
                {WRITING_QUESTIONS[state.currentWriteQuestionIndex]}
              </h3>
              
              <div className="mt-8 text-left max-w-lg mx-auto">
                <textarea 
                  id="reflective-question-textarea"
                  value={state.writeAnswers[state.currentWriteQuestionIndex]}
                  onChange={(e) => handleWriteAnswersChange(e.target.value)}
                  placeholder="Escribe tu reflexión sin prisa, buscando ser lo más sincero/a contigo mismo/a..." 
                  className="textarea-cinema"
                  style={{ minHeight: "150px" }}
                />
              </div>
            </div>

            {/* Navigation block */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-neutral-800">
              <button 
                onClick={handlePrevWriteQuestion}
                className="btn-secondary-cinema"
                id="reflective-prev-btn"
              >
                <ArrowLeft className="w-4 h-4" />
                Retroceder
              </button>

              <button 
                onClick={handleNextWriteQuestion}
                className="btn-cinema"
                id="reflective-next-btn"
              >
                {state.currentWriteQuestionIndex < WRITING_QUESTIONS.length - 1 ? "Siguiente pregunta" : "Obtener Perfil del Corazón"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ==================== PANTALLA 7: PERFIL DEL CORAZÓN (RESULTADOS) ==================== */}
        {state.currentScreen === 7 && (() => {
          const scores = calculateResultScores();
          const topStruggles = getTopThreeStruggles(scores);
          const dynamicReflection = generateWorkingParagraph(topStruggles);

          return (
            <div className="container-boxed fade-slide-up" id="results-pane" style={{ maxWidth: "800px" }}>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/5 text-xs text-[#C9A96E] font-mono tracking-wider uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  Evaluación Finalizada
                </div>
                <h2 className="title-display">Tu Perfil del Corazón{state.name ? `, ${state.name}` : ""}</h2>
                <p className="text-neutral-500 italic text-sm mt-1">"Esto no es un diagnóstico clínico definitivo. Es un espejo para trabajar la gracia."</p>
              </div>

              <div className="decorative-line" />

              {/* Spider Radar Diagram & Descriptive Summary side by side or stacked */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Radar Column */}
                <div className="rounded-16 bg-[#111116] border border-white/5 p-6 flex flex-col items-center">
                  <h4 className="text-xs font-semibold text-[#8C8A9A] tracking-wider uppercase mb-2">Radiografía Tridimensional</h4>
                  <p className="text-[0.8rem] text-center text-neutral-500 mb-2">Los 7 ejes del corazón relacional</p>
                  {renderRadarView()}
                </div>

                {/* Introductory Summary Column */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-serif text-lg text-[#EDE8DF] mb-4">Un Corazón en Proceso</h3>
                  <p className="text-sm text-[#8C8A9A] leading-relaxed mb-4">
                    Este perfil revela la configuración de tus motivaciones, miedos y posturas preferidas de respuesta cuando experimentas tensión o crisis en tu matrimonio.
                  </p>
                  <p className="text-sm text-[#8C8A9A] leading-relaxed mb-4">
                    Las tres "llamas" abajo representan las áreas donde tu corazón ha estado operando bajo mayor calor de fricción. Estas no son marcas para catalogarte, sino recordatorios de que estás vivo/a, transformándote mediante la bondad del Redentor.
                  </p>
                  <div className="p-4 rounded-8 bg-[#C9A96E]/5 border border-[#C9A96E]/15 text-sm text-[#C9A96E]/90 italic">
                    &ldquo;Engañoso es el corazón más que todas las cosas... pero el Redentor escudriña la mente e infunde un corazón de carne.&rdquo;
                  </div>
                </div>

              </div>
              
              <div className="decorative-line" />

              {/* The 3 Top Struggles showing custom CSS glowing animation flames */}
              <div className="mb-10">
                <h3 className="font-serif text-xl mb-6 text-[#C9A96E] text-center md:text-left">
                  Tus 3 Luchas Predominantes
                </h3>

                <div className="space-y-4" id="struggles-list">
                  {topStruggles.map((struggle, idx) => (
                    <div key={struggle.name} className="struggle-card" id={`struggle-card-${idx}`}>
                      {/* CSS Flame Animation container */}
                      <div className="flame-icon-container">
                        <div className="flame-halo" />
                        <div className="flame-animation" />
                      </div>

                      {/* Info and reflection text */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h4 className="font-medium text-md text-[#EDE8DF] tracking-wide">{struggle.name}</h4>
                          <span className="text-xs font-mono text-neutral-500 py-0.5 px-2.5 rounded bg-white/5">
                            Severidad: {struggle.score} / 4.0
                          </span>
                        </div>
                        <p className="text-sm text-[#8C8A9A] leading-relaxed mb-3">
                          {struggle.description}
                        </p>
                        
                        <div className="p-3 bg-black/40 border-l-2 border-[#7B6EA8] rounded-r-6 text-xs text-[#7B6EA8]/90 font-mono italic">
                          <span className="font-bold uppercase tracking-wider block text-[0.72rem] text-pink-400/80 mb-1">
                            Reflexión Bíblica:
                          </span>
                          &ldquo;{struggle.reflectionQuestion}&rdquo;
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Lo que Dios parece estar trabajando" dynamic logical commentary */}
              <div className="mb-10 p-6 rounded-16 bg-[#1A1826] border border-[#7B6EA8]/20" id="gods-work-card">
                <div className="flex items-center gap-2.5 mb-4">
                  <Compass className="w-5 h-5 text-[#7B6EA8]" />
                  <h3 className="font-serif text-lg text-white">Lo que Dios parece estar trabajando</h3>
                </div>
                <p className="text-sm text-[#EDE8DF] leading-relaxed italic pr-2">
                  {dynamicReflection}
                </p>
                <span className="text-[0.72rem] font-mono text-[#8C8A9A]/60 block mt-4">
                  * Este texto asocia dinámicamente la configuración particular de tus motivaciones predominantes.
                </span>
              </div>

              {/* Action Buttons list */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12 py-6 border-t border-neutral-800">
                <button 
                  onClick={handleDownload} 
                  className="btn-cinema w-full sm:w-auto"
                  style={{ borderRadius: "10px" }}
                  id="download-transcript-btn"
                >
                  <Download className="w-4 h-4" />
                  Descargar mi diagnóstico (PDF)
                </button>

                <button 
                  onClick={handleReset} 
                  className="btn-secondary-cinema w-full sm:w-auto"
                  style={{ borderRadius: "10px" }}
                  id="reset-diagnostic-btn"
                >
                  <RefreshCw className="w-4 h-4" />
                  Realizar de nuevo
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Este diagnóstico representa un punto de partida. Guarda tu reporte y agrégalo a tu documentación de consejería matrimonial para abordarlo con tu guía matrimonial de cabecera.
                </p>
              </div>

            </div>
          );
        })()}

      </div>

      {/* Slide-out/up Toast Notice */}
      <div 
        className={`toast-notice ${toastMessage ? 'show' : ''}`}
        id="toast-notification-panel"
      >
        <AlertCircle className="w-4 h-4 text-[#C9A96E]" />
        <span>{toastMessage}</span>
      </div>

    </div>
  );
}
