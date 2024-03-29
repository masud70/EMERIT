import Toast from 'react-native-toast-message';
import { BASE_URL } from '@env';

export default {
    getUserData: async token => {
        const url = BASE_URL + '/user/getUserData';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token
                }
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return {
                status: false,
                message: 'Trere was an error. Please try again.'
            };
        }
    },

    showToast: (type, head, body) => {
        Toast.show({
            type: type,
            text1: head,
            text2: body
        });
    },

    showToast2: (status, message) => {
        Toast.show({
            type: status ? 'success' : 'error',
            text1: status ? 'Success' : 'Error',
            text2: message
        });
    },

    uploadImage: async (data, token) => {
        let fd = new FormData();
        fd.append('image', data);
        const imgUploadUrl = BASE_URL + '/upload';
        try {
            const response = await fetch(imgUploadUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: 'Bearer ' + token
                },
                body: fd
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    updateUser: async (data, token) => {
        const url = BASE_URL + '/user/update';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token
                },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    createContest: async (data, token) => {
        const url = BASE_URL + '/contest/create';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token
                },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    findContest: async token => {
        const url = BASE_URL + '/contest/find';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token
                }
            });
            const content = await response.json();
            console.log(content);
            return content;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    getAllContest: async id => {
        const url = BASE_URL + '/contest/getAll/' + id;
        try {
            const response = await fetch(url);
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    filterContest: (data, type) => {
        switch (type) {
            case 'upcoming': {
                return data.filter(item => parseInt(item.start) > new Date().getTime() / 1000);
            }
            case 'live': {
                return data.filter(
                    item =>
                        parseInt(item.start) < new Date().getTime() / 1000 &&
                        parseInt(item.start) + parseInt(item.duration) * 60 >
                            new Date().getTime() / 1000
                );
            }
            case 'ended': {
                return data.filter(
                    item =>
                        parseInt(item.start) + parseInt(item.duration) * 60 <
                        new Date().getTime() / 1000
                );
            }
        }
    },

    addNewQuestion: async data => {
        const url = BASE_URL + '/contest/question/add';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: error.message };
        }
    },

    registerContest: async (data, token) => {
        const url = BASE_URL + '/contest/register';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + token
                },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            return content;
        } catch (error) {
            return { status: false, message: error.message };
        }
    }
};
