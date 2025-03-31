// Math Modules Common JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize common math module functionality
    initMathModules();
});

// Initialize math modules
function initMathModules() {
    console.log("Math modules initialized");
    
    // Set up common event listeners and functionality
    setupMathNavigation();
    
    // Initialize MathJax if not already done
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise();
    }
}

// Set up navigation between math modules
function setupMathNavigation() {
    // Add event listeners for module navigation
    const moduleLinks = document.querySelectorAll('.module-nav-link');
    
    moduleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModule = this.getAttribute('data-target');
            navigateToModule(targetModule);
        });
    });
}

// Navigate to a specific math module
function navigateToModule(moduleName) {
    const currentPath = window.location.pathname;
    const baseUrl = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
    window.location.href = baseUrl + moduleName + '.html';
}

// Common math problem generation functions
const mathProblemGenerators = {
    // Generate a random integer between min and max (inclusive)
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Generate a random fraction
    randomFraction: function() {
        const numerator = this.randomInt(1, 10);
        const denominator = this.randomInt(2, 10);
        return { numerator, denominator };
    },
    
    // Generate a linear equation problem
    generateLinearEquation: function(difficulty) {
        let a, b, c;
        
        switch(difficulty) {
            case 'easy':
                a = this.randomInt(1, 5);
                b = this.randomInt(1, 10);
                c = a * this.randomInt(1, 5) + b;
                break;
            case 'medium':
                a = this.randomInt(2, 8);
                b = this.randomInt(-10, 10);
                c = a * this.randomInt(-5, 5) + b;
                break;
            case 'hard':
                a = this.randomInt(-10, 10);
                while (a === 0) a = this.randomInt(-10, 10);
                b = this.randomInt(-15, 15);
                c = a * this.randomInt(-10, 10) + b;
                break;
        }
        
        // Create the equation: ax + b = c
        const equation = `${a}x + ${b} = ${c}`;
        const solution = (c - b) / a;
        
        return {
            equation,
            solution
        };
    },
    
    // Generate a quadratic equation problem
    generateQuadraticEquation: function(difficulty) {
        let a, b, c;
        let root1, root2;
        
        switch(difficulty) {
            case 'easy':
                // Create a quadratic with integer roots
                root1 = this.randomInt(-5, 5);
                root2 = this.randomInt(-5, 5);
                a = 1;
                b = -(root1 + root2);
                c = root1 * root2;
                break;
            case 'medium':
                // Create a quadratic with at least one integer root
                a = this.randomInt(1, 3);
                root1 = this.randomInt(-5, 5);
                root2 = this.randomInt(-5, 5);
                b = -a * (root1 + root2);
                c = a * root1 * root2;
                break;
            case 'hard':
                // Create a more complex quadratic
                a = this.randomInt(1, 5);
                b = this.randomInt(-10, 10);
                c = this.randomInt(-15, 15);
                
                // Calculate the discriminant
                const discriminant = b * b - 4 * a * c;
                
                // If no real roots, adjust to ensure at least one real root
                if (discriminant < 0) {
                    c = b * b / (4 * a); // Makes discriminant = 0
                }
                
                // Calculate roots
                const sqrtDiscriminant = Math.sqrt(b * b - 4 * a * c);
                root1 = (-b + sqrtDiscriminant) / (2 * a);
                root2 = (-b - sqrtDiscriminant) / (2 * a);
                break;
        }
        
        // Create the equation: ax² + bx + c = 0
        const equation = `${a}x² + ${b}x + ${c} = 0`;
        
        return {
            equation,
            roots: [root1, root2],
            a, b, c
        };
    },
    
    // Generate a system of equations problem
    generateSystemOfEquations: function(difficulty) {
        let a1, b1, c1, a2, b2, c2;
        let x, y;
        
        switch(difficulty) {
            case 'easy':
                // Create a system with integer solutions
                x = this.randomInt(-5, 5);
                y = this.randomInt(-5, 5);
                
                a1 = this.randomInt(1, 3);
                b1 = this.randomInt(1, 3);
                c1 = a1 * x + b1 * y;
                
                a2 = this.randomInt(1, 3);
                b2 = this.randomInt(1, 3);
                // Ensure the equations are independent
                while (a1 * b2 === a2 * b1) {
                    a2 = this.randomInt(1, 3);
                    b2 = this.randomInt(1, 3);
                }
                c2 = a2 * x + b2 * y;
                break;
            case 'medium':
                // Create a system with integer or simple fraction solutions
                x = this.randomInt(-5, 5);
                y = this.randomInt(-5, 5);
                
                a1 = this.randomInt(-5, 5);
                while (a1 === 0) a1 = this.randomInt(-5, 5);
                
                b1 = this.randomInt(-5, 5);
                while (b1 === 0) b1 = this.randomInt(-5, 5);
                
                c1 = a1 * x + b1 * y;
                
                a2 = this.randomInt(-5, 5);
                while (a2 === 0) a2 = this.randomInt(-5, 5);
                
                b2 = this.randomInt(-5, 5);
                while (b2 === 0 || a1 * b2 === a2 * b1) b2 = this.randomInt(-5, 5);
                
                c2 = a2 * x + b2 * y;
                break;
            case 'hard':
                // Create a more complex system
                // First, decide on the solution
                const denominator = this.randomInt(2, 5);
                x = this.randomInt(-10, 10) / denominator;
                y = this.randomInt(-10, 10) / denominator;
                
                a1 = this.randomInt(-8, 8);
                while (a1 === 0) a1 = this.randomInt(-8, 8);
                
                b1 = this.randomInt(-8, 8);
                while (b1 === 0) b1 = this.randomInt(-8, 8);
                
                c1 = a1 * x + b1 * y;
                
                a2 = this.randomInt(-8, 8);
                while (a2 === 0) a2 = this.randomInt(-8, 8);
                
                b2 = this.randomInt(-8, 8);
                while (b2 === 0 || a1 * b2 === a2 * b1) b2 = this.randomInt(-8, 8);
                
                c2 = a2 * x + b2 * y;
                break;
        }
        
        // Create the system of equations
        const equation1 = `${a1}x + ${b1}y = ${c1}`;
        const equation2 = `${a2}x + ${b2}y = ${c2}`;
        
        return {
            equations: [equation1, equation2],
            solution: { x, y },
            coefficients: { a1, b1, c1, a2, b2, c2 }
        };
    },
    
    // Generate an inequality problem
    generateInequality: function(difficulty) {
        let a, b, c;
        let solution;
        
        switch(difficulty) {
            case 'easy':
                a = this.randomInt(1, 5);
                b = this.randomInt(1, 10);
                c = a * this.randomInt(1, 5) + b;
                
                // Create the inequality: ax + b < c or ax + b > c
                const isLessThan = Math.random() < 0.5;
                const inequalitySymbol = isLessThan ? '<' : '>';
                const inequality = `${a}x + ${b} ${inequalitySymbol} ${c}`;
                
                // Calculate the solution
                const boundaryValue = (c - b) / a;
                solution = isLessThan ? `x < ${boundaryValue}` : `x > ${boundaryValue}`;
                break;
            case 'medium':
                a = this.randomInt(-5, 5);
                while (a === 0) a = this.randomInt(-5, 5);
                
                b = this.randomInt(-10, 10);
                c = this.randomInt(-15, 15);
                
                // Create the inequality: ax + b ≤ c or ax + b ≥ c
                const isLessThanOrEqual = Math.random() < 0.5;
                const mediumInequalitySymbol = isLessThanOrEqual ? '≤' : '≥';
                const mediumInequality = `${a}x + ${b} ${mediumInequalitySymbol} ${c}`;
                
                // Calculate the solution
                const mediumBoundaryValue = (c - b) / a;
                // If a is negative, the inequality direction flips
                const adjustedSymbol = (a < 0) ? (isLessThanOrEqual ? '≥' : '≤') : mediumInequalitySymbol;
                solution = `x ${adjustedSymbol} ${mediumBoundaryValue}`;
                break;
            case 'hard':
                // Create a compound inequality
                const lowerBound = this.randomInt(-10, 0);
                const upperBound = this.randomInt(1, 10);
                
                // Create the inequality: lowerBound < ax + b < upperBound
                a = this.randomInt(1, 5);
                b = this.randomInt(-10, 10);
                
                const hardInequality = `${lowerBound} < ${a}x + ${b} < ${upperBound}`;
                
                // Calculate the solution
                const lowerSolution = (lowerBound - b) / a;
                const upperSolution = (upperBound - b) / a;
                solution = `${lowerSolution} < x < ${upperSolution}`;
                break;
        }
        
        return {
            inequality,
            solution
        };
    }
};

// Common math problem checking functions
const mathProblemCheckers = {
    // Check if two numbers are approximately equal (for floating point comparisons)
    approxEqual: function(a, b, epsilon = 0.0001) {
        return Math.abs(a - b) < epsilon;
    },
    
    // Check if a linear equation solution is correct
    checkLinearEquation: function(equation, userAnswer, correctAnswer) {
        // Parse the user's answer
        const userX = parseFloat(userAnswer);
        
        // Check if the user's answer is correct
        return this.approxEqual(userX, correctAnswer);
    },
    
    // Check if a quadratic equation solution is correct
    checkQuadraticEquation: function(equation, userAnswers, correctRoots) {
        // Parse the user's answers
        const userRoots = userAnswers.map(ans => parseFloat(ans)).sort();
        const sortedCorrectRoots = [...correctRoots].sort();
        
        // Check if the user's answers match the correct roots
        if (userRoots.length !== sortedCorrectRoots.length) {
            return false;
        }
        
        for (let i = 0; i < userRoots.length; i++) {
            if (!this.approxEqual(userRoots[i], sortedCorrectRoots[i])) {
                return false;
            }
        }
        
        return true;
    },
    
    // Check if a system of equations solution is correct
    checkSystemOfEquations: function(equations, userAnswer, correctSolution) {
        // Parse the user's answer
        const userX = parseFloat(userAnswer.x);
        const userY = parseFloat(userAnswer.y);
        
        // Check if the user's answer is correct
        return this.approxEqual(userX, correctSolution.x) && 
               this.approxEqual(userY, correctSolution.y);
    }
};

// Export the utility functions
window.mathProblemGenerators = mathProblemGenerators;
window.mathProblemCheckers = mathProblemCheckers;
