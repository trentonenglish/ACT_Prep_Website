// Gamification System for ACT Quest
// This file implements the core gamification elements including character creation,
// experience points, levels, achievements, and quest progression

// Main gamification class
class GamificationSystem {
    constructor() {
        // Initialize user data or load from localStorage
        this.userData = this.loadUserData() || {
            character: null,
            xp: 0,
            level: 1,
            achievements: [],
            completedQuests: [],
            activeQuests: [],
            inventory: [],
            stats: {
                math: 0,
                english: 0,
                reading: 0,
                overall: 0
            },
            skillPoints: 0,
            lastLogin: new Date().toISOString(),
            streakDays: 0
        };
        
        // Define level thresholds
        this.levelThresholds = [
            0,      // Level 1
            100,    // Level 2
            250,    // Level 3
            450,    // Level 4
            700,    // Level 5
            1000,   // Level 6
            1350,   // Level 7
            1750,   // Level 8
            2200,   // Level 9
            2700,   // Level 10
            3300,   // Level 11
            4000,   // Level 12
            4800,   // Level 13
            5700,   // Level 14
            6700,   // Level 15
            7800,   // Level 16
            9000,   // Level 17
            10300,  // Level 18
            11700,  // Level 19
            13200,  // Level 20
            14800,  // Level 21
            16500,  // Level 22
            18300,  // Level 23
            20200,  // Level 24
            22200,  // Level 25
            24300,  // Level 26
            26500,  // Level 27
            28800,  // Level 28
            31200,  // Level 29
            33700   // Level 30
        ];
        
        // Define character classes
        this.characterClasses = [
            {
                id: 'wizard',
                name: 'Math Wizard',
                description: 'Masters of mathematical formulas and equations',
                baseStats: { math: 3, english: 1, reading: 2 },
                abilities: ['Formula Mastery', 'Calculation Speed'],
                avatar: 'wizard.png',
                pokemonType: 'Psychic'
            },
            {
                id: 'bard',
                name: 'Grammar Bard',
                description: 'Eloquent wordsmiths with mastery of language',
                baseStats: { math: 1, english: 3, reading: 2 },
                abilities: ['Word Weaving', 'Punctuation Precision'],
                avatar: 'bard.png',
                pokemonType: 'Normal'
            },
            {
                id: 'ranger',
                name: 'Reading Ranger',
                description: 'Swift readers who can navigate complex texts',
                baseStats: { math: 1, english: 2, reading: 3 },
                abilities: ['Speed Reading', 'Inference Mastery'],
                avatar: 'ranger.png',
                pokemonType: 'Flying'
            },
            {
                id: 'paladin',
                name: 'Test Paladin',
                description: 'Balanced heroes with strong test-taking skills',
                baseStats: { math: 2, english: 2, reading: 2 },
                abilities: ['Time Management', 'Stress Resistance'],
                avatar: 'paladin.png',
                pokemonType: 'Fighting'
            }
        ];
        
        // Define achievements
        this.achievements = [
            {
                id: 'first_login',
                name: 'First Step',
                description: 'Begin your ACT preparation journey',
                icon: 'first_step.png',
                xpReward: 10
            },
            {
                id: 'math_novice',
                name: 'Math Novice',
                description: 'Complete 5 math practice sessions',
                icon: 'math_novice.png',
                xpReward: 25
            },
            {
                id: 'english_novice',
                name: 'English Novice',
                description: 'Complete 5 English practice sessions',
                icon: 'english_novice.png',
                xpReward: 25
            },
            {
                id: 'reading_novice',
                name: 'Reading Novice',
                description: 'Complete 5 reading practice sessions',
                icon: 'reading_novice.png',
                xpReward: 25
            },
            {
                id: 'math_adept',
                name: 'Math Adept',
                description: 'Score 80% or higher on a math test',
                icon: 'math_adept.png',
                xpReward: 50
            },
            {
                id: 'english_adept',
                name: 'English Adept',
                description: 'Score 80% or higher on an English test',
                icon: 'english_adept.png',
                xpReward: 50
            },
            {
                id: 'reading_adept',
                name: 'Reading Adept',
                description: 'Score 80% or higher on a reading test',
                icon: 'reading_adept.png',
                xpReward: 50
            },
            {
                id: 'math_master',
                name: 'Math Master',
                description: 'Complete all math modules with 90% or higher',
                icon: 'math_master.png',
                xpReward: 100
            },
            {
                id: 'english_master',
                name: 'English Master',
                description: 'Complete all English modules with 90% or higher',
                icon: 'english_master.png',
                xpReward: 100
            },
            {
                id: 'reading_master',
                name: 'Reading Master',
                description: 'Complete all reading modules with 90% or higher',
                icon: 'reading_master.png',
                xpReward: 100
            },
            {
                id: 'perfect_score',
                name: 'Perfect Score',
                description: 'Achieve a perfect score on any practice test',
                icon: 'perfect_score.png',
                xpReward: 150
            },
            {
                id: 'streak_3',
                name: 'Consistent Scholar',
                description: 'Log in for 3 consecutive days',
                icon: 'streak_3.png',
                xpReward: 30
            },
            {
                id: 'streak_7',
                name: 'Dedicated Scholar',
                description: 'Log in for 7 consecutive days',
                icon: 'streak_7.png',
                xpReward: 70
            },
            {
                id: 'streak_14',
                name: 'Committed Scholar',
                description: 'Log in for 14 consecutive days',
                icon: 'streak_14.png',
                xpReward: 140
            },
            {
                id: 'challenge_champion',
                name: 'Challenge Champion',
                description: 'Complete 10 challenges with 80% or higher',
                icon: 'challenge_champion.png',
                xpReward: 100
            },
            {
                id: 'speed_demon',
                name: 'Speed Demon',
                description: 'Complete any test with at least 90% accuracy in half the allotted time',
                icon: 'speed_demon.png',
                xpReward: 120
            }
        ];
        
        // Define quests
        this.quests = [
            {
                id: 'math_journey',
                name: 'Math Journey',
                description: 'Master the fundamentals of ACT Math',
                steps: [
                    { id: 'algebra_basics', name: 'Algebra Basics', xpReward: 20 },
                    { id: 'functions_intro', name: 'Functions Introduction', xpReward: 20 },
                    { id: 'geometry_basics', name: 'Geometry Basics', xpReward: 20 },
                    { id: 'statistics_intro', name: 'Statistics Introduction', xpReward: 20 },
                    { id: 'math_test', name: 'Math Mastery Test', xpReward: 50 }
                ],
                finalReward: {
                    xp: 100,
                    item: { id: 'calculator_charm', name: 'Calculator Charm', description: '+10% to Math scores', icon: 'calculator_charm.png' }
                }
            },
            {
                id: 'english_journey',
                name: 'English Journey',
                description: 'Master the fundamentals of ACT English',
                steps: [
                    { id: 'punctuation_basics', name: 'Punctuation Basics', xpReward: 20 },
                    { id: 'grammar_rules', name: 'Grammar Rules', xpReward: 20 },
                    { id: 'sentence_structure', name: 'Sentence Structure', xpReward: 20 },
                    { id: 'rhetorical_skills', name: 'Rhetorical Skills', xpReward: 20 },
                    { id: 'english_test', name: 'English Mastery Test', xpReward: 50 }
                ],
                finalReward: {
                    xp: 100,
                    item: { id: 'grammar_quill', name: 'Grammar Quill', description: '+10% to English scores', icon: 'grammar_quill.png' }
                }
            },
            {
                id: 'reading_journey',
                name: 'Reading Journey',
                description: 'Master the fundamentals of ACT Reading',
                steps: [
                    { id: 'reading_strategies', name: 'Reading Strategies', xpReward: 20 },
                    { id: 'main_idea', name: 'Main Idea Identification', xpReward: 20 },
                    { id: 'inference_practice', name: 'Inference Practice', xpReward: 20 },
                    { id: 'author_purpose', name: 'Author Purpose & Tone', xpReward: 20 },
                    { id: 'reading_test', name: 'Reading Mastery Test', xpReward: 50 }
                ],
                finalReward: {
                    xp: 100,
                    item: { id: 'comprehension_lens', name: 'Comprehension Lens', description: '+10% to Reading scores', icon: 'comprehension_lens.png' }
                }
            },
            {
                id: 'act_mastery',
                name: 'ACT Mastery',
                description: 'Prove your mastery of all ACT sections',
                steps: [
                    { id: 'math_final', name: 'Math Final Challenge', xpReward: 50 },
                    { id: 'english_final', name: 'English Final Challenge', xpReward: 50 },
                    { id: 'reading_final', name: 'Reading Final Challenge', xpReward: 50 },
                    { id: 'full_practice', name: 'Full ACT Practice Test', xpReward: 100 }
                ],
                finalReward: {
                    xp: 200,
                    item: { id: 'act_crown', name: 'ACT Crown', description: '+5% to all scores', icon: 'act_crown.png' }
                },
                requirements: ['math_journey', 'english_journey', 'reading_journey']
            }
        ];
        
        // Initialize the system
        this.initSystem();
    }
    
    // Initialize the gamification system
    initSystem() {
        // Check if this is the first login
        if (!this.userData.character) {
            // Show character creation on first login
            this.showCharacterCreation();
        } else {
            // Update login streak
            this.updateLoginStreak();
            
            // Update UI elements
            this.updateUI();
            
            // Check for available quests
            this.checkAvailableQuests();
        }
        
        // Add event listeners for gamification elements
        this.addEventListeners();
    }
    
    // Load user data from localStorage
    loadUserData() {
        const savedData = localStorage.getItem('actQuestUserData');
        return savedData ? JSON.parse(savedData) : null;
    }
    
    // Save user data to localStorage
    saveUserData() {
        localStorage.setItem('actQuestUserData', JSON.stringify(this.userData));
    }
    
    // Show character creation interface
    showCharacterCreation() {
        // Create modal for character creation
        const modal = document.createElement('div');
        modal.className = 'character-creation-modal';
        modal.innerHTML = `
            <div class="character-creation-content">
                <h2>Create Your ACT Quest Character</h2>
                <p>Choose your character class to begin your journey to ACT mastery!</p>
                
                <div class="character-selection">
                    ${this.characterClasses.map(charClass => `
                        <div class="character-option" data-class-id="${charClass.id}">
                            <div class="character-avatar">
                                <img src="assets/characters/${charClass.avatar}" alt="${charClass.name}">
                                <div class="pokemon-type">${charClass.pokemonType} Type</div>
                            </div>
                            <h3>${charClass.name}</h3>
                            <p>${charClass.description}</p>
                            <div class="character-stats">
                                <div class="stat-bar">
                                    <span>Math</span>
                                    <div class="stat-value">
                                        ${this.renderStatBars(charClass.baseStats.math)}
                                    </div>
                                </div>
                                <div class="stat-bar">
                                    <span>English</span>
                                    <div class="stat-value">
                                        ${this.renderStatBars(charClass.baseStats.english)}
                                    </div>
                                </div>
                                <div class="stat-bar">
                                    <span>Reading</span>
                                    <div class="stat-value">
                                        ${this.renderStatBars(charClass.baseStats.reading)}
                                    </div>
                                </div>
                            </div>
                            <div class="character-abilities">
                                <h4>Special Abilities</h4>
                                <ul>
                                    ${charClass.abilities.map(ability => `<li>${ability}</li>`).join('')}
                                </ul>
                            </div>
                            <button class="select-character-btn" data-class-id="${charClass.id}">Select ${charClass.name}</button>
                        </div>
                    `).join('')}
                </div>
                
                <div class="character-name-input" style="display: none;">
                    <h3>Name Your Character</h3>
                    <input type="text" id="character-name" placeholder="Enter character name">
                    <div class="name-buttons">
                        <button id="back-to-selection">Back</button>
                        <button id="confirm-character">Begin Journey</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for character selection
        const characterOptions = modal.querySelectorAll('.select-character-btn');
        characterOptions.forEach(option => {
            option.addEventListener('click', () => {
                const classId = option.getAttribute('data-class-id');
                this.selectedClass = this.characterClasses.find(c => c.id === classId);
                
                // Show name input
                modal.querySelector('.character-selection').style.display = 'none';
                modal.querySelector('.character-name-input').style.display = 'block';
            });
        });
        
        // Add event listener for back button
        modal.querySelector('#back-to-selection').addEventListener('click', () => {
            modal.querySelector('.character-selection').style.display = 'flex';
            modal.querySelector('.character-name-input').style.display = 'none';
            this.selectedClass = null;
        });
        
        // Add event listener for confirm button
        modal.querySelector('#confirm-character').addEventListener('click', () => {
            const characterName = document.getElementById('character-name').value.trim();
            
            if (characterName && this.selectedClass) {
                // Create character
                this.createCharacter(characterName, this.selectedClass);
                
                // Remove modal
                document.body.removeChild(modal);
                
                // Show welcome message
                this.showWelcomeMessage();
                
                // Update UI
                this.updateUI();
                
                // Assign initial quests
                this.assignInitialQuests();
                
                // Award first login achievement
                this.awardAchievement('first_login');
            } else {
                alert('Please enter a character name');
            }
        });
    }
    
    // Helper function to render stat bars
    renderStatBars(statValue) {
        let bars = '';
        for (let i = 0; i < 5; i++) {
            if (i < statValue) {
                bars += '<span class="stat-filled"></span>';
            } else {
                bars += '<span class="stat-empty"></span>';
            }
        }
        return bars;
    }
    
    // Create a new character
    createCharacter(name, characterClass) {
        this.userData.character = {
            name: name,
            class: characterClass.id,
            className: characterClass.name,
            avatar: characterClass.avatar,
            pokemonType: characterClass.pokemonType,
            abilities: characterClass.abilities,
            stats: { ...characterClass.baseStats }
        };
        
        // Save user data
        this.saveUserData();
    }
    
    // Show welcome message after character creation
    showWelcomeMessage() {
        const welcomeModal = document.createElement('div');
        welcomeModal.className = 'welcome-modal';
        welcomeModal.innerHTML = `
            <div class="welcome-content">
                <h2>Welcome, ${this.userData.character.name}!</h2>
                <div class="character-avatar">
                    <img src="assets/characters/${this.userData.character.avatar}" alt="${this.userData.character.className}">
                </div>
                <p>Your journey as a ${this.userData.character.className} begins now!</p>
                <p>Complete quests, earn experience points, and level up your skills to conquer the ACT!</p>
                <button id="start-journey">Begin Your Quest</button>
            </div>
        `;
        
        document.body.appendChild(welcomeModal);
        
        // Add event listener for start journey button
        welcomeModal.querySelector('#start-journey').addEventListener('click', () => {
            document.body.removeChild(welcomeModal);
        });
    }
    
    // Update login streak
    updateLoginStreak() {
        const lastLogin = new Date(this.userData.lastLogin);
        const today = new Date();
        
        // Reset date times to compare just the dates
        lastLogin.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        
        // Calculate difference in days
        const diffTime = Math.abs(today - lastLogin);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            // Consecutive day
            this.userData.streakDays++;
            
            // Check for streak achievements
            if (this.userData.streakDays === 3) {
                this.awardAchievement('streak_3');
            } else if (this.userData.streakDays === 7) {
                this.awardAchievement('streak_7');
            } else if (this.userData.streakDays === 14) {
                this.awardAchievement('streak_14');
            }
            
            // Show streak notification
            this.showNotification(`Day ${this.userData.streakDays} Streak! +${this.userData.streakDays} XP`);
            
            // Award XP for streak
            this.addXP(this.userData.streakDays);
        } else if (diffDays > 1) {
            // Streak broken
            this.userData.streakDays = 1;
        }
        
        // Update last login
        this.userData.lastLogin = today.toISOString();
        
        // Save user data
        this.saveUserData();
    }
    
    // Update UI elements with user data
    updateUI() {
        // Update character info
        this.updateCharacterInfo();
        
        // Update XP and level
        this.updateXPAndLevel();
        
        // Update achievements
        this.updateAchievements();
        
        // Update quests
        this.updateQuests();
    }
    
    // Update character info in UI
    updateCharacterInfo() {
        const characterInfoElement = document.getElementById('character-info');
        if (characterInfoElement && this.userData.character) {
            characterInfoElement.innerHTML = `
                <div class="character-avatar">
                    <img src="assets/characters/${this.userData.character.avatar}" alt="${this.userData.character.className}">
                </div>
                <div class="character-details">
                    <h3>${this.userData.character.name}</h3>
                    <p class="character-class">${this.userData.character.className}</p>
                    <p class="character-level">Level ${this.userData.level}</p>
                    <div class="pokemon-type-badge">${this.userData.character.pokemonType} Type</div>
                </div>
            `;
        }
    }
    
    // Update XP and level in UI
    updateXPAndLevel() {
        const xpElement = document.getElementById('xp-bar');
        if (xpElement) {
            const currentLevel = this.userData.level;
            const currentLevelXP = this.levelThresholds[currentLevel - 1];
            const nextLevelXP = this.levelThresholds[currentLevel] || this.levelThresholds[this.levelThresholds.length - 1];
            const xpForNextLevel = nextLevelXP - currentLevelXP;
            const currentXPInLevel = this.userData.xp - currentLevelXP;
            const xpPercentage = Math.min(100, Math.floor((currentXPInLevel / xpForNextLevel) * 100));
            
            xpElement.innerHTML = `
                <div class="xp-bar-container">
                    <div class="xp-bar-fill" style="width: ${xpPercentage}%"></div>
                    <span class="xp-text">${this.userData.xp} / ${nextLevelXP} XP</span>
                </div>
                <div class="level-indicator">Level ${this.userData.level}</div>
            `;
        }
    }
    
    // Update achievements in UI
    updateAchievements() {
        const achievementsElement = document.getElementById('achievements-list');
        if (achievementsElement) {
            if (this.userData.achievements.length === 0) {
                achievementsElement.innerHTML = '<p>No achievements yet. Keep studying to earn badges!</p>';
            } else {
                achievementsElement.innerHTML = this.userData.achievements.map(achievementId => {
                    const achievement = this.achievements.find(a => a.id === achievementId);
                    return `
                        <div class="achievement-item">
                            <div class="achievement-icon">
                                <img src="assets/achievements/${achievement.icon}" alt="${achievement.name}">
                            </div>
                            <div class="achievement-details">
                                <h4>${achievement.name}</h4>
                                <p>${achievement.description}</p>
                                <span class="achievement-xp">+${achievement.xpReward} XP</span>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
    }
    
    // Update quests in UI
    updateQuests() {
        const activeQuestsElement = document.getElementById('active-quests');
        if (activeQuestsElement) {
            if (this.userData.activeQuests.length === 0) {
                activeQuestsElement.innerHTML = '<p>No active quests. Check the quest board to start new adventures!</p>';
            } else {
                activeQuestsElement.innerHTML = this.userData.activeQuests.map(questData => {
                    const quest = this.quests.find(q => q.id === questData.id);
                    const currentStep = questData.currentStep;
                    const totalSteps = quest.steps.length;
                    const progressPercentage = Math.floor((currentStep / totalSteps) * 100);
                    
                    return `
                        <div class="quest-item">
                            <h4>${quest.name}</h4>
                            <p>${quest.description}</p>
                            <div class="quest-progress">
                                <div class="progress">
                                    <div class="progress-bar" role="progressbar" style="width: ${progressPercentage}%" 
                                        aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <span class="quest-progress-text">Step ${currentStep} of ${totalSteps}</span>
                            </div>
                            <div class="quest-current-step">
                                <h5>Current Objective:</h5>
                                <p>${quest.steps[currentStep - 1]?.name || 'Complete the quest!'}</p>
                            </div>
                        </div>
                    `;
                }).join('');
            }
        }
    }
    
    // Add event listeners for gamification elements
    addEventListeners() {
        // Add listeners for quest board
        const questBoardButton = document.getElementById('quest-board-button');
        if (questBoardButton) {
            questBoardButton.addEventListener('click', () => this.showQuestBoard());
        }
        
        // Add listeners for character sheet
        const characterSheetButton = document.getElementById('character-sheet-button');
        if (characterSheetButton) {
            characterSheetButton.addEventListener('click', () => this.showCharacterSheet());
        }
        
        // Add listeners for achievements panel
        const achievementsButton = document.getElementById('achievements-button');
        if (achievementsButton) {
            achievementsButton.addEventListener('click', () => this.showAchievements());
        }
    }
    
    // Check for available quests
    checkAvailableQuests() {
        // Check if we need to assign initial quests
        if (this.userData.activeQuests.length === 0 && this.userData.completedQuests.length === 0) {
            this.assignInitialQuests();
        }
        
        // Check for quests that can be started based on completed prerequisites
        this.quests.forEach(quest => {
            // Skip if quest is already active or completed
            if (this.userData.activeQuests.some(q => q.id === quest.id) || 
                this.userData.completedQuests.includes(quest.id)) {
                return;
            }
            
            // Check if quest has requirements
            if (quest.requirements) {
                // Check if all requirements are met
                const allRequirementsMet = quest.requirements.every(reqId => 
                    this.userData.completedQuests.includes(reqId)
                );
                
                if (allRequirementsMet) {
                    // Notify user about new available quest
                    this.showNotification(`New Quest Available: ${quest.name}`);
                }
            }
        });
    }
    
    // Assign initial quests to new characters
    assignInitialQuests() {
        // Add the three main journey quests
        const initialQuests = ['math_journey', 'english_journey', 'reading_journey'];
        
        initialQuests.forEach(questId => {
            const quest = this.quests.find(q => q.id === questId);
            if (quest) {
                this.userData.activeQuests.push({
                    id: quest.id,
                    currentStep: 1,
                    stepsCompleted: []
                });
            }
        });
        
        // Save user data
        this.saveUserData();
        
        // Update quests in UI
        this.updateQuests();
    }
    
    // Show quest board
    showQuestBoard() {
        // Create modal for quest board
        const modal = document.createElement('div');
        modal.className = 'quest-board-modal';
        
        // Get available quests (not active or completed, with requirements met)
        const availableQuests = this.quests.filter(quest => {
            // Skip if quest is already active or completed
            if (this.userData.activeQuests.some(q => q.id === quest.id) || 
                this.userData.completedQuests.includes(quest.id)) {
                return false;
            }
            
            // Check if quest has requirements
            if (quest.requirements) {
                // Check if all requirements are met
                return quest.requirements.every(reqId => 
                    this.userData.completedQuests.includes(reqId)
                );
            }
            
            return true;
        });
        
        modal.innerHTML = `
            <div class="quest-board-content">
                <h2>Quest Board</h2>
                <div class="quest-categories">
                    <button class="quest-tab active" data-tab="available">Available Quests</button>
                    <button class="quest-tab" data-tab="active">Active Quests</button>
                    <button class="quest-tab" data-tab="completed">Completed Quests</button>
                </div>
                
                <div class="quest-list-container">
                    <div class="quest-list available-quests active">
                        ${availableQuests.length > 0 ? 
                            availableQuests.map(quest => `
                                <div class="quest-card">
                                    <h3>${quest.name}</h3>
                                    <p>${quest.description}</p>
                                    <div class="quest-rewards">
                                        <h4>Rewards:</h4>
                                        <p><i class="fas fa-star"></i> ${quest.finalReward.xp} XP</p>
                                        <p><i class="fas fa-gift"></i> ${quest.finalReward.item.name}</p>
                                    </div>
                                    <button class="accept-quest-btn" data-quest-id="${quest.id}">Accept Quest</button>
                                </div>
                            `).join('') : 
                            '<p>No available quests at the moment. Complete your active quests to unlock more!</p>'
                        }
                    </div>
                    
                    <div class="quest-list active-quests">
                        ${this.userData.activeQuests.length > 0 ? 
                            this.userData.activeQuests.map(questData => {
                                const quest = this.quests.find(q => q.id === questData.id);
                                const currentStep = questData.currentStep;
                                const totalSteps = quest.steps.length;
                                const progressPercentage = Math.floor((currentStep / totalSteps) * 100);
                                
                                return `
                                    <div class="quest-card">
                                        <h3>${quest.name}</h3>
                                        <p>${quest.description}</p>
                                        <div class="quest-progress">
                                            <div class="progress">
                                                <div class="progress-bar" role="progressbar" style="width: ${progressPercentage}%" 
                                                    aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <span class="quest-progress-text">Step ${currentStep} of ${totalSteps}</span>
                                        </div>
                                        <div class="quest-current-step">
                                            <h4>Current Objective:</h4>
                                            <p>${quest.steps[currentStep - 1]?.name || 'Complete the quest!'}</p>
                                        </div>
                                        <div class="quest-rewards">
                                            <h4>Rewards:</h4>
                                            <p><i class="fas fa-star"></i> ${quest.finalReward.xp} XP</p>
                                            <p><i class="fas fa-gift"></i> ${quest.finalReward.item.name}</p>
                                        </div>
                                    </div>
                                `;
                            }).join('') : 
                            '<p>No active quests. Visit the quest board to accept new adventures!</p>'
                        }
                    </div>
                    
                    <div class="quest-list completed-quests">
                        ${this.userData.completedQuests.length > 0 ? 
                            this.userData.completedQuests.map(questId => {
                                const quest = this.quests.find(q => q.id === questId);
                                return `
                                    <div class="quest-card completed">
                                        <div class="completed-badge">
                                            <i class="fas fa-check-circle"></i> Completed
                                        </div>
                                        <h3>${quest.name}</h3>
                                        <p>${quest.description}</p>
                                        <div class="quest-rewards">
                                            <h4>Rewards Earned:</h4>
                                            <p><i class="fas fa-star"></i> ${quest.finalReward.xp} XP</p>
                                            <p><i class="fas fa-gift"></i> ${quest.finalReward.item.name}</p>
                                        </div>
                                    </div>
                                `;
                            }).join('') : 
                            '<p>No completed quests yet. Keep working on your active quests!</p>'
                        }
                    </div>
                </div>
                
                <button class="close-modal-btn">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for tabs
        const questTabs = modal.querySelectorAll('.quest-tab');
        questTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                questTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all quest lists
                modal.querySelectorAll('.quest-list').forEach(list => list.classList.remove('active'));
                
                // Show selected quest list
                const tabName = tab.getAttribute('data-tab');
                modal.querySelector(`.${tabName}-quests`).classList.add('active');
            });
        });
        
        // Add event listeners for accept quest buttons
        const acceptButtons = modal.querySelectorAll('.accept-quest-btn');
        acceptButtons.forEach(button => {
            button.addEventListener('click', () => {
                const questId = button.getAttribute('data-quest-id');
                this.acceptQuest(questId);
                
                // Close modal
                document.body.removeChild(modal);
            });
        });
        
        // Add event listener for close button
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    // Accept a quest
    acceptQuest(questId) {
        const quest = this.quests.find(q => q.id === questId);
        if (quest) {
            // Add quest to active quests
            this.userData.activeQuests.push({
                id: quest.id,
                currentStep: 1,
                stepsCompleted: []
            });
            
            // Save user data
            this.saveUserData();
            
            // Update quests in UI
            this.updateQuests();
            
            // Show notification
            this.showNotification(`Quest Accepted: ${quest.name}`);
        }
    }
    
    // Complete a quest step
    completeQuestStep(questId, stepId) {
        // Find the quest in active quests
        const questIndex = this.userData.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return;
        
        const questData = this.userData.activeQuests[questIndex];
        const quest = this.quests.find(q => q.id === questId);
        
        // Check if the step is the current step
        const currentStepIndex = questData.currentStep - 1;
        if (currentStepIndex >= quest.steps.length) return;
        
        const currentStep = quest.steps[currentStepIndex];
        if (currentStep.id !== stepId) return;
        
        // Mark step as completed
        questData.stepsCompleted.push(stepId);
        
        // Award XP
        this.addXP(currentStep.xpReward);
        
        // Show notification
        this.showNotification(`Quest Step Completed: ${currentStep.name} (+${currentStep.xpReward} XP)`);
        
        // Check if this was the last step
        if (questData.currentStep >= quest.steps.length) {
            // Complete the quest
            this.completeQuest(questId);
        } else {
            // Move to next step
            questData.currentStep++;
            
            // Save user data
            this.saveUserData();
            
            // Update quests in UI
            this.updateQuests();
        }
    }
    
    // Complete a quest
    completeQuest(questId) {
        // Find the quest in active quests
        const questIndex = this.userData.activeQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return;
        
        const quest = this.quests.find(q => q.id === questId);
        
        // Remove from active quests
        this.userData.activeQuests.splice(questIndex, 1);
        
        // Add to completed quests
        this.userData.completedQuests.push(questId);
        
        // Award XP
        this.addXP(quest.finalReward.xp);
        
        // Add item to inventory
        this.userData.inventory.push(quest.finalReward.item);
        
        // Save user data
        this.saveUserData();
        
        // Update quests in UI
        this.updateQuests();
        
        // Show completion notification
        this.showQuestCompletionModal(quest);
        
        // Check for newly available quests
        this.checkAvailableQuests();
    }
    
    // Show quest completion modal
    showQuestCompletionModal(quest) {
        const modal = document.createElement('div');
        modal.className = 'quest-completion-modal';
        modal.innerHTML = `
            <div class="quest-completion-content">
                <h2>Quest Completed!</h2>
                <div class="completion-details">
                    <h3>${quest.name}</h3>
                    <p>${quest.description}</p>
                </div>
                <div class="rewards-earned">
                    <h3>Rewards Earned</h3>
                    <div class="xp-reward">
                        <i class="fas fa-star"></i>
                        <span>${quest.finalReward.xp} XP</span>
                    </div>
                    <div class="item-reward">
                        <div class="item-icon">
                            <img src="assets/items/${quest.finalReward.item.icon}" alt="${quest.finalReward.item.name}">
                        </div>
                        <div class="item-details">
                            <h4>${quest.finalReward.item.name}</h4>
                            <p>${quest.finalReward.item.description}</p>
                        </div>
                    </div>
                </div>
                <button class="close-modal-btn">Continue</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener for close button
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    // Show character sheet
    showCharacterSheet() {
        const modal = document.createElement('div');
        modal.className = 'character-sheet-modal';
        
        // Get character stats with bonuses from items
        const stats = this.calculateTotalStats();
        
        modal.innerHTML = `
            <div class="character-sheet-content">
                <h2>Character Sheet</h2>
                <div class="character-overview">
                    <div class="character-avatar">
                        <img src="assets/characters/${this.userData.character.avatar}" alt="${this.userData.character.className}">
                    </div>
                    <div class="character-info">
                        <h3>${this.userData.character.name}</h3>
                        <p class="character-class">Level ${this.userData.level} ${this.userData.character.className}</p>
                        <div class="pokemon-type-badge">${this.userData.character.pokemonType} Type</div>
                        <div class="xp-info">
                            <div class="xp-bar-container">
                                <div class="xp-bar-fill" style="width: ${this.calculateXPPercentage()}%"></div>
                                <span class="xp-text">${this.userData.xp} / ${this.getXPForNextLevel()} XP</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="character-stats">
                    <h3>Stats</h3>
                    <div class="stat-row">
                        <div class="stat-label">Math</div>
                        <div class="stat-value">
                            <div class="stat-bars">
                                ${this.renderStatBars(stats.math)}
                            </div>
                            <span class="stat-number">${stats.math}</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <div class="stat-label">English</div>
                        <div class="stat-value">
                            <div class="stat-bars">
                                ${this.renderStatBars(stats.english)}
                            </div>
                            <span class="stat-number">${stats.english}</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <div class="stat-label">Reading</div>
                        <div class="stat-value">
                            <div class="stat-bars">
                                ${this.renderStatBars(stats.reading)}
                            </div>
                            <span class="stat-number">${stats.reading}</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <div class="stat-label">Overall</div>
                        <div class="stat-value">
                            <div class="stat-bars">
                                ${this.renderStatBars(stats.overall)}
                            </div>
                            <span class="stat-number">${stats.overall}</span>
                        </div>
                    </div>
                </div>
                
                <div class="character-abilities">
                    <h3>Special Abilities</h3>
                    <ul>
                        ${this.userData.character.abilities.map(ability => `<li>${ability}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="character-inventory">
                    <h3>Inventory</h3>
                    <div class="inventory-items">
                        ${this.userData.inventory.length > 0 ? 
                            this.userData.inventory.map(item => `
                                <div class="inventory-item">
                                    <div class="item-icon">
                                        <img src="assets/items/${item.icon}" alt="${item.name}">
                                    </div>
                                    <div class="item-details">
                                        <h4>${item.name}</h4>
                                        <p>${item.description}</p>
                                    </div>
                                </div>
                            `).join('') : 
                            '<p>No items in inventory. Complete quests to earn powerful items!</p>'
                        }
                    </div>
                </div>
                
                <button class="close-modal-btn">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener for close button
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    // Calculate total stats including bonuses from items
    calculateTotalStats() {
        // Start with base stats
        const stats = { ...this.userData.character.stats };
        
        // Add level bonuses (1 point to each stat every 3 levels)
        const levelBonus = Math.floor(this.userData.level / 3);
        stats.math += levelBonus;
        stats.english += levelBonus;
        stats.reading += levelBonus;
        
        // Add bonuses from items
        this.userData.inventory.forEach(item => {
            if (item.description.includes('Math')) {
                stats.math += 1;
            }
            if (item.description.includes('English')) {
                stats.english += 1;
            }
            if (item.description.includes('Reading')) {
                stats.reading += 1;
            }
            if (item.description.includes('all scores')) {
                stats.math += 1;
                stats.english += 1;
                stats.reading += 1;
            }
        });
        
        // Calculate overall stat (average of the three)
        stats.overall = Math.round((stats.math + stats.english + stats.reading) / 3);
        
        return stats;
    }
    
    // Calculate XP percentage for progress bar
    calculateXPPercentage() {
        const currentLevel = this.userData.level;
        const currentLevelXP = this.levelThresholds[currentLevel - 1];
        const nextLevelXP = this.getXPForNextLevel();
        const xpForNextLevel = nextLevelXP - currentLevelXP;
        const currentXPInLevel = this.userData.xp - currentLevelXP;
        return Math.min(100, Math.floor((currentXPInLevel / xpForNextLevel) * 100));
    }
    
    // Get XP required for next level
    getXPForNextLevel() {
        const currentLevel = this.userData.level;
        return this.levelThresholds[currentLevel] || this.levelThresholds[this.levelThresholds.length - 1];
    }
    
    // Show achievements panel
    showAchievements() {
        const modal = document.createElement('div');
        modal.className = 'achievements-modal';
        
        // Count earned and total achievements
        const earnedCount = this.userData.achievements.length;
        const totalCount = this.achievements.length;
        const earnedPercentage = Math.floor((earnedCount / totalCount) * 100);
        
        modal.innerHTML = `
            <div class="achievements-content">
                <h2>Achievements</h2>
                <div class="achievements-progress">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${earnedPercentage}%" 
                            aria-valuenow="${earnedPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span class="achievements-progress-text">${earnedCount} of ${totalCount} Achievements Earned (${earnedPercentage}%)</span>
                </div>
                
                <div class="achievements-list">
                    ${this.achievements.map(achievement => {
                        const isEarned = this.userData.achievements.includes(achievement.id);
                        return `
                            <div class="achievement-card ${isEarned ? 'earned' : 'locked'}">
                                <div class="achievement-icon">
                                    <img src="assets/achievements/${achievement.icon}" alt="${achievement.name}">
                                    ${!isEarned ? '<div class="locked-overlay"><i class="fas fa-lock"></i></div>' : ''}
                                </div>
                                <div class="achievement-details">
                                    <h4>${achievement.name}</h4>
                                    <p>${achievement.description}</p>
                                    <span class="achievement-xp">+${achievement.xpReward} XP</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <button class="close-modal-btn">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener for close button
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    // Award an achievement
    awardAchievement(achievementId) {
        // Check if achievement is already earned
        if (this.userData.achievements.includes(achievementId)) {
            return;
        }
        
        // Find the achievement
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (!achievement) {
            return;
        }
        
        // Add achievement to earned list
        this.userData.achievements.push(achievementId);
        
        // Award XP
        this.addXP(achievement.xpReward);
        
        // Save user data
        this.saveUserData();
        
        // Update achievements in UI
        this.updateAchievements();
        
        // Show achievement notification
        this.showAchievementNotification(achievement);
    }
    
    // Show achievement notification
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-notification-content">
                <div class="achievement-icon">
                    <img src="assets/achievements/${achievement.icon}" alt="${achievement.name}">
                </div>
                <div class="achievement-details">
                    <h3>Achievement Unlocked!</h3>
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                    <span class="achievement-xp">+${achievement.xpReward} XP</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }
    
    // Add XP to user
    addXP(amount) {
        this.userData.xp += amount;
        
        // Check for level up
        this.checkLevelUp();
        
        // Save user data
        this.saveUserData();
        
        // Update XP and level in UI
        this.updateXPAndLevel();
        
        // Show XP notification
        this.showNotification(`+${amount} XP`);
    }
    
    // Check if user has leveled up
    checkLevelUp() {
        const currentLevel = this.userData.level;
        const maxLevel = this.levelThresholds.length;
        
        // Don't check if already at max level
        if (currentLevel >= maxLevel) {
            return;
        }
        
        // Check if XP is enough for next level
        const nextLevelXP = this.levelThresholds[currentLevel];
        if (this.userData.xp >= nextLevelXP) {
            // Level up
            this.userData.level++;
            
            // Award skill point
            this.userData.skillPoints++;
            
            // Show level up notification
            this.showLevelUpNotification();
            
            // Check for further level ups
            this.checkLevelUp();
        }
    }
    
    // Show level up notification
    showLevelUpNotification() {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-notification-content">
                <h2>Level Up!</h2>
                <p>Congratulations! You are now Level ${this.userData.level}!</p>
                <div class="level-up-rewards">
                    <div class="reward-item">
                        <i class="fas fa-plus-circle"></i>
                        <span>+1 Skill Point</span>
                    </div>
                    <div class="reward-item">
                        <i class="fas fa-heart"></i>
                        <span>Increased Stats</span>
                    </div>
                </div>
                <button class="close-notification-btn">Continue</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Add event listener for close button
        notification.querySelector('.close-notification-btn').addEventListener('click', () => {
            document.body.removeChild(notification);
            
            // Show skill point allocation if user has skill points
            if (this.userData.skillPoints > 0) {
                this.showSkillPointAllocation();
            }
        });
    }
    
    // Show skill point allocation
    showSkillPointAllocation() {
        const modal = document.createElement('div');
        modal.className = 'skill-point-modal';
        modal.innerHTML = `
            <div class="skill-point-content">
                <h2>Allocate Skill Point</h2>
                <p>You have ${this.userData.skillPoints} skill point(s) to allocate. Choose a stat to improve:</p>
                
                <div class="stat-options">
                    <div class="stat-option" data-stat="math">
                        <h3>Math</h3>
                        <p>Improve your mathematical abilities</p>
                        <button class="allocate-btn" data-stat="math">Improve Math</button>
                    </div>
                    <div class="stat-option" data-stat="english">
                        <h3>English</h3>
                        <p>Enhance your grammar and language skills</p>
                        <button class="allocate-btn" data-stat="english">Improve English</button>
                    </div>
                    <div class="stat-option" data-stat="reading">
                        <h3>Reading</h3>
                        <p>Boost your reading comprehension</p>
                        <button class="allocate-btn" data-stat="reading">Improve Reading</button>
                    </div>
                </div>
                
                <button class="close-modal-btn">Skip</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for allocate buttons
        const allocateButtons = modal.querySelectorAll('.allocate-btn');
        allocateButtons.forEach(button => {
            button.addEventListener('click', () => {
                const stat = button.getAttribute('data-stat');
                this.allocateSkillPoint(stat);
                document.body.removeChild(modal);
            });
        });
        
        // Add event listener for close button
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    // Allocate a skill point
    allocateSkillPoint(stat) {
        if (this.userData.skillPoints <= 0) {
            return;
        }
        
        // Increase the stat
        this.userData.character.stats[stat]++;
        
        // Decrease skill points
        this.userData.skillPoints--;
        
        // Save user data
        this.saveUserData();
        
        // Show notification
        this.showNotification(`${stat.charAt(0).toUpperCase() + stat.slice(1)} increased by 1!`);
        
        // Check if user still has skill points
        if (this.userData.skillPoints > 0) {
            setTimeout(() => {
                this.showSkillPointAllocation();
            }, 500);
        }
    }
    
    // Show notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'game-notification';
        notification.innerHTML = `<div class="notification-content">${message}</div>`;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
}

// Initialize the gamification system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gamificationSystem = new GamificationSystem();
});
