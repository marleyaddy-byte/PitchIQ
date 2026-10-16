from flask import Flask, send_from_directory, jsonify, request
from drills import get_drill_library
from tests import get_test_library

import json
import os
from datetime import datetime


# =========================================================
# APPLICATION SETUP
# =========================================================

app = Flask(
    __name__,
    static_folder="frontend",
    static_url_path=""
)


# =========================================================
# DATA FILE
# =========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_FILE = os.path.join(
    BASE_DIR,
    "data.json"
)


# =========================================================
# LOAD DATA
# =========================================================

def load_data():
    """
    Load persistent PitchIQ data.

    If data.json is missing, empty, invalid or contains
    malformed sections, return a safe structure.
    """

    default_data = {
        "test_results": [],
        "training_history": []
    }

    if not os.path.exists(DATA_FILE):
        return default_data

    try:
        with open(
            DATA_FILE,
            "r",
            encoding="utf-8"
        ) as file:

            content = file.read().strip()

            if not content:
                return default_data

            data = json.loads(content)

            if not isinstance(data, dict):
                return default_data

            if "test_results" not in data:
                data["test_results"] = []

            if not isinstance(
                data["test_results"],
                list
            ):
                data["test_results"] = []

            if "training_history" not in data:
                data["training_history"] = []

            if not isinstance(
                data["training_history"],
                list
            ):
                data["training_history"] = []

            return data

    except (
        json.JSONDecodeError,
        OSError
    ) as error:

        print(
            f"Could not load data.json: {error}"
        )

        return default_data


# =========================================================
# SAVE DATA
# =========================================================

def save_data(data):
    """
    Save PitchIQ data to data.json.
    """

    try:
        with open(
            DATA_FILE,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                data,
                file,
                indent=4,
                ensure_ascii=False
            )

        return True

    except OSError as error:

        print(
            f"Could not save data.json: {error}"
        )

        return False


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def home():

    return send_from_directory(
        app.static_folder,
        "index.html"
    )


# =========================================================
# DRILLS API
# =========================================================

@app.route(
    "/api/drills",
    methods=["GET"]
)
def get_drills():

    try:

        drills = get_drill_library()

        drill_data = []

        for drill in drills:

            drill_data.append({
                "name": getattr(
                    drill,
                    "name",
                    ""
                ),
                "target_area": getattr(
                    drill,
                    "target_area",
                    ""
                ),
                "instructions": getattr(
                    drill,
                    "instructions",
                    ""
                ),
                "difficulty": getattr(
                    drill,
                    "difficulty",
                    ""
                )
            })

        return jsonify(drill_data)

    except Exception as error:

        print(
            f"Error loading drills: {error}"
        )

        return jsonify({
            "error": "Unable to load drills."
        }), 500


# =========================================================
# PERFORMANCE TESTS API
# =========================================================

@app.route(
    "/api/tests",
    methods=["GET"]
)
def get_tests():

    try:

        tests = get_test_library()

        test_data = []

        for index, test in enumerate(
            tests,
            start=1
        ):

            test_id = getattr(
                test,
                "id",
                index
            )

            test_data.append({
                "id": test_id,
                "name": getattr(
                    test,
                    "name",
                    ""
                ),
                "target_area": getattr(
                    test,
                    "target_area",
                    ""
                ),
                "description": getattr(
                    test,
                    "description",
                    ""
                ),
                "unit": getattr(
                    test,
                    "unit",
                    ""
                ),
                "direction": getattr(
                    test,
                    "direction",
                    "higher"
                ),
                "minimum": getattr(
                    test,
                    "minimum",
                    0
                ),
                "maximum": getattr(
                    test,
                    "maximum",
                    100
                )
            })

        return jsonify(test_data)

    except Exception as error:

        print(
            f"Error loading performance tests: {error}"
        )

        return jsonify({
            "error":
                "Unable to load performance tests."
        }), 500


# =========================================================
# GET TEST RESULTS
# =========================================================

@app.route(
    "/api/test-results",
    methods=["GET"]
)
def get_test_results():

    data = load_data()

    results = data.get(
        "test_results",
        []
    )

    return jsonify(results)


# =========================================================
# SAVE TEST RESULT
# =========================================================

@app.route(
    "/api/test-results",
    methods=["POST"]
)
def save_test_result():

    submitted_data = request.get_json(
        silent=True
    )

    if not isinstance(
        submitted_data,
        dict
    ):

        return jsonify({
            "error": "Invalid JSON data."
        }), 400

    test_id = submitted_data.get(
        "test_id"
    )

    score = submitted_data.get(
        "score"
    )

    notes = submitted_data.get(
        "notes",
        ""
    )

    if test_id is None:

        return jsonify({
            "error": "A test ID is required."
        }), 400

    if score is None:

        return jsonify({
            "error": "A score is required."
        }), 400

    try:

        score = float(score)

    except (
        TypeError,
        ValueError
    ):

        return jsonify({
            "error": "Score must be a number."
        }), 400

    if notes is None:
        notes = ""

    notes = str(notes).strip()

    # Find the requested performance test.
    try:

        available_tests = get_test_library()

        selected_test = None

        for index, test in enumerate(
            available_tests,
            start=1
        ):

            current_id = getattr(
                test,
                "id",
                index
            )

            if str(current_id) == str(test_id):
                selected_test = test
                break

        if selected_test is None:

            return jsonify({
                "error":
                    "Performance test does not exist."
            }), 404

    except Exception as error:

        print(
            f"Error validating test: {error}"
        )

        return jsonify({
            "error":
                "Unable to validate performance test."
        }), 500

    # Validate score using the test's own limits.
    minimum = getattr(
        selected_test,
        "minimum",
        0
    )

    maximum = getattr(
        selected_test,
        "maximum",
        100
    )

    if score < minimum or score > maximum:

        return jsonify({
            "error":
                f"Score must be between "
                f"{minimum} and {maximum}."
        }), 400

    result = {
        "test_id": test_id,
        "score": score,
        "notes": notes,
        "date": datetime.now().isoformat(
            timespec="seconds"
        )
    }

    data = load_data()

    data["test_results"].append(
        result
    )

    if not save_data(data):

        return jsonify({
            "error":
                "Unable to save test result."
        }), 500

    return jsonify({
        "message":
            "Test result saved successfully.",
        "result":
            result
    }), 201


# =========================================================
# GET TRAINING HISTORY
# =========================================================

@app.route(
    "/api/training-history",
    methods=["GET"]
)
def get_training_history():

    data = load_data()

    history = data.get(
        "training_history",
        []
    )

    return jsonify(history)


# =========================================================
# SAVE COMPLETED TRAINING SESSION
# =========================================================

@app.route(
    "/api/training-history",
    methods=["POST"]
)
def save_training_session():

    submitted_data = request.get_json(
        silent=True
    )

    if not isinstance(
        submitted_data,
        dict
    ):

        return jsonify({
            "error":
                "Invalid JSON data."
        }), 400

    session_name = str(
        submitted_data.get(
            "session_name",
            ""
        )
    ).strip()

    target_area = str(
        submitted_data.get(
            "target_area",
            ""
        )
    ).strip()

    drills_completed = submitted_data.get(
        "drills_completed"
    )

    if not session_name:

        return jsonify({
            "error":
                "Session name is required."
        }), 400

    if not target_area:

        return jsonify({
            "error":
                "Target area is required."
        }), 400

    try:

        drills_completed = int(
            drills_completed
        )

    except (
        TypeError,
        ValueError
    ):

        return jsonify({
            "error":
                "Drills completed must be a number."
        }), 400

    if drills_completed < 1:

        return jsonify({
            "error":
                "At least one drill must be completed."
        }), 400

    session = {
        "session_name":
            session_name,

        "target_area":
            target_area,

        "drills_completed":
            drills_completed,

        "status":
            "Completed",

        "date":
            datetime.now().isoformat(
                timespec="seconds"
            )
    }

    data = load_data()

    data["training_history"].append(
        session
    )

    if not save_data(data):

        return jsonify({
            "error":
                "Unable to save training session."
        }), 500

    return jsonify({
        "message":
            "Training session saved successfully.",

        "session":
            session
    }), 201

# =========================================================
# PLAYER PROFILE API
# =========================================================

DEFAULT_PROFILE = {
    "name": "Player",
    "position": "CAM",
    "playing_level": "Intermediate"
}

VALID_POSITIONS = {
    "GK", "CB", "LB", "RB", "CDM",
    "CM", "CAM", "LW", "RW", "ST"
}

VALID_LEVELS = {
    "Beginner", "Intermediate", "Advanced", "Semi-Pro"
}


@app.route("/api/profile", methods=["GET"])
def get_player_profile():

    data = load_data()

    profile = data.get("profile", {})

    if not isinstance(profile, dict):
        profile = {}

    return jsonify({
        **DEFAULT_PROFILE,
        **profile
    })


@app.route("/api/profile", methods=["PUT"])
def update_player_profile():

    submitted = request.get_json(silent=True)

    if not isinstance(submitted, dict):
        return jsonify({
            "error": "Invalid profile data."
        }), 400

    name = submitted.get("name")
    position = submitted.get("position")
    playing_level = submitted.get("playing_level")

    if not isinstance(name, str):
        return jsonify({
            "error": "Name must be text."
        }), 400

    name = name.strip()

    if not 1 <= len(name) <= 60:
        return jsonify({
            "error": "Name must contain 1–60 characters."
        }), 400

    if position not in VALID_POSITIONS:
        return jsonify({
            "error": "Invalid football position."
        }), 400

    if playing_level not in VALID_LEVELS:
        return jsonify({
            "error": "Invalid playing level."
        }), 400

    profile = {
        "name": name,
        "position": position,
        "playing_level": playing_level
    }

    data = load_data()
    data["profile"] = profile

    if not save_data(data):
        return jsonify({
            "error": "Unable to save profile."
        }), 500

    return jsonify({
        "message": "Profile updated successfully.",
        "profile": profile
    })

# =========================================================
# DEVELOPMENT FOCUS API
# =========================================================

VALID_FOCUS_AREAS = {
    "First Touch",
    "Dribbling",
    "Passing",
    "Shooting",
    "Speed",
    "Agility"
}

DEFAULT_FOCUS = [
    "First Touch",
    "Dribbling",
    "Shooting"
]


@app.route("/api/development-focus", methods=["GET"])
def get_development_focus():
    data = load_data()

    focus = data.get("development_focus", DEFAULT_FOCUS)

    if (
        not isinstance(focus, list)
        or not 1 <= len(focus) <= 3
        or any(area not in VALID_FOCUS_AREAS for area in focus)
        or len(set(focus)) != len(focus)
    ):
        focus = DEFAULT_FOCUS.copy()

    return jsonify({"development_focus": focus})


@app.route("/api/development-focus", methods=["PUT"])
def update_development_focus():
    submitted = request.get_json(silent=True)

    if not isinstance(submitted, dict):
        return jsonify({"error": "Invalid JSON data."}), 400

    focus = submitted.get("development_focus")

    if (
        not isinstance(focus, list)
        or not 1 <= len(focus) <= 3
        or any(
            not isinstance(area, str)
            or area not in VALID_FOCUS_AREAS
            for area in focus
        )
        or len(set(focus)) != len(focus)
    ):
        return jsonify({
            "error": "Select 1 to 3 unique, valid development areas."
        }), 400

    data = load_data()
    data["development_focus"] = focus

    if not save_data(data):
        return jsonify({
            "error": "Unable to save development focus."
        }), 500

    return jsonify({
        "message": "Development focus saved successfully.",
        "development_focus": focus
    })

# =========================================================
# 404 ERROR
# =========================================================

@app.errorhandler(404)
def page_not_found(error):

    return jsonify({
        "error":
            "Resource not found."
    }), 404


# =========================================================
# 500 ERROR
# =========================================================

@app.errorhandler(500)
def server_error(error):

    return jsonify({
        "error":
            "Internal server error."
    }), 500


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )