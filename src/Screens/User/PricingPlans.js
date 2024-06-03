import React, { useState } from 'react';

const PricingPlans = () => {
  const [isYearly, setIsYearly] = useState(false);

  const togglePlan = () => {
    setIsYearly(!isYearly);
  };

  return (
    <div className="nk-content">
      <div className="container-xl">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-page-head">
              <div className="nk-block-head-between">
                <div className="nk-block-head-content">
                  <h2 className="display-6">Pricing Plans</h2>
                  <p>
                    Generate unlimited copy 10X faster with our cost-effective plan to write blog posts, social media ads and many more.
                  </p>
                </div>
              </div>
            </div>
            <div className="nk-block">
              <div className="pricing-toggle-wrap mb-4">
                <button
                  className={`pricing-toggle-button ${!isYearly ? 'active' : ''}`}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </button>
                <button
                  className={`pricing-toggle-button ${isYearly ? 'active' : ''}`}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly (Save 25%)
                </button>
              </div>
              <div className="card mt-xl-5">
                <div className="row g-0">
                  {/** Basic Plan */}
                  <div className="col-xl-4">
                    <div className="pricing bg-white rounded-start">
                      <div className="pricing-content">
                        <div className="w-sm-70 w-md-50 w-xl-100 text-center text-xl-start mx-auto">
                          <h5 className="fw-normal text-light">Basic</h5>
                          <h2 className="mb-3">Customized Plan</h2>
                          <div className="pricing-price-wrap">
                            <div className="pricing-price">
                              <h3 className="display-1 mb-3 fw-semibold">Free</h3>
                            </div>
                          </div>
                          <div className="mb-2">
                            <button className="btn btn-outline-light w-100">
                              Upgrade Now
                            </button>
                            <div className="d-flex align-items-center justify-content-center text-center text-light fs-12px lh-lg fst-italic mt-1">
                              <svg width="13" height="13" viewBox="0 0 13 13" className="text-danger" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 2.375V10.625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.9281 4.4375L10.0719 8.5625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.9281 8.5625L10.0719 4.4375" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="ms-1">Cancel Anytime</span>
                            </div>
                          </div>
                          <ul className="pricing-features">
                            <li><em className="icon text-primary ni ni-check-circle"></em><span>1000 words/mo. generation</span></li>
                            <li><em className="icon text-primary ni ni-check-circle"></em><span>Total 5000 words generation</span></li>
                          
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/** Professional Plan */}
                  <div className="col-xl-4">
                    <div className="pricing pricing-featured mx-n1px my-xl-n1px bg-primary mt-5">
                      <div className="position-absolute text-center py-1 px-4 text-bg-primary rounded-top start-0 end-0 bottom-100">
                        <div className="fw-medium lh-sm fs-14px">Most Popular</div>
                      </div>
                      <div className="pricing-content bg-primary-soft">
                        <div className="w-sm-70 w-md-50 w-xl-100 text-center text-xl-start mx-auto">
                          <h5 className="fw-normal text-light">Professional</h5>
                          <h2 className="mb-3 text-primary">Customized Plan</h2>
                          <div className="pricing-price-wrap">
                            <div className={`pricing-price ${!isYearly ? 'active' : ''}`}>
                              <h3 className="display-1 mb-3 fw-semibold">
                                {isYearly ? "$500" : "$48"}
                                <span className="caption-text text-light fw-normal">
                                  / {isYearly ? "year" : "month"}
                                </span>
                              </h3>
                            </div>
                          </div>
                          <div className="mb-2">
                            <button className="btn btn-primary w-100">Upgrade Now</button>
                            <div className="d-flex align-items-center justify-content-center text-center text-light fs-12px lh-lg fst-italic mt-1">
                              <svg width="13" height="13" viewBox="0 0 13 13" className="text-danger" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 2.375V10.625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.9281 4.4375L10.0719 8.5625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.9281 8.5625L10.0719 4.4375" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="ms-1">Cancel Anytime</span>
                            </div>
                          </div>
                          <ul className="pricing-features">
                            <li><em className="icon text-primary ni ni-check-circle-fill"></em><span>Unlimited words generation</span></li>
                            <li><em className="icon text-primary ni ni-check-circle-fill"></em><span>Access to all templates for free</span></li>
                           
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/** Enterprise Plan */}
                  <div className="col-xl-4">
                    <div className="pricing bg-white rounded-end">
                      <div className="pricing-content">
                        <div className="w-sm-70 w-md-50 w-xl-100 text-center text-xl-start mx-auto">
                          <h5 className="fw-normal text-light">Enterprise</h5>
                          <h2 className="mb-3">Customized Plan</h2>
                          <div className="pricing-price-wrap">
                            <div className={`pricing-price ${!isYearly ? 'active' : ''}`}>
                              <h3 className="display-1 mb-3 fw-semibold">
                                {isYearly ? "$2500" : "$225"}
                                <span className="caption-text text-light fw-normal">
                                  / {isYearly ? "year" : "month"}
                                </span>
                              </h3>
                            </div>
                          </div>
                          <div className="mb-2">
                            <button className="btn btn-outline-light w-100">{isYearly ? "Contact Sales" : "Upgrade Now"}</button>
                            <div className="d-flex align-items-center justify-content-center text-center text-light fs-12px lh-lg fst-italic mt-1">
                              <svg width="13" height="13" viewBox="0 0 13 13" className="text-danger" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 2.375V10.625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.9281 4.4375L10.0719 8.5625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.9281 8.5625L10.0719 4.4375" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="ms-1">Cancel Anytime</span>
                            </div>
                          </div>
                          <ul className="pricing-features">
                            <li><em className="icon text-primary ni ni-check-circle"></em><span>Dedicated Account Manager</span></li>
                            <li><em className="icon text-primary ni ni-check-circle"></em><span>Custom Tools</span></li>
                         
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h5>Want to learn more about our pricing &amp; plans?</h5>
                <p>
                  Read our <a href="pricing-plans.html">Plans</a>, <a href="#">Billing &amp; Payment</a>, <a href="#">FAQs</a> to learn more about our service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
