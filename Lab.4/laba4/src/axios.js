import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase (use your existing firebaseConfig.js)
const firebaseConfig = {
  apiKey: "AIzaSyCP8r-SBvgAAQJmKedgMjYztk27Lt3Csv0",
  authDomain: "lab4-64f30.firebaseapp.com",
  projectId: "lab4-64f30",
  storageBucket: "lab4-64f30.firebasestorage.app",
  messagingSenderId: "669754879256",
  appId: "1:669754879256:web:422a3bee5e51374079826d",
  measurementId: "G-80WLNHXN5W"
};

// Initialize Firebase
initializeApp(firebaseConfig);
getAnalytics();

const api = axios.create({
  baseURL: "http://localhost:5173/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Fetch token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const refreshedToken = await user.getIdToken(true); // Refresh the token
          localStorage.setItem("accessToken", refreshedToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${refreshedToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;
          return api(originalRequest);
        } else {
          signOut(auth); // Sign out the user if no user is logged in
          window.location.href = "/login"; // Redirect to login page
        }
      } catch (tokenRefreshError) {
        return Promise.reject(tokenRefreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
