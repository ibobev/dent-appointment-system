import axios from "axios";
export default {
  data() {
    return {
      get token() {
        return localStorage.getItem("token") || sessionStorage.getItem("token");
      },
      get role() {
        return localStorage.getItem("role") || sessionStorage.getItem("role");
      },
      setToken(token, persistant = false) {
        if (persistant) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      },
      setRole(role, persistant = false) {
        if (persistant) {
          localStorage.setItem("role", role);
        } else {
          sessionStorage.setItem("role", role);
        }
      },
      deleteToken() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      },
    };
  },
}