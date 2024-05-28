import { useEffect, useState } from "react";
import Helpers from "../Config/Helpers";
import { Link, Outlet, useLocation } from "react-router-dom";
import PageLoader from "../Components/Loader/PageLoader";
const Layout = () => {
    const location = useLocation();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        Helpers.toggleCSS();
    }, [location.pathname]);

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
            .then(() => setTimeout(()=>{setLoader(false)},1000))
            .catch(error => console.error("Script loading failed: ", error));
    }, []);

    return (
        <div>
            {loader ? (
                <div>
                <PageLoader/>

                </div>
            ) : (
                <div className="page-wrapper">
                    <div className="cursor"></div>
                    <div className="cursor-follower"></div>
                    <header className="main-header main-header-one">
                        <div className="header-lower">
                            <div className="main-menu__wrapper">
                                <div className="inner-container d-flex align-items-center justify-content-between">
                                    <div className="main-header-one__logo-box">
                                        <Link to="/"><img src="app/logo-duo.png" alt="" className="w200" /></Link>
                                    </div>
                                    <div className="nav-outer">
                                        <nav className="main-menu show navbar-expand-md">
                                            <div className="navbar-header">
                                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">
                                                    <span className="icon-bar"></span>
                                                    <span className="icon-bar"></span>
                                                    <span className="icon-bar"></span>
                                                </button>
                                            </div>
                                            <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                                <ul className="navigation clearfix">
                                                    <li className="dropdown"><a href="#">Home</a>
                                                        <ul>
                                                            <li><Link to="/">Home 01 (AI Products)</Link></li>
                                                            <li><a href="index-2.html">Home 02 (Content Writing)</a></li>
                                                            <li><a href="index-3.html">Home 03 (AI Image)</a></li>
                                                            <li className="dropdown"><a href="#">Header Styles</a>
                                                                <ul>
                                                                    <li><Link to="/">Header Style One</Link></li>
                                                                    <li><a href="index-2.html">Header Style Two</a></li>
                                                                    <li><a href="index-3.html">Header Style Three</a></li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="about.html">About</a></li>
                                                    <li className="dropdown"><a href="#">Pages</a>
                                                        <ul>
                                                            <li><a href="career.html">Career</a></li>
                                                            <li><a href="career-details.html">Career Details</a></li>
                                                            <li><a href="login.html">Login</a></li>
                                                            <li><a href="create-account.html">Create Account</a></li>
                                                            <li><a href="reset-password.html">Reset Password</a></li>
                                                            <li><a href="404.html">404 Error</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown"><a href="#">Blog</a>
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
                                    <div className="outer-box d-flex align-items-center">
                                        <ul className="main-header__login-sing-up">
                                            <li><Link className="main-link" to="/login">Login</Link></li>
                                            <li><a className="main-link" href="create-account.html">Join Us</a></li>
                                        </ul>
                                        <div className="mobile-nav-toggler">
                                            <span className="icon-menu"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mobile-menu">
                            <div className="menu-backdrop"></div>
                            <div className="close-btn"><span className="icon far fa-times fa-fw"></span></div>
                            <nav className="menu-box">
                                <div className="nav-logo"><Link to="/"><img src="assets/images/logo-2.png" alt="" title="" /></Link></div>
                                <div className="search-box">
                                    <form method="post" action="https://marveltheme.com/tf/html/aimug/contact.html">
                                        <div className="form-group">
                                            <input type="search" name="search-field" value="" placeholder="SEARCH HERE" required />
                                            <button type="submit"><span className="icon far fa-search fa-fw"></span></button>
                                        </div>
                                    </form>
                                </div>
                                <div className="menu-outer"></div>
                            </nav>
                        </div>
                    </header>
                    <Outlet />
                    <footer className="main-footer">
                        <div className="main-footer__shape-1 img-bounce"></div>
                        <div className="main-footer__top">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-3 col-lg-6 col-md-6">
                                        <div className="footer-widget__column footer-widget__about">
                                            <div className="footer-widget__logo">
                                                <Link to="/"><img src="app/logo-duo.png" className="w200" alt="" /></Link>
                                            </div>
                                            <p className="footer-widget__about-text">A Magical Tool to Optimize you content for the
                                                first know who you're targeting. Identify your target audience.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-6 col-md-6">
                                        <div className="footer-widget__column footer-widget__company">
                                            <div className="footer-widget__title-box">
                                                <h3 className="footer-widget__title">Company</h3>
                                            </div>
                                            <div className="footer-widget__company-list-box">
                                                <ul className="footer-widget__company-list">
                                                    <li><a href="login.html">Sign in</a></li>
                                                    <li><a href="create-account.html">Register</a></li>
                                                    <li><a href="about.html">Pricing</a></li>
                                                    <li><a href="about.html">Privacy Policy</a></li>
                                                    <li><a href="career.html">Career</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-6 col-md-6">
                                        <div className="footer-widget__column footer-widget__resources">
                                            <div className="footer-widget__title-box">
                                                <h3 className="footer-widget__title">Resources</h3>
                                            </div>
                                            <div className="footer-widget__resources-list-box">
                                                <ul className="footer-widget__resources-list">
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
                                    <div className="col-xl-4 col-lg-6 col-md-6">
                                        <div className="footer-widget__column footer-widget__newsletter">
                                            <div className="footer-widget__title-box">
                                                <h3 className="footer-widget__title">Resources</h3>
                                            </div>
                                            <div className="footer-widget__email-form">
                                                <form className="footer-widget__email-box">
                                                    <div className="footer-widget__email-input-box">
                                                        <input type="email" placeholder="Inter Your Email" name="email" />
                                                    </div>
                                                    <button type="submit" className="footer-widget__btn"><i
                                                        className="fas fa-paper-plane"></i></button>
                                                </form>
                                            </div>
                                            <div className="site-footer__social">
                                                <a href="#"><i className="icon-social-1"></i></a>
                                                <a href="#"><i className="icon-social-2"></i></a>
                                                <a href="#"><i className="icon-social-3"></i></a>
                                                <a href="#"><i className="icon-social-4"></i></a>
                                                <a href="#"><i className="icon-social-5"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-footer__bottom">
                            <div className="container">
                                <div className="main-footer__bottom-inner">
                                    <p className="main-footer__bottom-text">Copyright © 2023. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default Layout;
