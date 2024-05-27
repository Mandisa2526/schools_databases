
CREATE OR REPLACE FUNCTION find_teachers_teaching_multiple_subjects(num_subjects INT)
RETURNS TABLE (
    teacher_id INT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    num_subjects_taught INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        teacher.id AS teacher_id,
        teacher.first_name,
        teacher.last_name,
        teacher.email,
        COUNT(teacher_subject.subject_id)::INT AS num_subjects_taught
    FROM
        teacher
    JOIN
        teacher_subject ON teacher.id = teacher_subject.teacher_id
    GROUP BY
        teacher.id
    HAVING
        COUNT(teacher_subject.subject_id) = num_subjects;
END;
$$ LANGUAGE plpgsql;
