// JavaScript for Algebra Module

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
    console.log("Algebra practice problems initialized");
}

// Load practice problems based on difficulty
function loadPracticeProblems(difficulty) {
    const container = document.getElementById('practice-problems-container');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Loading practice problems...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate problems based on difficulty
        let problems = generateAlgebraProblems(difficulty, 5);
        
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

// Generate algebra problems based on difficulty
function generateAlgebraProblems(difficulty, count) {
    // Sample problems for demonstration
    const easyProblems = [
        {
            question: "Solve for x: 2x + 3 = 7",
            options: ["x = 2", "x = 3", "x = 4", "x = 5"],
            correctIndex: 0,
            explanation: "2x + 3 = 7<br>2x = 7 - 3<br>2x = 4<br>x = 2"
        },
        {
            question: "Find the slope of the line passing through the points (2, 3) and (4, 7).",
            options: ["m = 1", "m = 2", "m = 3", "m = 4"],
            correctIndex: 1,
            explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (7 - 3)/(4 - 2) = 4/2 = 2"
        },
        {
            question: "Solve the inequality: x + 5 > 9",
            options: ["x > 4", "x > 14", "x < 4", "x < 14"],
            correctIndex: 0,
            explanation: "x + 5 > 9<br>x > 9 - 5<br>x > 4"
        },
        {
            question: "If y = 3x - 2, what is the value of y when x = 4?",
            options: ["y = 10", "y = 12", "y = 14", "y = 16"],
            correctIndex: 0,
            explanation: "y = 3x - 2<br>y = 3(4) - 2<br>y = 12 - 2<br>y = 10"
        },
        {
            question: "Solve for x: |x - 3| = 5",
            options: ["x = -2 or x = 8", "x = -2 or x = 2", "x = 3 or x = 8", "x = -8 or x = 8"],
            correctIndex: 0,
            explanation: "|x - 3| = 5<br>Either (x - 3) = 5 or (x - 3) = -5<br>x = 8 or x = -2"
        }
    ];
    
    const mediumProblems = [
        {
            question: "Solve the quadratic equation: x² - 5x + 6 = 0",
            options: ["x = 2 or x = 3", "x = -2 or x = -3", "x = 2 or x = -3", "x = -2 or x = 3"],
            correctIndex: 0,
            explanation: "x² - 5x + 6 = 0<br>Using the quadratic formula: x = (-b ± √(b² - 4ac))/(2a)<br>x = (5 ± √(25 - 24))/2<br>x = (5 ± √1)/2<br>x = (5 ± 1)/2<br>x = 3 or x = 2"
        },
        {
            question: "Solve the system of equations:<br>2x + y = 5<br>x - y = 1",
            options: ["x = 2, y = 1", "x = 3, y = -1", "x = 1, y = 3", "x = 2, y = 3"],
            correctIndex: 0,
            explanation: "From the second equation: x - y = 1, so y = x - 1<br>Substitute into the first equation:<br>2x + (x - 1) = 5<br>3x - 1 = 5<br>3x = 6<br>x = 2<br>Then y = x - 1 = 2 - 1 = 1"
        },
        {
            question: "Find the equation of a line with slope 3 that passes through the point (2, -1).",
            options: ["y = 3x - 7", "y = 3x + 5", "y = -3x + 5", "y = -3x - 7"],
            correctIndex: 0,
            explanation: "Using point-slope form: y - y₁ = m(x - x₁)<br>y - (-1) = 3(x - 2)<br>y + 1 = 3x - 6<br>y = 3x - 7"
        },
        {
            question: "Solve for x: 2(x - 3) - 4(x + 1) = 3x - 7",
            options: ["x = -2", "x = -1", "x = 1", "x = 2"],
            correctIndex: 1,
            explanation: "2(x - 3) - 4(x + 1) = 3x - 7<br>2x - 6 - 4x - 4 = 3x - 7<br>-2x - 10 = 3x - 7<br>-5x = 3<br>x = -3/5 = -0.6"
        },
        {
            question: "Solve the inequality: 2x - 3 < 5x + 6",
            options: ["x > -3", "x < -3", "x > 3", "x < 3"],
            correctIndex: 0,
            explanation: "2x - 3 < 5x + 6<br>-3x < 9<br>x > -3"
        }
    ];
    
    const hardProblems = [
        {
            question: "Solve the quadratic inequality: x² - 4x - 5 > 0",
            options: ["x < -1 or x > 5", "x > -1 and x < 5", "-1 < x < 5", "x < -5 or x > 1"],
            correctIndex: 0,
            explanation: "First, find the roots of x² - 4x - 5 = 0<br>Using the quadratic formula: x = (4 ± √(16 + 20))/2 = (4 ± √36)/2 = (4 ± 6)/2<br>x = 5 or x = -1<br>Since the coefficient of x² is positive, the parabola opens upward<br>Therefore, the inequality is satisfied when x < -1 or x > 5"
        },
        {
            question: "If f(x) = x² - 3x + 2 and g(x) = 2x - 1, find all values of x where f(x) = g(x).",
            options: ["x = 1 or x = 2", "x = -1 or x = 2", "x = 0 or x = 3", "x = -2 or x = 3"],
            correctIndex: 0,
            explanation: "Set f(x) = g(x):<br>x² - 3x + 2 = 2x - 1<br>x² - 5x + 3 = 0<br>Using the quadratic formula: x = (5 ± √(25 - 12))/2 = (5 ± √13)/2<br>x = (5 + √13)/2 ≈ 4.3 or x = (5 - √13)/2 ≈ 0.7"
        },
        {
            question: "Solve the system of equations:<br>2x - 3y = 4<br>3x + 2y = -1",
            options: ["x = 1, y = -1", "x = -1, y = -1", "x = 1, y = 1", "x = -1, y = 1"],
            correctIndex: 1,
            explanation: "Multiply the first equation by 2: 4x - 6y = 8<br>Multiply the second equation by 3: 9x + 6y = -3<br>Add the equations: 13x = 5<br>x = 5/13<br>Substitute back: 2(5/13) - 3y = 4<br>10/13 - 3y = 4<br>-3y = 4 - 10/13<br>-3y = 42/13<br>y = -14/13"
        },
        {
            question: "Find all values of k such that the equation 2x² + kx + 8 = 0 has exactly one solution.",
            options: ["k = 8", "k = -8", "k = ±8", "k = ±4√2"],
            correctIndex: 2,
            explanation: "For a quadratic equation to have exactly one solution, its discriminant must be zero:<br>b² - 4ac = 0<br>k² - 4(2)(8) = 0<br>k² - 64 = 0<br>k² = 64<br>k = ±8"
        },
        {
            question: "Solve for x: |2x - 3| + |x + 1| = 5",
            options: ["x = -3 or x = 2", "x = -2 or x = 3", "x = -1 or x = 2", "x = 0 or x = 3"],
            correctIndex: 2,
            explanation: "We need to consider different cases based on the signs of the expressions inside the absolute value symbols.<br><br>Case 1: If 2x - 3 ≥ 0 and x + 1 ≥ 0, then x ≥ 3/2 and x ≥ -1<br>So x ≥ 3/2, and we have (2x - 3) + (x + 1) = 5<br>3x - 2 = 5<br>3x = 7<br>x = 7/3<br><br>Case 2: If 2x - 3 < 0 and x + 1 ≥ 0, then x < 3/2 and x ≥ -1<br>So -1 ≤ x < 3/2, and we have -(2x - 3) + (x + 1) = 5<br>-2x + 3 + x + 1 = 5<br>-x + 4 = 5<br>-x = 1<br>x = -1<br><br>Case 3: If 2x - 3 ≥ 0 and x + 1 < 0, then x ≥ 3/2 and x < -1<br>This is impossible since we can't have x ≥ 3/2 and x < -1 simultaneously.<br><br>Case 4: If 2x - 3 < 0 and x + 1 < 0, then x < 3/2 and x < -1<br>So x < -1, and we have -(2x - 3) + -(x + 1) = 5<br>-2x + 3 - x - 1 = 5<br>-3x + 2 = 5<br>-3x = 3<br>x = -1<br><br>Checking our solutions: x = -1 and x = 7/3<br>For x = -1: |2(-1) - 3| + |(-1) + 1| = |-5| + |0| = 5 + 0 = 5 ✓<br>For x = 7/3: |2(7/3) - 3| + |(7/3) + 1| = |14/3 - 3| + |7/3 + 1| = |14/3 - 9/3| + |7/3 + 3/3| = |5/3| + |10/3| = 5/3 + 10/3 = 15/3 = 5 ✓<br><br>Therefore, x = -1 or x = 7/3."
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
    console.log("Algebra challenges initialized");
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
            case 'linear':
                problems = generateAlgebraProblems('easy', 5);
                timeLimit = 300; // 5 minutes
                title = "Linear Equations Challenge";
                break;
            case 'quadratic':
                problems = generateAlgebraProblems('medium', 5);
                timeLimit = 420; // 7 minutes
                title = "Quadratic Equations Challenge";
                break;
            case 'systems':
                problems = generateAlgebraProblems('hard', 5);
                timeLimit = 600; // 10 minutes
                title = "Systems of Equations Challenge";
                break;
            default:
                problems = generateAlgebraProblems('easy', 5);
                timeLimit = 300;
                title = "Algebra Challenge";
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
            const baseXP = type === 'linear' ? 100 : (type === 'quadratic' ? 150 : 200);
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
                            <div class="reward-value">Algebra Badge</div>
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
    console.log("Algebra test initialized");
}

function startTest() {
    const container = document.getElementById('test-container');
    container.classList.remove('d-none');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Preparing test...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate test questions (mix of difficulties)
        const easyProblems = generateAlgebraProblems('easy', 3);
        const mediumProblems = generateAlgebraProblems('medium', 4);
        const hardProblems = generateAlgebraProblems('hard', 3);
        
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
        'Linear Equations': { correct: 0, total: 0 },
        'Quadratic Equations': { correct: 0, total: 0 },
        'Systems of Equations': { correct: 0, total: 0 },
        'Inequalities': { correct: 0, total: 0 },
        'Absolute Value': { correct: 0, total: 0 }
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
                                <li>Complete the ${weaknesses.length > 0 ? weaknesses[0].category : 'Algebra'} Challenge</li>
                                <li>Move on to the Functions module</li>
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
