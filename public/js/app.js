// API Base URL
const API_URL = '/api';

// State management
let currentUser = null;
let authToken = null;
let allProjects = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProjects();
});

// Check if user is authenticated
function checkAuth() {
    authToken = localStorage.getItem('authToken');
    currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (authToken && currentUser) {
        showUserNav();
    }
}

// Show user navigation
function showUserNav() {
    document.getElementById('navActions').style.display = 'none';
    document.getElementById('navUser').style.display = 'flex';
}

// Show login modal
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

// Show register modal
function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            closeModal('loginModal');
            showUserNav();
            showNotification('Login successful!', 'success');
        } else {
            showNotification(data.error || 'Login failed', 'error');
        }
    } catch (error) {
        showNotification('Login failed: ' + error.message, 'error');
    }
}

// Handle register
async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, role })
        });
        
        const data = await response.json();
        
        if (data.success) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            closeModal('registerModal');
            showUserNav();
            showNotification('Account created successfully!', 'success');
        } else {
            showNotification(data.error || 'Registration failed', 'error');
        }
    } catch (error) {
        showNotification('Registration failed: ' + error.message, 'error');
    }
}

// Logout
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    authToken = null;
    currentUser = null;
    
    document.getElementById('navActions').style.display = 'flex';
    document.getElementById('navUser').style.display = 'none';
    hideDashboard();
    showNotification('Logged out successfully', 'success');
}

// Load projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        
        if (data.success) {
            allProjects = data.projects;
            displayProjects(allProjects);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        // Show sample projects if API fails
        displaySampleProjects();
    }
}

// Display projects
function displayProjects(projects) {
    const projectsList = document.getElementById('projectsList');
    
    if (projects.length === 0) {
        projectsList.innerHTML = '<p class="text-center">No projects found. Be the first to post one!</p>';
        return;
    }
    
    projectsList.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div>
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-status status-${project.status}">${project.status}</span>
                </div>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-meta">
                <span><i class="fas fa-dollar-sign"></i> $${project.budget.min} - $${project.budget.max}</span>
                <span><i class="fas fa-clock"></i> ${formatDuration(project.duration)}</span>
                <span><i class="fas fa-tag"></i> ${formatCategory(project.category)}</span>
            </div>
            ${project.requiredSkills && project.requiredSkills.length > 0 ? `
                <div class="project-skills">
                    ${project.requiredSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            ` : ''}
            <button class="btn btn-primary" onclick="viewProject('${project.id}')">View Details</button>
        </div>
    `).join('');
}

// Display sample projects
function displaySampleProjects() {
    const sampleProjects = [
        {
            id: 'sample1',
            title: 'Build E-commerce Website with React',
            description: 'Looking for an experienced React developer to build a modern e-commerce platform with payment integration.',
            category: 'web-development',
            budget: { min: 2000, max: 5000 },
            duration: '1-3-months',
            status: 'open',
            requiredSkills: ['React', 'Node.js', 'MongoDB', 'Stripe']
        },
        {
            id: 'sample2',
            title: 'Mobile App UI/UX Design',
            description: 'Need a talented designer to create a modern, user-friendly mobile app design for iOS and Android.',
            category: 'design',
            budget: { min: 1000, max: 2500 },
            duration: '2-4-weeks',
            status: 'open',
            requiredSkills: ['Figma', 'UI/UX', 'Mobile Design']
        },
        {
            id: 'sample3',
            title: 'Content Writing for Tech Blog',
            description: 'Seeking experienced tech writers to create engaging articles about AI, machine learning, and software development.',
            category: 'writing',
            budget: { min: 500, max: 1500 },
            duration: '1-3-months',
            status: 'open',
            requiredSkills: ['Technical Writing', 'SEO', 'AI/ML']
        }
    ];
    
    displayProjects(sampleProjects);
}

// Filter projects
function filterProjects() {
    const category = document.getElementById('categoryFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = allProjects;
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (search) {
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(search) || 
            p.description.toLowerCase().includes(search)
        );
    }
    
    displayProjects(filtered);
}

// View project
function viewProject(projectId) {
    if (!authToken) {
        showNotification('Please login to view project details', 'error');
        showLoginModal();
        return;
    }
    
    showNotification('Project details feature coming soon!', 'info');
}

// Show dashboard
function showDashboard() {
    if (!authToken) {
        showNotification('Please login first', 'error');
        showLoginModal();
        return;
    }
    
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('features').style.display = 'none';
    document.getElementById('how-it-works').style.display = 'none';
    document.getElementById('projects').style.display = 'none';
    window.scrollTo(0, 0);
}

// Hide dashboard
function hideDashboard() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    document.getElementById('features').style.display = 'block';
    document.getElementById('how-it-works').style.display = 'block';
    document.getElementById('projects').style.display = 'block';
    window.scrollTo(0, 0);
}

// Handle create project
async function handleCreateProject(event) {
    event.preventDefault();
    
    const projectData = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        category: document.getElementById('projectCategory').value,
        budget: {
            min: parseInt(document.getElementById('budgetMin').value),
            max: parseInt(document.getElementById('budgetMax').value)
        },
        duration: document.getElementById('projectDuration').value,
        requiredSkills: []
    };
    
    try {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(projectData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Project created successfully!', 'success');
            document.getElementById('createProjectForm').reset();
            loadProjects();
        } else {
            showNotification(data.error || 'Failed to create project', 'error');
        }
    } catch (error) {
        showNotification('Failed to create project: ' + error.message, 'error');
    }
}

// Get AI matches
async function getAIMatches() {
    try {
        const response = await fetch(`${API_URL}/ai/match-projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                skills: currentUser.skills || ['JavaScript', 'React', 'Node.js']
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultsDiv = document.getElementById('aiResults');
            resultsDiv.innerHTML = '<h4>AI-Matched Projects:</h4>' +
                data.matches.map(match => `
                    <div style="padding: 15px; background: #f9fafb; border-radius: 6px; margin: 10px 0;">
                        <strong>${match.title}</strong><br>
                        <small>Match Score: ${match.matchScore}%</small><br>
                        <small>${match.reason}</small>
                    </div>
                `).join('');
        }
    } catch (error) {
        showNotification('AI matching failed: ' + error.message, 'error');
    }
}

// Generate AI proposal
async function generateAIProposal() {
    try {
        const response = await fetch(`${API_URL}/ai/generate-proposal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                projectTitle: 'Sample Project',
                projectDescription: 'Build a modern web application',
                userSkills: currentUser.skills || ['JavaScript', 'React']
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultsDiv = document.getElementById('aiResults');
            resultsDiv.innerHTML = `
                <h4>AI-Generated Proposal:</h4>
                <div style="padding: 15px; background: #f9fafb; border-radius: 6px; margin: 10px 0; white-space: pre-wrap;">
                    ${data.proposal.coverLetter}
                </div>
                <small>Confidence: ${data.proposal.confidence}%</small>
            `;
        }
    } catch (error) {
        showNotification('AI proposal generation failed: ' + error.message, 'error');
    }
}

// Analyze skills
async function analyzeSkills() {
    try {
        const response = await fetch(`${API_URL}/ai/analyze-skills`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                currentSkills: currentUser.skills || ['JavaScript', 'React']
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const resultsDiv = document.getElementById('aiResults');
            resultsDiv.innerHTML = `
                <h4>Skills Analysis:</h4>
                <div style="padding: 15px; background: #f9fafb; border-radius: 6px; margin: 10px 0;">
                    <strong>Current Level:</strong> ${data.analysis.currentLevel}<br><br>
                    <strong>Top Recommendations:</strong>
                    ${data.analysis.recommendations.slice(0, 3).map(rec => `
                        <div style="margin: 10px 0; padding: 10px; background: white; border-radius: 4px;">
                            <strong>${rec.skill}</strong> (${rec.difficulty})<br>
                            <small>${rec.reason}</small><br>
                            <small>Learning time: ${rec.estimatedLearningTime}</small>
                        </div>
                    `).join('')}
                    <br>
                    <strong>Potential Earnings Increase:</strong> ${data.analysis.marketDemand.potentialEarningsIncrease}
                </div>
            `;
        }
    } catch (error) {
        showNotification('Skills analysis failed: ' + error.message, 'error');
    }
}

// Utility functions
function formatDuration(duration) {
    return duration.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function formatCategory(category) {
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});
