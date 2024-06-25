create table teacher_subject (
	teacher_id int not null,
	subject_id int not null,
	foreign key (teacher_id) references teacher(id),
	foreign key (subject_id) references subject(id)
);                                              

--select * from teacher
--	join teacher_subject on teacher.id = teacher_subject.teacher_id
--	join subject on teacher_subject.subject_id = subject.id
--where subject.name = 'Maths';

--select 
--	teacher.* 
--from teacher
 	--join teacher_subject on teacher.id = teacher_subject.teacher_id
	--j--oin subject on teacher_subject.subject_id = subject.id
--where 
--	subject.name = 'Mathematics';
