import { store } from '../redux/store/store';
import { PATH } from '../redux/action/constants';
import axios from 'axios';


async function GetState(id){
    //return value;
    const AUTH = axios.create({
        baseURL: `${PATH}`,
        timeout: 20000,
        headers: {
                  'Content-Type': 'application/json', 
                   'Accept': 'application/json',
                   'Authorization': `Bearer ${store.getState().root.token}`
                }
    });
    return AUTH.get(`state/${id}`)
    .then(async (response) => {
        //dispatch({ type: REQUEST_STATUS  });
        if(response.data.status === 'success'){
            return response.data.states
            //dispatch({ type: STATES, payload: response.data });
            //alert(JSON.stringify(response.data));
        }else {
            
        }
    }).catch(err => {
        //dispatch({ type: REQUEST_STATUS  });
    }); 
}


async function AllGetcities(id){
    //alert(id);
    const AUTH = axios.create({
        baseURL: `${PATH}`,
        timeout: 20000,
        headers: {
                  'Content-Type': 'application/json', 
                   'Accept': 'application/json',
                   'Authorization': `Bearer ${store.getState().root.token}`
                }
    });
    return AUTH.get(`city/${id}`)
    .then(async (response) => {
        //dispatch({ type: REQUEST_STATUS  });
        if(response.data.status === 'success'){
            //alert(JSON.stringify(response.data));
            return response.data.cities
            //dispatch({ type: STATES, payload: response.data });
            //alert(JSON.stringify(response.data));
        }else {
            
        }
    }).catch(err => {
        //dispatch({ type: REQUEST_STATUS  });
    }); 
}


export {
    GetState,
    AllGetcities
};















 