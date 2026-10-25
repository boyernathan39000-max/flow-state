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

// Sujets d'anglais simples (niveau A2), un par jour, en boucle sur 6 semaines.
// Environ un sujet travail par semaine, marqué pro: true.
export const SUJETS_EN = [
  ["Ma journée d'hier", "What I did yesterday"],
  ["Ce que j'ai mangé aujourd'hui", "What I ate today"],
  ["Ma famille", "My family"],
  ["Ma chambre et ma maison", "My room and my house"],
  ["Mon travail, en mots simples", "My job, in simple words", true],
  ["Mon week-end", "My weekend"],
  ["Ma série ou mon film préféré", "My favourite series or film"],
  ["La météo et les saisons", "The weather and the seasons"],
  ["Le sport que je fais", "The sport I do"],
  ["Mes amis", "My friends"],
  ["Faire les courses", "Going food shopping"],
  ["Mon client idéal", "My ideal customer", true],
  ["Mon téléphone et mes applis", "My phone and my apps"],
  ["Un souvenir d'enfance", "A childhood memory"],
  ["Les vacances", "Holidays"],
  ["La musique que j'écoute", "The music I listen to"],
  ["Mon village et ma région", "My village and my region"],
  ["Les animaux", "Animals"],
  ["Une journée de travail", "A typical work day", true],
  ["Commander au restaurant", "Ordering at a restaurant"],
  ["Les vêtements que j'aime", "Clothes I like"],
  ["Ce que je ferai demain", "What I will do tomorrow"],
  ["Les transports", "Getting around: car, train, bus"],
  ["Le livre que je lis", "The book I am reading"],
  ["Les fêtes et Noël", "Celebrations and Christmas"],
  ["Les réseaux sociaux", "Social media", true],
  ["Ma routine du matin", "My morning routine"],
  ["La cuisine française", "French food"],
  ["Un voyage que j'ai fait", "A trip I took"],
  ["Ce qui me fait rire", "Things that make me laugh"],
  ["La santé et le sommeil", "Health and sleep"],
  ["L'IA dans la vie de tous les jours", "AI in everyday life", true],
  ["Demander son chemin", "Asking for directions"],
  ["Mes rêves pour plus tard", "My dreams for the future"],
  ["Mes loisirs", "My hobbies"],
  ["Chez le médecin", "At the doctor's"],
  ["Ma ville préférée", "My favourite city"],
  ["Présenter mon agence simplement", "Introducing my agency simply", true],
  ["Les bonnes habitudes", "Good habits"],
  ["Acheter en ligne", "Shopping online"],
  ["Ce que je veux voir à Londres", "What I want to see in London"],
  ["Une petite histoire drôle", "A funny little story"],
];

export const PROMPT_ANGLAIS = `You are my friendly English conversation partner. My level is A2 (beginner). I am 17 and French.

Today's topic: {THEME}.

Rules:
- Before we start, give me 5 simple words or phrases about the topic, with the French translation.
- Use short, simple sentences and common words.
- Ask me one easy question at a time.
- If I don't understand, say it again more simply.
- Do not correct me during the conversation.
- When I say "feedback", give me my 5 most important mistakes with the correct version.`;

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
  ["V4", "Des livres de vente dans ma lecture du soir, 4 pages minimum.", "Voir la liste"],
];

export const OBJECTIFS = [
  ["Temps d'écran par jour", "7 à 8 h", "6 h max", "6 h max", "6 h max", "6 h max"],
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
      ["Tiens le regard le temps d'une phrase entière. Celui qui détourne les yeux le premier perd en crédibilité.", "Regarde dans les yeux chaque personne que tu salues."],
      ["Les épaules ouvertes et les mains visibles disent que tu es à l'aise, avant même que tu parles.", "Zéro main dans les poches quand tu parles."],
      ["« Je » prend la responsabilité. « On » la dilue.", "À table, parle de ton travail en disant « j'ai »."],
      ["Finir ses phrases donne du poids. Couper sa propre phrase en enlève.", "Raconte ta journée lentement, chaque phrase jusqu'au bout."],
      ["Celui qui parle en premier donne le ton de la conversation.", "Donne ton avis avant qu'on te le demande."],
      ["Quand on te contredit, reformule l'avis de l'autre, puis maintiens le tien.", "Défends un avis face à ton frère, sans céder."],
      ["On progresse en regardant ce qui a marché, pas seulement ce qui a raté.", "Écris ton moment le plus affirmé de la semaine."],
    ],
    c2: [
      ["Le regard se tient aussi quand c'est toi qui écoutes. Écouter en regardant, c'est montrer que tu es présent.", "Tiens le regard pendant toute une conversation."],
      ["Ta posture parle avant toi. Debout, le poids sur les deux pieds, le menton droit.", "Entre lentement, tête haute, salue en premier."],
      ["Parler de toi en « je » n'est pas de la vantardise. C'est de la clarté.", "Raconte une réussite en commençant par « j'ai »."],
      ["Un silence après une phrase importante la rend plus forte.", "Après ton avis, deux secondes de silence. Pas de justification."],
      ["Prendre la parole dans un groupe est un entraînement. Plus tu le fais, plus ça devient normal.", "Lance toi-même un sujet de conversation à table."],
      ["Quelqu'un qui hausse le ton ne gagne pas. Celui qui reste calme et ferme gagne.", "En désaccord, baisse la voix et tiens ta position."],
      ["Compare-toi à toi-même il y a neuf semaines, pas aux autres.", "Écris trois différences entre toi en octobre et aujourd'hui."],
    ],
  },
  comp: {
    nom: "Être compréhensible",
    but: "Phrases courtes, mots simples, voix lente, pauses à la place des « euh »",
    c1: [
      ["Une idée par phrase. Si ta phrase porte deux idées, coupe-la en deux.", "Explique ton agence à un proche en trois phrases."],
      ["Les mots simples ne rendent pas moins intelligent. Ils font mieux comprendre.", "Zéro mot technique quand tu parles de ton travail."],
      ["Parler lentement te laisse le temps de trouver le bon mot.", "Ralentis volontairement chaque fois que tu prends la parole aujourd'hui."],
      ["Un « euh » se remplace par une pause. Personne ne remarque une pause. Tout le monde entend un « euh ».", "Envoie un vocal d'une minute, compte tes « euh »."],
      ["Annonce ce que tu vas dire avant de le dire. « J'ai deux raisons. La première… »", "Donne un avis en annonçant d'abord combien d'arguments tu as."],
      ["Si l'autre fronce les sourcils, tu n'as pas été clair. Redis-le autrement, plus court.", "Fais répéter ton explication. Vérifie qu'on t'a compris."],
      ["Ce qu'on comprend facilement, on le retient.", "Réécoute un vocal, écris-en la version courte."],
    ],
    c2: [
      ["La règle des dix secondes. Si une idée ne tient pas en dix secondes, elle n'est pas encore claire dans ta tête.", "Résume l'actualité du jour en dix secondes à quelqu'un."],
      ["Un exemple vaut mieux qu'une explication.", "Explique une notion difficile avec un exemple du quotidien."],
      ["Articuler, c'est respecter celui qui écoute.", "Lis une page à voix haute en articulant tout."],
      ["Quand un mot te manque, décris-le. Personne ne t'en voudra.", "Un mot manque ? Décris-le calmement, ne t'arrête pas."],
      ["Finis par la conclusion. Les gens retiennent la dernière phrase.", "Finis chaque explication par une phrase qui résume."],
      ["Être clair à l'écrit aide à être clair à l'oral.", "Écris un message important en trois phrases maximum."],
      ["Mesurer, c'est progresser.", "Vocal d'une minute. Compte tes tics. Départ, 12 pour 100."],
    ],
  },
  auto: {
    nom: "Autonomie et décision",
    but: "Chercher seul, décider vite avec ce que j'ai",
    c1: [
      ["Avant de demander, cherche. Quinze minutes seul te rendent plus fort qu'une réponse donnée.", "Résous un problème aujourd'hui sans demander d'aide à personne."],
      ["Décider avec 70 % des informations suffit presque toujours. Les 30 % restants coûtent trop de temps.", "Prends une décision que tu repoussais depuis plusieurs jours."],
      ["Une mauvaise décision se corrige. Une décision jamais prise ne se corrige pas.", "Chaque choix du jour en moins d'une minute."],
      ["Demander un avis pour être rassuré, c'est donner ta décision à quelqu'un d'autre.", "Avant de demander un avis, écris ta propre réponse."],
      ["L'IA, Google et les tutoriels répondent à presque tout. Ton premier réflexe, c'est de chercher.", "Débloque seul un problème de travail en cherchant."],
      ["Être autonome, c'est aussi assumer quand ça rate.", "Décide seul, puis assume ta décision devant quelqu'un."],
      ["Chaque décision prise seul renforce la suivante.", "Écris les décisions que tu as prises seul cette semaine."],
    ],
    c2: [
      ["Ton frère a ses forces. Les tiennes grandissent quand tu prends ta place.", "Propose une décision à ton frère avant lui."],
      ["Décide vite sur les petites choses. Garde ton temps pour les grandes.", "Ne demande aucun avis sur une petite décision aujourd'hui."],
      ["Une question à quelqu'un d'autre doit être précise. « J'ai essayé ça. Qu'est-ce que je rate ? »", "Avant de demander, montre ce que tu as essayé."],
      ["L'indépendance commence par le temps que tu gères toi-même.", "Organise ta journée de demain seul, heure par heure."],
      ["Celui qui décide entraîne les autres.", "Dans un groupe qui hésite, propose un choix clair."],
      ["Douter est normal. Rester bloqué ne l'est pas.", "Fixe-toi une limite de temps pour une décision et respecte-la."],
      ["Regarde le chemin. Il y a neuf semaines, tu demandais tout.", "Écris ta plus grande décision prise seul depuis octobre."],
    ],
  },
  disc: {
    nom: "Discipline et parole donnée",
    but: "Finir ce que je commence, tenir ce que je dis",
    c1: [
      ["La discipline, c'est faire ce que tu as prévu même quand l'envie n'est pas là.", "Fais ton rituel du soir en entier, même fatigué."],
      ["Ta parole vaut un contrat. Ne promets que ce que tu vas tenir.", "Tiens chaque petite promesse, même « je te rappelle »."],
      ["Finir une tâche vaut plus que commencer trois tâches.", "Termine une tâche que tu as laissée à moitié."],
      ["Le téléphone vole ton temps par petits morceaux.", "Quand Claude travaille, fais une tâche. Pas de scroll."],
      ["Ce que tu fais chaque jour compte plus que ce que tu fais de temps en temps.", "Couche-toi avant 23 h 30, sans exception."],
      ["Quand tu lâches, demande-toi pourquoi. Fatigue, ennui ou peur ?", "Note ton dernier abandon et sa vraie raison."],
      ["Une semaine tenue en entier vaut mieux qu'une semaine parfaite à moitié.", "Compte tes rituels du soir complets de la semaine."],
    ],
    c2: [
      ["Ne jamais rater deux fois de suite. Un raté est un accident. Deux ratés, c'est une habitude.", "Si tu as raté hier, rattrape-toi aujourd'hui en entier."],
      ["Prévenir avant de ne pas tenir, c'est respecter l'autre.", "Un engagement intenable ? Préviens avant, pas après."],
      ["L'effort qui compte, c'est la dernière répétition, la dernière page, la dernière minute.", "Va au bout de chaque chose, même petite."],
      ["Ton temps d'écran est un miroir de ta discipline.", "Passe la journée sous ton objectif de temps d'écran."],
      ["Commencer par le plus dur rend le reste facile.", "Fais en premier ce matin la tâche que tu repousses."],
      ["La motivation va et vient. Le système reste.", "Prépare ce soir tout ce qu'il faut pour réussir demain."],
      ["Tu es devenu quelqu'un qui tient.", "Écris ce que tu tiens chaque jour depuis octobre."],
    ],
  },
  franc: {
    nom: "Franchise",
    but: "Dire ce que je pense, critiquer avec des raisons précises",
    c1: [
      ["Dire ce que tu penses n'est pas être méchant. C'est être utile.", "Donne ton vrai avis sur quelque chose qu'on te montre."],
      ["Une critique honnête explique toujours pourquoi. « Ça ne va pas, parce que… »", "Fais une critique avec une raison précise."],
      ["Dire « je ne suis pas d'accord » calmement est plus fort que se taire.", "Dis une fois « je ne suis pas d'accord »."],
      ["Plaire à tout le monde, c'est ne compter pour personne.", "Ne change pas ton avis pour faire plaisir à quelqu'un."],
      ["La franchise porte sur le fond, jamais sur la personne.", "Critique une idée sans critiquer celui qui l'a eue."],
      ["Être franc avec soi-même vient avant.", "Écris une vérité sur toi que tu évites de regarder."],
      ["Les gens francs sont ceux qu'on écoute.", "Note une situation où ta franchise a été bien reçue."],
    ],
    c2: [
      ["Tu peux être franc et bienveillant en même temps.", "Dis à un proche, avec respect, ce qu'il peut améliorer."],
      ["Ne réponds pas « c'est bien » quand tu ne le penses pas.", "Remplace chaque « c'est bien » par ton vrai avis."],
      ["La franchise fait gagner du temps à tout le monde.", "Dis clairement à quelqu'un ce que tu attends de lui."],
      ["Un avis tranché assumé vaut mieux que dix avis tièdes.", "Défends un avis tranché à voix haute devant quelqu'un."],
      ["Admettre une erreur franchement renforce ta crédibilité.", "Reconnais une erreur devant quelqu'un sans te justifier longtemps."],
      ["Dis les choses tôt. Plus tu attends, plus c'est dur.", "Dis aujourd'hui une chose que tu repousses depuis longtemps."],
      ["Ta parole a gagné du poids.", "Écris ce que ta franchise a changé."],
    ],
  },
  non: {
    nom: "Dire non",
    but: "Refuser clairement, sans culpabilité ni silence",
    c1: [
      ["Un non clair vaut mieux qu'un oui à contrecœur.", "Dis non à une demande qui ne t'arrange pas."],
      ["Ne pas répondre n'est pas dire non. C'est fuir.", "Réponds à un message que tu évitais, même pour refuser."],
      ["Un non n'a pas besoin de dix explications. Une phrase suffit.", "Refuse quelque chose en une seule phrase."],
      ["Chaque oui inutile vole du temps à tes projets.", "Protège une heure pour toi. Refuse ce qui la menace."],
      ["Tu peux refuser la demande sans refuser la personne.", "Dis une fois « non, mais je t'aide autrement »."],
      ["Celui qui ne sait pas dire non se fait exploiter.", "Repère ce que tu fais pour les autres sans envie."],
      ["Chaque non bien dit te rend plus libre.", "Écris tes non de la semaine et leurs effets."],
    ],
    c2: [
      ["Dire non à un proche est le plus dur. C'est aussi le plus important.", "Dis non à un proche sur une petite chose."],
      ["Ne t'excuse pas de dire non.", "Refuse quelque chose sans dire « désolé »."],
      ["Dire non à une distraction, c'est dire oui à tes objectifs.", "Refuse une sortie qui te détourne de ton programme."],
      ["Le silence gêné après un non n'est pas ton problème.", "Après un refus, laisse le silence sans le combler."],
      ["Tu peux aussi dire non à toi-même. Au scroll, au réveil repoussé, à la flemme.", "Dis non à ton téléphone pendant deux heures."],
      ["Un non clair et rapide est un signe de respect.", "Réponds à une demande dans l'heure. Oui ou non."],
      ["Tu ne fuis plus les demandes.", "Écris comment tu dis non aujourd'hui comparé à octobre."],
    ],
  },
  v1: {
    nom: "Vente 1 · Comprendre le besoin",
    but: "Poser des questions, écouter plus que je parle",
    c1: [
      ["Le meilleur vendeur parle peu. Il pose des questions et il écoute.", "Pose trois questions avant de donner ton avis."],
      ["Une bonne question est ouverte. Elle commence par comment, pourquoi ou qu'est-ce que.", "Pose uniquement des questions ouvertes à quelqu'un pendant cinq minutes."],
      ["Le client achète une solution à son problème, pas ton produit.", "ChatGPT joue un artisan. Trouve son vrai problème."],
      ["Reformuler montre que tu as compris. « Si je comprends bien, votre problème c'est… »", "Reformule ce que te dit quelqu'un avant de répondre."],
      ["Creuse. Derrière la première réponse, il y a la vraie.", "Demande une fois « pourquoi c'est important pour vous ? »"],
      ["Écouter 70 % du temps, parler 30 %.", "Jeu de rôle ChatGPT. Demande-lui qui a le plus parlé."],
      ["Ce que tu as appris en écoutant vaut plus que ce que tu as dit.", "Écris les trois meilleures questions de ta semaine."],
    ],
    c2: [
      ["Avant un rendez-vous, prépare tes questions, pas ton discours.", "Écris cinq questions pour ton prochain rendez-vous client."],
      ["Le silence après une question fait parler l'autre.", "Après une question, attends la réponse sans la remplir toi-même."],
      ["Cherche ce que le problème coûte au client.", "Jeu de rôle ChatGPT. Fais chiffrer le problème du client."],
      ["Une objection cache souvent une question.", "Jeu de rôle ChatGPT. Réponds aux objections par une question."],
      ["Retiens les mots exacts du client. Tu les réutiliseras.", "Retiens une phrase exacte de l'autre et réutilise-la."],
      ["Un bon rendez-vous, c'est le client qui se convainc lui-même.", "Une vidéo de vente. Trois idées dans ton carnet."],
      ["Tu écoutes mieux qu'il y a deux mois.", "Écris ce qui a changé dans tes rendez-vous."],
    ],
  },
  struct: {
    nom: "Structurer ma pensée",
    but: "Une idée, deux arguments, une conclusion. Voir les autres faces d'un sujet",
    c1: [
      ["Une idée, deux arguments, une conclusion. C'est tout.", "Donne un avis avec cette structure, à voix haute."],
      ["Avant de parler, demande-toi quel est ton message en une phrase.", "Écris ton message principal avant une conversation importante."],
      ["Tout sujet a plusieurs faces. Regarde au moins la face opposée.", "Écris un argument contre ton propre avis tranché du jour."],
      ["Classer, c'est comprendre. Range tes idées dans trois tiroirs.", "Range les idées d'un sujet en trois catégories sur papier."],
      ["Pourquoi, pourquoi, pourquoi. Trois fois et tu arrives à la vraie cause.", "Applique les trois pourquoi à un problème de ta semaine."],
      ["Un avis sans exemple est fragile. Un exemple le rend solide.", "Ajoute un exemple concret à ton avis tranché du jour."],
      ["Ta pensée s'écrit avant de se dire.", "Relis ton carnet de la semaine. Garde ton meilleur avis."],
    ],
    c2: [
      ["Commence par la conclusion, puis explique. Les gens pressés t'écouteront.", "Donne une réponse en commençant par ta conclusion."],
      ["Distingue les faits des opinions.", "Sur une actu, sépare les faits des avis."],
      ["Quand tu ne sais pas, dis-le. Puis dis comment tu vas savoir.", "Remplace « je sais pas » par « je vais vérifier »."],
      ["Comparer aide à décider. Avantages, inconvénients, risques.", "Fais un tableau avantages et inconvénients pour une décision réelle."],
      ["Résumer est la preuve que tu as compris.", "Résume un chapitre de ton livre en trois phrases."],
      ["Un débat se gagne avec des arguments, pas avec la voix.", "Débats avec ChatGPT sur un de tes avis tranchés."],
      ["Ta tête est mieux rangée.", "Une page structurée sur un sujet complexe."],
    ],
  },
  v2: {
    nom: "Vente 2 · Simplifier et conclure",
    but: "Dire l'essentiel en trois phrases, demander la décision",
    c1: [
      ["Le client n'a pas besoin de tout savoir. Il a besoin de comprendre ce qu'il gagne.", "Ton offre en trois phrases, zéro mot technique."],
      ["Trop de détails noient la décision.", "Jeu de rôle ChatGPT. Une maquette présentée en une minute."],
      ["Parle du résultat, pas de la méthode. « Vos clients vous trouvent », pas « je fais du SEO ».", "Décris ton service uniquement par ses résultats."],
      ["Un prix se dit calmement, sans s'excuser. Ensuite on se tait.", "Jeu de rôle avec ChatGPT. Annonce ton prix et tais-toi."],
      ["Demander la décision n'est pas forcer. C'est aider le client à avancer.", "Finis ton jeu de rôle par « on démarre quand ? »"],
      ["Chaque rendez-vous finit par une prochaine étape claire, avec une date.", "Chaque échange pro finit par une étape datée."],
      ["La simplicité vend.", "Débrief ton dernier rendez-vous. Garde, change."],
    ],
    c2: [
      ["Une offre claire tient en une phrase.", "Écris l'offre de ton prochain rendez-vous en une phrase."],
      ["Deux options rassurent plus qu'un oui ou non.", "Jeu de rôle avec ChatGPT. Propose deux options au client."],
      ["Une objection n'est pas un refus. C'est une demande d'information.", "Jeu de rôle ChatGPT. « Trop cher » ? Ne baisse pas."],
      ["Montrer vaut mieux qu'expliquer.", "Prépare un résultat client à montrer en rendez-vous."],
      ["Un client hésitant a besoin d'une raison d'agir maintenant.", "Jeu de rôle ChatGPT. Une raison de décider aujourd'hui."],
      ["Après le oui, arrête de vendre.", "Jeu de rôle ChatGPT. Après le oui, plus d'arguments."],
      ["Tu vends plus simplement.", "Compare ta façon de présenter aujourd'hui et en octobre."],
    ],
  },
  fier: {
    nom: "Fierté",
    but: "Parler de ce que je fais sans me diminuer",
    c1: [
      ["Ce que tu construis à 17 ans, peu de gens le font. Tu as le droit d'en être fier.", "Parle de ton agence sans qu'on te le demande."],
      ["Se diminuer n'est pas de la modestie. C'est se cacher.", "On te félicite ? Dis « merci », pas « c'est rien »."],
      ["Ta césure est un choix courageux. Présente-la comme tel.", "Explique ton année de césure avec fierté à un adulte."],
      ["Les gens fiers attirent ceux qui comprennent ce qu'ils font.", "Partage une réussite récente à un ami."],
      ["Ta fierté se voit dans ta posture.", "Parle de ton travail droit, en regardant la personne."],
      ["Fier ne veut pas dire arrogant. Tu parles de ce que tu fais, pas de ce que tu vaux de plus que les autres.", "Raconte un projet et ce qu'il t'a appris."],
      ["Ce que tu as fait cette semaine compte.", "Écris trois choses dont tu es fier cette semaine."],
    ],
    c2: [
      ["Ton nom, Nathan Boyer, doit être associé à ce que tu construis.", "Présente-toi avec ton nom complet à chaque nouvelle personne."],
      ["Montrer ton travail, c'est le rendre réel.", "Prépare l'idée de ton prochain post sur les réseaux."],
      ["La fierté se nourrit de preuves.", "Commence une liste de tes réalisations, même petites."],
      ["Quand on te demande ce que tu fais, ta réponse doit être prête.", "Utilise ta présentation en 10 secondes aujourd'hui."],
      ["Tu n'es pas « juste le frère ». Tu es Nathan.", "Dans une rencontre avec ton frère, présente-toi en premier."],
      ["Un compliment reçu se garde. Il ne se rend pas.", "Reçois chaque compliment de la journée avec un simple merci."],
      ["Tu parles de toi sans te cacher.", "Écris ce qu'on sait de toi depuis octobre."],
    ],
  },
  cur: {
    nom: "Curiosité et relations",
    but: "M'intéresser aux autres, relancer une conversation, la faire durer",
    c1: [
      ["S'intéresser aux autres, c'est le moyen le plus rapide d'être intéressant.", "Pose à quelqu'un une question jamais posée."],
      ["Retenir un prénom, c'est montrer que la personne compte.", "Retiens le prénom de chaque nouvelle personne et réutilise-le."],
      ["Une conversation dure quand tu rebondis sur ce que dit l'autre.", "Rebondis trois fois sur les réponses de l'autre."],
      ["Même un sujet qui ne t'intéresse pas cache quelque chose d'intéressant. Cherche-le.", "Pose deux questions sur un sujet qui ne t'intéresse pas."],
      ["Un ami très différent de toi a des choses à t'apprendre.", "Demande à un ami très différent ce qu'il aime."],
      ["Une relation se nourrit. Un message prend dix secondes.", "Écris à quelqu'un perdu de vue."],
      ["Tes relations du jour montrent ce qui progresse.", "Relis tes relations du jour et note ce qui revient."],
    ],
    c2: [
      ["Les gens aiment parler d'eux. Laisse-les faire et écoute vraiment.", "Parle de toi seulement si on te le demande."],
      ["Apprendre des autres, c'est recevoir autant que tu donnes.", "Demande à quelqu'un de t'apprendre une chose qu'il sait faire."],
      ["Se souvenir d'un détail touche les gens.", "Rappelle à quelqu'un un détail qu'il t'a raconté."],
      ["La curiosité se cultive en lisant.", "Lis un article inconnu et parles-en à table."],
      ["Une heure de conversation commence par une bonne question.", "Demande « qu'est-ce qui t'a marqué cette année ? »"],
      ["Les meilleures relations sont réciproques.", "Repère une relation déséquilibrée. Écris ce que tu changes."],
      ["Tes conversations durent plus longtemps.", "Écris ta meilleure conversation et pourquoi elle a marché."],
    ],
  },
  ener: {
    nom: "Énergie et présence",
    but: "Être dynamique, sourire, remplir une pièce",
    c1: [
      ["L'énergie se décide. Elle commence le matin.", "Debout dès le réveil. Pas de téléphone au lit."],
      ["Un sourire en entrant change l'ambiance de la pièce.", "Souris en saluant chaque personne aujourd'hui."],
      ["Une voix posée et un peu plus forte donne de la présence.", "Parle un peu plus fort que d'habitude, sans crier."],
      ["Après le repas, le corps ralentit. Bouge dix minutes.", "Marche dix minutes après le déjeuner."],
      ["Les gens énergiques sont ceux qu'on retient.", "Une conversation avec des gestes et un ton vivant."],
      ["La positivité ne nie pas les problèmes. Elle cherche la solution.", "Transforme une plainte de la journée en proposition."],
      ["Ton énergie dépend de ton sommeil.", "Compare tes couchers de la semaine et ton énergie."],
    ],
    c2: [
      ["Ton énergie se transmet. Les gens repartent comme tu les as reçus.", "Laisse chaque personne un peu plus contente."],
      ["Le manque d'énergie se voit dans la démarche. Marche comme quelqu'un qui sait où il va.", "Marche d'un pas décidé toute la journée."],
      ["Moins d'écran, plus d'énergie.", "Pas de téléphone pendant la première heure de la journée."],
      ["L'enthousiasme convainc plus que les arguments.", "Parle de ton projet avec enthousiasme à quelqu'un."],
      ["Remplir une pièce, c'est être présent, pas bruyant.", "En groupe, relance l'énergie quand elle tombe."],
      ["L'énergie se protège. Repère ce qui te vide.", "Note les trois choses qui t'ont vidé cette semaine."],
      ["Tu n'es plus le garçon mou d'octobre.", "Écris comment on te voit maintenant quand tu entres."],
    ],
  },
  aud: {
    nom: "Audace et risque calculé",
    but: "Oser, après avoir pesé le pour et le contre",
    c1: [
      ["L'audace, c'est faire une chose qui te fait un peu peur.", "Fais aujourd'hui une petite chose qui te fait peur."],
      ["Un risque calculé, c'est savoir ce que tu peux perdre et ce que tu peux gagner.", "Avant un risque, écris le pire et le meilleur."],
      ["Le pire scénario est rarement aussi grave qu'on l'imagine.", "Écris ta peur et ce qui arriverait vraiment."],
      ["Demander ne coûte rien. Le pire, c'est un non.", "Demande quelque chose que tu n'oses pas demander d'habitude."],
      ["Sortir de ta zone de confort un peu chaque jour la rend plus grande.", "Change une habitude confortable aujourd'hui."],
      ["Les gens audacieux ne sont pas sans peur. Ils agissent malgré elle.", "Parle en premier là où tu attends d'habitude."],
      ["Ton audace grandit à chaque petite victoire.", "Écris l'action la plus audacieuse de ta semaine."],
    ],
    c2: [
      ["Une opportunité ne prévient pas. Prépare-toi à dire oui.", "Dis oui à une proposition hors de ton confort."],
      ["Un risque bien pesé n'est plus un saut dans le vide.", "Pour un projet, écris gain, perte, probabilité."],
      ["L'audace se voit dans les détails. Une question, un avis, un premier pas.", "Pose la question que personne n'ose poser."],
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
      ["Anticiper, c'est se demander ce qui peut mal tourner avant de commencer.", "Avant une tâche importante, écris deux risques."],
      ["Le soir, prépare demain. Le matin sera plus simple.", "Écris ce soir les trois priorités de demain."],
      ["Un plan B évite la panique.", "Prépare un plan B pour un rendez-vous de la semaine."],
      ["Anticiper une question, c'est avoir la réponse prête.", "Avant un échange pro, écris trois questions attendues."],
      ["Regarde une semaine devant toi, pas seulement aujourd'hui.", "Planifie ta semaine prochaine en dix minutes."],
      ["Ce qui t'a surpris une fois ne doit pas te surprendre deux fois.", "Note une mauvaise surprise et comment l'éviter."],
      ["Moins d'imprévus, plus de calme.", "Écris ce que l'anticipation t'a évité cette semaine."],
    ],
    c2: [
      ["Londres approche. Ce qui n'est pas prévu maintenant sera stressant plus tard.", "Liste tout ce qu'il faut régler avant Londres."],
      ["L'argent s'anticipe aussi.", "Calcule ton budget pour les quatre mois à Londres."],
      ["Chaque engagement a une date. Mets-la dans ton agenda.", "Mets dans ton agenda toutes tes échéances du mois."],
      ["Anticiper la réaction de l'autre aide à bien parler.", "Avant une discussion délicate, écris comment l'autre risque de réagir."],
      ["Un petit problème réglé tôt ne devient pas grand.", "Règle aujourd'hui un petit problème que tu laisses traîner."],
      ["Prévoir n'empêche pas d'agir vite. Ça rend l'action plus sûre.", "Décide vite après avoir vérifié deux risques."],
      ["Tu vois plus loin.", "Écris ce que tu prévois pour les trois prochains mois."],
    ],
  },
  style: {
    nom: "Image et style",
    but: "Une tenue choisie chaque jour, une garde-robe cohérente",
    c1: [
      ["Ton image parle avant toi. Les gens jugent en quelques secondes.", "Choisis ta tenue la veille au soir."],
      ["Bien habillé ne veut pas dire cher. Ça veut dire bien taillé.", "Trie ton armoire. Écarte le mal taillé et l'abîmé."],
      ["Une garde-robe cohérente se construit pièce par pièce.", "Liste les cinq pièces qui manquent à ta garde-robe."],
      ["Un peu de couleur te différencie, une seule pièce à la fois.", "Ajoute une seule pièce de couleur à une tenue neutre."],
      ["La peau, les cheveux, le parfum font partie de la tenue.", "Fais ta routine de peau matin et soir."],
      ["Des chaussures propres changent toute une silhouette.", "Nettoie tes chaussures."],
      ["Le style, c'est la régularité.", "Prends en photo ta meilleure tenue de la semaine."],
    ],
    c2: [
      ["Ta tenue doit dire qui tu es avant que tu parles.", "Trois mots pour ton image. Habille-toi avec."],
      ["Achète moins, achète mieux.", "Choisis ton prochain achat dans ton budget de 50 euros."],
      ["Un coiffeur régulier, c'est la base.", "Plus d'un mois sans coiffeur ? Prends rendez-vous."],
      ["Une tenue de rendez-vous client se prépare.", "Prépare ta tenue type pour un rendez-vous pro."],
      ["Londres a son style. Prépare ta valise comme une garde-robe.", "Liste les tenues que tu emporteras à Londres."],
      ["La posture finit la tenue.", "Tiens-toi droit toute la journée."],
      ["Ton image a changé.", "Compare une photo de toi d'octobre avec une photo d'aujourd'hui."],
    ],
  },
  v3: {
    nom: "Vente 3 · Raconter une histoire",
    but: "Convaincre par une histoire et une émotion, pas seulement des arguments",
    c1: [
      ["Les gens oublient les arguments. Ils retiennent les histoires.", "Raconte une anecdote de ta semaine à quelqu'un."],
      ["Une histoire a un début, un problème et une fin.", "Écris l'histoire de ton parcours avec ces trois parties."],
      ["L'émotion fait décider. Montre ce que ressent le client.", "Jeu de rôle ChatGPT. Convaincs avec l'histoire d'un client."],
      ["Les détails concrets rendent une histoire vraie.", "Ajoute un détail précis à une histoire racontée."],
      ["Ton histoire personnelle est un outil de vente.", "Raconte en une minute pourquoi tu as lancé ton agence."],
      ["Une histoire courte vaut mieux qu'une longue.", "Raconte une histoire en moins de trente secondes."],
      ["Tu racontes, tu ne récites plus.", "Écris ta meilleure histoire de la semaine."],
    ],
    c2: [
      ["Le client doit se reconnaître dans l'histoire.", "Prépare l'histoire d'un client type pour ton prochain rendez-vous."],
      ["Une histoire avant, après montre la valeur.", "Raconte un projet sous la forme avant, pendant, après."],
      ["La voix fait vivre l'histoire. Ralentis aux moments forts.", "Raconte une histoire avec une pause avant la fin."],
      ["Tes échecs font de bonnes histoires.", "Raconte un échec et ce qu'il t'a appris."],
      ["Une histoire en anglais prépare Londres.", "Raconte ton parcours en anglais à ChatGPT."],
      ["Une histoire finit par une leçon ou une question.", "Finis chaque histoire par une question."],
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
      ["Les gens suivent ceux qui savent où ils vont.", "Ta direction des trois prochains mois, en une phrase."],
    ],
    c2: [
      ["Ne demande pas la permission pour ce qui t'appartient.", "Fais une chose qui te revient, sans demander l'accord."],
      ["L'autorité respecte les autres. Elle ne les écrase pas.", "Recadre quelqu'un calmement, sur un fait précis."],
      ["Dire « je m'en occupe » et le faire construit ta réputation.", "Prends une responsabilité et mène-la jusqu'au bout."],
      ["Moins de mots, plus de poids.", "Réponds à chaque question en deux phrases maximum."],
      ["Ton calme dans la difficulté rassure les autres.", "Face à un problème, reste calme et propose une solution."],
      ["Tu ne t'adaptes plus à tout le monde. Les autres s'adaptent à toi.", "Garde ton rythme et ton avis face à tous."],
      ["Tu as pris ta place.", "Écris en quoi les gens te traitent différemment depuis octobre."],
    ],
  },
  pres: {
    nom: "Me présenter",
    but: "Ma présentation de 30 secondes, en français puis en anglais",
    c1: [
      ["Ta présentation commence par ton nom complet. Nathan Boyer.", "Choisis la présentation qui te ressemble le plus."],
      ["Une présentation se dit, elle ne se récite pas.", "Dis ta présentation entrepreneur trois fois à voix haute."],
      ["Adapte la version à la personne. Entrepreneur, client, jeune, adulte.", "Utilise la bonne version avec quelqu'un que tu rencontres."],
      ["Finis toujours par une question.", "Termine ta présentation en demandant quelque chose à l'autre."],
      ["Se filmer fait progresser vite.", "Filme ta présentation. Regarde ton regard, tes mains, tes tics."],
      ["Trente secondes, pas plus. Le reste viendra dans la conversation.", "Chronomètre ta présentation et coupe ce qui dépasse."],
      ["Ta présentation est prête.", "Présente-toi à un proche comme à un inconnu."],
    ],
    c2: [
      ["Ton nom d'abord. I'm Nathan Boyer.", "Lis ta présentation en anglais à voix haute trois fois."],
      ["En anglais aussi, des phrases courtes.", "Demande à ChatGPT de corriger ta présentation en anglais."],
      ["L'accent n'est pas un problème. La clarté compte plus.", "Enregistre ta présentation en anglais et réécoute-la."],
      ["Prépare les questions qu'on te posera ensuite.", "Réponds en anglais à trois questions de ChatGPT sur toi."],
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
    ["Mesure ton anglais.", "Repasse le test EF SET. Compare avec le premier."],
    ["Mesure ta parole.", "Enregistre un vocal d'une minute et compte tes tics."],
    ["Prépare ton départ.", "Vérifie ta liste Londres une dernière fois."],
    ["Le flow state, c'est maintenant.", "Écris en dix lignes la personne que tu es devenu."],
  ],
};

// Notifications à créer dans l'app Raccourcis de l'iPhone (Automatisation, Heure de la journée).
export const NOTIFS = [
  ["9 h 00", "Tous les jours", "FLOW STATE", "Nathan. Ton défi du jour t'attend. 30 secondes. Ouvre."],
  ["13 h 00", "Tous les jours", "MI-JOURNÉE", "Défi fait ? Sinon, c'est maintenant."],
  ["22 h 00", "Lundi au samedi", "RITUEL", "Anglais, lecture, carnet. Pas de négociation."],
  ["22 h 00", "Dimanche", "BRIEFING AVEC CLAUDE", "Photos du carnet. Copie de ta semaine. Maintenant."],
  ["23 h 30", "Tous les jours", "DERNIER APPEL", "Ta journée n'est pas notée. 2 minutes et tu dors."],
];
