# =========================================================
# PITCHIQ DRILL LIBRARY
# =========================================================


class Drill:
    """
    Represents a football training drill.
    """

    def __init__(
        self,
        name,
        target_area,
        instructions,
        difficulty
    ):
        self.name = name
        self.target_area = target_area
        self.instructions = instructions
        self.difficulty = difficulty


# =========================================================
# DRILL LIBRARY
# =========================================================

def get_drill_library():
    """
    Return all available PitchIQ training drills.
    """

    return [

        # =================================================
        # FIRST TOUCH
        # =================================================

        Drill(
            name="Wall Touch Control",
            target_area="First Touch",
            instructions=(
                "Pass the ball firmly against a wall and control "
                "the return with your first touch. Alternate between "
                "your left and right foot. Focus on keeping the ball "
                "close enough to play your next pass immediately."
            ),
            difficulty="Beginner"
        ),

        Drill(
            name="Directional First Touch",
            target_area="First Touch",
            instructions=(
                "Pass the ball against a wall and use your first touch "
                "to move the ball into a new direction before returning "
                "the pass. Alternate between controlling inside, outside "
                "and across your body."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Two-Touch Wall Passing",
            target_area="First Touch",
            instructions=(
                "Use a wall to repeatedly receive and return the ball "
                "using a maximum of two touches. Your first touch should "
                "prepare the ball and your second touch should complete "
                "the pass."
            ),
            difficulty="Beginner"
        ),

        Drill(
            name="One-Touch Reaction Passing",
            target_area="First Touch",
            instructions=(
                "Stand a short distance from a wall and continuously "
                "return the ball using one touch. Alternate feet and "
                "adjust your body position quickly after every pass."
            ),
            difficulty="Advanced"
        ),


        # =================================================
        # DRIBBLING
        # =================================================

        Drill(
            name="Cone Slalom",
            target_area="Dribbling",
            instructions=(
                "Place several cones in a straight line with roughly "
                "one metre between each cone. Dribble through the cones "
                "using small touches with both feet while keeping the "
                "ball under close control."
            ),
            difficulty="Beginner"
        ),

        Drill(
            name="Close Control Box",
            target_area="Dribbling",
            instructions=(
                "Create a small square using four cones. Dribble inside "
                "the area while frequently changing direction. Use the "
                "inside, outside and sole of both feet while keeping "
                "your touches controlled."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Explosive Dribble",
            target_area="Dribbling",
            instructions=(
                "Begin with the ball under close control. Perform a "
                "change of direction or skill move and then accelerate "
                "with the ball for several metres. Reset and repeat "
                "using both sides."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Speed Slalom",
            target_area="Dribbling",
            instructions=(
                "Set up a line of cones and dribble through them at "
                "high speed. Keep the ball close enough to change "
                "direction quickly while attempting to complete each "
                "run faster without losing control."
            ),
            difficulty="Advanced"
        ),


        # =================================================
        # PASSING
        # =================================================

        Drill(
            name="Wall Passing",
            target_area="Passing",
            instructions=(
                "Pass repeatedly against a wall from a controlled "
                "distance. Concentrate on accurate passes into the same "
                "target area while alternating between both feet."
            ),
            difficulty="Beginner"
        ),

        Drill(
            name="Passing Gates",
            target_area="Passing",
            instructions=(
                "Create several small gates using pairs of cones. Pass "
                "the ball through each gate from different angles and "
                "distances. Focus on accuracy and correct passing weight."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Weak Foot Passing",
            target_area="Passing",
            instructions=(
                "Complete repeated passes using only your weaker foot. "
                "Focus on clean contact, body position and accuracy "
                "before gradually increasing the speed of each pass."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Rapid One-Touch Passing",
            target_area="Passing",
            instructions=(
                "Pass against a wall using one touch whenever possible. "
                "Maintain a quick rhythm while keeping each pass accurate. "
                "Alternate feet throughout the drill."
            ),
            difficulty="Advanced"
        ),


        # =================================================
        # SHOOTING
        # =================================================

        Drill(
            name="Placed Finishing",
            target_area="Shooting",
            instructions=(
                "Choose specific target areas inside the goal and take "
                "controlled shots aimed at those areas. Prioritise "
                "accuracy and technique before increasing power."
            ),
            difficulty="Beginner"
        ),

        Drill(
            name="Weak Foot Finishing",
            target_area="Shooting",
            instructions=(
                "Take repeated shots using only your weaker foot. "
                "Concentrate on balance, clean contact and placement. "
                "Gradually increase the speed of the approach."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Dribble and Finish",
            target_area="Shooting",
            instructions=(
                "Dribble towards goal at speed, perform a change of "
                "direction around a cone and finish immediately. "
                "Practise finishing from different angles with both feet."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Quick Release Finishing",
            target_area="Shooting",
            instructions=(
                "Receive or set the ball and attempt to shoot with as "
                "few touches as possible. Focus on preparing your body "
                "before the ball arrives and releasing the shot quickly."
            ),
            difficulty="Advanced"
        ),


        # =================================================
        # SPEED
        # =================================================

        Drill(
            name="Acceleration Sprints",
            target_area="Speed",
            instructions=(
                "Perform short explosive sprints over 10 to 15 metres. "
                "Start from different positions and focus on powerful "
                "first steps, forward body lean and rapid acceleration."
            ),
            difficulty="Beginner"
        ),

        Drill(
            name="Ball Acceleration",
            target_area="Speed",
            instructions=(
                "Start with the ball stationary and accelerate with it "
                "for 10 to 15 metres. Push the ball into space while "
                "maintaining enough control to continue running at speed."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Change of Direction Sprint",
            target_area="Speed",
            instructions=(
                "Set up cones at different angles. Sprint towards each "
                "cone, plant your foot, change direction sharply and "
                "accelerate towards the next cone."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Repeated Sprint Training",
            target_area="Speed",
            instructions=(
                "Complete several short maximum-effort sprints with "
                "controlled recovery periods between repetitions. "
                "Attempt to maintain your speed across every sprint."
            ),
            difficulty="Advanced"
        ),


        # =================================================
        # AGILITY
        # =================================================

        Drill(
            name="Four Cone Agility",
            target_area="Agility",
            instructions=(
                "Create a square using four cones. Move quickly between "
                "the cones using forward runs, lateral movements and "
                "changes of direction while maintaining balance."
            ),
            difficulty="Beginner"
        ),

        Drill(
            name="Reactive Direction Change",
            target_area="Agility",
            instructions=(
                "Set up several cones around a central starting point. "
                "Use random commands, numbers or colours to determine "
                "which cone you move towards before returning to the centre."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Agility With Ball",
            target_area="Agility",
            instructions=(
                "Complete quick changes of direction through a cone setup "
                "while dribbling. Keep your centre of gravity low and use "
                "both feet to move the ball efficiently."
            ),
            difficulty="Intermediate"
        ),

        Drill(
            name="Explosive Agility Circuit",
            target_area="Agility",
            instructions=(
                "Combine short sprints, lateral movements, sharp turns "
                "and accelerations through a cone circuit. Complete each "
                "movement explosively while maintaining good technique."
            ),
            difficulty="Advanced"
        )

    ]