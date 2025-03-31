const BASE_URL = "http://localhost:5000/api"; 

export function signUp(userData) {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    }).then(response => response.json());
}


export function signIn(userData) {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    }).then(response => response.json());
}


export function updatePassword(userData) {
    return fetch(`${BASE_URL}/updatePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    }).then(response => response.json());
}