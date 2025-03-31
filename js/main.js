// Main JavaScript for ACT Quest: Path to 30+

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips and popovers if using Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Character Creation System
    initCharacterSystem();

    // Progress Tracking System
    initProgressSystem();

    // Initialize module interactions
    initModuleInteractions();
});

// Character Creation System
function initCharacterSystem() {
    // This will be expanded in the gamification phase
    console.log("Character system initialized");
    
    // Placeholder for character creation
    const characterTypes = [
        {
            name: "Math Wizard",
            type: "pokemon",
            description: "Like a Psychic-type Pokémon, you have powerful analytical abilities!",
            bonuses: {
                math: 10,
                english: 0,
                reading: 5
            },
            image: "assets/pokemon/math-wizard.png"
        },
        {
            name: "Word Knight",
            type: "dnd",
            description: "As a noble Knight of the Word, your English skills are legendary!",
            bonuses: {
                math: 0,
                english: 10,
                reading: 5
            },
            image: "assets/dnd/word-knight.png"
        },
        {
            name: "Comprehension Champion",
            type: "steelers",
            description: "Like a star quarterback, you can read the field and make quick decisions!",
            bonuses: {
                math: 5,
                english: 5,
                reading: 10
            },
            image: "assets/steelers/comprehension-champion.png"
        }
    ];
    
    // Will be implemented in the gamification phase
}

// Progress Tracking System
function initProgressSystem() {
    // This will be expanded in the progress tracking phase
    console.log("Progress system initialized");
    
    // Sample progress data
    const progressData = {
        math: {
            completed: 0,
            total: 6,
            score: 0
        },
        english: {
            completed: 0,
            total: 3,
            score: 0
        },
        reading: {
            completed: 0,
            total: 3,
            score: 0
        }
    };
    
    // Will be implemented in the progress tracking phase
}

// Module Interactions
function initModuleInteractions() {
    // Add event listeners to module cards
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('shadow-lg');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('shadow-lg');
        });
    });
}

// Math Module Functions
const mathModules = {
    // Number & Quantity Module
    numberQuantity: {
        topics: [
            "Real Numbers",
            "Complex Numbers",
            "Vectors",
            "Matrices",
            "Integer and Rational Exponents"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the math module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the math module development phase
        }
    },
    
    // Algebra Module
    algebra: {
        topics: [
            "Linear Equations",
            "Quadratic Equations",
            "Polynomial Expressions",
            "Radical Expressions",
            "Exponential Relationships",
            "Systems of Equations"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the math module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the math module development phase
        }
    },
    
    // Functions Module
    functions: {
        topics: [
            "Function Definition",
            "Function Notation",
            "Function Representation",
            "Linear Functions",
            "Quadratic Functions",
            "Piecewise Functions",
            "Polynomial Functions",
            "Logarithmic Functions"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the math module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the math module development phase
        }
    },
    
    // Geometry Module
    geometry: {
        topics: [
            "Congruence",
            "Similarity",
            "Right Triangles",
            "Trigonometric Ratios",
            "Surface Area",
            "Volume",
            "Circles",
            "Coordinate Geometry"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the math module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the math module development phase
        }
    },
    
    // Statistics & Probability Module
    statistics: {
        topics: [
            "Data Collection Methods",
            "Center and Spread of Distributions",
            "Bivariate Data",
            "Probability Calculations",
            "Sample Spaces"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the math module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the math module development phase
        }
    },
    
    // Essential Skills Module
    essentialSkills: {
        topics: [
            "Rates and Percentages",
            "Proportional Relationships",
            "Area and Volume",
            "Average and Median",
            "Number Expressions"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the math module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the math module development phase
        }
    }
};

// English Module Functions
const englishModules = {
    // Production of Writing Module
    production: {
        topics: [
            "Topic Development",
            "Organization, Unity, and Cohesion",
            "Purpose"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the English module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the English module development phase
        }
    },
    
    // Knowledge of Language Module
    language: {
        topics: [
            "Word Choice",
            "Style and Tone",
            "Precision and Conciseness"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the English module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the English module development phase
        }
    },
    
    // Conventions of Standard English Module
    conventions: {
        topics: [
            "Sentence Structure and Formation",
            "Punctuation",
            "Usage"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the English module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the English module development phase
        }
    }
};

// Reading Module Functions
const readingModules = {
    // Key Ideas and Details Module
    keyIdeas: {
        topics: [
            "Main Ideas",
            "Significant Details",
            "Sequences of Events",
            "Comparisons",
            "Cause-Effect Relationships"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the Reading module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the Reading module development phase
        }
    },
    
    // Craft and Structure Module
    craft: {
        topics: [
            "Context-Dependent Words",
            "Author's Voice and Method",
            "Generalizations"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the Reading module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the Reading module development phase
        }
    },
    
    // Integration of Knowledge Module
    integration: {
        topics: [
            "Claims and Evidence in Arguments",
            "Multiple Text Integration"
        ],
        generateQuestion: function(difficulty) {
            // Will generate questions based on difficulty
            // This will be implemented in the Reading module development phase
        },
        checkAnswer: function(question, userAnswer) {
            // Will check if the user's answer is correct
            // This will be implemented in the Reading module development phase
        }
    }
};

// Gamification System
const gamificationSystem = {
    // Experience points
    xp: 0,
    
    // Level
    level: 1,
    
    // Achievements
    achievements: [],
    
    // Add XP
    addXP: function(points) {
        this.xp += points;
        this.checkLevelUp();
    },
    
    // Check if level up
    checkLevelUp: function() {
        const nextLevel = this.level + 1;
        const xpRequired = nextLevel * 100;
        
        if (this.xp >= xpRequired) {
            this.level = nextLevel;
            this.onLevelUp();
        }
    },
    
    // Level up event
    onLevelUp: function() {
        console.log(`Congratulations! You've reached level ${this.level}!`);
        // Will be implemented in the gamification phase
    },
    
    // Unlock achievement
    unlockAchievement: function(achievement) {
        if (!this.achievements.includes(achievement)) {
            this.achievements.push(achievement);
            this.onAchievementUnlocked(achievement);
        }
    },
    
    // Achievement unlocked event
    onAchievementUnlocked: function(achievement) {
        console.log(`Achievement unlocked: ${achievement.name}`);
        // Will be implemented in the gamification phase
    }
};

// Utility Functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function calculateScore(correct, total, timeBonus = 0) {
    const baseScore = Math.round((correct / total) * 100);
    return baseScore + timeBonus;
}
