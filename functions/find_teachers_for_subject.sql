create or replace function find_teachers_for_subject ( subject_name TEXT)

returns table (
	teacher_id INT,
    first_name TEXT,
    last_name TEXT,
    email TEXT
	) as
$$
begin

return query
	select teacher.id,
        teacher.first_name,
        teacher.last_name,
        teacher.email
    from 
        teacher
	join 
       teacher_subject on teacher.id = teacher_subject.teacher_id
	join 
       subject on teacher_subject.subject_id = subject.id;
    WHERE
       subject.name = subject_name;
end;
$$
Language plpgsql;