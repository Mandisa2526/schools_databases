
import pgPromise from 'pg-promise';
import assert from 'assert';
import LearnersImpl from '../LearnersImpl';
import 'dotenv/config';
import { Context } from 'mocha';
import { ILearner, ISubject, ITeacher } from '../interface/Ilearner';
import { log } from 'console';

const pgp = pgPromise();
const config = {
    connectionString: process.env.DB_URL as string,

};

const db = pgp(config);

const learnersImpl = new LearnersImpl(db);

describe('LearnersImpl', () => {
    beforeEach(async function (this: Context) {

        try {
            this.timeout(1000000);
            await db.query("TRUNCATE TABLE learners , subject ,teacher, teacher_subject RESTART IDENTITY CASCADE");
            await db.query(`
                INSERT INTO subject(name) VALUES ('Mathematics');
                INSERT INTO subject(name) VALUES ('Geography');
                INSERT INTO subject(name) VALUES ('Life Sciences');
                INSERT INTO subject(name) VALUES ('History');
                INSERT INTO subject(name) VALUES ('Consumer Studies');
                INSERT INTO subject(name) VALUES ('Accounting');
                INSERT INTO subject(name) VALUES ('Economics');
                INSERT INTO subject(name) VALUES ('Physical Sciences');
            `)
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
    
    it('should create a subject', async function () {
        const result = await learnersImpl.createSubject('Life Orientation');
        assert.equal(result, true);

        const subjects: ISubject[] = await learnersImpl.findSubjects();
        assert.equal(subjects.length, 9);
        assert.deepEqual(subjects.find(subject => subject.name === 'Life Orientation'), { id: 9, name: 'Life Orientation' });
    });
    it('should create and fetch subjects', async function () {
        const subjects: ISubject[] = await learnersImpl.findSubjects();
        log(subjects)
        assert.equal(subjects.length, 8);
        assert.deepEqual(subjects, [
            { id: 1, name: 'Mathematics' },
            { id: 2, name: 'Geography' },
            { id: 3, name: 'Life Sciences' },
            { id: 4, name: 'History' },
            { id: 5, name: 'Consumer Studies' },
            { id: 6, name: 'Accounting' },
            { id: 7, name: 'Economics' },
            { id: 8, name: 'Physical Sciences' },

        ]);
    });
    it('should create and fetch a learner', async () => {
        const learner = await learnersImpl.createLearner({
            firstName: 'John',
            lastName: 'Doe',
            email: 'doe@gmail.com'
        });
        assert.equal(true, learner);

        const learners = await learnersImpl.fetchLearners();
        const fetchedLearner = learners.find(l => l.email === 'doe@gmail.com');
        assert.deepEqual(
            {
                "id": 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'doe@gmail.com'
            },
            fetchedLearner
        );
    });


    it('should create and fetch more learners', async function (this: Context) {
        await learnersImpl.createLearner({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
        });
        let learners = await learnersImpl.fetchLearners();
        assert.equal(1, learners.length);

        await learnersImpl.createLearner({
            id: 1,
            firstName: 'Tom',
            lastName: 'Smith',
            email: 'tom.smith@example.com',
        });
        learners = await learnersImpl.fetchLearners();
        assert.equal(2, learners.length);
    });
    it('should add a teacher', async function () {
        const result = await learnersImpl.addTeacher({
            id: 1,
            firstName: 'Tom',
            lastName: 'Smith',
            email: 'tom.smith@example.com',
        });
        assert.equal(result, true);

        const teachers: ITeacher[] = await learnersImpl.findTeachersForSubject(1);  // Assuming subject 1 has no teachers linked yet
        assert.equal(teachers.length, 0);
    });

    it('should link teacher to subject', async function () {
        // Add teacher
        const teacherResult = await learnersImpl.addTeacher({
            firstName: 'Linda',
            lastName: 'Pani',
            email: 'lindani@email.com',
        });
        assert.equal(teacherResult, true);

        // Get inserted teacher ID
        const teacherId = (await db.one("SELECT id FROM teacher WHERE email = 'lindani@email.com'")).id;

        // Link teacher to subject
        const linkResult = await learnersImpl.linkTeacherToSubject(1, teacherId);
        assert.equal(linkResult, true);

        // Find teachers for the subject
        const teachers: ITeacher[] = await learnersImpl.findTeachersForSubject(1);
        assert.equal(teachers.length, 1);
        assert.deepEqual(teachers, [{
            id: teacherId,
            firstName: 'Linda',
            lastName: 'Pani',
            email: 'lindani@email.com',
        }]);
    });

});