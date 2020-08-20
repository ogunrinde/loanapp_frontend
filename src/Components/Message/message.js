import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

export function Success(title,msg)
{
    return store.addNotification({
        title: title,
        message: msg,
        type: "warning",
        insert: "top",
        container: "top-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
}

export function Error(title,error)
{
    let message = '';
    if(typeof error === 'object')
    {
      Object.keys(error).forEach(function(key){
          message += error[key] + '\n';
      });
    }
    else {
          message = error;
    }
    
    return store.addNotification({
        title: title,
        message: message,
        type: "danger",
        insert: "top",
        container: "top-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
}