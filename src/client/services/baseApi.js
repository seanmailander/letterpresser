import Promise from 'bluebird';
import request from 'superagent-bluebird-promise';

export const generateApiPost = (url, data) =>
    request.post(url)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(data)
        .then(response => {
            return response.body;
        })
        .catch(error => Promise.reject(error));

export const generateApiGet = (url) =>
    request.get(url)
        .set('Accept', 'application/json')
        .then(response => {
            return response.body;
        })
        .catch(error => Promise.reject(error));

export function call(apiFunction) {
    return new Promise((resolve, reject) => {
        return apiFunction().then((results) => {
            resolve(results);
            return results;
        }).catch((error) => {
            reject(error);
            return null;
        });
    });
}