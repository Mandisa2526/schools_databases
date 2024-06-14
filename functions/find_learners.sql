CREATE OR REPLACE FUNCTION find_learners(
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_email TEXT DEFAULT NULL
)
RETURNS TABLE(
    learner_id INT,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        l.learner_id,
        (l.learner).first_name,
        (l.learner).last_name,
        (l.learner).email
    FROM
        learners l
    WHERE
        (p_first_name IS NULL OR (l.learner).first_name ILIKE '%' || p_first_name || '%')
        AND (p_last_name IS NULL OR (l.learner).last_name ILIKE '%' || p_last_name || '%')
        AND (p_email IS NULL OR (l.learner).email ILIKE '%' || p_email || '%');
END;
$$ LANGUAGE plpgsql;



