const sendAjax = (method, api, data) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, api, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.responseType = 'json';
    let promise = new Promise((resolve, reject) => {
        xhr.onload = () => {
            const res = xhr.response;
            if (xhr.status === 200) {
                resolve(res);
            } else {
                reject(res || xhr.status);
            }
        };
        xhr.onerror = (err) => {
            reject(err);
        };
    });
    promise = promise.catch((err) => { return Promise.reject({reject: err}); });
    promise.abort = () => {
        xhr.abort();
    };
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
    return promise;
};
const sendAjaxCallback = (method, api, data, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, api, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.responseType = 'json';
    xhr.onload = () => {
        const res = xhr.response;
        if (xhr.status === 200) {
            callback(res);
        } else {
            callback(undefined, res || xhr.status);
        }
    };
    xhr.onerror = (err) => {
        callback(undefined, err);
    };
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
};
const postAjax = (api, data) => {
    return sendAjax('POST', api, data);
};
const getAjax = (api) => {
    return sendAjax('GET', api);
};
const deleteAjax = (api) => {
    return sendAjax('DELETE', api);
};

export default {sendAjax, postAjax, getAjax, deleteAjax, sendAjaxCallback};