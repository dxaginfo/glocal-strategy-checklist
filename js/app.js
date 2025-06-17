/**
 * Glocal Strategy Checklist - Main Application
 * 
 * This file contains the core functionality of the assessment tool.
 */

// Application state
const appState = {
    currentScreen: 'welcome',
    currentSection: 0,
    currentQuestionIndex: 0,
    answers: {},
    organizationInfo: {
        name: '',
        industry: '',
        marketPresence: ''
    },
    results: {
        overall: 3, // Default to neutral
        sections: {}
    }
};

// DOM Elements
const elements = {
    screens: {
        welcome: document.getElementById('welcomeScreen'),
        assessment: document.getElementById('assessmentScreen'),
        results: document.getElementById('resultsScreen')
    },
    welcome: {
        startBtn: document.getElementById('startAssessmentBtn'),
        orgNameInput: document.getElementById('organizationName'),
        industrySelect: document.getElementById('industry'),
        marketPresenceSelect: document.getElementById('marketPresence')
    },
    assessment: {
        sectionTitle: document.getElementById('sectionTitle'),
        progressBadge: document.getElementById('progressBadge'),
        progressBar: document.getElementById('progressBar'),
        questionContainer: document.getElementById('questionContainer'),
        prevBtn: document.getElementById('prevQuestionBtn'),
        nextBtn: document.getElementById('nextQuestionBtn')
    },
    results: {
        overallBalanceIndicator: document.getElementById('overallBalanceIndicator'),
        sectionScoresContainer: document.getElementById('sectionScoresContainer'),
        assessmentSummary: document.getElementById('assessmentSummary'),
        recommendationsContainer: document.getElementById('recommendationsContainer'),
        retakeBtn: document.getElementById('retakeBtn'),
        downloadBtn: document.getElementById('downloadReportBtn')
    },
    modals: {
        saveProgressBtn: document.getElementById('saveProgressBtn'),
        loadProgressBtn: document.getElementById('loadProgressBtn'),
        progressIdInput: document.getElementById('progressId'),
        copyProgressIdBtn: document.getElementById('copyProgressIdBtn'),
        loadProgressIdInput: document.getElementById('loadProgressId'),
        loadProgressByIdBtn: document.getElementById('loadProgressByIdBtn'),
        savedAssessmentsContainer: document.getElementById('savedAssessmentsContainer')
    }
};

// Bootstrap modals
const saveProgressModal = new bootstrap.Modal(document.getElementById('saveProgressModal'));
const loadProgressModal = new bootstrap.Modal(document.getElementById('loadProgressModal'));

// Application initialization
function initializeApp() {
    // Set up event listeners
    elements.welcome.startBtn.addEventListener('click', handleStartAssessment);
    elements.assessment.prevBtn.addEventListener('click', handlePreviousQuestion);
    elements.assessment.nextBtn.addEventListener('click', handleNextQuestion);
    elements.results.retakeBtn.addEventListener('click', handleRetakeAssessment);
    elements.results.downloadBtn.addEventListener('click', handleDownloadReport);
    
    // Save/load functionality
    elements.modals.saveProgressBtn.addEventListener('click', handleSaveProgress);
    elements.modals.loadProgressBtn.addEventListener('click', handleLoadProgressModal);
    elements.modals.copyProgressIdBtn.addEventListener('click', handleCopyProgressId);
    elements.modals.loadProgressByIdBtn.addEventListener('click', handleLoadProgressById);
    
    // Initial screen setup
    showScreen(appState.currentScreen);
}

// Screen navigation
function showScreen(screenName) {
    // Hide all screens
    Object.values(elements.screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the requested screen
    elements.screens[screenName].classList.add('active');
    appState.currentScreen = screenName;
}

// Start assessment handler
function handleStartAssessment() {
    // Validate form
    const orgName = elements.welcome.orgNameInput.value.trim();
    const industry = elements.welcome.industrySelect.value;
    const marketPresence = elements.welcome.marketPresenceSelect.value;
    
    if (!orgName || !industry || !marketPresence) {
        alert('Please fill in all fields before starting the assessment.');
        return;
    }
    
    // Save organization info
    appState.organizationInfo = {
        name: orgName,
        industry: industry,
        marketPresence: marketPresence
    };
    
    // Start assessment
    appState.currentSection = 0;
    appState.currentQuestionIndex = 0;
    loadQuestion();
    showScreen('assessment');
}

// Load the current question
function loadQuestion() {
    // Get current section
    const currentSection = ASSESSMENT_SECTIONS[appState.currentSection];
    elements.assessment.sectionTitle.textContent = currentSection.title;
    
    // Update progress indicators
    elements.assessment.progressBadge.textContent = `Section ${appState.currentSection + 1} of ${ASSESSMENT_SECTIONS.length}`;
    const totalQuestions = ASSESSMENT_QUESTIONS.length;
    const questionsAnswered = Object.keys(appState.answers).length;
    const progressPercentage = (questionsAnswered / totalQuestions) * 100;
    elements.assessment.progressBar.style.width = `${progressPercentage}%`;
    
    // Get questions for the current section
    const sectionQuestions = ASSESSMENT_QUESTIONS.filter(q => q.section === currentSection.id);
    
    // If we've gone past the available questions in this section, move to next section
    if (appState.currentQuestionIndex >= sectionQuestions.length) {
        if (appState.currentSection < ASSESSMENT_SECTIONS.length - 1) {
            appState.currentSection++;
            appState.currentQuestionIndex = 0;
            loadQuestion();
            return;
        } else {
            // We've completed the assessment
            calculateResults();
            displayResults();
            showScreen('results');
            return;
        }
    }
    
    // Get the current question
    const currentQuestion = sectionQuestions[appState.currentQuestionIndex];
    
    // Build the question HTML
    let questionHTML = `
        <div class="question-item">
            <h4 class="question-text">${currentQuestion.text}</h4>
            ${currentQuestion.tooltip ? `<p class="text-muted small">${currentQuestion.tooltip}</p>` : ''}
            <div class="question-options">
    `;
    
    // Add options
    currentQuestion.options.forEach((option, index) => {
        const isChecked = appState.answers[currentQuestion.id] === option.value ? 'checked' : '';
        questionHTML += `
            <div class="option-item">
                <input type="radio" name="question_${currentQuestion.id}" id="option_${currentQuestion.id}_${index}" 
                    value="${option.value}" ${isChecked}>
                <label for="option_${currentQuestion.id}_${index}">${option.text}</label>
            </div>
        `;
    });
    
    questionHTML += `
            </div>
        </div>
    `;
    
    // Update the question container
    elements.assessment.questionContainer.innerHTML = questionHTML;
    
    // Update button states
    elements.assessment.prevBtn.disabled = (appState.currentSection === 0 && appState.currentQuestionIndex === 0);
}

// Handle next question button
function handleNextQuestion() {
    // Get current section and question
    const currentSection = ASSESSMENT_SECTIONS[appState.currentSection];
    const sectionQuestions = ASSESSMENT_QUESTIONS.filter(q => q.section === currentSection.id);
    const currentQuestion = sectionQuestions[appState.currentQuestionIndex];
    
    // Check if user has answered the current question
    const selectedOption = document.querySelector(`input[name="question_${currentQuestion.id}"]:checked`);
    
    if (!selectedOption) {
        alert('Please select an answer before continuing.');
        return;
    }
    
    // Save the answer
    appState.answers[currentQuestion.id] = parseInt(selectedOption.value);
    
    // Move to next question
    appState.currentQuestionIndex++;
    loadQuestion();
}

// Handle previous question button
function handlePreviousQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
    } else if (appState.currentSection > 0) {
        appState.currentSection--;
        const previousSectionQuestions = ASSESSMENT_QUESTIONS.filter(
            q => q.section === ASSESSMENT_SECTIONS[appState.currentSection].id
        );
        appState.currentQuestionIndex = previousSectionQuestions.length - 1;
    }
    
    loadQuestion();
}

// Calculate assessment results
function calculateResults() {
    // Initialize section scores
    const sectionScores = {};
    ASSESSMENT_SECTIONS.forEach(section => {
        sectionScores[section.id] = {
            total: 0,
            count: 0,
            average: 3 // Default to neutral
        };
    });
    
    // Calculate scores by section
    Object.entries(appState.answers).forEach(([questionId, value]) => {
        const question = ASSESSMENT_QUESTIONS.find(q => q.id === questionId);
        if (question) {
            sectionScores[question.section].total += value;
            sectionScores[question.section].count++;
        }
    });
    
    // Calculate averages
    let overallTotal = 0;
    let overallCount = 0;
    
    Object.keys(sectionScores).forEach(sectionId => {
        const section = sectionScores[sectionId];
        if (section.count > 0) {
            section.average = section.total / section.count;
            overallTotal += section.total;
            overallCount += section.count;
        }
    });
    
    // Calculate overall score
    const overallAverage = overallCount > 0 ? overallTotal / overallCount : 3;
    
    // Save results
    appState.results = {
        overall: overallAverage,
        sections: sectionScores
    };
}

// Display assessment results
function displayResults() {
    // Set overall balance indicator position
    const overallScore = appState.results.overall;
    const overallPosition = ((overallScore - 1) / 4) * 100; // Convert 1-5 scale to 0-100%
    elements.results.overallBalanceIndicator.style.left = `${overallPosition}%`;
    elements.results.overallBalanceIndicator.classList.add('pulse');
    
    // Build section scores HTML
    let sectionScoresHTML = '';
    
    ASSESSMENT_SECTIONS.forEach(section => {
        const sectionResult = appState.results.sections[section.id];
        const sectionAverage = sectionResult.average;
        const sectionPosition = ((sectionAverage - 1) / 4) * 100; // Convert 1-5 scale to 0-100%
        
        sectionScoresHTML += `
            <div class="section-score">
                <div class="section-score-label">
                    <span>${section.title}</span>
                    <span class="small text-muted">
                        ${sectionAverage < 2.5 ? 'More Global' : sectionAverage > 3.5 ? 'More Local' : 'Balanced'}
                    </span>
                </div>
                <div class="section-score-bar">
                    <div class="section-score-fill"></div>
                    <div class="section-score-indicator" style="left: ${sectionPosition}%"></div>
                </div>
            </div>
        `;
    });
    
    elements.results.sectionScoresContainer.innerHTML = sectionScoresHTML;
    
    // Build assessment summary
    let summaryHTML = '';
    const summaryPoints = generateSummaryPoints();
    
    summaryPoints.forEach(point => {
        summaryHTML += `<li>${point}</li>`;
    });
    
    elements.results.assessmentSummary.innerHTML = summaryHTML;
    
    // Build recommendations
    let recommendationsHTML = '';
    const recommendations = generateRecommendations();
    
    recommendations.forEach(rec => {
        recommendationsHTML += `
            <div class="col-md-6 mb-3">
                <div class="recommendation-card ${rec.type}">
                    <h5>${rec.title}</h5>
                    <p>${rec.text}</p>
                </div>
            </div>
        `;
    });
    
    elements.results.recommendationsContainer.innerHTML = recommendationsHTML;
}

// Generate summary points based on results
function generateSummaryPoints() {
    const overallScore = appState.results.overall;
    const points = [];
    
    // Overall approach point
    if (overallScore < 2.5) {
        points.push("Your strategy is predominantly global, prioritizing standardization across markets.");
    } else if (overallScore > 3.5) {
        points.push("Your strategy is predominantly local, prioritizing adaptation to specific markets.");
    } else {
        points.push("Your strategy is well-balanced between global standardization and local adaptation.");
    }
    
    // Most global/local section point
    let mostGlobalSection = null;
    let mostLocalSection = null;
    let lowestScore = 5;
    let highestScore = 1;
    
    Object.entries(appState.results.sections).forEach(([sectionId, result]) => {
        if (result.average < lowestScore) {
            lowestScore = result.average;
            mostGlobalSection = sectionId;
        }
        
        if (result.average > highestScore) {
            highestScore = result.average;
            mostLocalSection = sectionId;
        }
    });
    
    if (mostGlobalSection) {
        const sectionName = ASSESSMENT_SECTIONS.find(s => s.id === mostGlobalSection).title;
        points.push(`Your most standardized area is ${sectionName} (${lowestScore.toFixed(1)}/5).`);
    }
    
    if (mostLocalSection) {
        const sectionName = ASSESSMENT_SECTIONS.find(s => s.id === mostLocalSection).title;
        points.push(`Your most localized area is ${sectionName} (${highestScore.toFixed(1)}/5).`);
    }
    
    // Balance consistency point
    const scores = Object.values(appState.results.sections).map(s => s.average);
    const maxDifference = Math.max(...scores) - Math.min(...scores);
    
    if (maxDifference > 2) {
        points.push("There's significant variation in your global-local balance across different business functions.");
    } else if (maxDifference < 1) {
        points.push("Your global-local approach is highly consistent across all business functions.");
    }
    
    return points;
}

// Generate recommendations based on results
function generateRecommendations() {
    const recommendations = [];
    
    // Process each section
    Object.entries(appState.results.sections).forEach(([sectionId, result]) => {
        const sectionInfo = ASSESSMENT_SECTIONS.find(s => s.id === sectionId);
        let recType = 'balanced';
        
        if (result.average < 2.5) {
            recType = 'global';
        } else if (result.average > 3.5) {
            recType = 'local';
        }
        
        // Only add recommendations for non-balanced sections or for balanced if overall score is extreme
        if (recType !== 'balanced' || (Math.abs(appState.results.overall - 3) > 1)) {
            recommendations.push({
                title: sectionInfo.title,
                text: RECOMMENDATIONS[recType][sectionId],
                type: recType
            });
        }
    });
    
    // If we have too few recommendations, add a general one
    if (recommendations.length < 2) {
        recommendations.push({
            title: "Strategic Balance",
            text: "Maintain your balanced approach while continuously monitoring market changes that might require adjustments to your global-local strategy.",
            type: "balanced"
        });
    }
    
    return recommendations;
}

// Handle retake assessment button
function handleRetakeAssessment() {
    // Reset application state
    appState.currentSection = 0;
    appState.currentQuestionIndex = 0;
    appState.answers = {};
    
    // Return to welcome screen
    showScreen('welcome');
}

// Handle download report button
function handleDownloadReport() {
    alert('Report download functionality will be implemented in a future update.');
    // This would typically use jsPDF to generate a downloadable PDF report
}

// Save progress to local storage
function handleSaveProgress() {
    // Generate a unique ID for this assessment
    const progressId = 'glocal_' + Date.now().toString(36);
    
    // Create the data object to save
    const saveData = {
        timestamp: new Date().toISOString(),
        organizationInfo: appState.organizationInfo,
        answers: appState.answers,
        currentSection: appState.currentSection,
        currentQuestionIndex: appState.currentQuestionIndex
    };
    
    // Get existing saved assessments or initialize new array
    let savedAssessments = JSON.parse(localStorage.getItem('glocalSavedAssessments') || '[]');
    
    // Add this assessment
    savedAssessments.push({
        id: progressId,
        data: saveData
    });
    
    // Save to local storage
    localStorage.setItem('glocalSavedAssessments', JSON.stringify(savedAssessments));
    
    // Show the save progress modal
    elements.modals.progressIdInput.value = progressId;
    saveProgressModal.show();
}

// Handle copy progress ID button
function handleCopyProgressId() {
    elements.modals.progressIdInput.select();
    document.execCommand('copy');
    
    // Provide visual feedback
    elements.modals.copyProgressIdBtn.innerHTML = '<i class="bi bi-check"></i>';
    setTimeout(() => {
        elements.modals.copyProgressIdBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
    }, 1500);
}

// Show load progress modal
function handleLoadProgressModal() {
    // Get saved assessments
    const savedAssessments = JSON.parse(localStorage.getItem('glocalSavedAssessments') || '[]');
    
    if (savedAssessments.length === 0) {
        elements.modals.savedAssessmentsContainer.innerHTML = '<p>No saved assessments found on this device.</p>';
    } else {
        let html = '<div class="list-group mb-3">';
        
        savedAssessments.forEach(saved => {
            const date = new Date(saved.data.timestamp).toLocaleString();
            const orgName = saved.data.organizationInfo.name;
            const progress = Object.keys(saved.data.answers).length / ASSESSMENT_QUESTIONS.length * 100;
            
            html += `
                <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    data-progress-id="${saved.id}">
                    <div>
                        <strong>${orgName}</strong>
                        <br>
                        <small class="text-muted">${date}</small>
                    </div>
                    <span class="badge bg-primary rounded-pill">${Math.round(progress)}% complete</span>
                </button>
            `;
        });
        
        html += '</div>';
        elements.modals.savedAssessmentsContainer.innerHTML = html;
        
        // Add event listeners to the buttons
        document.querySelectorAll('[data-progress-id]').forEach(button => {
            button.addEventListener('click', function() {
                const progressId = this.getAttribute('data-progress-id');
                loadSavedProgress(progressId);
                loadProgressModal.hide();
            });
        });
    }
    
    loadProgressModal.show();
}

// Handle load progress by ID button
function handleLoadProgressById() {
    const progressId = elements.modals.loadProgressIdInput.value.trim();
    
    if (progressId) {
        loadSavedProgress(progressId);
        loadProgressModal.hide();
    } else {
        alert('Please enter a valid assessment ID.');
    }
}

// Load saved progress
function loadSavedProgress(progressId) {
    // Get saved assessments
    const savedAssessments = JSON.parse(localStorage.getItem('glocalSavedAssessments') || '[]');
    const savedAssessment = savedAssessments.find(sa => sa.id === progressId);
    
    if (!savedAssessment) {
        alert('Assessment not found. Please check the ID and try again.');
        return;
    }
    
    // Restore state
    appState.organizationInfo = savedAssessment.data.organizationInfo;
    appState.answers = savedAssessment.data.answers;
    appState.currentSection = savedAssessment.data.currentSection;
    appState.currentQuestionIndex = savedAssessment.data.currentQuestionIndex;
    
    // Update form fields
    elements.welcome.orgNameInput.value = appState.organizationInfo.name;
    elements.welcome.industrySelect.value = appState.organizationInfo.industry;
    elements.welcome.marketPresenceSelect.value = appState.organizationInfo.marketPresence;
    
    // Load the current question and show assessment screen
    loadQuestion();
    showScreen('assessment');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);