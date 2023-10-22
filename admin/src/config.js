let API_BASE_URL;

if (process.env.NODE_ENV === 'development') {
    API_BASE_URL = 'http://localhost:5000/api/v1'; 
} else if (process.env.NODE_ENV === 'production') {
    API_BASE_URL = 'http://142.93.244.189/api/v1'; 
}

export { API_BASE_URL };
