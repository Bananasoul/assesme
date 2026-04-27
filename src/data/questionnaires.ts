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

  
  'ndi': {
    id: 'ndi',
    title: 'Neck Disability Index (NDI)',
    description: 'Évaluation de l\'incapacité fonctionnelle liée aux douleurs cervicales.',
    estimatedTime: '5 min',
    maxScore: 100, // Pourcentage
    questions: [
      {
            "id": "ndi1",
            "text": "Intensité de la douleur",
            "options": [
                  {
                        "id": "0",
                        "label": "Je n'ai pas de douleur au cou en ce moment",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "La douleur est légère en ce moment",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "La douleur est modérée en ce moment",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "La douleur est assez sévère en ce moment",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "La douleur est très sévère en ce moment",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "La douleur est la pire imaginable en ce moment",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi2",
            "text": "Soins personnels",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux prendre soin de moi normalement sans augmenter la douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux prendre soin de moi normalement, mais cela augmente la douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Prendre soin de moi est douloureux et je suis lent et prudent",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "J'ai besoin d'aide, mais j'arrive à faire la majorité des choses",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "J'ai besoin d'aide tous les jours dans la plupart des domaines",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux pas m'habiller, je me lave avec difficulté et je reste au lit",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi3",
            "text": "Soulever des objets",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux soulever des objets lourds sans douleur supplémentaire",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux soulever des objets lourds, mais cela augmente la douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "La douleur m'empêche de soulever des objets lourds du sol",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "La douleur m'empêche de soulever des objets lourds, mais je peux soulever des objets légers",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Je ne peux soulever que des objets très légers",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux rien soulever ni porter",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi4",
            "text": "Lecture",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux lire autant que je veux sans douleur au cou",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux lire autant que je veux avec une légère douleur au cou",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Je peux lire autant que je veux avec une douleur modérée au cou",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Je ne peux pas lire autant que je veux à cause d'une douleur modérée",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Je peux à peine lire à cause de la douleur sévère au cou",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux pas lire du tout",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi5",
            "text": "Maux de tête",
            "options": [
                  {
                        "id": "0",
                        "label": "Je n'ai pas du tout de maux de tête",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "J'ai des maux de tête légers de temps en temps",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "J'ai des maux de tête modérés de temps en temps",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "J'ai des maux de tête modérés fréquents",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "J'ai des maux de tête sévères fréquents",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "J'ai des maux de tête presque tout le temps",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi6",
            "text": "Concentration",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux me concentrer pleinement sans difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux me concentrer pleinement avec une légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "J'ai une difficulté modérée à me concentrer",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "J'ai beaucoup de mal à me concentrer",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "J'ai énormément de mal à me concentrer",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux pas me concentrer du tout",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi7",
            "text": "Travail",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux faire autant de travail que d'habitude",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux faire mon travail habituel, mais pas plus",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Je peux faire la majeure partie de mon travail habituel",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Je ne peux pas faire mon travail habituel",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Je peux à peine travailler",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux pas travailler du tout",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi8",
            "text": "Conduite",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux conduire ma voiture sans douleur au cou",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux conduire ma voiture tant que je veux avec une légère douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Je peux conduire ma voiture tant que je veux avec une douleur modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Je ne peux pas conduire aussi longtemps que je veux à cause d'une douleur modérée",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Je peux à peine conduire à cause de la douleur sévère au cou",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux pas conduire du tout",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi9",
            "text": "Sommeil",
            "options": [
                  {
                        "id": "0",
                        "label": "Je n'ai pas de problèmes de sommeil",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Mon sommeil est légèrement perturbé (moins d'une heure de perdue)",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Mon sommeil est modérément perturbé (1-2 heures de perdues)",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Mon sommeil est très perturbé (3-5 heures de perdues)",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Mon sommeil est énormément perturbé (5-7 heures de perdues)",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne dors pas du tout",
                        "value": 5
                  }
            ]
      },
      {
            "id": "ndi10",
            "text": "Loisirs",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux participer à toutes mes activités de loisir sans douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux participer à toutes mes activités avec un peu de douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Je peux participer à la plupart de mes activités, mais avec douleur",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Je peux seulement participer à quelques unes de mes activités à cause de la douleur",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Je peux à peine participer à cause de la douleur au cou",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux pas participer du tout à mes activités de loisir",
                        "value": 5
                  }
            ]
      }
]
  },

  'odi': {
    id: 'odi',
    title: 'Oswestry Disability Index (ODI)',
    description: 'Mesure de l\'impact des douleurs lombaires sur vos activités quotidiennes.',
    estimatedTime: '5-10 min',
    maxScore: 100, // Pourcentage
    questions: [
      {
            "id": "odi1",
            "text": "Intensité de la douleur",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux supporter ma douleur sans prendre de médicaments",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "La douleur est mauvaise mais je la gère sans médicaments",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Les calmants soulagent complètement la douleur",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Les calmants soulagent partiellement la douleur",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Les calmants ont très peu d'effet",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne prends pas de calmants car ils sont inefficaces",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi2",
            "text": "Soins personnels (Se laver, s'habiller etc.)",
            "options": [
                  {
                        "id": "0",
                        "label": "Je me débrouille normalement sans que cela augmente la douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je me débrouille normalement, mais la douleur augmente",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Laver/m'habiller est douloureux et je suis lent(e)",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "J'ai besoin d'aide, mais j'arrive à faire la majorité des choses",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "J'ai besoin d'aide chaque jour pour la plupart des choses",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux pas m'habiller, je me lave avec difficulté et je reste au lit",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi3",
            "text": "Soulever des objets",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux soulever des objets lourds du sol sans douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux soulever des objets lourds, mais cela provoque de la douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "La douleur m'empêche de soulever des objets lourds du sol, mais je peux les soulever s'ils sont sur une table",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "La douleur m'empêche de soulever des objets lourds, mais je peux soulever des objets légers à moyens",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Je ne peux soulever que des objets très légers",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je ne peux rien soulever ni porter",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi4",
            "text": "Marche",
            "options": [
                  {
                        "id": "0",
                        "label": "La douleur ne m'empêche pas de marcher, quelle que soit la distance",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "La douleur m'empêche de marcher plus d'un kilomètre",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "La douleur m'empêche de marcher plus de 500 mètres",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "La douleur m'empêche de marcher plus de 100 mètres",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Je ne peux marcher qu'avec une canne ou des béquilles",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je suis au lit la plupart du temps et je dois ramper pour aller aux toilettes",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi5",
            "text": "Position assise",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux m'asseoir sur n'importe quelle chaise aussi longtemps que je veux",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux m'asseoir sur ma chaise préférée aussi longtemps que je veux",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "La douleur m'empêche de rester assis(e) plus d'une heure",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "La douleur m'empêche de rester assis(e) plus de 30 minutes",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "La douleur m'empêche de rester assis(e) plus de 10 minutes",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "La douleur m'empêche complètement de m'asseoir",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi6",
            "text": "Position debout",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux rester debout aussi longtemps que je veux sans douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux rester debout aussi longtemps que je veux, mais cela augmente la douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "La douleur m'empêche de rester debout plus d'une heure",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "La douleur m'empêche de rester debout plus de 30 minutes",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "La douleur m'empêche de rester debout plus de 10 minutes",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "La douleur m'empêche complètement de rester debout",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi7",
            "text": "Sommeil",
            "options": [
                  {
                        "id": "0",
                        "label": "Mon sommeil n'est jamais perturbé par la douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Mon sommeil est occasionnellement perturbé par la douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "À cause de la douleur, je dors moins de 6 heures",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "À cause de la douleur, je dors moins de 4 heures",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "À cause de la douleur, je dors moins de 2 heures",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "La douleur m'empêche complètement de dormir",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi8",
            "text": "Vie sexuelle (Si applicable)",
            "options": [
                  {
                        "id": "0",
                        "label": "Ma vie sexuelle est normale et n'augmente pas ma douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Ma vie sexuelle est normale mais augmente ma douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Ma vie sexuelle est presque normale mais est très douloureuse",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Ma vie sexuelle est très limitée par la douleur",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Ma vie sexuelle est presque inexistante à cause de la douleur",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "La douleur m'empêche d'avoir une vie sexuelle",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi9",
            "text": "Vie sociale",
            "options": [
                  {
                        "id": "0",
                        "label": "Ma vie sociale est normale et n'augmente pas ma douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Ma vie sociale est normale mais augmente ma douleur",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "La douleur n'a pas d'effet sur ma vie sociale sauf qu'elle limite mes loisirs sportifs",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "La douleur a restreint ma vie sociale et je sors moins souvent",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "La douleur a restreint ma vie sociale à la maison",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "Je n'ai pas de vie sociale à cause de la douleur",
                        "value": 5
                  }
            ]
      },
      {
            "id": "odi10",
            "text": "Voyages et déplacements",
            "options": [
                  {
                        "id": "0",
                        "label": "Je peux voyager n'importe où sans douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Je peux voyager n'importe où mais la douleur augmente",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "La douleur est forte mais je gère des trajets de plus de 2 heures",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "La douleur me limite à des trajets de moins d'une heure",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "La douleur me limite à des trajets courts (moins de 30 minutes)",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "La douleur m'empêche de voyager, sauf pour voir le médecin",
                        "value": 5
                  }
            ]
      }
]
  },

  'spadi': {
    id: 'spadi',
    title: 'Shoulder Pain and Disability Index (SPADI)',
    description: 'Évaluation de la douleur et de l\'incapacité de l\'épaule.',
    estimatedTime: '5 min',
    maxScore: 100, // Pourcentage
    questions: [
      {
            "id": "spadi_p1",
            "text": "Douleur : Au pire (la plus forte)",
            "options": [
                  {
                        "id": "0",
                        "label": "Pas de douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Pire douleur imaginable",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_p2",
            "text": "Douleur : Couché(e) sur l'épaule impliquée",
            "options": [
                  {
                        "id": "0",
                        "label": "Pas de douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Pire douleur imaginable",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_p3",
            "text": "Douleur : En essayant d'atteindre quelque chose sur une étagère haute",
            "options": [
                  {
                        "id": "0",
                        "label": "Pas de douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Pire douleur imaginable",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_p4",
            "text": "Douleur : En touchant l'arrière de votre cou",
            "options": [
                  {
                        "id": "0",
                        "label": "Pas de douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Pire douleur imaginable",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_p5",
            "text": "Douleur : En poussant avec le bras impliqué",
            "options": [
                  {
                        "id": "0",
                        "label": "Pas de douleur",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Pire douleur imaginable",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_f1",
            "text": "Incapacité : Se laver les cheveux",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Si difficile que j'ai besoin d'aide",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_f2",
            "text": "Incapacité : Se laver le dos",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Si difficile que j'ai besoin d'aide",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_f3",
            "text": "Incapacité : Mettre un t-shirt ou un pull",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Si difficile que j'ai besoin d'aide",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_f4",
            "text": "Incapacité : Mettre une chemise avec des boutons devant",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Si difficile que j'ai besoin d'aide",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_f5",
            "text": "Incapacité : Mettre son pantalon",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Si difficile que j'ai besoin d'aide",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_f6",
            "text": "Incapacité : Placer un objet sur une étagère haute",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Si difficile que j'ai besoin d'aide",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_f7",
            "text": "Incapacité : Porter un objet lourd de plus de 4,5 kg (10 lbs)",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Si difficile que j'ai besoin d'aide",
                        "value": 10
                  }
            ]
      },
      {
            "id": "spadi_f8",
            "text": "Incapacité : Sortir quelque chose de la poche arrière de votre pantalon",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "1",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "2",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "3",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "4",
                        "value": 4
                  },
                  {
                        "id": "5",
                        "label": "5",
                        "value": 5
                  },
                  {
                        "id": "6",
                        "label": "6",
                        "value": 6
                  },
                  {
                        "id": "7",
                        "label": "7",
                        "value": 7
                  },
                  {
                        "id": "8",
                        "label": "8",
                        "value": 8
                  },
                  {
                        "id": "9",
                        "label": "9",
                        "value": 9
                  },
                  {
                        "id": "10",
                        "label": "Si difficile que j'ai besoin d'aide",
                        "value": 10
                  }
            ]
      }
]
  },

  'rmdq': {
    id: 'rmdq',
    title: 'Roland-Morris Disability Questionnaire (RMDQ)',
    description: 'Dépistage des limitations biomécaniques induites par la lombalgie.',
    estimatedTime: '5 min',
    maxScore: 24,
    questions: [
      {
            "id": "rmdq1",
            "text": "Je reste à la maison la plupart du temps à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq2",
            "text": "Je change souvent de position pour essayer de soulager mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq3",
            "text": "Je marche plus lentement que d'habitude à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq4",
            "text": "À cause de mon dos, je ne fais aucune des tâches ménagères (ou travaux) que je ferais d'habitude.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq5",
            "text": "À cause de mon dos, j'utilise la rampe pour monter les escaliers.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq6",
            "text": "À cause de mon dos, je m'allonge pour me reposer plus souvent.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq7",
            "text": "À cause de mon dos, je dois m'accrocher à quelque chose pour me lever d'un fauteuil.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq8",
            "text": "À cause de mon dos, j'essaie de demander aux autres de faire les choses pour moi.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq9",
            "text": "Je m'habille plus lentement que d'habitude à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq10",
            "text": "Je reste debout de courtes périodes seulement à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq11",
            "text": "À cause de mon dos, j'essaie d'éviter de me pencher ou de m'agenouiller.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq12",
            "text": "J'ai du mal à me lever d'une chaise à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq13",
            "text": "J'ai mal au dos presque tout le temps.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq14",
            "text": "J'ai du mal à me retourner dans mon lit à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq15",
            "text": "Mon appétit n'est pas très bon à cause de mes douleurs au dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq16",
            "text": "J'ai du mal à mettre mes chaussettes ou mes chaussures à cause de mes douleurs au dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq17",
            "text": "Je marche sur de courtes distances seulement à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq18",
            "text": "Je dors moins bien à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq19",
            "text": "À cause de mon dos, je m'habille avec l'aide de quelqu'un d'autre.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq20",
            "text": "Je reste assis(e) la plus grande partie de la journée à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq21",
            "text": "J'évite de faire de gros travaux à la maison à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq22",
            "text": "À cause de mon dos, je suis plus irritable et de mauvaise humeur avec les autres que d'habitude.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq23",
            "text": "À cause de mon dos, je monte les escaliers plus lentement que d'habitude.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      },
      {
            "id": "rmdq24",
            "text": "Je reste au lit la plupart du temps à cause de mon dos.",
            "options": [
                  {
                        "id": "0",
                        "label": "Non",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Oui",
                        "value": 1
                  }
            ]
      }
]
  },
  
  'hoos': {
    id: 'hoos',
    title: 'HOOS-PS (Hanche)',
    description: 'Évaluation physique courte de la fonction de la hanche.',
    estimatedTime: '2 min',
    maxScore: 100,
    questions: [
      {
            "id": "hoos_ps1",
            "text": "Descendre les escaliers",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "hoos_ps2",
            "text": "Monter et descendre de la douche/baignoire",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "hoos_ps3",
            "text": "S'asseoir et se lever des toilettes",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "hoos_ps4",
            "text": "Faire des travaux ménagers lourds (ex: déplacer des meubles)",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "hoos_ps5",
            "text": "Tourner sur la jambe affectée",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      }
]
  },

  'koos': {
    id: 'koos',
    title: 'KOOS-PS (Genou)',
    description: 'Évaluation physique courte de la fonction du genou.',
    estimatedTime: '2 min',
    maxScore: 100,
    questions: [
      {
            "id": "koos_ps1",
            "text": "Se lever du lit",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "koos_ps2",
            "text": "Mettre ses chaussettes/bas",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "koos_ps3",
            "text": "Se lever d'une chaise",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "koos_ps4",
            "text": "S'accroupir",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "koos_ps5",
            "text": "S'agenouiller",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "koos_ps6",
            "text": "Tourner sur la jambe affectée",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      },
      {
            "id": "koos_ps7",
            "text": "Faire des travaux ménagers lourds",
            "options": [
                  {
                        "id": "0",
                        "label": "Aucune difficulté",
                        "value": 0
                  },
                  {
                        "id": "1",
                        "label": "Légère difficulté",
                        "value": 1
                  },
                  {
                        "id": "2",
                        "label": "Difficulté modérée",
                        "value": 2
                  },
                  {
                        "id": "3",
                        "label": "Difficulté sévère",
                        "value": 3
                  },
                  {
                        "id": "4",
                        "label": "Extrême difficulté / Impossible",
                        "value": 4
                  }
            ]
      }
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
  },

  'quickdash': {
    id: 'quickdash',
    title: 'QuickDASH (Membre Supérieur)',
    description: 'Évaluation des incapacités du bras, de l\'épaule ou de la main.',
    estimatedTime: '3 min',
    maxScore: 100, // Le calcul est un pourcentage
    questions: [
      { id: 'qd1', text: "Ouvrir un bocal neuf ou très serré", options: [
        { id: '1', label: 'Aucune difficulté', value: 1 },
        { id: '2', label: 'Difficulté légère', value: 2 },
        { id: '3', label: 'Difficulté moyenne', value: 3 },
        { id: '4', label: 'Difficulté extrême', value: 4 },
        { id: '5', label: 'Incapable de le faire', value: 5 },
      ]},
      { id: 'qd2', text: "Faire des travaux ménagers lourds (ex: laver les murs, les planchers)", options: [
        { id: '1', label: 'Aucune difficulté', value: 1 },
        { id: '2', label: 'Difficulté légère', value: 2 },
        { id: '3', label: 'Difficulté moyenne', value: 3 },
        { id: '4', label: 'Difficulté extrême', value: 4 },
        { id: '5', label: 'Incapable de le faire', value: 5 },
      ]},
      { id: 'qd3', text: "Au cours de la dernière semaine, à quel point la douleur a-t-elle interféré avec vos activités sociales ?", options: [
        { id: '1', label: 'Pas du tout', value: 1 },
        { id: '2', label: 'Légèrement', value: 2 },
        { id: '3', label: 'Modérément', value: 3 },
        { id: '4', label: 'Beaucoup', value: 4 },
        { id: '5', label: 'Extrêmement', value: 5 },
      ]}
    ]
  },

  'lefs': {
    id: 'lefs',
    title: 'LEFS (Membre Inférieur)',
    description: 'Lower Extremity Functional Scale. Évalue la fonction de la hanche, du genou, de la cheville ou du pied.',
    estimatedTime: '5 min',
    maxScore: 80,
    questions: [
      { id: 'lefs1', text: "Votre travail habituel ou vos tâches ménagères", options: [
        { id: '0', label: 'Difficulté extrême ou incapable', value: 0 },
        { id: '1', label: 'Assez de difficulté', value: 1 },
        { id: '2', label: 'Difficulté modérée', value: 2 },
        { id: '3', label: 'Peu de difficulté', value: 3 },
        { id: '4', label: 'Aucune difficulté', value: 4 },
      ]},
      { id: 'lefs2', text: "S'accroupir", options: [
        { id: '0', label: 'Difficulté extrême ou incapable', value: 0 },
        { id: '1', label: 'Assez de difficulté', value: 1 },
        { id: '2', label: 'Difficulté modérée', value: 2 },
        { id: '3', label: 'Peu de difficulté', value: 3 },
        { id: '4', label: 'Aucune difficulté', value: 4 },
      ]},
      { id: 'lefs3', text: "Marcher entre les pièces de la maison", options: [
        { id: '0', label: 'Difficulté extrême ou incapable', value: 0 },
        { id: '1', label: 'Assez de difficulté', value: 1 },
        { id: '2', label: 'Difficulté modérée', value: 2 },
        { id: '3', label: 'Peu de difficulté', value: 3 },
        { id: '4', label: 'Aucune difficulté', value: 4 },
      ]}
    ]
  }
};

export const questionnaires = Object.values(QUESTIONNAIRES);
