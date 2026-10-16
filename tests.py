# =========================================================
# PITCHIQ
# PERFORMANCE TEST LIBRARY
# =========================================================


class PerformanceTest:
    def __init__(
        self,
        test_id,
        name,
        target_area,
        description,
        unit,
        direction,
        minimum,
        maximum
    ):
        self.id = test_id
        self.name = name
        self.target_area = target_area
        self.description = description
        self.unit = unit

        # "higher" = a larger score is better
        # "lower" = a smaller score is better
        self.direction = direction

        self.minimum = minimum
        self.maximum = maximum


def get_test_library():

    return [

        # =================================================
        # FIRST TOUCH
        # =================================================

        PerformanceTest(
            test_id=1,
            name="First Touch Control Test",
            target_area="First Touch",
            description=(
                "Complete as many successful controlled first touches "
                "as possible. Record the total number of successful "
                "repetitions."
            ),
            unit="reps",
            direction="higher",
            minimum=0,
            maximum=100
        ),

        # =================================================
        # DRIBBLING
        # =================================================

        PerformanceTest(
            test_id=2,
            name="Cone Dribbling Test",
            target_area="Dribbling",
            description=(
                "Complete the cone dribbling course as quickly as "
                "possible while maintaining control of the ball. "
                "Record your completion time."
            ),
            unit="seconds",
            direction="lower",
            minimum=1,
            maximum=120
        ),

        # =================================================
        # PASSING
        # =================================================

        PerformanceTest(
            test_id=3,
            name="Passing Accuracy Test",
            target_area="Passing",
            description=(
                "Attempt a set number of passes towards the target. "
                "Record the total number of successful accurate passes."
            ),
            unit="successful passes",
            direction="higher",
            minimum=0,
            maximum=50
        ),

        # =================================================
        # SHOOTING
        # =================================================

        PerformanceTest(
            test_id=4,
            name="Shooting Accuracy Test",
            target_area="Shooting",
            description=(
                "Take a set number of shots towards the target areas "
                "of the goal. Record how many shots successfully hit "
                "the target areas."
            ),
            unit="successful shots",
            direction="higher",
            minimum=0,
            maximum=50
        ),

        # =================================================
        # SPEED
        # =================================================

        PerformanceTest(
            test_id=5,
            name="20 Metre Sprint",
            target_area="Speed",
            description=(
                "Sprint 20 metres as quickly as possible from a "
                "stationary start. Record your completion time in "
                "seconds."
            ),
            unit="seconds",
            direction="lower",
            minimum=1,
            maximum=20
        ),

        # =================================================
        # AGILITY
        # =================================================

        PerformanceTest(
            test_id=6,
            name="Agility Course Test",
            target_area="Agility",
            description=(
                "Complete the change-of-direction agility course as "
                "quickly as possible. Record your completion time "
                "in seconds."
            ),
            unit="seconds",
            direction="lower",
            minimum=1,
            maximum=120
        )
    ]