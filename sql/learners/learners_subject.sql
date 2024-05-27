create table teacher_subject (
	learner_id int not null,
	subject_id int not null,
	foreign key (learner_id) references learner(id),
	foreign key (subject_id) references subject(id)
);                                              