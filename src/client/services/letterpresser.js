import * as BaseAPI from './baseApi';

export const getWordsForGameRequest = board =>
    BaseAPI.generateApiGet(`/api/game/wordsForGame/${board}`)
        .then(response => response.map(word => word.toUpperCase()));

export const getRandomGameRequest = () =>
    BaseAPI.generateApiGet('/api/game/randomGame')
        .then(response => response.toUpperCase());


export const getRandomGame = () =>
    BaseAPI.call(getRandomGameRequest.bind(this));

export const getWordsForGame = board =>
    BaseAPI.call(getWordsForGameRequest.bind(this, board));


