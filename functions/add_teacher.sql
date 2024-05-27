create or replace function add_teacher (the_firstName text,the_lastName text,the_email text)

returns boolean as
$$
declare
-- declare a variable to be used in the function
total int;

begin

 -- Check if the email already exists in the teacher table
    SELECT COUNT(*) INTO total FROM teacher WHERE LOWER(email) = LOWER(the_email);

    -- If the email is not unique, return false
    IF total > 0 THEN
        RETURN FALSE;
    ELSE
        -- Otherwise, insert the new teacher into the teacher table
        INSERT INTO teacher (first_name, last_name, email) VALUES (the_firstName, the_lastName, the_email);
        RETURN TRUE;
    END IF;
END;
$$
LANGUAGE plpgsql;  