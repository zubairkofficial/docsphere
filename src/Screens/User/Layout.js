import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Helpers from "../../Config/Helpers";
import axios from "axios";

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

  const logout = (e) => {
    e.preventDefault();
    Helpers.toast("success", "Logged out successfully");
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    Helpers.toggleCSS();
    setShowMobileNav(false);
  }, [location.pathname]);



  const sidebarMenu = [
    {
      path: "/user/dashboard",
      icon: "ni ni-dashboard-fill",
      text: "Dashboard"
    },
    {
      path: "/user/prompts-library",
      icon: "ni ni-layers",
      text: "Prompts Library"
    },
    {
      path: "/user/pricing",
      icon: "ni ni-layers",
      text: "Pricing"
    },
    {
      path: "/user/chat-history",
      icon: "ni ni-clock",
      text: "History"

    },
    ...(Helpers.authUser.org_id && Helpers.authUser.is_org_owner
      ? [
          {
            path: "/user/org-members",
            icon: "ni ni-users",
            text: "Org Members"
          }
        ]
      : [])
  ];

  return (
    <div className="nk-app-root" data-sidebar-collapse="lg">
      <div className="nk-main">
        {showMobileNav && (
          <div
            onClick={() => setShowMobileNav(false)}
            className="sidebar-overlay"
          ></div>
        )}
        <div
          className={`nk-sidebar nk-sidebar-fixed ${isCompact && "is-compact"} ${
            showMobileNav && "sidebar-active"
          }`}
          id="sidebar"
        >
          <div className="nk-compact-toggle">
            <button
              onClick={() => setIsCompact(!isCompact)}
              className="btn btn-xs btn-outline-light btn-icon compact-toggle text-light bg-white rounded-3"
            >
              <em
                className={`icon off ni ${
                  isCompact ? "ni-chevron-right" : "ni-chevron-left"
                }`}
              ></em>
            </button>
          </div>
          <div className="nk-sidebar-element nk-sidebar-head">
            <div className="nk-sidebar-brand">
              <a href="/user/dashboard" className="logo-link">
                <div className="logo-wrap">
                  <img
                    className="logo-img logo-light dashboardlogo"
                    src="/app/logo.png"
                    alt=""
                  />
                  <img
                    className="logo-img logo-dark dashboardlogo"
                    src="/app/logo.png"
                    alt=""
                  />
                  <img
                    className="logo-img logo-icon dashboardlogo"
                    src="/app/logo.png"
                    alt=""
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="nk-sidebar-element nk-sidebar-body">
            <div className="nk-sidebar-content h-100" data-simplebar>
              <div className="nk-sidebar-menu">
                <ul className="nk-menu">
                  {sidebarMenu.map((item, index) => (
                    <li key={index} className="nk-menu-item">
                      <Link
                        to={item.path}
                        className={`nk-menu-link ${location.pathname === item.path ? 'active' : ''}`}
                      >
                        <span className="nk-menu-icon">
                          <em className={`icon ${item.icon}`}></em>
                        </span>
                        <span className="nk-menu-text">{item.text}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="nk-menu-item">
                    <a href="#!" onClick={logout} className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-signout"></em>
                      </span>
                      <span className="nk-menu-text">Sign Out</span>
                    </a>
                  </li>
                  {/* <li className="nk-menu-item has-sub">
                    <a href="#" className="nk-menu-link nk-menu-toggle">
                      <span className="nk-menu-icon"><em className="icon ni ni-signin"></em></span>
                      <span className="nk-menu-text">Auth Pages</span>
                    </a>
                    <ul className="nk-menu-sub">
                      <li className="nk-menu-item">
                        <a href="login.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">Login</span></a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="create-account.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">Register</span></a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="forgot-password.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">Forgot Password</span></a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="check-email.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">Check Email</span></a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="verify-email.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">Verify Email</span></a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="email-verified.html" target="_blank" className="nk-menu-link"><span className="nk-menu-text">Email Verified</span></a>
                      </li>
                    </ul>
                  </li> 
                  <li className="nk-menu-heading"><h6 className="overline-title">Components</h6></li>
                  <li className="nk-menu-item">
                    <a href="component-buttons.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-view-grid-wd"></em></span>
                      <span className="nk-menu-text">Buttons</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-badges.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-ticket"></em></span>
                      <span className="nk-menu-text">Badges</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-alert.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-alert"></em></span>
                      <span className="nk-menu-text">Alert</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-dropdown.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-notify"></em></span>
                      <span className="nk-menu-text">Dropdown</span>
                    </a>
                  </li>
                  <li className="nk-menu-item has-sub">
                    <a href="#" className="nk-menu-link nk-menu-toggle">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-todo"></em></span>
                      <span className="nk-menu-text">Forms</span>
                    </a>
                    <ul className="nk-menu-sub">
                      <li className="nk-menu-item">
                        <a href="component-form-basic.html" className="nk-menu-link"><span className="nk-menu-text">Form Basic</span></a>
                      </li>
                      <li className="nk-menu-item">
                        <a href="component-form-advanced.html" className="nk-menu-link"><span className="nk-menu-text">Form Advanced</span></a>
                      </li>
                    </ul>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-tabs.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-browser"></em></span>
                      <span className="nk-menu-text">Tabs</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-modals.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-property"></em></span>
                      <span className="nk-menu-text">Modal</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-popover-tooltip.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-chat"></em></span>
                      <span className="nk-menu-text">Popover & Tooltips</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-accordion.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-view-x7"></em></span>
                      <span className="nk-menu-text">Accordion</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-card.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-card-view"></em></span>
                      <span className="nk-menu-text">Card</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-offcanvas.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-layout-alt"></em></span>
                      <span className="nk-menu-text">Offcanvas</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="component-toasts.html" className="nk-menu-link">
                      <span className="nk-menu-icon is-alt"><em className="icon ni ni-block-over"></em></span>
                      <span className="nk-menu-text">Toasts</span>
                    </a>
                  </li>*/}
                </ul>
              </div>
            </div>
          </div>
          <div className="nk-sidebar-element nk-sidebar-footer">
            <div className="nk-sidebar-footer-extended pt-3">
              <div className="border border-light rounded-3">
                <div className="px-3 py-2 bg-white border-bottom border-light rounded-top-3">
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <h6 className="lead-text">Free Plan</h6>
                    <a className="link link-primary" href="pricing-plans.html"><em className="ni ni-spark-fill icon text-warning"></em><span>Upgrade</span></a>
                  </div>
                  <div className="progress progress-md"><div className="progress-bar" data-progress="25%"></div></div>
                  <h6 className="lead-text mt-2">1,360 <span className="text-light">words left</span></h6> 
                </div>
                <Link
                  className="d-flex px-3 py-2 bg-primary bg-opacity-10 rounded-bottom-3"
                  to={"/user/profile"}
                >
                  <div className="media-group">
                    <div className="media media-sm media-middle media-circle text-bg-primary">
                      <img
                        src={Helpers.serverImage(Helpers.authUser.profile_pic)}
                      />
                    </div>
                    <div className="media-text">
                      <h6 className="fs-6 mb-0">{Helpers.authUser.name}</h6>
                      <span className="text-light fs-7">
                        {Helpers.authUser.email}
                      </span>
                    </div>
                    <em className="icon ni ni-chevron-right ms-auto ps-1"></em>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="nk-wrap">
          <div className="nk-header nk-header-fixed">
            <div className="container-fluid">
              <div className="nk-header-wrap">
                <div className="nk-header-logo ms-n1">
                  <div className="nk-sidebar-toggle me-1">
                    <button
                      onClick={() => setShowMobileNav(true)}
                      className="btn btn-sm btn-zoom btn-icon sidebar-toggle d-sm-none"
                    >
                      <em className="icon ni ni-menu"> </em>
                    </button>
                    <button
                      onClick={() => setShowMobileNav(true)}
                      className="btn btn-md btn-zoom btn-icon sidebar-toggle d-none d-sm-inline-flex"
                    >
                      <em className="icon ni ni-menu"> </em>
                    </button>
                  </div>
                  {/* <a href="index-2.html" className="logo-link">
                    <div className="logo-wrap">
                      <img
                        className="logo-img logo-light"
                        src="/logo-dashboard.png"
                        srcset="/logo-dashboard.png 2x"
                        alt=""
                      />
                      <img
                        className="logo-img logo-dark"
                        src="/logo-dashboard.png"
                        srcset="/logo-dashboard.png 2x"
                        alt=""
                      />
                      <img
                        className="logo-img logo-icon"
                        src="/logo-dashboard.png"
                        srcset="/logo-dashboard.png 2x"
                        alt=""
                      />
                    </div>
                  </a> */}
                </div>
                <div className="nk-header-tools">
                  <ul className="nk-quick-nav ms-2">
                    <li className="dropdown d-inline-flex">
                      <Link className="d-inline-flex" to={"/user/profile"}>
                        <div className="media media-sm media-middle media-circle text-bg-primary">
                          <img
                            className="chat-avatar"
                            src={Helpers.serverImage(
                              Helpers.authUser.profile_pic
                            )}
                            alt=""
                          />
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                {organizationName && (
                  <div className="nk-block-head-content">
                    <h4 className="nk-block-title">Org: {organizationName}</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
