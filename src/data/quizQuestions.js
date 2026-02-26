export const quizQuestions = [
	{
		id: 1,
		category: "Interblocage",
		question: "Quelle est la cause principale d'un interblocage dans le problème des Philosophes ?",
		options: [
			"Les philosophes mangent trop lentement",
			"Chaque philosophe tient une fourchette et attend l'autre, créant une attente circulaire",
			"Il n'y a pas assez de fourchettes sur la table",
			"Le système d'exploitation manque de mémoire"
		],
		correct: 1,
		explanation: "L'interblocage se produit quand chaque philosophe prend sa fourchette gauche simultanément, puis attend la fourchette droite — créant une dépendance circulaire où personne ne peut avancer."
	},
	{
		id: 2,
		category: "Interblocage",
		question: "Laquelle de ces conditions n'est PAS nécessaire pour un interblocage ?",
		options: [
			"Exclusion mutuelle",
			"Détention et attente",
			"Préemption",
			"Attente circulaire"
		],
		correct: 2,
		explanation: "Les quatre conditions de l'interblocage sont : exclusion mutuelle, détention et attente, NON-préemption, et attente circulaire. La préemption (pouvoir prendre les ressources de force) empêche en fait l'interblocage."
	},
	{
		id: 3,
		category: "Famine",
		question: "Qu'est-ce que la famine dans le contexte de la programmation concurrente ?",
		options: [
			"Un philosophe qui meurt parce que time_to_die est dépassé",
			"Un thread qui se voit perpétuellement refuser l'accès à une ressource nécessaire",
			"Un épuisement de la mémoire système",
			"Un programme qui plante à cause d'un segfault"
		],
		correct: 1,
		explanation: "La famine se produit quand un thread ne peut jamais acquérir les ressources dont il a besoin car d'autres threads ont toujours la priorité. Dans philo, cela signifie qu'un philosophe ne mange jamais."
	},
	{
		id: 4,
		category: "Conditions de course",
		question: "Qu'est-ce qu'une condition de course ?",
		options: [
			"Quand les threads font la course pour finir en premier",
			"Quand le résultat dépend du timing imprévisible de l'exécution des threads",
			"Quand trop de threads sont créés",
			"Quand un thread s'exécute plus vite que prévu"
		],
		correct: 1,
		explanation: "Une condition de course se produit quand deux threads ou plus accèdent à des données partagées simultanément, et le résultat dépend de l'ordre d'exécution — menant à un comportement imprévisible."
	},
	{
		id: 5,
		category: "Mutex",
		question: "Que se passe-t-il si vous oubliez de déverrouiller un mutex après l'avoir verrouillé ?",
		options: [
			"Rien, il se déverrouille automatiquement",
			"Les autres threads en attente de ce mutex seront bloqués indéfiniment",
			"Le programme accélère",
			"Le mutex est détruit"
		],
		correct: 1,
		explanation: "Un mutex verrouillé qui n'est jamais déverrouillé bloquera indéfiniment tous les autres threads qui l'attendent — une source courante d'interblocages et de blocages."
	},
	{
		id: 6,
		category: "Timing",
		question: "Pourquoi usleep() est-il préféré à sleep() dans le projet philo ?",
		options: [
			"usleep() utilise moins de mémoire",
			"sleep() n'accepte que des secondes entières, usleep() permet une précision en microsecondes",
			"usleep() est plus rapide à taper",
			"sleep() est déprécié en C"
		],
		correct: 1,
		explanation: "sleep() ne supporte que la granularité à la seconde. Comme philo travaille avec des timings en millisecondes (time_to_die, eat, sleep), usleep() fournit la précision en microsecondes nécessaire."
	},
	{
		id: 7,
		category: "Surveillance",
		question: "Comment la mort d'un philosophe doit-elle être détectée de manière fiable ?",
		options: [
			"Chaque philosophe vérifie s'il est mort avant de manger",
			"Un thread/boucle de surveillance séparé vérifie continuellement les horodatages",
			"L'OS envoie un signal quand un thread meurt",
			"Utiliser un bloc try-catch pour gérer la mort"
		],
		correct: 1,
		explanation: "Un moniteur dédié vérifie continuellement l'horodatage du dernier repas de chaque philosophe. Si temps_actuel - dernier_repas > time_to_die, le philosophe est déclaré mort. Cette séparation assure une détection fiable."
	},
	{
		id: 8,
		category: "Conditions de course",
		question: "Pourquoi les appels printf doivent-ils être protégés par un mutex dans le projet philo ?",
		options: [
			"printf est trop lent sans mutex",
			"Plusieurs threads appelant printf simultanément peuvent produire une sortie entrelacée/brouillée",
			"printf alloue de la mémoire qui nécessite une protection",
			"Le sujet ne l'exige pas en réalité"
		],
		correct: 1,
		explanation: "Sans protection par mutex, des appels printf concurrents depuis différents threads peuvent entrelacer leur sortie, rendant les logs illisibles et violant les exigences de formatage du sujet."
	},
	{
		id: 9,
		category: "Interblocage",
		question: "Quelle stratégie aide à prévenir l'interblocage dans l'acquisition des fourchettes ?",
		options: [
			"Toujours prendre la fourchette gauche en premier",
			"Faire prendre les fourchettes dans un ordre différent à certains philosophes (ex : pairs/impairs)",
			"Utiliser plus de fourchettes que de philosophes",
			"Faire manger les philosophes plus vite"
		],
		correct: 1,
		explanation: "Casser la symétrie en faisant prendre la fourchette droite en premier aux philosophes pairs (et la gauche aux impairs) empêche l'attente circulaire — une des quatre conditions nécessaires à l'interblocage."
	},
	{
		id: 10,
		category: "Timing",
		question: "Que devrait-il se passer quand time_to_die est égal à time_to_eat + time_to_sleep ?",
		options: [
			"Le programme devrait planter",
			"Les philosophes devraient survivre indéfiniment s'ils mangent à temps",
			"Tous les philosophes meurent immédiatement",
			"C'est une entrée invalide"
		],
		correct: 1,
		explanation: "C'est un cas limite délicat. Si le timing est parfaitement aligné et qu'il n'y a pas de surcharge, les philosophes survivent. Votre implémentation doit gérer cela sans que des délais supplémentaires ne causent de fausses morts."
	},
	{
		id: 11,
		category: "Mutex",
		question: "Quelle est la différence clé entre un mutex et un sémaphore ?",
		options: [
			"Les mutex sont plus rapides que les sémaphores",
			"Un mutex est binaire (verrouillé/déverrouillé), un sémaphore peut compter plusieurs accès simultanés",
			"Les sémaphores ne fonctionnent qu'avec les processus, les mutex qu'avec les threads",
			"Il n'y a pas de différence, c'est la même chose"
		],
		correct: 1,
		explanation: "Un mutex fournit un accès exclusif (binaire) — un seul thread à la fois. Un sémaphore maintient un compteur, permettant un nombre configurable d'accès simultanés à une ressource."
	},
	{
		id: 12,
		category: "Surveillance",
		question: "Après avoir détecté la mort d'un philosophe, que doit-il se passer ?",
		options: [
			"Redémarrer le thread du philosophe mort",
			"Afficher le message de mort et s'assurer qu'aucun autre message n'est affiché",
			"Tuer tous les autres threads immédiatement avec pthread_cancel",
			"Continuer la simulation avec un philosophe en moins"
		],
		correct: 1,
		explanation: "Le sujet exige qu'après l'affichage d'une mort, plus aucun message d'état n'apparaisse. Cela signifie définir un drapeau d'arrêt partagé que tous les threads vérifient avant d'afficher."
	},
]
