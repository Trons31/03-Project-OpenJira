import axios from "axios";



 const entriesApi = axios.create({
    baseURL: '/api' // defnimos un baseURL y como nuestro APIRESTFULL sale del mismo servidor solo colocamos /api porque lo tenemos en la raiz de nuestra aplicacion
})


export default entriesApi; 