import axios from 'axios'
class Api {
    // constructor() { }
    constructor() {
        this.token = window.localStorage.getItem('token');
        let userData = window.localStorage.getItem('user');
        if (userData !== 'undefined') {
            this.user = userData ? JSON.parse(userData) : null;
            if (this.token !== null) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
                // console.log('token')
                // console.log(this.token)
                axios.defaults.headers.common['api-token'] = this.token;
            }
        }
        // if (this.token) {
        //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        //     this.getUser();
        // }
    }

    call(requestType, url, data = null) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, data)
                .then(response => {
                    resolve(response);

                })
                .catch(({ response }) => {
                    if (response.status === 401) {
                        auth.logout();
                    }
                    reject(response);
                });
        });
    }
}

export default Api;