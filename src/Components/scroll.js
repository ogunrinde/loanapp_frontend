import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';


const Scroll = (props) => {
    useEffect(()=> {
        window.scrollTo(0,0);
    },[props.location]);
    return(
        <React.Fragment />
    );
}

export default withRouter(Scroll);