import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => 
{
    return(
        <footer className="footer-area section-padding-100-0">
        <div className="container">
            <div className="row">

                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="single-footer-widget mb-100">
                        <h5 className="widget-title">About Us</h5>
                        
                        <nav>
                            <ul>
                                <li><a href="#">Homepage</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Services &amp; Offers</a></li>
                                <li><a href="#">Portfolio Presentation</a></li>
                                <li><a href="#">The News</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="single-footer-widget mb-100">
                        <h5 className="widget-title">Solutions</h5>
                        
                        <nav>
                            <ul>
                                <li><a href="#">Our Loans</a></li>
                                <li><a href="#">Trading &amp; Commerce</a></li>
                                <li><a href="#">Banking &amp; Private Equity</a></li>
                                <li><a href="#">Industrial &amp; Factory</a></li>
                                <li><a href="#">Financial Solutions</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

               
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="single-footer-widget mb-100">
                        <h5 className="widget-title">Our Loans</h5>
                      
                        <nav>
                            <ul>
                                <li><a href="#">Our Loans</a></li>
                                <li><a href="#">Trading &amp; Commerce</a></li>
                                <li><a href="#">Banking &amp; Private Equity</a></li>
                                <li><a href="#">Industrial &amp; Factory</a></li>
                                <li><a href="#">Financial Solutions</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                
                <div className="col-12 col-sm-6 col-lg-3">
                    <div className="single-footer-widget mb-100">
                        <h5 className="widget-title">Latest News</h5>

                       
                        <div className="single-latest-news-area d-flex align-items-center">
                            <div className="news-thumbnail">
                                <img src="img/bg-img/7.jpg" alt=""/>
                            </div>
                            <div className="news-content">
                                <a href="#">How to get the best loan?</a>
                                <div className="news-meta">
                                    <a href="#" className="post-author"><img src="img/core-img/pencil.png" alt=""/> Jane Smith</a>
                                    <a href="#" className="post-date"><img src="img/core-img/calendar.png" alt=""/> April 26</a>
                                </div>
                            </div>
                        </div>

                       
                        <div className="single-latest-news-area d-flex align-items-center">
                            <div className="news-thumbnail">
                                <img src="img/bg-img/8.jpg" alt=""/>
                            </div>
                            <div className="news-content">
                                <a href="#">A new way to get a loan</a>
                                <div className="news-meta">
                                    <a href="#" className="post-author"><img src="img/core-img/pencil.png" alt=""/> Jane Smith</a>
                                    <a href="#" className="post-date"><img src="img/core-img/calendar.png" alt=""/> April 26</a>
                                </div>
                            </div>
                        </div>

                        <div className="single-latest-news-area d-flex align-items-center">
                            <div className="news-thumbnail">
                                <img src="img/bg-img/9.jpg" alt=""/>
                            </div>
                            <div className="news-content">
                                <a href="#">Finance you home</a>
                                <div className="news-meta">
                                    <a href="#" className="post-author"><img src="img/core-img/pencil.png" alt=""/> Jane Smith</a>
                                    <a href="#" className="post-date"><img src="img/core-img/calendar.png" alt=""/> April 26</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div className="copywrite-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="copywrite-content d-flex flex-wrap justify-content-between align-items-center">
                         
                            <Link to="/" className="footer-logo"><img src="img/core-img/logo.png" alt=""/></Link>
                            <p className="copywrite-text"><Link to="/">Copyright &copy;<script>document.write(new Date().getFullYear());</script>
                            Surebanker</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </footer>
    );
}

export default Footer;