CREATE OR REPLACE FUNCTION getSchoolsForLearner(learner_id INT)
RETURNS TABLE(school_name VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT s.school_name
    FROM learner_school ls
    JOIN schools s ON ls.school_id = s.school_id
    WHERE ls.learner_id = $1;
END;
$$ LANGUAGE plpgsql;
