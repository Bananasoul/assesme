export type Option = {
  id: string;
  label: string;
  value: number;
};

export type Question = {
  id: string;
  text: string;
  options: Option[];
  reverseScore?: boolean; // Pour le TAMPA
};

export type QuestionnaireDef = {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  maxScore: number;
  questions: Question[];
};

export const QUESTIONNAIRES: Record<string, QuestionnaireDef> = {
  'tampa': {
    id: 'tampa',
    title: 'Échelle de TAMPA (Kinésiophobie)',
    description: 'Ce questionnaire évalue la peur du mouvement ou d\'une nouvelle blessure.',
    estimatedTime: '5 min',
    maxScore: 68,
    questions: [
      { id: 'q1', text: "J'ai peur de me blesser si je fais de l'exercice.", options: [
        { id: '1', label: 'Pas du tout d\'accord', value: 1 },
        { id: '2', label: 'Plutôt pas d\'accord', value: 2 },
        { id: '3', label: 'Plutôt d\'accord', value: 3 },
        { id: '4', label: 'Tout à fait d\'accord', value: 4 },
      ]},
      { id: 'q2', text: "Si je surmonte ma douleur, la blessure s'aggravera.", options: [
        { id: '1', label: 'Pas du tout d\'accord', value: 1 },
        { id: '2', label: 'Plutôt pas d\'accord', value: 2 },
        { id: '3', label: 'Plutôt d\'accord', value: 3 },
        { id: '4', label: 'Tout à fait d\'accord', value: 4 },
      ]},
      { id: 'q3', text: "Mon corps me dit que j'ai quelque chose de grave.", options: [
        { id: '1', label: 'Pas du tout d\'accord', value: 1 },
        { id: '2', label: 'Plutôt pas d\'accord', value: 2 },
        { id: '3', label: 'Plutôt d\'accord', value: 3 },
        { id: '4', label: 'Tout à fait d\'accord', value: 4 },
      ]},
      // Q4 is reverse scored in the standard TAMPA
      { id: 'q4', text: "Ma douleur diminuerait si je faisais de l'exercice.", reverseScore: true, options: [
        { id: '1', label: 'Pas du tout d\'accord', value: 1 },
        { id: '2', label: 'Plutôt pas d\'accord', value: 2 },
        { id: '3', label: 'Plutôt d\'accord', value: 3 },
        { id: '4', label: 'Tout à fait d\'accord', value: 4 },
      ]}
      // Note: Truncated for prototype, standard has 17 questions
    ]
  },
  
  'start-back': {
    id: 'start-back',
    title: 'STarT Back Tool',
    description: 'Outil de dépistage rapide pour la lombalgie afin d\'adapter la prise en charge.',
    estimatedTime: '2 min',
    maxScore: 9,
    questions: [
      { id: 'sb1', text: "Mon mal de dos s'est propagé dans la jambe(s) au cours des 2 dernières semaines.", options: [
        { id: '0', label: 'Pas d\'accord', value: 0 },
        { id: '1', label: 'D\'accord', value: 1 },
      ]},
      { id: 'sb2', text: "J'ai eu des douleurs à l'épaule ou à la nuque en même temps que mon mal de dos.", options: [
        { id: '0', label: 'Pas d\'accord', value: 0 },
        { id: '1', label: 'D\'accord', value: 1 },
      ]},
      { id: 'sb3', text: "Je n'ai parcouru que de courtes distances à cause de mon mal de dos.", options: [
        { id: '0', label: 'Pas d\'accord', value: 0 },
        { id: '1', label: 'D\'accord', value: 1 },
      ]},
      { id: 'sb4', text: "Au cours des 2 dernières semaines, je me suis habillé(e) plus lentement que d'habitude.", options: [
        { id: '0', label: 'Pas d\'accord', value: 0 },
        { id: '1', label: 'D\'accord', value: 1 },
      ]},
      { id: 'sb5', text: "Les activités physiques ne sont vraiment pas sûres pour une personne avec mon problème de dos.", options: [
        { id: '0', label: 'Pas d\'accord', value: 0 },
        { id: '1', label: 'D\'accord', value: 1 },
      ]}
    ]
  },

  'odi': {
    id: 'odi',
    title: 'Oswestry Disability Index (ODI)',
    description: 'Mesure de l\'impact des douleurs lombaires sur vos activités quotidiennes.',
    estimatedTime: '5-10 min',
    maxScore: 50,
    questions: [
      { id: 'odi1', text: "Intensité de la douleur", options: [
        { id: '0', label: 'Je peux supporter ma douleur sans prendre de médicaments', value: 0 },
        { id: '1', label: 'La douleur est mauvaise mais je la gère sans médicaments', value: 1 },
        { id: '2', label: 'Les calmants soulagent complètement la douleur', value: 2 },
        { id: '3', label: 'Les calmants soulagent partiellement la douleur', value: 3 },
        { id: '4', label: 'Les calmants ont très peu d\'effet', value: 4 },
        { id: '5', label: 'Je ne prends pas de calmants car ils sont inefficaces', value: 5 },
      ]},
      { id: 'odi2', text: "Soins personnels (Se laver, s'habiller etc.)", options: [
        { id: '0', label: 'Je me débrouille normalement sans que cela augmente la douleur', value: 0 },
        { id: '1', label: 'Je me débrouille normalement, mais la douleur augmente', value: 1 },
        { id: '2', label: 'Laver/m\'habiller est douloureux et je suis lent(e)', value: 2 },
        { id: '3', label: 'J\'ai besoin d\'aide, mais j\'arrive à faire la majorité des choses', value: 3 },
        { id: '4', label: 'J\'ai besoin d\'aide chaque jour pour la plupart des choses', value: 4 },
        { id: '5', label: 'Je ne peux pas m\'habiller, je me lave avec difficulté et je reste au lit', value: 5 },
      ]}
    ]
  },

  'hads': {
    id: 'hads',
    title: 'HAD-S (Anxiété / Dépression)',
    description: 'Évaluation de votre état émotionnel actuel.',
    estimatedTime: '5 min',
    maxScore: 42,
    questions: [
      { id: 'had1', text: "Je me sens tendu ou énervé :", options: [
        { id: '3', label: 'La plupart du temps', value: 3 },
        { id: '2', label: 'Souvent', value: 2 },
        { id: '1', label: 'De temps en temps', value: 1 },
        { id: '0', label: 'Jamais', value: 0 },
      ]},
      { id: 'had2', text: "Je prends plaisir aux mêmes choses qu'autrefois :", options: [
        { id: '0', label: 'Oui, tout autant', value: 0 },
        { id: '1', label: 'Pas autant', value: 1 },
        { id: '2', label: 'Un peu seulement', value: 2 },
        { id: '3', label: 'Presque plus', value: 3 },
      ]}
    ]
  }
};
