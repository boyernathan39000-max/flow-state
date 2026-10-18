// Contenu du programme Flow State (version 3 validée le 18 octobre 2026).
// Chaque compétence a deux cycles de 7 jours, du lundi au dimanche : [conseil, défi].

export const DEVISE = "Dépassement de soi · Responsabilité · Travail · Famille";

export const LOIS = [
  ["L1", "Je parle en « je ».", "Le « on » quand je fais quelque chose à plusieurs"],
  ["L2", "Je regarde les gens dans les yeux.", "Le regard fuyant, intimidé"],
  ["L3", "Je dis ce que je pense et j'explique pourquoi.", "Dire les choses pour plaire"],
  ["L4", "Je cherche seul avant de demander.", "Demander de l'aide tout le temps"],
  ["L5", "Je décide avec ce que j'ai. 70 % suffit.", "Vouloir toutes les informations, hésiter"],
  ["L6", "Je dis non sans me justifier longtemps.", "Ne pas répondre au lieu de refuser"],
  ["L7", "Je finis ce que je commence. Ma parole vaut un contrat.", "Lâcher tôt, parole non tenue"],
  ["L8", "Je parle lentement. Un silence vaut mieux qu'un « euh ».", "La voix rapide, les tics, les mots qui manquent"],
  ["L9", "Je ne cherche pas à plaire à tout le monde.", "M'adapter à chaque personne"],
  ["L10", "Je suis fier de ce que je construis et je le dis.", "Ne pas oser parler de ce que je fais"],
];

export const PALIERS = [
  { code: "P1", nom: "Fondations", debut: "2026-10-19", fin: "2026-11-15", but: "Mes lois sont automatiques, la routine du soir tient chaque jour" },
  { code: "P2", nom: "Accélération", debut: "2026-11-16", fin: "2026-12-26", but: "Je suis franc, je dis non, je vends mieux, j'ai 18 ans" },
  { code: "P3", nom: "Cap Londres", debut: "2026-12-27", fin: "2027-02-28", but: "Énergie, audace, image, présentation en anglais" },
  { code: "P4", nom: "Londres", debut: "2027-03-01", fin: "2027-06-30", but: "Anglais courant" },
  { code: "P5", nom: "Paris", debut: "2027-07-01", fin: "2099-12-31", but: "Installé à Paris" },
];

export const ECHEANCES = [
  ["Mes 18 ans", "2026-12-26"],
  ["Départ pour Londres", "2027-03-01"],
  ["Certification d'anglais (à confirmer)", "2027-04-01"],
  ["20 000 € de MRR", "2027-06-30"],
  ["Paris", "2027-09-01"],
];

export const ANGLAIS = [
  ["Lundi", "Mon travail, expliquer ce que je fais"],
  ["Mardi", "Sport, performance, mental"],
  ["Mercredi", "Marketing, web, IA"],
  ["Jeudi", "La vie à Londres : logement, transports, banque, santé"],
  ["Vendredi", "Débat : je défends un avis, ChatGPT me contredit"],
  ["Samedi", "Raconter : ma semaine, un souvenir, me présenter"],
  ["Dimanche", "Révision des expressions de la semaine"],
];

export const PROMPT_ANGLAIS = `You are my English speaking coach. My level is around A2. I am 17, French, I run a digital marketing agency (websites and SEO) and I am moving to London in March 2027 for 4 months.

Today's topic: {THEME}.

Rules:
- Speak simply but naturally, a bit above my level.
- Ask me open questions. Make me explain and justify my answers.
- Do not correct me during the conversation unless I am impossible to understand.
- If I say a French word, give me the English word and ask me to say the full sentence again.
- When I say "feedback", stop and give me my 5 most important mistakes with the correct version, then 5 useful phrases from today's topic.`;

export const THEMES_EN = [
  "My work: explaining what I do to a client",
  "Sport, performance and mindset",
  "Marketing, the web and AI",
  "Living in London: housing, transport, bank, health",
  "Debate: I defend an opinion and you disagree with me",
  "Storytelling: my week, a memory, introducing myself",
  "Review of this week's expressions, then a free topic",
];

export const LECTURE = [
  ["Dale Carnegie", "Comment se faire des amis", "Relations, s'intéresser aux autres"],
  ["Chris Voss", "Ne coupez jamais la poire en deux", "Négocier, écouter, poser les bonnes questions"],
  ["Robert Cialdini", "Influence et manipulation", "Comprendre ce qui fait dire oui"],
  ["James Clear", "Un rien peut tout changer", "Installer des habitudes qui tiennent"],
  ["Oren Klaff", "Pitch Anything", "Présenter une idée avec autorité"],
];

export const VENTE = [
  ["V1", "Jeu de rôle avec ChatGPT. Il joue un client difficile, je mène le rendez-vous, il me note et me dit où j'ai trop parlé.", "2 fois par semaine pendant les semaines de vente, 1 fois sinon"],
  ["V2", "Une vidéo de formation à la vente, avec 3 idées notées sur papier.", "1 par semaine"],
  ["V3", "Après chaque vrai rendez-vous, j'écris ce qui a marché, où j'ai trop parlé, ce que je change.", "À chaque rendez-vous"],
  ["V4", "Des livres de vente pendant mes 30 minutes de lecture.", "Voir la liste"],
];

export const OBJECTIFS = [
  ["Temps d'écran par jour", "7 à 8 h", "4 h", "3 h", "2 h 30", "2 h"],
  ["Tics pour 100 mots", "12", "10", "8", "6", "5"],
  ["Anglais (EF SET)", "A2 estimé", "test fait", "", "B1", "B2"],
  ["Poids (app sport)", "69 kg", "", "", "", "75 à 80 kg"],
  ["MRR de l'agence", "", "", "", "", "20 000 €"],
  ["Posts sur les réseaux", "30 sept.", "", "1 avant le 30 nov.", "1 avant le 31 janv.", "1 avant le 31 mars, 1 avant le 31 mai"],
];
export const OBJECTIFS_COLONNES = ["Mesure", "Départ", "15 nov", "26 déc", "28 fév", "30 juin"];

export const PRESENTATIONS = [
  ["Face à un entrepreneur", "Je m'appelle Nathan Boyer, j'ai 17 ans. Ça fait environ quatre ans que je m'intéresse énormément à l'entrepreneuriat, au business en général et à l'investissement. Pendant mes années de lycée, j'ai testé plusieurs petites activités. J'ai tenté le dropshipping et la monétisation TikTok, ce qui m'a énormément formé au marketing. J'ai aussi touché à l'investissement avec les cryptomonnaies et les actions. Aujourd'hui je suis en année de césure. J'ai mis mes études en pause un an après le bac pour me concentrer sur mon activité actuelle, une agence qui aide les entreprises à améliorer leur visibilité digitale. On crée ou on refait leurs sites internet et on améliore leur référencement."],
  ["Face à un client", "Bonjour, je suis Nathan Boyer. J'aide les entreprises comme la vôtre à trouver plus de clients sur internet. Concrètement, je crée ou je refais votre site, puis je le fais remonter sur Google. Quand quelqu'un cherche votre métier près de chez lui, il tombe sur vous et pas sur votre concurrent. Aujourd'hui, comment vos nouveaux clients vous trouvent-ils ?"],
  ["Face à quelqu'un de mon âge", "Moi c'est Nathan. J'ai eu mon bac cette année et j'ai fait une pause dans les études pour bosser sur mon agence avec mon frère. Je fais des sites pour des entreprises. Avant ça, j'ai testé plein de trucs, le dropshipping, TikTok, la crypto. En mars, je pars vivre à Londres. Toi, tu fais quoi en ce moment ?"],
  ["Face à un adulte", "Je suis Nathan. J'ai eu mon bac en juillet et j'ai choisi de prendre une année pour lancer mon entreprise, une agence qui crée des sites internet et aide les entreprises à être visibles sur Google. En mars, je pars quatre mois à Londres pour devenir bilingue, puis je m'installe à Paris."],
  ["En 10 secondes", "J'ai une agence qui aide les entreprises à trouver des clients sur internet."],
  ["En anglais", "I'm Nathan Boyer. I'm 17, and I've been testing businesses for four years. Dropshipping, TikTok, crypto, stocks. This year I took a break from school to run my agency with my brother. I help companies get found online, with better websites and better Google rankings. I'm in London to become fluent. What about you?"],
];

// Paires de compétences, une par semaine. Semaines 1 à 9 : cycle 1. Semaines 10 à 18 : cycle 2. Semaine 19 : bilan.
export const PAIRES = [
  ["aff", "comp"], ["auto", "disc"], ["franc", "non"], ["v1", "struct"], ["v2", "fier"],
  ["cur", "ener"], ["aud", "antic"], ["style", "v3"], ["autor", "pres"],
];

export const COMPETENCES = {
  aff: {
    nom: "Affirmation et regard",
    but: "Regarder dans les yeux, me tenir droit, mains visibles, parler en « je »",
    c1: [
      ["Tiens le regard le temps d'une phrase entière. Celui qui détourne les yeux le premier perd en crédibilité.", "Regarde dans les yeux chaque personne à qui tu dis bonjour."],
      ["Les épaules ouvertes et les mains visibles disent que tu es à l'aise, avant même que tu parles.", "Pas une seule fois les mains dans les poches quand tu parles à quelqu'un."],
      ["« Je » prend la responsabilité. « On » la dilue.", "Dis « j'ai fait » en parlant de ton travail à table."],
      ["Finir ses phrases donne du poids. Couper sa propre phrase en enlève.", "Raconte ta journée à tes parents lentement, chaque phrase jusqu'au bout."],
      ["Celui qui parle en premier donne le ton de la conversation.", "Donne ton avis avant qu'on te le demande."],
      ["Quand on te contredit, reformule l'avis de l'autre, puis maintiens le tien.", "Défends un avis face à ton frère ou un ami, sans céder."],
      ["On progresse en regardant ce qui a marché, pas seulement ce qui a raté.", "Écris la scène de la semaine où tu t'es le plus affirmé."],
    ],
    c2: [
      ["Le regard se tient aussi quand c'est toi qui écoutes. Écouter en regardant, c'est montrer que tu es présent.", "Garde le regard de ton interlocuteur pendant toute une conversation de cinq minutes."],
      ["Ta posture parle avant toi. Debout, le poids sur les deux pieds, le menton droit.", "Entre dans une pièce en marchant lentement, tête haute, puis salue en premier."],
      ["Parler de toi en « je » n'est pas de la vantardise. C'est de la clarté.", "Raconte une de tes réussites de l'année en commençant par « j'ai »."],
      ["Un silence après une phrase importante la rend plus forte.", "Après ton prochain avis, tais-toi deux secondes au lieu d'ajouter une justification."],
      ["Prendre la parole dans un groupe est un entraînement. Plus tu le fais, plus ça devient normal.", "Lance toi-même un sujet de conversation à table."],
      ["Quelqu'un qui hausse le ton ne gagne pas. Celui qui reste calme et ferme gagne.", "Dans un désaccord, baisse la voix au lieu de la monter et maintiens ta position."],
      ["Compare-toi à toi-même il y a neuf semaines, pas aux autres.", "Écris trois différences entre toi au 19 octobre et toi aujourd'hui."],
    ],
  },
  comp: {
    nom: "Être compréhensible",
    but: "Phrases courtes, mots simples, voix lente, pauses à la place des « euh »",
    c1: [
      ["Une idée par phrase. Si ta phrase porte deux idées, coupe-la en deux.", "Explique à un proche ce que fait ton agence en trois phrases courtes."],
      ["Les mots simples ne rendent pas moins intelligent. Ils font mieux comprendre.", "Remplace un mot technique par un mot simple chaque fois que tu parles de ton travail."],
      ["Parler lentement te laisse le temps de trouver le bon mot.", "Ralentis volontairement chaque fois que tu prends la parole aujourd'hui."],
      ["Un « euh » se remplace par une pause. Personne ne remarque une pause. Tout le monde entend un « euh ».", "Envoie un message vocal d'une minute à un ami et écoute combien de « euh » tu fais."],
      ["Annonce ce que tu vas dire avant de le dire. « J'ai deux raisons. La première… »", "Donne un avis en annonçant d'abord combien d'arguments tu as."],
      ["Si l'autre fronce les sourcils, tu n'as pas été clair. Redis-le autrement, plus court.", "Demande à quelqu'un de te répéter ce que tu viens d'expliquer. Vérifie qu'il a compris."],
      ["Ce qu'on comprend facilement, on le retient.", "Réécoute un de tes vocaux de la semaine et écris la version courte de ce que tu voulais dire."],
    ],
    c2: [
      ["La règle des dix secondes. Si une idée ne tient pas en dix secondes, elle n'est pas encore claire dans ta tête.", "Résume l'actualité du jour en dix secondes à quelqu'un."],
      ["Un exemple vaut mieux qu'une explication.", "Explique une notion difficile à ton frère avec un exemple de la vie de tous les jours."],
      ["Articuler, c'est respecter celui qui écoute.", "Lis une page de ton livre à voix haute en articulant chaque syllabe."],
      ["Quand un mot te manque, décris-le. Personne ne t'en voudra.", "Dans une conversation, quand un mot ne vient pas, décris-le calmement au lieu de t'arrêter."],
      ["Finis par la conclusion. Les gens retiennent la dernière phrase.", "Termine chaque explication de la journée par une phrase qui résume."],
      ["Être clair à l'écrit aide à être clair à l'oral.", "Écris un message important en trois phrases maximum."],
      ["Mesurer, c'est progresser.", "Enregistre un vocal d'une minute et compte tes tics. Compare avec ton départ de 12 pour 100 mots."],
    ],
  },
  auto: {
    nom: "Autonomie et décision",
    but: "Chercher seul, décider vite avec ce que j'ai",
    c1: [
      ["Avant de demander, cherche. Quinze minutes seul te rendent plus fort qu'une réponse donnée.", "Résous un problème aujourd'hui sans demander d'aide à personne."],
      ["Décider avec 70 % des informations suffit presque toujours. Les 30 % restants coûtent trop de temps.", "Prends une décision que tu repoussais depuis plusieurs jours."],
      ["Une mauvaise décision se corrige. Une décision jamais prise ne se corrige pas.", "Choisis en moins d'une minute, au restaurant, pour un achat ou pour ton planning."],
      ["Demander un avis pour être rassuré, c'est donner ta décision à quelqu'un d'autre.", "Avant de demander l'avis de quelqu'un, écris d'abord ta propre réponse."],
      ["L'IA, Google et les tutoriels répondent à presque tout. Ton premier réflexe, c'est de chercher.", "Trouve seul la solution à un blocage de travail grâce à tes recherches."],
      ["Être autonome, c'est aussi assumer quand ça rate.", "Prends une décision seul et assume-la devant quelqu'un, quel que soit le résultat."],
      ["Chaque décision prise seul renforce la suivante.", "Écris les décisions que tu as prises seul cette semaine."],
    ],
    c2: [
      ["Ton frère a ses forces. Les tiennes grandissent quand tu prends ta place.", "Propose une décision à ton frère au lieu d'attendre la sienne."],
      ["Décide vite sur les petites choses. Garde ton temps pour les grandes.", "Ne demande aucun avis sur une petite décision aujourd'hui."],
      ["Une question à quelqu'un d'autre doit être précise. « J'ai essayé ça. Qu'est-ce que je rate ? »", "Si tu demandes de l'aide, montre d'abord ce que tu as déjà essayé."],
      ["L'indépendance commence par le temps que tu gères toi-même.", "Organise ta journée de demain seul, heure par heure."],
      ["Celui qui décide entraîne les autres.", "Dans un groupe qui hésite, propose un choix clair."],
      ["Douter est normal. Rester bloqué ne l'est pas.", "Fixe-toi une limite de temps pour une décision et respecte-la."],
      ["Regarde le chemin. Il y a neuf semaines, tu demandais tout.", "Écris une décision importante que tu as prise seul depuis le début du programme."],
    ],
  },
  disc: {
    nom: "Discipline et parole donnée",
    but: "Finir ce que je commence, tenir ce que je dis",
    c1: [
      ["La discipline, c'est faire ce que tu as prévu même quand l'envie n'est pas là.", "Fais ton rituel du soir en entier, même fatigué."],
      ["Ta parole vaut un contrat. Ne promets que ce que tu vas tenir.", "Tiens aujourd'hui chaque petite promesse, même « je te rappelle »."],
      ["Finir une tâche vaut plus que commencer trois tâches.", "Termine une tâche que tu as laissée à moitié."],
      ["Le téléphone vole ton temps par petits morceaux.", "Pendant que Claude ou un outil travaille pour toi, fais une petite tâche au lieu de scroller."],
      ["Ce que tu fais chaque jour compte plus que ce que tu fais de temps en temps.", "Couche-toi avant 23 h 30, sans exception."],
      ["Quand tu lâches, demande-toi pourquoi. Fatigue, ennui ou peur ?", "Note la dernière chose que tu as abandonnée et la vraie raison."],
      ["Une semaine tenue en entier vaut mieux qu'une semaine parfaite à moitié.", "Compte les jours où ton rituel du soir a été complet cette semaine."],
    ],
    c2: [
      ["Ne jamais rater deux fois de suite. Un raté est un accident. Deux ratés, c'est une habitude.", "Si tu as raté hier, rattrape-toi aujourd'hui en entier."],
      ["Prévenir avant de ne pas tenir, c'est respecter l'autre.", "Si tu ne peux pas tenir un engagement, préviens avant, pas après."],
      ["L'effort qui compte, c'est la dernière répétition, la dernière page, la dernière minute.", "Va au bout de chaque chose aujourd'hui, même la plus petite."],
      ["Ton temps d'écran est un miroir de ta discipline.", "Passe la journée sous ton objectif de temps d'écran."],
      ["Commencer par le plus dur rend le reste facile.", "Fais en premier ce matin la tâche que tu repousses."],
      ["La motivation va et vient. Le système reste.", "Prépare ce soir tout ce qu'il faut pour réussir demain."],
      ["Tu es devenu quelqu'un qui tient.", "Écris ce que tu as tenu chaque jour depuis le 19 octobre."],
    ],
  },
  franc: {
    nom: "Franchise",
    but: "Dire ce que je pense, critiquer avec des raisons précises",
    c1: [
      ["Dire ce que tu penses n'est pas être méchant. C'est être utile.", "Donne ton vrai avis sur quelque chose qu'on te montre."],
      ["Une critique honnête explique toujours pourquoi. « Ça ne va pas, parce que… »", "Fais une critique avec une raison précise."],
      ["Dire « je ne suis pas d'accord » calmement est plus fort que se taire.", "Dis « je ne suis pas d'accord » une fois aujourd'hui."],
      ["Plaire à tout le monde, c'est ne compter pour personne.", "Ne change pas ton avis pour faire plaisir à quelqu'un."],
      ["La franchise porte sur le fond, jamais sur la personne.", "Critique une idée sans critiquer celui qui l'a eue."],
      ["Être franc avec soi-même vient avant.", "Écris une vérité sur toi que tu évites de regarder."],
      ["Les gens francs sont ceux qu'on écoute.", "Note une situation où ta franchise a été bien reçue."],
    ],
    c2: [
      ["Tu peux être franc et bienveillant en même temps.", "Dis à un proche une chose qu'il devrait améliorer, avec respect."],
      ["Ne réponds pas « c'est bien » quand tu ne le penses pas.", "Remplace chaque « c'est bien » de la journée par ton vrai avis."],
      ["La franchise fait gagner du temps à tout le monde.", "Dis clairement à quelqu'un ce que tu attends de lui."],
      ["Un avis tranché assumé vaut mieux que dix avis tièdes.", "Défends ton avis tranché du jour à voix haute devant quelqu'un."],
      ["Admettre une erreur franchement renforce ta crédibilité.", "Reconnais une erreur devant quelqu'un sans te justifier longtemps."],
      ["Dis les choses tôt. Plus tu attends, plus c'est dur.", "Dis aujourd'hui une chose que tu repousses depuis longtemps."],
      ["Ta parole a gagné du poids.", "Écris ce qui a changé depuis que tu dis ce que tu penses."],
    ],
  },
  non: {
    nom: "Dire non",
    but: "Refuser clairement, sans culpabilité ni silence",
    c1: [
      ["Un non clair vaut mieux qu'un oui à contrecœur.", "Dis non à une demande qui ne t'arrange pas."],
      ["Ne pas répondre n'est pas dire non. C'est fuir.", "Réponds à un message que tu évitais, même pour refuser."],
      ["Un non n'a pas besoin de dix explications. Une phrase suffit.", "Refuse quelque chose en une seule phrase."],
      ["Chaque oui inutile vole du temps à tes projets.", "Protège une heure de ta journée pour toi et refuse ce qui la menace."],
      ["Tu peux refuser la demande sans refuser la personne.", "Dis « non, mais je peux t'aider autrement » une fois."],
      ["Celui qui ne sait pas dire non se fait exploiter.", "Repère une chose que tu fais pour les autres alors que tu n'en as pas envie."],
      ["Chaque non bien dit te rend plus libre.", "Écris les non de la semaine et ce qu'ils t'ont rapporté."],
    ],
    c2: [
      ["Dire non à un proche est le plus dur. C'est aussi le plus important.", "Dis non à un proche sur une petite chose."],
      ["Ne t'excuse pas de dire non.", "Refuse quelque chose sans dire « désolé »."],
      ["Dire non à une distraction, c'est dire oui à tes objectifs.", "Dis non à une sortie ou une activité qui te détourne de ton programme."],
      ["Le silence gêné après un non n'est pas ton problème.", "Après un refus, laisse le silence sans le combler."],
      ["Tu peux aussi dire non à toi-même. Au scroll, au réveil repoussé, à la flemme.", "Dis non à ton téléphone pendant deux heures."],
      ["Un non clair et rapide est un signe de respect.", "Réponds à une demande dans l'heure, oui ou non, sans laisser traîner."],
      ["Tu ne fuis plus les demandes.", "Écris comment tu dis non aujourd'hui comparé à octobre."],
    ],
  },
  v1: {
    nom: "Vente 1 · Comprendre le besoin",
    but: "Poser des questions, écouter plus que je parle",
    c1: [
      ["Le meilleur vendeur parle peu. Il pose des questions et il écoute.", "Dans une conversation, pose trois questions avant de donner ton avis."],
      ["Une bonne question est ouverte. Elle commence par comment, pourquoi ou qu'est-ce que.", "Pose uniquement des questions ouvertes à quelqu'un pendant cinq minutes."],
      ["Le client achète une solution à son problème, pas ton produit.", "Jeu de rôle avec ChatGPT. Il est artisan, tu découvres son vrai problème sans rien vendre."],
      ["Reformuler montre que tu as compris. « Si je comprends bien, votre problème c'est… »", "Reformule ce que te dit quelqu'un avant de répondre."],
      ["Creuse. Derrière la première réponse, il y a la vraie.", "Demande « pourquoi c'est important pour vous ? » au moins une fois."],
      ["Écouter 70 % du temps, parler 30 %.", "Jeu de rôle avec ChatGPT. Demande-lui de te dire qui a le plus parlé."],
      ["Ce que tu as appris en écoutant vaut plus que ce que tu as dit.", "Écris les trois meilleures questions de ta semaine."],
    ],
    c2: [
      ["Avant un rendez-vous, prépare tes questions, pas ton discours.", "Écris cinq questions pour ton prochain rendez-vous client."],
      ["Le silence après une question fait parler l'autre.", "Après une question, attends la réponse sans la remplir toi-même."],
      ["Cherche ce que le problème coûte au client.", "Jeu de rôle avec ChatGPT. Fais chiffrer au client ce que son problème lui coûte."],
      ["Une objection cache souvent une question.", "Jeu de rôle avec ChatGPT. Il te fait trois objections, tu réponds à chacune par une question."],
      ["Retiens les mots exacts du client. Tu les réutiliseras.", "Pendant une conversation, retiens une phrase exacte de l'autre et réutilise-la."],
      ["Un bon rendez-vous, c'est le client qui se convainc lui-même.", "Regarde une vidéo de formation à la vente et note trois idées sur papier."],
      ["Tu écoutes mieux qu'il y a deux mois.", "Écris ce qui a changé dans tes rendez-vous."],
    ],
  },
  struct: {
    nom: "Structurer ma pensée",
    but: "Une idée, deux arguments, une conclusion. Voir les autres faces d'un sujet",
    c1: [
      ["Une idée, deux arguments, une conclusion. C'est tout.", "Donne ton avis sur la notion du jour avec cette structure."],
      ["Avant de parler, demande-toi quel est ton message en une phrase.", "Écris ton message principal avant une conversation importante."],
      ["Tout sujet a plusieurs faces. Regarde au moins la face opposée.", "Écris un argument contre ton propre avis tranché du jour."],
      ["Classer, c'est comprendre. Range tes idées dans trois tiroirs.", "Range les idées d'un sujet en trois catégories sur papier."],
      ["Pourquoi, pourquoi, pourquoi. Trois fois et tu arrives à la vraie cause.", "Applique les trois pourquoi à un problème de ta semaine."],
      ["Un avis sans exemple est fragile. Un exemple le rend solide.", "Ajoute un exemple concret à ton avis tranché du jour."],
      ["Ta pensée s'écrit avant de se dire.", "Relis tes avis tranchés de la semaine et garde le meilleur."],
    ],
    c2: [
      ["Commence par la conclusion, puis explique. Les gens pressés t'écouteront.", "Donne une réponse en commençant par ta conclusion."],
      ["Distingue les faits des opinions.", "Sur un sujet d'actualité, sépare sur papier ce qui est un fait et ce qui est un avis."],
      ["Quand tu ne sais pas, dis-le. Puis dis comment tu vas savoir.", "Remplace un « je sais pas » par « je ne sais pas encore, je vais vérifier »."],
      ["Comparer aide à décider. Avantages, inconvénients, risques.", "Fais un tableau avantages et inconvénients pour une décision réelle."],
      ["Résumer est la preuve que tu as compris.", "Résume un chapitre de ton livre en trois phrases."],
      ["Un débat se gagne avec des arguments, pas avec la voix.", "Débats en français avec ChatGPT sur ton avis tranché du jour."],
      ["Ta tête est mieux rangée.", "Écris ta position sur un sujet complexe en une page structurée."],
    ],
  },
  v2: {
    nom: "Vente 2 · Simplifier et conclure",
    but: "Dire l'essentiel en trois phrases, demander la décision",
    c1: [
      ["Le client n'a pas besoin de tout savoir. Il a besoin de comprendre ce qu'il gagne.", "Explique ton offre en trois phrases, sans un seul mot technique."],
      ["Trop de détails noient la décision.", "Jeu de rôle avec ChatGPT. Présente une maquette en une minute maximum."],
      ["Parle du résultat, pas de la méthode. « Vos clients vous trouvent », pas « je fais du SEO ».", "Réécris la description de ton service en parlant seulement de résultats."],
      ["Un prix se dit calmement, sans s'excuser. Ensuite on se tait.", "Jeu de rôle avec ChatGPT. Annonce ton prix et tais-toi."],
      ["Demander la décision n'est pas forcer. C'est aider le client à avancer.", "Termine ton jeu de rôle par « on démarre quand ? »"],
      ["Chaque rendez-vous finit par une prochaine étape claire, avec une date.", "Après chaque échange pro, fixe la prochaine étape avec une date."],
      ["La simplicité vend.", "Après ton dernier rendez-vous, écris ce qui a marché, où tu as trop parlé, ce que tu changes."],
    ],
    c2: [
      ["Une offre claire tient en une phrase.", "Écris l'offre de ton prochain rendez-vous en une phrase."],
      ["Deux options rassurent plus qu'un oui ou non.", "Jeu de rôle avec ChatGPT. Propose deux options au client."],
      ["Une objection n'est pas un refus. C'est une demande d'information.", "Jeu de rôle avec ChatGPT. Réponds à « c'est trop cher » sans baisser le prix."],
      ["Montrer vaut mieux qu'expliquer.", "Prépare un exemple visuel d'un résultat client à montrer en rendez-vous."],
      ["Un client hésitant a besoin d'une raison d'agir maintenant.", "Jeu de rôle avec ChatGPT. Donne au client une vraie raison de décider aujourd'hui."],
      ["Après le oui, arrête de vendre.", "Jeu de rôle avec ChatGPT. Dès que le client dit oui, passe à la suite sans ajouter d'arguments."],
      ["Tu vends plus simplement.", "Compare ta façon de présenter aujourd'hui et en octobre."],
    ],
  },
  fier: {
    nom: "Fierté",
    but: "Parler de ce que je fais sans me diminuer",
    c1: [
      ["Ce que tu construis à 17 ans, peu de gens le font. Tu as le droit d'en être fier.", "Parle de ton agence à quelqu'un sans qu'on te le demande."],
      ["Se diminuer n'est pas de la modestie. C'est se cacher.", "Ne dis pas « c'est rien » quand on te félicite. Dis « merci »."],
      ["Ta césure est un choix courageux. Présente-la comme tel.", "Explique ton année de césure avec fierté à un adulte."],
      ["Les gens fiers attirent ceux qui comprennent ce qu'ils font.", "Partage une réussite récente à un ami."],
      ["Ta fierté se voit dans ta posture.", "Quand tu parles de ton travail, redresse-toi et regarde la personne."],
      ["Fier ne veut pas dire arrogant. Tu parles de ce que tu fais, pas de ce que tu vaux de plus que les autres.", "Raconte un projet en parlant de ce que tu as appris."],
      ["Ce que tu as fait cette semaine compte.", "Écris trois choses dont tu es fier cette semaine."],
    ],
    c2: [
      ["Ton nom, Nathan Boyer, doit être associé à ce que tu construis.", "Présente-toi avec ton nom complet à chaque nouvelle personne."],
      ["Montrer ton travail, c'est le rendre réel.", "Prépare l'idée de ton prochain post sur les réseaux."],
      ["La fierté se nourrit de preuves.", "Commence une liste de tes réalisations, même petites."],
      ["Quand on te demande ce que tu fais, ta réponse doit être prête.", "Utilise ta présentation en 10 secondes aujourd'hui."],
      ["Tu n'es pas « juste le frère ». Tu es Nathan.", "Dans une rencontre avec ton frère, présente-toi en premier."],
      ["Un compliment reçu se garde. Il ne se rend pas.", "Reçois chaque compliment de la journée avec un simple merci."],
      ["Tu parles de toi sans te cacher.", "Écris ce que les gens savent de toi aujourd'hui qu'ils ne savaient pas en octobre."],
    ],
  },
  cur: {
    nom: "Curiosité et relations",
    but: "M'intéresser aux autres, relancer une conversation, la faire durer",
    c1: [
      ["S'intéresser aux autres, c'est le moyen le plus rapide d'être intéressant.", "Pose à quelqu'un une question sur sa vie que tu ne lui as jamais posée."],
      ["Retenir un prénom, c'est montrer que la personne compte.", "Retiens le prénom de chaque nouvelle personne et réutilise-le."],
      ["Une conversation dure quand tu rebondis sur ce que dit l'autre.", "Fais durer une conversation en rebondissant trois fois sur ses réponses."],
      ["Même un sujet qui ne t'intéresse pas cache quelque chose d'intéressant. Cherche-le.", "Pose deux questions sur un sujet qui ne t'intéresse pas."],
      ["Un ami très différent de toi a des choses à t'apprendre.", "Demande à un ami très différent de toi ce qu'il aime dans sa vie."],
      ["Une relation se nourrit. Un message prend dix secondes.", "Envoie un message à quelqu'un à qui tu n'as pas parlé depuis longtemps."],
      ["Tes relations du jour montrent ce qui progresse.", "Relis tes relations du jour et note ce qui revient."],
    ],
    c2: [
      ["Les gens aiment parler d'eux. Laisse-les faire et écoute vraiment.", "Dans une conversation, parle de toi seulement si on te le demande."],
      ["Apprendre des autres, c'est recevoir autant que tu donnes.", "Demande à quelqu'un de t'apprendre une chose qu'il sait faire."],
      ["Se souvenir d'un détail touche les gens.", "Rappelle à quelqu'un un détail qu'il t'a raconté la dernière fois."],
      ["La curiosité se cultive en lisant.", "Lis un article sur un sujet que tu ne connais pas et parles-en à table."],
      ["Une heure de conversation commence par une bonne question.", "Lance une conversation avec « qu'est-ce qui t'a le plus marqué cette année ? »"],
      ["Les meilleures relations sont réciproques.", "Repère une relation où tu donnes beaucoup et reçois peu. Écris ce que tu veux changer."],
      ["Tes conversations durent plus longtemps.", "Écris la meilleure conversation de la semaine et pourquoi elle a marché."],
    ],
  },
  ener: {
    nom: "Énergie et présence",
    but: "Être dynamique, sourire, remplir une pièce",
    c1: [
      ["L'énergie se décide. Elle commence le matin.", "Lève-toi dès le réveil, sans rester au lit avec ton téléphone."],
      ["Un sourire en entrant change l'ambiance de la pièce.", "Souris en saluant chaque personne aujourd'hui."],
      ["Une voix posée et un peu plus forte donne de la présence.", "Parle un peu plus fort que d'habitude, sans crier."],
      ["Après le repas, le corps ralentit. Bouge dix minutes.", "Marche dix minutes après le déjeuner."],
      ["Les gens énergiques sont ceux qu'on retient.", "Mets de l'énergie dans une conversation, avec des gestes et un ton vivant."],
      ["La positivité ne nie pas les problèmes. Elle cherche la solution.", "Transforme une plainte de la journée en proposition."],
      ["Ton énergie dépend de ton sommeil.", "Regarde tes heures de coucher de la semaine et ton énergie."],
    ],
    c2: [
      ["Ton énergie se transmet. Les gens repartent comme tu les as reçus.", "Laisse chaque personne de ta journée un peu plus contente qu'avant de te voir."],
      ["Le manque d'énergie se voit dans la démarche. Marche comme quelqu'un qui sait où il va.", "Marche d'un pas décidé toute la journée."],
      ["Moins d'écran, plus d'énergie.", "Pas de téléphone pendant la première heure de la journée."],
      ["L'enthousiasme convainc plus que les arguments.", "Parle de ton projet avec enthousiasme à quelqu'un."],
      ["Remplir une pièce, c'est être présent, pas bruyant.", "Dans un groupe, sois celui qui relance l'énergie quand elle tombe."],
      ["L'énergie se protège. Repère ce qui te vide.", "Note les trois choses qui t'ont le plus vidé cette semaine."],
      ["Tu n'es plus le garçon mou d'octobre.", "Écris comment les gens te voient maintenant quand tu entres dans une pièce."],
    ],
  },
  aud: {
    nom: "Audace et risque calculé",
    but: "Oser, après avoir pesé le pour et le contre",
    c1: [
      ["L'audace, c'est faire une chose qui te fait un peu peur.", "Fais aujourd'hui une petite chose qui te fait peur."],
      ["Un risque calculé, c'est savoir ce que tu peux perdre et ce que tu peux gagner.", "Avant un choix risqué, écris le pire scénario et le meilleur."],
      ["Le pire scénario est rarement aussi grave qu'on l'imagine.", "Écris ta peur du moment et ce qui se passerait vraiment si elle arrivait."],
      ["Demander ne coûte rien. Le pire, c'est un non.", "Demande quelque chose que tu n'oses pas demander d'habitude."],
      ["Sortir de ta zone de confort un peu chaque jour la rend plus grande.", "Change une habitude confortable aujourd'hui."],
      ["Les gens audacieux ne sont pas sans peur. Ils agissent malgré elle.", "Prends la parole en premier dans une situation où tu attendrais d'habitude."],
      ["Ton audace grandit à chaque petite victoire.", "Écris l'action la plus audacieuse de ta semaine."],
    ],
    c2: [
      ["Une opportunité ne prévient pas. Prépare-toi à dire oui.", "Dis oui à une proposition qui te fait sortir de ton confort."],
      ["Un risque bien pesé n'est plus un saut dans le vide.", "Fais un tableau gain, perte, probabilité pour un projet que tu envisages."],
      ["L'audace se voit dans les détails. Une question, un avis, un premier pas.", "Pose la question que tout le monde pense sans oser la poser."],
      ["Investir, c'est prendre un risque calculé.", "Écris ta stratégie d'investissement en trois règles."],
      ["Ce que tu n'oses pas faire te montre où grandir.", "Fais la chose que tu repousses par peur."],
      ["Londres sera une audace de quatre mois. Entraîne-toi maintenant.", "Fais une chose que tu n'as jamais faite."],
      ["Tu oses plus qu'avant.", "Écris trois choses que tu as osées depuis janvier."],
    ],
  },
  antic: {
    nom: "Anticiper",
    but: "Prévoir ce qui peut arriver avant d'agir",
    c1: [
      ["Anticiper, c'est se demander ce qui peut mal tourner avant de commencer.", "Avant une tâche importante, écris deux choses qui pourraient mal se passer."],
      ["Le soir, prépare demain. Le matin sera plus simple.", "Écris ce soir les trois priorités de demain."],
      ["Un plan B évite la panique.", "Pour un rendez-vous de la semaine, prévois une solution si ça ne se passe pas comme prévu."],
      ["Anticiper une question, c'est avoir la réponse prête.", "Avant une conversation pro, écris les trois questions qu'on va te poser."],
      ["Regarde une semaine devant toi, pas seulement aujourd'hui.", "Planifie ta semaine prochaine en dix minutes."],
      ["Ce qui t'a surpris une fois ne doit pas te surprendre deux fois.", "Note une mauvaise surprise récente et comment l'éviter la prochaine fois."],
      ["Moins d'imprévus, plus de calme.", "Écris ce que tu as évité cette semaine grâce à l'anticipation."],
    ],
    c2: [
      ["Londres approche. Ce qui n'est pas prévu maintenant sera stressant plus tard.", "Fais la liste de tout ce qu'il faut régler avant de partir à Londres."],
      ["L'argent s'anticipe aussi.", "Calcule ton budget pour les quatre mois à Londres."],
      ["Chaque engagement a une date. Mets-la dans ton agenda.", "Mets dans ton agenda toutes tes échéances du mois."],
      ["Anticiper la réaction de l'autre aide à bien parler.", "Avant une discussion délicate, écris comment l'autre risque de réagir."],
      ["Un petit problème réglé tôt ne devient pas grand.", "Règle aujourd'hui un petit problème que tu laisses traîner."],
      ["Prévoir n'empêche pas d'agir vite. Ça rend l'action plus sûre.", "Prends une décision rapide après avoir vérifié les deux risques principaux."],
      ["Tu vois plus loin.", "Écris ce que tu prévois pour les trois prochains mois."],
    ],
  },
  style: {
    nom: "Image et style",
    but: "Une tenue choisie chaque jour, une garde-robe cohérente",
    c1: [
      ["Ton image parle avant toi. Les gens jugent en quelques secondes.", "Choisis ta tenue la veille au soir."],
      ["Bien habillé ne veut pas dire cher. Ça veut dire bien taillé.", "Trie ton armoire et mets de côté ce qui est mal taillé ou abîmé."],
      ["Une garde-robe cohérente se construit pièce par pièce.", "Écris la liste des cinq pièces qui te manquent, dans l'esprit de tes images."],
      ["Un peu de couleur te différencie, une seule pièce à la fois.", "Ajoute une seule pièce de couleur à une tenue neutre."],
      ["La peau, les cheveux, le parfum font partie de la tenue.", "Fais ta routine de peau matin et soir."],
      ["Des chaussures propres changent toute une silhouette.", "Nettoie tes chaussures."],
      ["Le style, c'est la régularité.", "Prends en photo ta meilleure tenue de la semaine."],
    ],
    c2: [
      ["Ta tenue doit dire qui tu es avant que tu parles.", "Décris en trois mots l'image que tu veux renvoyer et choisis ta tenue avec."],
      ["Achète moins, achète mieux.", "Choisis ton prochain achat dans ton budget de 50 euros par mois."],
      ["Un coiffeur régulier, c'est la base.", "Prends rendez-vous chez le coiffeur si ça fait plus d'un mois."],
      ["Une tenue de rendez-vous client se prépare.", "Prépare ta tenue type pour un rendez-vous pro."],
      ["Londres a son style. Prépare ta valise comme une garde-robe.", "Liste les tenues que tu emporteras à Londres."],
      ["La posture finit la tenue.", "Tiens-toi droit toute la journée, comme si tu étais en photo."],
      ["Ton image a changé.", "Compare une photo de toi d'octobre avec une photo d'aujourd'hui."],
    ],
  },
  v3: {
    nom: "Vente 3 · Raconter une histoire",
    but: "Convaincre par une histoire et une émotion, pas seulement des arguments",
    c1: [
      ["Les gens oublient les arguments. Ils retiennent les histoires.", "Raconte une anecdote de ta semaine à quelqu'un."],
      ["Une histoire a un début, un problème et une fin.", "Écris l'histoire de ton parcours avec ces trois parties."],
      ["L'émotion fait décider. Montre ce que ressent le client.", "Jeu de rôle avec ChatGPT. Convaincs un client en racontant l'histoire d'un autre client."],
      ["Les détails concrets rendent une histoire vraie.", "Ajoute un détail précis à une histoire que tu racontes, un lieu, un chiffre ou une phrase."],
      ["Ton histoire personnelle est un outil de vente.", "Raconte en une minute pourquoi tu as lancé ton agence."],
      ["Une histoire courte vaut mieux qu'une longue.", "Raconte une histoire en moins de trente secondes."],
      ["Tu racontes, tu ne récites plus.", "Écris ta meilleure histoire de la semaine."],
    ],
    c2: [
      ["Le client doit se reconnaître dans l'histoire.", "Prépare l'histoire d'un client type pour ton prochain rendez-vous."],
      ["Une histoire avant, après montre la valeur.", "Raconte un projet sous la forme avant, pendant, après."],
      ["La voix fait vivre l'histoire. Ralentis aux moments forts.", "Raconte une histoire à voix haute avec une pause avant la fin."],
      ["Tes échecs font de bonnes histoires.", "Raconte un de tes essais ratés et ce qu'il t'a appris."],
      ["Une histoire en anglais prépare Londres.", "Raconte ton parcours en anglais à ChatGPT."],
      ["Une histoire finit par une leçon ou une question.", "Termine chaque histoire de la journée par une question à l'autre."],
      ["Tes histoires convainquent.", "Écris l'histoire qui a le plus marqué quelqu'un cette semaine."],
    ],
  },
  autor: {
    nom: "Autorité",
    but: "Une présence masculine. Je décide, je tranche, j'assume de déplaire",
    c1: [
      ["L'autorité vient de la clarté, pas de la peur.", "Dis ce que tu veux en une phrase claire."],
      ["Celui qui décide calmement inspire confiance.", "Prends une décision pour un groupe et annonce-la calmement."],
      ["Ne te justifie pas trop. Une raison suffit.", "Explique une décision avec une seule raison."],
      ["Tenir sa position face à la pression, c'est ça l'autorité.", "Maintiens un choix même si quelqu'un insiste."],
      ["Assumer de déplaire, c'est accepter que tout le monde ne soit pas d'accord.", "Exprime calmement un avis impopulaire."],
      ["L'autorité se voit dans le corps. Gestes lents, regard posé, voix basse.", "Parle plus lentement et plus bas pendant toute une conversation."],
      ["Les gens suivent ceux qui savent où ils vont.", "Écris ta direction pour les trois prochains mois en une phrase."],
    ],
    c2: [
      ["Ne demande pas la permission pour ce qui t'appartient.", "Fais une chose qui te revient sans demander l'accord de personne."],
      ["L'autorité respecte les autres. Elle ne les écrase pas.", "Recadre quelqu'un calmement, sur un fait précis."],
      ["Dire « je m'en occupe » et le faire construit ta réputation.", "Prends une responsabilité et mène-la jusqu'au bout."],
      ["Moins de mots, plus de poids.", "Réponds aux questions de la journée en une ou deux phrases."],
      ["Ton calme dans la difficulté rassure les autres.", "Face à un problème, reste calme et propose une solution."],
      ["Tu ne t'adaptes plus à tout le monde. Les autres s'adaptent à toi.", "Garde ton rythme et ton avis toute la journée, même face à quelqu'un d'impressionnant."],
      ["Tu as pris ta place.", "Écris en quoi les gens te traitent différemment depuis octobre."],
    ],
  },
  pres: {
    nom: "Me présenter",
    but: "Ma présentation de 30 secondes, en français puis en anglais",
    c1: [
      ["Ta présentation commence par ton nom complet. Nathan Boyer.", "Relis tes présentations et choisis celle qui te ressemble le plus."],
      ["Une présentation se dit, elle ne se récite pas.", "Dis ta présentation entrepreneur trois fois à voix haute."],
      ["Adapte la version à la personne. Entrepreneur, client, jeune, adulte.", "Utilise la bonne version avec quelqu'un que tu rencontres."],
      ["Finis toujours par une question.", "Termine ta présentation en demandant quelque chose à l'autre."],
      ["Se filmer fait progresser vite.", "Filme-toi en train de te présenter et regarde ton regard, tes mains, tes tics."],
      ["Trente secondes, pas plus. Le reste viendra dans la conversation.", "Chronomètre ta présentation et coupe ce qui dépasse."],
      ["Ta présentation est prête.", "Présente-toi à un membre de ta famille comme à un inconnu."],
    ],
    c2: [
      ["Ton nom d'abord. I'm Nathan Boyer.", "Lis ta présentation en anglais à voix haute trois fois."],
      ["En anglais aussi, des phrases courtes.", "Demande à ChatGPT de corriger ta présentation en anglais."],
      ["L'accent n'est pas un problème. La clarté compte plus.", "Enregistre ta présentation en anglais et réécoute-la."],
      ["Prépare les questions qu'on te posera ensuite.", "Entraîne-toi avec ChatGPT à répondre à trois questions sur toi en anglais."],
      ["Parle lentement en anglais. Personne ne te presse.", "Fais ta présentation en anglais en ralentissant volontairement."],
      ["Ta version en 10 secondes existe aussi en anglais.", "Écris et apprends ta version anglaise de dix secondes."],
      ["Tu es prêt à te présenter à Londres.", "Fais ta présentation en anglais devant un proche."],
    ],
  },
};

export const BILAN = {
  nom: "Bilan avant Londres",
  but: "Relire les 18 semaines, garder ce qui marche",
  jours: [
    ["Cette semaine, tu regardes le chemin parcouru avant Londres.", "Relis tes premières notes du programme."],
    ["Garde ce qui marche. Lâche ce qui ne sert pas.", "Écris les trois habitudes que tu gardes à Londres."],
    ["Tes lois partent avec toi.", "Choisis les trois lois les plus importantes pour Londres."],
    ["Mesure ton anglais.", "Passe le test EF SET et compare avec ton premier score."],
    ["Mesure ta parole.", "Enregistre un vocal d'une minute et compte tes tics."],
    ["Prépare ton départ.", "Vérifie ta liste Londres une dernière fois."],
    ["Le flow state, c'est maintenant.", "Écris en dix lignes la personne que tu es devenu."],
  ],
};
