
import { ILearner, ILearnersImpl, ISubject, ITeacher } from './interface/Ilearner';
import pgPromise from 'pg-promise';


class LearnersImpl implements ILearnersImpl {
    private db: pgPromise.IDatabase<any>;

    constructor(db: pgPromise.IDatabase<any>) {
        this.db = db;
    }
    async createLearner(learner: ILearner): Promise<boolean> {
        const query = "INSERT INTO learners (learner) VALUES (ROW($1, $2, $3)::learner_type)";
        try {
            await this.db.none(query, [learner.firstName, learner.lastName, learner.email]);
            return true;
        } catch (error) {
            console.error('Error creating learner:', error);
            return false;
        }
    }

    async fetchLearners(): Promise<ILearner[]> {
        const query = "SELECT learner_id, (learner).first_name, (learner).last_name, (learner).email FROM learners";
        try {
            const learnersData = await this.db.any(query);
            return learnersData.map((row: any) => ({
                id: row.learner_id,
                firstName: row.first_name,
                lastName: row.last_name,
                email: row.email,
            }));
        } catch (error) {
            console.error('Error fetching learners:', error);
            return [];
        }
    }
    
    async findSubjects(): Promise<ISubject[]> {
        const query = "SELECT id, name FROM subject";
        try {
            const subjectsData = await this.db.any(query);
            const subjects: ISubject[] = subjectsData.map((row: any) => ({
                id: row.id,
                name: row.name
            }));
            return subjects;
        } catch (error) {
            console.error('Error finding subject:', error);
            return [];
        }
    }

    async createSubject(name: string): Promise<boolean> {
        const query = "INSERT INTO subject (name) VALUES ($1)";
        try {
            await this.db.none(query, [name]);
            return true;
        } catch (error) {
            console.error('Error creating subject:', error);
            return false;
        }
    }

    async addTeacher(teacher: ITeacher): Promise<boolean> {
        const query = "INSERT INTO teacher (first_name, last_name, email) VALUES ($1,$2,$3)";
        try {
            await this.db.none(query, [teacher.firstName, teacher.lastName, teacher.email]);
            return true;
        } catch (error) {
            console.error('Error adding teacher:', error);
            return false;
        }
    }

    async linkTeacherToSubject(subjectId: number, teacherId: number): Promise<boolean> {
        const query = "INSERT INTO  teacher_subject (subject_id, teacher_id) VALUES ($1, $2)";
        try {
            await this.db.none(query, [subjectId, teacherId]);
            return true;
        } catch (error) {
            console.error('Error linking teacher to subject:', error);
            return false;
        }
    }

    async findTeachersForSubject(subjectId: number): Promise<ITeacher[]> {
        const query = `
            SELECT t.id, t.first_name, t.last_name, t.email
            FROM teacher t
            JOIN teacher_subject st ON t.id = st.teacher_id
            WHERE st.subject_id = $1
        `;
        try {
            const teachersData = await this.db.any(query, [subjectId]);
            const teachers: ITeacher[] = teachersData.map((row: any) => ({
                id: row.id,
                firstName: row.first_name,
                lastName: row.last_name,
                email: row.email
            }));
            return teachers;
        } catch (error) {
            console.error('Error finding teachers for subject:', error);
            return [];
        }
        

        // Other methods remain the same
    }
}

export default LearnersImpl;


