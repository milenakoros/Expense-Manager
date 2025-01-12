import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            Swal.fire({
                icon: "warning",
                title: "Sesja wygasła",
                text: "Twoja sesja wygasła. Zostaniesz przeniesiony na stronę główną.",
                confirmButtonText: "OK",
            }).then(() => {
                window.location.href = "/";
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
