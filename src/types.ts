export interface Question {
  id: number;
  text: string;
  part: number; // 1 to 5
  subGroup?: string; // Sub-section name e.g. "Emociones dominantes"
}

export interface DiagnosticState {
  name: string;
  answers: Record<number, number>; // questionId -> response(0-4)
  complaintInput: string; // The "Si tan solo _____" text field
  complaintTextarea: string; // The open-ended question in part 2
  writeAnswers: string[]; // The 5 open-ended reflective questions
  currentScreen: number; // 0 (welcome), 1-5 (parts), 6 (5 deep questions), 7 (results)
  currentWriteQuestionIndex: number; // 0 to 4
  collapsedGroups: Record<string, boolean>; // groupKey -> boolean
}

export interface StruggleProfile {
  name: string;
  score: number;
  description: string;
  reflectionQuestion: string;
}
