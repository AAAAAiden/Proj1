const BASE_URL = "http://localhost:5001/api"; 

export function signUp(userData) {
    return fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    }).then(response => response.json());
}


export function signIn(userData) {
    return fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    }).then(response => response.json());
}

