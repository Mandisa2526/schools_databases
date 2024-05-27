CREATE OR REPLACE FUNCTION getLearnersCurrentSchool(learner_id INT)
RETURNS VARCHAR AS $$
DECLARE
    school_name VARCHAR;
BEGIN
    SELECT s.school_name
    INTO school_name
    FROM learner_school ls
    JOIN schools s ON ls.school_id = s.school_id
    WHERE ls.learner_id = $1 AND ls.current_school = TRUE;

    RETURN school_name;
END;
$$ LANGUAGE plpgsql;

