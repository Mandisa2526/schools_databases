
import pgPromise from 'pg-promise';
import assert from 'assert';
import LearnersImpl from '../LearnersImpl'
import { ILearner } from '../interface/Ilearner';
import 'dotenv/config';
import { Context } from 'mocha';

const pgp = pgPromise();
const config = {
    connectionString: process.env.DB_URL as string,
};

const db = pgp(config);

const learnersImpl = new LearnersImpl(db);

describe("LearnersImpl", () => {
    // Initialize the greetable instance
    it("should create and fetch a learner", async function (this: Context){
        this.timeout(100000);

        const learner: ILearner = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            gradeId: 0
        };
        const created = await learnersImpl.createLearner(learner);
        assert.equal(created, true);

        const learners = await learnersImpl.fetchLearners();
        assert.deepEqual(learners.find(l => l.email === learner.email), learner);
    });

    it("should create and fetch more learners", async () => {
        const learner1: ILearner = {
            firstName: "Jane",
            lastName: "Doe",
            email: "jane.doe@example.com",
            gradeId: 0
        };
        await learnersImpl.createLearner(learner1);
        let learners = await learnersImpl.fetchLearners();
        assert.equal(learners.length, 2); // Assuming the previous test created one learner

        const learner2: ILearner = {
            firstName: "Alice",
            lastName: "Smith",
            email: "alice.smith@example.com",
            gradeId: 0
        };
        await learnersImpl.createLearner(learner2);
        learners = await learnersImpl.fetchLearners();
        assert.equal(learners.length, 3); // Now we should have three learners
    });
});