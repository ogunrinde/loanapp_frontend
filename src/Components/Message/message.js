import React from 'react';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import toast from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// export function Success(title,msg)
// {
//     return store.addNotification({
//         title: title,
//         message: msg,
//         type: "warning",
//         insert: "top",
//         container: "top-left",
//         animationIn: ["animated", "fadeIn"],
//         animationOut: ["animated", "fadeOut"],
//         dismiss: {
//           duration: 5000,
//           onScreen: true
//         }
//       });
// }

// export function Error(title,error)
// {
//     let message = '';
//     if(typeof error === 'object')
//     {
//       Object.keys(error).forEach(function(key){
//           message += error[key] + '\n';
//       });
//     }
//     else {
//           message = error;
//     }
    
//     return store.addNotification({
//         title: title,
//         message: message,
//         type: "danger",
//         insert: "top",
//         container: "top-left",
//         animationIn: ["animated", "fadeIn"],
//         animationOut: ["animated", "fadeOut"],
//         dismiss: {
//           duration: 5000,
//           onScreen: true
//         }
//       });
// }

export function Error(title,error) {
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
  toast.notify(<div style={{color:'#fff',fontSize:15}}><FontAwesomeIcon style={{color:'#fff',fontSize:18,marginRight:10}} icon={faTimesCircle}/> {message}</div>,{position:'top-left',duration:5000});
}

export function Success(title,message) {
  toast.notify(<div style={{color:'#fff',fontSize:15}}><FontAwesomeIcon style={{color:'#fff',fontSize:18,marginRight:10}} icon={faCheckCircle}/>  {message}</div>,{position:'top-left',duration:5000});
}