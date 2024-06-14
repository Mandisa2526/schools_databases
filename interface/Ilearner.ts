export  interface ILearner {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    gradeId: number;
}

export interface ILearnersImpl {
    createLearner(learner: ILearner): Promise<boolean>;
    fetchLearners(): Promise<ILearner[]>;
}