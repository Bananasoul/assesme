# **Répertoire Algorithmique des Outils Métrologiques Standardisés en Kinésithérapie**

## **Rachis**

L'évaluation métrologique du rachis requiert une approche algorithmique stricte, considérant la nature multifactorielle des algies vertébrales. L'intégration de ces instruments dans une architecture logicielle d'intelligence artificielle nécessite de traiter les données manquantes, les effets de plancher ou de plafond, et les non-linéarités inhérentes aux scores. L'architecture des bases de données devra modéliser les propriétés psychométriques pour normaliser les sorties et appliquer des modèles de régression prédictive. La méthodologie de validation transculturelle de ces outils suit rigoureusement les recommandations internationales (traduction, rétro-traduction, comité d'experts, tests cognitifs).1

### **Rachis Cervical**

L'architecture métrologique de la région cervicale est dominée par des questionnaires auto-administrés capturant la dysfonction mécanique et neurologique. Le traitement automatisé de ces scores implique des conversions en pourcentages et la gestion d'items non applicables. L'outil prédominant, le Neck Disability Index (NDI), a été conçu à l'origine comme une dérivation de l'Oswestry Low Back Pain Index.3 L'adaptation transculturelle en langue allemande a été menée par Cramer et al. (2014) sur des cohortes souffrant de douleurs cervicales mécaniques, démontrant une validité de construit robuste et une forte sensibilité au changement.5 L'analyse factorielle confirmatoire pour les versions traduites suggère qu'une structure unifactorielle ou bifactorielle peut être adoptée selon les implémentations logicielles.3 Du côté francophone, les travaux de Wlodyka-Demaille et al. (2002) ont certifié la transposition sémantique et la consistance interne.4

Pour l'implémentation IA, le score MCID (Minimal Clinically Important Difference) représente une variable dynamique qui doit être modulée en fonction de la pathologie d'entrée : le seuil est paramétré à 10 points pour une cervicalgie mécanique standard, mais s'élève à 13 points en présence d'une radiculopathie cervicale avérée, et s'abaisse à 5,5 points pour les douleurs mécaniques sans irradiation au membre supérieur.7 L'algorithme devra donc interroger le diagnostic clinique avant de classer l'évolution du patient.

| Propriété Psychométrique | NDI Version Française | NDI Version Allemande |
| :---- | :---- | :---- |
| **Cohérence Interne (Alpha)** | \> 0.80 | \> 0.85 |
| **Fiabilité Test-Retest (ICC)** | 0.81 \- 0.98 | 0.92 |
| **Erreur Standard (SEM)** | 3.0 \- 5.7 | 3.4 |
| **Changement Détectable (MDC)** | 8.4 \- 19.6 | 9.4 |
| **Validité Convergente** | r \= 0.70 (VAS) | r \= \-0.81 (SPADI) |

Neck Disability Index (NDI)

Partie du corps cible : Rachis cervical

Pathologie(s) évaluée(s) : Cervicalgie mécanique, radiculopathie cervicale, syndrome du coup de lapin (Whiplash Associated Disorders), douleurs cervicales non spécifiques aiguës ou chroniques

Validation FR : Confirmée (Wlodyka-Demaille et al., 2002\)

Validation DE : Confirmée (Cramer et al., 2014\)

Objectif de mesure : Quantification de l'incapacité fonctionnelle et du niveau de handicap perçu lors des activités de la vie quotidienne à la suite de troubles cervicaux. Évaluation de l'impact direct de la douleur sur l'autonomie personnelle, professionnelle et le sommeil.

Structure de cotation : 10 items évalués de 0 à 5, générant un score total de 0 à 50 converti algorithmiquement en pourcentage (0 à 100 %). Le MCID varie dynamiquement de 5,5 à 13 points selon l'étiologie clinique.

### **Rachis Thoracique et Lombaire**

Le diagnostic fonctionnel lombaire repose sur une dichotomie algorithmique stricte : les patients souffrant de déficits sévères ou chirurgicaux sont préférentiellement évalués par l'Oswestry Disability Index (ODI), tandis que les incapacités légères à modérées en soins primaires relèvent du Roland-Morris Disability Questionnaire (RMDQ).9 Le pipeline IA doit intégrer cette règle de routage pour optimiser la sensibilité des mesures de résultats.

L'ODI a été adapté en langue allemande par Osthus et al. (2006) avec une fiabilité test-retest exceptionnelle (ICC \= 0,96) et une erreur standard de mesure (SEM) évaluée à 3,4.9 La version allemande affiche une forte corrélation (r \= 0,78) avec l'échelle visuelle analogique (EVA) et le RMDQ (r \= 0,80).9 La version française, validée par Vogler et al. (2008), confirme un alpha de Cronbach de 0,87, attestant d'une grande homogénéité des items.12 La normalisation du score ODI est linéaire, le logiciel multipliant la somme brute par deux pour générer un index sur 100, traduisant 5 strates de sévérité clinique (minime, modérée, sévère, invalidante, grabataire).14

Le RMDQ propose une logique binaire sans pondération, évitant ainsi les contaminations croisées d'items.10 L'adaptation transculturelle allemande a été menée par Wiesinger et al. (1999) 15, tandis que la validation française a été consolidée par Zerkak et al. (2013), avec un alpha de Cronbach de 0,84 et un ICC de 0,89.16 La sensibilité au changement du RMDQ est particulièrement prononcée dans les cohortes chroniques, affichant une taille d'effet (Effect Size) impressionnante de 1,49 post-réhabilitation fonctionnelle.17 Le parsing de cet outil est optimal pour les bases de données vectorielles grâce à sa nature univariable (0 ou 1).

| Caractéristique Algorithmique | Oswestry Disability Index (ODI) | Roland-Morris (RMDQ) |
| :---- | :---- | :---- |
| **Cible Clinique Optimale** | Incapacité sévère / Post-opératoire | Incapacité légère à modérée |
| **Modèle de Données** | Ordinal (0 à 5 par item) | Binaire (0 ou 1 par item) |
| **Plage de Valeurs Normalisée** | 0 à 100 % | 0 à 24 points |
| **Sensibilité au changement** | MDC \= 9 points, MCID \= 10-15 pts | Taille d'effet \= 1.49, Haute réactivité |
| **Validité de Construit (FR/DE)** | ICC \= 0.96 (DE), Cronbach \= 0.87 (FR) | ICC \= 0.89 (FR), Cronbach \= 0.84 (FR) |

Oswestry Disability Index (ODI)

Partie du corps cible : Rachis lombaire

Pathologie(s) évaluée(s) : Lombalgie chronique non spécifique, sténose spinale, discopathie dégénérative, suivi de chirurgie rachidienne

Validation FR : Confirmée (Vogler et al., 2008\)

Validation DE : Confirmée (Osthus et al., 2006\)

Objectif de mesure : Mesure de l'impact limitant de la lombalgie sur les capacités fonctionnelles lourdes et les actes de la vie courante. Identification de la sévérité du handicap pour discriminer les indications chirurgicales des traitements conservateurs.

Structure de cotation : 10 items scorés de 0 à 5, score total multiplié par 2 pour obtenir un pourcentage (0 à 100 %). MCID statistiquement significatif entre 10,5 et 15 points.

Roland-Morris Disability Questionnaire (RMDQ)

Partie du corps cible : Rachis lombaire

Pathologie(s) évaluée(s) : Lombalgie aiguë, lombalgie subaiguë, lombalgie chronique d'intensité légère à modérée

Validation FR : Confirmée (Zerkak et al., 2013\)

Validation DE : Confirmée (Wiesinger et al., 1999\)

Objectif de mesure : Dépistage granulaire et auto-rapporté des limitations biomécaniques induites par la lombalgie. Suivi à haute fréquence de la récupération fonctionnelle en soins de première ligne.

Structure de cotation : 24 items à réponse binaire (Oui=1, Non=0), générant un score total de 0 à 24\. Absence de pondération permettant une réactivité statistique maximale (Taille d'effet \> 1.4).

## **Sphère Céphalique, Maxillo-Faciale et Vestibulaire**

L'intégration d'algorithmes dédiés aux dysfonctions neuro-sensorielles et cranio-mandibulaires requiert des outils capables de discriminer les interférences biomécaniques des atteintes proprioceptives.

### **Articulation Temporo-Mandibulaire**

Jaw Functional Limitation Scale (JFLS-20)

Partie du corps cible : Articulation temporo-mandibulaire (ATM) et système manducateur

Pathologie(s) évaluée(s) : Dysfonctions temporo-mandibulaires (DTM), bruxisme, arthrose de l'ATM, blocages articulaires

Validation FR : Confirmée (Goulet et al., DC/TMD Francophone)

Validation DE : Confirmée (Ohrbach et al., Consortium RDC/TMD International)

Objectif de mesure : Quantification de la limitation fonctionnelle globale du système manducateur, isolant mathématiquement la mastication, la mobilité verticale et l'expression verbale/émotionnelle.

Structure de cotation : 20 items (ou 8 items pour la version compressée JFLS-8) évalués sur une échelle de 0 (sans limitation) à 10 (limitation sévère). Le système IA doit générer une moyenne des items par construit afin d'éviter les biais liés aux données manquantes.

### **Système Vestibulaire**

Dizziness Handicap Inventory (DHI)

Partie du corps cible : Système vestibulaire et neuro-sensoriel global

Pathologie(s) évaluée(s) : Vertiges positionnels paroxystiques bénins (VPPB), névrite vestibulaire, maladie de Ménière, instabilité chronique posturo-motrice

Validation FR : Confirmée (Nyabenda et al., 2004\)

Validation DE : Confirmée (Kurre et al., 2009\)

Objectif de mesure : Évaluation quantitative du handicap auto-perçu généré par les troubles de l'équilibre. Segmentation de l'impact en trois facteurs de variance : physique, émotionnel et fonctionnel.

Structure de cotation : 25 items cotés selon une logique pondérée asymétrique (Oui=4, Parfois=2, Non=0), totalisant un score de 0 à 100\. L'algorithme doit déclencher une alerte de traitement expert pour tout score franchissant le seuil critique de 10 points.

## **Membre Supérieur**

L'analyse informatisée des membres supérieurs requiert la prise en compte de la chaîne cinématique fermée et ouverte. Les algorithmes doivent dissocier les atteintes distales des atteintes proximales tout en permettant l'intégration d'échelles globales.

### **Épaule**

Le Shoulder Pain and Disability Index (SPADI) est la pierre angulaire de l'évaluation gléno-humérale.18 La traduction et l'adaptation transculturelle de la version française ont fait l'objet d'un processus rigoureux en 7 étapes par Lathière et al. (2024), impliquant la traduction directe, la rétro-traduction en aveugle et la synthèse par comité d'experts pour assurer une validité de face inattaquable.19 Du côté germanophone, Angst et al. (2007) ont statué sur une fiabilité exceptionnelle de l'instrument avec un ICC atteignant 0,94 pour le score global, assorti de corrélations divergentes prédictibles avec le SF-36 et d'une validité convergente forte avec le DASH (r \= 0,88).2

L'intégration IA de la cotation SPADI exige un traitement de données spécifique : les réponses sont recueillies sur des échelles numériques ou visuelles analogiques (0 à 10), réparties en sous-catégories de douleur et de fonction.25 Le système doit tolérer jusqu'à deux items manquants en les remplaçant par la valeur moyenne de la sous-échelle correspondante afin de ne pas invalider le jeu de données.25 L'erreur standard de mesure (SEM) est identifiée à 8,9 pour la dimension algique et à 7,2 pour la fonction.24

| Sous-domaine SPADI | Métrique Psychométrique (DE/FR) | Valeurs Seuil de Traitement IA |
| :---- | :---- | :---- |
| **Score Total** | ICC \= 0.89 \- 0.94 | MCID \= 8 à 13 points |
| **Sous-échelle Douleur** | Cronbach \> 0.95, SEM \= 8.9 | Tolérance valeurs manquantes : max 1 |
| **Sous-échelle Fonction** | SEM \= 7.2 | Tolérance valeurs manquantes : max 2 |
| **Validité Convergente** | r \= 0.88 (avec DASH) | Pas d'effets plancher/plafond observés |

Shoulder Pain and Disability Index (SPADI)

Partie du corps cible : Articulation gléno-humérale et complexe de l'épaule

Pathologie(s) évaluée(s) : Tendinopathie de la coiffe des rotateurs, capsulite rétractile, arthrose de l'épaule, conflit sous-acromial, instabilité articulaire

Validation FR : Confirmée (Lathière et al., 2024\)

Validation DE : Confirmée (Angst et al., 2007\)

Objectif de mesure : Évaluation pondérée du spectre de la douleur et des limitations d'activité lors des sollicitations articulaires de l'épaule. Capture l'état clinique sur une fenêtre temporelle stricte restreinte à la dernière semaine écoulée.

Structure de cotation : 13 items divisés en Douleur (5) et Fonction (8) évalués de 0 à 10\. Les scores sont normalisés sur 100\. Le MCID global est paramétré à 8 points, avec une différence minimale détectable (MDC) de 17 à 18 points.

### **Coude**

L'interface de programmation (API) traitant les données du coude doit implémenter le Patient-Rated Tennis Elbow Evaluation (PRTEE) pour modéliser les tendinopathies proximales. Cet outil s'est révélé supérieur aux mesures génériques (comme le DASH) en termes de sensibilité pour l'épicondylite, avec une Standardized Response Mean (SRM) s'élevant à 2,1, garantissant la détection algorithmique de changements infimes.26

L'adaptation germanophone par Rompe et al. (2007) a solidifié sa consistance interne avec un alpha de Cronbach impressionnant de 0,94 pour la douleur et de 0,93 pour les activités spécifiques.26 Le processus de traduction croisée a été formellement validé sans ambiguïté sémantique.27 La validation francophone, pilotée par Fayolle-Minon et certifiée sans effet plancher ou plafond, confirme l'utilité du PRTEE-F en corrélant fortement ses résultats à l'outil DASH (validité convergente) et négativement aux sous-échelles divergentes du SF-36.29

L'algorithme de calcul du PRTEE opère sur une sommation asymétrique : la sous-échelle de douleur (5 items, max 50 points) s'additionne à la sous-échelle fonctionnelle (10 items, max 100 points, divisée algorithmiquement par 2 pour plafonner à 50).30 Le MCID est validé à 11 points, permettant une interprétation binaire d'amélioration post-traitement.31

| Propriété / Échelle PRTEE | Douleur (Pain) | Fonction (Function) | Total (Global) |
| :---- | :---- | :---- | :---- |
| **Cohérence (Cronbach DE)** | 0.94 | 0.85 \- 0.93 | \> 0.90 |
| **Plus Petit Changement (SDC)** | 8 points | 12 points | 17 points |
| **Seuil MCID / MIC** | 11 points | 4 points | 9 à 11.5 points |
| **Standardized Response Mean** | \- | \- | 2.1 (Très réactif) |

Patient-Rated Tennis Elbow Evaluation (PRTEE)

Partie du corps cible : Coude et insertions épicondylaires

Pathologie(s) évaluée(s) : Épicondylite latérale (Tennis Elbow), épicondylite médiale (Golfer's Elbow), tendinopathies d'insertion du coude

Validation FR : Confirmée (Fayolle-Minon et al.)

Validation DE : Confirmée (Rompe et al., 2007\)

Objectif de mesure : Identification analytique des pics de douleur nociceptive et des restrictions fonctionnelles lors d'activités asymétriques du membre supérieur. Spécifiquement conçu pour quantifier la gêne liée à la préhension et aux mouvements de torsion.

Structure de cotation : 15 items notés de 0 à 10\. La note fonctionnelle (sur 100\) est divisée par 2, puis ajoutée à la note de douleur (sur 50\) pour générer un score final sur 100\. Le MCID global est identifié à 11 points.

### **Poignet et Main**

Le parsing métrologique des segments distaux du membre supérieur nécessite une différenciation fine entre les outils globaux (DASH/QuickDASH) et locaux (PRWE). Le Patient-Rated Wrist Evaluation (PRWE) est l'équivalent topographique du PRTEE, optimisé pour l'articulation radiocarpienne. L'investigation de sa robustesse par John et al. (2007) pour la version allemande (PRWE-G) a dévoilé une excellente fiabilité (ICC \= 0,94) et une corrélation structurelle modérée avec la force de préhension sans douleur, prouvant que le ressenti subjectif capturé par l'outil reflète les variables biomécaniques objectives.32 La version française est dûment validée et exploitée en recherche translationnelle orthopédique.34

Les données du DASH (Disabilities of the Arm, Shoulder and Hand) et de sa version courte (QuickDASH) alimentent le système pour évaluer la capacité globale. La structure de ces échelles repose sur la sommation des réponses de 1 à 5\.36 La modélisation mathématique du score final \[((somme des valeurs/n) \- 1)\*25\] requiert un filtrage rigoureux : les modules de haute performance optionnels ne doivent jamais être calculés si des items sont omis, évitant ainsi la corruption du jeu de données.36 Le MCID est fixé par triangulation de données à 10,83 pour le DASH et 15,91 pour le QuickDASH, imposant au système une configuration asymétrique des alertes cliniques selon la version ingérée.37

| Métrologie du Poignet/Main | PRWE | DASH | QuickDASH |
| :---- | :---- | :---- | :---- |
| **Nombre d'Items Cœur** | 15 | 30 | 11 |
| **Échelle de Cotation Brute** | 0 à 10 | 1 à 5 | 1 à 5 |
| **Formule de Transformation** | (Fonction/2) \+ Douleur | \* 25 | \* 25 |
| **MCID Documenté** | 11.5 points | 10.83 points | 15.91 points |
| **MDC90 (Erreur de Mesure)** | 11.0 points | 10.81 points | 12.85 points |

Patient-Rated Wrist Evaluation (PRWE)

Partie du corps cible : Poignet et Main

Pathologie(s) évaluée(s) : Fractures du radius distal, instabilités carpiennes, ténosynovites, arthrose radio-carpienne

Validation FR : Confirmée (Mapi Research Trust / Institut de Recherche)

Validation DE : Confirmée (John et al., 2007\)

Objectif de mesure : Mesure de la douleur locale du poignet et évaluation de la déficience fonctionnelle causée par la pathologie articulaire. Isole le dysfonctionnement disto-palmaire sans interférence du reste du membre supérieur.

Structure de cotation : 15 items cotés de 0 à 10\. L'architecture de cotation pondère à parts égales la dimension douloureuse (50 points) et la dimension fonctionnelle (50 points) pour un score sur 100\. Le MCID s'élève à 11,5 points.

Disabilities of the Arm, Shoulder and Hand (DASH)

Partie du corps cible : Membre supérieur global

Pathologie(s) évaluée(s) : Pathologies traumatiques complexes, neuropathies périphériques, syndromes de surutilisation

Validation FR : Confirmée (Fayolle-Minon et al.)

Validation DE : Confirmée (Offenbaecher et al., 2003 / DASH-G)

Objectif de mesure : Suivi longitudinal de la capacité motrice et fonctionnelle de l'ensemble de la chaîne cinématique supérieure. Détermine l'impact des troubles sur les fonctions sociales, le sommeil et l'image de soi.

Structure de cotation : 30 items cotés de 1 à 5, convertis via une formule mathématique \[((somme/n)-1)\*25\] pour un résultat de 0 à 100\. MCID validé à 10,83 points, avec deux modules optionnels (sport/travail) évalués indépendamment.

QuickDASH (Q-DASH)

Partie du corps cible : Membre supérieur global

Pathologie(s) évaluée(s) : Affections orthopédiques et neurologiques diverses de l'épaule, du coude et de la main

Validation FR : Confirmée (Mapi Research Trust)

Validation DE : Confirmée (Mapi Research Trust / Institutions affiliées)

Objectif de mesure : Version algorithmiquement compressée pour limiter la fatigue cognitive du patient lors de l'administration répétée. Offre une puissance discriminante similaire au questionnaire original pour le suivi de routine.

Structure de cotation : 11 items utilisant la même échelle de 1 à 5 et la même formule de conversion \[((somme/n)-1)\*25\] que la version intégrale. La compression accroît le MCID à 15,91 points pour garantir la signification clinique du changement.

## **Membre Inférieur**

La modélisation de l'architecture musculo-squelettique du membre inférieur est prépondérante dans l'analyse de la charge, de la marche et de la cinétique. Les bases de données doivent harmoniser les réponses générées par les échelles KOOS et HOOS (modèles issus du WOMAC) 38 avec des index hautement focalisés tels que la gamme VISA pour les tendinopathies.40 L'interopérabilité des données est facilitée par la conversion systématique des scores en variables ascendantes (100 \= sain) ou descendantes (100 \= invalidité), un paramètre que le pipeline IA devra inverser si nécessaire pour unifier les analyses graphiques.

### **Hanche**

La métrologie de la hanche opère une dichotomisation stricte entre l'évaluation de la coxarthrose dégénérative (HOOS, OHS) et celle du syndrome douloureux du grand trochanter ou tendinopathie glutéale (VISA-G).

Le Hip disability and Osteoarthritis Outcome Score (HOOS), extension algorithmique du WOMAC, inclut la matrice originale LK 3.0, garantissant une rétrocompatibilité des données.39 L'adaptation germanophone a été conduite avec succès sur des populations de post-arthroplastie (Martinelli et al., Naal et al. 2015), confirmant une fiabilité test-retest (ICC) de 0,85 et une variance expliquée solide via le SF-36 (rho \= 0,97 pour la composante physique).41 La déclinaison francophone, orchestrée par Ornetti et al. (2010), révèle une absence d'effet plancher, autorisant une surveillance préventive.42 L'implémentation impose un suivi du MCID fragmenté : 15,1 pour la douleur, 9,6 pour les activités de base.43 L'Oxford Hip Score (OHS) agit en miroir pour un audit chirurgical allégé (12 items) sans biais observationnel.45 Les versions allemande (Naal et al., 2009\) 46 et française (Delaunay et al., 2009\) 48 présentent toutes deux une consistance interne de l'ordre de 0,87.

Pour les tendinopathies, le VISA-G (Victorian Institute of Sport Assessment for Gluteal Tendinopathy) s'impose comme un standard exclusif. La validation française, assurée par Locquet et al. (2019), démontre un excellent pouvoir de discrimination entre les populations saines et pathologiques, sans plafonnement algorithmique.49 La version allemande, intégrée via des essais cliniques (NCT04289922), maintient la fiabilité intrinsèque au format VISA.40

| Algorithme / Outil | HOOS | Oxford Hip Score (OHS) | VISA-G |
| :---- | :---- | :---- | :---- |
| **Sous-système Cible** | Coxarthrose globale, Post-opératoire | Validation chirurgicale (Arthroplastie) | Tendinopathie glutéale (GTPS) |
| **Structure Factorielle** | 5 sous-échelles (40 items) | 1 facteur principal (12 items) | 3 domaines fusionnés (8 items) |
| **Normalisation des Scores** | 0 à 100 (100 \= Sain) | 0 à 48 (48 \= Sain) | 0 à 100 (100 \= Sain) |
| **Sensibilité au Changement** | MDC95 \= 10.3 à 19.2 selon échelle | MDC90 \= 5 points | SDC \= 3.17 à 4.0 points |

Hip disability and Osteoarthritis Outcome Score (HOOS)

Partie du corps cible : Articulation coxo-fémorale

Pathologie(s) évaluée(s) : Arthrose primaire de hanche, nécrose avasculaire, dysplasie, suivi post-arthroplastie

Validation FR : Confirmée (Ornetti et al., 2010\)

Validation DE : Confirmée (Naal et al., 2015\)

Objectif de mesure : Évaluation détaillée de la perception des limitations cinématiques au niveau de la hanche. Outil holistique mesurant les déficits micro-moteurs quotidiens et l'incapacité liée aux pratiques récréatives.

Structure de cotation : 40 items répartis sur 5 sous-échelles, chaque item utilisant une gradation de 0 à 4\. Les scores par domaine sont normalisés sur 100\. Le MDC varie significativement selon la sous-échelle (9,6 pour les ADL, 15,1 pour la Douleur).

Oxford Hip Score (OHS)

Partie du corps cible : Articulation coxo-fémorale

Pathologie(s) évaluée(s) : Coxarthrose terminale, évaluation prédictive des résultats de prothèse totale de hanche (PTH)

Validation FR : Confirmée (Delaunay et al., 2009\)

Validation DE : Confirmée (Naal et al., 2009\)

Objectif de mesure : Détermination de la réussite chirurgicale par une métrique de douleur et de mobilité courte, focalisée sur la perception du patient. Élimine l'erreur inter-observateur induite par le jugement chirurgical direct.

Structure de cotation : 12 items évalués de 0 à 4, générant un score total maximal de 48 (l'absence de douleur et de gêne équivalant au maximum). Le MCID post-chirurgical s'établit autour de 8 points avec un seuil opérationnel (PASS) à 34 points pour déterminer l'absence d'indication opératoire.

Victorian Institute of Sport Assessment \- Gluteal (VISA-G)

Partie du corps cible : Grand trochanter et insertions musculaires fessières

Pathologie(s) évaluée(s) : Syndrome douloureux du grand trochanter (GTPS), bursite trochantérienne, tendinopathie du moyen/petit fessier

Validation FR : Confirmée (Locquet et al., 2019\)

Validation DE : Confirmée (Cohortes cliniques validées)

Objectif de mesure : Évaluation de la rigidité, de la tolérance à l'appui asymétrique et de la douleur en charge. Discrimine cliniquement le syndrome trochantérien des algies intra-articulaires pures.

Structure de cotation : 8 items à la pondération dynamique, incluant des questions à échelle continue et des questions catégorielles, totalisant un score maximal de 100 pour les sujets asymptomatiques. Différence minimale détectable fixée aux alentours de 4 points.

### **Genou**

La métrologie informatique du genou reproduit le triptyque modélisé pour la hanche. Le Knee injury and Osteoarthritis Outcome Score (KOOS) opère comme un capteur à large spectre, couvrant des lésions traumatiques (LCA, ménisques) jusqu'à la gonarthrose.38 Ornetti et al. (2008) ont certifié la transposition sémantique en français, assurant une fiabilité inter-critères équivalente.42 La traduction allemande de la version pédiatrique (KOOS-Child) démontre que cet outil gère les effets d'âge, avec des coefficients de reproductibilité test-retest r compris entre 0,85 et 0,94.53 Le système informatique devra prendre en compte l'existence du sous-score KOOS-PS (Physical Function Shortform) qui simplifie le recueil de la capacité physique brute avec un MCID équivalent.52

Parallèlement, l'Oxford Knee Score (OKS), validé en langue allemande par Naal et al. (2008), garantit une collecte de données exempte de variance systématique (Random error \= 6,2) et hautement convergente avec l'ADLS (r \= \-0,77).56 L'approche algorithmique de l'OKS, dépourvue d'effets plancher ou plafond, en fait un instrument de choix pour les registres orthopédiques automatisés.

L'évaluation de la jonction myotendineuse quadricipitale requiert le VISA-P. Le processus de validation germanophone (Lohkamp et al., 2011\) a généré le VISA-P-G, affichant une corrélation structurelle virtuellement parfaite avec le système de classification de Blazina (rho \= \-0,81).57 Les paramètres francophones ont été confirmés par Zwerver et Kaux, validant un instrument exigeant peu de temps d'administration mais une interprétation stricte du calcul des items 7 et 8\.58

| Dimensions du Genou | KOOS | Oxford Knee Score (OKS) | VISA-P |
| :---- | :---- | :---- | :---- |
| **Mécanisme d'Origine** | Traumatique ou Dégénératif | Dégénératif / Chirurgical | Surcharge Mécanique (Tendinopathie) |
| **Étendue des Items** | 42 (5 domaines distincts) | 12 (Domaine unique) | 8 (Calcul asymétrique) |
| **Cohérence Interne (α)** | 0.88 \- 0.94 | 0.83 (DE) | 0.88 (DE) |
| **Traitement IA (Score)** | Inversé (0=Sévère, 100=Sain) | Croissant (0=Sévère, 48=Sain) | Croissant (0=Sévère, 100=Sain) |

Knee injury and Osteoarthritis Outcome Score (KOOS)

Partie du corps cible : Articulations fémoro-tibiale et fémoro-patellaire

Pathologie(s) évaluée(s) : Rupture du ligament croisé, lésions méniscales, gonarthrose primaire et secondaire

Validation FR : Confirmée (Ornetti et al., 2008\)

Validation DE : Confirmée (Roos et al. / Institut de Recherche)

Objectif de mesure : Détermination de la trajectoire clinique globale du patient, capturant le retentissement à court terme des traumatismes et le déclin fonctionnel à long terme lié à l'ostéoarthrite.

Structure de cotation : 42 items répartis en 5 sous-échelles, générant des matrices de scores de 0 à 100 %. Le traitement informatique exige un calcul séparé pour chaque dimension, avec un MCID admis entre 8 et 10 points.

Oxford Knee Score (OKS)

Partie du corps cible : Articulation fémoro-tibiale

Pathologie(s) évaluée(s) : Gonarthrose terminale, évaluation des arthroplasties totales ou unicompartimentales du genou

Validation FR : Confirmée (Validation institutionnelle)

Validation DE : Confirmée (Naal et al., 2008\)

Objectif de mesure : Standardisation de la mesure du bénéfice prothétique, capturant le niveau de douleur persistante et le degré de recouvrement de l'amplitude de marche.

Structure de cotation : 12 items cotés de 0 à 4\. L'algorithme totalise le score sur un seuil absolu de 48\. La MDC90 est identifiée de manière stricte à 4 points pour déceler la variabilité liée à l'erreur de mesure pure.

Victorian Institute of Sport Assessment \- Patella (VISA-P)

Partie du corps cible : Tendon rotulien et complexe extenseur

Pathologie(s) évaluée(s) : Tendinopathie patellaire (Jumper's Knee), dysfonctions d'insertion quadricipitale

Validation FR : Confirmée (Kaux et al., Zwerver et al.)

Validation DE : Confirmée (Lohkamp et al., 2011\)

Objectif de mesure : Quantification de l'intensité nociceptive au cours de la mise en charge pliométrique et isométrique. Identifie la limite tolérable de l'activité sportive avant l'exacerbation tendineuse.

Structure de cotation : 8 items structurés de manière hétérogène (mixant échelles analogiques et incréments discrets) produisant un score continu de 0 à 100\. MCID paramétré à 11,0 points, nécessitant une analyse fine des items dynamiques (Q8).

### **Cheville et Pied**

Les structures logicielles traitant l'extrémité distale du membre inférieur s'appuient principalement sur le Foot and Ankle Ability Measure (FAAM) pour la fonction globale et le VISA-A pour la spécificité tissulaire achilléenne. Le processus de validation francophone du FAAM, mené par Borloz et al. (2011), a produit des coefficients de corrélation intraclasse ahurissants (0,97 pour les activités de base, 0,94 pour le sport) avec le score SF-36, validant l'exhaustivité de l'outil.59 La déclinaison germanophone, objectivée lors des travaux sur l'instabilité chronique par Migliorini et al. (2022), démontre une corrélation clinique valide entre le score FAAM et les données de posturographie informatisée.60 L'algorithme FAAM doit identifier les réponses « Not Applicable » pour ajuster le dénominateur de la formule mathématique en temps réel, évitant ainsi un effondrement artificiel du score.61

La charge tendineuse achilléenne est documentée par le VISA-A. L'adaptation cross-culturelle en langue allemande (VISA-A-G) par Lohrer et al. (2009) s'est appuyée sur les lignes directrices de validation avec tests cognitifs sur 77 sujets, garantissant une reproductibilité modérée à excellente.62 Les analyses statistiques croisées ont montré une puissante validité de construit face aux échelles génériques comme le score de Percy et Conochie.62 La version francophone de Kaux et al. a corroboré l'absence de divergence sémantique.58

| Spécificités Métriques Cheville/Pied | Foot and Ankle Ability Measure (FAAM) | VISA-A |
| :---- | :---- | :---- |
| **Objectif Clinique Central** | Mobilité posturale, Stabilité neuro-articulaire | Charge tendineuse axiale |
| **Mécanisme d'Ajustement Algorithmique** | Exclusion des valeurs « NA » du dénominateur | Pondération complexe de la douleur en charge |
| **Consistance (Cronbach)** | 0.97 (FR) | Élevée (selon la phase pathologique) |
| **Différence Détectable** | 7 pts (ADL) / 18 pts (Sports) | \> 10 points (MCID) |

Foot and Ankle Ability Measure (FAAM)

Partie du corps cible : Cheville, arrière-pied, médio-pied

Pathologie(s) évaluée(s) : Instabilité chronique de la cheville, entorses latérales, pathologies plantaires, déficits proprioceptifs post-traumatiques

Validation FR : Confirmée (Borloz et al., 2011\)

Validation DE : Confirmée (Migliorini et al. / Martin et al.)

Objectif de mesure : Évaluation unifiée des capacités fonctionnelles requérant un équilibre unipodal, un contrôle postural dynamique et une mobilité complète de la voûte plantaire.

Structure de cotation : 29 items scindés en deux échelles distinctes (21 ADL, 8 Sports). Les notes de 0 à 4 sont sommées et transformées en un pourcentage de capacité (0 à 100 %). L'architecture requiert la gestion stricte de la balise « N/A ».

Victorian Institute of Sport Assessment \- Achilles (VISA-A)

Partie du corps cible : Tendon d'Achille (corps et insertion)

Pathologie(s) évaluée(s) : Tendinopathies achilléennes dégénératives et réactives, suivi post-rupture et post-réparation

Validation FR : Confirmée (Kaux et al., 2014\)

Validation DE : Confirmée (Lohrer et al., 2009\)

Objectif de mesure : Index d'analyse discriminante isolant la raideur tendineuse matinale et les pics nociceptifs engendrés par les cycles d'étirement-raccourcissement successifs de la course.

Structure de cotation : 8 items générant un score synthétique allant de 0 à 100\. La structure mathématique attribue un poids prépondérant aux questions mesurant la fréquence de la douleur lors des entraînements. Le SDC (Smallest Detectable Change) impose un seuil d'amélioration strict de l'ordre de 10 points.

## **Kinésithérapie Cardiorespiratoire**

La gestion informatique des affections pulmonaires repose sur des questionnaires standardisés conçus pour transcender la simple mesure volumétrique (VEMS) et évaluer l'impact dyspnéique sur le métabolisme de base.

St. George's Respiratory Questionnaire (SGRQ)

Partie du corps cible : Système cardiorespiratoire

Pathologie(s) évaluée(s) : Bronchopneumopathie chronique obstructive (BPCO), asthme, bronchectasie

Validation FR : Confirmée (Adaptation Française \- CHU Nancy / SPLF)

Validation DE : Confirmée (Wittmann et al., 2014\)

Objectif de mesure : Mesure spécifique et sensible de l'impact des maladies obstructives des voies respiratoires sur la santé globale, la fonction quotidienne et le bien-être perçu.

Structure de cotation : 50 items répartis de manière algorithmique en 3 domaines vectoriels (Symptômes, Activité, Impacts). Le score varie de 0 à 100 (100 indiquant une détérioration maximale). Le MCID est cliniquement paramétré à un seuil critique de 4 points.

Severe Respiratory Insufficiency Questionnaire (SRI)

Partie du corps cible : Système respiratoire et fonction neuromusculaire périphérique

Pathologie(s) évaluée(s) : Insuffisance respiratoire chronique sévère, patients sous ventilation non invasive (VNI) à domicile

Validation FR : Confirmée (Cuvelier et al., 2012\)

Validation DE : Confirmée (Windisch et al., 2003 / Version originale)

Objectif de mesure : Évaluation fine de la qualité de vie liée à la santé pour les patients atteints de troubles respiratoires restrictifs ou obstructifs au stade de l'insuffisance sévère, intégrant les aspects de dépendance technique.

Structure de cotation : 49 items répartis en 7 sous-échelles. Les scores bruts sont normalisés sur un continuum de 0 à 100, où un score élevé indique paradoxalement une meilleure qualité de vie.

## **Kinésithérapie Vasculaire et Lymphatique**

L'intégration des troubles de la circulation lymphatique nécessite des instruments aptes à isoler l'impact de la stase liquidienne sur l'amplitude articulaire, la douleur et l'image corporelle.

Lymphedema Quality of Life Questionnaire (LYMQOL)

Partie du corps cible : Système lymphatique (Membres Inférieurs et Supérieurs)

Pathologie(s) évaluée(s) : Lymphœdèmes chroniques périphériques, lymphœdèmes primaires et secondaires

Validation FR : Confirmée (Mapi / Consortium international)

Validation DE : Confirmée (Schulz et al., 2024 / Nuwayhid et al., 2024\)

Objectif de mesure : Évaluation multidimensionnelle de l'impact du lymphœdème sur l'écologie du patient (symptômes physiques, image corporelle, retentissement émotionnel et fonction).

Structure de cotation : Composé de 4 domaines principaux et d'une échelle globale de qualité de vie. Les scores de domaine exigent l'addition algorithmique des valeurs de Likert (1 à 4\) avec une interprétation inversée (score élevé \= fort impact du lymphœdème).

Lymphedema Functioning, Disability and Health Questionnaire (Lymph-ICF-UL)

Partie du corps cible : Système lymphatique (Membre Supérieur)

Pathologie(s) évaluée(s) : Lymphœdème secondaire (post-curage axillaire / cancer du sein), lymphœdème primitif localisé

Validation FR : Confirmée (De Vrieze et al., 2020\)

Validation DE : Confirmée (Devoogdt et al., Mapi Research Trust)

Objectif de mesure : Quantification granulaire des déficiences, des limitations d'activité et des restrictions de participation induites spécifiquement par l'œdème du membre supérieur.

Structure de cotation : 29 items (version révisée) évalués sur une échelle numérique (0-10). Le système génère une moyenne des domaines, permettant au pipeline IA d'isoler l'impact physique de l'impact social.

## **Rééducation Pelvi-Périnéale**

L'évaluation de la sphère pelvienne doit standardiser le recueil de données souvent sujettes à des biais déclaratifs, nécessitant des questionnaires courts, fiables et non équivoques.

International Consultation on Incontinence Questionnaire \- Urinary Incontinence Short Form (ICIQ-UI SF)

Partie du corps cible : Sphère pelvi-périnéale et système urinaire

Pathologie(s) évaluée(s) : Incontinence urinaire d'effort, incontinence par impériosité, incontinence mixte, troubles neurologiques pelviens

Validation FR : Confirmée (ICIQ Network International)

Validation DE : Confirmée (Banerjee et al., 2010\)

Objectif de mesure : Dépistage accéléré et paramétrique de la fréquence, de la sévérité et de l'impact des fuites urinaires sur la qualité de vie globale du patient.

Structure de cotation : 4 items majeurs associés à une classification diagnostique. Le score final agrégé varie de 0 à 21\. L'outil agit comme un classificateur primaire de sévérité à injecter en base de données.

Pelvic Floor Impact Questionnaire (PFIQ-7)

Partie du corps cible : Sphère pelvi-périnéale

Pathologie(s) évaluée(s) : Dysfonctions globales du plancher pelvien, prolapsus des organes pelviens, incontinence fécale et urinaire

Validation FR : Confirmée (de Tayrac et al., 2007\)

Validation DE : Confirmée (Utomo et al. / Validation internationale)

Objectif de mesure : Évaluation structurelle du retentissement des troubles pelviens sur les dimensions fonctionnelles, sociales et émotionnelles, permettant un audit des traitements conservateurs et post-partum.

Structure de cotation : 3 sous-échelles de 7 items chacune. L'algorithme standardise les scores de chaque domaine pour produire un index cumulatif allant de 0 à 300 (sans effet plancher significatif).

## **Échelles Globales et Atteintes Neurologiques**

Les agents logiciels responsables de l'ingestion des données doivent impérativement intégrer des échelles globales pour standardiser les paramètres transversaux tels que la qualité de vie, l'appréhension du mouvement (kinésiophobie), et l'atteinte systémique des patients neurologiques. Ces questionnaires servent de variables de contrôle dans les modèles prédictifs.

### **Qualité de Vie et Évaluation Globale**

La gestion transversale de la santé musculo-squelettique repose sur le MSK-HQ (Musculoskeletal Health Questionnaire), un outil unificateur développé par l'Université d'Oxford.63 L'adaptation allemande (Karstens et al., 2020\) garantit une ICC de 0,87 avec une MIC (Minimal Important Change) de 8,5 points, validant ainsi son incorporation dans les flux de réadaptation en clinique primaire.6 La version française, éprouvée par Rapicault et al. (2023) et Beaudart, a démontré des capacités de prédiction exceptionnelles (Aire sous la courbe AUC \= 0,81) pour anticiper les améliorations globales de santé face au classique EQ-5D-5L.66 L'algorithme MSK-HQ offre une lisibilité universelle de la morbidité, agissant comme le biomarqueur digital équivalent à l'HbA1c pour le diabète.63

Musculoskeletal Health Questionnaire (MSK-HQ)

Partie du corps cible : Système musculo-squelettique global

Pathologie(s) évaluée(s) : Algies inflammatoires ou mécaniques polyarticulaires, douleur chronique, déficiences orthopédiques transversales

Validation FR : Confirmée (Rapicault et al., 2023 / Beaudart)

Validation DE : Confirmée (Karstens et al., 2020\)

Objectif de mesure : Capture standardisée de l'évolution holistique de l'état fonctionnel du patient. Intègre les variables confondues telles que la fatigue systémique, le sommeil, et le bien-être psycho-affectif lié à l'état musculo-squelettique.

Structure de cotation : 14 items cotés de 0 (sévère) à 4 (sain), l'équation délivrant un index absolu de 0 à 56\. Le MCID validé au niveau logiciel pour mesurer une transition longitudinale est codé à 5,5 points.

EQ-5D-5L (EuroQol- 5 Dimensions \- 5 Levels)

Partie du corps cible : Fonctionnement et santé globale

Pathologie(s) évaluée(s) : Pathologies chroniques multisystémiques, bilans de santé populationnels, études de morbi-mortalité

Validation FR : Confirmée (Andrade et al., 2020\)

Validation DE : Confirmée (Huber et al., 2017\)

Objectif de mesure : Génération d'une métrique d'utilité de santé ("Health Utility Instrument") pour les calculs médico-économiques (QALYs), capturant la mobilité, l'autonomie, les activités courantes, la douleur et l'anxiété/dépression.

Structure de cotation : 5 dimensions évaluées sur 5 niveaux de sévérité, couplées à une échelle visuelle analogique (EVA) de 0 à 100\. L'algorithme IA croise les valeurs avec les index pondérés sociétaux (Value Sets) spécifiques au pays cible.

### **Kinésiophobie et Croyances**

La persistance de la douleur non spécifique est majoritairement corrélée à l'évitement comportemental et à la catastrophisation.68 L'intelligence artificielle doit classer ces patients pour recommander des modules d'éducation thérapeutique. Le Tampa Scale of Kinesiophobia (TSK) évalue la kinésiophobie pure, avec un seuil algorithmique diagnostique fixé à 37 points (au-delà duquel le risque de chronicisation explose).68 L'analyse factorielle de ce questionnaire dicte au logiciel d'inverser le codage de 4 items spécifiques avant la sommation.69 Le Fear-Avoidance Beliefs Questionnaire (FABQ), validé en allemand par Pfingsten et al. (2000) et en français par Chaory et al. (2004), sépare mathématiquement les appréhensions liées à l'activité physique et celles liées au contexte professionnel.70 La sous-échelle professionnelle du FABQ (variance expliquée de 35 %) est le prédicteur principal du retour au travail dans les bases de données d'assurance invalidité.71

Tampa Scale of Kinesiophobia (TSK)

Partie du corps cible : Global (Système cognitivo-comportemental)

Pathologie(s) évaluée(s) : Syndromes douloureux chroniques intraitables, fibromyalgie, cervicalgie/lombalgie chronique avec blocage psycho-moteur

Validation FR : Confirmée (Adaptation francophone suisse / Mapi Research Trust)

Validation DE : Confirmée (Pfingsten et al. / Adaptation germano-suisse)

Objectif de mesure : Mesure quantitative du spectre de la peur du mouvement corporel et de la crainte irrationnelle de récidive traumatique. Isoler la barrière psychologique qui maintient le patient dans une boucle d'évitement.

Structure de cotation : 17 items (TSK-17) générant des valeurs sur une échelle de Likert à 4 points. Le score global oscille de 17 à 68, nécessitant une inversion mathématique des items 4, 8, 12, et 16\. Un résultat supérieur à 37 classifie formellement le sujet comme kinésiophobe.

Fear-Avoidance Beliefs Questionnaire (FABQ)

Partie du corps cible : Global (Système cognitivo-comportemental et dos)

Pathologie(s) évaluée(s) : Lombalgie chronique, incapacités professionnelles prolongées d'origine musculo-squelettique

Validation FR : Confirmée (Chaory et al., 2004\)

Validation DE : Confirmée (Pfingsten et al., 2000\)

Objectif de mesure : Segmentation paramétrique des croyances dysfonctionnelles concernant l'influence du travail et de l'effort physique sur la sévérité de la blessure. Établir une valeur prédictive d'invalidité à long terme.

Structure de cotation : 16 items structurés en deux variables factorielles indépendantes : Croyances d'Activité Physique (de 0 à 24\) et Croyances de Travail (de 0 à 42). L'échelle asymétrique utilise des notes allant de 0 à 6\. Test-retest garanti par un ICC de 0,87.

Hospital Anxiety and Depression Scale (HADS)

Partie du corps cible : Système cognitivo-affectif global

Pathologie(s) évaluée(s) : Retentissement des pathologies somatiques lourdes (polyarthrite, fibromyalgie, douleur chronique)

Validation FR : Confirmée (Bocéréan et Dupret, 2014\)

Validation DE : Confirmée (Herrmann, 1997\)

Objectif de mesure : Dépistage strict de la symptomatologie dépressive et anxieuse en excluant délibérément les facteurs somatiques (insomnie, fatigue) pour éviter la contamination croisée avec la maladie physique.

Structure de cotation : 14 items (7 pour l'anxiété, 7 pour la dépression). Chaque sous-score varie de 0 à 21\. L'algorithme fixe un seuil d'alerte diagnostique ("symptomatologie certaine") à 11 points et plus pour chaque dimension.

### **Atteintes Neurologiques Centrales et Périphériques**

Les matrices évaluatives en neurologie requièrent l'absorption d'énormes volumes de données vectorielles pour chaque patient, en raison de la nature polymorphe des lésions du système nerveux (SNC et SNP).

La Stroke Impact Scale (SIS) domine la réadaptation post-AVC. L'adaptation transculturelle allemande, réalisée par Petersen et al. (2001), et la déclinaison française de Caël et al. (2015), attestent d'une parfaite convergence des dimensions psychométriques.73 L'architecture du SIS, incluant 64 variables réparties sur 8 domaines, nécessite l'implémentation de filtres algorithmiques pour isoler les effets de plafond substantiels (souvent \> 10 % dans la récupération de la motricité fine), particulièrement visibles dans le domaine physique.73 La sclérose en plaques (SEP) est modélisée au travers de la Multiple Sclerosis Impact Scale (MSIS-29), validée linguistiquement par le consortium Mapi et Osmani pour les langues cibles.76 Les analyses factorielles en essais cliniques confirment que le MSIS-29 tolère très peu de données manquantes (moins de 3,9 % de taux d'échec), optimisant la prédictibilité statistique et certifiant sa robustesse avec des ICC dépassant 0,91.78

L'autonomie globale est évaluée via le Rivermead Mobility Index (RMI) et la Functional Independence Measure (FIM). Leurs architectures de données se complètent : le RMI agit comme un discriminateur binaire précoce de la mobilité, tandis que la FIM fournit un profil de dépendance complet à 7 strates, utilisé universellement comme métrique du fardeau en soins infirmiers. Enfin, les myopathies inflammatoires et génétiques nécessitent le Myositis Activities Profile (MAP) pour quantifier algorithmiquement les limitations d'efforts face à la dégénérescence musculaire.

| Dimensions Neurologiques | SIS (Post-AVC) | MSIS-29 (SEP) | PDQ-39 (Parkinson) | FIM (MIF) |
| :---- | :---- | :---- | :---- | :---- |
| **Nombre de Variables** | 64 | 29 | 39 | 18 |
| **Pôle Principal** | Indépendance multifactorielle | Impact physique et psychique | Dégradation extrapyramidale | Dépendance (Fardeau de soin) |
| **Robustesse (ICC/Alpha)** | Modérée à Haute | ICC \> 0.91 | Cronbach \= 0.72 \- 0.95 | ICC \= 0.83 \- 0.96 |
| **Biais de Modèle** | Effet de Plafond Fréquent | Très faible taux de valeurs nulles | Effet plancher sur les cas légers | Formation requise pour l'évaluateur |

Stroke Impact Scale (SIS)

Partie du corps cible : Système nerveux central et appareil locomoteur généralisé

Pathologie(s) évaluée(s) : Accident Vasculaire Cérébral (AVC) ischémique ou hémorragique, séquelles spastiques, hémiplégie, déficits cognitivo-moteurs

Validation FR : Confirmée (Caël et al., 2015\)

Validation DE : Confirmée (Petersen et al., 2001\)

Objectif de mesure : Exhaustivité de l'inventaire des conséquences fonctionnelles consécutives à un AVC. Capture systémique de la motricité croisée, des facultés communicationnelles, mémorielles et de l'autonomie.

Structure de cotation : 64 items (version 2.0/3.0) cartographiés sur 8 algorithmes de domaine. Le calcul normalise les notes brutes pour produire un score sur 100\. Les MCID exigés varient drastiquement selon le domaine affecté (de 15,1 à 25,9 points de changement requis).

Multiple Sclerosis Impact Scale (MSIS-29)

Partie du corps cible : Système nerveux central et capacités somato-cognitives

Pathologie(s) évaluée(s) : Sclérose en plaques (formes rémittentes et progressives), lésions myéliniques focales, dysfonctions sensori-motrices

Validation FR : Confirmée (Osmani et al. / Mapi Research Trust)

Validation DE : Confirmée (Osmani et al. / Mapi Research Trust)

Objectif de mesure : Index de morbidité binaire centré sur le patient mesurant avec précision le fardeau physiologique et psychologique sur la quinzaine écoulée. Hautement réactif pour l'évaluation de la thérapie corticostéroïde.

Structure de cotation : 29 items distribués en une cohorte Physique (20) et Psychologique (9). Chaque réponse s'incrémente de 1 à 5\. L'algorithme central convertit les agrégats de chaque dimension en un pourcentage normatif de 0 à 100\.

Parkinson's Disease Questionnaire (PDQ-39)

Partie du corps cible : Système nerveux central (Ganglions de la base) et système extrapyramidal

Pathologie(s) évaluée(s) : Maladie de Parkinson idiopathique, dyskinésies primaires, phénomènes de fluctuation motrice ("Wearing-off")

Validation FR : Confirmée (Guillemin et al. / Mapi Research Trust)

Validation DE : Confirmée (Schönenberg et al., 2022 / Jenkinson et al.)

Objectif de mesure : Détermination de la sévérité perçue des altérations extrapyramidales (rigidité, bradykinésie, tremblement) sur l'écologie du patient. Dépistage de la dégradation de la sphère émotionnelle et de la stigmatisation sociale.

Structure de cotation : 39 items ventilés mathématiquement en 8 modules de variance allant de la mobilité (10 items) à l'inconfort somatique (3 items). Convertis selon l'algorithme de Likert sans pondération croisée en index global allant de 0 à 100\.

Rivermead Mobility Index (RMI)

Partie du corps cible : Système moteur global et contrôle postural

Pathologie(s) évaluée(s) : Lésions neurologiques centrales, hémiplégie post-AVC, traumatismes crâniens

Validation FR : Confirmée (Collen et al. / Validation francophone)

Validation DE : Confirmée (Schindl et al., 2000\)

Objectif de mesure : Quantification strictement dichotomique de l'autonomie motrice fondamentale, du retournement dans le lit à la course fonctionnelle.

Structure de cotation : 15 items évalués de manière binaire (0 ou 1), comprenant 14 questions auto-rapportées et une évaluation d'observation directe. Score maximal de 15\.

Functional Independence Measure (MIF)

Partie du corps cible : Fonctions neuromotrices et intellectuelles (Global)

Pathologie(s) évaluée(s) : Polytraumatisme, sclérose en plaques, AVC, lésions médullaires (paraplégie/tétraplégie)

Validation FR : Confirmée (Gautheron et al., 2008\)

Validation DE : Confirmée (Consortium International de Médecine Physique et Réadaptation)

Objectif de mesure : Identification et mesure du fardeau de soins ("Burden of Care"). Évalue quantitativement la charge de travail tierce ou les nécessités d'aides techniques pour la réalisation des activités primaires.

Structure de cotation : 18 variables cotées sur une matrice ordinale stricte à 7 strates. L'algorithme totalise un score de 18 à 126, classifiant le sujet de la "dépendance totale" (18-45 points) à "l'indépendance complète" (126 points).

Fatigue Impact Scale (FIS / EMIF-SEP)

Partie du corps cible : Fonctions du système nerveux central

Pathologie(s) évaluée(s) : Sclérose en plaques, affections démyélinisantes, pathologies dysimmunitaires

Validation FR : Confirmée (Debouverie et al., 2007\)

Validation DE : Confirmée (Häuser et al., 2003\)

Objectif de mesure : Paramétrisation de la fatigue pathologique en la scindant de la composante dépressive. Mesure l'impact direct de la fatigue sur les capacités cognitives, physiques et psycho-sociales du sujet atteint de maladie neurologique.

Structure de cotation : 40 items notés sur une échelle de Likert de 0 (aucun problème) à 4 (problème extrême), permettant d'extraire des sous-scores dimensionnels pour un ciblage thérapeutique précis.

Myositis Activities Profile (MAP)

Partie du corps cible : Système neuromusculaire périphérique

Pathologie(s) évaluée(s) : Polymyosite, dermatomyosite, myopathies inflammatoires et déficits de la ceinture proximale

Validation FR : Confirmée (Réseau Neuromusculaire / Standards de Validation Transculturelle)

Validation DE : Confirmée (Baschung Pfister et al., 2019\)

Objectif de mesure : Analyse algorithmique du delta entre la difficulté d'exécution d'une tâche motrice et son importance subjective pour le patient atteint d'une atteinte myopathique périphérique.

Structure de cotation : 32 items évalués via un barème continu (1 \= facile, 7 \= impossible). Le système utilise la valeur médiane des sous-domaines pour modéliser une fonction de sévérité exempte de distorsions mathématiques.

#### **Sources des citations**

1. Un guide de validation transculturelle des instruments de mesure en santé mentale, consulté le avril 27, 2026, [https://instrumentspsychometriques.mcgill.ca/instruments/guide.htm](https://instrumentspsychometriques.mcgill.ca/instruments/guide.htm)  
2. Cross-cultural adaptation, reliability and validity of the German Shoulder Pain and Disability Index (SPADI) \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/16720638/](https://pubmed.ncbi.nlm.nih.gov/16720638/)  
3. Validation of the German version of the Neck Disability Index (NDI) \- PMC, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC3999938/](https://pmc.ncbi.nlm.nih.gov/articles/PMC3999938/)  
4. French translation and validation of a functional disability scale for neck pain | Request PDF, consulté le avril 27, 2026, [https://www.researchgate.net/publication/11761453\_French\_translation\_and\_validation\_of\_a\_functional\_disability\_scale\_for\_neck\_pain](https://www.researchgate.net/publication/11761453_French_translation_and_validation_of_a_functional_disability_scale_for_neck_pain)  
5. Validation of the German version of the Neck Disability Index (NDI) \- OUCI, consulté le avril 27, 2026, [https://ouci.dntb.gov.ua/en/works/lxqe2EL9/](https://ouci.dntb.gov.ua/en/works/lxqe2EL9/)  
6. German translation, cross-cultural adaptation and validation of the Musculoskeletal Health Questionnaire: a cohort study \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/32975396/](https://pubmed.ncbi.nlm.nih.gov/32975396/)  
7. Neck Disability Index Explained: NDI score interpretation, consulté le avril 27, 2026, [https://www.sprypt.com/proms/neck-disability-index](https://www.sprypt.com/proms/neck-disability-index)  
8. The Psychometric Properties of the Neck Disability Index: a Comprehensive Review, consulté le avril 27, 2026, [https://spinalmanipulation.org/2014/12/03/the-psychometric-properties-of-the-neck-disability-index-a-comprehensive-review/](https://spinalmanipulation.org/2014/12/03/the-psychometric-properties-of-the-neck-disability-index-a-comprehensive-review/)  
9. Development of a German version of the Oswestry Disability Index. Part 1: cross-cultural adaptation, reliability, and validity \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/15856341/](https://pubmed.ncbi.nlm.nih.gov/15856341/)  
10. Back related outcome assessment instruments \- PMC \- NIH, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC3454553/](https://pmc.ncbi.nlm.nih.gov/articles/PMC3454553/)  
11. Cross-Cultural Adaptation of a German Version of the Oswestry Disability Index and Evaluation of Its Measurement Properties \- Study Guide, consulté le avril 27, 2026, [https://studyguide.meduniwien.ac.at/curriculum/n202-2017/attachment/6070/download/orthopaedie-oswestry.pdf](https://studyguide.meduniwien.ac.at/curriculum/n202-2017/attachment/6070/download/orthopaedie-oswestry.pdf)  
12. Oswestry Disability Index (ODI) \- ePROVIDE \- Mapi Research Trust, consulté le avril 27, 2026, [https://eprovide.mapi-trust.org/instruments/oswestry-disability-index](https://eprovide.mapi-trust.org/instruments/oswestry-disability-index)  
13. \[Cross-cultural validation of the Oswestry disability index in French\] \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/18501463/](https://pubmed.ncbi.nlm.nih.gov/18501463/)  
14. Oswestry Disability Index \- Wikipedia, consulté le avril 27, 2026, [https://en.wikipedia.org/wiki/Oswestry\_Disability\_Index](https://en.wikipedia.org/wiki/Oswestry_Disability_Index)  
15. ROLAND AND MORRIS QUESTIONNAIRE \- OARSI, consulté le avril 27, 2026, [https://oarsi.org/sites/oarsi/files/docs/2013/roland\_and\_morris\_questionnaire.pdf](https://oarsi.org/sites/oarsi/files/docs/2013/roland_and_morris_questionnaire.pdf)  
16. RMDQ-24 | Roland-Morris Disability Questionnaire \- 24 items described in ePROVIDE, consulté le avril 27, 2026, [https://eprovide.mapi-trust.org/instruments/roland-morris-disability-questionnaire-24-items](https://eprovide.mapi-trust.org/instruments/roland-morris-disability-questionnaire-24-items)  
17. Validation of a French version of Roland-Morris questionnaire in chronic low back pain patients \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/24201022/](https://pubmed.ncbi.nlm.nih.gov/24201022/)  
18. Reliability and validity of the Shoulder Pain and Disability Index in a sample of patients with frozen shoulder \- PMC, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10032005/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10032005/)  
19. French translation and transcultural adaptation of the shoulder pain and disability index (SPADI). \- Nuffield Department of Orthopaedics, Rheumatology and Musculoskeletal Sciences, consulté le avril 27, 2026, [https://www.ndorms.ox.ac.uk/publications/2054231](https://www.ndorms.ox.ac.uk/publications/2054231)  
20. (PDF) French translation and transcultural adaptation of the Shoulder Pain and Disability Index (SPADI) \- ResearchGate, consulté le avril 27, 2026, [https://www.researchgate.net/publication/385224845\_French\_translation\_and\_transcultural\_adaptation\_of\_the\_Shoulder\_Pain\_and\_Disability\_Index\_SPADI](https://www.researchgate.net/publication/385224845_French_translation_and_transcultural_adaptation_of_the_Shoulder_Pain_and_Disability_Index_SPADI)  
21. French translation and transcultural adaptation of the shoulder pain and disability index (SPADI) \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/39500021/](https://pubmed.ncbi.nlm.nih.gov/39500021/)  
22. Translation of the Shoulder Pain and Disability Index and psychometric evaluation of the Swedish version \- PMC, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12972979/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12972979/)  
23. Cross-cultural adaptation, reliability and validity of the German Shoulder Pain and Disability Index (SPADI) \- ResearchGate, consulté le avril 27, 2026, [https://www.researchgate.net/publication/7061356\_Cross-cultural\_adaptation\_reliability\_and\_validity\_of\_the\_German\_Shoulder\_Pain\_and\_Disability\_Index\_SPADI](https://www.researchgate.net/publication/7061356_Cross-cultural_adaptation_reliability_and_validity_of_the_German_Shoulder_Pain_and_Disability_Index_SPADI)  
24. Shoulder Pain And Disability Index | RehabMeasures Database \- Shirley Ryan AbilityLab, consulté le avril 27, 2026, [https://www.sralab.org/rehabilitation-measures/shoulder-pain-and-disability-index](https://www.sralab.org/rehabilitation-measures/shoulder-pain-and-disability-index)  
25. SPADI \- Shoulder Pain Disability Index | PDF & Online Calculator \- Physiotutors, consulté le avril 27, 2026, [https://www.physiotutors.com/questionnaires/shoulder-pain-disability-index-spadi/](https://www.physiotutors.com/questionnaires/shoulder-pain-disability-index-spadi/)  
26. Validation of the Patient-rated Tennis Elbow Evaluation Questionnaire \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/17254903/](https://pubmed.ncbi.nlm.nih.gov/17254903/)  
27. Patient-Rated Tennis Elbow Evaluation (PRTEE): Translation and Cross-Cultural Adaptation into German | Request PDF \- ResearchGate, consulté le avril 27, 2026, [https://www.researchgate.net/publication/340126671\_Patient-Rated\_Tennis\_Elbow\_Evaluation\_PRTEE\_Translation\_and\_Cross-Cultural\_Adaptation\_into\_German](https://www.researchgate.net/publication/340126671_Patient-Rated_Tennis_Elbow_Evaluation_PRTEE_Translation_and_Cross-Cultural_Adaptation_into_German)  
28. Patient-Rated Tennis Elbow Evaluation (PRTEE) \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/32207123/](https://pubmed.ncbi.nlm.nih.gov/32207123/)  
29. Cross-cultural adaptation and validation of the Patient-Rated Tennis Elbow Evaluation Questionnaire on lateral elbow tendinopathy for French-speaking patients \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/27769841/](https://pubmed.ncbi.nlm.nih.gov/27769841/)  
30. Measurement properties of core outcomes in patients with tennis elbow \- PMC, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12122481/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12122481/)  
31. The Minimum Clinically Important Difference of the Patient-rated Wrist Evaluation Score for Patients With Distal Radius Fractures \- PMC, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC4562929/](https://pmc.ncbi.nlm.nih.gov/articles/PMC4562929/)  
32. Reliability and validity of the German version of "the Patient-rated Wrist Evaluation (PRWE)" as an outcome measure of wrist pain and disability in patients with acute distal radius fractures \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/19006763/](https://pubmed.ncbi.nlm.nih.gov/19006763/)  
33. The Patient-Rated Wrist Evaluation (PRWE): cross-cultural adaptation into German and evaluation of its psychometric properties \- Clinical and Experimental Rheumatology, consulté le avril 27, 2026, [https://www.clinexprheumatol.org/article.asp?a=3534](https://www.clinexprheumatol.org/article.asp?a=3534)  
34. PROMs studies – FESSH – Federation of European Societies for the Surgery of the Hand, consulté le avril 27, 2026, [https://fessh.com/proms-studies/](https://fessh.com/proms-studies/)  
35. The Patient-Rated Wrist Evaluation (PRWE): An Expert Guide \- ResRef, consulté le avril 27, 2026, [https://resref.com/patient-rated-wrist-evaluation-prwe-guide/](https://resref.com/patient-rated-wrist-evaluation-prwe-guide/)  
36. Disabilities of the Arm, Shoulder, and Hand Questionnaire \- Shirley Ryan AbilityLab, consulté le avril 27, 2026, [https://www.sralab.org/rehabilitation-measures/disabilities-arm-shoulder-and-hand-questionnaire](https://www.sralab.org/rehabilitation-measures/disabilities-arm-shoulder-and-hand-questionnaire)  
37. Minimal Clinically Important Difference of the Disabilities of the Arm, Shoulder and Hand Outcome Measure (DASH) and Its Shortened Version (QuickDASH) | Journal of Orthopaedic & Sports Physical Therapy \- jospt, consulté le avril 27, 2026, [https://www.jospt.org/doi/full/10.2519/jospt.2014.4893?src=recsys](https://www.jospt.org/doi/full/10.2519/jospt.2014.4893?src=recsys)  
38. The Knee injury and Osteoarthritis Outcome Score (KOOS): from joint injury to osteoarthritis ... \- PMC \- NIH, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC280702/](https://pmc.ncbi.nlm.nih.gov/articles/PMC280702/)  
39. Hip disability and Osteoarthritis Outcome Score (HOOS) \- ePROVIDE \- Mapi Research Trust, consulté le avril 27, 2026, [https://eprovide.mapi-trust.org/instruments/hip-disability-and-osteoarthritis-outcome-score](https://eprovide.mapi-trust.org/instruments/hip-disability-and-osteoarthritis-outcome-score)  
40. Development and validation of a VISA tendinopathy questionnaire for greater trochanteric pain syndrome, the VISA-G \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/25870117/](https://pubmed.ncbi.nlm.nih.gov/25870117/)  
41. Translation, Cross-Cultural Adaptation, and Psychometric Properties of the German Version of the Hip Disability and Osteoarthritis Outcome Score \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/25394689/](https://pubmed.ncbi.nlm.nih.gov/25394689/)  
42. Cross-Culturally Adapted Versions of Patient Reported Outcome Measures for the Lower Extremity \- PMC, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10324371/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10324371/)  
43. Hip Disability and Osteoarthritis Outcome Score \- Shirley Ryan AbilityLab, consulté le avril 27, 2026, [https://www.sralab.org/rehabilitation-measures/hip-disability-and-osteoarthritis-outcome-score](https://www.sralab.org/rehabilitation-measures/hip-disability-and-osteoarthritis-outcome-score)  
44. Recommended MSK indicator set appendix 3 \- Arthritis UK, consulté le avril 27, 2026, [https://www.arthritis-uk.org/media/2126/recommended-msk-indicator-set-appendix-3.pdf](https://www.arthritis-uk.org/media/2126/recommended-msk-indicator-set-appendix-3.pdf)  
45. The Oxford Hip Score (OHS), consulté le avril 27, 2026, [https://innovation.ox.ac.uk/outcome-measures/oxford-hip-score-ohs/](https://innovation.ox.ac.uk/outcome-measures/oxford-hip-score-ohs/)  
46. Reliability and validity of the cross-culturally adapted German Oxford hip score \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/18726655/](https://pubmed.ncbi.nlm.nih.gov/18726655/)  
47. Reliability and Validity of the Cross-Culturally Adapted German Oxford Hip Score \- PMC, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC2650060/](https://pmc.ncbi.nlm.nih.gov/articles/PMC2650060/)  
48. Cross-cultural adaptations of the Oxford-12 HIP score to the French speaking population \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/19345630/](https://pubmed.ncbi.nlm.nih.gov/19345630/)  
49. French Translation and Validation of the Victorian Institute of Sports Assessment for Gluteal Tendinopathy Questionnaire | Request PDF \- ResearchGate, consulté le avril 27, 2026, [https://www.researchgate.net/publication/340866730\_French\_Translation\_and\_Validation\_of\_the\_Victorian\_Institute\_of\_Sports\_Assessment\_for\_Gluteal\_Tendinopathy\_Questionnaire](https://www.researchgate.net/publication/340866730_French_Translation_and_Validation_of_the_Victorian_Institute_of_Sports_Assessment_for_Gluteal_Tendinopathy_Questionnaire)  
50. French Translation and Validation of the Victorian Institute of Sports Assessment for Gluteal Tendinopathy Questionnaire \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/32323468/](https://pubmed.ncbi.nlm.nih.gov/32323468/)  
51. Study Details | NCT04289922 | Validation of the Norwegian VISA-G Questionnaire, consulté le avril 27, 2026, [https://clinicaltrials.gov/study/NCT04289922](https://clinicaltrials.gov/study/NCT04289922)  
52. Table 1 from Comparative, validity and responsiveness of the HOOS-PS and KOOS-PS to the WOMAC physical function subscale in total joint replacement for osteoarthritis. | Semantic Scholar, consulté le avril 27, 2026, [https://www.semanticscholar.org/paper/Comparative%2C-validity-and-responsiveness-of-the-and-Davis-Perruccio/38af3d35fccd7d3ab1b4d9984e7f1ae407d3c5dd/figure/0](https://www.semanticscholar.org/paper/Comparative%2C-validity-and-responsiveness-of-the-and-Davis-Perruccio/38af3d35fccd7d3ab1b4d9984e7f1ae407d3c5dd/figure/0)  
53. (PDF) The German version of the KOOS-Child questionnaire (Knee injury and Osteoarthritis Outcome Score for children) shows a good to excellent internal consistency and a high test–retest reliability in children with knee problems \- ResearchGate, consulté le avril 27, 2026, [https://www.researchgate.net/publication/362364566\_The\_German\_version\_of\_the\_KOOS-Child\_questionnaire\_Knee\_injury\_and\_Osteoarthritis\_Outcome\_Score\_for\_children\_shows\_a\_good\_to\_excellent\_internal\_consistency\_and\_a\_high\_test-retest\_reliability\_in\_childr](https://www.researchgate.net/publication/362364566_The_German_version_of_the_KOOS-Child_questionnaire_Knee_injury_and_Osteoarthritis_Outcome_Score_for_children_shows_a_good_to_excellent_internal_consistency_and_a_high_test-retest_reliability_in_childr)  
54. The German version of the KOOS-Child questionnaire (Knee injury and Osteoarthritis Outcome Score for children) shows a good to excellent internal consistency and a high test-retest reliability in children with knee problems \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/35907029/](https://pubmed.ncbi.nlm.nih.gov/35907029/)  
55. Comparative, validity and responsiveness of the HOOS-PS and KOOS-PS to the WOMAC physical function subscale in total joint replacement for osteoarthritis \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/19215728/](https://pubmed.ncbi.nlm.nih.gov/19215728/)  
56. The 12-item Oxford Knee Score: cross-cultural adaptation into German and assessment of its psychometric properties in patients with osteoarthritis of the knee \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/18602843/](https://pubmed.ncbi.nlm.nih.gov/18602843/)  
57. Cross-cultural adaptation and validation of the VISA-P questionnaire for German-speaking patients with patellar tendinopathy \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/21289458/](https://pubmed.ncbi.nlm.nih.gov/21289458/)  
58. Validity and reliability of the French translation of the VISA-A questionnaire for Achilles tendinopathy \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/26860592/](https://pubmed.ncbi.nlm.nih.gov/26860592/)  
59. Evidence for validity and reliability of a French version of the FAAM \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/21303520/](https://pubmed.ncbi.nlm.nih.gov/21303520/)  
60. Validation of Foot and Ankle Ability Measure (FAAM) and the Foot and Ankle Outcome Score (FAOS) in individuals with chronic ankle instability: a cross-sectional observational study \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/35062990/](https://pubmed.ncbi.nlm.nih.gov/35062990/)  
61. Foot and Ankle Ability Measure (FAAM) Activities of Daily Living Subscale Please Answer every question with one response that m, consulté le avril 27, 2026, [https://cdn-links.lww.com/permalink/jg9/a/jg9\_2021\_10\_25\_shah\_21-00103\_sdc2.pdf](https://cdn-links.lww.com/permalink/jg9/a/jg9_2021_10_25_shah_21-00103_sdc2.pdf)  
62. Cross-cultural adaptation and validation of the VISA-A questionnaire for German-speaking achilles tendinopathy patients \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/19878572/](https://pubmed.ncbi.nlm.nih.gov/19878572/)  
63. Musculoskeletal Health Questionnaire (MSK-HQ) \- Arthritis UK, consulté le avril 27, 2026, [https://www.arthritis-uk.org/policy-and-data/health-intelligence/musculoskeletal-health-questionnaire-msk-hq/](https://www.arthritis-uk.org/policy-and-data/health-intelligence/musculoskeletal-health-questionnaire-msk-hq/)  
64. Arthritis UK Musculoskeletal Health Questionnaire (MSK-HQ) \- Oxford University Innovation, consulté le avril 27, 2026, [https://innovation.ox.ac.uk/outcome-measures/musculoskeletal-health-questionnaire-msk-hq/](https://innovation.ox.ac.uk/outcome-measures/musculoskeletal-health-questionnaire-msk-hq/)  
65. German translation, cross-cultural adaptation and validation of the Musculoskeletal Health Questionnaire: cohort study | Request PDF \- ResearchGate, consulté le avril 27, 2026, [https://www.researchgate.net/publication/344393117\_German\_translation\_cross-cultural\_adaptation\_and\_validation\_of\_the\_Musculoskeletal\_Health\_Questionnaire\_cohort\_study](https://www.researchgate.net/publication/344393117_German_translation_cross-cultural_adaptation_and_validation_of_the_Musculoskeletal_Health_Questionnaire_cohort_study)  
66. Validation of the Musculoskeletal Health Questionnaire (MSK-HQ) in primary care patients with musculoskeletal pain \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/32896692/](https://pubmed.ncbi.nlm.nih.gov/32896692/)  
67. Development and validation of a work-related risk score for upper-extremity musculoskeletal disorders in a French working population \- ResearchGate, consulté le avril 27, 2026, [https://www.researchgate.net/publication/373716062\_Development\_and\_validation\_of\_a\_work-related\_risk\_score\_for\_upper-extremity\_musculoskeletal\_disorders\_in\_a\_French\_working\_population](https://www.researchgate.net/publication/373716062_Development_and_validation_of_a_work-related_risk_score_for_upper-extremity_musculoskeletal_disorders_in_a_French_working_population)  
68. Tampa Scale of Kinesiophobia | PDF & Online Calculator \- Physiotutors, consulté le avril 27, 2026, [https://www.physiotutors.com/questionnaires/tampa-scale-kinesiophobia/](https://www.physiotutors.com/questionnaires/tampa-scale-kinesiophobia/)  
69. Tampa Scale of Kinesiophobia: TSK-17 Comprehensive Guide \- ResRef, consulté le avril 27, 2026, [https://resref.com/tampa-scale-kinesiophobia-tsk-17-guide/](https://resref.com/tampa-scale-kinesiophobia-tsk-17-guide/)  
70. Validation of the French version of the fear avoidance belief questionnaire \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/15082995/](https://pubmed.ncbi.nlm.nih.gov/15082995/)  
71. Validation of the German version of the Fear-Avoidance Beliefs Questionnaire (FABQ) \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/10985869/](https://pubmed.ncbi.nlm.nih.gov/10985869/)  
72. Longitudinal validation of the fear-avoidance beliefs questionnaire (FABQ) in a Swiss-German sample of low back pain patients \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/14714246/](https://pubmed.ncbi.nlm.nih.gov/14714246/)  
73. Stroke Impact Scale Version 2: Validation of the French Version \- ResearchGate, consulté le avril 27, 2026, [https://www.researchgate.net/publication/269172100\_Stroke\_Impact\_Scale\_Version\_2\_Validation\_of\_the\_French\_Version](https://www.researchgate.net/publication/269172100_Stroke_Impact_Scale_Version_2_Validation_of_the_French_Version)  
74. Stroke Impact Scale Version 2: Validation of the French Version \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/25476718/](https://pubmed.ncbi.nlm.nih.gov/25476718/)  
75. \[Testing and Validation of the German Version of the Stroke Impact Scale\] \- PubMed, consulté le avril 27, 2026, [https://pubmed.ncbi.nlm.nih.gov/11455911/](https://pubmed.ncbi.nlm.nih.gov/11455911/)  
76. LINGUISTIC VALIDATION OF THE MULTIPLE SCLEROSIS IMPACT SCALE (MSIS-29) FOR USE IN 29 LANGUAGES \- University of Plymouth Research Portal, consulté le avril 27, 2026, [https://researchportal.plymouth.ac.uk/en/publications/linguistic-validation-of-the-multiple-sclerosis-impact-scale-msis/](https://researchportal.plymouth.ac.uk/en/publications/linguistic-validation-of-the-multiple-sclerosis-impact-scale-msis/)  
77. MSIS-29 | Multiple Sclerosis Impact Scale described in ePROVIDE, consulté le avril 27, 2026, [https://eprovide.mapi-trust.org/instruments/multiple-sclerosis-impact-scale](https://eprovide.mapi-trust.org/instruments/multiple-sclerosis-impact-scale)  
78. Multiple Sclerosis Impact Scale (MSIS-29): reliability and validity in hospital based samples, consulté le avril 27, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC1757371/](https://pmc.ncbi.nlm.nih.gov/articles/PMC1757371/)  
79. The Multiple Sclerosis Impact Scale (MSIS-29): A new patient-based outcome measure, consulté le avril 27, 2026, [https://www.researchgate.net/publication/274557170\_The\_Multiple\_Sclerosis\_Impact\_Scale\_MSIS-29\_A\_new\_patient-based\_outcome\_measure](https://www.researchgate.net/publication/274557170_The_Multiple_Sclerosis_Impact_Scale_MSIS-29_A_new_patient-based_outcome_measure)