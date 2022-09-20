interface Result {
    periodLength: number,
    trainingDays: number,
    succes: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


export const calculateExercises = (objective: number ,days: Array<number>): Result => {
    const length= days.length;
    const training= days.filter(d => d!=0).length;
    const average = days.reduce((before, actual) =>before+actual, 0 )/length;
    const succes = average >= objective ? true : false;
    const ratingPorcent = average/ objective;
    const rating = ratingPorcent > 0.66 ? 3 : ratingPorcent > 0.33 ? 2 : 1;
    let ratingDescription;
    switch (rating) {
        case 1:
            ratingDescription= 'Bad';
            break;
        case 2:
            ratingDescription= 'not too bad but could be better';
            break;
        case 3:
            ratingDescription= 'Good';
            break;
    }

    return {
        periodLength: length,
        trainingDays: training,
        succes: succes,
        rating: rating,
        ratingDescription: ratingDescription,
        target: objective,
        average: average
    };
};

