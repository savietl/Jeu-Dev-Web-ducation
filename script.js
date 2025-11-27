// Classe principale de l'application d'aventure web développement
class WebDevAdventure {
    constructor() {
        // Configuration générale de l'application
        this.config = {
            audioVolume: 0.3,
            transitionDelay: 400,
            minScoreForCompletion: 0.7
        };

        // État actuel de l'application
        this.state = {
            currentLevel: 0,
            currentQuestion: 0,
            score: 0,
            userProgress: this.loadProgress(),
            audioEnabled: false
        };

        // Références aux éléments DOM
        this.elements = this.cacheDOM();
        // Données des niveaux de l'application
        this.levels = this.getLevelsData();
        // Attache les événements aux boutons
        this.attachEventListeners();
        // Configure les contrôles audio
        this.setupAudioControls();
        // Démarre l'application
        this.startApplication();
    }

    // Cache les éléments DOM pour un accès facile
    cacheDOM() {
        return {
            // Écrans de l'application
            screens: {
                welcome: document.getElementById('welcomeScreen'),
                levels: document.getElementById('levelScreen'),
                course: document.getElementById('courseScreen'),
                quiz: document.getElementById('quizScreen'),
                results: document.getElementById('resultScreen')
            },
            // Boutons de l'application
            buttons: {
                start: document.getElementById('startBtn'),
                startQuiz: document.getElementById('startQuizBtn'),
                nextQuiz: document.getElementById('nextQuizBtn'),
                prevQuiz: document.getElementById('prevQuizBtn'),
                prevCourse: document.getElementById('prevCourseBtn'),
                replay: document.getElementById('replayBtn'),
                audioToggle: document.getElementById('audioToggle')
            },
            // Contenu dynamique
            content: {
                courseTitle: document.getElementById('courseTitle'),
                courseContent: document.getElementById('courseContent'),
                questionText: document.getElementById('questionText'),
                optionsContainer: document.getElementById('optionsContainer'),
                feedback: document.getElementById('feedback'),
                finalScore: document.getElementById('finalScore'),
                totalQuestions: document.getElementById('totalQuestions'),
                stars: document.getElementById('stars'),
                levelsContainer: document.getElementById('levelsContainer'),
                progressFill: document.getElementById('progressFill'),
                courseImage: document.getElementById('courseImage'),
                quizImage: document.getElementById('quizImage')
            },
            // Éléments multimédias
            media: {
                welcomeMusic: document.getElementById('welcomeMusic'),
                courseMusic: document.getElementById('courseMusic'),
                quizMusic: document.getElementById('quizMusic'),
                resultMusic: document.getElementById('resultMusic')
            }
        };
    }

    // Configure les contrôles audio
    setupAudioControls() {
        const audioToggle = this.elements.buttons.audioToggle;
        if (audioToggle) {
            audioToggle.addEventListener('click', () => {
                this.toggleAudio();
            });
            this.updateAudioButton();
        }
    }

    // Bascule l'état audio activé/désactivé
    toggleAudio() {
        this.state.audioEnabled = !this.state.audioEnabled;
        
        if (this.state.audioEnabled) {
            console.log('Audio activé par utilisateur');
            this.playAudio(this.elements.media.welcomeMusic);
        } else {
            console.log('Audio désactivé');
            this.stopAllAudio();
        }
        
        this.updateAudioButton();
    }

    // Met à jour l'apparence du bouton audio
    updateAudioButton() {
        const audioToggle = this.elements.buttons.audioToggle;
        if (!audioToggle) return;
        
        const icon = audioToggle.querySelector('.audio-icon');
        const text = audioToggle.querySelector('.audio-text');
        
        if (this.state.audioEnabled) {
            audioToggle.classList.add('audio-enabled');
            if (icon) icon.textContent = '🔊';
            if (text) text.textContent = 'Audio Activé';
        } else {
            audioToggle.classList.remove('audio-enabled');
            if (icon) icon.textContent = '🔇';
            if (text) text.textContent = 'Activer l\'Audio';
        }
    }

    // Retourne les données des niveaux
    getLevelsData() {
        return [
            {
                id: 'html',
                title: 'HTML - Les Briques du Web',
                description: 'Apprends à construire des pages web comme avec des Legos !',
                courseImage: 'html.png',
                content: `

Salut petit constructeur ! Dans cette vidéo, tu vas découvrir comment on bâtit des sites web comme on construit avec des Legos !

**🏗️ CE QUE TU VAS APPRENDRE :**

• **Les briques de base** : Chaque page web commence par des briques HTML
• **La grande boîte** : La balise &lt;html&gt; qui contient tout
• **Les instructions** : La balise &lt;head&gt; pour dire au navigateur quoi faire
• **Le contenu visible** : La balise &lt;body&gt; où tout ce que tu vois vit

**🧱 LES BALISES ESSENTIELLES :**

• <h1>; à &lt;h6&gt; : Les titres (comme des étiquettes de taille différente)
• <p>; : Les paragraphes (pour ton texte)
• <img>; : Les images (tes photos et dessins)
• <a>; : Les liens (comme des portails magiques)
• <ul>; et &lt;ol&gt; : Les listes (pour ranger tes idées)
• <table>; : Les tableaux (comme à l'école)

**🔨 EXEMPLE DE CONSTRUCTION :**

Regarde dans la vidéo comment on assemble :
1. D'abord la grande boîte &lt;html&gt;
2. Ensuite les instructions &lt;head&gt;
3. Puis le contenu &lt;body&gt;
4. Enfin toutes les briques à l'intérieur

**🎯 POUR RETENIR :**
HTML = La structure, comme les murs d'une maison
Chaque balise a un rôle précis
On ouvre avec &lt;balise&gt; et on ferme avec &lt;/balise&gt;`,

                questions: [
                    {
                        question: "Quelle balise est comme la grande boîte qui contient tout ?",
                        options: ["&lt;html&gt;", "&lt;body&gt;", "&lt;head&gt;", "&lt;div&gt;"],
                        correctAnswer: 0,
                        explanation: "Exact ! &lt;html&gt; c'est la grande boîte qui contient toute la page web !",
                        quizImage: "html.png"
                    },
                    {
                        question: "Où va le contenu que les visiteurs voient ?",
                        options: ["Dans &lt;body&gt;", "Dans &lt;head&gt;", "Dans &lt;html&gt;", "Dans &lt;title&gt;"],
                        correctAnswer: 0,
                        explanation: "Bravo ! Tout ce qui est visible va dans la balise &lt;body&gt; !",
                        quizImage: "html.png"
                    },
                    {
                        question: "Comment crée-t-on un lien vers un autre site ?",
                        options: ["Avec &lt;a href='...'&gt;", "Avec &lt;link&gt;", "Avec &lt;connect&gt;", "Avec &lt;go&gt;"],
                        correctAnswer: 0,
                        explanation: "Super ! &lt;a&gt; avec href crée des portails vers d'autres pages !",
                        quizImage: "html.png"
                    }
                ]
            },
            {
                id: 'css-enfant',
                title: 'CSS - La Décoration Magique',
                description: 'Transforme tes pages avec des couleurs et des animations !',
                courseImage: 'css.png',
                content: `🎨 **DANS CETTE VIDÉO : LA MAGIE DES COULEURS ET MOUVEMENTS**

Salut petit magicien ! Maintenant que tu sais construire, apprenons à décorer et animer !

**🌈 CE QUE TU VAS DÉCOUVRIR :**

• **La peinture magique** : Changer les couleurs de fond et de texte
• **Les polices rigolotes** : Choisir comment s'affiche ton texte
• **Les animations dansantes** : Faire bouger tes éléments
• **Le positionnement** : Placer chaque élément au bon endroit

**🎪 LES EFFETS SPÉCIAUX :**

• **background-color** : La couleur de fond (comme la peinture des murs)
• **color** : La couleur du texte (comme l'encre)
• **font-size** : La taille du texte (petit, moyen, géant)
• **animation** : Faire bouger les éléments (comme par magie)
• **hover** : Les effets au survol (quand la souris passe dessus)

**✨ TRANSFORMATION COMPLÈTE :**

Avant CSS :
- Texte noir sur fond blanc
- Tout est statique
- Pas d'effets spéciaux

Après CSS :
- Couleurs partout !
- Animations fluides
- Effets interactifs
- Design professionnel`,

                questions: [
                    {
                        question: "Quelle propriété change la couleur de fond ?",
                        options: ["background-color", "color-background", "bg-color", "back-color"],
                        correctAnswer: 0,
                        explanation: "Parfait ! background-color change la couleur d'arrière-plan comme de la peinture !",
                        quizImage: "css.png"
                    },
                    {
                        question: "Comment fait-on bouger un élément ?",
                        options: ["Avec animation", "Avec move", "Avec bouger", "Avec mouvement"],
                        correctAnswer: 0,
                        explanation: "Excellent ! La propriété animation permet de créer des mouvements magiques !",
                        quizImage: "css.png"
                    },
                    {
                        question: "Que se passe-t-il avec :hover ?",
                        options: ["L'effet se déclenche au survol", "L'élément disparaît", "La couleur change automatiquement", "L'élément grossit"],
                        correctAnswer: 0,
                        explanation: "Génial ! :hover crée des effets interactifs quand la souris passe dessus !",
                        quizImage: "css.png"
                    }
                ]
            },
            {
                id: 'javascript-enfant',
                title: 'JavaScript - Le Pouvoir Interactif',
                description: 'Donne vie à tes pages avec de l\'interactivité !',
                courseImage: 'js.png',
                content: `⚡ **DANS CETTE VIDÉO : DONNER VIE AUX PAGES**

Salut petit sorcier ! Maintenant, tu vas apprendre à rendre tes pages vivantes et interactives !

**🎮 CE QUE TU VAS CRÉER :**

• **Les variables** : Des petites boîtes pour stocker des informations
• **Les fonctions** : Des sorts magiques qui font des actions
• **Les événements** : Réagir aux clics et mouvements
• **Les interactions** : Faire bouger les éléments en temps réel

**🔧 LES OUTILS MAGIQUES :**

• **let** : Créer des variables (comme des petites boîtes)
• **function** : Créer des fonctions (comme des sorts)
• **onclick** : Réagir aux clics de souris
• **innerHTML** : Changer le contenu des éléments
• **setInterval** : Répéter des actions

**🎯 EXEMPLE D'INTERACTIVITÉ :**

Regarde dans la vidéo comment :
- Un bouton cliquable fait apparaître un message
- Un compteur augmente à chaque clic
- Un élément suit le mouvement de la souris
- Des animations se déclenchent automatiquement`,

                questions: [
                    {
                        question: "Comment stocke-t-on une information comme un score ?",
                        options: ["Avec let score = 0", "Avec variable score = 0", "Avec stock score = 0", "Avec info score = 0"],
                        correctAnswer: 0,
                        explanation: "Parfait ! 'let' permet de créer des variables pour stocker des informations !",
                        quizImage: "js.png"
                    },
                    {
                        question: "Comment détecte-t-on un clic sur un bouton ?",
                        options: ["Avec onclick", "Avec click", "Avec mouseclick", "Avec press"],
                        correctAnswer: 0,
                        explanation: "Super ! onclick permet de réagir quand quelqu'un clique sur un élément !",
                        quizImage: "js.png"
                    },
                    {
                        question: "Comment change-t-on le texte d'un élément ?",
                        options: ["Avec innerHTML", "Avec changeText", "Avec textContent", "Avec updateText"],
                        correctAnswer: 0,
                        explanation: "Génial ! innerHTML permet de modifier le contenu des éléments HTML !",
                        quizImage: "js.png"
                    }
                ]
            },
            {
                id: 'frontend-backend',
                title: 'Front-end vs Back-end',
                description: 'Comprends la différence entre ce qu\'on voit et ce qui se cache !',
                courseImage: 'front end.jpg',
                content: `🏗️ **DANS CETTE VIDÉO : LE DEVANT ET L'ARRIÈRE DE LA SCÈNE**

Salut petit explorateur ! Découvre les deux faces d'un site web : ce qu'on voit et ce qui travaille dans l'ombre !

**🎭 LES DEUX UNIVERS :**

**FRONT-END** - Ce que l'utilisateur voit :
• L'interface utilisateur et le design
• Les interactions et animations
• Technologies : HTML, CSS, JavaScript
• Tout ce qui s'affiche dans le navigateur

**BACK-END** - Ce qui travaille dans l'ombre :
• Les serveurs et bases de données
• La logique métier et la sécurité
• Technologies : Node.js, PHP, Python, Ruby
• Le stockage et traitement des données

**🔄 EXEMPLE CONCRET :**

Quand tu envoies un message sur un site :
FRONT-END : Tu écris dans une belle interface et cliques sur "envoyer"
BACK-END : Le message est stocké en base de données et envoyé à ton ami

**🔧 LES TECHNOLOGIES :**

Front-end :
• HTML : Structure des pages
• CSS : Design et mise en page
• JavaScript : Interactivité

Back-end :
• Bases de données : MySQL, MongoDB
• Langages serveur : PHP, Python, Ruby, Node.js
• APIs : Communication entre front et back`,

                questions: [
                    {
                        question: "Qu'est-ce que le Front-end ?",
                        options: ["Ce que l'utilisateur voit", "Les serveurs cachés", "Les bases de données", "La logique invisible"],
                        correctAnswer: 0,
                        explanation: "Exact ! Le Front-end c'est tout ce que tu vois à l'écran - l'interface, les couleurs, les boutons !",
                        quizImage: "end.jpg"
                    },
                    {
                        question: "Où sont stockés les messages des utilisateurs ?",
                        options: ["Dans le Back-end", "Dans le Front-end", "Dans le navigateur", "Dans le CSS"],
                        correctAnswer: 0,
                        explanation: "Bravo ! Le Back-end gère le stockage dans des bases de données comme MySQL ou MongoDB !",
                        quizImage: "backend.jpg"
                    },
                    {
                        question: "Quelle technologie fait le lien entre Front-end et Back-end ?",
                        options: ["Les APIs", "Le CSS", "Le HTML", "Les animations"],
                        correctAnswer: 0,
                        explanation: "Super ! Les APIs permettent au Front-end de communiquer avec le Back-end pour échanger des données !",
                        quizImage: "ba.png"
                    }
                ]
            },
            {
                id: 'projet-complet',
                title: 'Crée Ton Premier Jeu !',
                description: 'Utilise tous tes super-pouvoirs pour créer un jeu vidéo !',
                courseImage: 'game.png',
                content: `🎮 **DANS CETTE VIDÉO : CRÉATION D'UN VRAI JEU VIDÉO**

Salut petit créateur ! C'est l'heure de rassembler tous tes pouvoirs Front-end et Back-end pour créer ton premier jeu vidéo !

**🚀 LE PROJET : ATTRAPE LES ÉTOILES**

Un jeu où tu contrôles un vaisseau spatial et attrapes des étoiles qui tombent du ciel !

**🛠️ CE QUE TU VAS UTILISER :**

• **FRONT-END** :
  - HTML : La structure du jeu (le terrain de jeu)
  - CSS : Le design et les animations (les couleurs et effets)
  - JavaScript : L'interactivité et les contrôles

• **BACK-END** (optionnel pour avancé) :
  - Stockage des scores en base de données
  - Système de classement des joueurs
  - Gestion des utilisateurs

**🎯 LES FONCTIONNALITÉS :**

• Un vaisseau contrôlable avec les flèches
• Des étoiles qui tombent aléatoirement
• Un score qui augmente quand tu attrapes une étoile
• Des effets visuels quand tu réussis
• Tableau des meilleurs scores`,

                questions: [
                    {
                        question: "Comment crée-t-on de nouvelles étoiles dans le jeu ?",
                        options: ["Avec createElement() en Front-end", "Avec newStar()", "Avec addElement()", "Avec makeStar()"],
                        correctAnswer: 0,
                        explanation: "Fantastique ! createElement() permet de créer de nouveaux éléments dynamiquement côté Front-end !",
                        quizImage: "game.png"
                    },
                    {
                        question: "Comment détecte-t-on les touches du clavier ?",
                        options: ["Avec onkeydown en JavaScript", "Avec keypress", "Avec keyboard", "Avec keyevent"],
                        correctAnswer: 0,
                        explanation: "Super ! onkeydown détecte quand une touche est enfoncée côté Front-end !",
                        quizImage: "game.png"
                    },
                    {
                        question: "Où stockerait-on les meilleurs scores des joueurs ?",
                        options: ["Dans une base de données Back-end", "Dans le CSS", "Dans le HTML", "Dans le JavaScript du navigateur"],
                        correctAnswer: 0,
                        explanation: "Génial ! Les scores doivent être stockés côté Back-end pour être persistants et sécurisés !",
                        quizImage: "backend.jpg"
                    }
                ]
            }
        ];
    }

    // Démarre l'application
    startApplication() {
        this.showScreen('welcome');
    }

    // Affiche un écran spécifique
    showScreen(screenName) {
        // Cache tous les écrans
        Object.values(this.elements.screens).forEach(screen => {
            if (screen) screen.classList.remove('active');
        });

        // Récupère l'écran cible
        const targetScreen = this.elements.screens[screenName];
        if (targetScreen) {
            // Après un délai, affiche l'écran
            setTimeout(() => {
                targetScreen.classList.add('active');
                // Exécute les actions spécifiques à l'écran
                this.onScreenChange(screenName);
            }, this.config.transitionDelay);
        }
    }

    // Actions à effectuer lors du changement d'écran
    onScreenChange(screenName) {
        switch (screenName) {
            case 'levels':
                this.renderLevelSelection();
                break;
            case 'course':
                this.loadCourseContent();
                break;
            case 'quiz':
                this.startQuiz();
                break;
            case 'results':
                this.showResults();
                break;
        }
    }

    // Affiche la sélection des niveaux
    renderLevelSelection() {
        const container = this.elements.content.levelsContainer;
        if (!container) return;

        // Génère le HTML pour chaque niveau
        container.innerHTML = this.levels.map((level, index) => `
            <div class="level-btn" data-level="${index}">
                <strong>${level.title}</strong>
                <span>${level.description}</span>
                ${this.state.userProgress.completedLevels.includes(level.id) ? 
                    '<div class="completed-badge">✓ Terminé</div>' : ''}
            </div>
        `).join('');

        // Ajoute les écouteurs d'événements aux boutons de niveau
        container.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const levelIndex = parseInt(btn.dataset.level);
                this.selectLevel(levelIndex);
            });
        });
    }

    // Sélectionne un niveau
    selectLevel(levelIndex) {
        this.state.currentLevel = levelIndex;
        this.showScreen('course');
        if (this.state.audioEnabled) {
            this.playAudio(this.elements.media.courseMusic);
        }
    }

    // Charge le contenu du cours actuel
    loadCourseContent() {
        const level = this.levels[this.state.currentLevel];
        if (this.elements.content.courseTitle) {
            this.elements.content.courseTitle.textContent = level.title;
        }
        if (this.elements.content.courseContent) {
            this.elements.content.courseContent.innerHTML = level.content;
        }
        if (this.elements.content.courseImage && level.courseImage) {
            this.elements.content.courseImage.src = level.courseImage;
        }
    }

    // Démarre le quiz
    startQuiz() {
        this.state.currentQuestion = 0;
        this.state.score = 0;
        this.stopAllAudio();
        if (this.state.audioEnabled) {
            this.playAudio(this.elements.media.quizMusic);
        }
        this.loadQuestion();
    }

    // Charge la question actuelle du quiz
    loadQuestion() {
        const level = this.levels[this.state.currentLevel];
        const question = level.questions[this.state.currentQuestion];
        if (!question) return;

        if (this.elements.content.questionText) {
            this.elements.content.questionText.textContent = question.question;
        }
        if (this.elements.content.quizImage && question.quizImage) {
            this.elements.content.quizImage.src = question.quizImage;
        }

        this.renderOptions(question.options);

        if (this.elements.content.feedback) {
            this.elements.content.feedback.textContent = '';
            this.elements.content.feedback.className = 'feedback';
        }

        if (this.elements.buttons.nextQuiz) {
            this.elements.buttons.nextQuiz.style.display = 'none';
        }
        if (this.elements.buttons.prevQuiz) {
            this.elements.buttons.prevQuiz.style.display = this.state.currentQuestion > 0 ? 'block' : 'none';
        }

        this.updateProgressBar();
    }

    // Affiche les options de réponse
    renderOptions(options) {
        const container = this.elements.content.optionsContainer;
        if (!container) return;

        container.innerHTML = options.map((option, index) => 
            `<div class="option" data-index="${index}">${option}</div>`
        ).join('');
        
        container.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', () => this.checkAnswer(parseInt(option.dataset.index)));
        });
    }

    // Vérifie la réponse sélectionnée
    checkAnswer(selectedIndex) {
        const level = this.levels[this.state.currentLevel];
        const question = level.questions[this.state.currentQuestion];
        const options = this.elements.content.optionsContainer.querySelectorAll('.option');

        // Désactive les clics sur les options
        options.forEach(option => option.style.pointerEvents = 'none');

        const isCorrect = selectedIndex === question.correctAnswer;
        if (isCorrect) {
            this.state.score++;
            this.showFeedback('Correct! 🎉', 'success');
            options[selectedIndex].classList.add('correct');
        } else {
            this.showFeedback(`Incorrect. ${question.explanation}`, 'error');
            options[selectedIndex].classList.add('incorrect');
            options[question.correctAnswer].classList.add('correct');
        }

        if (this.elements.buttons.nextQuiz) {
            this.elements.buttons.nextQuiz.style.display = 'block';
        }
        if (this.elements.buttons.prevQuiz) {
            this.elements.buttons.prevQuiz.style.display = this.state.currentQuestion > 0 ? 'block' : 'none';
        }

        this.saveProgress();
    }

    // Passe à la question suivante
    nextQuestion() {
        this.state.currentQuestion++;
        const level = this.levels[this.state.currentLevel];
        if (this.state.currentQuestion < level.questions.length) {
            this.loadQuestion();
        } else {
            this.showScreen('results');
        }
    }

    // Retourne à la question précédente
    previousQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.loadQuestion();
        }
    }

    // Affiche les résultats du quiz
    showResults() {
        this.stopAllAudio();
        if (this.state.audioEnabled) {
            this.playAudio(this.elements.media.resultMusic);
        }

        const level = this.levels[this.state.currentLevel];
        const totalQuestions = level.questions.length;

        if (this.elements.content.finalScore) {
            this.elements.content.finalScore.textContent = this.state.score;
        }
        if (this.elements.content.totalQuestions) {
            this.elements.content.totalQuestions.textContent = totalQuestions;
        }

        const percentage = (this.state.score / totalQuestions) * 100;
        this.renderStars(percentage);

        if (percentage >= this.config.minScoreForCompletion * 100) {
            this.markLevelAsCompleted(level.id);
        }
    }

    // Affiche les étoiles de notation
    renderStars(percentage) {
        const container = this.elements.content.stars;
        if (!container) return;

        const starCount = Math.floor(percentage / 20);
        container.innerHTML = Array.from({ length: 5 }, (_, i) => 
            `<span class="star ${i < starCount ? 'active' : ''}">★</span>`
        ).join('');
    }

    // Met à jour la barre de progression
    updateProgressBar() {
        const level = this.levels[this.state.currentLevel];
        const progress = ((this.state.currentQuestion + 1) / level.questions.length) * 100;
        if (this.elements.content.progressFill) {
            this.elements.content.progressFill.style.width = `${progress}%`;
        }
    }

    // Affiche un message de feedback
    showFeedback(message, type) {
        if (this.elements.content.feedback) {
            this.elements.content.feedback.textContent = message;
            this.elements.content.feedback.className = `feedback ${type}`;
        }
    }

    // Joue un élément audio
    playAudio(audioElement) {
        if (!audioElement || !this.state.audioEnabled) {
            return;
        }
        
        try {
            console.log('Tentative de lecture audio:', audioElement.src);
            audioElement.volume = this.config.audioVolume;
            audioElement.currentTime = 0;
            const playPromise = audioElement.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio joué avec succès');
                }).catch(error => {
                    console.log('Erreur de lecture audio:', error);
                });
            }
        } catch (error) {
            console.warn('Erreur audio:', error);
        }
    }

    // Arrête toute la musique
    stopAllAudio() {
        Object.values(this.elements.media).forEach(media => {
            if (media instanceof HTMLAudioElement) {
                media.pause();
                media.currentTime = 0;
            }
        });
    }

    // Charge la progression sauvegardée
    loadProgress() {
        try {
            const saved = localStorage.getItem('webdev-progress');
            return saved ? JSON.parse(saved) : { completedLevels: [], scores: {} };
        } catch {
            return { completedLevels: [], scores: {} };
        }
    }

    // Sauvegarde la progression
    saveProgress() {
        try {
            localStorage.setItem('webdev-progress', JSON.stringify(this.state.userProgress));
        } catch (error) {
            console.warn('Sauvegarde impossible:', error);
        }
    }

    // Marque un niveau comme complété
    markLevelAsCompleted(levelId) {
        if (!this.state.userProgress.completedLevels.includes(levelId)) {
            this.state.userProgress.completedLevels.push(levelId);
            this.state.userProgress.scores[levelId] = this.state.score;
            this.saveProgress();
        }
    }

    // Attache les écouteurs d'événements aux boutons
    attachEventListeners() {
        if (this.elements.buttons.start) {
            this.elements.buttons.start.addEventListener('click', () => this.showScreen('levels'));
        }
        if (this.elements.buttons.startQuiz) {
            this.elements.buttons.startQuiz.addEventListener('click', () => this.showScreen('quiz'));
        }
        if (this.elements.buttons.nextQuiz) {
            this.elements.buttons.nextQuiz.addEventListener('click', () => this.nextQuestion());
        }
        if (this.elements.buttons.prevQuiz) {
            this.elements.buttons.prevQuiz.addEventListener('click', () => this.previousQuestion());
        }
        if (this.elements.buttons.prevCourse) {
            this.elements.buttons.prevCourse.addEventListener('click', () => this.showScreen('levels'));
        }
        if (this.elements.buttons.replay) {
            this.elements.buttons.replay.addEventListener('click', () => {
                this.showScreen('welcome');
                if (this.state.audioEnabled) {
                    this.playAudio(this.elements.media.welcomeMusic);
                }
            });
        }
    }
}

// Initialisation de l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new WebDevAdventure();
});