import { useEffect, useState } from "react";
import Helpers from "../../Config/Helpers";
import useTitle from "../../Hooks/useTitle";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  useTitle("Dashboard");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

    useEffect(() => {
    if (Helpers.authUser.org_id) {
      fetchOrganizationName(Helpers.authUser.org_id);
    }
    console.log(Helpers.authUser);
  }, []);

  const fetchOrganizationName = async (orgId) => {
    try {
      const response = await axios.get(`${Helpers.apiUrl}organizations/${orgId}`);
      setOrganizationName(response.data.org_name);
    } catch (error) {
      console.error("Failed to fetch organization name", error);
    }
  };


  return (
    <div className="nk-wrap">
      {/* <div className="nk-header nk-header-fixed">
        <div className="container-fluid">
          <div className="nk-header-wrap">
            <div className="nk-header-logo ms-n1">
              <div className="nk-sidebar-toggle me-1 sidebar-active">
                <button className="btn btn-sm btn-zoom btn-icon sidebar-toggle d-sm-none" onClick={() => setShowMobileNav(true)}
>
                  <em className="icon ni ni-menu"> </em>
                </button>
                <button className="btn btn-md btn-zoom btn-icon sidebar-toggle d-none d-sm-inline-flex" onClick={() => setShowMobileNav(true)}
>
                  <em className="icon ni ni-menu"> </em>
                </button>
              </div>
              <a href="index-2.html" className="logo-link">
                <div className="logo-wrap">
                  <img
                    className="logo-img logo-light"
                    src="images/logo.png"
                    srcSet="https://copygen.themenio.com/dashboard/images/logo2x.png 2x"
                    alt=""
                  />
                  <img
                    className="logo-img logo-dark"
                    src="images/logo-dark.png"
                    srcSet="https://copygen.themenio.com/dashboard/images/logo-dark2x.png 2x"
                    alt=""
                  />
                  <img
                    className="logo-img logo-icon"
                    src="images/logo-icon.png"
                    srcSet="https://copygen.themenio.com/dashboard/images/logo-icon2x.png 2x"
                    alt=""
                  />
                </div>
              </a>
            </div>
            <div className="nk-header-tools">
              <ul className="nk-quick-nav ms-2">
                <li className="dropdown d-inline-flex">
                  <a
                    data-bs-toggle="dropdown"
                    className="d-inline-flex"
                    href="#"
                  >
                    <div className="media media-md media-circle media-middle text-bg-primary">
                    <img class="chat-avatars" src="//docsphere.cyberifyportfolio.com/uploads/default.png" alt=""/>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-md rounded-3">
                    <div className="dropdown-content py-3">
                      <div className="border border-light rounded-3">
                        <div className="px-3 py-2 bg-white border-bottom border-light rounded-top-3">
                          <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <h6 className="lead-text">Free Plan</h6>
                            <a className="link link-primary" href="#">
                              <em className="ni ni-spark-fill icon text-warning"></em>
                              <span>Upgrade</span>
                            </a>
                        </div>
                        <a
                          className="d-flex px-3 py-2 bg-primary bg-opacity-10 rounded-bottom-3"
                          href="profile.html"
                        >
                          <div className="media-group">
                            <div className="media media-sm media-middle media-circle text-bg-primary">
                            <img class="chat-avatar" src="/uploads/default.png" alt=""/>
                            </div>
                            <div className="media-text">
                              <h6 className="fs-6 mb-0">
                                {Helpers.authUser.name}
                              </h6>
                              <span className="text-light fs-7">
                                {Helpers.authUser.email}
                              </span>
                            </div>
                            <em className="icon ni ni-chevron-right ms-auto ps-1"></em>
                          </div>
                        </a>
                      </div>
                    </div>
                </div>
            </div>
            <div className="nk-content">
                <div className="container-xl">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-page-head">
                                <div className="nk-block-head-between">
                                    <div className="nk-block-head-content"><h2 className="display-6">Welcome  { Helpers.authUser.name }!</h2></div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <div className="row g-gs">
                                    <div className="col-sm-6 col-xxl-3">
                                        <div className="card card-full bg-purple bg-opacity-10 border-0">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center justify-content-between mb-1">
                                                    <div className="fs-6 text-light mb-0">Words Available</div>
                                                    <a href="history.html" className="link link-purple">See History</a>
                                                </div>
                                                <h5 className="fs-1">452 <small className="fs-3">words</small></h5>
                                                <div className="fs-7 text-light mt-1"><span className="text-dark">1548</span>/2000 free words generated</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-3">
                                        <div className="card card-full bg-blue bg-opacity-10 border-0">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center justify-content-between mb-1">
                                                    <div className="fs-6 text-light mb-0">Drafts Available</div>
                                                    <a href="document-drafts.html" className="link link-blue">See All</a>
                                                </div>
                                                <h5 className="fs-1">3 <small className="fs-3">Drafts</small></h5>
                                                <div className="fs-7 text-light mt-1"><span className="text-dark">7</span>/10 free drafts created</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-3">
                                        <div className="card card-full bg-indigo bg-opacity-10 border-0">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center justify-content-between mb-1">
                                                    <div className="fs-6 text-light mb-0">Documents Available</div>
                                                    <a href="document-saved.html" className="link link-indigo">See All</a>
                                                </div>
                                                <h5 className="fs-1">6 <small className="fs-3">Documents</small></h5>
                                                <div className="fs-7 text-light mt-1"><span className="text-dark">4</span>/10 free documents created</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-3">
                                        <div className="card card-full bg-cyan bg-opacity-10 border-0">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center justify-content-between mb-1">
                                                    <div className="fs-6 text-light mb-0">Tools Available</div>
                                                    <a href="templates.html" className="link link-cyan">All Tools</a>
                                                </div>
                                                <h5 className="fs-1">12 <small className="fs-3">Tools</small></h5>
                                                <div className="fs-7 text-light mt-1"><span className="text-dark">4</span>/16 free tools used to generate content</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block-head">
                                <div className="nk-block-head-between">
                                    <div className="nk-block-head-content"><h2 className="display-6">Popular Templates</h2></div>
                                    <div className="nk-block-head-content"><a href="templates.html" className="link">Explore All</a></div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <div className="row g-gs">
                                    <div className="col-sm-6 col-xxl-3">
                                        <div className="card card-full">
                                            <div className="card-body">
                                                <div className="media media-rg media-middle media-circle text-primary bg-primary bg-opacity-20 mb-3"><em className="icon ni ni-bulb-fill"></em></div>
                                                <h5 className="fs-4 fw-medium">Blog Ideas</h5>
                                                <p className="small text-light">Produce trendy blog ideas for your business that engages.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-3">
                                        <div className="card card-full">
                                            <div className="card-body">
                                                <div className="position-absolute end-0 top-0 me-4 mt-4"><div className="badge text-bg-dark rounded-pill text-uppercase">New</div></div>
                                                <div className="media media-rg media-middle media-circle text-blue bg-blue bg-opacity-20 mb-3"><em className="icon ni ni-spark-fill"></em></div>
                                                <h5 className="fs-4 fw-medium">Social Media Posts</h5>
                                                <p className="small text-light">Creative and engaging social media post for your brand.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-3">
                                        <div className="card card-full">
                                            <div className="card-body">
                                                <div className="media media-rg media-middle media-circle text-red bg-red bg-opacity-20 mb-3"><em className="icon ni ni-youtube-fill"></em></div>
                                                <h5 className="fs-4 fw-medium">YouTube Tags Generator</h5>
                                                <p className="small text-light">Generate SEO optimized tags/keywords for your YouTube video.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-xxl-3">
                                        <div className="card card-full">
                                            <div className="card-body">
                                                <div className="media media-rg media-middle media-circle text-purple bg-purple bg-opacity-20 mb-3"><em className="icon ni ni-laptop"></em></div>
                                                <h5 className="fs-4 fw-medium">Website Headlines/Copy</h5>
                                                <p className="small text-light">Generate professional copy for your website that converts users.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block-head">
                                <div className="nk-block-head-between">
                                    <div className="nk-block-head-content"><h2 className="display-6">Recent Documents</h2></div>
                                    <div className="nk-block-head-content">
                                        <a href="document-saved.html" className="link"><span>See All</span> <em className="icon ni ni-chevron-right"></em></a>
                                    </div>
                                </div>
                            </div>
                            <div className="nk-block">
                                <div className="card">
                                    <table className="table table-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="tb-col tb-col-check">
                                                    <div className="form-check"><input className="form-check-input" type="checkbox" value="" /></div>
                                                </th>
                                                <th className="tb-col"><h6 className="overline-title">Name</h6></th>
                                                <th className="tb-col tb-col-sm"><h6 className="overline-title">Type</h6></th>
                                                <th className="tb-col tb-col-md"><h6 className="overline-title">Last Modified</h6></th>
                                                <th className="tb-col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="tb-col tb-col-check">
                                                    <div className="form-check"><input className="form-check-input" type="checkbox" value="" /></div>
                                                </td>
                                                <td className="tb-col"><div className="caption-text">The Impact of Artificial Intelligence on the Future of Work</div></td>
                                                <td className="tb-col tb-col-sm"><div className="badge text-bg-dark-soft rounded-pill px-2 py-1 fs-6 lh-sm">Document</div></td>
                                                <td className="tb-col tb-col-md">
                                                    <div className="fs-6 text-light d-inline-flex flex-wrap gap gx-2"><span>Feb 15,2023 </span> <span>02:31 PM</span></div>
                                                </td>
                                                <td className="tb-col tb-col-end">
                                                    <div className="dropdown">
                                                        <button className="btn btn-sm btn-icon btn-zoom me-n1" type="button" data-bs-toggle="dropdown"><em className="icon ni ni-more-h"></em></button>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <div className="dropdown-content">
                                                                <ul className="link-list link-list-hover-bg-primary link-list-md">
                                                                    <li>
                                                                        <a href="#l"><em className="icon ni ni-eye"></em><span>View Document</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><em className="icon ni ni-edit"></em><span>Rename</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><em className="icon ni ni-trash"></em><span>Move to Trash</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="tb-col tb-col-check">
                                                    <div className="form-check"><input className="form-check-input" type="checkbox" value="" /></div>
                                                </td>
                                                <td className="tb-col"><div className="caption-text">How to Boost Your Online Presence with Social Media Marketing</div></td>
                                                <td className="tb-col tb-col-sm"><div className="badge text-bg-blue-soft rounded-pill px-2 py-1 fs-6 lh-sm">Social Media</div></td>
                                                <td className="tb-col tb-col-md">
                                                    <div className="fs-6 text-light d-inline-flex flex-wrap gap gx-2"><span>Feb 15,2023 </span> <span>02:31 PM</span></div>
                                                </td>
                                                <td className="tb-col tb-col-end">
                                                    <div className="dropdown">
                                                        <button className="btn btn-sm btn-icon btn-zoom me-n1" type="button" data-bs-toggle="dropdown"><em className="icon ni ni-more-h"></em></button>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <div className="dropdown-content">
                                                                <ul className="link-list link-list-hover-bg-primary link-list-md">
                                                                    <li>
                                                                        <a href="#l"><em className="icon ni ni-eye"></em><span>View Document</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><em className="icon ni ni-edit"></em><span>Rename</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><em className="icon ni ni-trash"></em><span>Move to Trash</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="tb-col tb-col-check">
                                                    <div className="form-check"><input className="form-check-input" type="checkbox" value="" /></div>
                                                </td>
                                                <td className="tb-col"><div className="caption-text">Top 10 Tips for Effective Time Management in the Workplace</div></td>
                                                <td className="tb-col tb-col-sm"><div className="badge text-bg-primary-soft rounded-pill px-2 py-1 fs-6 lh-sm">Blog Content</div></td>
                                                <td className="tb-col tb-col-md">
                                                    <div className="fs-6 text-light d-inline-flex flex-wrap gap gx-2"><span>Feb 15,2023 </span> <span>02:31 PM</span></div>
                                                </td>
                                                <td className="tb-col tb-col-end">
                                                    <div className="dropdown">
                                                        <button className="btn btn-sm btn-icon btn-zoom me-n1" type="button" data-bs-toggle="dropdown"><em className="icon ni ni-more-h"></em></button>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <div className="dropdown-content">
                                                                <ul className="link-list link-list-hover-bg-primary link-list-md">
                                                                    <li>
                                                                        <a href="#l"><em className="icon ni ni-eye"></em><span>View Document</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><em className="icon ni ni-edit"></em><span>Rename</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><em className="icon ni ni-trash"></em><span>Move to Trash</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="tb-col tb-col-check">
                                                    <div className="form-check"><input className="form-check-input" type="checkbox" value="" /></div>
                                                </td>
                                                <td className="tb-col"><div className="caption-text">Transforming Healthcare with Big Data: Exploring the Opportunities</div></td>
                                                <td className="tb-col tb-col-sm"><div className="badge text-bg-purple-soft rounded-pill px-2 py-1 fs-6 lh-sm">Website Copy &amp; SEO</div></td>
                                                <td className="tb-col tb-col-md">
                                                    <div className="fs-6 text-light d-inline-flex flex-wrap gap gx-2"><span>Feb 15,2023 </span> <span>02:31 PM</span></div>
                                                </td>
                                                <td className="tb-col tb-col-end">
                                                    <div className="dropdown">
                                                        <button className="btn btn-sm btn-icon btn-zoom me-n1" type="button" data-bs-toggle="dropdown"><em className="icon ni ni-more-h"></em></button>
                                                        <div className="dropdown-menu dropdown-menu-end">
                                                            <div className="dropdown-content">
                                                                <ul className="link-list link-list-hover-bg-primary link-list-md">
                                                                    <li>
                                                                        <a href="#l"><em className="icon ni ni-eye"></em><span>View Document</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><em className="icon ni ni-edit"></em><span>Rename</span></a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#"><em className="icon ni ni-trash"></em><span>Move to Trash</span></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nk-footer">
                <div className="container-xl">
                    <div className="d-flex align-items-center flex-wrap justify-content-between mx-n3">
                        <div className="nk-footer-links px-3">
                            <ul className="nav nav-sm">
                                <li className="nav-item"><a className="nav-link" href="../index-2.html#">Home</a></li>
                                <li className="nav-item"><a className="nav-link" href="../index-2.html#">Pricing</a></li>
                                <li className="nav-item"><a className="nav-link" href="../index-2.html#">Privacy Policy</a></li>
                                <li className="nav-item"><a className="nav-link" href="../index-2.html#">FAQ</a></li>
                                <li className="nav-item"><a className="nav-link" href="../index-2.html#">Contact</a></li>
                            </ul>
                        </div>
                        <div className="nk-footer-copyright fs-6 px-3">&copy; 2023 All Rights Reserved to <a href="/">docsphere.ai</a>.</div>
                    </div>
                </div>
            </div>
        </div>
      </div> */}
      <div className="nk-content">
        <div className="container-xl">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block-head nk-page-head">
                <div className="nk-block-head-between">
                  <div className="nk-block-head-content align-center d-flex justify-content-between w-100">
                    <h2 className="display-6 mb-0 py-2 px-3 ">
                      Welcome {Helpers.authUser.name}!
                    </h2>
                    {organizationName && (
                      <h4 className=" px-3 py-2 bg-light rounded-4">
                        Org: {organizationName}
                      </h4>
                    )}

                  </div>
                </div>
              </div>
              <div className="nk-block">
                <div className="row g-gs">
                  <div className="col-sm-6 col-xxl-3">
                    <div className="card card-full bg-purple bg-opacity-10 border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <div className="fs-6 text-light mb-0">
                            Words Available
                          </div>
                          <a href="history.html" className="link link-purple">
                            See History
                          </a>
                        </div>
                        <h5 className="fs-1">
                          452 <small className="fs-3">words</small>
                        </h5>
                        <div className="fs-7 text-light mt-1">
                          <span className="text-dark">1548</span>/2000 free
                          words generated
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xxl-3">
                    <div className="card card-full bg-blue bg-opacity-10 border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <div className="fs-6 text-light mb-0">
                            Drafts Available
                          </div>
                          <a
                            href="document-drafts.html"
                            className="link link-blue"
                          >
                            See All
                          </a>
                        </div>
                        <h5 className="fs-1">
                          3 <small className="fs-3">Drafts</small>
                        </h5>
                        <div className="fs-7 text-light mt-1">
                          <span className="text-dark">7</span>/10 free drafts
                          created
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xxl-3">
                    <div className="card card-full bg-indigo bg-opacity-10 border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <div className="fs-6 text-light mb-0">
                            Documents Available
                          </div>
                          <a
                            href="document-saved.html"
                            className="link link-indigo"
                          >
                            See All
                          </a>
                        </div>
                        <h5 className="fs-1">
                          6 <small className="fs-3">Documents</small>
                        </h5>
                        <div className="fs-7 text-light mt-1">
                          <span className="text-dark">4</span>/10 free documents
                          created
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xxl-3">
                    <div className="card card-full bg-cyan bg-opacity-10 border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <div className="fs-6 text-light mb-0">
                            Tools Available
                          </div>
                          <a href="templates.html" className="link link-cyan">
                            All Tools
                          </a>
                        </div>
                        <h5 className="fs-1">
                          12 <small className="fs-3">Tools</small>
                        </h5>
                        <div className="fs-7 text-light mt-1">
                          <span className="text-dark">4</span>/16 free tools
                          used to generate content
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-block-head">
                <div className="nk-block-head-between">
                  <div className="nk-block-head-content">
                    <h2 className="display-6">Popular Templates</h2>
                  </div>
                  <div className="nk-block-head-content">
                    <a href="templates.html" className="link">
                      Explore All
                    </a>
                  </div>
                </div>
              </div>
              <div className="nk-block">
                <div className="row g-gs">
                  <div className="col-sm-6 col-xxl-3">
                    <div className="card card-full">
                      <div className="card-body">
                        <div className="media media-rg media-middle media-circle text-primary bg-primary bg-opacity-20 mb-3">
                          <em className="icon ni ni-bulb-fill"></em>
                        </div>
                        <h5 className="fs-4 fw-medium">Blog Ideas</h5>
                        <p className="small text-light">
                          Produce trendy blog ideas for your business that
                          engages.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xxl-3">
                    <div className="card card-full">
                      <div className="card-body">
                        <div className="position-absolute end-0 top-0 me-4 mt-4">
                          <div className="badge text-bg-dark rounded-pill text-uppercase">
                            New
                          </div>
                        </div>
                        <div className="media media-rg media-middle media-circle text-blue bg-blue bg-opacity-20 mb-3">
                          <em className="icon ni ni-spark-fill"></em>
                        </div>
                        <h5 className="fs-4 fw-medium">Social Media Posts</h5>
                        <p className="small text-light">
                          Creative and engaging social media post for your
                          brand.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xxl-3">
                    <div className="card card-full">
                      <div className="card-body">
                        <div className="media media-rg media-middle media-circle text-red bg-red bg-opacity-20 mb-3">
                          <em className="icon ni ni-youtube-fill"></em>
                        </div>
                        <h5 className="fs-4 fw-medium">
                          YouTube Tags Generator
                        </h5>
                        <p className="small text-light">
                          Generate SEO optimized tags/keywords for your YouTube
                          video.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xxl-3">
                    <div className="card card-full">
                      <div className="card-body">
                        <div className="media media-rg media-middle media-circle text-purple bg-purple bg-opacity-20 mb-3">
                          <em className="icon ni ni-laptop"></em>
                        </div>
                        <h5 className="fs-4 fw-medium">
                          Website Headlines/Copy
                        </h5>
                        <p className="small text-light">
                          Generate professional copy for your website that
                          converts users.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nk-block-head">
                <div className="nk-block-head-between">
                  <div className="nk-block-head-content">
                    <h2 className="display-6">Recent Documents</h2>
                  </div>
                  <div className="nk-block-head-content">
                    <a href="document-saved.html" className="link">
                      <span>See All</span>{" "}
                      <em className="icon ni ni-chevron-right"></em>
                    </a>
                  </div>
                </div>
              </div>
              <div className="nk-block">
                <div className="card">
                  <table className="table table-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="tb-col tb-col-check">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                          </div>
                        </th>
                        <th className="tb-col">
                          <h6 className="overline-title">Name</h6>
                        </th>
                        <th className="tb-col tb-col-sm">
                          <h6 className="overline-title">Type</h6>
                        </th>
                        <th className="tb-col tb-col-md">
                          <h6 className="overline-title">Last Modified</h6>
                        </th>
                        <th className="tb-col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="tb-col tb-col-check">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                          </div>
                        </td>
                        <td className="tb-col">
                          <div className="caption-text">
                            The Impact of Artificial Intelligence on the Future
                            of Work
                          </div>
                        </td>
                        <td className="tb-col tb-col-sm">
                          <div className="badge text-bg-dark-soft rounded-pill px-2 py-1 fs-6 lh-sm">
                            Document
                          </div>
                        </td>
                        <td className="tb-col tb-col-md">
                          <div className="fs-6 text-light d-inline-flex flex-wrap gap gx-2">
                            <span>Feb 15,2023 </span> <span>02:31 PM</span>
                          </div>
                        </td>
                        <td className="tb-col tb-col-end">
                          <div className="dropdown">
                            <button
                              className="btn btn-sm btn-icon btn-zoom me-n1"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              <em className="icon ni ni-more-h"></em>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <div className="dropdown-content">
                                <ul className="link-list link-list-hover-bg-primary link-list-md">
                                  <li>
                                    <a href="#l">
                                      <em className="icon ni ni-eye"></em>
                                      <span>View Document</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-edit"></em>
                                      <span>Rename</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-trash"></em>
                                      <span>Move to Trash</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="tb-col tb-col-check">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                          </div>
                        </td>
                        <td className="tb-col">
                          <div className="caption-text">
                            How to Boost Your Online Presence with Social Media
                            Marketing
                          </div>
                        </td>
                        <td className="tb-col tb-col-sm">
                          <div className="badge text-bg-blue-soft rounded-pill px-2 py-1 fs-6 lh-sm">
                            Social Media
                          </div>
                        </td>
                        <td className="tb-col tb-col-md">
                          <div className="fs-6 text-light d-inline-flex flex-wrap gap gx-2">
                            <span>Feb 15,2023 </span> <span>02:31 PM</span>
                          </div>
                        </td>
                        <td className="tb-col tb-col-end">
                          <div className="dropdown">
                            <button
                              className="btn btn-sm btn-icon btn-zoom me-n1"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              <em className="icon ni ni-more-h"></em>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <div className="dropdown-content">
                                <ul className="link-list link-list-hover-bg-primary link-list-md">
                                  <li>
                                    <a href="#l">
                                      <em className="icon ni ni-eye"></em>
                                      <span>View Document</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-edit"></em>
                                      <span>Rename</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-trash"></em>
                                      <span>Move to Trash</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="tb-col tb-col-check">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                          </div>
                        </td>
                        <td className="tb-col">
                          <div className="caption-text">
                            Top 10 Tips for Effective Time Management in the
                            Workplace
                          </div>
                        </td>
                        <td className="tb-col tb-col-sm">
                          <div className="badge text-bg-primary-soft rounded-pill px-2 py-1 fs-6 lh-sm">
                            Blog Content
                          </div>
                        </td>
                        <td className="tb-col tb-col-md">
                          <div className="fs-6 text-light d-inline-flex flex-wrap gap gx-2">
                            <span>Feb 15,2023 </span> <span>02:31 PM</span>
                          </div>
                        </td>
                        <td className="tb-col tb-col-end">
                          <div className="dropdown">
                            <button
                              className="btn btn-sm btn-icon btn-zoom me-n1"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              <em className="icon ni ni-more-h"></em>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <div className="dropdown-content">
                                <ul className="link-list link-list-hover-bg-primary link-list-md">
                                  <li>
                                    <a href="#l">
                                      <em className="icon ni ni-eye"></em>
                                      <span>View Document</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-edit"></em>
                                      <span>Rename</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-trash"></em>
                                      <span>Move to Trash</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="tb-col tb-col-check">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                          </div>
                        </td>
                        <td className="tb-col">
                          <div className="caption-text">
                            Transforming Healthcare with Big Data: Exploring the
                            Opportunities
                          </div>
                        </td>
                        <td className="tb-col tb-col-sm">
                          <div className="badge text-bg-purple-soft rounded-pill px-2 py-1 fs-6 lh-sm">
                            Website Copy &amp; SEO
                          </div>
                        </td>
                        <td className="tb-col tb-col-md">
                          <div className="fs-6 text-light d-inline-flex flex-wrap gap gx-2">
                            <span>Feb 15,2023 </span> <span>02:31 PM</span>
                          </div>
                        </td>
                        <td className="tb-col tb-col-end">
                          <div className="dropdown">
                            <button
                              className="btn btn-sm btn-icon btn-zoom me-n1"
                              type="button"
                              data-bs-toggle="dropdown"
                            >
                              <em className="icon ni ni-more-h"></em>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <div className="dropdown-content">
                                <ul className="link-list link-list-hover-bg-primary link-list-md">
                                  <li>
                                    <a href="#l">
                                      <em className="icon ni ni-eye"></em>
                                      <span>View Document</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-edit"></em>
                                      <span>Rename</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <em className="icon ni ni-trash"></em>
                                      <span>Move to Trash</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nk-footer">
        <div className="container-xl">
          <div className="d-flex align-items-center flex-wrap justify-content-between mx-n3">
            <div className="nk-footer-links px-3">
              <ul className="nav nav-sm">
                <li className="nav-item">
                  <a className="nav-link" href="../index-2.html#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../index-2.html#">
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../index-2.html#">
                    Privacy Policy
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../index-2.html#">
                    FAQ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="../index-2.html#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="nk-footer-copyright fs-6 px-3">
              &copy; 2024 All Rights Reserved to <a href="/">DOCSPHERE.AI</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
