export type Player = {
    username: string,
    host: boolean,
    ready: boolean,
    choice: string,
    correctAnswers: {[key: string]: number}
    answerCount: {[key: string]: number},
    lastAnswerWasCorrect: boolean,
}