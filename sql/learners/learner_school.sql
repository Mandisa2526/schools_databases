CREATE TABLE learner_school (
    id SERIAL PRIMARY KEY,
    learner_id INT NOT NULL,
    school_id INT NOT NULL,
    current_school BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (learner_id) REFERENCES learners (learner_id),
    FOREIGN KEY (school_id) REFERENCES schools (school_id),
    UNIQUE (learner_id, school_id)
);

