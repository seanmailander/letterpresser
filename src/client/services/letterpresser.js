import * as BaseAPI from './baseApi';

export const getWordsForGameRequest = board =>
    BaseAPI.generateApiGet(`/api/wordsForGame?board=${board}`)
        .then(response => response.map(word => word.toUpperCase()));

export const getRandomGameRequest = () =>
    BaseAPI.generateApiGet('/api/randomGame')
        .then(response => response.toUpperCase());


export const getRandomGame = () =>
    BaseAPI.call(getRandomGameRequest.bind(this));

export const getWordsForGame = board =>
    BaseAPI.call(getWordsForGameRequest.bind(this, board));


