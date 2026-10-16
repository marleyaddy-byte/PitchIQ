document.addEventListener("DOMContentLoaded", () => {

    const mainContent = document.querySelector(".main-content");
    const navItems = document.querySelectorAll(".nav-item");
    
    let drills = [];
    let performanceTests = [];
    let testResults = [];
    let trainingHistory = [];

    let currentSession = [];
    let currentDrillIndex = 0;
    let currentSessionArea = "First Touch";
    let currentSessionName = "First Touch Development";
    let currentSessionDuration = 40;
let currentSessionDifficulty = "Advanced";
let customSession = [];
let customSessionName = "Custom Training Session";
let developmentFocus = [
    "First Touch",
    "Dribbling",
    "Shooting"
];
async function loadDevelopmentFocus() {
    try {
        const response = await fetch("/api/development-focus");

        if (!response.ok) {
            throw new Error("Unable to load development focus.");
        }

        const data = await response.json();

        if (Array.isArray(data.development_focus)) {
            developmentFocus = data.development_focus;
        }

    } catch (error) {
        console.error("Development focus loading error:", error);
    }
}
let playerProfile = {
    name: "Player",
    position: "CAM",
    playing_level: "Intermediate"
};


    // =========================================================
    // PAGE CONTENT
    // =========================================================

    const pages = {

        Dashboard: `
            <header class="topbar">
                <div>
                    <p class="eyebrow">PLAYER DASHBOARD</p>
                    <h2>
    Good morning, <span id="dashboard-player-name">Player</span>
    <span>👋</span>
</h2>
                </div>
                <div class="topbar-actions">
                    <button class="icon-button">🔔</button>
                    <div class="top-avatar">M</div>
                </div>
            </header>

            <section class="section">
                <div class="section-heading">
                    <div>
                        <h3>Your Development Focus</h3>
                        <p>Areas currently receiving the most attention.</p>
                    </div>
                    <button class="text-button" id="manage-focus">Manage focus →</button>
                </div>

                <div class="focus-grid" id="dashboard-focus-grid">
                    <div class="focus-card">
                        <div class="focus-top">
                            <span class="focus-icon">◉</span>
                            <span class="focus-status">FOCUS</span>
                        </div>
                        <h4>First Touch</h4>
                        <p>Improve control and direction when receiving under pressure.</p>
                        <div class="focus-footer"><span>Development</span><strong>High</strong></div>
                    </div>

                    <div class="focus-card">
                        <div class="focus-top">
                            <span class="focus-icon">◎</span>
                            <span class="focus-status">FOCUS</span>
                        </div>
                        <h4>Weak Foot</h4>
                        <p>Build confidence passing, controlling and finishing with your weaker side.</p>
                        <div class="focus-footer"><span>Development</span><strong>High</strong></div>
                    </div>

                    <div class="focus-card improving">
                        <div class="focus-top">
                            <span class="focus-icon">↗</span>
                            <span class="improving-status">IMPROVING</span>
                        </div>
                        <h4>Shooting</h4>
                        <p>Increase finishing consistency from different positions and angles.</p>
                        <div class="focus-footer"><span>Progress</span><strong>+18%</strong></div>
                    </div>
                </div>
            </section>

            <div class="dashboard-grid">
                <section class="panel session-panel">
                    <div class="panel-heading">
                        <div>
                            <p class="panel-label">TODAY'S TRAINING</p>
                            <h3 id="dashboard-session-name">First Touch Development</h3>
                        </div>
                        <span class="session-status">READY</span>
                    </div>

                    <div class="session-info">
                        <div class="session-stat">
    <span>DRILLS</span>
    <strong id="dashboard-session-drills">4</strong>
</div>

<div class="session-stat">
    <span>DURATION</span>
    <strong id="dashboard-session-duration">40 min</strong>
</div>

<div class="session-stat">
    <span>DIFFICULTY</span>
    <strong id="dashboard-session-difficulty">Advanced</strong>
</div>
                    </div>

                    <div class="session-description">
                        <p>Improve your ability to receive, control and move the ball effectively under realistic match conditions.</p>
                    </div>

                    <button class="primary-button start-session">
                        START SESSION <span>→</span>
                    </button>
                </section>

                <section class="panel streak-panel">
                    <div class="panel-heading">
                        <div>
                            <p class="panel-label">CONSISTENCY</p>
                            <h3>Training Streak</h3>
                        </div>
                    </div>

                    <div class="streak-number" id="dashboard-streak">0 <span>days</span></div>
                    <p class="streak-description">Keep training consistently to build your development streak.</p>

                    <div class="week" id="dashboard-week">
                        <div class="day completed"><span>M</span><div>✓</div></div>
                        <div class="day completed"><span>T</span><div>✓</div></div>
                        <div class="day completed"><span>W</span><div>✓</div></div>
                        <div class="day completed"><span>T</span><div>✓</div></div>
                        <div class="day completed"><span>F</span><div>✓</div></div>
                        <div class="day completed"><span>S</span><div>✓</div></div>
                        <div class="day"><span>S</span><div>•</div></div>
                    </div>
                </section>
            </div>

            <section class="section performance-section">
                <div class="section-heading">
                    <div>
                        <h3>Performance</h3>
                        <p>Track how your measurable abilities change over time.</p>
                    </div>
                    <button class="text-button" id="view-progress">View progress →</button>
                </div>

                <div class="performance-card" id="dashboard-performance-card">
                    <div class="performance-left">
                        <p class="panel-label">FIRST TOUCH TEST</p>
                        <h3>Directional Control</h3>
                        <div class="performance-score"><strong>17</strong><span>/ 20</span></div>
                        <div class="positive-change">↑ 30.8% since baseline</div>
                    </div>

                    <div class="performance-chart">
                        <div class="chart-labels">
                            <span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
                        </div>
                        <div class="chart-area">
                            <div class="grid-line"></div>
                            <div class="grid-line"></div>
                            <div class="grid-line"></div>
                            <div class="grid-line"></div>
                            <svg viewBox="0 0 500 200" preserveAspectRatio="none" class="chart-svg">
                                <polyline points="20,150 120,130 220,115 320,75 420,45 480,30" fill="none" stroke="currentColor" stroke-width="4"></polyline>
                                <circle cx="20" cy="150" r="5"></circle>
                                <circle cx="120" cy="130" r="5"></circle>
                                <circle cx="220" cy="115" r="5"></circle>
                                <circle cx="320" cy="75" r="5"></circle>
                                <circle cx="420" cy="45" r="5"></circle>
                                <circle cx="480" cy="30" r="5"></circle>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="section-heading">
                    <div>
                        <h3>Active Goals</h3>
                        <p>Keep your development targets visible.</p>
                    </div>
                    <button class="text-button" id="view-all">View all →</button>
                </div>

                <div class="goals-grid" id="dashboard-goals-grid">
                    <div class="goal-card">
                        <div class="goal-icon">🎯</div>
                        <div class="goal-content">
                            <span>PERFORMANCE</span>
                            <h4>Reach 18/20 on Directional Control</h4>
                            <div class="goal-progress">
                                <div class="progress-track"><div class="progress-fill" style="width: 85%;"></div></div>
                                <strong>85%</strong>
                            </div>
                        </div>
                    </div>

                    <div class="goal-card">
                        <div class="goal-icon">🔥</div>
                        <div class="goal-content">
                            <span>CONSISTENCY</span>
                            <h4>Complete 20 training sessions</h4>
                            <div class="goal-progress">
                                <div class="progress-track"><div class="progress-fill" style="width: 60%;"></div></div>
                                <strong>12 / 20</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <span>PitchIQ</span>
                <span>Football Development Platform</span>
            </footer>
        `,

        Training: `
            <div class="page-header">
                <div>
                    <h1>Training</h1>
                    <p>Choose a development area and generate a focused session.</p>
                </div>
            </div>

            <div class="panel">
                <span class="card-label">SESSION GENERATOR</span>
                <h2>Build Your Training Session</h2>
                <p>Select the area you want to work on today.</p>

                <div class="form-group">
                    <label for="training-area-select">Development Area</label>
                    <select id="training-area-select">
                        <option value="First Touch">First Touch</option>
                        <option value="Dribbling">Dribbling</option>
                        <option value="Passing">Passing</option>
                        <option value="Shooting">Shooting</option>
                        <option value="Speed">Speed</option>
                        <option value="Agility">Agility</option>
                    </select>
                </div>
                <div class="form-group">
    <label for="training-difficulty-select">Difficulty</label>

    <select id="training-difficulty-select">
        <option value="all">Any Difficulty</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
    </select>
</div>
<div class="form-group">
    <label for="training-length-select">Session Length</label>

    <select id="training-length-select">
        <option value="20">20 minutes</option>
        <option value="30">30 minutes</option>
        <option value="40" selected>40 minutes</option>
        <option value="60">60 minutes</option>
    </select>
</div>

                <button class="primary-button" id="generate-session">
                    GENERATE SESSION
                </button>
            </div>

            <div id="generated-session-preview"></div>

            <div class="section-title">
                <h2>Recent Training</h2>
            </div>

            <div class="history-list" id="training-recent-history">
                <div class="panel">
                    <p>Loading recent training...</p>
                </div>
            </div>
        `,

        Drills: `
            <div class="page-header">
                <div>
                    <h1>Drill Library</h1>
                    <p>Find drills to target specific areas of your game.</p>
                </div>
            </div>

            <div class="search-container">
                <input
                    type="text"
                    id="drill-search"
                    placeholder="Search drills..."
                >

                <select id="drill-filter">
                    <option value="all">All Areas</option>
                    <option value="Shooting">Shooting</option>
                    <option value="Passing">Passing</option>
                    <option value="First Touch">First Touch</option>
                    <option value="Dribbling">Dribbling</option>
                    <option value="Weak Foot">Weak Foot</option>
                    <option value="Crossing">Crossing</option>
                    <option value="Speed">Speed</option>
                </select>
            </div>

            <div id="drill-list" class="drill-grid">
                <p>Loading drills...</p>
            </div>
        `,

        Progress: `
            <div class="page-header">
                <div>
                    <h1>Performance Progress</h1>
                    <p>Track how your football performance changes over time.</p>
                </div>
            </div>

            <div class="progress-overview">
                <div class="progress-stat-card">
                    <span class="progress-stat-label">Tests Completed</span>
                    <strong id="progress-tests-completed">0</strong>
                    <span class="progress-stat-description">
                        Performance results recorded
                    </span>
                </div>

                <div class="progress-stat-card">
                    <span class="progress-stat-label">Areas Improving</span>
                    <strong id="progress-areas-improving">0</strong>
                    <span class="progress-stat-description">
                        Skills showing measurable progress
                    </span>
                </div>

                <div class="progress-stat-card">
                    <span class="progress-stat-label">Areas Tested</span>
                    <strong id="progress-areas-tested">0</strong>
                    <span class="progress-stat-description">
                        Different performance areas
                    </span>
                </div>
            </div>

            <div class="progress-section">
                <div class="section-heading">
                    <div>
                        <h2>Performance Tests</h2>
                        <p>Your baseline and latest measurements.</p>
                    </div>
                </div>

                <div id="progress-test-cards" class="progress-test-grid">
                    <div class="progress-loading">
                        Loading performance data...
                    </div>
                </div>
            </div>

            <div class="progress-section">
                <div class="section-heading">
                    <div>
                        <h2>Performance History</h2>
                        <p>See how your test results have changed over time.</p>
                    </div>
                </div>

                <div id="progress-history">
                    <div class="progress-loading">
                        Loading history...
                    </div>
                </div>
            </div>
        `,

        History: `
            <div class="page-header">
                <div>
                    <h1>Training History</h1>
                    <p>Review your previous sessions.</p>
                </div>
            </div>

            <div id="training-history-list" class="history-list">
                <div class="panel">
                    <p>Loading training history...</p>
                </div>
            </div>
        `,

        Profile: `
            <div class="page-header">
                <div>
                    <h1>Profile</h1>
                    <p>Your football development profile.</p>
                </div>
            </div>

            <div class="panel profile-panel">
                <div class="profile-header">
                    <div class="profile-avatar" id="profile-player-avatar">P</div>

                    <div>
                        <h2 id="profile-player-name">Player</h2>
<p id="profile-player-details">CAM • Intermediate</p>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-label">Sessions</span>
                        <strong id="profile-session-count">0</strong>
                    </div>

                    <div class="stat-card">
                        <span class="stat-label">Drills</span>
                        <strong id="profile-drill-count">0</strong>
                    </div>

                    <div class="stat-card">
                        <span class="stat-label">Streak</span>
                        <strong id="profile-streak">0 days</strong>
                    </div>
                </div>
            </div>
            <div class="panel">
    <span class="card-label">PLAYER INFORMATION</span>

    <h2>Edit Player Profile</h2>

    <form id="player-profile-form">

        <div class="form-group">
            <label for="player-name">Player Name</label>

            <input
                id="player-name"
                type="text"
                maxlength="60"
                required
            >
        </div>

        <div class="form-group">
            <label for="player-position">Position</label>

            <select id="player-position">
                <option value="GK">GK</option>
                <option value="CB">CB</option>
                <option value="LB">LB</option>
                <option value="RB">RB</option>
                <option value="CDM">CDM</option>
                <option value="CM">CM</option>
                <option value="CAM">CAM</option>
                <option value="LW">LW</option>
                <option value="RW">RW</option>
                <option value="ST">ST</option>
            </select>
        </div>

        <div class="form-group">
            <label for="player-level">Playing Level</label>

            <select id="player-level">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Semi-Pro">Semi-Pro</option>
            </select>
        </div>

        <button class="primary-button" type="submit">
            SAVE PROFILE
        </button>

    </form>
</div>
        `,

        Settings: `
    <div class="page-header">
        <div>
            <h1>Settings</h1>
            <p>Manage your PitchIQ preferences and data.</p>
        </div>
    </div>

    <div class="panel">

        <div class="setting-row">
            <div>
                <strong>Profile</strong>
                <p>Update your player information.</p>
            </div>

            <button
                class="secondary-button"
                id="settings-edit-profile"
            >
                EDIT
            </button>
        </div>

        <div class="setting-row">
            <div>
                <strong>Training Preferences</strong>
                <p>Manage your development focus.</p>
            </div>

            <button
                class="secondary-button"
                id="settings-edit-focus"
            >
                EDIT
            </button>
        </div>

        <div class="setting-row">
            <div>
                <strong>Data</strong>
                <p>Export your training and performance records.</p>
            </div>

            <button
                class="secondary-button"
                id="settings-manage-data"
            >
                MANAGE
            </button>
                </div>
    </div>
    `
};


// =========================================================
// LOAD PAGE
// =========================================================
    // =========================================================
    // LOAD PAGE
    // =========================================================

    function loadPage(pageName) {

        if (!pages[pageName]) {
            return;
        }

        mainContent.innerHTML = pages[pageName];

        setupPageInteractions(pageName);

        if (pageName === "Drills") {
            loadDrills();
        }

        if (pageName === "Progress") {
            loadProgressPage();
        }

        if (pageName === "History") {
            loadTrainingHistory();
        }

        if (pageName === "Dashboard") {
            loadDashboardData();
        }

        if (pageName === "Training") {
            loadTrainingPageData();
        }

        if (pageName === "Profile") {
    loadProfileData();
    setupPlayerProfileForm();
}
}


    // =========================================================
    // NAVIGATION
    // =========================================================

    navItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            const pageName =
                item.querySelector("span:last-child")?.textContent.trim();

            if (!pageName) {
                return;
            }

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

            loadPage(pageName);
        });
    });


    // =========================================================
    // PAGE INTERACTIONS
    // =========================================================

    function setupPageInteractions(pageName) {

        const startButtons =
            document.querySelectorAll(".start-session");

        startButtons.forEach(button => {
            button.addEventListener("click", () => {
                startTrainingSession();
            });
        });

        const generateSessionButton =
            document.getElementById("generate-session");

        if (generateSessionButton) {
            generateSessionButton.addEventListener("click", () => {
                generateTrainingSessionPreview();
            });
        }
function showDevelopmentFocusManager() {

    const availableAreas = [
        "First Touch",
        "Dribbling",
        "Passing",
        "Shooting",
        "Speed",
        "Agility"
    ];

    mainContent.innerHTML = `
        <div class="page-header">
            <div>
                <button
                    class="secondary-button"
                    id="back-to-dashboard"
                >
                    ← BACK TO DASHBOARD
                </button>

                <h1>Development Focus</h1>

                <p>
                    Choose up to three areas to prioritise
                    in your training.
                </p>
            </div>
        </div>

        <div class="panel">

            <span class="card-label">
                DEVELOPMENT AREAS
            </span>

            <h2>Choose Your Priorities</h2>

            <div class="history-list">

                ${availableAreas.map(area => `
                    <label class="history-item">

                        <div>
                            <strong>${area}</strong>

                            <span>
                                Prioritise ${area.toLowerCase()}
                                in your development.
                            </span>
                        </div>

                        <input
                            type="checkbox"
                            class="focus-checkbox"
                            value="${area}"
                            ${developmentFocus.includes(area)
                                ? "checked"
                                : ""}
                        >

                    </label>
                `).join("")}

            </div>

            <br>

            <button
                class="primary-button"
                id="save-development-focus"
            >
                SAVE FOCUS
            </button>

        </div>
    `;

    const backButton =
        document.getElementById("back-to-dashboard");

    if (backButton) {
        backButton.addEventListener("click", () => {
            loadPage("Dashboard");
            setActiveNavigation("Dashboard");
        });
    }

    const checkboxes =
        document.querySelectorAll(".focus-checkbox");

    checkboxes.forEach(checkbox => {

        checkbox.addEventListener("change", () => {

            const selected =
                document.querySelectorAll(
                    ".focus-checkbox:checked"
                );

            if (selected.length > 3) {
                checkbox.checked = false;

                alert(
                    "You can select a maximum of three development areas."
                );
            }
        });
    });

    const saveButton =
        document.getElementById("save-development-focus");

    if (saveButton) {

       saveButton.addEventListener("click", async () => { 

            const selected =
                Array.from(
                    document.querySelectorAll(
                        ".focus-checkbox:checked"
                    )
                ).map(checkbox => checkbox.value);

            if (selected.length === 0) {
                alert(
                    "Select at least one development area."
                );

                return;
            }

            try {
    saveButton.disabled = true;

    const response = await fetch("/api/development-focus", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            development_focus: selected
        })
    });

    if (!response.ok) {
        throw new Error("Unable to save development focus.");
    }

    developmentFocus = selected;

    loadPage("Dashboard");
    setActiveNavigation("Dashboard");

} catch (error) {
    console.error(error);
    alert("Could not save your development focus.");
} finally {
    saveButton.disabled = false;
}
        });
    }
}
        const manageFocusButton =
    document.getElementById("manage-focus");

if (manageFocusButton) {
    manageFocusButton.addEventListener("click", () => {
        showDevelopmentFocusManager();
    });
}

        const viewProgressButton =
            document.getElementById("view-progress");

        if (viewProgressButton) {
            viewProgressButton.addEventListener("click", () => {
                loadPage("Progress");
                setActiveNavigation("Progress");
            });
        }

        const viewAllButton =
    document.getElementById("view-all");

if (viewAllButton) {
    viewAllButton.addEventListener("click", () => {
        loadPage("History");
        setActiveNavigation("History");
    });
}

// SETTINGS BUTTONS

const editProfileButton =
    document.getElementById("settings-edit-profile");

if (editProfileButton) {
    editProfileButton.addEventListener("click", () => {
        loadPage("Profile");
        setActiveNavigation("Profile");
    });
}

const editFocusButton =
    document.getElementById("settings-edit-focus");

if (editFocusButton) {const manageDataButton =
    document.getElementById("settings-manage-data");

if (manageDataButton) {
    manageDataButton.addEventListener("click", () => {
        showDataManager();
    });
}
    editFocusButton.addEventListener("click", () => {
        showDevelopmentFocusManager();
    });
}

}

// =========================================================
// DATA MANAGER
// =========================================================

function showDataManager() {

    mainContent.innerHTML = `
        <div class="page-header">
            <div>
                <button class="secondary-button" id="back-to-settings">
                    ← BACK TO SETTINGS
                </button>

                <h1>Manage Data</h1>
                <p>Download your saved PitchIQ information.</p>
            </div>
        </div>

        <div class="panel">
            <span class="card-label">DATA EXPORT</span>

            <h2>Export Your Data</h2>

            <p>
                Download your player profile, training history
                and performance test results.
            </p>

            <button class="primary-button" id="export-pitchiq-data">
                EXPORT DATA
            </button>
        </div>
    `;

    document.getElementById("back-to-settings")
        .addEventListener("click", () => {
            loadPage("Settings");
            setActiveNavigation("Settings");
        });

    document.getElementById("export-pitchiq-data")
        .addEventListener("click", exportPitchIQData);
}


async function exportPitchIQData() {

    const button = document.getElementById("export-pitchiq-data");

    button.disabled = true;

    try {
        const responses = await Promise.all([
            fetch("/api/profile"),
            fetch("/api/training-history"),
            fetch("/api/test-results")
        ]);

        if (responses.some(response => !response.ok)) {
            throw new Error("Failed to retrieve data.");
        }

        const [profile, history, results] = await Promise.all(
            responses.map(response => response.json())
        );

        const data = {
            exported_at: new Date().toISOString(),
            profile: profile,
            training_history: history,
            test_results: results,
            development_focus: developmentFocus
        };

        const blob = new Blob(
            [JSON.stringify(data, null, 4)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "pitchiq-data.json";

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);

    } catch (error) {
        console.error(error);
        alert("Unable to export data. Check that Flask is running.");
    } finally {
        button.disabled = false;
    }
}
    // =========================================================
    // LOAD DRILLS
    // =========================================================

    async function loadDrills() {

        const drillList =
            document.getElementById("drill-list");

        if (!drillList) {
            return;
        }

        try {

            const response =
                await fetch("/api/drills");

            if (!response.ok) {
                throw new Error("Could not load drills.");
            }

            drills =
                await response.json();

            displayDrills(drills);
            setupDrillSearch();

        } catch (error) {

            console.error(error);

            drillList.innerHTML = `
                <div class="panel">
                    <p>Unable to load drills.</p>
                </div>
            `;
        }
    }


    // =========================================================
    // DISPLAY DRILLS
    // =========================================================

    function displayDrills(drillData) {

        const drillList =
            document.getElementById("drill-list");

        if (!drillList) {
            return;
        }

        if (drillData.length === 0) {

            drillList.innerHTML = `
                <div class="panel">
                    <p>No drills found.</p>
                </div>
            `;

            return;
        }
const drillImages = {
    "Shooting": "/images/shooting.jpg",
    "Passing": "/images/passing.jpg",
    "Dribbling": "/images/dribbling.jpg",
    "First Touch": "/images/first-touch.jpg",
    "Speed": "/images/speed.jpg",
    "Agility": "/images/agility.jpg",
    "Weak Foot": "/images/shooting.jpg",
    "Crossing": "/images/passing.jpg"
};
        drillList.innerHTML = drillData.map((drill, index) => `
            <div class="drill-card">
            <img
    class="drill-image"
    src="${drillImages[drill.target_area] || '/images/passing.jpg'}"
    alt="${drill.target_area} football training"
    loading="lazy"
>
                <div class="drill-card-top">
                    <span class="drill-category">
                        ${drill.target_area}
                    </span>

                    <span class="drill-difficulty">
                        ${drill.difficulty}
                    </span>
                </div>

                <h3>${drill.name}</h3>
                <p>${drill.instructions}</p>

                <button
                    class="secondary-button drill-view-button"
                    data-index="${index}"
                >
                    VIEW DRILL
                </button>
            </div>
        `).join("");

        const viewButtons =
            document.querySelectorAll(".drill-view-button");

        viewButtons.forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                showDrillDetails(drillData[index]);
            });
        });
    }


    // =========================================================
    // DRILL SEARCH
    // =========================================================

    function setupDrillSearch() {

        const searchInput =
            document.getElementById("drill-search");

        const filterSelect =
            document.getElementById("drill-filter");

        if (!searchInput || !filterSelect) {
            return;
        }

        function filterDrills() {

            const searchTerm =
                searchInput.value.toLowerCase().trim();

            const selectedArea =
                filterSelect.value;

            const filtered =
                drills.filter(drill => {

                    const matchesSearch =
                        drill.name.toLowerCase().includes(searchTerm) ||
                        drill.instructions.toLowerCase().includes(searchTerm) ||
                        drill.target_area.toLowerCase().includes(searchTerm);

                    const matchesArea =
                        selectedArea === "all" ||
                        drill.target_area === selectedArea;

                    return matchesSearch && matchesArea;
                });

            displayDrills(filtered);
        }

        searchInput.addEventListener(
            "input",
            filterDrills
        );

        filterSelect.addEventListener(
            "change",
            filterDrills
        );
    }


    // =========================================================
    // DRILL DETAILS
    // =========================================================

    function showDrillDetails(drill) {

        mainContent.innerHTML = `
            <div class="page-header">
                <div>
                    <button
                        class="secondary-button"
                        id="back-to-drills"
                    >
                        ← BACK TO DRILLS
                    </button>

                    <h1>${drill.name}</h1>

                    <p>
                        ${drill.target_area} • ${drill.difficulty}
                    </p>
                </div>
            </div>

            <div class="panel">
                <div class="drill-detail">

                    <span class="card-label">
                        ${drill.target_area}
                    </span>

                    <h2>How to perform it</h2>

                    <p>${drill.instructions}</p>

                    <div class="detail-info">
                        <div>
                            <strong>Target Area</strong>
                            <span>${drill.target_area}</span>
                        </div>

                        <div>
                            <strong>Difficulty</strong>
                            <span>${drill.difficulty}</span>
                        </div>
                    </div>

                    <button
                        class="primary-button"
                        id="add-drill-session"
                    >
                        ADD TO SESSION
                    </button>

                </div>
            </div>
        `;

        document
    .getElementById("add-drill-session")
    .addEventListener("click", () => {

        const alreadyAdded =
            customSession.some(sessionDrill =>
                sessionDrill.name === drill.name
            );

        if (alreadyAdded) {
            alert(
                `"${drill.name}" is already in your custom session.`
            );

            return;
        }

        customSession.push(drill);

        customSessionName = "Custom Training Session";

        alert(
            `"${drill.name}" has been added to your custom session.`
        );
    });
    }


    // =========================================================
    // PERFORMANCE TESTS
    // =========================================================

    async function loadPerformanceTests() {

        const testArea =
            document.getElementById("performance-test-area");

        if (!testArea) {
            return;
        }

        testArea.innerHTML = `
            <div class="panel">
                <p>Loading performance tests...</p>
            </div>
        `;

        try {

            const testsResponse =
                await fetch("/api/tests");

            const resultsResponse =
                await fetch("/api/test-results");

            if (!testsResponse.ok) {
                throw new Error("Could not load performance tests.");
            }

            if (!resultsResponse.ok) {
                throw new Error("Could not load test results.");
            }

            performanceTests =
                await testsResponse.json();

            testResults =
                await resultsResponse.json();

            displayPerformanceTests();

        } catch (error) {

            console.error(error);

            testArea.innerHTML = `
                <div class="panel">
                    <p>Unable to load performance tests.</p>
                </div>
            `;
        }
    }


    // =========================================================
    // DISPLAY PERFORMANCE TESTS
    // =========================================================

    function displayPerformanceTests() {

        const testArea =
            document.getElementById("performance-test-area");

        if (!testArea) {
            return;
        }

        if (performanceTests.length === 0) {

            testArea.innerHTML = `
                <div class="panel">
                    <p>No performance tests available.</p>
                </div>
            `;

            return;
        }

        testArea.innerHTML = `
            <div class="panel">

                <div class="panel-header">
                                    <div>
                        <span class="card-label">
                            PERFORMANCE TESTS
                        </span>

                        <h2>Test Your Performance</h2>

                        <p>
                            Record measurable results and track your
                            development over time.
                        </p>
                    </div>

                </div>

                <div class="performance-test-list">

                    ${performanceTests.map((test, index) => {

                        const matchingResults =
                            testResults.filter(result => {
                                return String(result.test_id) === String(test.id);
                            });

                        const latestResult =
                            matchingResults.length
                                ? matchingResults[matchingResults.length - 1]
                                : null;

                        return `
                            <div class="performance-test-item">

                                <div class="performance-test-info">

                                    <span class="card-label">
                                        ${test.target_area}
                                    </span>

                                    <h3>
                                        ${test.name}
                                    </h3>

                                    <p>
                                        ${test.description || ""}
                                    </p>

                                    ${
                                        latestResult
                                            ? `
                                                <div class="latest-result">
                                                    Latest:
                                                    <strong>
                                                        ${latestResult.score}
                                                    </strong>
                                                </div>
                                            `
                                            : `
                                                <div class="latest-result">
                                                    No result recorded
                                                </div>
                                            `
                                    }

                                </div>

                                <button
                                    class="secondary-button open-test-button"
                                    data-index="${index}"
                                >
                                    OPEN TEST
                                </button>

                            </div>
                        `;

                    }).join("")}

                </div>

            </div>
        `;

        document
            .querySelectorAll(".open-test-button")
            .forEach(button => {

                button.addEventListener("click", () => {

                    const index =
                        Number(button.dataset.index);

                    const test =
                        performanceTests[index];

                    if (!test) {
                        return;
                    }

                    showPerformanceTest(test);
                });
            });
    }


    // =========================================================
    // SHOW PERFORMANCE TEST
    // =========================================================

    function showPerformanceTest(test) {

        mainContent.innerHTML = `

            <div class="page-header">

                <div>

                    <button
                        class="secondary-button"
                        id="back-to-progress"
                    >
                        ← BACK
                    </button>

                    <span class="card-label">
                        ${test.target_area}
                    </span>

                    <h1>
                        ${test.name}
                    </h1>

                    <p>
                        ${test.description || ""}
                    </p>

                </div>

            </div>

            <div class="panel">

                <form id="performance-test-form">

                    <div class="form-group">

    <label for="test-score">
        Result (${test.unit})
    </label>

    <input
        id="test-score"
        type="number"
        step="any"
        min="${test.minimum}"
        max="${test.maximum}"
        required
        placeholder="Enter result in ${test.unit}"
    >

    <small>
        Valid range: ${test.minimum}–${test.maximum} ${test.unit}.
        ${
            test.direction === "lower"
                ? "A lower result is better."
                : "A higher result is better."
        }
    </small>

</div>

                    

                    <div class="form-group">

                        <label for="test-notes">
                            Notes
                        </label>

                        <textarea
                            id="test-notes"
                            placeholder="Record conditions, technique or observations..."
                        ></textarea>

                    </div>

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        SAVE TEST RESULT
                    </button>

                </form>

            </div>

            <div id="test-results-container"></div>
        `;

        const backButton =
            document.getElementById("back-to-progress");

        if (backButton) {

            backButton.addEventListener("click", () => {

                loadPage("Progress");
                setActiveNavigation("Progress");
            });
        }

        const form =
            document.getElementById("performance-test-form");

        if (form) {

            form.addEventListener(
                "submit",
                async event => {

                    event.preventDefault();

                    const scoreInput =
                        document.getElementById("test-score");

                    const notesInput =
                        document.getElementById("test-notes");

                    const score =
                        Number(scoreInput.value);

                    if (
    scoreInput.value.trim() === "" ||
    !Number.isFinite(score) ||
    score < Number(test.minimum) ||
    score > Number(test.maximum)
) {

    alert(
        `Enter a valid result between ${test.minimum} and ${test.maximum} ${test.unit}.`
    );

    return;
}

                    const result = {
                        test_id: test.id,
                        score: score,
                        notes: notesInput.value.trim()
                    };

                    try {

                        const response =
                            await fetch(
                                "/api/test-results",
                                {
                                    method: "POST",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    body:
                                        JSON.stringify(result)
                                }
                            );

                        if (!response.ok) {

                            throw new Error(
                                "Could not save the result."
                            );
                        }

                        const resultsResponse =
                            await fetch("/api/test-results");

                        if (!resultsResponse.ok) {

                            throw new Error(
                                "Result saved, but results could not be reloaded."
                            );
                        }

                        testResults =
                            await resultsResponse.json();

                        scoreInput.value = "";
                        notesInput.value = "";

                        displayTestResults(test);

                        alert(
                            "Performance result saved."
                        );

                    } catch (error) {

                        console.error(error);

                        alert(
                            "Unable to save your result. Please try again."
                        );
                    }
                }
            );
        }

        displayTestResults(test);
    }


    // =========================================================
    // DISPLAY TEST RESULTS
    // =========================================================

    function displayTestResults(test) {

        const container =
            document.getElementById(
                "test-results-container"
            );

        if (!container) {
            return;
        }

        const matchingResults =
            testResults.filter(result => {

                return String(result.test_id) ===
                    String(test.id);
            });

        if (matchingResults.length === 0) {

            container.innerHTML = `
                <div class="panel">

                    <h3>Your Results</h3>

                    <p>
                        No results recorded for this test yet.
                    </p>

                </div>
            `;

            return;
        }

        const orderedResults =
            [...matchingResults].sort(
                (a, b) => {

                    const aTime =
                        new Date(a.date || 0).getTime();

                    const bTime =
                        new Date(b.date || 0).getTime();

                    return aTime - bTime;
                }
            );

        const baseline =
            orderedResults[0];

        const latest =
            orderedResults[
                orderedResults.length - 1
            ];

        container.innerHTML = `

            <div class="panel">

                <h3>Your Results</h3>

                <div class="result-summary">

                    <div>
                        <span>Baseline</span>
                        <strong>
                            ${baseline.score}
                        </strong>
                    </div>

                    <div>
                        <span>Latest</span>
                        <strong>
                            ${latest.score}
                        </strong>
                    </div>

                    <div>
                        <span>Attempts</span>
                        <strong>
                            ${orderedResults.length}
                        </strong>
                    </div>

                </div>

                <div class="result-history">

                    ${orderedResults.map(result => `

                        <div class="result-history-item">

                            <div>

                                <strong>
                                    ${result.score}
                                </strong>

                                <span>
                                    ${
                                        result.date ||
                                        "Date not recorded"
                                    }
                                </span>

                            </div>

                            <p>
                                ${
                                    result.notes ||
                                    "No notes"
                                }
                            </p>

                        </div>

                    `).join("")}

                </div>

            </div>
        `;
    }


    // =========================================================
    // PROGRESS PAGE
    // =========================================================

    async function loadProgressPage() {

        const cardsContainer =
            document.getElementById(
                "progress-test-cards"
            );

        const historyContainer =
            document.getElementById(
                "progress-history"
            );

        if (
            !cardsContainer ||
            !historyContainer
        ) {
            return;
        }

        cardsContainer.innerHTML = `
            <div class="progress-loading">
                Loading performance data...
            </div>
        `;

        historyContainer.innerHTML = `
            <div class="progress-loading">
                Loading history...
            </div>
        `;

        try {

            const [
                testsResponse,
                resultsResponse
            ] = await Promise.all([
                fetch("/api/tests"),
                fetch("/api/test-results")
            ]);

            if (
                !testsResponse.ok ||
                !resultsResponse.ok
            ) {

                throw new Error(
                    "Could not load progress data."
                );
            }

            performanceTests =
                await testsResponse.json();

            testResults =
                await resultsResponse.json();

            if (!Array.isArray(performanceTests)) {
                performanceTests = [];
            }

            if (!Array.isArray(testResults)) {
                testResults = [];
            }

            displayProgressSummary();
            displayProgressTestCards();
            displayProgressHistory();

        } catch (error) {

            console.error(error);

            cardsContainer.innerHTML = `
                <div class="panel">
                    <p>
                        Unable to load performance data.
                    </p>
                </div>
            `;

            historyContainer.innerHTML = `
                <div class="panel">
                    <p>
                        Unable to load performance history.
                    </p>
                </div>
            `;
        }
    }


    // =========================================================
    // PROGRESS SUMMARY
    // =========================================================

    function displayProgressSummary() {

        const completedElement =
            document.getElementById(
                "progress-tests-completed"
            );

        const improvingElement =
            document.getElementById(
                "progress-areas-improving"
            );

        const testedElement =
            document.getElementById(
                "progress-areas-tested"
            );

        if (
            !completedElement ||
            !improvingElement ||
            !testedElement
        ) {
            return;
        }

        const testedIds =
            new Set(
                testResults.map(result =>
                    String(result.test_id)
                )
            );

        let improvingCount = 0;

        performanceTests.forEach(test => {

            const results =
                testResults
                    .filter(result => {

                        return String(
                            result.test_id
                        ) === String(test.id);

                    })
                    .sort((a, b) => {

                        const aTime =
                            new Date(
                                a.date || 0
                            ).getTime();

                        const bTime =
                            new Date(
                                b.date || 0
                            ).getTime();

                        return aTime - bTime;
                    });

            if (results.length >= 2) {

                const first =
                    Number(results[0].score);

                const latest =
                    Number(
                        results[
                            results.length - 1
                        ].score
                    );

                if (
    Number.isFinite(first) &&
    Number.isFinite(latest)
) {

    const isImproving =
        test.direction === "lower"
            ? latest < first
            : latest > first;

    if (isImproving) {
        improvingCount++;
    }
}
            }
        });

        completedElement.textContent =
            testResults.length;

        improvingElement.textContent =
            improvingCount;

        testedElement.textContent =
            testedIds.size;
    }


    // =========================================================
    // PROGRESS TEST CARDS
    // =========================================================

    function displayProgressTestCards() {

        const container =
            document.getElementById(
                "progress-test-cards"
            );

        if (!container) {
            return;
        }

        if (performanceTests.length === 0) {

            container.innerHTML = `
                <div class="panel">
                    <p>
                        No performance tests available.
                    </p>
                </div>
            `;

            return;
        }

        container.innerHTML =
            performanceTests
                .map(test => {

                    const results =
                        testResults
                            .filter(result => {

                                return String(
                                    result.test_id
                                ) === String(
                                    test.id
                                );
                            })
                            .sort((a, b) => {

                                const aTime =
                                    new Date(
                                        a.date || 0
                                    ).getTime();

                                const bTime =
                                    new Date(
                                        b.date || 0
                                    ).getTime();

                                return aTime - bTime;
                            });

                    const baseline =
                        results.length
                            ? Number(
                                results[0].score
                            )
                            : null;

                    const latest =
                        results.length
                            ? Number(
                                results[
                                    results.length - 1
                                ].score
                            )
                            : null;

                    let changeText =
                        "No comparison yet";

                    let changeClass =
                        "neutral-change";

                    if (
                        results.length >= 2 &&
                        baseline !== null &&
                        latest !== null &&
                        Number.isFinite(baseline) &&
                        Number.isFinite(latest)
                    ) {

                        if (baseline !== 0) {

    const rawPercentage =
        ((latest - baseline) / Math.abs(baseline)) * 100;

    const improvementPercentage =
        test.direction === "lower"
            ? -rawPercentage
            : rawPercentage;

    if (improvementPercentage > 0) {

        changeText =
            `↑ ${improvementPercentage.toFixed(1)}% improvement from baseline`;

        changeClass =
            "positive-change";

    } else if (improvementPercentage < 0) {

        changeText =
            `↓ ${Math.abs(improvementPercentage).toFixed(1)}% decline from baseline`;

        changeClass =
            "negative-change";

    } else {

        changeText =
            "No change from baseline";
    }
}
                    }

                    return `
                        <div class="progress-test-card">

                            <div class="progress-test-card-header">

                                <span class="progress-test-area">
                                    ${test.target_area}
                                </span>

                                <span class="progress-test-attempts">
                                    ${results.length}
                                    attempt${results.length === 1 ? "" : "s"}
                                </span>

                            </div>

                            <h3>
                                ${test.name}
                            </h3>

                            <p>
                                ${test.description || ""}
                            </p>

                            <div class="progress-test-scores">

                                <div>
                                    <span>
                                        Baseline
                                    </span>

                                    <strong>
    ${
        baseline === null
            ? "—"
            : `${baseline} ${test.unit}`
    }
</strong>
                                </div>

                                <div>
                                    <span>
                                        Latest
                                    </span>

                                    <strong>
    ${
        latest === null
            ? "—"
            : `${latest} ${test.unit}`
    }
</strong>
                                </div>

                            </div>

                            <div class="${changeClass}">
    ${changeText}
</div>

<button
    class="primary-button progress-record-button"
    data-test-id="${test.id}"
>
    ${results.length === 0 ? "RECORD BASELINE" : "RECORD NEW RESULT"}
</button>

</div>
                    `;

                })
                .join("");
                document
    .querySelectorAll(".progress-record-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            const testId = button.dataset.testId;

            const test = performanceTests.find(item => {
                return String(item.id) === String(testId);
            });

            if (!test) {
                return;
            }

            showPerformanceTest(test);
        });
    });
    }


    // =========================================================
    // PROGRESS HISTORY
    // =========================================================

    function displayProgressHistory() {

        const container =
            document.getElementById(
                "progress-history"
            );

        if (!container) {
            return;
        }

        if (testResults.length === 0) {

            container.innerHTML = `
                <div class="panel">
                    <p>
                        No performance history has been recorded yet.
                    </p>
                </div>
            `;

            return;
        }

        const orderedResults =
            [...testResults].sort(
                (a, b) => {

                    const aTime =
                        new Date(
                            a.date || 0
                        ).getTime();

                    const bTime =
                        new Date(
                            b.date || 0
                        ).getTime();

                    return bTime - aTime;
                }
            );

        container.innerHTML = `
            <div class="panel progress-history-panel">

                ${orderedResults.map(result => {

                    const test =
                        performanceTests.find(
                            item => {

                                return String(
                                    item.id
                                ) === String(
                                    result.test_id
                                );
                            }
                        );

                    return `
                        <div class="progress-history-item">

                            <div class="progress-history-main">

                                <strong>
                                    ${
                                        test
                                            ? test.name
                                            : "Performance Test"
                                    }
                                </strong>

                                <span>
                                    ${
                                        result.date ||
                                        "Date not recorded"
                                    }
                                </span>

                            </div>

                            <div class="progress-history-score">

                                <strong>
    ${result.score}${test?.unit ? ` ${test.unit}` : ""}
</strong>

                                <span>
                                    ${
                                        test
                                            ? test.target_area
                                            : ""
                                    }
                                </span>

                            </div>

                            <p>
                                ${
                                    result.notes ||
                                    "No notes recorded."
                                }
                            </p>

                        </div>
                    `;

                }).join("")}

            </div>
        `;
    }


    // =========================================================
    // DYNAMIC DASHBOARD / PROFILE DATA
    // =========================================================

    function calculateTrainingStreak(history) {
        if (!Array.isArray(history) || history.length === 0) return 0;

        const uniqueDays = [...new Set(
            history
                .map(session => {
                    const date = new Date(session.date);
                    if (Number.isNaN(date.getTime())) return null;
                    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                })
                .filter(Boolean)
        )];

        const dayTimes = uniqueDays
            .map(value => {
                const [year, month, day] = value.split("-").map(Number);
                return new Date(year, month, day).getTime();
            })
            .sort((a, b) => b - a);

        if (dayTimes.length === 0) return 0;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (
            dayTimes[0] !== today.getTime() &&
            dayTimes[0] !== yesterday.getTime()
        ) {
            return 0;
        }

        let streak = 1;

        for (let i = 1; i < dayTimes.length; i++) {
            const difference = dayTimes[i - 1] - dayTimes[i];

            if (difference === 86400000) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    }


    function formatShortTrainingDate(dateValue) {
        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "Date not recorded";
        }

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short"
        });
    }


    async function fetchDashboardData() {
        const [historyResponse, testsResponse, resultsResponse] =
            await Promise.all([
                fetch("/api/training-history"),
                fetch("/api/tests"),
                fetch("/api/test-results")
            ]);

        if (
            !historyResponse.ok ||
            !testsResponse.ok ||
            !resultsResponse.ok
        ) {
            throw new Error("Could not load dashboard data.");
        }

        trainingHistory = await historyResponse.json();
        performanceTests = await testsResponse.json();
        testResults = await resultsResponse.json();

        if (!Array.isArray(trainingHistory)) trainingHistory = [];
        if (!Array.isArray(performanceTests)) performanceTests = [];
        if (!Array.isArray(testResults)) testResults = [];
    }


    async function loadDashboardData() {
        try {
            await fetchDashboardData();
            const profileResponse = await fetch("/api/profile");

if (!profileResponse.ok) {
    throw new Error("Unable to load player profile.");
}

playerProfile = await profileResponse.json();
const dashboardName = document.getElementById("dashboard-player-name");

if (dashboardName) {
    dashboardName.textContent = playerProfile.name || "Player";
}
            const focusGrid =
    document.getElementById("dashboard-focus-grid");

if (focusGrid) {
    focusGrid.innerHTML =
        developmentFocus.map(area => `
    <div class="focus-card">
        <img
    class="focus-image"
    src="/images/${area.toLowerCase().replace(/\s+/g, '-')}.jpg"
    alt="${area} Training"
    loading="lazy"
>
                <div class="focus-top">
                    <span class="focus-icon">◉</span>
                    <span class="focus-status">FOCUS</span>
                </div>

                <h4>${area}</h4>

                <p>
                    Currently selected as a priority
                    development area.
                </p>

                <div class="focus-footer">
                    <span>Development</span>
                    <strong>High</strong>
                </div>
            </div>
        `).join("");
}
const sessionNameElement =
    document.getElementById("dashboard-session-name");

const sessionDrillsElement =
    document.getElementById("dashboard-session-drills");

const sessionDurationElement =
    document.getElementById("dashboard-session-duration");

const sessionDifficultyElement =
    document.getElementById("dashboard-session-difficulty");


if (sessionNameElement) {
    sessionNameElement.textContent =
        currentSessionName;
}

if (sessionDrillsElement) {
    sessionDrillsElement.textContent =
        currentSession.length || 4;
}

if (sessionDurationElement) {
    sessionDurationElement.textContent =
        `${currentSessionDuration} min`;
}

if (sessionDifficultyElement) {
    sessionDifficultyElement.textContent =
        currentSessionDifficulty;
}
            const streak = calculateTrainingStreak(trainingHistory);
            const streakElement = document.getElementById("dashboard-streak");

            if (streakElement) {
                streakElement.innerHTML =
                    `${streak} <span>${streak === 1 ? "day" : "days"}</span>`;
            }

            displayDashboardWeek();
displayDashboardPerformance();
displayDashboardGoals();

        } catch (error) {
            console.error(error);
        }
    }


    function displayDashboardWeek() {
        const weekElement = document.getElementById("dashboard-week");
        if (!weekElement) return;

        const trainedDates = new Set(
            trainingHistory.map(session => {
                const date = new Date(session.date);
                if (Number.isNaN(date.getTime())) return "";
                return date.toDateString();
            })
        );

        const today = new Date();
        const dayOfWeek = today.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        const monday = new Date(today);
        monday.setDate(today.getDate() + mondayOffset);
        monday.setHours(0, 0, 0, 0);

        const labels = ["M", "T", "W", "T", "F", "S", "S"];

        weekElement.innerHTML = labels.map((label, index) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + index);

            const completed = trainedDates.has(date.toDateString());

            return `
                <div class="day${completed ? " completed" : ""}">
                    <span>${label}</span>
                    <div>${completed ? "✓" : "•"}</div>
                </div>
            `;
        }).join("");
    }


    function displayDashboardGoals() {

    const goalsGrid =
        document.getElementById("dashboard-goals-grid");

    if (!goalsGrid) return;

    // ==========================================
    // CONSISTENCY GOAL
    // ==========================================

    const sessionTarget = 20;

    const completedSessions =
        trainingHistory.length;

    const sessionProgress =
        Math.min(
            (completedSessions / sessionTarget) * 100,
            100
        );


    // ==========================================
    // PERFORMANCE GOAL
    // ==========================================

    let performanceGoalHtml = "";

    if (
        performanceTests.length > 0 &&
        testResults.length > 0
    ) {

        const orderedResults =
            [...testResults].sort(
                (a, b) =>
                    new Date(b.date || 0).getTime() -
                    new Date(a.date || 0).getTime()
            );

        const latestResult =
            orderedResults[0];

        const test =
            performanceTests.find(item =>
                String(item.id) ===
                String(latestResult.test_id)
            );

        if (test) {

            const latestScore =
                Number(latestResult.score);

            const minimum =
                Number(test.minimum);

            const maximum =
                Number(test.maximum);

            let target;
            let progress;

            if (test.direction === "lower") {

                target =
                    Math.max(
                        minimum,
                        latestScore * 0.9
                    );

                if (latestScore > 0) {
                    progress =
                        (target / latestScore) * 100;
                } else {
                    progress = 100;
                }

            } else {

                target =
                    Math.min(
                        maximum,
                        Math.ceil(latestScore * 1.1)
                    );

                if (target > 0) {
                    progress =
                        (latestScore / target) * 100;
                } else {
                    progress = 0;
                }
            }

            progress =
                Math.max(
                    0,
                    Math.min(progress, 100)
                );

            const formattedTarget =
                Number(target.toFixed(2));

            performanceGoalHtml = `
                <div class="goal-card">

                    <div class="goal-icon">
                        🎯
                    </div>

                    <div class="goal-content">

                        <span>
                            PERFORMANCE
                        </span>

                        <h4>
                            ${
                                test.direction === "lower"
                                    ? "Reduce"
                                    : "Reach"
                            }
                            ${formattedTarget}
                            ${test.unit || ""}
                            on ${test.name}
                        </h4>

                        <div class="goal-progress">

                            <div class="progress-track">
                                <div
                                    class="progress-fill"
                                    style="width: ${progress}%"
                                ></div>
                            </div>

                            <strong>
                                ${Math.round(progress)}%
                            </strong>

                        </div>

                    </div>

                </div>
            `;
        }
    }


    // ==========================================
    // NO PERFORMANCE DATA YET
    // ==========================================

    if (!performanceGoalHtml) {

        performanceGoalHtml = `
            <div class="goal-card">

                <div class="goal-icon">
                    🎯
                </div>

                <div class="goal-content">

                    <span>
                        PERFORMANCE
                    </span>

                    <h4>
                        Record a performance test
                        to create your first target
                    </h4>

                    <div class="goal-progress">

                        <div class="progress-track">
                            <div
                                class="progress-fill"
                                style="width: 0%"
                            ></div>
                        </div>

                        <strong>
                            0%
                        </strong>

                    </div>

                </div>

            </div>
        `;
    }


    // ==========================================
    // DISPLAY GOALS
    // ==========================================

    goalsGrid.innerHTML = `

        ${performanceGoalHtml}

        <div class="goal-card">

            <div class="goal-icon">
                🔥
            </div>

            <div class="goal-content">

                <span>
                    CONSISTENCY
                </span>

                <h4>
                    Complete ${sessionTarget}
                    training sessions
                </h4>

                <div class="goal-progress">

                    <div class="progress-track">

                        <div
                            class="progress-fill"
                            style="width: ${sessionProgress}%"
                        ></div>

                    </div>

                    <strong>
                        ${completedSessions}
                        /
                        ${sessionTarget}
                    </strong>

                </div>

            </div>

        </div>
    `;
}
function displayDashboardPerformance() {
        const card = document.getElementById("dashboard-performance-card");
        if (!card) return;

        if (testResults.length === 0) {
            card.innerHTML = `
                <div class="performance-left">
                    <p class="panel-label">PERFORMANCE TESTS</p>
                    <h3>No results recorded yet</h3>
                    <div class="neutral-change">
                        Record a baseline test to start tracking progress.
                    </div>
                </div>
            `;
            return;
        }

        const ordered = [...testResults].sort((a, b) =>
            new Date(a.date || 0).getTime() -
            new Date(b.date || 0).getTime()
        );

        const latestResult = ordered[ordered.length - 1];

        const test = performanceTests.find(item =>
            String(item.id) === String(latestResult.test_id)
        );

        if (!test) return;

        const matchingResults = ordered.filter(result =>
            String(result.test_id) === String(test.id)
        );

        const baseline = Number(matchingResults[0]?.score);
        const latest = Number(latestResult.score);

        let changeText = "Baseline recorded";
        let changeClass = "neutral-change";

        if (
            matchingResults.length >= 2 &&
            Number.isFinite(baseline) &&
            Number.isFinite(latest) &&
            baseline !== 0
        ) {
            const raw =
                ((latest - baseline) / Math.abs(baseline)) * 100;

            const improvement =
                test.direction === "lower" ? -raw : raw;

            if (improvement > 0) {
                changeText =
                    `↑ ${improvement.toFixed(1)}% improvement from baseline`;
                changeClass = "positive-change";
            } else if (improvement < 0) {
                changeText =
                    `↓ ${Math.abs(improvement).toFixed(1)}% decline from baseline`;
                changeClass = "negative-change";
            } else {
                changeText = "No change from baseline";
            }
        }

        card.innerHTML = `
            <div class="performance-left">
                <p class="panel-label">
                    ${test.target_area.toUpperCase()} TEST
                </p>

                <h3>${test.name}</h3>

                <div class="performance-score">
                    <strong>${latest}</strong>
                    <span>${test.unit ? ` ${test.unit}` : ""}</span>
                </div>

                <div class="${changeClass}">
                    ${changeText}
                </div>
            </div>
        `;
    }


    async function loadTrainingPageData() {        const preview =
            document.getElementById("generated-session-preview");

        if (preview && customSession.length > 0) {

            const difficulties = [
                ...new Set(
                    customSession
                        .map(drill => drill.difficulty)
                        .filter(Boolean)
                )
            ];

            const difficultyText =
                difficulties.length === 1
                    ? difficulties[0]
                    : "Mixed";

            preview.innerHTML = `
                <div class="session-card">

                    <div>
                        <span class="card-label">
                            CUSTOM SESSION
                        </span>

                        <h2>
                            ${customSessionName}
                        </h2>

                        <p>
                            ${customSession.length}
                            drill${customSession.length === 1 ? "" : "s"}
                            • ${difficultyText}
                        </p>
                    </div>

                    <button
                        class="primary-button"
                        id="start-custom-session"
                    >
                        START SESSION
                    </button>

                </div>

                <div class="panel">

                    <h3>Custom Session Drills</h3>

                    <div class="history-list">

                        ${customSession.map((drill, index) => `
                            <div class="history-item">

                                <div>
                                    <strong>
                                        ${index + 1}. ${drill.name}
                                    </strong>

                                    <span>
                                        ${drill.target_area}
                                        •
                                        ${drill.difficulty}
                                    </span>
                                </div>

                            </div>
                        `).join("")}

                    </div>

                </div>
            `;

            const startButton =
                document.getElementById(
                    "start-custom-session"
                );

            if (startButton) {

                startButton.addEventListener(
                    "click",
                    () => {

                        currentSession =
                            [...customSession];

                        currentSessionName =
                            customSessionName;

                        currentSessionArea =
                            "Custom";

                        currentDrillIndex = 0;

                        showTrainingSession();
                    }
                );
            }
        }

        const container =
            document.getElementById("training-recent-history");

        if (!container) return;

        try {
            const response = await fetch("/api/training-history");

            if (!response.ok) {
                throw new Error("Could not load recent training.");
            }

            trainingHistory = await response.json();
            if (!Array.isArray(trainingHistory)) trainingHistory = [];

            const recent = [...trainingHistory]
                .sort((a, b) =>
                    new Date(b.date || 0).getTime() -
                    new Date(a.date || 0).getTime()
                )
                .slice(0, 3);

            if (recent.length === 0) {
                container.innerHTML = `
                    <div class="panel">
                        <p>No completed training sessions yet.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = recent.map(session => {
                const drills = Number(session.drills_completed) || 0;

                return `
                    <div class="history-item">
                        <div>
                            <strong>
                                ${session.session_name || "Training Session"}
                            </strong>
                            <span>
                                ${formatShortTrainingDate(session.date)}
                                • ${drills} drill${drills === 1 ? "" : "s"}
                            </span>
                        </div>

                        <span class="status-complete">
                            ${session.status || "Completed"}
                        </span>
                    </div>
                `;
            }).join("");

        } catch (error) {
            console.error(error);

            container.innerHTML = `
                <div class="panel">
                    <p>Unable to load recent training.</p>
                </div>
            `;
        }
    }


    async function loadProfileData() {
        try {
            const response = await fetch("/api/training-history");

            if (!response.ok) {
                throw new Error("Could not load profile training data.");
            }

            trainingHistory = await response.json();
            if (!Array.isArray(trainingHistory)) trainingHistory = [];

            const sessions = trainingHistory.length;

            const drills = trainingHistory.reduce(
                (total, session) =>
                    total + (Number(session.drills_completed) || 0),
                0
            );

            const streak = calculateTrainingStreak(trainingHistory);

            const sessionsElement =
                document.getElementById("profile-session-count");

            const drillsElement =
                document.getElementById("profile-drill-count");

            const streakElement =
                document.getElementById("profile-streak");

            if (sessionsElement) {
                sessionsElement.textContent = sessions;
            }

            if (drillsElement) {
                drillsElement.textContent = drills;
            }

            if (streakElement) {
                streakElement.textContent =
                    `${streak} ${streak === 1 ? "day" : "days"}`;
            }

        } catch (error) {
            console.error(error);
        }
    }
async function fetchPlayerProfile() {
    const response = await fetch("/api/profile");

    if (!response.ok) {
        throw new Error("Unable to load player profile.");
    }

    const data = await response.json();

    playerProfile = {
        ...playerProfile,
        ...data
    };

    return playerProfile;
}
function updatePlayerIdentity() {
    const name = playerProfile.name || "Player";
    const position = playerProfile.position || "CAM";
    const level = playerProfile.playing_level || "Intermediate";

    const nameElement = document.getElementById("profile-player-name");
    const detailsElement = document.getElementById("profile-player-details");
    const avatarElement = document.getElementById("profile-player-avatar");

    if (nameElement) nameElement.textContent = name;
    if (detailsElement) detailsElement.textContent = `${position} • ${level}`;
    if (avatarElement) avatarElement.textContent = name.charAt(0).toUpperCase();
}
async function setupPlayerProfileForm() {

    const form =
        document.getElementById("player-profile-form");

    if (!form) return;

    const nameInput =
        document.getElementById("player-name");

    const positionInput =
        document.getElementById("player-position");

    const levelInput =
        document.getElementById("player-level");

    try {
        await fetchPlayerProfile();

        nameInput.value = playerProfile.name;
        positionInput.value = playerProfile.position;
        levelInput.value = playerProfile.playing_level;updatePlayerIdentity();


        

    } catch (error) {
        console.error(error);
        alert("Unable to load your saved profile.");
        return;
    }

    form.addEventListener("submit", async event => {

        event.preventDefault();

        const updatedProfile = {
            name: nameInput.value.trim(),
            position: positionInput.value,
            playing_level: levelInput.value
        };

        if (!updatedProfile.name) {
            alert("Please enter your name.");
            return;
        }

        const saveButton =
            form.querySelector('button[type="submit"]');

        saveButton.disabled = true;

        try {
            const response = await fetch("/api/profile", {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedProfile)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Unable to save profile."
                );
            }

            playerProfile = result.profile;updatePlayerIdentity();

            

            alert("Profile saved successfully.");

        } catch (error) {
            console.error(error);
            alert(error.message);

        } finally {
            saveButton.disabled = false;
        }
    });
}
    // =========================================================
    // TRAINING SESSION GENERATOR
    // =========================================================

    async function generateTrainingSessionPreview() {
        const areaSelect =
    document.getElementById("training-area-select");

const difficultySelect =
    document.getElementById("training-difficulty-select");

const lengthSelect =
    document.getElementById("training-length-select");

const preview =
    document.getElementById("generated-session-preview");

if (
    !areaSelect ||
    !difficultySelect ||
    !lengthSelect ||
    !preview
) {
    return;
}

currentSessionArea = areaSelect.value;

const selectedDifficulty =
    difficultySelect.value;

const selectedLength =
    Number(lengthSelect.value);
    currentSessionDuration = selectedLength;
currentSessionDifficulty =
    difficultySelect.value === "all"
        ? "Mixed"
        : difficultySelect.value;

let drillCount;
let minutesPerDrill;

if (selectedLength === 20) {
    drillCount = 2;
    minutesPerDrill = 10;

} else if (selectedLength === 30) {
    drillCount = 3;
    minutesPerDrill = 10;

} else if (selectedLength === 40) {
    drillCount = 4;
    minutesPerDrill = 10;

} else if (selectedLength === 60) {
    drillCount = 4;
    minutesPerDrill = 15;

} else {
    drillCount = 4;
    minutesPerDrill = 10;
}

currentSessionName =
    `${currentSessionArea} Development`;

        preview.innerHTML = `
            <div class="panel">
                <p>Generating ${currentSessionName}...</p>
            </div>
        `;

        try {
            const response = await fetch("/api/drills");

            if (!response.ok) {
                throw new Error("Could not load training drills.");
            }

            const allDrills = await response.json();

            if (!Array.isArray(allDrills)) {
                throw new Error("Invalid drill data received.");
            }

            const matchingDrills = allDrills.filter(drill => {

    const matchesArea =
        drill.target_area === currentSessionArea;

    const matchesDifficulty =
        selectedDifficulty === "all" ||
        String(drill.difficulty).toLowerCase() ===
        selectedDifficulty.toLowerCase();

    return matchesArea && matchesDifficulty;
});


// Shuffle the matching drills
const shuffledDrills = [...matchingDrills];

for (let i = shuffledDrills.length - 1; i > 0; i--) {

    const j =
        Math.floor(Math.random() * (i + 1));

    [
        shuffledDrills[i],
        shuffledDrills[j]
    ] = [
        shuffledDrills[j],
        shuffledDrills[i]
    ];
}


// Select the required number of drills
currentSession =
    shuffledDrills.slice(0, drillCount);

            currentDrillIndex = 0;

            if (currentSession.length === 0) {
                preview.innerHTML = `
                    <div class="panel">
                        <h3>No ${currentSessionArea} drills available</h3>
                        <p>
                            PitchIQ could not find drills for this area yet.
                        </p>
                    </div>
                `;
                return;
            }

            const difficulties = [
                ...new Set(
                    currentSession
                        .map(drill => drill.difficulty)
                        .filter(Boolean)
                )
            ];

            const difficultyText =
                difficulties.length === 1
                    ? difficulties[0]
                    : difficulties.length > 1
                        ? "Mixed"
                        : "Not specified";

            const estimatedDuration =
    selectedLength;

            preview.innerHTML = `
                <div class="session-card">
                    <div>
                        <span class="card-label">GENERATED SESSION</span>
                        <h2>${currentSessionName}</h2>
                        <p>
                            ${currentSession.length} drills
• Approximately ${estimatedDuration} minutes
• ${difficultyText}
                        </p>
                    </div>

                    <button
                        class="primary-button"
                        id="start-generated-session"
                    >
                        START SESSION
                    </button>
                </div>

                <div class="panel">
                    <h3>Session Drills</h3>

                    <div class="history-list">
                        ${currentSession.map((drill, index) => `
                            <div class="history-item">
                                <div>
                                    <strong>
                                        ${index + 1}. ${drill.name}
                                    </strong>
                                    <span>
                                        ${drill.target_area}
                                        • ${drill.difficulty}
                                    </span>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `;

            const startButton =
                document.getElementById("start-generated-session");

            if (startButton) {
                startButton.addEventListener("click", () => {
                    currentDrillIndex = 0;
                    showTrainingSession();
                });
            }

        } catch (error) {
            console.error(error);

            preview.innerHTML = `
                <div class="panel">
                    <p>Unable to generate your training session.</p>
                </div>
            `;
        }
    }


    // =========================================================
    // TRAINING HISTORY
    // =========================================================

    async function loadTrainingHistory() {
        const container = document.getElementById("training-history-list");
        if (!container) return;

        try {
            const response = await fetch("/api/training-history");
            if (!response.ok) throw new Error("Could not load training history.");

            trainingHistory = await response.json();
            if (!Array.isArray(trainingHistory)) trainingHistory = [];

            displayTrainingHistory();
        } catch (error) {
            console.error(error);
            container.innerHTML = `
                <div class="panel">
                    <p>Unable to load training history.</p>
                </div>
            `;
        }
    }


    function displayTrainingHistory() {
        const container = document.getElementById("training-history-list");
        if (!container) return;

        if (trainingHistory.length === 0) {
            container.innerHTML = `
                <div class="panel">
                    <p>No completed training sessions have been recorded yet.</p>
                </div>
            `;
            return;
        }

        const orderedHistory = [...trainingHistory].sort((a, b) => {
            return new Date(b.date || 0).getTime() -
                new Date(a.date || 0).getTime();
        });

        container.innerHTML = orderedHistory.map(session => {
            const parsedDate = new Date(session.date);

            const dateText = Number.isNaN(parsedDate.getTime())
                ? "Date not recorded"
                : parsedDate.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });

            const drillCount = Number(session.drills_completed) || 0;

            return `
                <div class="history-item">
                    <div>
                        <strong>${session.session_name || "Training Session"}</strong>
                        <span>
                            ${dateText}
                            • ${session.target_area || "General"}
                            • ${drillCount} drill${drillCount === 1 ? "" : "s"}
                        </span>
                    </div>
                    <span class="status-complete">
                        ${session.status || "Completed"}
                    </span>
                </div>
            `;
        }).join("");
    }


    async function saveCompletedTrainingSession() {
        if (currentSession.length === 0) return false;

        const targetArea =
            currentSessionArea ||
            currentSession[0]?.target_area ||
            "General";

        const sessionName =
            currentSessionName ||
            `${targetArea} Development`;

        const sessionData = {
            session_name: sessionName,
            target_area: targetArea,
            drills_completed: currentSession.length
        };

        try {
            const response = await fetch("/api/training-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sessionData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error || "Could not save training session."
                );
            }

            return true;
        } catch (error) {
            console.error(error);
            alert(
                "Your session was completed, but PitchIQ could not save it to training history."
            );
            return false;
        }
    }


    // =========================================================
    // START TRAINING SESSION
    // =========================================================

    function startTrainingSession() {
        loadPage("Training");
        setActiveNavigation("Training");
    }


    // =========================================================
    // TRAINING SESSION SCREEN
    // =========================================================

    function showTrainingSession() {

        if (
            currentSession.length === 0
        ) {

            mainContent.innerHTML = `
                <div class="panel">

                    <h2>
                        No drills available
                    </h2>

                    <p>
                        Please add some drills before
                        starting a session.
                    </p>

                    <button
                        class="secondary-button"
                        id="empty-session-back"
                    >
                        BACK TO TRAINING
                    </button>

                </div>
            `;

            const backButton =
                document.getElementById(
                    "empty-session-back"
                );

            if (backButton) {

                backButton.addEventListener(
                    "click",
                    () => {

                        loadPage("Training");

                        setActiveNavigation(
                            "Training"
                        );
                    }
                );
            }

            return;
        }

        if (
            currentDrillIndex < 0 ||
            currentDrillIndex >=
                currentSession.length
        ) {

            showSessionComplete();
            return;
        }

        const drill =
            currentSession[
                currentDrillIndex
            ];

        const totalDrills =
            currentSession.length;

        const progress =
            (
                currentDrillIndex /
                totalDrills
            ) * 100;

        mainContent.innerHTML = `

            <div class="page-header">

                <div>

                    <span class="card-label">
                        TRAINING SESSION
                    </span>

                    <h1>
                        ${currentSessionName}
                    </h1>

                    <p>
                        Drill
                        ${currentDrillIndex + 1}
                        of
                        ${totalDrills}
                    </p>

                </div>

                <button
                    class="secondary-button"
                    id="exit-session"
                >
                    EXIT SESSION
                </button>

            </div>

            <div class="panel training-session-panel">

                <div class="training-progress">

                    <div class="training-progress-bar">

                        <div
                            class="training-progress-fill"
                            style="width: ${progress}%"
                        ></div>

                    </div>

                    <small>
                        ${Math.round(progress)}%
                        complete
                    </small>

                </div>

                <div class="training-drill">

                    <span class="card-label">
                        ${drill.target_area}
                    </span>

                    <h2>
                        ${drill.name}
                    </h2>

                    <p>
                        ${drill.difficulty}
                    </p>

                </div>

                <div class="training-instructions">

                    <h3>
                        Instructions
                    </h3>

                    <p>
                        ${drill.instructions}
                    </p>

                </div>

                <div class="training-key-points">

                    <h3>
                        Focus Points
                    </h3>

                    <ul>

                        <li>
                            Stay controlled throughout the drill.
                        </li>

                        <li>
                            Focus on quality rather than rushing.
                        </li>

                        <li>
                            Try to replicate match intensity.
                        </li>

                    </ul>

                </div>

                <div class="training-actions">

                    <button
                        class="primary-button"
                        id="complete-drill"
                    >
                        COMPLETE DRILL
                    </button>

                </div>

            </div>
        `;

        const completeButton =
            document.getElementById(
                "complete-drill"
            );

        if (completeButton) {

            completeButton.addEventListener(
                "click",
                completeCurrentDrill
            );
        }

        const exitButton =
            document.getElementById(
                "exit-session"
            );

        if (exitButton) {

            exitButton.addEventListener(
                "click",
                () => {

                    if (
                        confirm(
                            "Are you sure you want to leave this session?"
                        )
                    ) {

                        currentSession = [];
                        currentDrillIndex = 0;
                        currentSessionArea = "First Touch";
                        currentSessionName = "First Touch Development";

                        loadPage("Dashboard");

                        setActiveNavigation(
                            "Dashboard"
                        );
                    }
                }
            );
        }
    }


    // =========================================================
    // COMPLETE CURRENT DRILL
    // =========================================================

    function completeCurrentDrill() {

        const button =
            document.getElementById(
                "complete-drill"
            );

        if (button) {

            button.textContent =
                "✓ DRILL COMPLETED";

            button.disabled = true;
        }

        setTimeout(
            () => {

                currentDrillIndex++;

                if (
                    currentDrillIndex >=
                    currentSession.length
                ) {

                    showSessionComplete();

                } else {

                    showTrainingSession();
                }

            },
            700
        );
    }


    // =========================================================
    // SESSION COMPLETE
    // =========================================================

    async function showSessionComplete() {

        const completedDrillCount = currentSession.length;

        await saveCompletedTrainingSession();

        mainContent.innerHTML = `

            <div class="session-complete">

                <div class="completion-icon">
                    ✓
                </div>

                <span class="card-label">
                    SESSION COMPLETE
                </span>

                <h1>
                    Great work.
                </h1>

                <p>
                    You've completed your
                    ${currentSessionName} session.
                </p>

                <div class="completion-stats">

                    <div class="stat-card">

                        <span class="stat-label">
                            DRILLS
                        </span>

                        <strong>
                            ${completedDrillCount}
                        </strong>

                    </div>

                    <div class="stat-card">

                        <span class="stat-label">
                            STATUS
                        </span>

                        <strong>
                            100%
                        </strong>

                    </div>

                    <div class="stat-card">

                        <span class="stat-label">
                            STREAK
                        </span>

                        <strong>
                            🔥 7
                        </strong>

                    </div>

                </div>

                <div class="completion-actions">

                    <button
                        class="primary-button"
                        id="finish-session"
                    >
                        BACK TO TRAINING
                    </button>

                    <button
                        class="secondary-button"
                        id="view-history"
                    >
                        VIEW HISTORY
                    </button>

                </div>

            </div>
        `;

        const finishButton =
            document.getElementById(
                "finish-session"
            );

        if (finishButton) {

            finishButton.addEventListener(
                "click",
                () => {

                    currentSession = [];
                    currentDrillIndex = 0;
                    currentSessionArea = "First Touch";
                    currentSessionName = "First Touch Development";

                    loadPage("Training");

                    setActiveNavigation(
                        "Training"
                    );
                }
            );
        }

        const historyButton =
            document.getElementById(
                "view-history"
            );

        if (historyButton) {

            historyButton.addEventListener(
                "click",
                () => {

                    currentSession = [];
                    currentDrillIndex = 0;
                    currentSessionArea = "First Touch";
                    currentSessionName = "First Touch Development";

                    loadPage("History");

                    setActiveNavigation(
                        "History"
                    );
                }
            );
        }
    }


    // =========================================================
    // SET ACTIVE NAVIGATION
    // =========================================================

    function setActiveNavigation(pageName) {

        navItems.forEach(nav => {

            const text =
                nav
                    .querySelector(
                        "span:last-child"
                    )
                    ?.textContent
                    .trim();

            nav.classList.toggle(
                "active",
                text === pageName
            );
        });
    }


    // =========================================================
    // INITIAL PAGE
    // =========================================================

    // =========================================================
// INITIAL PAGE
// =========================================================

loadDevelopmentFocus().then(() => {
    loadPage("Dashboard");
});
setActiveNavigation("Dashboard");

});