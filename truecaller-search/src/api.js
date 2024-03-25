import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || '';
console.log("🚀 ~ baseURL:", baseURL)
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common.Accept = 'application/json'

const api = {
    loginApi: (mobile) => {
        return axios.post("/login", { mobile });
    },
    verifyOTP: (mobile, loginData, otp) => {
        return axios.post("/verifyOTP", { mobile, loginData, otp });
    },
    search: (mobile, countryCode) => {
        return axios.post("/search", { mobile, countryCode });
    },
    verifyInstallation: () => {
        return axios.post("/verifyInstallation");
    },
    clearInstallationId : () =>{
        return axios.get("/clearInstallationId");
    }
}

export default api;