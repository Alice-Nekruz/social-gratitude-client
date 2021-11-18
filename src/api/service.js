import axios from 'axios';

class ImgService {
    constructor(){
        this.service = axios.create({
            // make sure you use PORT = 5005 (the port where our server is running)
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true // => you might need this when having the users in the app
        });
    }
    
    errorHandler = err => {
        throw err;
    };
    
    handleUpload = file => {
        return this.service.post('/upload', file).then(res => res.data)
    };
}
    
const imgService = new ImgService();
export default imgService
