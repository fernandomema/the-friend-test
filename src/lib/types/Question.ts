export enum QuestionType {
    choice = 0,
    boolean,
    input,
    number
}

export type Choice = {
    text: string,
}

export type Question = {
    type: QuestionType,
    question: string,
    choices?: Choice[]
    placeholder?: string,
    defaultValue?: string,
    confidenceLevel?: number,
}