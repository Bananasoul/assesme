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
  mcid?: number;
  higherIsBetter?: boolean;
  tags?: string[];
  
  // Nouveaux champs cliniques
  validated?: boolean;
  bodyPart?: string;
  category?: 'Orthopédique' | 'Neurologique' | 'Général';
  administrationType?: 'auto' | 'therapist' | 'both';
  
  clinicalValue?: string;
  decisionAlgorithm?: string;
  
  therapeuticInterventions?: {
    exercises: string[];
    education: string[];
  };

  references?: {
    title: string;
    url?: string;
    type: 'methodology' | 'scientific_article';
  }[];

  questions: Question[];
};

export const QUESTIONNAIRES: Record<string, QuestionnaireDef> = {
  'tampa': {
    id: 'tampa',
    title: 'Échelle de TAMPA (Kinésiophobie)',
    description: 'Ce questionnaire évalue la peur du mouvement ou d\'une nouvelle blessure.',
    estimatedTime: '5 min',
    maxScore: 68,
    mcid: 5,
    higherIsBetter: false,
    tags: ['Orthopédique', 'Général'],
    validated: true,
    bodyPart: 'Général',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Le score de Tampa (TSK) est fondamental pour évaluer la kinésiophobie (peur du mouvement) chez les patients souffrant de douleurs musculo-squelettiques chroniques, particulièrement lombaires. Il permet de distinguer un patient dont la limitation est purement mécanique d\'un patient bloqué par des appréhensions psychologiques.',
    decisionAlgorithm: 'Score > 37 : Kinésiophobie élevée (Drapeau Jaune). Le traitement direct de la mécanique (ex: renforcement intensif immédiat) risque d\'échouer ou d\'aggraver la douleur. Score < 37 : Faible kinésiophobie, approche mécanique classique recommandée.',
    therapeuticInterventions: {
      exercises: [
        'Exposition graduelle au mouvement redouté (Graded Exposure)',
        'Exercices de mobilité à faible charge (ex: bascule du bassin) pour rassurer le système nerveux'
      ],
      education: [
        'Éducation aux neurosciences de la douleur (Expliquer que Douleur ≠ Lésion)',
        'Désensibilisation verbale et encouragement positif lors des mouvements'
      ]
    },
    references: [
      {
        title: 'The Tampa Scale for Kinesiophobia: further examination of psychometric properties',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15324776/',
        type: 'scientific_article'
      }
    ],
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
    mcid: 2,
    higherIsBetter: false,
    tags: ['Orthopédique', 'Lombaire'],
    validated: true,
    bodyPart: 'Lombaire',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Le STarT Back Tool est le premier test à réaliser face à une lombalgie récente. Il stratifie instantanément les patients en fonction de leur pronostic de chronicité. Il permet d\'allouer les bonnes ressources au bon patient, évitant la sur-médicalisation des cas simples et la sous-médicalisation des cas complexes.',
    decisionAlgorithm: 'Bas risque (Total < 4) : Excellente évolution naturelle. Moyen risque (Total >= 4, sous-score psy <= 3) : Risque de chronicité modéré, nécessite une thérapie physique standard. Haut risque (Sous-score psy >= 4) : Fort risque de chronicité psycho-sociale, nécessite une approche Cognitive-Comportementale (CBT) couplée à la kinésithérapie.',
    therapeuticInterventions: {
      exercises: [
        'Bas risque : Reprise normale des activités physiques',
        'Haut risque : Exercices de confiance et thérapie cognitivo-comportementale'
      ],
      education: [
        'Bas risque : Rassurance et encouragement à bouger',
        'Haut risque : Gestion du stress et orientation vers un psychologue si nécessaire'
      ]
    },
    references: [
      {
        title: 'Subgrouping patients with low back pain in primary care: STarT Back Tool',
        type: 'methodology'
      }
    ],
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
    mcid: 10,
    higherIsBetter: false,
    tags: ['Orthopédique', 'Cervical'],
    validated: true,
    bodyPart: 'Cervical',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Le NDI est le standard de référence pour évaluer l\'impact des cervicalgies sur les activités de la vie quotidienne. Il est très sensible aux changements cliniques, idéal pour objectiver l\'efficacité de vos traitements.',
    decisionAlgorithm: '0-8% : Aucune incapacité. 10-28% : Légère (Traitement conservateur simple). 30-48% : Modérée. 50-68% : Sévère (Évaluer les signes neurologiques périphériques). 70-100% : Complète (Avis médical urgent, suspicion de compression radiculaire ou myélopathie).',
    therapeuticInterventions: {
      exercises: [
        'Renforcement des fléchisseurs profonds du cou (Cervical Cranial Flexion Test)',
        'Renforcement des stabilisateurs scapulaires (Trapèzes inférieur/moyen, Rhomboïdes)'
      ],
      education: [
        'Ergonomie du poste de travail (hauteur de l\'écran, accoudoirs)',
        'Gestion des postures statiques prolongées'
      ]
    },
    references: [
      {
        title: 'The Neck Disability Index: a study of reliability and validity',
        type: 'scientific_article'
      }
    ],
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
    mcid: 10,
    higherIsBetter: false,
    tags: ['Orthopédique', 'Lombaire'],
    validated: true,
    bodyPart: 'Lombaire',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'L\'ODI est l\'outil orthopédique de référence pour la lombalgie sévère. Il évalue spécifiquement comment la douleur lombaire ou sciatique affecte la capacité du patient à gérer sa vie quotidienne (soins personnels, levage, marche, sommeil).',
    decisionAlgorithm: '0-20% : Incapacité minime (Rassurance, conseils). 21-40% : Modérée (Kinésithérapie active). 41-60% : Sévère (La douleur domine la vie du patient, investigation approfondie nécessaire). > 60% : Très sévère à Handicapé (Intervention médicale ou chirurgicale souvent envisagée).',
    therapeuticInterventions: {
      exercises: [
        'Approche directionnelle de McKenzie (si centralisation de la douleur)',
        'Contrôle moteur lombo-pelvien (transverse de l\'abdomen, multifides)'
      ],
      education: [
        'Apprentissage du verrouillage lombaire lors des efforts (Hip Hinge)',
        'Hygiène du sommeil (coussins entre les genoux en décubitus latéral)'
      ]
    },
    references: [
      {
        title: 'The Oswestry Disability Index',
        type: 'scientific_article'
      }
    ],
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
    mcid: 8,
    higherIsBetter: false,
    tags: ['Orthopédique', 'Épaule'],
    validated: true,
    bodyPart: 'Épaule',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Le SPADI divise ses scores en Douleur (5 items) et Incapacité (8 items). C\'est le test le plus complet pour le syndrome sous-acromial, les ruptures de coiffe et les capsulites rétractiles.',
    decisionAlgorithm: 'Un ratio Douleur > Incapacité suggère une pathologie très irritative (ex: tendinopathie calcifiante aiguë, phase chaude de capsulite) nécessitant une modulation de la douleur. Un ratio Incapacité > Douleur oriente vers un déficit de force, de contrôle moteur ou une raideur structurelle nécessitant de la charge mécanique.',
    therapeuticInterventions: {
      exercises: [
        'Si très douloureux : Isométrique de la coiffe des rotateurs en position neutre',
        'Si peu douloureux : Travail excentrique lourd et contrôle de la dyskinésie scapulaire'
      ],
      education: [
        'Évitement temporaire des élévations soutenues au-dessus de 90°',
        'Correction des postures d\'enroulement des épaules'
      ]
    },
    references: [{ title: 'The Shoulder Pain and Disability Index: The Construct Validity and Responsiveness', type: 'scientific_article' }],
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
    mcid: 4,
    higherIsBetter: false,
    tags: ['Orthopédique', 'Lombaire'],
    validated: true,
    bodyPart: 'Lombaire',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Contrairement à l\'ODI (qui vise les cas sévères), le RMDQ est idéal pour la lombalgie aiguë ou légère à modérée. Ses questions courtes avec des réponses Oui/Non le rendent très rapide et facile à comprendre pour les patients.',
    decisionAlgorithm: 'Score < 4 : Limitations mineures. 4-11 : Limitations modérées. > 11 : Limitations sévères. Un changement clinique pertinent (MCID) correspond à une évolution de 30% du score initial ou de 4 à 5 points.',
    therapeuticInterventions: {
      exercises: [
        'Mobilisation douce type Chat-Chameau (Cat-Camel)',
        'Reprise progressive de la marche fractionnée'
      ],
      education: [
        'Pacing : Alterner les périodes d\'activité et de repos avant l\'apparition de la douleur',
        'Promotion du mouvement comme solution antalgique'
      ]
    },
    references: [{ title: 'A study of the natural history of back pain', type: 'scientific_article' }],
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
    mcid: 9,
    higherIsBetter: true,
    tags: ['Orthopédique', 'Hanche'],
    validated: true,
    bodyPart: 'Hanche',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Le HOOS-PS est essentiel pour détecter, évaluer et suivre la coxarthrose (arthrose de la hanche) ou les conflits fémoro-acétabulaires. Il guide la décision entre un traitement conservateur et une orientation chirurgicale (Prothèse Totale de Hanche).',
    decisionAlgorithm: 'Un score global bas avec de fortes limitations sur les items de flexion (s\'asseoir/mettre ses chaussettes) est typique d\'une coxarthrose avancée. Une non-amélioration après 3 mois de traitement conservateur bien conduit justifie un avis chirurgical.',
    therapeuticInterventions: {
      exercises: [
        'Renforcement des abducteurs (Moyen fessier) pour stabiliser le bassin à la marche',
        'Traction manuelle coxo-fémorale pour la modulation de la douleur'
      ],
      education: [
        'Conseils diététiques si surpoids (réduction des contraintes mécaniques)',
        'Utilisation précoce d\'une canne du côté opposé pour décharger l\'articulation'
      ]
    },
    references: [{ title: 'Hip disability and osteoarthritis outcome score (HOOS)', type: 'scientific_article' }],
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
    mcid: 9,
    higherIsBetter: true,
    tags: ['Orthopédique', 'Genou'],
    validated: true,
    bodyPart: 'Genou',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Le KOOS-PS est incontournable pour la gonarthrose, les syndromes fémoro-patellaires et les suites de lésions méniscales ou ligamentaires. Il est très réactif aux gains de la rééducation fonctionnelle.',
    decisionAlgorithm: 'Identifie les déficits spécifiques : difficulté aux escaliers = probable déficit ou inhibition du quadriceps / problème fémoro-patellaire. Difficulté aux torsions = instabilité ligamentaire ou lésion méniscale. Gain clinique significatif (MCID) = 8 à 10 points.',
    therapeuticInterventions: {
      exercises: [
        'Renforcement isométrique et isotonique du quadriceps (ex: presse oblique, leg extension sécurisé)',
        'Entraînement proprioceptif et pliométrique (si jeune et sportif)'
      ],
      education: [
        'Modification des activités (ex: éviter temporairement la brasse en natation)',
        'Optimisation de la cadence en course à pied pour réduire les chocs'
      ]
    },
    references: [{ title: 'Knee injury and Osteoarthritis Outcome Score (KOOS)', type: 'scientific_article' }],
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
    tags: ['Psychologique', 'Général'],
    validated: true,
    bodyPart: 'Général',
    category: 'Général',
    administrationType: 'auto',
    clinicalValue: 'Bien que l\'on soit kinésithérapeute, le dépistage de l\'état psychologique est crucial. L\'anxiété et la dépression amplifient le signal nociceptif (douleur) et réduisent drastiquement l\'observance aux exercices de rééducation.',
    decisionAlgorithm: 'Sous-score Anxiété (A) ou Dépression (D) : 0-7 = Normal. 8-10 = Limite / À surveiller. 11-21 = Problème clinique probable. Un score >= 11 dans l\'une des catégories justifie une communication transparente avec le patient et une réorientation vers son médecin traitant ou un psychologue.',
    therapeuticInterventions: {
      exercises: [
        'Activité physique aérobie d\'intensité modérée (30 min/jour) pour stimuler les endorphines',
        'Techniques de respiration diaphragmatique ou pleine conscience (mindfulness)'
      ],
      education: [
        'Explication claire du modèle bio-psycho-social de la douleur',
        'Déculpabilisation du patient face à son ressenti'
      ]
    },
    references: [{ title: 'The Hospital Anxiety and Depression Scale', type: 'scientific_article' }],
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
    tags: ['Orthopédique', 'Membre Supérieur'],
    validated: true,
    bodyPart: 'Membre Sup.',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Le QuickDASH est le test le plus performant pour l\'ensemble du membre supérieur, car le bras, l\'épaule et la main travaillent toujours ensemble (chaîne cinétique). Idéal pour les troubles musculo-squelettiques (TMS) professionnels.',
    decisionAlgorithm: 'Le score est calculé sur 100 (pire état). Un score élevé avec des difficultés de force (ex: ouvrir un bocal) oriente vers une pathologie distale (tendinopathie du poignet/coude, canal carpien). Un score élevé sur les tâches amples oriente vers l\'épaule. MCID : 14 points.',
    therapeuticInterventions: {
      exercises: [
        'Renforcement global de la chaîne de poussée et de tirage',
        'Travail de la dextérité fine et de la force de poigne (grip strength)'
      ],
      education: [
        'Adaptation ergonomique complète du poste de travail (clavier, souris)',
        'Gestion de la charge d\'entraînement pour les sportifs (tennis, escalade)'
      ]
    },
    references: [{ title: 'Development of the QuickDASH', type: 'scientific_article' }],
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
    tags: ['Orthopédique', 'Membre Inférieur'],
    validated: true,
    bodyPart: 'Membre Inf.',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Le LEFS offre une vision globale de la fonction du membre inférieur. Son grand avantage est sa validité sur une multitude de pathologies : entorse de cheville, fasciite plantaire, tendinopathie rotulienne, etc.',
    decisionAlgorithm: 'Score sur 80 (80 = fonction parfaite). Un score bas (<40) nécessite l\'utilisation d\'aides techniques et un travail en chaîne ouverte. Un score élevé (>60) indique que le patient est prêt pour des exercices fonctionnels avancés (sauts, course, changements de direction).',
    therapeuticInterventions: {
      exercises: [
        'Progression des charges : chaîne cinétique ouverte vers fermée',
        'Entraînement de la triple flexion/extension (cheville, genou, hanche)'
      ],
      education: [
        'Conseils sur le choix du chaussage adapté à la pathologie',
        'Prévention des récidives par un programme d\'échauffement'
      ]
    },
    references: [{ title: 'The Lower Extremity Functional Scale', type: 'scientific_article' }],
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
  },

  'mrs': {
    id: 'mrs',
    title: 'Modified Rankin Scale (mRS)',
    description: 'Évaluation du degré de handicap ou de dépendance dans les activités quotidiennes (AVC/Neuro).',
    estimatedTime: '1 min',
    maxScore: 6,
    higherIsBetter: false,
    tags: ['Neurologique', 'Post-AVC'],
    validated: true,
    bodyPart: 'Général',
    category: 'Neurologique',
    administrationType: 'therapist',
    clinicalValue: 'La Modified Rankin Scale (mRS) est l\'échelle universelle en neurologie pour quantifier le handicap global post-AVC. Elle sert de boussole pour fixer les objectifs de rééducation : vise-t-on le retour à l\'emploi ou la sécurisation des transferts à domicile ?',
    decisionAlgorithm: 'Score 0-1 : Excellent pronostic, retour à une vie normale. Score 2-3 : Indépendance possible pour la marche, mais handicap limitant le travail. Cible la rééducation à la marche et l\'équilibre. Score 4-5 : Dépendance sévère. La priorité est la prévention des complications de décubitus, la verticalisation et l\'aide aux aidants familiaux.',
    therapeuticInterventions: {
      exercises: [
        'Rééducation neurologique orientée sur la tâche (Task-oriented training)',
        'Stimulation motrice précoce et apprentissage des transferts lit-fauteuil'
      ],
      education: [
        'Formation des aidants proches à la manutention',
        'Conseils sur l\'adaptation stricte du lieu de vie (salle de bain, lits médicalisés)'
      ]
    },
    references: [{ title: 'The Modified Rankin Scale in Acute Stroke Trials', type: 'scientific_article', url: 'https://pubmed.ncbi.nlm.nih.gov/' }],
    questions: [
      { id: 'mrs1', text: "Sélectionnez le niveau de handicap du patient :", options: [
        { id: '0', label: '0 - Aucun symptôme du tout', value: 0 },
        { id: '1', label: '1 - Symptômes mineurs (aucune incapacité significative)', value: 1 },
        { id: '2', label: '2 - Incapacité légère (incapable de faire toutes ses activités, mais indépendant)', value: 2 },
        { id: '3', label: '3 - Incapacité modérée (nécessite un peu d\'aide, mais marche sans assistance)', value: 3 },
        { id: '4', label: '4 - Incapacité modérément sévère (incapable de marcher seul ou de s\'occuper de ses besoins)', value: 4 },
        { id: '5', label: '5 - Incapacité sévère (alité, incontinent et nécessitant des soins constants)', value: 5 },
        { id: '6', label: '6 - Décès', value: 6 }
      ]}
    ]
  },

  'bbs': {
    id: 'bbs',
    title: 'Berg Balance Scale (BBS)',
    description: 'Évaluation de l\'équilibre statique et dynamique et du risque de chute.',
    estimatedTime: '15 min',
    maxScore: 56,
    higherIsBetter: true,
    tags: ['Neurologique', 'Gériatrique', 'Équilibre'],
    validated: true,
    bodyPart: 'Général',
    category: 'Neurologique',
    administrationType: 'therapist',
    clinicalValue: 'La Berg Balance Scale (BBS) est le gold-standard pour l\'équilibre statique et dynamique. C\'est l\'outil le plus précis pour évaluer objectivement le risque de chute chez la personne âgée ou souffrant de troubles neurologiques.',
    decisionAlgorithm: 'Score < 45/56 : Le patient a un risque de chute avéré. La prescription d\'une aide à la marche (canne, déambulateur) est fortement recommandée. La rééducation doit cibler l\'équilibre. Score > 45 : Risque faible, on peut se concentrer sur l\'endurance et la force globale.',
    therapeuticInterventions: {
      exercises: [
        'Parcours d\'équilibre avec franchissement d\'obstacles',
        'Réduction de la base de sustentation (tandem, unipodal) sous supervision sécurisée'
      ],
      education: [
        'Retrait absolu des tapis glissants et fils électriques au sol',
        'Apprentissage de la manœuvre de relevé du sol en cas de chute'
      ]
    },
    references: [{ title: 'Measuring balance in the elderly: validation of an instrument', type: 'scientific_article' }],
    questions: [
      { id: 'bbs1', text: "1. De la position assise à debout", options: [
        { id: '4', label: '4 - Se lève sans utiliser ses mains et se stabilise seul', value: 4 },
        { id: '3', label: '3 - Se lève en utilisant ses mains pour s\'aider', value: 3 },
        { id: '2', label: '2 - Se lève en utilisant ses mains après plusieurs essais', value: 2 },
        { id: '1', label: '1 - Nécessite une assistance minimale', value: 1 },
        { id: '0', label: '0 - Nécessite une assistance modérée ou majeure', value: 0 },
      ]},
      { id: 'bbs2', text: "2. Tenir debout sans appui (2 minutes)", options: [
        { id: '4', label: '4 - Tient en sécurité pendant 2 min', value: 4 },
        { id: '3', label: '3 - Tient en sécurité pendant 2 min avec supervision', value: 3 },
        { id: '2', label: '2 - Tient 30 secondes', value: 2 },
        { id: '1', label: '1 - Nécessite plusieurs essais pour tenir 30s', value: 1 },
        { id: '0', label: '0 - Incapable de se tenir debout 30s sans assistance', value: 0 },
      ]},
      { id: 'bbs3', text: "3. Assis sans appui dos ni bras (2 minutes)", options: [
        { id: '4', label: '4 - Tient en sécurité et fermement pendant 2 min', value: 4 },
        { id: '3', label: '3 - Tient 2 min sous supervision', value: 3 },
        { id: '2', label: '2 - Tient 30 secondes', value: 2 },
        { id: '1', label: '1 - Tient 10 secondes', value: 1 },
        { id: '0', label: '0 - Incapable de tenir sans assistance', value: 0 },
      ]},
      { id: 'bbs4', text: "4. De debout à assis", options: [
        { id: '4', label: '4 - S\'assied en sécurité avec un minimum d\'utilisation des mains', value: 4 },
        { id: '3', label: '3 - Contrôle la descente à l\'aide des mains', value: 3 },
        { id: '2', label: '2 - Utilise l\'arrière des jambes contre la chaise', value: 2 },
        { id: '1', label: '1 - S\'assied de façon indépendante mais sans contrôle', value: 1 },
        { id: '0', label: '0 - A besoin d\'aide pour s\'asseoir', value: 0 },
      ]}
    ]
  },

  'dhi': {
    id: 'dhi',
    title: 'Dizziness Handicap Inventory (DHI)',
    description: 'Évaluation de l\'impact des vertiges ou troubles de l\'équilibre sur la vie quotidienne.',
    estimatedTime: '5 min',
    maxScore: 100,
    higherIsBetter: false,
    tags: ['Vestibulaire', 'Neurologique'],
    validated: true,
    bodyPart: 'Général',
    category: 'Neurologique',
    administrationType: 'auto',
    clinicalValue: 'Le DHI est essentiel en rééducation vestibulaire. Il quantifie l\'impact physique, émotionnel et fonctionnel des vertiges et de l\'instabilité (ex: VPPB, névrite vestibulaire, maladie de Menière).',
    decisionAlgorithm: '16-34 : Léger. 36-52 : Modéré. > 54 : Sévère. Un sous-score physique élevé indique que les vertiges sont déclenchés par les mouvements de tête (typique du VPPB). Un sous-score émotionnel élevé nécessite de rassurer le patient sur la nature bénigne de son vertige.',
    therapeuticInterventions: {
      exercises: ['Rééducation vestibulaire (habituation, manœuvres)', 'Adaptation oculomotrice'],
      education: ['Gestion de l\'anxiété liée aux vertiges', 'Mouvements cervicaux contrôlés']
    },
    references: [{ title: 'The development of the Dizziness Handicap Inventory', type: 'scientific_article' }],
    questions: [
      { id: 'dhi1', text: "Le fait de regarder en l'air augmente-t-il votre problème ?", options: [
        { id: '0', label: 'Non', value: 0 },
        { id: '2', label: 'Parfois', value: 2 },
        { id: '4', label: 'Oui', value: 4 },
      ]},
      { id: 'dhi2', text: "A cause de votre problème, vous sentez-vous frustré(e) ?", options: [
        { id: '0', label: 'Non', value: 0 },
        { id: '2', label: 'Parfois', value: 2 },
        { id: '4', label: 'Oui', value: 4 },
      ]},
      { id: 'dhi3', text: "A cause de votre problème, limitez-vous vos déplacements pour des raisons professionnelles ou personnelles ?", options: [
        { id: '0', label: 'Non', value: 0 },
        { id: '2', label: 'Parfois', value: 2 },
        { id: '4', label: 'Oui', value: 4 },
      ]}
    ]
  }
,

  'visa-a': {
    id: 'visa-a',
    title: 'VISA-A (Victorian Institute of Sport Assessment - Achilles)',
    description: 'Évaluation clinique spécifique de la sévérité de la tendinopathie d\'Achille.',
    tags: ['Orthopédique', 'Membre Inférieur', 'Tendon', 'Achille'],
    estimatedTime: '3-5 min',
    administrationType: 'auto',
    maxScore: 100,
    clinicalValue: 'Le VISA-A est le test validé de référence pour évaluer la douleur et la fonction dans la tendinopathie d\'Achille. Il est essentiel pour déterminer la tolérance à la charge du tendon et guider la progression de la rééducation (isométrique -> isotonique lourd -> pliométrique).',
    decisionAlgorithm: 'Score < 50 : Tendinopathie sévère ou très réactive. Repos relatif, gestion de la charge et isométrique prioritaire. Score 50-80 : Tendinopathie modérée, phase de renforcement lourd lent (HSR) indiquée. Score > 80 : Reprise progressive des activités pliométriques et sportives (Energy Storage Phase). MCID: 10-12 points.',
    therapeuticInterventions: {
      exercises: [
        'Phase aiguë : Exercices isométriques du triceps sural (ex: maintien sur pointe de pied 5x45s)',
        'Phase de renforcement : Heavy Slow Resistance (HSR) training - presse, mollets debout/assis avec charge lourde (3-4 sec montée, 3-4 sec descente)',
        'Phase de retour au sport : Pliométrie (sauts à la corde, drop jumps)'
      ],
      education: [
        'Explication du modèle du continuum de la pathologie tendineuse (Cook & Purdam)',
        'Gestion stricte de la charge : la douleur est autorisée jusqu\'à 4/10 pendant l\'exercice si elle redescend dans les 24h'
      ]
    },
    references: [
      {
        title: 'The VISA-A questionnaire: a valid and reliable index of the clinical severity of Achilles tendinopathy',
        url: 'https://pubmed.ncbi.nlm.nih.gov/11533405/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'Combien de minutes êtes-vous raide au réveil ?',
        options: [
          { id: '0', label: '0 min', value: 10 },
          { id: '1', label: '0-10 min', value: 7 },
          { id: '2', label: '10-30 min', value: 4 },
          { id: '3', label: '> 100 min', value: 0 }
        ]
      },
      {
        id: 'q2',
        text: 'Avez-vous mal en vous étirant fort le tendon d\'Achille au bord d\'une marche ?',
        options: [
          { id: '0', label: 'Douleur forte', value: 0 },
          { id: '1', label: 'Douleur modérée', value: 3 },
          { id: '2', label: 'Douleur légère', value: 7 },
          { id: '3', label: 'Aucune douleur', value: 10 }
        ]
      }
    ]
  },
  'visa-p': {
    id: 'visa-p',
    title: 'VISA-P (Victorian Institute of Sport Assessment - Patella)',
    description: 'Évaluation clinique de la tendinopathie rotulienne (Jumper\'s Knee).',
    tags: ['Orthopédique', 'Genou', 'Tendon', 'Sport'],
    estimatedTime: '3-5 min',
    administrationType: 'auto',
    maxScore: 100,
    clinicalValue: 'Le VISA-P est spécifiquement conçu pour quantifier la douleur et l\'incapacité liées au tendon rotulien, pathologie très fréquente dans les sports de saut (basket, volley). Il permet de dicter le timing de réintroduction des sauts.',
    decisionAlgorithm: 'Score < 50 : Douleur limitant fortement l\'activité. Isométrique de type leg extension (45s) pour l\'effet analgésique cortical. Score 50-80 : Phase de renforcement lourd (Squat décliné, leg press lourd lent). Score > 80 : Introduction des tâches d\'accumulation d\'énergie (sauts, changements de direction rapides).',
    therapeuticInterventions: {
      exercises: [
        'Isométrique : Leg extension unilatéral à 60° de flexion (4x45s) pour réduire la douleur aiguë',
        'Isotonique : Squat sur plan incliné (Decline Squat) en excentrique lourd ou Heavy Slow Resistance (HSR)',
        'Retour au sport : Exercices de décélération et sauts (Drop jumps, Box jumps)'
      ],
      education: [
        'Gestion de la charge (Load Management) : éviter les pics d\'entraînement soudains',
        'Explication que les étirements passifs du quadriceps peuvent compresser le tendon rotulien et aggraver l\'irritation en phase aiguë'
      ]
    },
    references: [
      {
        title: 'The VISA score: an index of severity of symptoms in patients with jumper\'s knee (patellar tendinosis)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/9536867/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'Avez-vous mal au tendon en descendant les escaliers ?',
        options: [
          { id: '0', label: 'Douleur intense', value: 0 },
          { id: '1', label: 'Douleur modérée', value: 3 },
          { id: '2', label: 'Douleur légère', value: 7 },
          { id: '3', label: 'Aucune douleur', value: 10 }
        ]
      }
    ]
  },
  'tug': {
    id: 'tug',
    title: 'TUG (Timed Up and Go)',
    description: 'Évaluation clinique rapide de la mobilité, de l\'équilibre et du risque de chute.',
    tags: ['Neurologique', 'Gériatrie', 'Équilibre'],
    estimatedTime: '2 min',
    administrationType: 'therapist',
    maxScore: 60,
    clinicalValue: 'Le TUG est un test physique essentiel (à chronométrer par le thérapeute). Le patient part assis d\'une chaise avec accoudoirs, se lève, marche 3 mètres, fait demi-tour, revient et s\'assoit. Il évalue la force des jambes, l\'équilibre dynamique et la vitesse de marche en une seule tâche écologique.',
    decisionAlgorithm: '< 10 secondes : Mobilité normale. 10 - 19 secondes : Mobilité légèrement altérée. 20 - 29 secondes : Mobilité réduite, risque de chute avéré (une aide à la marche doit être envisagée). >= 30 secondes : Mobilité très réduite, dépendance pour de nombreuses ADL (activités de la vie quotidienne).',
    therapeuticInterventions: {
      exercises: [
        'Renforcement de la triple extension (Sit-to-stand répétitifs)',
        'Travail de l\'équilibre dynamique et de la vitesse de marche',
        'Exercices de transfert de poids et de pivot'
      ],
      education: [
        'Conseils sur l\'utilisation d\'une aide à la marche (canne, déambulateur)',
        'Aménagement du domicile pour prévenir les chutes (retrait des tapis, bon éclairage)'
      ]
    },
    references: [
      {
        title: 'The Timed "Up & Go": a test of basic functional mobility for frail elderly persons',
        url: 'https://pubmed.ncbi.nlm.nih.gov/1991946/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'Temps mis pour réaliser le test (en secondes)',
        options: [
          { id: '0', label: 'Moins de 10 secondes (Mobilité normale)', value: 0 },
          { id: '1', label: '10-19 secondes (Légèrement altérée)', value: 1 },
          { id: '2', label: '20-29 secondes (Risque de chute)', value: 2 },
          { id: '3', label: '30 secondes ou plus (Mobilité très réduite)', value: 3 }
        ]
      }
    ]
  },
  'fabq': {
    id: 'fabq',
    title: 'FABQ (Fear-Avoidance Beliefs Questionnaire)',
    description: 'Évalue comment les croyances de peur et d\'évitement affectent le comportement face à la douleur lombaire.',
    tags: ['Lombaire', 'Psychologique', 'Général'],
    estimatedTime: '5-7 min',
    administrationType: 'auto',
    maxScore: 96,
    clinicalValue: 'Le FABQ est essentiel pour détecter les patients lombalgiques qui développent une phobie du mouvement (kinesiophobie). Il comprend 2 sous-échelles : FABQ-Physique et FABQ-Travail. Il explique souvent pourquoi un traitement purement biomécanique échoue si les croyances ne sont pas adressées.',
    decisionAlgorithm: 'FABQ-Physique > 14 (sur 24) : Forte peur liée à l\'activité physique. Une exposition graduelle est nécessaire. FABQ-Travail > 34 (sur 42) : Fort risque de non-retour au travail (indicateur pronostique majeur d\'invalidité prolongée). L\'éducation aux neurosciences de la douleur est prioritaire.',
    therapeuticInterventions: {
      exercises: [
        'Graded Exposure (Exposition graduelle) : réintroduire le mouvement redouté par petites doses sécurisantes',
        'Activités générales ludiques non associées à la douleur pour briser l\'association cognitive'
      ],
      education: [
        'Éducation aux neurosciences : Douleur ≠ Dommage tissulaire',
        'Changer le vocabulaire (éviter les termes comme "déchirure", "usure", "disque usé") par des termes rassurants'
      ]
    },
    references: [
      {
        title: 'A questionnaire on the perceptions of patients about physical activity and work',
        url: 'https://pubmed.ncbi.nlm.nih.gov/8422742/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'Je ne devrais pas faire d\'activités physiques qui pourraient aggraver ma douleur.',
        options: [
          { id: '0', label: 'Pas du tout d\'accord', value: 0 },
          { id: '1', label: 'Plutôt pas d\'accord', value: 2 },
          { id: '2', label: 'Indécis', value: 3 },
          { id: '3', label: 'Plutôt d\'accord', value: 4 },
          { id: '4', label: 'Tout à fait d\'accord', value: 6 }
        ]
      }
    ]
  },
  'psfs': {
    id: 'psfs',
    title: 'PSFS (Patient-Specific Functional Scale)',
    description: 'Échelle fonctionnelle spécifique au patient. Le patient choisit lui-même 3 activités problématiques.',
    tags: ['Général', 'Fonctionnel'],
    estimatedTime: '3 min',
    administrationType: 'therapist',
    maxScore: 10,
    clinicalValue: 'C\'est l\'outil le plus centré sur le patient. Au lieu d\'imposer des questions standardisées qui peuvent ne pas concerner le patient, celui-ci identifie 3 à 5 activités importantes pour LUI qu\'il ne peut plus faire ou qui sont difficiles (ex: jouer du violon, porter son petit-fils).',
    decisionAlgorithm: 'Un score bas définit les objectifs prioritaires de la rééducation. Le PSFS est extrêmement réactif au changement clinique. Un gain de 2 points sur l\'échelle de 10 est considéré comme un changement cliniquement significatif (MCID) validant l\'efficacité de votre traitement.',
    therapeuticInterventions: {
      exercises: [
        'Exercices ciblant spécifiquement la biomécanique ou la capacité physiologique de l\'activité choisie par le patient',
        'Décomposition de la tâche (Task breakdown) : s\'entraîner sur des sous-composantes de l\'activité'
      ],
      education: [
        'Utilisation de l\'activité choisie comme motivation principale (Goal-setting)',
        'Gestion des attentes concernant le délai de retour à l\'activité complète'
      ]
    },
    references: [
      {
        title: 'The patient-specific functional scale: pharmacokinetics and clinimetric properties',
        url: 'https://pubmed.ncbi.nlm.nih.gov/8290618/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'Niveau de difficulté pour l\'activité 1 choisie par le patient',
        options: [
          { id: '0', label: 'Impossible (0)', value: 0 },
          { id: '1', label: 'Très difficile (2)', value: 2 },
          { id: '2', label: 'Difficile (4)', value: 4 },
          { id: '3', label: 'Modérément difficile (6)', value: 6 },
          { id: '4', label: 'Légèrement difficile (8)', value: 8 },
          { id: '5', label: 'Comme avant (10)', value: 10 }
        ]
      },
      {
        id: 'q2',
        text: 'Niveau de difficulté pour l\'activité 2 choisie par le patient',
        options: [
          { id: '0', label: 'Impossible (0)', value: 0 },
          { id: '1', label: 'Très difficile (2)', value: 2 },
          { id: '2', label: 'Difficile (4)', value: 4 },
          { id: '3', label: 'Modérément difficile (6)', value: 6 },
          { id: '4', label: 'Légèrement difficile (8)', value: 8 },
          { id: '5', label: 'Comme avant (10)', value: 10 }
        ]
      },
      {
        id: 'q3',
        text: 'Niveau de difficulté pour l\'activité 3 choisie par le patient',
        options: [
          { id: '0', label: 'Impossible (0)', value: 0 },
          { id: '1', label: 'Très difficile (2)', value: 2 },
          { id: '2', label: 'Difficile (4)', value: 4 },
          { id: '3', label: 'Modérément difficile (6)', value: 6 },
          { id: '4', label: 'Légèrement difficile (8)', value: 8 },
          { id: '5', label: 'Comme avant (10)', value: 10 }
        ]
      }
    ]
  },

  // ============================================================
  // NPRS — Numeric Pain Rating Scale
  // ============================================================
  'nprs': {
    id: 'nprs',
    title: 'NPRS (Numeric Pain Rating Scale)',
    description: 'Évaluation simple et rapide de l\'intensité douloureuse sur une échelle 0–10.',
    estimatedTime: '30 sec',
    maxScore: 10,
    mcid: 2,
    higherIsBetter: false,
    tags: ['Général', 'Douleur'],
    validated: true,
    bodyPart: 'Général',
    category: 'Général',
    administrationType: 'auto',
    clinicalValue: 'Outil universel d\'évaluation de l\'intensité douloureuse. Plus fiable et plus rapide que l\'EVA, recommandé par l\'IMMPACT pour le suivi de toute douleur chronique. Doit être complété systématiquement à chaque consultation comme indicateur principal de douleur.',
    decisionAlgorithm: 'Score 0–3 : douleur légère, pas d\'antalgique requis, rééducation active possible. Score 4–6 : douleur modérée, adaptation du dosage, antalgiques au besoin. Score 7–10 : douleur sévère, prioriser le contrôle de la douleur avant la mise en charge. Un changement ≥ 2 points = cliniquement significatif.',
    therapeuticInterventions: {
      exercises: [
        'Adaptation immédiate du dosage (nombre de répétitions, charge) selon le ressenti',
        'TENS, thermothérapie ou techniques manuelles si NPRS ≥ 7 avant la séance'
      ],
      education: [
        'Apprendre au patient à coter sa douleur avant / pendant / après l\'exercice',
        'Différencier "douleur acceptable" (≤ 3) et "douleur stop" (≥ 5) pendant les auto-rééducations'
      ]
    },
    references: [{
      title: 'Studies comparing Numerical Rating Scales, Verbal Rating Scales, and Visual Analogue Scales for assessment of pain intensity',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21621130/',
      type: 'scientific_article' as const
    }],
    questions: [
      {
        id: 'nprs1',
        text: 'Comment évalueriez-vous votre douleur actuelle sur une échelle de 0 (aucune douleur) à 10 (douleur maximale imaginable) ?',
        options: [
          { id: '0', label: '0 — Aucune douleur', value: 0 },
          { id: '1', label: '1', value: 1 },
          { id: '2', label: '2', value: 2 },
          { id: '3', label: '3 — Douleur légère', value: 3 },
          { id: '4', label: '4', value: 4 },
          { id: '5', label: '5 — Douleur modérée', value: 5 },
          { id: '6', label: '6', value: 6 },
          { id: '7', label: '7 — Douleur sévère', value: 7 },
          { id: '8', label: '8', value: 8 },
          { id: '9', label: '9', value: 9 },
          { id: '10', label: '10 — Douleur maximale imaginable', value: 10 }
        ]
      }
    ]
  },

  // ============================================================
  // PCS — Pain Catastrophizing Scale
  // ============================================================
  'pcs': {
    id: 'pcs',
    title: 'PCS (Pain Catastrophizing Scale)',
    description: 'Mesure de la tendance à dramatiser ou à ressasser la douleur (catastrophisme).',
    estimatedTime: '5 min',
    maxScore: 52,
    mcid: 9,
    higherIsBetter: false,
    tags: ['Général', 'Psychologique', 'Douleur'],
    validated: true,
    bodyPart: 'Général',
    category: 'Général',
    administrationType: 'auto',
    clinicalValue: 'Le catastrophisme est l\'un des plus puissants prédicteurs de chronicisation et de mauvais pronostic en douleur musculo-squelettique. Le PCS objective trois dimensions : la rumination, l\'amplification et le sentiment d\'impuissance. Indispensable en complément du TAMPA pour caractériser le profil psycho-comportemental du douloureux chronique.',
    decisionAlgorithm: 'Score < 20 : catastrophisme faible, pas d\'intervention spécifique requise. Score 20–29 : catastrophisme modéré, intégrer l\'éducation à la douleur dès les premières séances. Score ≥ 30 : catastrophisme élevé, drapeau jaune majeur — orienter vers une approche cognitivo-comportementale et envisager une co-prise en charge psychologique.',
    therapeuticInterventions: {
      exercises: [
        'Exposition graduelle au mouvement redouté (Graded Exposure / GMI)',
        'Imagerie motrice progressive (Latéralisation → Mouvement imaginé → Miroir)'
      ],
      education: [
        'Pain Neuroscience Education (PNE) : expliquer la neurophysiologie de la douleur chronique',
        'Reformuler les croyances négatives ("je suis cassé") par des croyances adaptatives'
      ]
    },
    references: [
      {
        title: 'The Pain Catastrophizing Scale: development and validation (Sullivan et al., 1995)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/7644250/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      'Je me dis que je ne pourrai jamais supporter cela.',
      'Je sens que je ne peux pas continuer.',
      'C\'est terrible et je sens que cela ne s\'améliorera jamais.',
      'C\'est affreux et je sens que cela me submerge.',
      'Je ne peux plus le supporter.',
      'J\'ai peur que la douleur empire.',
      'Je pense sans cesse à d\'autres événements douloureux.',
      'Je veux désespérément que la douleur s\'arrête.',
      'Je ne peux pas m\'empêcher d\'y penser.',
      'Je n\'arrête pas de penser à quel point j\'ai mal.',
      'Je n\'arrête pas de penser à quel point je veux que la douleur s\'arrête.',
      'Il n\'y a rien que je puisse faire pour réduire l\'intensité de ma douleur.',
      'Je me demande si quelque chose de grave va se produire.'
    ].map((text, i) => ({
      id: `pcs${i + 1}`,
      text: `${i + 1}. ${text}`,
      options: [
        { id: '0', label: '0 — Pas du tout', value: 0 },
        { id: '1', label: '1 — Un peu', value: 1 },
        { id: '2', label: '2 — Modérément', value: 2 },
        { id: '3', label: '3 — Beaucoup', value: 3 },
        { id: '4', label: '4 — Tout le temps', value: 4 }
      ]
    }))
  },

  // ============================================================
  // DN4 — Douleur Neuropathique 4
  // ============================================================
  'dn4': {
    id: 'dn4',
    title: 'DN4 (Douleur Neuropathique 4)',
    description: 'Outil diagnostique pour identifier une composante neuropathique dans une douleur chronique.',
    estimatedTime: '3 min',
    maxScore: 10,
    higherIsBetter: false,
    tags: ['Général', 'Douleur', 'Neurologique'],
    validated: true,
    bodyPart: 'Général',
    category: 'Général',
    administrationType: 'therapist',
    clinicalValue: 'Le DN4 est l\'outil de référence pour différencier une douleur nociceptive d\'une douleur neuropathique. Cette distinction conditionne la stratégie : la prise en charge mécanique seule échouera face à une composante neuropathique non identifiée. À utiliser systématiquement face à toute douleur chronique avec irradiation, brûlure ou paresthésies.',
    decisionAlgorithm: 'Score ≥ 4/10 : composante neuropathique probable (sensibilité 83 %, spécificité 90 %). Orienter vers un médecin pour discussion d\'un traitement spécifique (anticonvulsivant, antidépresseur tricyclique). Adapter la rééducation : désensibilisation, imagerie motrice, éviter les techniques douloureuses. Score < 4 : douleur principalement nociceptive, approche mécanique classique.',
    therapeuticInterventions: {
      exercises: [
        'Désensibilisation par stimulations graduées (texture, température)',
        'Imagerie motrice graduée (GMI) sur la zone douloureuse',
        'Mobilisation neurale douce (sliders > tensioners au début)'
      ],
      education: [
        'Expliquer la sensibilisation nerveuse centrale et périphérique',
        'Insister sur l\'évitement des stimulations agressives ("no pain no gain" est contre-indiqué)'
      ]
    },
    references: [
      {
        title: 'Comparison of pain syndromes associated with nervous or somatic lesions and development of a new neuropathic pain diagnostic questionnaire (DN4)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/15733628/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      ...[
        'La douleur présente-t-elle l\'une des caractéristiques suivantes : brûlure ?',
        'Sensation de froid douloureux ?',
        'Décharges électriques ?',
        'La douleur est-elle associée à des fourmillements ?',
        'Picotements ?',
        'Engourdissements ?',
        'Démangeaisons ?',
      ].map((text, i) => ({
        id: `dn4-q${i + 1}`,
        text: `${i + 1}. ${text}`,
        options: [
          { id: '0', label: 'Non', value: 0 },
          { id: '1', label: 'Oui', value: 1 }
        ]
      })),
      ...[
        'Examen clinique — Hypoesthésie au tact dans la zone douloureuse ?',
        'Examen clinique — Hypoesthésie à la piqûre dans la zone douloureuse ?',
        'Examen clinique — La douleur est-elle provoquée ou augmentée par le frottement ?',
      ].map((text, i) => ({
        id: `dn4-e${i + 1}`,
        text: `${i + 8}. ${text}`,
        options: [
          { id: '0', label: 'Non', value: 0 },
          { id: '1', label: 'Oui', value: 1 }
        ]
      }))
    ]
  },

  // ============================================================
  // OREBRO — Örebro Musculoskeletal Pain Screening (Short Form)
  // ============================================================
  'orebro': {
    id: 'orebro',
    title: 'Örebro Musculoskeletal Pain Screening (OMPSQ-SF)',
    description: 'Prédicteur du risque de chronicisation d\'une douleur musculo-squelettique aiguë ou sub-aiguë.',
    estimatedTime: '5 min',
    maxScore: 100,
    higherIsBetter: false,
    tags: ['Lombaire', 'Général', 'Pronostic'],
    validated: true,
    bodyPart: 'Général',
    category: 'Général',
    administrationType: 'auto',
    clinicalValue: 'Extension du START Back à toutes les douleurs musculo-squelettiques (pas uniquement lombaires). Cet outil de stratification identifie en 10 questions les patients à haut risque de chronicisation et d\'incapacité prolongée — particulièrement utile en pratique privée pour orienter précocement la prise en charge.',
    decisionAlgorithm: 'Score < 50 : risque faible, prise en charge standard. Score 50–60 : risque modéré, intégrer une composante éducative et un suivi rapproché. Score > 60 : risque élevé de chronicisation et d\'arrêt prolongé — envisager une prise en charge multidisciplinaire dès le début (psychologue, médecin du travail).',
    therapeuticInterventions: {
      exercises: [
        'Activité physique progressive privilégiant la fonction sur la douleur',
        'Exposition graduelle aux mouvements évités'
      ],
      education: [
        'Éducation à la douleur (PNE) dès la première séance pour les scores ≥ 50',
        'Discussion ouverte sur les peurs liées au retour au travail / à l\'activité'
      ]
    },
    references: [
      {
        title: 'Development of a short form of the Örebro Musculoskeletal Pain Screening Questionnaire (Linton et al., 2011)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/21588086/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      {
        id: 'or1',
        text: '1. Combien de jours par mois avez-vous été incapable d\'accomplir vos activités habituelles à cause de la douleur ?',
        options: [
          { id: '0', label: '0 jour', value: 0 },
          { id: '1', label: '1 à 2 jours', value: 1 },
          { id: '2', label: '3 à 7 jours', value: 2 },
          { id: '3', label: '8 à 14 jours', value: 3 },
          { id: '4', label: '15 à 21 jours', value: 4 },
          { id: '5', label: '22 à 30 jours', value: 5 },
          { id: '7', label: 'Plus de 30 jours', value: 7 },
          { id: '10', label: 'Tous les jours', value: 10 }
        ]
      },
      {
        id: 'or2',
        text: '2. Comment évaluez-vous votre douleur en moyenne au cours des 2 dernières semaines ?',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Aucune douleur' : i === 10 ? '— Douleur maximale' : ''}`, value: i }))
      },
      {
        id: 'or3',
        text: '3. Au cours des 3 derniers mois, à quel point la douleur a-t-elle interféré avec votre capacité à mener une vie normale ?',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Pas du tout' : i === 10 ? '— Totalement' : ''}`, value: i }))
      },
      {
        id: 'or4',
        text: '4. À quel point votre douleur est-elle anxiogène pour vous ?',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Pas du tout' : i === 10 ? '— Extrêmement' : ''}`, value: i }))
      },
      {
        id: 'or5',
        text: '5. À quel point pensez-vous qu\'il est risqué pour vous de pratiquer une activité physique ?',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Aucun risque' : i === 10 ? '— Risque très élevé' : ''}`, value: i }))
      },
      {
        id: 'or6',
        text: '6. À quel point êtes-vous d\'accord avec : "Mes activités physiques ne devraient PAS être limitées par ma douleur" ? (échelle inversée)',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Tout à fait d\'accord' : i === 10 ? '— Pas du tout d\'accord' : ''}`, value: i }))
      },
      {
        id: 'or7',
        text: '7. À quel point êtes-vous confiant que vous pourrez accomplir votre travail malgré la douleur dans les 3 prochains mois ? (échelle inversée)',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Très confiant' : i === 10 ? '— Pas confiant du tout' : ''}`, value: i }))
      },
      {
        id: 'or8',
        text: '8. Estimez votre humeur durant les 2 dernières semaines (0 = très bonne, 10 = très basse)',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Très bonne humeur' : i === 10 ? '— Très basse humeur' : ''}`, value: i }))
      },
      {
        id: 'or9',
        text: '9. Pensez-vous que votre douleur durera très longtemps ?',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Pas du tout' : i === 10 ? '— Certainement' : ''}`, value: i }))
      },
      {
        id: 'or10',
        text: '10. À quel point la rééducation peut-elle vous aider à reprendre vos activités ? (échelle inversée)',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i} ${i === 0 ? '— Beaucoup' : i === 10 ? '— Pas du tout' : ''}`, value: i }))
      }
    ]
  },

  // ============================================================
  // PRWE — Patient-Rated Wrist Evaluation
  // ============================================================
  'prwe': {
    id: 'prwe',
    title: 'PRWE (Patient-Rated Wrist Evaluation)',
    description: 'Évaluation du retentissement douloureux et fonctionnel d\'une pathologie du poignet.',
    estimatedTime: '5 min',
    maxScore: 100,
    mcid: 11.5,
    higherIsBetter: false,
    tags: ['Membre Supérieur', 'Poignet'],
    validated: true,
    bodyPart: 'Membre Sup.',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Référence pour le poignet — plus spécifique que le QuickDASH qui couvre tout le membre supérieur. Particulièrement réactif après fracture du radius distal, tendinopathie de De Quervain, post-chirurgie du tunnel carpien. Distingue clairement la part douleur (50 %) et la part fonction (50 %).',
    decisionAlgorithm: 'Score 0–20 : retentissement léger, rééducation orientée gains de mobilité fine. Score 20–50 : retentissement modéré, équilibre travail manuel + renforcement progressif. Score > 50 : retentissement sévère — prioriser le contrôle douloureux et la fonction de base avant le renforcement. Un changement ≥ 11,5 points = cliniquement significatif.',
    therapeuticInterventions: {
      exercises: [
        'Mobilisation active assistée des amplitudes du poignet (flexion, extension, prono-supination)',
        'Renforcement progressif des extenseurs / fléchisseurs (Theraband, putty)',
        'Reprogrammation neuro-motrice fine (manipulation de petits objets)'
      ],
      education: [
        'Économie articulaire au quotidien (ergonomie clavier, port de charges)',
        'Auto-mobilisations à domicile 3×/jour pendant les premières semaines'
      ]
    },
    references: [
      {
        title: 'Development of an upper extremity outcome measure: the DASH (and PRWE comparative validity)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/8773720/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      // --- Sous-échelle douleur (5 items, 0-10) ---
      ...[
        'au repos',
        'lors d\'un mouvement répétitif',
        'lorsque vous soulevez un objet lourd',
        'lorsqu\'il est dans son pire moment',
        'à quelle fréquence avez-vous mal ?'
      ].map((text, i) => ({
        id: `prwe-p${i + 1}`,
        text: `Douleur — ${i + 1}. Évaluez votre douleur ${text}`,
        options: Array.from({ length: 11 }, (_, n) => ({
          id: String(n),
          label: `${n} ${n === 0 ? '— Aucune douleur' : n === 10 ? '— Pire douleur imaginable' : ''}`,
          value: n
        }))
      })),
      // --- Sous-échelle fonction (10 items, 0-10) ---
      ...[
        'tourner une poignée de porte',
        'couper de la viande avec un couteau',
        'boutonner une chemise',
        'soulever d\'une main une chope ou un verre plein',
        'utiliser du papier toilette',
        'faire les tâches ménagères habituelles',
        'pratiquer vos loisirs habituels',
        'effectuer votre travail habituel',
        'porter un objet de 2 à 5 kg',
        'effectuer des tâches personnelles (habillage, hygiène)'
      ].map((text, i) => ({
        id: `prwe-f${i + 1}`,
        text: `Fonction — ${i + 1}. Difficulté à : ${text}`,
        options: Array.from({ length: 11 }, (_, n) => ({
          id: String(n),
          label: `${n} ${n === 0 ? '— Aucune difficulté' : n === 10 ? '— Impossible à faire' : ''}`,
          value: n
        }))
      }))
    ]
  },

  // ============================================================
  // 6MWT — 6-Minute Walk Test
  // ============================================================
  '6mwt': {
    id: '6mwt',
    title: '6MWT (Test de marche de 6 minutes)',
    description: 'Évaluation chronométrée de la capacité d\'endurance fonctionnelle.',
    estimatedTime: '10 min',
    maxScore: 700,
    higherIsBetter: true,
    tags: ['Général', 'Endurance', 'Neurologique', 'Cardio-respiratoire'],
    validated: true,
    bodyPart: 'Général',
    category: 'Général',
    administrationType: 'therapist',
    clinicalValue: 'Test sous-maximal le plus utilisé pour évaluer la capacité fonctionnelle d\'endurance. Indispensable en pathologie cardio-respiratoire, neurologique (post-AVC, Parkinson, SEP) et gériatrique. Indicateur global de la "réserve" du patient pour les activités de la vie quotidienne.',
    decisionAlgorithm: 'Distance < 300 m : déconditionnement sévère, prioriser la réhabilitation à l\'effort sub-maximal supervisé. 300–450 m : capacité limitée, objectifs d\'endurance à intégrer en complément. > 450 m : capacité conservée. Comparer à la valeur prédite par âge et taille (équations d\'Enright). Un gain ≥ 50 m est cliniquement significatif.',
    therapeuticInterventions: {
      exercises: [
        'Réentraînement à l\'effort sur tapis ou cycloergomètre (50–70 % FCmax)',
        'Marche fractionnée progressive (intervalles 2 min / 1 min repos)'
      ],
      education: [
        'Auto-mesure de la FC et de la dyspnée (Borg) à l\'effort',
        'Encouragement au "step counting" quotidien (objectif ≥ 5000 pas)'
      ]
    },
    references: [
      {
        title: 'ATS Statement: Guidelines for the Six-Minute Walk Test',
        url: 'https://pubmed.ncbi.nlm.nih.gov/12091180/',
        type: 'methodology' as const
      }
    ],
    questions: [
      {
        id: '6mwt-dist',
        text: 'Distance totale parcourue en 6 minutes (mètres)',
        options: [
          { id: '100', label: '< 150 m', value: 100 },
          { id: '200', label: '150–250 m', value: 200 },
          { id: '300', label: '250–350 m', value: 300 },
          { id: '400', label: '350–450 m', value: 400 },
          { id: '500', label: '450–550 m', value: 500 },
          { id: '600', label: '550–650 m', value: 600 },
          { id: '700', label: '> 650 m', value: 700 }
        ]
      },
      {
        id: '6mwt-borg-pre',
        text: 'Borg dyspnée AVANT le test (0–10)',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i}`, value: 0 }))
      },
      {
        id: '6mwt-borg-post',
        text: 'Borg dyspnée APRÈS le test (0–10)',
        options: Array.from({ length: 11 }, (_, i) => ({ id: String(i), label: `${i}`, value: 0 }))
      },
      {
        id: '6mwt-stops',
        text: 'Nombre d\'arrêts pendant le test',
        options: [
          { id: '0', label: 'Aucun arrêt', value: 0 },
          { id: '1', label: '1 arrêt', value: 0 },
          { id: '2', label: '2 arrêts', value: 0 },
          { id: '3', label: '≥ 3 arrêts', value: 0 }
        ]
      }
    ]
  },

  // ============================================================
  // IKDC subjective — International Knee Documentation Committee
  // ============================================================
  'ikdc': {
    id: 'ikdc',
    title: 'IKDC subjective (Genou)',
    description: 'Évaluation subjective du genou — référence pour le genou sportif (LCA, ménisque).',
    estimatedTime: '8 min',
    maxScore: 100,
    mcid: 11.5,
    higherIsBetter: true,
    tags: ['Genou', 'Membre Inférieur', 'Sport'],
    validated: true,
    bodyPart: 'Genou',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Référence pour le genou sportif (jeune adulte) — plus pertinent que KOOS qui est plutôt orienté arthrose. Particulièrement utilisé pour le suivi post-reconstruction LCA, lésion méniscale, instabilité fémoro-patellaire. Distingue clairement les symptômes (douleur, gonflement, blocage) et la fonction sportive (course, saut, pivot).',
    decisionAlgorithm: 'Score < 50 : retentissement sévère, retour au sport très probablement compromis sans rééducation prolongée. 50–75 : récupération partielle, focaliser sur la stabilité dynamique et les sauts contrôlés. > 75 : bonne récupération, intégrer la pliométrie et le travail spécifique au sport pratiqué. Un gain ≥ 11,5 points = changement cliniquement significatif.',
    therapeuticInterventions: {
      exercises: [
        'Renforcement excentrique quadriceps + ischio-jambiers (chaîne fermée puis ouverte)',
        'Travail proprioceptif progressif (sol stable → instable → unipodal dynamique)',
        'Pliométrie et "agility drills" en phase tardive (sauts, changements de direction)'
      ],
      education: [
        'Critères objectifs de retour au sport (LSI > 90 %, hop tests symétriques)',
        'Gestion de la peur de la récidive après LCA (intégrer au plan)'
      ]
    },
    references: [
      {
        title: 'Development and validation of the International Knee Documentation Committee Subjective Knee Form',
        url: 'https://pubmed.ncbi.nlm.nih.gov/11522305/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      {
        id: 'ikdc1',
        text: 'Quel est le plus haut niveau d\'activité que vous pouvez pratiquer sans douleur significative au genou ?',
        options: [
          { id: '0', label: 'Activités très exigeantes (basket, foot, ski)', value: 4 },
          { id: '1', label: 'Activités exigeantes (tennis, course modérée)', value: 3 },
          { id: '2', label: 'Activités modérées (marche soutenue, vélo)', value: 2 },
          { id: '3', label: 'Activités légères (marche, travaux ménagers)', value: 1 },
          { id: '4', label: 'Incapable d\'activité, douleur en tout temps', value: 0 }
        ]
      },
      {
        id: 'ikdc2',
        text: 'À quelle fréquence avez-vous eu mal au genou ces 4 dernières semaines ?',
        options: [
          { id: '0', label: 'Jamais', value: 10 },
          { id: '1', label: '1 fois / mois', value: 8 },
          { id: '2', label: 'Plusieurs fois / mois', value: 6 },
          { id: '3', label: 'Plusieurs fois / semaine', value: 4 },
          { id: '4', label: 'Quotidiennement', value: 2 },
          { id: '5', label: 'En permanence', value: 0 }
        ]
      },
      {
        id: 'ikdc3',
        text: 'Si vous avez mal, à quel point la douleur est-elle intense ? (0=aucune, 10=pire imaginable — score inversé)',
        options: Array.from({ length: 11 }, (_, i) => ({
          id: String(i),
          label: `${i}${i === 0 ? ' — Aucune' : i === 10 ? ' — Pire imaginable' : ''}`,
          value: 10 - i
        }))
      },
      {
        id: 'ikdc4',
        text: 'À quelle fréquence votre genou est-il raide ou gonflé ?',
        options: [
          { id: '0', label: 'Jamais', value: 4 },
          { id: '1', label: 'Rarement', value: 3 },
          { id: '2', label: 'Parfois', value: 2 },
          { id: '3', label: 'Souvent', value: 1 },
          { id: '4', label: 'En permanence', value: 0 }
        ]
      },
      {
        id: 'ikdc5',
        text: 'Avez-vous une sensation d\'instabilité ou de dérobement du genou ?',
        options: [
          { id: '0', label: 'Jamais', value: 4 },
          { id: '1', label: 'Rarement (sport intense uniquement)', value: 3 },
          { id: '2', label: 'Parfois (sport modéré)', value: 2 },
          { id: '3', label: 'Souvent (vie quotidienne)', value: 1 },
          { id: '4', label: 'Constamment', value: 0 }
        ]
      },
      {
        id: 'ikdc6',
        text: 'Difficulté à monter / descendre les escaliers',
        options: [
          { id: '0', label: 'Aucune difficulté', value: 4 },
          { id: '1', label: 'Légère difficulté', value: 3 },
          { id: '2', label: 'Difficulté modérée', value: 2 },
          { id: '3', label: 'Grande difficulté', value: 1 },
          { id: '4', label: 'Incapable', value: 0 }
        ]
      },
      {
        id: 'ikdc7',
        text: 'Difficulté à s\'accroupir / s\'agenouiller',
        options: [
          { id: '0', label: 'Aucune difficulté', value: 4 },
          { id: '1', label: 'Légère difficulté', value: 3 },
          { id: '2', label: 'Difficulté modérée', value: 2 },
          { id: '3', label: 'Grande difficulté', value: 1 },
          { id: '4', label: 'Incapable', value: 0 }
        ]
      },
      {
        id: 'ikdc8',
        text: 'Difficulté à courir en ligne droite',
        options: [
          { id: '0', label: 'Aucune difficulté', value: 4 },
          { id: '1', label: 'Légère difficulté', value: 3 },
          { id: '2', label: 'Difficulté modérée', value: 2 },
          { id: '3', label: 'Grande difficulté', value: 1 },
          { id: '4', label: 'Incapable', value: 0 }
        ]
      },
      {
        id: 'ikdc9',
        text: 'Difficulté à sauter / atterrir sur le membre atteint',
        options: [
          { id: '0', label: 'Aucune difficulté', value: 4 },
          { id: '1', label: 'Légère difficulté', value: 3 },
          { id: '2', label: 'Difficulté modérée', value: 2 },
          { id: '3', label: 'Grande difficulté', value: 1 },
          { id: '4', label: 'Incapable', value: 0 }
        ]
      },
      {
        id: 'ikdc10',
        text: 'Difficulté à pivoter / faire des changements de direction',
        options: [
          { id: '0', label: 'Aucune difficulté', value: 4 },
          { id: '1', label: 'Légère difficulté', value: 3 },
          { id: '2', label: 'Difficulté modérée', value: 2 },
          { id: '3', label: 'Grande difficulté', value: 1 },
          { id: '4', label: 'Incapable', value: 0 }
        ]
      }
    ]
  },

  // ============================================================
  // Constant-Murley (version patient-rated)
  // ============================================================
  'constant': {
    id: 'constant',
    title: 'Constant-Murley Score (épaule, version auto)',
    description: 'Évaluation fonctionnelle de l\'épaule — version auto-administrée (sans goniométrie). Score 0–35 (35 points patient-reported sur 100 totaux).',
    estimatedTime: '5 min',
    maxScore: 35,
    higherIsBetter: true,
    tags: ['Épaule', 'Membre Supérieur'],
    validated: true,
    bodyPart: 'Épaule',
    category: 'Orthopédique',
    administrationType: 'both',
    clinicalValue: 'Référence post-opératoire pour l\'épaule. La version originale combine auto-évaluation (douleur + ADL : 35 points) ET examen clinique avec goniométrie (mobilités + force : 65 points). Cette version reproduit les 35 points patient-reported, à compléter par le score d\'examen clinique au cabinet pour le score total.',
    decisionAlgorithm: 'Score patient < 15/35 : retentissement sévère sur la vie quotidienne. Score 15–25 : retentissement modéré. Score > 25 : retentissement faible. Le score total (avec examen) est interprété ainsi : < 55 = mauvais, 55–80 = moyen, 81–90 = bon, > 90 = excellent.',
    therapeuticInterventions: {
      exercises: [
        'Mobilisations actives assistées en chaîne fermée (jusqu\'à 90° d\'élévation)',
        'Renforcement progressif coiffe (rotateurs externes/internes, série excentrique)',
        'Stabilisation scapulaire (sleeper stretch, wall slides, Y-T-W)'
      ],
      education: [
        'Importance des auto-mobilisations quotidiennes pendant la phase immobile',
        'Gestion du sommeil sur le côté atteint (oreiller de soutien)'
      ]
    },
    references: [
      {
        title: 'A clinical method of functional assessment of the shoulder (Constant & Murley, 1987)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/3791738/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      {
        id: 'constant-pain',
        text: 'DOULEUR — À quel point votre épaule est-elle douloureuse ?',
        options: [
          { id: '0', label: 'Aucune', value: 15 },
          { id: '1', label: 'Légère', value: 10 },
          { id: '2', label: 'Modérée', value: 5 },
          { id: '3', label: 'Sévère', value: 0 }
        ]
      },
      {
        id: 'constant-work',
        text: 'TRAVAIL — Pouvez-vous accomplir votre travail habituel ?',
        options: [
          { id: '0', label: 'Sans aucune restriction', value: 4 },
          { id: '1', label: 'Avec quelques restrictions', value: 3 },
          { id: '2', label: 'Avec des restrictions importantes', value: 2 },
          { id: '3', label: 'Difficilement', value: 1 },
          { id: '4', label: 'Impossible', value: 0 }
        ]
      },
      {
        id: 'constant-recreation',
        text: 'LOISIRS — Pouvez-vous pratiquer vos loisirs habituels ?',
        options: [
          { id: '0', label: 'Sans aucune restriction', value: 4 },
          { id: '1', label: 'Avec quelques restrictions', value: 3 },
          { id: '2', label: 'Avec des restrictions importantes', value: 2 },
          { id: '3', label: 'Difficilement', value: 1 },
          { id: '4', label: 'Impossible', value: 0 }
        ]
      },
      {
        id: 'constant-sleep',
        text: 'SOMMEIL — Votre épaule perturbe-t-elle votre sommeil ?',
        options: [
          { id: '0', label: 'Pas du tout', value: 2 },
          { id: '1', label: 'Occasionnellement', value: 1 },
          { id: '2', label: 'Quotidiennement', value: 0 }
        ]
      },
      {
        id: 'constant-position',
        text: 'POSITION — À quelle hauteur pouvez-vous utiliser votre main sans douleur ?',
        options: [
          { id: '0', label: 'Au-dessus de la tête', value: 10 },
          { id: '1', label: 'Au niveau de la tête', value: 8 },
          { id: '2', label: 'Au niveau du cou', value: 6 },
          { id: '3', label: 'Au niveau de la poitrine', value: 4 },
          { id: '4', label: 'Au niveau de la taille', value: 2 },
          { id: '5', label: 'En dessous de la taille', value: 0 }
        ]
      }
    ]
  },

  // ============================================================
  // FAOS-PS — Foot and Ankle Outcome Score (Physical-function Short form)
  // ============================================================
  'faos': {
    id: 'faos',
    title: 'FAOS-PS (Cheville / Pied)',
    description: 'Version courte du Foot and Ankle Outcome Score — fonction physique de la cheville et du pied.',
    estimatedTime: '3 min',
    maxScore: 100,
    higherIsBetter: true,
    tags: ['Cheville', 'Pied', 'Membre Inférieur'],
    validated: true,
    bodyPart: 'Cheville',
    category: 'Orthopédique',
    administrationType: 'auto',
    clinicalValue: 'Version courte validée du FAOS, plus spécifique que le LEFS. Très réactif sur les instabilités chroniques de cheville, les tendinopathies du tibialis postérieur, les fasciites plantaires et le post-opératoire. Cible la fonction physique principalement.',
    decisionAlgorithm: 'Score 0–30 : retentissement sévère, focaliser sur la stabilité de cheville et la reprise d\'appui progressive. 30–70 : retentissement modéré, intégrer le renforcement excentrique et la proprioception unipodale. > 70 : récupération avancée, intégrer la pliométrie et la reprise sportive.',
    therapeuticInterventions: {
      exercises: [
        'Travail proprioceptif unipodal (yeux ouverts → fermés → sol instable)',
        'Renforcement excentrique tibialis postérieur (heel raises avec relâchement contrôlé)',
        'Étirements posterior tibial / triceps sural'
      ],
      education: [
        'Choix du chaussage adapté (semelle souple en phase aiguë, soutien arche pour pied plat)',
        'Auto-massage de la fascia plantaire (rouleau, balle de tennis)'
      ]
    },
    references: [
      {
        title: 'A short version of the Foot and Ankle Outcome Score (FAOS-PS)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/19854671/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      ...[
        'Marcher sur un terrain plat',
        'Marcher sur un terrain inégal',
        'Monter ou descendre des escaliers',
        'Se mettre debout depuis la position assise',
        'S\'accroupir ou se mettre sur la pointe des pieds',
        'Courir ou pratiquer un sport'
      ].map((text, i) => ({
        id: `faos${i + 1}`,
        text: `Difficulté à : ${text}`,
        options: [
          { id: '0', label: 'Aucune difficulté', value: 100 / 6 },
          { id: '1', label: 'Légère difficulté', value: 75 / 6 },
          { id: '2', label: 'Difficulté modérée', value: 50 / 6 },
          { id: '3', label: 'Grande difficulté', value: 25 / 6 },
          { id: '4', label: 'Incapable', value: 0 }
        ]
      }))
    ]
  },

  // ============================================================
  // Tinetti — Performance-Oriented Mobility Assessment (POMA)
  // ============================================================
  'tinetti': {
    id: 'tinetti',
    title: 'Tinetti (POMA) — Équilibre & Marche',
    description: 'Évaluation hétéro-administrée du risque de chute (équilibre + marche).',
    estimatedTime: '10 min',
    maxScore: 28,
    higherIsBetter: true,
    tags: ['Neurologique', 'Gériatrique', 'Équilibre', 'Chute'],
    validated: true,
    bodyPart: 'Général',
    category: 'Neurologique',
    administrationType: 'therapist',
    clinicalValue: 'Référence en gériatrie pour quantifier le risque de chute. Plus rapide que la Berg Balance Scale et plus discriminant pour la marche. Compose un score équilibre (16/28) et un score marche (12/28). Particulièrement utile chez les personnes âgées et les patients neurologiques.',
    decisionAlgorithm: 'Score ≥ 25 : risque de chute faible. 19–24 : risque modéré, prescrire une aide à la marche et adapter le domicile. ≤ 18 : risque ÉLEVÉ de chute, l\'aide technique est indispensable et la rééducation à l\'équilibre devient prioritaire.',
    therapeuticInterventions: {
      exercises: [
        'Tâches doubles (marche + cognitif) pour la prévention des chutes',
        'Réduction progressive de la base de sustentation (tandem, unipodal)',
        'Travail de relevé du sol et apprentissage des transitions'
      ],
      education: [
        'Audit du domicile (tapis, éclairage, salle de bain) systématique',
        'Apprentissage de la stratégie "appel à l\'aide" en cas de chute'
      ]
    },
    references: [
      {
        title: 'Performance-Oriented Assessment of Mobility Problems in Elderly Patients (Tinetti, 1986)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/3944402/',
        type: 'scientific_article' as const
      }
    ],
    questions: [
      // === Équilibre (16 points) ===
      {
        id: 'tin-b1',
        text: 'Équilibre — Position assise (le patient se tient-il droit sur la chaise sans accoudoir ?)',
        options: [
          { id: '0', label: 'Penche ou glisse sur la chaise', value: 0 },
          { id: '1', label: 'Stable, sécurisé', value: 1 }
        ]
      },
      {
        id: 'tin-b2',
        text: 'Équilibre — Se lever d\'une chaise',
        options: [
          { id: '0', label: 'Incapable sans aide', value: 0 },
          { id: '1', label: 'Capable avec utilisation des bras', value: 1 },
          { id: '2', label: 'Capable sans utiliser les bras', value: 2 }
        ]
      },
      {
        id: 'tin-b3',
        text: 'Équilibre — Tentative pour se lever',
        options: [
          { id: '0', label: 'Incapable sans aide', value: 0 },
          { id: '1', label: 'Capable, nécessite > 1 essai', value: 1 },
          { id: '2', label: 'Capable au 1er essai', value: 2 }
        ]
      },
      {
        id: 'tin-b4',
        text: 'Équilibre — Debout immédiat (5 premières secondes)',
        options: [
          { id: '0', label: 'Instable (oscillation, bouge les pieds)', value: 0 },
          { id: '1', label: 'Stable avec aide (cane, déambulateur)', value: 1 },
          { id: '2', label: 'Stable sans aide', value: 2 }
        ]
      },
      {
        id: 'tin-b5',
        text: 'Équilibre — Debout (pieds joints)',
        options: [
          { id: '0', label: 'Instable', value: 0 },
          { id: '1', label: 'Stable avec aide', value: 1 },
          { id: '2', label: 'Stable, pieds joints, sans aide', value: 2 }
        ]
      },
      {
        id: 'tin-b6',
        text: 'Équilibre — Poussée sternale (légère poussée vers l\'arrière, pieds joints)',
        options: [
          { id: '0', label: 'Tombe ou rattrape avec aide', value: 0 },
          { id: '1', label: 'Vacille mais se rattrape', value: 1 },
          { id: '2', label: 'Stable', value: 2 }
        ]
      },
      {
        id: 'tin-b7',
        text: 'Équilibre — Yeux fermés (pieds joints)',
        options: [
          { id: '0', label: 'Instable', value: 0 },
          { id: '1', label: 'Stable', value: 1 }
        ]
      },
      {
        id: 'tin-b8',
        text: 'Équilibre — Rotation 360°',
        options: [
          { id: '0', label: 'Pas discontinus, instable', value: 0 },
          { id: '1', label: 'Pas continus mais instable', value: 1 },
          { id: '2', label: 'Pas continus et stable', value: 2 }
        ]
      },
      {
        id: 'tin-b9',
        text: 'Équilibre — Se rasseoir',
        options: [
          { id: '0', label: 'Mal contrôlé (tombe sur la chaise)', value: 0 },
          { id: '1', label: 'Utilise les bras', value: 1 },
          { id: '2', label: 'Mouvement sûr et fluide', value: 2 }
        ]
      },
      // === Marche (12 points) ===
      {
        id: 'tin-g1',
        text: 'Marche — Initiation de la marche',
        options: [
          { id: '0', label: 'Hésitation ou plusieurs essais', value: 0 },
          { id: '1', label: 'Aucune hésitation', value: 1 }
        ]
      },
      {
        id: 'tin-g2',
        text: 'Marche — Hauteur et longueur du pas',
        options: [
          { id: '0', label: 'Pied droit ne dépasse pas le gauche / décollement insuffisant', value: 0 },
          { id: '1', label: 'Pied droit dépasse le gauche / décollement complet', value: 1 }
        ]
      },
      {
        id: 'tin-g3',
        text: 'Marche — Symétrie du pas',
        options: [
          { id: '0', label: 'Pas asymétriques (droit ≠ gauche)', value: 0 },
          { id: '1', label: 'Symétriques', value: 1 }
        ]
      },
      {
        id: 'tin-g4',
        text: 'Marche — Continuité du pas',
        options: [
          { id: '0', label: 'Pas saccadés ou pauses', value: 0 },
          { id: '1', label: 'Continue, fluide', value: 1 }
        ]
      },
      {
        id: 'tin-g5',
        text: 'Marche — Trajectoire (sur 3 m)',
        options: [
          { id: '0', label: 'Déviation marquée', value: 0 },
          { id: '1', label: 'Déviation légère ou aide à la marche', value: 1 },
          { id: '2', label: 'Trajectoire droite sans aide', value: 2 }
        ]
      },
      {
        id: 'tin-g6',
        text: 'Marche — Tronc',
        options: [
          { id: '0', label: 'Balancements ou flexion marquée', value: 0 },
          { id: '1', label: 'Sans balancement mais utilise les bras', value: 1 },
          { id: '2', label: 'Tronc stable, bras libres', value: 2 }
        ]
      },
      {
        id: 'tin-g7',
        text: 'Marche — Base de sustentation',
        options: [
          { id: '0', label: 'Talons écartés en marchant', value: 0 },
          { id: '1', label: 'Talons proches en marchant', value: 1 }
        ]
      }
    ]
  }
};

export const questionnaires = Object.values(QUESTIONNAIRES);
