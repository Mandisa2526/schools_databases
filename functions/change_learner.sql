CREATE OR REPLACE FUNCTION changeLearnerSchool(learner_id INT, school_id INT)
RETURNS VOID AS $$
BEGIN
    -- Check if the learner is currently linked to any school
    IF EXISTS (
        SELECT 1
        FROM learner_school
        WHERE learner_id = $1 AND current_school = TRUE
    ) THEN
        -- Mark the current link as not current
        UPDATE learner_school
        SET current_school = FALSE
        WHERE learner_id = $1 AND current_school = TRUE;
        
        -- Insert a new link and set it as the current school
        INSERT INTO learner_school (learner_id, school_id, current_school)
        VALUES ($1, $2, TRUE);
    END IF;
END;
$$ LANGUAGE plpgsql;