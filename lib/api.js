const axios = require('axios').default;

module.exports = class TodoistApi {
    url = 'https://api.todoist.com/rest';
    version = 'v2';
    constructor(token) {
        this.token = token;
    }
    request({ path, method = 'get', headers = {}, ...rest }) {
        return axios.request({
            method,
            url: `${this.url}/${this.version}/${path}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`,
                ...headers,
            },
            ...rest,
        });
    }
    getTasks(params) {
        return this.request({
            method: 'get',
            path: 'tasks',
            params,
        });
    }
    createTask(data) {
        return this.request({
            method: 'post',
            path: 'tasks',
            data,
        });
    }
    getTags() {
        return this.request({
            path: 'labels',
        });
    }
};
