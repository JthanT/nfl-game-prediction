import React from 'react';

const outcomeConfidenceCategories = {
    close: "Close Win",
    convincing: "Convincing Win",
    landslide: "Landslide Victory"
};

const calculateGradeDifferential = (awayTeamGrade: number, homeTeamGrade: number) => {
    if (awayTeamGrade > homeTeamGrade) {
        return awayTeamGrade - homeTeamGrade;
    } else if (awayTeamGrade < homeTeamGrade) {
        return homeTeamGrade - awayTeamGrade;
    } else {
        return 0;
    }
}

export const outcomeConfidence = (awayTeamGrade: number, homeTeamGrade: number) => {
    const gradeDifferencial = calculateGradeDifferential(awayTeamGrade, homeTeamGrade);

    if (gradeDifferencial > 0) {
        if (gradeDifferencial >= 30) {
            return outcomeConfidenceCategories.landslide;
        } else if (gradeDifferencial < 30 && gradeDifferencial >= 15) {
            return outcomeConfidenceCategories.convincing;
        } else {
            return outcomeConfidenceCategories.close;
        }
    }
}
