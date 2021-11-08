import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-myapp-8774a-default-rtdb.asia-southeast1.firebasedatabase.app',
    headers: {
            Authorization: 'Auth Token',
        },
    },);

export default instance;