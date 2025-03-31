// JavaScript for Geometry Module

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
    console.log("Geometry practice problems initialized");
}

// Load practice problems based on difficulty
function loadPracticeProblems(difficulty) {
    const container = document.getElementById('practice-problems-container');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Loading practice problems...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate problems based on difficulty
        let problems = generateGeometryProblems(difficulty, 5);
        
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

// Generate geometry problems based on difficulty
function generateGeometryProblems(difficulty, count) {
    // Sample problems for demonstration
    const easyProblems = [
        {
            question: "In a right triangle, if one leg is 6 and the hypotenuse is 10, what is the length of the other leg?",
            options: ["6", "8", "9", "12"],
            correctIndex: 1,
            explanation: "Using the Pythagorean theorem: a² + b² = c²<br>6² + b² = 10²<br>36 + b² = 100<br>b² = 64<br>b = 8"
        },
        {
            question: "What is the area of a circle with radius 5?",
            options: ["25π", "10π", "15π", "20π"],
            correctIndex: 0,
            explanation: "Area of a circle = πr²<br>Area = π × 5² = 25π"
        },
        {
            question: "In a triangle, two angles measure 45° and 60°. What is the measure of the third angle?",
            options: ["45°", "60°", "75°", "90°"],
            correctIndex: 2,
            explanation: "The sum of angles in a triangle is 180°.<br>45° + 60° + x = 180°<br>105° + x = 180°<br>x = 75°"
        },
        {
            question: "What is the perimeter of a rectangle with length 8 and width 5?",
            options: ["13", "20", "26", "40"],
            correctIndex: 2,
            explanation: "Perimeter of a rectangle = 2(length + width)<br>Perimeter = 2(8 + 5) = 2(13) = 26"
        },
        {
            question: "Two angles are complementary. If one angle is 37°, what is the measure of the other angle?",
            options: ["43°", "53°", "63°", "143°"],
            correctIndex: 1,
            explanation: "Complementary angles sum to 90°.<br>37° + x = 90°<br>x = 53°"
        }
    ];
    
    const mediumProblems = [
        {
            question: "A rectangle has a perimeter of 30 and a length of 8. What is its area?",
            options: ["35", "42", "56", "64"],
            correctIndex: 2,
            explanation: "Perimeter = 2(length + width)<br>30 = 2(8 + width)<br>30 = 16 + 2(width)<br>14 = 2(width)<br>width = 7<br>Area = length × width = 8 × 7 = 56"
        },
        {
            question: "In a 30°-60°-90° triangle, if the shortest side is 5, what is the length of the hypotenuse?",
            options: ["5√3", "10", "10√3", "15"],
            correctIndex: 1,
            explanation: "In a 30°-60°-90° triangle, if the shortest side (opposite to the 30° angle) is x, then the hypotenuse is 2x.<br>Given the shortest side is 5, the hypotenuse is 2 × 5 = 10."
        },
        {
            question: "What is the distance between the points (2, 3) and (6, 7)?",
            options: ["4", "5", "8", "√40"],
            correctIndex: 3,
            explanation: "Using the distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]<br>d = √[(6 - 2)² + (7 - 3)²]<br>d = √[16 + 16]<br>d = √32 = 4√2 = √40"
        },
        {
            question: "A circle has an area of 36π. What is its circumference?",
            options: ["6π", "12π", "18π", "24π"],
            correctIndex: 1,
            explanation: "Area = πr²<br>36π = πr²<br>r² = 36<br>r = 6<br>Circumference = 2πr = 2π × 6 = 12π"
        },
        {
            question: "In a parallelogram, if one angle is 40°, what are the measures of the other three angles?",
            options: ["40°, 140°, 40°, 140°", "40°, 40°, 140°, 140°", "40°, 140°, 140°, 40°", "140°, 140°, 140°, 140°"],
            correctIndex: 0,
            explanation: "In a parallelogram, opposite angles are equal and adjacent angles are supplementary (sum to 180°).<br>If one angle is 40°, then the opposite angle is also 40°.<br>The adjacent angles are 180° - 40° = 140°.<br>So the angles are 40°, 140°, 40°, 140°."
        }
    ];
    
    const hardProblems = [
        {
            question: "A cylinder has a volume of 54π cubic inches and a height of 6 inches. What is the radius of the cylinder?",
            options: ["3 inches", "6 inches", "9 inches", "12 inches"],
            correctIndex: 0,
            explanation: "Volume of a cylinder = πr²h<br>54π = πr² × 6<br>9 = r²<br>r = 3 inches"
        },
        {
            question: "In a circle with center O, chord AB has length 8 and is 3 units away from the center. What is the radius of the circle?",
            options: ["4", "5", "6", "7"],
            correctIndex: 1,
            explanation: "Let r be the radius of the circle and d be the distance from the center to the chord.<br>Using the Pythagorean theorem: r² = (chord/2)² + d²<br>r² = 4² + 3² = 16 + 9 = 25<br>r = 5"
        },
        {
            question: "A regular hexagon has a perimeter of 24. What is the length of each side?",
            options: ["3", "4", "6", "8"],
            correctIndex: 1,
            explanation: "A regular hexagon has 6 equal sides.<br>Perimeter = 6 × side length<br>24 = 6 × side length<br>Side length = 4"
        },
        {
            question: "The coordinates of the vertices of a triangle are (0, 0), (4, 0), and (2, 3). What is the area of the triangle?",
            options: ["6", "8", "10", "12"],
            correctIndex: 0,
            explanation: "Using the formula for the area of a triangle with vertices (x₁, y₁), (x₂, y₂), and (x₃, y₃):<br>Area = (1/2)|x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|<br>Area = (1/2)|0(0 - 3) + 4(3 - 0) + 2(0 - 0)|<br>Area = (1/2)|0 + 12 + 0| = 6"
        },
        {
            question: "A sphere has a surface area of 36π square units. What is its volume?",
            options: ["12π", "24π", "36π", "48π"],
            correctIndex: 1,
            explanation: "Surface area of a sphere = 4πr²<br>36π = 4πr²<br>9 = r²<br>r = 3<br>Volume of a sphere = (4/3)πr³ = (4/3)π × 3³ = (4/3)π × 27 = 36π"
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
    console.log("Geometry challenges initialized");
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
            case 'triangles':
                problems = generateGeometryProblems('easy', 5);
                timeLimit = 300; // 5 minutes
                title = "Triangle Challenge";
                break;
            case 'circles':
                problems = generateGeometryProblems('medium', 5);
                timeLimit = 420; // 7 minutes
                title = "Circle Challenge";
                break;
            case '3d':
                problems = generateGeometryProblems('hard', 5);
                timeLimit = 600; // 10 minutes
                title = "3D Geometry Challenge";
                break;
            default:
                problems = generateGeometryProblems('easy', 5);
                timeLimit = 300;
                title = "Geometry Challenge";
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
            const baseXP = type === 'triangles' ? 100 : (type === 'circles' ? 150 : 200);
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
                            <div class="reward-value">Geometry Badge</div>
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
    console.log("Geometry test initialized");
}

function startTest() {
    const container = document.getElementById('test-container');
    container.classList.remove('d-none');
    
    // Show loading indicator
    container.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2">Preparing test...</p></div>';
    
    // Simulate loading delay
    setTimeout(() => {
        // Generate test questions (mix of difficulties)
        const easyProblems = generateGeometryProblems('easy', 3);
        const mediumProblems = generateGeometryProblems('medium', 4);
        const hardProblems = generateGeometryProblems('hard', 3);
        
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
        'Triangles': { correct: 0, total: 0 },
        'Circles': { correct: 0, total: 0 },
        'Quadrilaterals': { correct: 0, total: 0 },
        'Coordinate Geometry': { correct: 0, total: 0 },
        '3D Geometry': { correct: 0, total: 0 }
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
                                <li>Complete the ${weaknesses.length > 0 ? weaknesses[0].category : 'Geometry'} Challenge</li>
                                <li>Move on to the Statistics & Probability module</li>
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
