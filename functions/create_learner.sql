CREATE OR REPLACE FUNCTION create_learner(the_first_name VARCHAR, the_last_name VARCHAR, the_email VARCHAR)
RETURNS BOOLEAN AS
$$
DECLARE
    email_count INT;
BEGIN
    SELECT COUNT(*) INTO email_count FROM learners WHERE (learner).email = the_email;

    IF email_count > 0 THEN
        RETURN FALSE;
    END IF;

    INSERT INTO learners (learner) VALUES (ROW(the_first_name, the_last_name, the_email)::learner_type);
    RETURN TRUE;
END;
$$
LANGUAGE plpgsql;

