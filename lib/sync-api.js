const axios = require('axios').default;

module.exports = class TodoistSyncApi {
    url = 'https://api.todoist.com/sync';
    version = 'v9';
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
    getItem(item_id) {
        return this.request({
            method: 'get',
            path: 'items/get',
            params: {
                item_id,
            },
        });
    }
    getCompleted(params) {
        return this.request({
            method: 'get',
            path: 'completed/get_all',
            params,
        });
    }
    getCompletedToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.getCompleted({
            since: today.toISOString(),
        });
    }
};
