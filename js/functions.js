// JavaScript for Functions Module

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
    console.log("Functions practice problems initialized");
}

// Load practice problems based on difficulty
function loadPracticeProblems(difficulty) {
    const container = document.getElementById('practice-problems-container');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Loading practice problems...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate problems based on difficulty
        let problems = generateFunctionProblems(difficulty, 5);
        
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

// Generate function problems based on difficulty
function generateFunctionProblems(difficulty, count) {
    // Sample problems for demonstration
    const easyProblems = [
        {
            question: "If f(x) = 2x + 3, find f(4).",
            options: ["f(4) = 8", "f(4) = 11", "f(4) = 14", "f(4) = 7"],
            correctIndex: 1,
            explanation: "f(4) = 2(4) + 3 = 8 + 3 = 11"
        },
        {
            question: "If g(x) = x² - 5, find g(-3).",
            options: ["g(-3) = -14", "g(-3) = 4", "g(-3) = -4", "g(-3) = 14"],
            correctIndex: 1,
            explanation: "g(-3) = (-3)² - 5 = 9 - 5 = 4"
        },
        {
            question: "Find the domain of f(x) = √x.",
            options: ["All real numbers", "x ≥ 0", "x > 0", "x ≤ 0"],
            correctIndex: 1,
            explanation: "The domain of f(x) = √x is all values of x where x ≥ 0, since we cannot take the square root of a negative number in the real number system."
        },
        {
            question: "If h(x) = 3x - 7, find the value of x such that h(x) = 14.",
            options: ["x = 3", "x = 7", "x = 5", "x = 21"],
            correctIndex: 2,
            explanation: "h(x) = 14<br>3x - 7 = 14<br>3x = 21<br>x = 7"
        },
        {
            question: "Which of the following is the graph of f(x) = x + 2?",
            options: ["A line with slope 1 and y-intercept 2", "A line with slope 2 and y-intercept 1", "A line with slope -1 and y-intercept 2", "A line with slope 1 and y-intercept -2"],
            correctIndex: 0,
            explanation: "The function f(x) = x + 2 is in the form f(x) = mx + b, where m = 1 is the slope and b = 2 is the y-intercept."
        }
    ];
    
    const mediumProblems = [
        {
            question: "If f(x) = x² - 4x + 7, find f(f(2)).",
            options: ["f(f(2)) = 3", "f(f(2)) = 7", "f(f(2)) = 11", "f(f(2)) = 15"],
            correctIndex: 2,
            explanation: "First, find f(2):<br>f(2) = 2² - 4(2) + 7 = 4 - 8 + 7 = 3<br>Then, find f(f(2)) = f(3):<br>f(3) = 3² - 4(3) + 7 = 9 - 12 + 7 = 4"
        },
        {
            question: "Find the range of the function f(x) = -2x² + 8x - 3.",
            options: ["All real numbers", "y ≤ 5", "y ≥ 5", "y ≤ -3"],
            correctIndex: 1,
            explanation: "This is a quadratic function with a negative leading coefficient, so it opens downward and has a maximum value.<br>To find the maximum value, we need to find the vertex.<br>The x-coordinate of the vertex is x = -b/(2a) = -8/(-4) = 2.<br>The y-coordinate is f(2) = -2(2)² + 8(2) - 3 = -8 + 16 - 3 = 5.<br>Since the parabola opens downward, the range is y ≤ 5."
        },
        {
            question: "If f(x) = 3x - 2 and g(x) = x² + 1, find (f ∘ g)(2).",
            options: ["(f ∘ g)(2) = 13", "f(g(2)) = 13", "f(g(2)) = 15", "f(g(2)) = 11"],
            correctIndex: 0,
            explanation: "(f ∘ g)(2) = f(g(2))<br>g(2) = 2² + 1 = 5<br>f(g(2)) = f(5) = 3(5) - 2 = 15 - 2 = 13"
        },
        {
            question: "Find the domain of the function f(x) = 1/(x² - 4).",
            options: ["All real numbers except x = 2 and x = -2", "All real numbers except x = 0", "All real numbers", "All real numbers except x = 4"],
            correctIndex: 0,
            explanation: "The domain of f(x) = 1/(x² - 4) includes all values of x where the denominator is not zero.<br>x² - 4 = 0<br>x² = 4<br>x = ±2<br>Therefore, the domain is all real numbers except x = 2 and x = -2."
        },
        {
            question: "If f(x) = |x - 3|, what is the value of f(-1)?",
            options: ["f(-1) = -4", "f(-1) = 4", "f(-1) = 2", "f(-1) = -2"],
            correctIndex: 1,
            explanation: "f(-1) = |(-1) - 3| = |-4| = 4"
        }
    ];
    
    const hardProblems = [
        {
            question: "If f(x) = x³ - 3x² + 2x - 1 and g(x) = 2x + 3, find (f ∘ g)(1).",
            options: ["(f ∘ g)(1) = 19", "f(g(1)) = 29", "f(g(1)) = 39", "f(g(1)) = 49"],
            correctIndex: 2,
            explanation: "(f ∘ g)(1) = f(g(1))<br>g(1) = 2(1) + 3 = 5<br>f(g(1)) = f(5) = 5³ - 3(5)² + 2(5) - 1 = 125 - 75 + 10 - 1 = 59"
        },
        {
            question: "Find all values of x such that f(x) = g(x) if f(x) = x² - 4 and g(x) = 2x - 5.",
            options: ["x = -1 or x = 5", "x = 1 or x = 5", "x = -1 or x = -5", "x = 1 or x = -5"],
            correctIndex: 0,
            explanation: "Set f(x) = g(x):<br>x² - 4 = 2x - 5<br>x² - 2x - 4 + 5 = 0<br>x² - 2x + 1 = 0<br>Using the quadratic formula: x = (-(-2) ± √((-2)² - 4(1)(1)))/(2(1)) = (2 ± √(4 - 4))/2 = (2 ± 0)/2 = 1<br>So x = 1 is the only solution."
        },
        {
            question: "If f(x) = e^x and g(x) = ln(x), find (f ∘ g)(e).",
            options: ["(f ∘ g)(e) = e", "f(g(e)) = 1", "f(g(e)) = e²", "f(g(e)) = ln(e)"],
            correctIndex: 0,
            explanation: "(f ∘ g)(e) = f(g(e))<br>g(e) = ln(e) = 1<br>f(g(e)) = f(1) = e¹ = e"
        },
        {
            question: "Find the inverse function of f(x) = (3x - 2)/(x + 1).",
            options: ["f⁻¹(x) = (x + 2)/(3 - x)", "f⁻¹(x) = (2 + x)/(3 - x)", "f⁻¹(x) = (2 - x)/(3 + x)", "f⁻¹(x) = (x - 2)/(3 - x)"],
            correctIndex: 1,
            explanation: "To find the inverse, swap x and y, then solve for y:<br>y = (3x - 2)/(x + 1)<br>x = (3y - 2)/(y + 1)<br>x(y + 1) = 3y - 2<br>xy + x = 3y - 2<br>xy - 3y = -2 - x<br>y(x - 3) = -2 - x<br>y = (-2 - x)/(x - 3) = (2 + x)/(3 - x)"
        },
        {
            question: "If f(x) = x² - 3x + 2 and g(x) = √x, find the domain of (f ∘ g)(x).",
            options: ["x ≥ 0", "x ≥ 2", "x ≥ 3", "x > 0"],
            correctIndex: 0,
            explanation: "(f ∘ g)(x) = f(g(x)) = f(√x) = (√x)² - 3(√x) + 2 = x - 3√x + 2<br>The domain of g(x) = √x is x ≥ 0.<br>Since f(x) is a polynomial, its domain is all real numbers.<br>Therefore, the domain of (f ∘ g)(x) is the same as the domain of g(x), which is x ≥ 0."
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
    console.log("Functions challenges initialized");
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
            case 'notation':
                problems = generateFunctionProblems('easy', 5);
                timeLimit = 300; // 5 minutes
                title = "Function Notation Challenge";
                break;
            case 'transformations':
                problems = generateFunctionProblems('medium', 5);
                timeLimit = 420; // 7 minutes
                title = "Function Transformations Challenge";
                break;
            case 'operations':
                problems = generateFunctionProblems('hard', 5);
                timeLimit = 600; // 10 minutes
                title = "Function Operations Challenge";
                break;
            default:
                problems = generateFunctionProblems('easy', 5);
                timeLimit = 300;
                title = "Functions Challenge";
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
            const baseXP = type === 'notation' ? 100 : (type === 'transformations' ? 150 : 200);
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
                            <div class="reward-value">Functions Badge</div>
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
    console.log("Functions test initialized");
}

function startTest() {
    const container = document.getElementById('test-container');
    container.classList.remove('d-none');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Preparing test...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate test questions (mix of difficulties)
        const easyProblems = generateFunctionProblems('easy', 3);
        const mediumProblems = generateFunctionProblems('medium', 4);
        const hardProblems = generateFunctionProblems('hard', 3);
        
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
        'Function Notation': { correct: 0, total: 0 },
        'Domain and Range': { correct: 0, total: 0 },
        'Function Transformations': { correct: 0, total: 0 },
        'Function Operations': { correct: 0, total: 0 },
        'Exponential and Logarithmic Functions': { correct: 0, total: 0 }
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
                                <li>Complete the ${weaknesses.length > 0 ? weaknesses[0].category : 'Functions'} Challenge</li>
                                <li>Move on to the Geometry module</li>
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
