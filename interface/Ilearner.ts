export  interface ILearner {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    gradeId?: number;
  
}
export interface ILearner {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
}

// ISubject interface
export interface ISubject {
    id?: number;
    name: string;
}

// ITeacher interface
export interface ITeacher {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ILearnersImpl {
    
    createLearner(learner: ILearner): Promise<boolean>;
    fetchLearners(): Promise<ILearner[]>;
    createLearner(learner: ILearner): Promise<boolean>;
    fetchLearners(): Promise<ILearner[]>;
    findSubjects(): Promise<ISubject[]>;
    createSubject(name: string): Promise<boolean>;
    addTeacher(teacher: ITeacher): Promise<boolean>;
    linkTeacherToSubject(subjectId: number, teacherId: number): Promise<boolean>;
    findTeachersForSubject(subjectId: number): Promise<ITeacher[]>;
    
}

