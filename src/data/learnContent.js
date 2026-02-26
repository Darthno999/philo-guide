export const learnSections = [
	{
		id: "dining-philosophers",
		title: "Le Problème des Philosophes",
		icon: "🍝",
		color: "accent",
		content: [
			{
				type: "intro",
				text: "Cinq philosophes sont assis autour d'une table ronde avec un bol de spaghetti. Entre chaque paire se trouve une seule fourchette. Un philosophe a besoin de **deux fourchettes** pour manger. Ils alternent entre **penser**, **manger** et **dormir**."
			},
			{
				type: "keypoint",
				title: "Pourquoi c'est important",
				text: "C'est une illustration classique de la **contention de ressources** dans les systèmes concurrents. Les fourchettes sont des ressources partagées, les philosophes sont des threads/processus, et le défi est de laisser tout le monde manger sans conflits."
			},
			{
				type: "keypoint",
				title: "La contrainte fondamentale",
				text: "Chaque fourchette ne peut être tenue que par un seul philosophe à la fois. Un philosophe doit acquérir **les deux** fourchettes adjacentes avant de manger, puis les relâcher après avoir mangé."
			},
			{
				type: "invariant",
				title: "Invariants à maintenir",
				items: [
					"Une fourchette est tenue par au plus un philosophe à tout moment",
					"Un philosophe mange uniquement quand il tient exactement deux fourchettes",
					"Après avoir mangé, les deux fourchettes sont relâchées immédiatement",
					"Aucun philosophe ne devrait mourir de faim si de la nourriture est disponible",
				]
			},
		]
	},
	{
		id: "deadlock",
		title: "Interblocage (Deadlock)",
		icon: "🔒",
		color: "danger",
		content: [
			{
				type: "intro",
				text: "L'interblocage se produit quand chaque thread attend une ressource détenue par un autre thread, formant une **dépendance circulaire**. Aucun thread ne peut progresser."
			},
			{
				type: "keypoint",
				title: "Les Quatre Conditions Nécessaires",
				text: "L'interblocage nécessite les quatre conditions **simultanément** :"
			},
			{
				type: "list",
				items: [
					"**Exclusion mutuelle** — les ressources ne sont pas partageables (fourchettes)",
					"**Détention et attente** — tenir une ressource en attendant une autre",
					"**Non-préemption** — les ressources ne peuvent pas être prises de force",
					"**Attente circulaire** — A attend B, B attend C, ... , Z attend A",
				]
			},
			{
				type: "keypoint",
				title: "Scénario classique d'interblocage",
				text: "Les 5 philosophes prennent leur fourchette **gauche** simultanément. Chacun tient une fourchette et attend la droite — qui est tenue par son voisin. Personne ne peut manger. Personne ne peut relâcher. **Interblocage.**"
			},
			{
				type: "strategy",
				title: "Stratégies de prévention (Conceptuel)",
				items: [
					"**Casser l'attente circulaire** : Numéroter les fourchettes. Certains philosophes prennent d'abord la fourchette au numéro le plus bas — empêchant le cycle.",
					"**Limiter la concurrence** : Autoriser au maximum N-1 philosophes à tenter de manger simultanément.",
					"**Asymétrie** : Les philosophes pairs prennent les fourchettes dans un ordre, les impairs dans l'ordre inverse.",
				]
			},
		]
	},
	{
		id: "starvation",
		title: "Famine (Starvation)",
		icon: "😵",
		color: "warning",
		content: [
			{
				type: "intro",
				text: "La famine se produit quand un thread se voit perpétuellement refuser l'accès aux ressources dont il a besoin. Le système progresse globalement, mais **un thread est laissé pour compte**."
			},
			{
				type: "keypoint",
				title: "Différence avec l'interblocage",
				text: "Dans l'interblocage, **aucun** thread ne progresse. Dans la famine, **certains** threads progressent tandis que d'autres sont bloqués indéfiniment. C'est plus difficile à détecter car le système semble fonctionner normalement."
			},
			{
				type: "keypoint",
				title: "Dans le projet Philo",
				text: "Avec certains ordres d'acquisition des fourchettes, deux voisins peuvent alterner continuellement pour manger, ne laissant jamais de fourchettes disponibles pour le philosophe entre eux. Ce philosophe **meurt de faim**."
			},
			{
				type: "strategy",
				title: "Approches d'atténuation",
				items: [
					"Assurer l'équité dans l'ordre d'acquisition des fourchettes",
					"Ajouter un court temps de réflexion après avoir mangé pour laisser les voisins manger",
					"Suivre le dernier repas de chaque philosophe et prioriser les plus affamés",
				]
			},
		]
	},
	{
		id: "race-conditions",
		title: "Conditions de course (Race Conditions)",
		icon: "⚡",
		color: "danger",
		content: [
			{
				type: "intro",
				text: "Une condition de course se produit quand le comportement du programme dépend du **timing imprévisible** de l'exécution concurrente des threads. Mêmes entrées, résultats différents."
			},
			{
				type: "keypoint",
				title: "Le danger",
				text: "Les conditions de course sont insidieuses car elles ne se manifestent pas forcément pendant les tests. Votre programme peut fonctionner 999 fois et échouer la 1000ème quand l'ordonnancement des threads diffère."
			},
			{
				type: "list",
				title: "Courses courantes dans Philo",
				items: [
					"Lire `last_meal_time` pendant qu'un autre thread l'écrit",
					"Vérifier le drapeau `stop` pendant que le moniteur le modifie",
					"Deux threads qui affichent simultanément → sortie mélangée",
					"Vérifier et mettre à jour l'état d'une fourchette de manière non-atomique",
				]
			},
			{
				type: "keypoint",
				title: "Outils de détection",
				text: "Utilisez **ThreadSanitizer** (`-fsanitize=thread`) pendant le développement et **Helgrind** (outil Valgrind) pour détecter les courses de données que vos yeux ne peuvent pas voir."
			},
		]
	},
	{
		id: "mutex-semaphore",
		title: "Mutex vs Sémaphore",
		icon: "🔐",
		color: "accent",
		content: [
			{
				type: "intro",
				text: "Les deux sont des primitives de synchronisation qui contrôlent l'accès aux ressources partagées, mais ils fonctionnent différemment."
			},
			{
				type: "comparison",
				left: {
					title: "Mutex",
					items: [
						"Binaire : verrouillé ou déverrouillé",
						"Seul le thread qui verrouille peut déverrouiller",
						"Protège les sections critiques",
						"Utilisé dans la partie obligatoire de philo",
						"Un seul thread à la fois",
					]
				},
				right: {
					title: "Sémaphore",
					items: [
						"Basé sur un compteur : 0 à N",
						"N'importe quel thread peut signaler (post)",
						"Contrôle l'accès à N ressources",
						"Utilisé dans la partie bonus de philo",
						"Jusqu'à N accès simultanés",
					]
				}
			},
			{
				type: "keypoint",
				title: "Pensez-y comme ça",
				text: "Un **mutex** est une clé de salle de bain — une personne à la fois. Un **sémaphore** est un compteur de parking — plusieurs places, mais un maximum fixe."
			},
		]
	},
	{
		id: "timing",
		title: "Timing & Surveillance",
		icon: "⏱️",
		color: "success",
		content: [
			{
				type: "intro",
				text: "Le projet philo tourne autour de trois paramètres temporels critiques et d'une boucle de surveillance qui décide de la vie ou de la mort."
			},
			{
				type: "list",
				title: "Les trois constantes temporelles",
				items: [
					"**time_to_die** : Temps maximum (ms) depuis le dernier repas avant qu'un philosophe ne meure",
					"**time_to_eat** : Durée (ms) pendant laquelle un philosophe mange (tenant deux fourchettes)",
					"**time_to_sleep** : Durée (ms) pendant laquelle un philosophe dort après avoir mangé",
				]
			},
			{
				type: "keypoint",
				title: "Le cycle de vie",
				text: "Chaque philosophe boucle : **manger → dormir → penser**. Le temps de réflexion est implicite — c'est le temps restant avant de devoir manger à nouveau pour éviter de mourir."
			},
			{
				type: "keypoint",
				title: "Le rôle du moniteur",
				text: "Un mécanisme de surveillance dédié vérifie continuellement : `temps_actuel - dernier_repas > time_to_die`. Si vrai, afficher la mort et tout arrêter. La détection doit être rapide (dans les ~10ms)."
			},
			{
				type: "invariant",
				title: "Invariants temporels critiques",
				items: [
					"Les horodatages doivent utiliser une horloge haute résolution (gettimeofday ou clock_gettime)",
					"La détection de mort doit se faire dans les 10ms de la mort réelle",
					"Aucun message ne doit être affiché après un message de mort",
					"Les horodatages en sortie doivent être relatifs au début de la simulation",
				]
			},
		]
	},
]
