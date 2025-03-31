// JavaScript for Statistics & Probability Module

document.addEventListener('DOMContentLoaded', function() {
    // Initialize practice problems
    initPracticeProblems();
    
    // Initialize challenges
    initChallenges();
    
    // Initialize test
    initTest();
});

// Practice Problems
function initPracticeProblems() {
    console.log("Statistics & Probability practice problems initialized");
}

// Load practice problems based on difficulty
function loadPracticeProblems(difficulty) {
    const container = document.getElementById('practice-problems-container');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Loading practice problems...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate problems based on difficulty
        let problems = generateStatisticsProblems(difficulty, 5);
        
        // Create HTML for problems
        let problemsHTML = '<div class="practice-problems">';
        
        problems.forEach((problem, index) => {
            problemsHTML += `
                <div class="practice-problem" id="problem-${index}">
                    <h3>Problem ${index + 1}</h3>
                    <div class="problem-content">
                        <p>${problem.question}</p>
                        ${problem.image ? `<img src="${problem.image}" alt="Problem diagram" class="img-fluid my-3">` : ''}
                    </div>
                    <div class="answer-options">
                        ${problem.options.map((option, optIndex) => `
                            <div class="answer-option" data-index="${optIndex}" onclick="selectAnswer(${index}, ${optIndex})">
                                <span class="option-letter">${String.fromCharCode(65 + optIndex)}.</span>
                                <span class="option-text">${option}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="answer-feedback mt-3" id="feedback-${index}"></div>
                </div>
            `;
        });
        
        problemsHTML += `
            <div class="practice-controls">
                <button class="btn btn-primary" onclick="checkAllAnswers()">Check Answers</button>
                <button class="btn btn-secondary" onclick="loadPracticeProblems('${difficulty}')">New Problems</button>
            </div>
        </div>`;
        
        container.innerHTML = problemsHTML;
    }, 1000);
}

// Generate statistics problems based on difficulty
function generateStatisticsProblems(difficulty, count) {
    // Sample problems for demonstration
    const easyProblems = [
        {
            question: "Find the mean of the following data set: 4, 7, 10, 8, 6",
            options: ["5", "7", "8", "9"],
            correctIndex: 1,
            explanation: "Mean = (4 + 7 + 10 + 8 + 6) / 5 = 35 / 5 = 7"
        },
        {
            question: "Find the median of the following data set: 3, 8, 2, 10, 5",
            options: ["2", "3", "5", "8"],
            correctIndex: 2,
            explanation: "First, arrange the data in order: 2, 3, 5, 8, 10<br>The median is the middle value, which is 5."
        },
        {
            question: "A bag contains 3 red marbles, 4 blue marbles, and 3 green marbles. If a marble is drawn at random, what is the probability of drawing a blue marble?",
            options: ["3/10", "4/10", "1/3", "1/2"],
            correctIndex: 1,
            explanation: "Probability = Number of favorable outcomes / Total number of possible outcomes<br>Probability of drawing a blue marble = 4 / 10 = 2/5 = 0.4"
        },
        {
            question: "Find the range of the following data set: 12, 15, 9, 18, 11",
            options: ["3", "6", "9", "12"],
            correctIndex: 2,
            explanation: "Range = Maximum value - Minimum value<br>Range = 18 - 9 = 9"
        },
        {
            question: "A coin is flipped 3 times. What is the probability of getting exactly 2 heads?",
            options: ["1/8", "2/8", "3/8", "4/8"],
            correctIndex: 2,
            explanation: "The possible outcomes when flipping a coin 3 times are: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT<br>There are 3 outcomes with exactly 2 heads: HHT, HTH, THH<br>Probability = 3/8 = 0.375"
        }
    ];
    
    const mediumProblems = [
        {
            question: "The mean of 5 numbers is 8. If one of the numbers is removed, the mean of the remaining numbers is 7. What is the value of the removed number?",
            options: ["11", "12", "13", "14"],
            correctIndex: 1,
            explanation: "Let's call the removed number x.<br>Sum of all 5 numbers = 5 × 8 = 40<br>Sum of remaining 4 numbers = 4 × 7 = 28<br>Therefore, x = 40 - 28 = 12"
        },
        {
            question: "A box contains 5 red balls and 3 blue balls. Two balls are drawn without replacement. What is the probability that both balls are red?",
            options: ["5/28", "10/28", "15/28", "20/28"],
            correctIndex: 1,
            explanation: "Probability of first ball being red = 5/8<br>Probability of second ball being red (given first is red) = 4/7<br>Probability of both being red = (5/8) × (4/7) = 20/56 = 10/28 = 5/14"
        },
        {
            question: "The scores on a test have a mean of 75 and a standard deviation of 8. If the scores are normally distributed, approximately what percentage of students scored between 67 and 83?",
            options: ["34%", "48%", "68%", "95%"],
            correctIndex: 2,
            explanation: "The range 67 to 83 represents scores within 1 standard deviation of the mean (75 ± 8).<br>In a normal distribution, approximately 68% of the data falls within 1 standard deviation of the mean."
        },
        {
            question: "In how many ways can a committee of 3 people be formed from a group of 7 people?",
            options: ["21", "35", "42", "210"],
            correctIndex: 0,
            explanation: "This is a combination problem: C(7,3) = 7! / [3!(7-3)!] = 7! / (3!4!) = (7×6×5×4!) / (3×2×1×4!) = (7×6×5) / (3×2×1) = 210 / 10 = 21"
        },
        {
            question: "A spinner has 4 equal sections numbered 1 through 4. If the spinner is spun twice, what is the probability that the sum of the two spins is 6?",
            options: ["1/16", "2/16", "3/16", "4/16"],
            correctIndex: 2,
            explanation: "The possible combinations that sum to 6 are: (2,4), (4,2), and (3,3)<br>Total number of possible outcomes when spinning twice = 4 × 4 = 16<br>Probability = 3/16"
        }
    ];
    
    const hardProblems = [
        {
            question: "The mean of a data set is 15 and the standard deviation is 4. If each value in the data set is multiplied by 2 and then increased by 3, what will be the new mean and standard deviation?",
            options: ["Mean = 33, SD = 8", "Mean = 33, SD = 11", "Mean = 30, SD = 8", "Mean = 30, SD = 11"],
            correctIndex: 0,
            explanation: "When each value x becomes 2x + 3:<br>New mean = 2(old mean) + 3 = 2(15) + 3 = 30 + 3 = 33<br>New standard deviation = 2(old standard deviation) = 2(4) = 8"
        },
        {
            question: "A bag contains 4 red marbles, 5 blue marbles, and 6 green marbles. If 3 marbles are drawn without replacement, what is the probability that all 3 marbles are of different colors?",
            options: ["40/91", "60/91", "120/455", "180/455"],
            correctIndex: 1,
            explanation: "Ways to select 3 marbles of different colors = C(4,1) × C(5,1) × C(6,1) = 4 × 5 × 6 = 120<br>Total ways to select 3 marbles = C(15,3) = 15! / [3!(15-3)!] = 15! / (3!12!) = (15×14×13×12!) / (3×2×1×12!) = (15×14×13) / (3×2×1) = 2730 / 6 = 455<br>Probability = 120/455 = 24/91 = 60/91"
        },
        {
            question: "In a game, you roll a die. If you roll a 1 or 2, you win $5. If you roll a 3 or 4, you win $10. If you roll a 5 or 6, you lose $15. What is the expected value of this game?",
            options: ["-$5", "$0", "$5", "$10"],
            correctIndex: 1,
            explanation: "Expected value = (Value of outcome) × (Probability of outcome)<br>= ($5 × 2/6) + ($10 × 2/6) + (-$15 × 2/6)<br>= ($5 × 1/3) + ($10 × 1/3) + (-$15 × 1/3)<br>= $5/3 + $10/3 - $15/3<br>= ($5 + $10 - $15)/3<br>= $0/3 = $0"
        },
        {
            question: "A box contains 3 red balls, 4 white balls, and 5 blue balls. In how many ways can 6 balls be selected if at least 1 ball of each color must be selected?",
            options: ["210", "490", "560", "840"],
            correctIndex: 2,
            explanation: "We need to find the number of ways to select 6 balls with at least 1 of each color.<br>Total ways = C(3,1)×C(4,1)×C(5,4) + C(3,1)×C(4,2)×C(5,3) + C(3,1)×C(4,3)×C(5,2) + C(3,2)×C(4,1)×C(5,3) + C(3,2)×C(4,2)×C(5,2) + C(3,3)×C(4,1)×C(5,2)<br>= 3×4×5 + 3×6×10 + 3×4×10 + 3×4×10 + 3×6×10 + 1×4×10<br>= 60 + 180 + 120 + 120 + 180 + 40<br>= 700"
        },
        {
            question: "A survey of 200 people found that 120 like chocolate ice cream, 100 like vanilla ice cream, and 50 like both flavors. How many people like neither flavor?",
            options: ["20", "30", "40", "50"],
            correctIndex: 1,
            explanation: "Let's use the formula: n(A ∪ B) = n(A) + n(B) - n(A ∩ B)<br>Where A = people who like chocolate, B = people who like vanilla<br>n(A ∪ B) = number of people who like at least one flavor<br>n(A) = 120, n(B) = 100, n(A ∩ B) = 50<br>n(A ∪ B) = 120 + 100 - 50 = 170<br>Number of people who like neither flavor = 200 - 170 = 30"
        }
    ];
    
    // Select problems based on difficulty
    let problems;
    switch(difficulty) {
        case 'easy':
            problems = easyProblems;
            break;
        case 'medium':
            problems = mediumProblems;
            break;
        case 'hard':
            problems = hardProblems;
            break;
        default:
            problems = easyProblems;
    }
    
    // Shuffle and return requested number of problems
    return shuffleArray(problems).slice(0, count);
}

// Select an answer for a practice problem
function selectAnswer(problemIndex, optionIndex) {
    // Clear previous selections
    const options = document.querySelectorAll(`#problem-${problemIndex} .answer-option`);
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select the clicked option
    options[optionIndex].classList.add('selected');
}

// Check all answers for practice problems
function checkAllAnswers() {
    const problems = document.querySelectorAll('.practice-problem');
    let correctCount = 0;
    
    problems.forEach((problem, index) => {
        const selectedOption = problem.querySelector('.answer-option.selected');
        const feedbackElement = document.getElementById(`feedback-${index}`);
        
        if (!selectedOption) {
            feedbackElement.innerHTML = '<div class="alert alert-warning">Please select an answer.</div>';
            feedbackElement.style.display = 'block';
            return;
        }
        
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const correctIndex = index % 5; // For demo purposes, using a pattern
        
        // Clear previous feedback
        problem.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
        
        if (selectedIndex === correctIndex) {
            selectedOption.classList.add('correct');
            feedbackElement.innerHTML = '<div class="alert alert-success"><strong>Correct!</strong> Great job!</div>';
            feedbackElement.className = 'answer-feedback mt-3 correct';
            correctCount++;
        } else {
            selectedOption.classList.add('incorrect');
            problem.querySelectorAll('.answer-option')[correctIndex].classList.add('correct');
            feedbackElement.innerHTML = '<div class="alert alert-danger"><strong>Incorrect.</strong> The correct answer is ' + 
                String.fromCharCode(65 + correctIndex) + '.</div>';
            feedbackElement.className = 'answer-feedback mt-3 incorrect';
        }
        
        feedbackElement.style.display = 'block';
    });
    
    // Show overall score
    const scoreAlert = document.createElement('div');
    scoreAlert.className = 'alert alert-info mt-4';
    scoreAlert.innerHTML = `<strong>Your Score:</strong> ${correctCount} out of ${problems.length} correct (${Math.round(correctCount/problems.length*100)}%)`;
    
    const controlsElement = document.querySelector('.practice-controls');
    controlsElement.parentNode.insertBefore(scoreAlert, controlsElement);
    
    // Add XP based on performance
    const xpGained = correctCount * 10;
    gamificationSystem.addXP(xpGained);
    
    // Show XP notification
    const xpNotification = document.createElement('div');
    xpNotification.className = 'alert alert-success mt-2';
    xpNotification.innerHTML = `<strong>+${xpGained} XP gained!</strong>`;
    controlsElement.parentNode.insertBefore(xpNotification, controlsElement);
}

// Challenge Functions
function initChallenges() {
    console.log("Statistics & Probability challenges initialized");
}

function startChallenge(type) {
    const container = document.getElementById('challenge-container');
    container.classList.remove('d-none');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Preparing challenge...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate challenge based on type
        let problems;
        let timeLimit;
        let title;
        
        switch(type) {
            case 'data':
                problems = generateStatisticsProblems('easy', 5);
                timeLimit = 300; // 5 minutes
                title = "Data Analysis Challenge";
                break;
            case 'probability':
                problems = generateStatisticsProblems('medium', 5);
                timeLimit = 420; // 7 minutes
                title = "Probability Challenge";
                break;
            case 'counting':
                problems = generateStatisticsProblems('hard', 5);
                timeLimit = 600; // 10 minutes
                title = "Counting & Combinations Challenge";
                break;
            default:
                problems = generateStatisticsProblems('easy', 5);
                timeLimit = 300;
                title = "Statistics Challenge";
        }
        
        // Create HTML for challenge
        let challengeHTML = `
            <div class="challenge-active">
                <div class="challenge-header">
                    <h3>${title}</h3>
                    <div class="challenge-timer">
                        <div>Time Remaining</div>
                        <div class="time" id="challenge-time">${formatTime(timeLimit)}</div>
                    </div>
                </div>
                
                <div class="challenge-progress">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: 0%" id="challenge-progress-bar"></div>
                    </div>
                    <div class="text-center mt-2">Problem <span id="current-problem">1</span> of ${problems.length}</div>
                </div>
                
                <div class="challenge-problems" id="challenge-problems">
                    <!-- Problems will be inserted here -->
                </div>
                
                <div class="challenge-controls mt-4">
                    <button class="btn btn-primary" id="next-problem-btn">Next Problem</button>
                    <button class="btn btn-danger" id="end-challenge-btn">End Challenge</button>
                </div>
            </div>
        `;
        
        container.innerHTML = challengeHTML;
        
        // Insert first problem
        const problemsContainer = document.getElementById('challenge-problems');
        problemsContainer.innerHTML = createProblemHTML(problems[0], 0);
        
        // Set up timer
        let timeRemaining = timeLimit;
        const timerElement = document.getElementById('challenge-time');
        const timerInterval = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = formatTime(timeRemaining);
            
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                endChallenge();
            }
        }, 1000);
        
        // Set up navigation
        let currentProblemIndex = 0;
        const nextButton = document.getElementById('next-problem-btn');
        const endButton = document.getElementById('end-challenge-btn');
        const progressBar = document.getElementById('challenge-progress-bar');
        const currentProblemIndicator = document.getElementById('current-problem');
        
        nextButton.addEventListener('click', () => {
            // Save current answer
            const selectedOption = document.querySelector('.answer-option.selected');
            if (selectedOption) {
                problems[currentProblemIndex].userAnswer = parseInt(selectedOption.dataset.index);
            }
            
            // Move to next problem
            currentProblemIndex++;
            
            if (currentProblemIndex >= problems.length) {
                // End challenge if all problems completed
                clearInterval(timerInterval);
                endChallenge(problems, timeLimit - timeRemaining);
            } else {
                // Show next problem
                problemsContainer.innerHTML = createProblemHTML(problems[currentProblemIndex], currentProblemIndex);
                currentProblemIndicator.textContent = currentProblemIndex + 1;
                progressBar.style.width = `${(currentProblemIndex / problems.length) * 100}%`;
            }
        });
        
        endButton.addEventListener('click', () => {
            // Save current answer
            const selectedOption = document.querySelector('.answer-option.selected');
            if (selectedOption) {
                problems[currentProblemIndex].userAnswer = parseInt(selectedOption.dataset.index);
            }
            
            // End challenge
            clearInterval(timerInterval);
            endChallenge(problems, timeLimit - timeRemaining);
        });
        
        // Helper function to create problem HTML
        function createProblemHTML(problem, index) {
            return `
                <div class="challenge-problem" id="challenge-problem-${index}">
                    <h4>Problem ${index + 1}</h4>
                    <div class="problem-content">
                        <p>${problem.question}</p>
                        ${problem.image ? `<img src="${problem.image}" alt="Problem diagram" class="img-fluid my-3">` : ''}
                    </div>
                    <div class="answer-options">
                        ${problem.options.map((option, optIndex) => `
                            <div class="answer-option ${problem.userAnswer === optIndex ? 'selected' : ''}" 
                                data-index="${optIndex}" 
                                onclick="document.querySelectorAll('#challenge-problem-${index} .answer-option').forEach(opt => opt.classList.remove('selected')); this.classList.add('selected');">
                                <span class="option-letter">${String.fromCharCode(65 + optIndex)}.</span>
                                <span class="option-text">${option}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Function to end challenge and show results
        function endChallenge(problems = [], timeUsed = 0) {
            // Calculate score
            let correctCount = 0;
            problems.forEach(problem => {
                if (problem.userAnswer === problem.correctIndex) {
                    correctCount++;
                }
            });
            
            const score = Math.round((correctCount / problems.length) * 100);
            const timeBonus = Math.max(0, Math.round((1 - (timeUsed / timeLimit)) * 20));
            const totalScore = score + timeBonus;
            
            // Determine XP and rewards
            const baseXP = type === 'data' ? 100 : (type === 'probability' ? 150 : 200);
            const xpMultiplier = score / 100;
            const xpGained = Math.round(baseXP * xpMultiplier);
            
            // Add XP to user
            gamificationSystem.addXP(xpGained);
            
            // Create results HTML
            let resultsHTML = `
                <div class="challenge-complete">
                    <h3>Challenge Complete!</h3>
                    <div class="challenge-score">
                        <div class="score-circle">
                            <div class="score-number">${score}%</div>
                            <div class="score-label">Accuracy</div>
                        </div>
                    </div>
                    
                    <div class="challenge-stats mt-4">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="stat-box">
                                    <div class="stat-value">${correctCount}/${problems.length}</div>
                                    <div class="stat-label">Correct Answers</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="stat-box">
                                    <div class="stat-value">+${timeBonus}</div>
                                    <div class="stat-label">Time Bonus</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="stat-box">
                                    <div class="stat-value">${formatTime(timeUsed)}</div>
                                    <div class="stat-label">Time Used</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="challenge-rewards mt-4">
                        <div class="challenge-reward">
                            <div class="reward-icon">
                                <i class="fas fa-star"></i>
                            </div>
                            <div class="reward-value">+${xpGained} XP</div>
                        </div>
                        
                        ${score >= 80 ? `
                        <div class="challenge-reward">
                            <div class="reward-icon" style="background-color: #4caf50;">
                                <i class="fas fa-medal"></i>
                            </div>
                            <div class="reward-value">Statistics Badge</div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="mt-4">
                        <button class="btn btn-primary" onclick="document.getElementById('challenge-container').classList.add('d-none');">Close</button>
                        <button class="btn btn-secondary" onclick="startChallenge('${type}');">Try Again</button>
                    </div>
                </div>
            `;
            
            container.innerHTML = resultsHTML;
        }
    }, 1000);
}

// Test Functions
function initTest() {
    console.log("Statistics & Probability test initialized");
}

function startTest() {
    const container = document.getElementById('test-container');
    container.classList.remove('d-none');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Preparing test...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate test questions (mix of difficulties)
        const easyProblems = generateStatisticsProblems('easy', 3);
        const mediumProblems = generateStatisticsProblems('medium', 4);
        const hardProblems = generateStatisticsProblems('hard', 3);
        
        const problems = [...easyProblems, ...mediumProblems, ...hardProblems];
        shuffleArray(problems);
        
        const timeLimit = 900; // 15 minutes
        
        // Create HTML for test
        let testHTML = `
            <div class="test-active">
                <div class="test-timer">
                    <div>Time Remaining</div>
                    <div class="time" id="test-time">${formatTime(timeLimit)}</div>
                </div>
                
                <div class="test-questions mt-4">
                    ${problems.map((problem, index) => `
                        <div class="test-question" id="test-question-${index}">
                            <h3>Question ${index + 1}</h3>
                            <div class="problem-content">
                                <p>${problem.question}</p>
                                ${problem.image ? `<img src="${problem.image}" alt="Problem diagram" class="img-fluid my-3">` : ''}
                            </div>
                            <div class="answer-options">
                                ${problem.options.map((option, optIndex) => `
                                    <div class="answer-option" data-index="${optIndex}" onclick="selectTestAnswer(${index}, ${optIndex})">
                                        <span class="option-letter">${String.fromCharCode(65 + optIndex)}.</span>
                                        <span class="option-text">${option}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="test-controls mt-4">
                    <button class="btn btn-primary btn-lg" onclick="submitTest()">Submit Test</button>
                </div>
            </div>
        `;
        
        container.innerHTML = testHTML;
        
        // Store problems for later scoring
        window.testProblems = problems;
        
        // Set up timer
        let timeRemaining = timeLimit;
        const timerElement = document.getElementById('test-time');
        window.testTimerInterval = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = formatTime(timeRemaining);
            
            if (timeRemaining <= 0) {
                clearInterval(window.testTimerInterval);
                submitTest();
            }
        }, 1000);
    }, 1000);
}

function selectTestAnswer(questionIndex, optionIndex) {
    // Clear previous selections
    const options = document.querySelectorAll(`#test-question-${questionIndex} .answer-option`);
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select the clicked option
    options[optionIndex].classList.add('selected');
    
    // Store the answer
    window.testProblems[questionIndex].userAnswer = optionIndex;
}

function submitTest() {
    // Clear timer
    clearInterval(window.testTimerInterval);
    
    // Collect answers
    const problems = window.testProblems;
    const container = document.getElementById('test-container');
    
    // Calculate score
    let correctCount = 0;
    problems.forEach(problem => {
        if (problem.userAnswer === problem.correctIndex) {
            correctCount++;
        }
    });
    
    const score = Math.round((correctCount / problems.length) * 100);
    const scaledScore = Math.min(36, Math.round(score / 100 * 36));
    
    // Analyze strengths and weaknesses
    const categories = {
        'Descriptive Statistics': { correct: 0, total: 0 },
        'Data Representation': { correct: 0, total: 0 },
        'Probability': { correct: 0, total: 0 },
        'Counting Principles': { correct: 0, total: 0 },
        'Expected Value': { correct: 0, total: 0 }
    };
    
    // For demo purposes, assign categories randomly
    problems.forEach((problem, index) => {
        const categoryKeys = Object.keys(categories);
        const category = categoryKeys[index % categoryKeys.length];
        
        categories[category].total++;
        if (problem.userAnswer === problem.correctIndex) {
            categories[category].correct++;
        }
    });
    
    // Find strengths and weaknesses
    let strengths = [];
    let weaknesses = [];
    
    for (const [category, stats] of Object.entries(categories)) {
        if (stats.total > 0) {
            const percentage = Math.round((stats.correct / stats.total) * 100);
            
            if (percentage >= 70) {
                strengths.push({ category, percentage });
            } else if (percentage < 50) {
                weaknesses.push({ category, percentage });
            }
        }
    }
    
    // Sort by percentage
    strengths.sort((a, b) => b.percentage - a.percentage);
    weaknesses.sort((a, b) => a.percentage - b.percentage);
    
    // Create results HTML
    let resultsHTML = `
        <div class="test-results">
            <h3>Test Results</h3>
            
            <div class="test-score">
                ${scaledScore}/36
            </div>
            <div class="score-label">Scaled ACT Math Score</div>
            
            <div class="test-accuracy mt-3">
                <div class="progress" style="height: 30px;">
                    <div class="progress-bar ${score >= 70 ? 'bg-success' : score >= 50 ? 'bg-warning' : 'bg-danger'}" 
                        role="progressbar" 
                        style="width: ${score}%" 
                        aria-valuenow="${score}" 
                        aria-valuemin="0" 
                        aria-valuemax="100">
                        ${score}%
                    </div>
                </div>
                <div class="text-center mt-2">${correctCount} out of ${problems.length} correct</div>
            </div>
            
            <div class="test-analysis mt-5">
                <h3>Performance Analysis</h3>
                
                <div class="strength-weakness">
                    <div class="strength-card">
                        <h4><i class="fas fa-check-circle"></i> Strengths</h4>
                        <ul class="list-unstyled">
                            ${strengths.length > 0 ? 
                                strengths.map(s => `<li><strong>${s.category}:</strong> ${s.percentage}% correct</li>`).join('') : 
                                '<li>Keep practicing to develop your strengths!</li>'
                            }
                        </ul>
                    </div>
                    
                    <div class="weakness-card">
                        <h4><i class="fas fa-exclamation-circle"></i> Areas to Improve</h4>
                        <ul class="list-unstyled">
                            ${weaknesses.length > 0 ? 
                                weaknesses.map(w => `<li><strong>${w.category}:</strong> ${w.percentage}% correct</li>`).join('') : 
                                '<li>Great job! Continue to reinforce your understanding.</li>'
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="test-recommendations mt-5">
                <h3>Recommendations</h3>
                <div class="row">
                    <div class="col-md-6">
                        <div class="recommendation-card">
                            <h4>Study Plan</h4>
                            <p>Based on your performance, focus on these areas:</p>
                            <ul>
                                ${weaknesses.length > 0 ? 
                                    weaknesses.map(w => `<li>Review ${w.category} concepts and practice more problems</li>`).join('') : 
                                    '<li>Challenge yourself with harder problems</li>'
                                }
                                <li>Take another practice test in one week</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="recommendation-card">
                            <h4>Next Steps</h4>
                            <ul>
                                <li>Review the explanations for questions you missed</li>
                                <li>Complete the ${weaknesses.length > 0 ? weaknesses[0].category : 'Statistics'} Challenge</li>
                                <li>Move on to the Number & Quantity module</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-5">
                <button class="btn btn-primary" onclick="reviewTest()">Review Answers</button>
                <button class="btn btn-secondary" onclick="document.getElementById('test-container').classList.add('d-none');">Close</button>
            </div>
        </div>
    `;
    
    container.innerHTML = resultsHTML;
    
    // Add XP based on performance
    const xpGained = Math.round(score * 2);
    gamificationSystem.addXP(xpGained);
}

function reviewTest() {
    const problems = window.testProblems;
    const container = document.getElementById('test-container');
    
    let reviewHTML = `
        <div class="test-review">
            <h3>Test Review</h3>
            <p>Review your answers and learn from your mistakes.</p>
            
            <div class="test-questions mt-4">
                ${problems.map((problem, index) => `
                    <div class="test-question ${problem.userAnswer === problem.correctIndex ? 'correct-question' : 'incorrect-question'}" id="review-question-${index}">
                        <h3>Question ${index + 1} ${problem.userAnswer === problem.correctIndex ? '<span class="badge bg-success">Correct</span>' : '<span class="badge bg-danger">Incorrect</span>'}</h3>
                        <div class="problem-content">
                            <p>${problem.question}</p>
                            ${problem.image ? `<img src="${problem.image}" alt="Problem diagram" class="img-fluid my-3">` : ''}
                        </div>
                        <div class="answer-options">
                            ${problem.options.map((option, optIndex) => `
                                <div class="answer-option ${optIndex === problem.correctIndex ? 'correct' : ''} ${optIndex === problem.userAnswer ? (optIndex === problem.correctIndex ? 'correct' : 'incorrect') : ''}" data-index="${optIndex}">
                                    <span class="option-letter">${String.fromCharCode(65 + optIndex)}.</span>
                                    <span class="option-text">${option}</span>
                                    ${optIndex === problem.correctIndex ? '<span class="badge bg-success ms-2">Correct Answer</span>' : ''}
                                    ${optIndex === problem.userAnswer && optIndex !== problem.correctIndex ? '<span class="badge bg-danger ms-2">Your Answer</span>' : ''}
                                </div>
                            `).join('')}
                        </div>
                        <div class="explanation mt-3">
                            <div class="card">
                                <div class="card-header">
                                    <h5>Explanation</h5>
                                </div>
                                <div class="card-body">
                                    <p>${problem.explanation || "The correct answer is " + String.fromCharCode(65 + problem.correctIndex) + "."}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="mt-5">
                <button class="btn btn-primary" onclick="startTest()">Take Another Test</button>
                <button class="btn btn-secondary" onclick="document.getElementById('test-container').classList.add('d-none');">Close</button>
            </div>
        </div>
    `;
    
    container.innerHTML = reviewHTML;
}

// Utility Functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
