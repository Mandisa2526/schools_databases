CREATE OR REPLACE FUNCTION link_teacher_to_subject(
    teacher_id_param INT,
    subject_id_param INT
)
RETURNS VOID AS
$$
BEGIN
    -- Check if the teacher is already linked to the subject
    IF EXISTS (
        SELECT 1
        FROM teacher_subject
        WHERE teacher_id = teacher_id_param
        AND subject_id = subject_id_param
    ) THEN
        -- If the teacher is already linked to the subject, do nothing
        RETURN;
    ELSE
        -- Otherwise, insert the new link into the teacher_subject table
        INSERT INTO teacher_subject (teacher_id, subject_id)
        VALUES (teacher_id_param, subject_id_param);
    END IF;
END;
$$
LANGUAGE plpgsql;
