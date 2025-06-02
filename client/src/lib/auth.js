import {
  signOut as firebaseSignOut,
  onAuthStateChanged,

  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from '../firebase-config';

const API_BASE_URL = 'http://localhost:3001';

export async function registerUserWithBackend(email, password, firstName) {
    try {
        const backendResponse = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, firstName }),
        });
        const backendData = await backendResponse.json();

        if (!backendResponse.ok) {
            throw new Error(backendData.message || 'Registrasi via backend gagal.');
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();

        localStorage.setItem('idToken', idToken);
        localStorage.setItem('currentUser', JSON.stringify({
            uid: user.uid,
            email: user.email,
            firstName: firstName, 
        }));

        return { success: true, message: backendData.message || "Registrasi berhasil! Anda akan diarahkan untuk login." };
    } catch (error) {
        console.error("Error in registerUserWithBackend:", error);
        localStorage.removeItem('idToken');
        localStorage.removeItem('currentUser');
        return { success: false, message: error.message || "Terjadi kesalahan saat registrasi." };
    }
}

export async function loginUserWithClientAndBackend(clientEmail, clientPassword) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, clientEmail, clientPassword);
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        const backendResponse = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });
        const backendData = await backendResponse.json();

        if (!backendResponse.ok) {
            throw new Error(backendData.message || 'Verifikasi login di backend gagal.');
        }
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('currentUser', JSON.stringify({
            uid: backendData.uid,
            email: backendData.email,
            firstName: backendData.firstName,
        }));

        return { success: true, message: backendData.message || "Login berhasil!" };
    } catch (error) {
        console.error("Error in loginUserWithClientAndBackend:", error);
        localStorage.removeItem('idToken');
        localStorage.removeItem('currentUser');
        return { success: false, message: error.message || "Email atau password salah." };
    }
}

export async function loginWithGoogleAndBackend() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const idToken = await user.getIdToken();
        const backendResponse = await fetch(`${API_BASE_URL}/auth/google-signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ googleIdToken: idToken }),
        });
        const backendData = await backendResponse.json();

        if (!backendResponse.ok) {
            throw new Error(backendData.message || 'Login Google via backend gagal.');
        }

        localStorage.setItem('idToken', idToken);
        localStorage.setItem('currentUser', JSON.stringify({
            uid: backendData.uid,
            email: backendData.email,
            firstName: backendData.firstName,
        }));

        return { success: true, message: backendData.message || "Login dengan Google berhasil!" };
    } catch (error) {
        console.error("Error in loginWithGoogleAndBackend:", error);
        localStorage.removeItem('idToken');
        localStorage.removeItem('currentUser');
        if (error.code === 'auth/popup-closed-by-user') {
            return { success: false, message: "Proses login Google dibatalkan." };
        }
        return { success: false, message: error.message || "Login dengan Google gagal." };
    }
}


export async function logoutUser() {
    try {
        await firebaseSignOut(auth); 
    } catch (error) {
        console.error("Error signing out from Firebase:", error);
    }
    localStorage.removeItem('idToken');
    localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

export function getIdToken() {
    return localStorage.getItem('idToken');
}

export async function fetchProtectedApi(endpoint, options = {}) {
    const token = getIdToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        console.warn("Unauthorized API access or token expired. Logging out.");
        logoutUser();
        const errorData = await response.json();
        throw new Error(errorData.message || "Sesi tidak valid.");
    }

    return response; 
}

export function onFirebaseAuthStateChanged(callback) {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const idToken = await user.getIdToken(true);
                localStorage.setItem('idToken', idToken);
                const currentUser = getCurrentUser();
                if (currentUser && currentUser.uid === user.uid) {
                     callback({ ...currentUser, firebaseUser: user });
                } else {
                    callback({ uid: user.uid, email: user.email, firebaseUser: user });
                }

            } catch (error) {
                console.error("Error refreshing ID token on auth state change:", error);
                logoutUser(); 
                callback(null);
            }
        } else {
            logoutUser(); 
            callback(null);
        }
    });
}