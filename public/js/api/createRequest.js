const { json } = require("express");

function createRequest (options = {}) {
    return new Promise((resolve,reject)=> {
        const xhr = new XMLHttpRequest ();
        xhr.responseType = 'json';
        xhr.open (options.method || 'GET', options.url);
        xhr.setRequestHeader ('Content-Type', 'application/json');
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve (xhr.response);
            } else{
                reject (xhr.response);
            }
        };
        xhr.onerror = () => {
            reject (new Error('Network Error'));
        };
        xhr.send (JSON.stringify (options.data));
    });
}

