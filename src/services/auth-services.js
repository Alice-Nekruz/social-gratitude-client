import axios from 'axios';

class AuthService {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        });
    }


    register = (username, password, name, gender, hobbies,imageUrl) => {
        return this.service.post('/register', { username, password, name, gender, hobbies, imageUrl }).then(response => response.data);
    };


    loggedin = () => {
        return this.service.get('/loggedin').then(response => response.data);
    };


    login = (username, password) => {
        return this.service.post('/login', { username, password }).then(response => response.data);
    };


    logout = () => {
        return this.service.post('/logout', {}).then(response => response.data);
    };

}



// class AuthService is used to organize and group the methods.
// To get an object containing all the methods we just need to
// instantiate the new AuthService object.
const authService = new AuthService();

export default authService;