CREATE OR REPLACE FUNCTION linkLearnerToSchool(learner_id INT, school_id INT)
RETURNS VOID AS $$
BEGIN
    -- Mark all previous links as not current
    UPDATE learner_school
    SET current_school = FALSE
    WHERE learner_school.learner_id = $1 AND current_school = TRUE;

    -- Check if the learner is already linked to the new school
    IF NOT EXISTS (
        SELECT 1
        FROM learner_school
        WHERE learner_school.learner_id = $1 AND learner_school.school_id = $2
    ) THEN
        -- Insert a new link and set it as the current school
        INSERT INTO learner_school (learner_id, school_id, current_school)
        VALUES ($1, $2, TRUE);
    ELSE
        -- If already linked, just update the current_school flag
        UPDATE learner_school
        SET current_school = TRUE
        WHERE learner_school.learner_id = $1 AND learner_school.school_id = $2;
    END IF;
END;
$$ LANGUAGE plpgsql;



