import axios from 'axios';

const USER_LOGIN = 'USER_LOGIN';
const USER_REGISTER = 'USER_REGISTER';
const SURE_REQUEST = 'SURE_REQUEST';
const FETCHING = 'FETCHING';
const VAULT = "VAULTING";
const URL = "http:127.0.0.1:8080/";
const MESSAGE = 'MESSAGE';


const INSTANCE = axios.create({
    baseURL: URL,
    timeout: 20000,
    headers: {'Content-Type': 'Application/json'}
  });

export
{
    USER_LOGIN,
    USER_REGISTER,
    SURE_REQUEST,
    FETCHING,
    VAULT,
    MESSAGE,
    INSTANCE
};