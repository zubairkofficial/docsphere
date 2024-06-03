import React, { useState } from 'react';
import axios from 'axios';

const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userId, setUserId] = useState(1); // Example user ID, replace with actual user ID logic
  const [otherField1, setOtherField1] = useState('');
  const [otherField2, setOtherField2] = useState('');

  const plans = [
    { id: 3, name: 'Basic', price: 'Free', features: ['1000 words/mo. generation', 'Total 5000 words generation'] },
    { id: 4, name: 'Enterprise', price: '$225 / month', features: ['Dedicated Account Manager', 'Custom Tools'] },
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleBuyPlan = async () => {
    const endpoint = 'https://your-endpoint-url.com/api/buy-plan';
    const data = {
      pricePlanId: selectedPlan,
      userId: userId,
      otherField1: otherField1,
      daye: otherField2,
    };

    try {
      const response = await axios.post(endpoint, data);
      console.log('Plan purchased successfully:', response.data);
    } catch (error) {
      console.error('Error purchasing plan:', error);
    }
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
              <div className="card mt-xl-5">
                <div className="row g-0">
                  {plans.map((plan) => (
                    <div className="col-xl-6 mb-4" key={plan.id} onClick={() => handlePlanSelect(plan.id)}>
                      <div className={`pricing card ${selectedPlan === plan.id ? 'selected' : ''} bg-white rounded h-100`}>
                        <div className="pricing-content card-body d-flex flex-column justify-content-between">
                          <div>
                            <h5 className="fw-normal text-dark">{plan.name}</h5>
                            <h2 className="mb-3">Customized Plan</h2>
                            <div className="pricing-price-wrap">
                              <div className="pricing-price">
                                <h3 className="display-4 mb-3 fw-semibold">{plan.price}</h3>
                              </div>
                            </div>
                            <ul className="pricing-features list-unstyled">
                              {plan.features.map((feature, index) => (
                                <li key={index}>
                                  <em className="icon text-primary ni ni-check-circle"></em>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-center">
                <button className="btn btn-primary" onClick={handleBuyPlan} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  Buy Plan
                </button>
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
