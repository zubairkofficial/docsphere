import { useEffect } from "react";
import Helpers from "../Config/Helpers";
import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
	const location = useLocation();
    
	useEffect(() => {

        Helpers.loadScript("jquery.js")
            .then(() => Helpers.loadScript("01-bootstrap.min.js"))
            .then(() => Helpers.loadScript("02-bootstrap-select.min.js"))
            .then(() => Helpers.loadScript("03-color-settings.js"))
            .then(() => Helpers.loadScript("04-owl.js"))
            .then(() => Helpers.loadScript("05-jarallax.min.js"))
            .then(() => Helpers.loadScript("06-isotope.js"))
            .then(() => Helpers.loadScript("07-wow.js"))
            .then(() => Helpers.loadScript("08-validate.js"))
            .then(() => Helpers.loadScript("09-appear.js"))
            .then(() => Helpers.loadScript("10-swiper.min.js"))
            .then(() => Helpers.loadScript("11-jquery.easing.min.js"))
            .then(() => Helpers.loadScript("12-gsap.min.js"))
            .then(() => Helpers.loadScript("13-odometer.js"))
            .then(() => Helpers.loadScript("14-tilt.jquery.min.js"))
            .then(() => Helpers.loadScript("15-magnific-popup.min.js"))
            .then(() => Helpers.loadScript("16-jquery-ui.js"))
            .then(() => Helpers.loadScript("17-marquee.min.js"))
            .then(() => Helpers.loadScript("18-jquery.circleType.js"))
            .then(() => Helpers.loadScript("19-jquery.lettering.min.js"))
            .then(() => Helpers.loadScript("script.js")) // Load script.js last
            .catch(error => console.error("Script loading failed: ", error));
    }, []);

    useEffect(() => {
        Helpers.toggleCSS();
    }, [location.pathname]);

    return (
        <div class="page-wrapper">
            <div class="cursor"></div>
            <div class="cursor-follower"></div>
            <header class="main-header main-header-one">

                
                <div class="header-lower">

                    <div class="main-menu__wrapper">
                        <div class="inner-container d-flex align-items-center justify-content-between">

                            
                            <div class="main-header-one__logo-box">
                                <Link to="/"><img src="app/logo-duo.png" alt="" className="w200" /></Link>
                            </div>

                            <div class="nav-outer">

                                
                                <nav class="main-menu show navbar-expand-md">
                                    <div class="navbar-header">
                                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                        </button>
                                    </div>

                                    <div class="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                        <ul class="navigation clearfix">
                                            <li class="dropdown"><a href="#">Home</a>
                                                <ul>
                                                    <li><Link to="/">Home 01 (AI Products)</Link></li>
                                                    <li><a href="index-2.html">Home 02 (Content Writing)</a></li>
                                                    <li><a href="index-3.html">Home 03 (AI Image)</a></li>
                                                    <li class="dropdown"><a href="#">Header Styles</a>
                                                        <ul>
                                                            <li><Link to="/">Header Style One</Link></li>
                                                            <li><a href="index-2.html">Header Style Two</a></li>
                                                            <li><a href="index-3.html">Header Style Three</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><a href="about.html">About</a></li>
                                            <li class="dropdown"><a href="#">Pages</a>
                                                <ul>
                                                    <li><a href="career.html">Career</a></li>
                                                    <li><a href="career-details.html">Career Details</a></li>
                                                    <li><a href="login.html">Login</a></li>
                                                    <li><a href="create-account.html">Create Account</a></li>
                                                    <li><a href="reset-password.html">Reset Password</a></li>
                                                    <li><a href="404.html">404 Error</a></li>
                                                </ul>
                                            </li>
                                            <li class="dropdown"><a href="#">Blog</a>
                                                <ul>
                                                    <li><a href="blog.html">Blog</a></li>
                                                    <li><a href="blog-details.html">Blog Detail</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </div>

                                </nav>
                                

                            </div>

                            
                            <div class="outer-box d-flex align-items-center">

                                <ul class="main-header__login-sing-up">
                                    <li><Link className="main-link" to="/login">Login</Link></li>
                                    <li><a className="main-link" href="create-account.html">Join Us</a></li>
                                </ul>

                                
                                <div class="mobile-nav-toggler">
                                    <span class="icon-menu"></span>
                                </div>

                            </div>
                            

                        </div>

                    </div>
                </div>
                

                
                <div class="mobile-menu">
                    <div class="menu-backdrop"></div>
                    <div class="close-btn"><span class="icon far fa-times fa-fw"></span></div>
                    <nav class="menu-box">
                        <div class="nav-logo"><Link to="/"><img src="assets/images/logo-2.png" alt="" title="" /></Link></div>
                        
                        <div class="search-box">
                            <form method="post" action="https://marveltheme.com/tf/html/aimug/contact.html">
                                <div class="form-group">
                                    <input type="search" name="search-field" value="" placeholder="SEARCH HERE" require />
                                    <button type="submit"><span class="icon far fa-search fa-fw"></span></button>
                                </div>
                            </form>
                        </div>
                        <div class="menu-outer">
                            
                        </div>
                    </nav>
                </div>
                
            </header>
            <Outlet />
            <footer class="main-footer">
                <div class="main-footer__shape-1 img-bounce"></div>
                <div class="main-footer__top">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-3 col-lg-6 col-md-6">
                                <div class="footer-widget__column footer-widget__about">
                                    <div class="footer-widget__logo">
                                        <Link to="/"><img src="app/logo-duo.png" className="w200" alt="" /></Link>
                                    </div>
                                    <p class="footer-widget__about-text">A Magical Tool to Optimize you content for the
                                        first know who you're targeting. Identify your target audience.</p>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-6 col-md-6">
                                <div class="footer-widget__column footer-widget__company">
                                    <div class="footer-widget__title-box">
                                        <h3 class="footer-widget__title">Company</h3>
                                    </div>
                                    <div class="footer-widget__company-list-box">
                                        <ul class="footer-widget__company-list">
                                            <li><a href="login.html">Sign in</a></li>
                                            <li><a href="create-account.html">Register</a></li>
                                            <li><a href="about.html">Pricing</a></li>
                                            <li><a href="about.html">Privacy Policy</a></li>
                                            <li><a href="career.html">Career</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-lg-6 col-md-6">
                                <div class="footer-widget__column footer-widget__resources">
                                    <div class="footer-widget__title-box">
                                        <h3 class="footer-widget__title">Resources</h3>
                                    </div>
                                    <div class="footer-widget__resources-list-box">
                                        <ul class="footer-widget__resources-list">
                                            <li><a href="about.html">AI writer</a></li>
                                            <li><a href="about.html">Businesses AI</a></li>
                                            <li><a href="about.html">AI Blog writer</a></li>
                                            <li><a href="about.html">AI Content Creator</a></li>
                                            <li><a href="about.html">AI Copy</a></li>
                                            <li><a href="blog.html">Article write</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-6">
                                <div class="footer-widget__column footer-widget__newsletter">
                                    <div class="footer-widget__title-box">
                                        <h3 class="footer-widget__title">Resources</h3>
                                    </div>
                                    <div class="footer-widget__email-form">
                                        <form class="footer-widget__email-box">
                                            <div class="footer-widget__email-input-box">
                                                <input type="email" placeholder="Inter Your Email" name="email" />
                                            </div>
                                            <button type="submit" class="footer-widget__btn"><i
                                                    class="fas fa-paper-plane"></i></button>
                                        </form>
                                    </div>
                                    <div class="site-footer__social">
                                        <a href="#"><i class="icon-social-1"></i></a>
                                        <a href="#"><i class="icon-social-2"></i></a>
                                        <a href="#"><i class="icon-social-3"></i></a>
                                        <a href="#"><i class="icon-social-4"></i></a>
                                        <a href="#"><i class="icon-social-5"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-footer__bottom">
                    <div class="container">
                        <div class="main-footer__bottom-inner">
                            <p class="main-footer__bottom-text">Copyright © 2023. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout;