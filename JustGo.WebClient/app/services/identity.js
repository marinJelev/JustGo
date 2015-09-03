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
    localStorage.setItem('token', token);
}

export default {
    getCurrentUser,
    setCurrentUser,
    getToken,
    setToken
};
