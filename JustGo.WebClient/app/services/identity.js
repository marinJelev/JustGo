function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

function getToken(){
    return localStorage.getItem('token')
}

function setToken(token){
    localStorage.setItem('token', username);
}

export default {
    getCurrentUser,
    setCurrentUser,
    getToken,
    setToken
};
