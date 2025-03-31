// Progress Tracking and Scoring System for ACT Quest
// This file implements the tracking of user progress, practice test scoring,
// and performance analytics to help users monitor their improvement

class ProgressTrackingSystem {
    constructor() {
        // Initialize progress data or load from localStorage
        this.progressData = this.loadProgressData() || {
            modules: {
                math: {
                    algebra: { completed: false, score: 0, timeSpent: 0 },
                    functions: { completed: false, score: 0, timeSpent: 0 },
                    geometry: { completed: false, score: 0, timeSpent: 0 },
                    statistics: { completed: false, score: 0, timeSpent: 0 },
                    number: { completed: false, score: 0, timeSpent: 0 }
                },
                english: {
                    grammar: { completed: false, score: 0, timeSpent: 0 },
                    rhetorical: { completed: false, score: 0, timeSpent: 0 }
                },
                reading: {
                    comprehension: { completed: false, score: 0, timeSpent: 0 },
                    passages: { completed: false, score: 0, timeSpent: 0 }
                }
            },
            challenges: {
                math: [],
                english: [],
                reading: []
            },
            practiceTests: {
                math: [],
                english: [],
                reading: [],
                full: []
            },
            weakAreas: {
                math: [],
                english: [],
                reading: []
            },
            strengths: {
                math: [],
                english: [],
                reading: []
            },
            studyTime: {
                total: 0,
                math: 0,
                english: 0,
                reading: 0,
                byDate: {}
            },
            targetScore: 30,
            startingScore: 26,
            predictedScore: 26,
            lastUpdated: new Date().toISOString()
        };
        
        // Define ACT scoring scales
        this.actScales = {
            math: this.generateScoreScale(60, 36),
            english: this.generateScoreScale(75, 36),
            reading: this.generateScoreScale(40, 36)
        };
        
        // Initialize the system
        this.initSystem();
    }
    
    // Initialize the progress tracking system
    initSystem() {
        // Update UI elements
        this.updateProgressUI();
        
        // Add event listeners for progress tracking
        this.addEventListeners();
        
        // Calculate predicted score based on current progress
        this.calculatePredictedScore();
    }
    
    // Load progress data from localStorage
    loadProgressData() {
        const savedData = localStorage.getItem('actQuestProgressData');
        return savedData ? JSON.parse(savedData) : null;
    }
    
    // Save progress data to localStorage
    saveProgressData() {
        localStorage.setItem('actQuestProgressData', JSON.stringify(this.progressData));
    }
    
    // Generate ACT score scale (raw score to scaled score)
    generateScoreScale(maxRawScore, maxScaledScore) {
        const scale = {};
        
        // This is a simplified approximation of the ACT scoring curve
        // In a real application, this would be based on official ACT scoring tables
        for (let i = 0; i <= maxRawScore; i++) {
            const percentage = i / maxRawScore;
            let scaledScore;
            
            if (percentage >= 0.97) scaledScore = 36;
            else if (percentage >= 0.94) scaledScore = 35;
            else if (percentage >= 0.91) scaledScore = 34;
            else if (percentage >= 0.88) scaledScore = 33;
            else if (percentage >= 0.85) scaledScore = 32;
            else if (percentage >= 0.82) scaledScore = 31;
            else if (percentage >= 0.79) scaledScore = 30;
            else if (percentage >= 0.76) scaledScore = 29;
            else if (percentage >= 0.73) scaledScore = 28;
            else if (percentage >= 0.70) scaledScore = 27;
            else if (percentage >= 0.67) scaledScore = 26;
            else if (percentage >= 0.64) scaledScore = 25;
            else if (percentage >= 0.61) scaledScore = 24;
            else if (percentage >= 0.58) scaledScore = 23;
            else if (percentage >= 0.55) scaledScore = 22;
            else if (percentage >= 0.52) scaledScore = 21;
            else if (percentage >= 0.49) scaledScore = 20;
            else if (percentage >= 0.46) scaledScore = 19;
            else if (percentage >= 0.43) scaledScore = 18;
            else if (percentage >= 0.40) scaledScore = 17;
            else if (percentage >= 0.37) scaledScore = 16;
            else if (percentage >= 0.34) scaledScore = 15;
            else if (percentage >= 0.31) scaledScore = 14;
            else if (percentage >= 0.28) scaledScore = 13;
            else if (percentage >= 0.25) scaledScore = 12;
            else if (percentage >= 0.22) scaledScore = 11;
            else if (percentage >= 0.19) scaledScore = 10;
            else if (percentage >= 0.16) scaledScore = 9;
            else if (percentage >= 0.13) scaledScore = 8;
            else if (percentage >= 0.10) scaledScore = 7;
            else if (percentage >= 0.07) scaledScore = 6;
            else if (percentage >= 0.04) scaledScore = 5;
            else if (percentage >= 0.01) scaledScore = 4;
            else if (percentage > 0) scaledScore = 3;
            else scaledScore = 1;
            
            scale[i] = scaledScore;
        }
        
        return scale;
    }
    
    // Update UI elements with progress data
    updateProgressUI() {
        // Update module progress bars
        this.updateModuleProgress();
        
        // Update practice test scores
        this.updateTestScores();
        
        // Update study time statistics
        this.updateStudyTimeStats();
        
        // Update predicted score
        this.updatePredictedScore();
    }
    
    // Update module progress bars
    updateModuleProgress() {
        // Calculate progress percentages for each subject
        const mathProgress = this.calculateSubjectProgress('math');
        const englishProgress = this.calculateSubjectProgress('english');
        const readingProgress = this.calculateSubjectProgress('reading');
        
        // Calculate overall progress
        const overallProgress = (mathProgress + englishProgress + readingProgress) / 3;
        
        // Update progress bars in UI
        const progressBars = document.querySelectorAll('.progress-bars .progress-bar');
        const progressPercentages = document.querySelectorAll('.progress-percentage');
        
        if (progressBars.length >= 4 && progressPercentages.length >= 4) {
            // Math progress
            progressBars[0].style.width = `${mathProgress}%`;
            progressBars[0].setAttribute('aria-valuenow', mathProgress);
            progressPercentages[0].textContent = `${Math.round(mathProgress)}%`;
            
            // English progress
            progressBars[1].style.width = `${englishProgress}%`;
            progressBars[1].setAttribute('aria-valuenow', englishProgress);
            progressPercentages[1].textContent = `${Math.round(englishProgress)}%`;
            
            // Reading progress
            progressBars[2].style.width = `${readingProgress}%`;
            progressBars[2].setAttribute('aria-valuenow', readingProgress);
            progressPercentages[2].textContent = `${Math.round(readingProgress)}%`;
            
            // Overall progress
            progressBars[3].style.width = `${overallProgress}%`;
            progressBars[3].setAttribute('aria-valuenow', overallProgress);
            progressPercentages[3].textContent = `${Math.round(overallProgress)}%`;
        }
    }
    
    // Calculate progress percentage for a subject
    calculateSubjectProgress(subject) {
        const modules = this.progressData.modules[subject];
        let completedCount = 0;
        let totalCount = 0;
        
        for (const module in modules) {
            if (modules[module].completed) {
                completedCount++;
            }
            totalCount++;
        }
        
        return totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    }
    
    // Update practice test scores in UI
    updateTestScores() {
        const testScoreValues = document.querySelectorAll('.test-score-value');
        
        if (testScoreValues.length >= 4) {
            // Get latest test scores
            const mathScore = this.getLatestTestScore('math');
            const englishScore = this.getLatestTestScore('english');
            const readingScore = this.getLatestTestScore('reading');
            
            // Calculate composite score (average of the three scores)
            let compositeScore = '--';
            if (mathScore !== '--' && englishScore !== '--' && readingScore !== '--') {
                compositeScore = Math.round((mathScore + englishScore + readingScore) / 3);
            }
            
            // Update UI
            testScoreValues[0].textContent = mathScore;
            testScoreValues[1].textContent = englishScore;
            testScoreValues[2].textContent = readingScore;
            testScoreValues[3].textContent = compositeScore;
        }
    }
    
    // Get the latest test score for a subject
    getLatestTestScore(subject) {
        const tests = this.progressData.practiceTests[subject];
        if (tests.length > 0) {
            // Sort by date (newest first) and return the score
            tests.sort((a, b) => new Date(b.date) - new Date(a.date));
            return tests[0].scaledScore;
        }
        return '--';
    }
    
    // Update study time statistics
    updateStudyTimeStats() {
        // This would update a study time widget if it exists in the UI
        const studyTimeElement = document.getElementById('study-time-stats');
        if (studyTimeElement) {
            const totalHours = Math.round(this.progressData.studyTime.total / 60);
            const mathHours = Math.round(this.progressData.studyTime.math / 60);
            const englishHours = Math.round(this.progressData.studyTime.english / 60);
            const readingHours = Math.round(this.progressData.studyTime.reading / 60);
            
            studyTimeElement.innerHTML = `
                <div class="study-time-item">
                    <div class="study-time-label">Total Study Time</div>
                    <div class="study-time-value">${totalHours} hours</div>
                </div>
                <div class="study-time-item">
                    <div class="study-time-label">Math</div>
                    <div class="study-time-value">${mathHours} hours</div>
                </div>
                <div class="study-time-item">
                    <div class="study-time-label">English</div>
                    <div class="study-time-value">${englishHours} hours</div>
                </div>
                <div class="study-time-item">
                    <div class="study-time-label">Reading</div>
                    <div class="study-time-value">${readingHours} hours</div>
                </div>
            `;
        }
    }
    
    // Update predicted score in UI
    updatePredictedScore() {
        const predictedScoreElement = document.getElementById('predicted-score');
        if (predictedScoreElement) {
            predictedScoreElement.textContent = this.progressData.predictedScore;
        }
    }
    
    // Add event listeners for progress tracking
    addEventListeners() {
        // Listen for module completion events
        document.addEventListener('moduleCompleted', (event) => {
            const { subject, module, score, timeSpent } = event.detail;
            this.recordModuleCompletion(subject, module, score, timeSpent);
        });
        
        // Listen for challenge completion events
        document.addEventListener('challengeCompleted', (event) => {
            const { subject, challengeId, score, timeSpent } = event.detail;
            this.recordChallengeCompletion(subject, challengeId, score, timeSpent);
        });
        
        // Listen for practice test completion events
        document.addEventListener('testCompleted', (event) => {
            const { subject, rawScore, maxScore, timeSpent, answers, questions } = event.detail;
            this.recordTestCompletion(subject, rawScore, maxScore, timeSpent, answers, questions);
        });
        
        // Listen for study time tracking events
        document.addEventListener('studyTimeTracked', (event) => {
            const { subject, minutes } = event.detail;
            this.recordStudyTime(subject, minutes);
        });
        
        // Add listeners for practice test buttons
        const takePracticeTestBtn = document.getElementById('take-practice-test-btn');
        if (takePracticeTestBtn) {
            takePracticeTestBtn.addEventListener('click', () => this.showPracticeTestOptions());
        }
    }
    
    // Record module completion
    recordModuleCompletion(subject, module, score, timeSpent) {
        // Update module data
        if (this.progressData.modules[subject] && this.progressData.modules[subject][module]) {
            this.progressData.modules[subject][module] = {
                completed: true,
                score: score,
                timeSpent: timeSpent
            };
            
            // Update study time
            this.recordStudyTime(subject, timeSpent);
            
            // Save progress data
            this.saveProgressData();
            
            // Update UI
            this.updateProgressUI();
            
            // Calculate predicted score
            this.calculatePredictedScore();
            
            // Check for achievements
            this.checkModuleAchievements(subject);
        }
    }
    
    // Record challenge completion
    recordChallengeCompletion(subject, challengeId, score, timeSpent) {
        // Add challenge data
        this.progressData.challenges[subject].push({
            id: challengeId,
            score: score,
            timeSpent: timeSpent,
            date: new Date().toISOString()
        });
        
        // Update study time
        this.recordStudyTime(subject, timeSpent);
        
        // Save progress data
        this.saveProgressData();
        
        // Update UI
        this.updateProgressUI();
        
        // Check for achievements
        this.checkChallengeAchievements(subject);
    }
    
    // Record practice test completion
    recordTestCompletion(subject, rawScore, maxScore, timeSpent, answers, questions) {
        // Calculate scaled score
        const percentage = rawScore / maxScore;
        const scaledScore = this.calculateScaledScore(subject, rawScore, maxScore);
        
        // Analyze strengths and weaknesses
        const analysis = this.analyzeTestPerformance(subject, answers, questions);
        
        // Add test data
        this.progressData.practiceTests[subject].push({
            rawScore: rawScore,
            maxScore: maxScore,
            percentage: percentage,
            scaledScore: scaledScore,
            timeSpent: timeSpent,
            date: new Date().toISOString(),
            strengths: analysis.strengths,
            weaknesses: analysis.weaknesses
        });
        
        // Update strengths and weaknesses
        this.updateStrengthsAndWeaknesses(subject, analysis);
        
        // Update study time
        this.recordStudyTime(subject, timeSpent);
        
        // Save progress data
        this.saveProgressData();
        
        // Update UI
        this.updateProgressUI();
        
        // Calculate predicted score
        this.calculatePredictedScore();
        
        // Check for achievements
        this.checkTestAchievements(subject, scaledScore, percentage);
        
        // Show test results
        this.showTestResults(subject, rawScore, maxScore, scaledScore, analysis);
    }
    
    // Calculate scaled score based on raw score
    calculateScaledScore(subject, rawScore, maxScore) {
        if (subject === 'full') {
            // For full tests, calculate composite score
            // This is a simplified approach; real ACT scoring is more complex
            return Math.round(36 * (rawScore / maxScore));
        } else if (this.actScales[subject]) {
            // Use the pre-defined scale for individual sections
            return this.actScales[subject][rawScore] || Math.round(36 * (rawScore / maxScore));
        } else {
            // Fallback to percentage-based calculation
            return Math.round(36 * (rawScore / maxScore));
        }
    }
    
    // Analyze test performance to identify strengths and weaknesses
    analyzeTestPerformance(subject, answers, questions) {
        const strengths = [];
        const weaknesses = [];
        
        // Group questions by topic/category
        const topicPerformance = {};
        
        questions.forEach((question, index) => {
            const topic = question.topic;
            const isCorrect = answers[index] === question.correctAnswer;
            
            if (!topicPerformance[topic]) {
                topicPerformance[topic] = {
                    correct: 0,
                    total: 0
                };
            }
            
            topicPerformance[topic].total++;
            if (isCorrect) {
                topicPerformance[topic].correct++;
            }
        });
        
        // Analyze performance by topic
        for (const topic in topicPerformance) {
            const performance = topicPerformance[topic];
            const percentage = (performance.correct / performance.total) * 100;
            
            if (percentage >= 80) {
                strengths.push({
                    topic: topic,
                    percentage: percentage
                });
            } else if (percentage <= 60) {
                weaknesses.push({
                    topic: topic,
                    percentage: percentage
                });
            }
        }
        
        // Sort strengths and weaknesses by percentage
        strengths.sort((a, b) => b.percentage - a.percentage);
        weaknesses.sort((a, b) => a.percentage - b.percentage);
        
        return { strengths, weaknesses };
    }
    
    // Update overall strengths and weaknesses based on test analysis
    updateStrengthsAndWeaknesses(subject, analysis) {
        // Update strengths
        analysis.strengths.forEach(strength => {
            // Check if this topic is already in strengths
            const existingIndex = this.progressData.strengths[subject].findIndex(s => s.topic === strength.topic);
            
            if (existingIndex >= 0) {
                // Update existing strength
                this.progressData.strengths[subject][existingIndex] = strength;
            } else {
                // Add new strength
                this.progressData.strengths[subject].push(strength);
            }
        });
        
        // Update weaknesses
        analysis.weaknesses.forEach(weakness => {
            // Check if this topic is already in weaknesses
            const existingIndex = this.progressData.weakAreas[subject].findIndex(w => w.topic === weakness.topic);
            
            if (existingIndex >= 0) {
                // Update existing weakness
                this.progressData.weakAreas[subject][existingIndex] = weakness;
            } else {
                // Add new weakness
                this.progressData.weakAreas[subject].push(weakness);
            }
        });
        
        // Remove topics that are no longer weaknesses
        this.progressData.weakAreas[subject] = this.progressData.weakAreas[subject].filter(weakness => {
            return analysis.weaknesses.some(w => w.topic === weakness.topic);
        });
    }
    
    // Record study time
    recordStudyTime(subject, minutes) {
        // Update total study time
        this.progressData.studyTime.total += minutes;
        
        // Update subject study time
        this.progressData.studyTime[subject] += minutes;
        
        // Update study time by date
        const today = new Date().toISOString().split('T')[0];
        if (!this.progressData.studyTime.byDate[today]) {
            this.progressData.studyTime.byDate[today] = 0;
        }
        this.progressData.studyTime.byDate[today] += minutes;
        
        // Save progress data
        this.saveProgressData();
    }
    
    // Calculate predicted score based on current progress
    calculatePredictedScore() {
        // This is a simplified prediction model
        // A real model would be more sophisticated
        
        // Start with the starting score
        let predictedScore = this.progressData.startingScore;
        
        // Calculate progress percentage
        const mathProgress = this.calculateSubjectProgress('math') / 100;
        const englishProgress = this.calculateSubjectProgress('english') / 100;
        const readingProgress = this.calculateSubjectProgress('reading') / 100;
        
        // Get latest test scores
        const mathScore = this.getLatestTestScore('math');
        const englishScore = this.getLatestTestScore('english');
        const readingScore = this.getLatestTestScore('reading');
        
        // Calculate potential improvement based on progress
        const targetImprovement = this.progressData.targetScore - this.progressData.startingScore;
        const progressImprovement = (mathProgress * 0.4 + englishProgress * 0.3 + readingProgress * 0.3) * targetImprovement;
        
        // Adjust prediction based on test scores if available
        if (mathScore !== '--' && englishScore !== '--' && readingScore !== '--') {
            const avgTestScore = (mathScore + englishScore + readingScore) / 3;
            // Blend starting score, progress-based improvement, and test scores
            predictedScore = this.progressData.startingScore * 0.2 + (this.progressData.startingScore + progressImprovement) * 0.3 + avgTestScore * 0.5;
        } else {
            // Without test scores, rely more on progress
            predictedScore = this.progressData.startingScore + progressImprovement;
        }
        
        // Round to nearest integer
        predictedScore = Math.round(predictedScore);
        
        // Ensure prediction is within valid ACT range (1-36)
        predictedScore = Math.max(1, Math.min(36, predictedScore));
        
        // Update predicted score
        this.progressData.predictedScore = predictedScore;
        
        // Save progress data
        this.saveProgressData();
        
        // Update UI
        this.updatePredictedScore();
    }
    
    // Check for module-related achievements
    checkModuleAchievements(subject) {
        // Get gamification system
        const gamification = window.gamificationSystem;
        if (!gamification) return;
        
        // Check for subject-specific achievements
        const modules = this.progressData.modules[subject];
        const completedCount = Object.values(modules).filter(m => m.completed).length;
        
        if (completedCount >= 5 && subject === 'math') {
            gamification.awardAchievement('math_novice');
        } else if (completedCount >= 2 && subject === 'english') {
            gamification.awardAchievement('english_novice');
        } else if (completedCount >= 2 && subject === 'reading') {
            gamification.awardAchievement('reading_novice');
        }
        
        // Check for all modules completed with high scores
        const allCompleted = Object.values(modules).every(m => m.completed);
        const allHighScores = Object.values(modules).every(m => m.score >= 90);
        
        if (allCompleted && allHighScores) {
            if (subject === 'math') {
                gamification.awardAchievement('math_master');
            } else if (subject === 'english') {
                gamification.awardAchievement('english_master');
            } else if (subject === 'reading') {
                gamification.awardAchievement('reading_master');
            }
        }
    }
    
    // Check for challenge-related achievements
    checkChallengeAchievements(subject) {
        // Get gamification system
        const gamification = window.gamificationSystem;
        if (!gamification) return;
        
        // Count high-scoring challenges across all subjects
        const allChallenges = [
            ...this.progressData.challenges.math,
            ...this.progressData.challenges.english,
            ...this.progressData.challenges.reading
        ];
        
        const highScoringChallenges = allChallenges.filter(c => c.score >= 80);
        
        if (highScoringChallenges.length >= 10) {
            gamification.awardAchievement('challenge_champion');
        }
    }
    
    // Check for test-related achievements
    checkTestAchievements(subject, scaledScore, percentage) {
        // Get gamification system
        const gamification = window.gamificationSystem;
        if (!gamification) return;
        
        // Check for high scores
        if (scaledScore >= 30) {
            if (subject === 'math') {
                gamification.awardAchievement('math_adept');
            } else if (subject === 'english') {
                gamification.awardAchievement('english_adept');
            } else if (subject === 'reading') {
                gamification.awardAchievement('reading_adept');
            }
        }
        
        // Check for perfect scores
        if (percentage === 1) {
            gamification.awardAchievement('perfect_score');
        }
    }
    
    // Show practice test options
    showPracticeTestOptions() {
        const modal = document.createElement('div');
        modal.className = 'practice-test-modal';
        modal.innerHTML = `
            <div class="practice-test-content">
                <h2>Practice Test Options</h2>
                <p>Choose a practice test to take:</p>
                
                <div class="test-options">
                    <div class="test-option">
                        <h3>Math Section Test</h3>
                        <p>45 questions in 60 minutes</p>
                        <button class="btn btn-primary start-test-btn" data-subject="math">Start Math Test</button>
                    </div>
                    
                    <div class="test-option">
                        <h3>English Section Test</h3>
                        <p>75 questions in 45 minutes</p>
                        <button class="btn btn-primary start-test-btn" data-subject="english">Start English Test</button>
                    </div>
                    
                    <div class="test-option">
                        <h3>Reading Section Test</h3>
                        <p>40 questions in 35 minutes</p>
                        <button class="btn btn-primary start-test-btn" data-subject="reading">Start Reading Test</button>
                    </div>
                    
                    <div class="test-option">
                        <h3>Full ACT Practice Test</h3>
                        <p>English, Math, and Reading sections (3 hours)</p>
                        <button class="btn btn-primary start-test-btn" data-subject="full">Start Full Test</button>
                    </div>
                </div>
                
                <button class="btn btn-secondary close-modal-btn">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for test buttons
        const testButtons = modal.querySelectorAll('.start-test-btn');
        testButtons.forEach(button => {
            button.addEventListener('click', () => {
                const subject = button.getAttribute('data-subject');
                this.startPracticeTest(subject);
                document.body.removeChild(modal);
            });
        });
        
        // Add event listener for close button
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    // Start a practice test
    startPracticeTest(subject) {
        // In a real application, this would navigate to the test page
        // For this demo, we'll simulate a test completion
        if (subject === 'math') {
            window.location.href = 'modules/math/practice-test.html';
        } else if (subject === 'english') {
            window.location.href = 'modules/english/practice-test.html';
        } else if (subject === 'reading') {
            window.location.href = 'modules/reading/practice-test.html';
        } else if (subject === 'full') {
            window.location.href = 'full-practice-test.html';
        }
    }
    
    // Show test results
    showTestResults(subject, rawScore, maxScore, scaledScore, analysis) {
        const modal = document.createElement('div');
        modal.className = 'test-results-modal';
        
        // Calculate percentage
        const percentage = (rawScore / maxScore) * 100;
        
        // Determine performance level
        let performanceLevel;
        if (scaledScore >= 30) {
            performanceLevel = 'Excellent';
        } else if (scaledScore >= 24) {
            performanceLevel = 'Good';
        } else if (scaledScore >= 18) {
            performanceLevel = 'Average';
        } else {
            performanceLevel = 'Needs Improvement';
        }
        
        // Format subject name
        const subjectName = subject.charAt(0).toUpperCase() + subject.slice(1);
        
        modal.innerHTML = `
            <div class="test-results-content">
                <h2>${subjectName} Test Results</h2>
                
                <div class="test-score-overview">
                    <div class="score-circle">
                        <div class="score-number">${scaledScore}</div>
                        <div class="score-label">ACT Scale</div>
                    </div>
                    
                    <div class="score-details">
                        <div class="score-item">
                            <div class="score-label">Raw Score</div>
                            <div class="score-value">${rawScore} / ${maxScore}</div>
                        </div>
                        <div class="score-item">
                            <div class="score-label">Percentage</div>
                            <div class="score-value">${Math.round(percentage)}%</div>
                        </div>
                        <div class="score-item">
                            <div class="score-label">Performance Level</div>
                            <div class="score-value">${performanceLevel}</div>
                        </div>
                    </div>
                </div>
                
                <div class="test-analysis">
                    <h3>Performance Analysis</h3>
                    
                    <div class="analysis-section">
                        <h4>Strengths</h4>
                        ${analysis.strengths.length > 0 ? `
                            <ul>
                                ${analysis.strengths.map(strength => `
                                    <li>${strength.topic} (${Math.round(strength.percentage)}% correct)</li>
                                `).join('')}
                            </ul>
                        ` : '<p>No clear strengths identified in this test.</p>'}
                    </div>
                    
                    <div class="analysis-section">
                        <h4>Areas for Improvement</h4>
                        ${analysis.weaknesses.length > 0 ? `
                            <ul>
                                ${analysis.weaknesses.map(weakness => `
                                    <li>${weakness.topic} (${Math.round(weakness.percentage)}% correct)</li>
                                `).join('')}
                            </ul>
                        ` : '<p>No clear weaknesses identified in this test.</p>'}
                    </div>
                </div>
                
                <div class="recommendations">
                    <h3>Recommended Next Steps</h3>
                    <ul>
                        ${this.generateRecommendations(subject, analysis).map(rec => `
                            <li>${rec}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <button class="btn btn-primary close-modal-btn">Continue</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener for close button
        modal.querySelector('.close-modal-btn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
    
    // Generate personalized recommendations based on test performance
    generateRecommendations(subject, analysis) {
        const recommendations = [];
        
        // Add recommendations based on weaknesses
        if (analysis.weaknesses.length > 0) {
            analysis.weaknesses.forEach(weakness => {
                if (subject === 'math') {
                    if (weakness.topic.includes('Algebra')) {
                        recommendations.push('Review the Algebra module and focus on practice problems related to equations and inequalities.');
                    } else if (weakness.topic.includes('Geometry')) {
                        recommendations.push('Spend more time on the Geometry module, particularly on coordinate geometry and triangles.');
                    } else if (weakness.topic.includes('Function')) {
                        recommendations.push('Practice more with the Functions module, focusing on function notation and transformations.');
                    } else if (weakness.topic.includes('Statistics')) {
                        recommendations.push('Review the Statistics & Probability module, with emphasis on data analysis and probability concepts.');
                    } else if (weakness.topic.includes('Number')) {
                        recommendations.push('Work through the Number & Quantity module again, focusing on properties of numbers and complex numbers.');
                    }
                } else if (subject === 'english') {
                    if (weakness.topic.includes('Punctuation')) {
                        recommendations.push('Review punctuation rules in the Grammar & Usage module, particularly commas and semicolons.');
                    } else if (weakness.topic.includes('Grammar')) {
                        recommendations.push('Focus on subject-verb agreement and pronoun usage in the Grammar & Usage module.');
                    } else if (weakness.topic.includes('Sentence')) {
                        recommendations.push('Practice identifying and correcting sentence structure issues in the Grammar & Usage module.');
                    } else if (weakness.topic.includes('Rhetorical')) {
                        recommendations.push('Work through the Rhetorical Skills module again, focusing on organization and style.');
                    }
                } else if (subject === 'reading') {
                    if (weakness.topic.includes('Main Idea')) {
                        recommendations.push('Practice identifying main ideas and themes in the Reading Comprehension module.');
                    } else if (weakness.topic.includes('Detail')) {
                        recommendations.push('Focus on locating specific details in passages in the Reading Comprehension module.');
                    } else if (weakness.topic.includes('Inference')) {
                        recommendations.push('Work on making inferences from text in the Reading Comprehension module.');
                    } else if (weakness.topic.includes('Author')) {
                        recommendations.push('Practice identifying author purpose and tone in the Reading Comprehension module.');
                    } else if (weakness.topic.includes('Vocabulary')) {
                        recommendations.push('Focus on understanding vocabulary in context in the Reading Comprehension module.');
                    }
                }
            });
        }
        
        // Add general recommendations
        if (recommendations.length === 0) {
            if (subject === 'math') {
                recommendations.push('Continue practicing with timed math challenges to improve speed and accuracy.');
                recommendations.push('Take another math practice test in a week to measure improvement.');
            } else if (subject === 'english') {
                recommendations.push('Continue practicing with timed English challenges to improve speed and accuracy.');
                recommendations.push('Take another English practice test in a week to measure improvement.');
            } else if (subject === 'reading') {
                recommendations.push('Continue practicing with timed reading challenges to improve speed and comprehension.');
                recommendations.push('Take another reading practice test in a week to measure improvement.');
            }
        }
        
        // Add time management recommendation if needed
        recommendations.push('Work on time management by practicing with timed sections regularly.');
        
        // Add full test recommendation
        recommendations.push('Take a full practice test to simulate the actual ACT experience.');
        
        return recommendations;
    }
}

// Initialize the progress tracking system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.progressTrackingSystem = new ProgressTrackingSystem();
});
