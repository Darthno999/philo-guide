// Plan intensif de 2 semaines pour le projet philosophes
// Blackhole : 2026-04-09, Début : 2026-02-26
// Objectif : finir en 2 semaines max (14 jours), idéalement 1 semaine

export const defaultMilestones = [
	{
		id: 1,
		week: 1,
		title: "Jour 1–2 : Analyse du Sujet & Setup",
		days: "Jours 1–2",
		tasks: [
			{ id: "1-1", text: "Lire le PDF du sujet en entier, annoter chaque contrainte", done: false },
			{ id: "1-2", text: "Comprendre le problème des Philosophes (Wikipedia, ressources)", done: false },
			{ id: "1-3", text: "Recherche : threads vs processus, mutex vs sémaphore", done: false },
			{ id: "1-4", text: "Lister toutes les fonctions autorisées, lire leurs pages man", done: false },
			{ id: "1-5", text: "Mettre en place le dépôt, Makefile, fichiers d'en-tête", done: false },
			{ id: "1-6", text: "Écrire un pseudo-code du flux complet du programme", done: false },
		],
		pitfalls: [
			"Ne pas négliger la lecture du sujet — les cas limites se cachent dans les détails",
			"Comprendre la différence entre philo et philo_bonus dès le début",
		],
		definitionOfDone: "Vous pouvez expliquer le problème, les contraintes et votre plan à un pair sans hésitation."
	},
	{
		id: 2,
		week: 1,
		title: "Jour 3 : Parsing & Structures de Données",
		days: "Jour 3",
		tasks: [
			{ id: "2-1", text: "Implémenter le parsing et la validation des arguments", done: false },
			{ id: "2-2", text: "Gérer tous les cas d'erreur (mauvais args, valeurs négatives, overflow)", done: false },
			{ id: "2-3", text: "Concevoir les structures de données (état partagé, par philosophe)", done: false },
			{ id: "2-4", text: "Écrire le code d'initialisation de toutes les structures", done: false },
			{ id: "2-5", text: "Tester avec des entrées limites : 1 philosophe, 0 repas, grandes valeurs", done: false },
		],
		pitfalls: [
			"Overflow d'entier sur les grandes valeurs temporelles",
			"Ne pas valider que number_of_philosophers >= 1",
			"Oublier de gérer l'argument optionnel du nombre de repas",
		],
		definitionOfDone: "Toutes les entrées invalides sont rejetées proprement, les structures sont initialisées correctement."
	},
	{
		id: 3,
		week: 1,
		title: "Jour 4–5 : Threads & Synchronisation",
		days: "Jours 4–5",
		tasks: [
			{ id: "3-1", text: "Implémenter la création de thread pour chaque philosophe", done: false },
			{ id: "3-2", text: "Implémenter la routine du philosophe (manger → dormir → penser)", done: false },
			{ id: "3-3", text: "Implémenter l'acquisition des fourchettes avec les mutex", done: false },
			{ id: "3-4", text: "Implémenter une stratégie de prévention d'interblocage", done: false },
			{ id: "3-5", text: "Implémenter le join/nettoyage correct des threads", done: false },
			{ id: "3-6", text: "Tester avec 2, 3, 5 philosophes — vérifier qu'ils mangent sans blocage", done: false },
		],
		pitfalls: [
			"Acquérir les fourchettes dans le même ordre pour tous → interblocage garanti",
			"Ne pas joindre les threads avant de libérer les ressources",
			"Utiliser printf sans le protéger → sortie brouillée",
		],
		definitionOfDone: "Les philosophes mangent, dorment et pensent en boucle sans interblocage."
	},
	{
		id: 4,
		week: 1,
		title: "Jour 6–7 : Mort, Timing & Monitoring",
		days: "Jours 6–7",
		tasks: [
			{ id: "4-1", text: "Implémenter le suivi précis des horodatages (gettimeofday)", done: false },
			{ id: "4-2", text: "Implémenter la boucle de détection de mort", done: false },
			{ id: "4-3", text: "S'assurer que la mort est détectée dans les 10ms", done: false },
			{ id: "4-4", text: "Implémenter le mécanisme d'arrêt (aucun message après la mort)", done: false },
			{ id: "4-5", text: "Gérer la sortie quand tous les philosophes ont assez mangé", done: false },
			{ id: "4-6", text: "Valider le format de log (timestamps relatifs au démarrage)", done: false },
		],
		pitfalls: [
			"Utiliser sleep() au lieu de usleep() — pas assez précis",
			"La vérification de mort + affichage n'est pas atomique → course de données",
			"Condition de course entre détection de mort et printf",
		],
		definitionOfDone: "La mort est affichée dans les 10ms, aucun message après la mort, arrêt propre."
	},
	{
		id: 5,
		week: 2,
		title: "Jour 8–10 : Tests Intensifs",
		days: "Jours 8–10",
		tasks: [
			{ id: "5-1", text: "Tester avec 1, 2, 5, 100, 200 philosophes", done: false },
			{ id: "5-2", text: "Tester la famine : tous les philosophes mangent-ils équitablement ?", done: false },
			{ id: "5-3", text: "Exécuter avec valgrind/helgrind/ThreadSanitizer", done: false },
			{ id: "5-4", text: "Tester le cas 1 philosophe (doit mourir après time_to_die)", done: false },
			{ id: "5-5", text: "Tester avec des temps très courts (60 60 60)", done: false },
			{ id: "5-6", text: "Stress test : 100 exécutions consécutives sans blocage", done: false },
			{ id: "5-7", text: "Corriger toutes les fuites mémoire et courses de données", done: false },
		],
		pitfalls: [
			"Fonctionne sur votre machine mais pas celle de l'évaluateur (bugs de timing)",
			"Ne pas tester avec helgrind — courses de données cachées",
			"Cas time_to_die = time_to_eat + time_to_sleep qui échoue",
		],
		definitionOfDone: "Zéro course de données, zéro fuite, comportement cohérent sur 100+ exécutions."
	},
	{
		id: 6,
		week: 2,
		title: "Jour 11–14 : Finitions & Correction",
		days: "Jours 11–14",
		tasks: [
			{ id: "6-1", text: "Nettoyer le code : conformité norminette, commentaires", done: false },
			{ id: "6-2", text: "Revoir le Makefile : all, clean, fclean, re, pas de re-link", done: false },
			{ id: "6-3", text: "Préparer les réponses de correction : expliquer chaque choix", done: false },
			{ id: "6-4", text: "Optionnel : commencer philo_bonus (processus + sémaphores)", done: false },
			{ id: "6-5", text: "S'entraîner à expliquer interblocage/famine/conditions de course", done: false },
			{ id: "6-6", text: "Passe finale de tests avec tous les cas limites", done: false },
			{ id: "6-7", text: "Pousser la version finale, vérifier que le dépôt est propre", done: false },
		],
		pitfalls: [
			"Corrections norminette de dernière minute qui cassent la logique",
			"Ne pas pouvoir expliquer votre propre stratégie de synchronisation",
			"Oublier de tester après le nettoyage final",
		],
		definitionOfDone: "Le code compile proprement, passe tous les tests, vous pouvez expliquer chaque ligne."
	},
]
