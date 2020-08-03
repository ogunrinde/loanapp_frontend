
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SureRequest from './sureRequest';
import { Link } from 'react-router-dom';




const Welcome = () => {
    return (
        <div>
           
           
            <div className="hero-area">
                <div className="hero-slideshow">
                
                    <div className="single-slide bg-img">
                    
                        <div className="slide-bg-img bg-img bg-overlay" style={{backgroundImage: `url('../../img/bg-img/1.jpg')`}}></div>
                        
                        <div className="container h-100">
                            <div className="row h-100 align-items-center justify-content-center">
                                <div className="col-12 col-lg-12">
                                    <div className="welcome-text text-center">
                                        <h6 data-animation="fadeInDown" data-delay="100ms">2 years interest</h6>
                                        <h2 data-animation="fadeInDown" data-delay="300ms">get your <span>loan</span> now</h2>
                                        <p data-animation="fadeInDown" data-delay="500ms">Vestibulum eu vehicula elit, nec elementum orci. Praesent aliquet ves tibulum tempus. Pellentesque posuere pharetra turpis, eget finibus erat porta placerat.</p>
                                        <Link to="/peer" className="btn credit-btn mt-50" data-animation="fadeInDown" data-delay="700ms">Peer 2 Peer</Link>
                                        <Link to="/makerequest" className="btn credit-btn mt-50" data-animation="fadeInDown" data-delay="700ms" style={{marginLeft:7}}>Sure Request</Link>
                                    </div>
                                </div>

                                {/* <div className="col-12 col-lg-5">
                                    <div className="profilecontainer" style={{width:'100%'}}> 
                                        <div id="contact" style={{marginTop:250}}>
                                        <SureRequest />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        
                      
                    </div>  
                </div>
            </div>
            <section className="features-area section-padding-100-0">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="single-features-area mb-100 wow fadeInUp" data-wow-delay="100ms">
                            
                                <div className="section-heading">
                                    <div className="line"></div>
                                    <p>Take look at our</p>
                                    <h2>Our Loans</h2>
                                </div>
                                <h6>In vitae nisi aliquam, scelerisque leo a, volutpat sem. Viva mus rutrum dui fermentum eros hendrerit.</h6>
                                <a href="#" className="btn credit-btn mt-50">Discover</a>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="single-features-area mb-100 wow fadeInUp" data-wow-delay="300ms">
                                <img src="../../img/bg-img/2.jpg" alt=""/>
                                <h5>We take care of you</h5>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="single-features-area mb-100 wow fadeInUp" data-wow-delay="500ms">
                                <img src="../../img/bg-img/3.jpg" alt=""/>
                                <h5>No documents needed</h5>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="single-features-area mb-100 wow fadeInUp" data-wow-delay="700ms">
                                <img src="../../img/bg-img/4.jpg" alt=""/>
                                <h5>Fast &amp; easy loans</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="cta-area d-flex flex-wrap">
       
               <div className="cta-thumbnail bg-img jarallax" style={{backgroundImage: `url('../../img/bg-img/5.jpg')`}}></div>

       
                <div className="cta-content">
                
                    <div className="section-heading white">
                        <div className="line"></div>
                        <p>Bold desing and beyound</p>
                        <h2>Helping small businesses like yours</h2>
                    </div>
                    <h6>Morbi ut dapibus dui. Sed ut iaculis elit, quis varius mauris. Integer ut ultricies orci, lobortis egestas sem. Duis non volutpat arcu, eu mollis tellus. Sed finibus aliquam neque sit amet sod ales. Maecenas sed magna tempor, efficitur maur is in, sollicitudin augue. Praesent pretium finibus quam.</h6>
                    <div className="d-flex flex-wrap mt-50">
                        
                        <div className="single-skils-area mb-70 mr-5">
                            <div id="circle" className="circle" data-value="0.90">
                                <div className="skills-text">
                                    <span>90%</span>
                                </div>
                            </div>
                            <p>Energy</p>
                        </div>

                        
                        <div className="single-skils-area mb-70 mr-5">
                            <div id="circle2" className="circle" data-value="0.75">
                                <div className="skills-text">
                                    <span>75%</span>
                                </div>
                            </div>
                            <p>power</p>
                        </div>

                        
                        <div className="single-skils-area mb-70">
                            <div id="circle3" className="circle" data-value="0.97">
                                <div className="skills-text">
                                    <span>97%</span>
                                </div>
                            </div>
                            <p>resource</p>
                        </div>
                    </div>
                    <a href="#" className="btn credit-btn box-shadow btn-2">Read More</a>
                </div>
            </section>
        
            <section className="cta-2-area wow fadeInUp" data-wow-delay="100ms">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="cta-content d-flex flex-wrap align-items-center justify-content-between">
                                <div className="cta-text">
                                    <h4>Are you in need for a load? Get in touch with us.</h4>
                                </div>
                                <div className="cta-btn">
                                    <a href="#" className="btn credit-btn box-shadow">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="services-area section-padding-100-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        
                            <div className="section-heading text-center mb-100 wow fadeInUp" data-wow-delay="100ms">
                                <div className="line"></div>
                                <p>Take look at our</p>
                                <h2>Our services</h2>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                    
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single-service-area d-flex mb-100 wow fadeInUp" data-wow-delay="200ms">
                                <div className="icon">
                                    <i className="icon-profits"></i>
                                </div>
                                <div className="text">
                                    <h5>All the loans</h5>
                                    <p>Morbi ut dapibus dui. Sed ut iaculis elit, quis varius mauris. Integer ut ultricies orci, lobortis egestas sem.</p>
                                </div>
                            </div>
                        </div>

                    
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single-service-area d-flex mb-100 wow fadeInUp" data-wow-delay="300ms">
                                <div className="icon">
                                    <i className="icon-money-1"></i>
                                </div>
                                <div className="text">
                                    <h5>Easy and fast answer</h5>
                                    <p>Morbi ut dapibus dui. Sed ut iaculis elit, quis varius mauris. Integer ut ultricies orci, lobortis egestas sem.</p>
                                </div>
                            </div>
                        </div>

                    
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single-service-area d-flex mb-100 wow fadeInUp" data-wow-delay="400ms">
                                <div className="icon">
                                    <i className="icon-coin"></i>
                                </div>
                                <div className="text">
                                    <h5>No additional papers</h5>
                                    <p>Morbi ut dapibus dui. Sed ut iaculis elit, quis varius mauris. Integer ut ultricies orci, lobortis egestas sem.</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single-service-area d-flex mb-100 wow fadeInUp" data-wow-delay="500ms">
                                <div className="icon">
                                    <i className="icon-smartphone-1"></i>
                                </div>
                                <div className="text">
                                    <h5>Secure financial services</h5>
                                    <p>Morbi ut dapibus dui. Sed ut iaculis elit, quis varius mauris. Integer ut ultricies orci, lobortis egestas sem.</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single-service-area d-flex mb-100 wow fadeInUp" data-wow-delay="600ms">
                                <div className="icon">
                                    <i className="icon-diamond"></i>
                                </div>
                                <div className="text">
                                    <h5>Good investments</h5>
                                    <p>Morbi ut dapibus dui. Sed ut iaculis elit, quis varius mauris. Integer ut ultricies orci, lobortis egestas sem.</p>
                                </div>
                            </div>
                        </div>

                        
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single-service-area d-flex mb-100 wow fadeInUp" data-wow-delay="700ms">
                                <div className="icon">
                                    <i className="icon-piggy-bank"></i>
                                </div>
                                <div className="text">
                                    <h5>Accumulation goals</h5>
                                    <p>Morbi ut dapibus dui. Sed ut iaculis elit, quis varius mauris. Integer ut ultricies orci, lobortis egestas sem.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="miscellaneous-area bg-gray section-padding-100-0">
                <div className="container">
                    <div className="row align-items-end justify-content-center">
                        
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="add-area mb-100 wow fadeInUp" data-wow-delay="100ms">
                                <a href="#"><img src="../../img/bg-img/add.png" alt=""/></a>
                            </div>
                        </div>

                    
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="contact--area mb-100 wow fadeInUp" data-wow-delay="300ms">
                            
                                <div className="section-heading mb-50">
                                    <div className="line"></div>
                                    <h2>Get in touch</h2>
                                </div>
                                
                                <div className="contact-content">
                                    
                                    <div className="single-contact-content d-flex align-items-center">
                                        <div className="icon">
                                            <img src="../../img/core-img/location.png" alt=""/>
                                        </div>
                                        <div className="text">
                                            <p>3007 Sarah Drive <br/> Franklin, LA 70538</p>
                                        </div>
                                    </div>
                                    
                                    <div className="single-contact-content d-flex align-items-center">
                                        <div className="icon">
                                            <img src="../../img/core-img/call.png" alt=""/>
                                        </div>
                                        <div className="text">
                                            <p>337-413-9538</p>
                                            <span>mon-fri , 08.am - 17.pm</span>
                                        </div>
                                    </div>
                                    
                                    <div className="single-contact-content d-flex align-items-center">
                                        <div className="icon">
                                            <img src="../../img/core-img/message2.png" alt=""/>
                                        </div>
                                        <div className="text">
                                            <p>contact@yourbusiness.com</p>
                                            <span>we reply in 24 hrs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="news--area mb-100 wow fadeInUp" data-wow-delay="500ms">
                                
                                <div className="section-heading mb-50">
                                    <div className="line"></div>
                                    <h2>The news</h2>
                                </div>

                            
                                <div className="single-news-area d-flex align-items-center">
                                    <div className="news-thumbnail">
                                        <img src="../../img/bg-img/10.jpg" alt=""/>
                                    </div>
                                    <div className="news-content">
                                        <span>July 18, 2018</span>
                                        <a href="#">How to get the best loan online</a>
                                        <div className="news-meta">
                                            <a href="#" className="post-author"><img src="../../img/core-img/pencil.png" alt=""/> Jane Smith</a>
                                            <a href="#" className="post-date"><img src="../../img/core-img/calendar.png" alt=""/> April 26</a>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="single-news-area d-flex align-items-center">
                                    <div className="news-thumbnail">
                                        <img src="../../img/bg-img/11.jpg" alt=""/>
                                    </div>
                                    <div className="news-content">
                                        <span>July 18, 2018</span>
                                        <a href="#">A new way to finance your dream home</a>
                                        <div className="news-meta">
                                            <a href="#" className="post-author"><img src="../../img/core-img/pencil.png" alt=""/> Jane Smith</a>
                                            <a href="#" className="post-date"><img src="../../img/core-img/calendar.png" alt=""/> April 26</a>
                                        </div>
                                    </div>
                                </div>

                            
                                <div className="single-news-area d-flex align-items-center">
                                    <div className="news-thumbnail">
                                        <img src="../../img/bg-img/12.jpg" alt=""/>
                                    </div>
                                    <div className="news-content">
                                        <span>July 18, 2018</span>
                                        <a href="#">10 tips to get the best loan for you</a>
                                        <div className="news-meta">
                                            <a href="#" className="post-author"><img src="../../img/core-img/pencil.png" alt=""/> Jane Smith</a>
                                            <a href="#" className="post-date"><img src="../../img/core-img/calendar.png" alt=""/> April 26</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="newsletter-area section-padding-100 bg-img jarallax" style={{backgroundImage: `url('../../img/bg-img/6.jpg')`}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-lg-8">
                            <div className="nl-content text-center">
                                <h2>Subscribe to our newsletter</h2>
                                <form action="#" method="post">
                                    <input type="email" name="nl-email" id="nlemail" placeholder="Your e-mail"/>
                                    <button type="submit">Subscribe</button>
                                </form>
                                <p>Curabitur elit turpis, maximus quis ullamcorper sed, maximus eu neque. Cras ultrices erat nec auctor blandit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
} 

export default Welcome;