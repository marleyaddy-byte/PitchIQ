# PitchIQ — Football Training & Player Development App

**PitchIQ** is a full-stack football training application designed to help aspiring and intermediate footballers take a more structured approach to individual development.

The application allows players to identify areas for improvement, discover relevant training drills, create personalised sessions, and track their development over time.

This is an independently developed personal project, built to combine my interest in football with practical software development.

## Features

### Player Profiles
- Create and manage a personalised football profile.
- Record playing position and experience level.
- Identify areas of performance to improve.

### Training Drill Library
- Browse football drills targeting different technical and physical skills.
- View drill instructions and difficulty levels.
- Find exercises relevant to individual development goals.

### Personalised Training Sessions
- Select drills to build individual training sessions.
- Organise training around specific areas for improvement.
- Record completed sessions and training notes.

### Performance Tracking
- Access football performance tests.
- Record results to monitor individual progress.
- Review previous training sessions and performance history.

## Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend application logic |
| Flask | Web framework and API endpoints |
| JavaScript | Frontend functionality and interaction |
| HTML | Application structure |
| CSS | Styling and responsive interface |
| JSON | Local data storage |
| REST APIs | Communication between frontend and backend |

## Project Structure

```text
PitchIQ/
├── app.py                 # Flask application and API routes
├── drills.py              # Football drill library
├── tests.py               # Performance test library
├── main.py                # Additional Python application code
├── frontend/
│   ├── index.html         # Main application interface
│   ├── style.css          # Application styling
│   ├── app.js             # Frontend logic
│   └── images/            # Training drill images
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Python 3
- Flask

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/marleyaddy-byte/PitchIQ.git
```

**2. Navigate to the project folder**

```bash
cd PitchIQ
```

**3. Install Flask**

```bash
pip install flask
```

**4. Start the application**

```bash
python app.py
```

**5. Open the application**

Visit:

http://127.0.0.1:5000

The application runs locally using Flask.

## What I Learned

Developing PitchIQ helped me strengthen my understanding of:

- **Full-stack development:** Connecting a Python backend with an interactive JavaScript frontend.
- **API development:** Creating Flask endpoints to retrieve and manage application data.
- **Data persistence:** Using JSON files to store player profiles, training information and performance results.
- **Frontend development:** Building interfaces using HTML, CSS and JavaScript.
- **Debugging:** Identifying and resolving problems involving application state, user interaction and data handling.
- **Software organisation:** Separating application functionality into reusable Python modules and frontend files.
- **Version control:** Using Git and GitHub to manage and publish source code.

## Future Improvements

Potential future developments include:

- User accounts and authentication.
- Database integration to replace local JSON storage.
- Interactive charts for visualising performance improvements.
- More advanced personalised drill recommendations.
- Deployment to a cloud hosting platform.
- Mobile-friendly enhancements.

## About the Developer

Developed by **Marley Addy**, a BSc (Hons) Computer Science student at London South Bank University.

PitchIQ was created as a personal project to develop practical programming skills and demonstrate the application of software engineering concepts to a real-world problem.

**GitHub:** https://github.com/marleyaddy-byte
