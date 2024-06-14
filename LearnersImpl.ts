import {ILearner, ILearnersImpl} from './interface/Ilearner';
import pgPromise from 'pg-promise';


class LearnersImpl implements ILearnersImpl {
    private db: pgPromise.IDatabase<any>;

    constructor(db: pgPromise.IDatabase<any>) {
        this.db = db;
    }

    async createLearner(learner: ILearner): Promise<boolean> {
        const query = "SELECT create_learner($1, $2, $3)";
        const results = await this.db.oneOrNone(query, [learner.firstName, learner.lastName, learner.email]);
        return results.create_learner;
    }

    async fetchLearners(): Promise<ILearner[]> {
        const query = "SELECT (learner).first_name, (learner).last_name, (learner).email FROM learners";
        const learnersData = await this.db.any(query);
        const learners: ILearner[] = learnersData.map((row: any) => ({
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email,
            gradeId: 1 // Example value for gradeId, adjust as per your application logic
        }));
        return learners;
    }
}

export default LearnersImpl;

