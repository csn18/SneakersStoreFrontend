export const createUserBackend = (data, password) => {
    const requestData = {
        ...data,
        username: data.email
    }
    const url = "http://localhost:8000/auth/users/";
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(requestData),
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.username[0] === 'A user with that username already exists.') {
                return console.log(data.username[0])
            }
            loginUser(data, password)
        })
}

export const loginUser = (data) => {
    let username = data.email;
    let password = data.password;
    const userData = {
        'username': username,
        'password': password,
    }

    const refresh = localStorage.getItem('refreshToken');
    if (refresh) {
        refreshAccessToken(refresh, userData)
    } else {
        getAccessToken(username, password);
    }
}

const getAccessToken = (username, password) => {
    let data = {
        'username': username,
        'password': password,
    }
    const url = "http://localhost:8000/api/token/";
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('accessToken', data.access)
            localStorage.setItem('refreshToken', data.refresh)
            return window.location.reload();
        });
}

export const refreshAccessToken = (token, userData) => {
    const data = {
        'refresh': token
    }
    const url = "http://localhost:8000/api/token/refresh/";
    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            if (data.code === 'token_not_valid') {
                return getAccessToken(userData.username, userData.password)
            }
            if (data.access) {
                localStorage.setItem('accessToken', data.access);
                return window.location.reload();
            }
        });
}