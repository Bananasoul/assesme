// Types relatifs au Patient (Pseudonymisé)
export interface PatientClinicalRecord {
  id: string; // UUID (Pseudonymisation stricte)
  createdAt: string;
  updatedAt: string;
  assessments: Assessment[];
}

export type TimelineAnchor = 'T0_INITIAL' | 'T1_MID_TREATMENT' | 'T2_FINAL' | 'FOLLOW_UP';

export interface Assessment {
  id: string;
  patientId: string;
  timelineAnchor: TimelineAnchor;
  timestamp: string;
  questionnaires: QuestionnaireResult[];
  practitionerNotes?: string;
}

export type QuestionnaireType = 'ODI' | 'TAMPA' | 'START_BACK' | 'NDI' | 'DASH' | 'KOOS' | 'HOOS';

export interface QuestionnaireResult {
  id: string;
  assessmentId: string;
  type: QuestionnaireType;
  score: number;
  maxScore: number;
  rawResponses: Record<string, string | number>;
  completedAt: string;
  isCompletedByPatient: boolean;
}

// Types spécifiques pour les questionnaires (ex: TAMPA)
export interface TampaQuestion {
  id: string;
  text: string;
  options: { label: string; value: number }[];
}
