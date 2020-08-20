import React from 'react';
import {Link  } from 'react-router-dom';
 


const Notify = () => 
{
    return (
        <footer className="footer-area section-padding-10-0">
        <div className="">
            <div>
                <div style={{padding:20,color:'#fff',textAlign:'center',}}>
                    Welcome On board....Click to complete your registration
                    <Link style={{backgroundColor:"#ffbb38",marginLeft:7,color:'#fff',padding:5,borderRadius:5}} to="/home/profile" data-animation="fadeInDown" data-delay="700ms">Complete your Registration</Link>
                    </div>
            </div>
        </div>

        </footer>
    );
}

export default Notify;