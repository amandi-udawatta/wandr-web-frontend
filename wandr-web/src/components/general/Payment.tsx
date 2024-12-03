import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Modal, Button, Col, Row, Tag } from 'antd';
import BusinessPlanCard from '../admin/BusinessPlanCard';
import { apiService, showNotification } from '@/services/apiService';
import { getPlanIdFromToken } from '@/services/tokenDecodeService';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = ({ selectedPlan, onClose }: { selectedPlan: any; onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await apiService.post('/stripe/create-payment-intent', { amount: selectedPlan.price });
        console.log(response, "response");
        console.log(response.data.clientSecret, "clientSecret");
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setErrorMessage('Failed to initialize payment.');
      }
    };
    if (selectedPlan) fetchPaymentIntent();
  }, [selectedPlan]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (cardElement) {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret!, {
        payment_method: { card: cardElement },
      });
      if (error) setErrorMessage(error.message || 'Payment failed.');
      else {
        console.log('Payment succeeded:', paymentIntent);
        showNotification('success', 'Payment Successful', 'Payment has been successfully processed.');
        onClose();
      }
    }
  };

  return (
    <Modal open={true} onCancel={onClose} footer={null}>
      <h2 className="text-xl font-bold mb-4">Complete Payment for {selectedPlan.name}</h2>
      <form onSubmit={handleSubmit}>
        <CardElement className="border p-2 rounded mb-4" />
        <Button type="primary" htmlType="submit" disabled={!stripe}>
          Pay Rs.{selectedPlan.price}
        </Button>
      </form>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </Modal>
  );
};

const StripePayment = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [userPlanId, setUserPlanId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  useEffect(() => {
    
    const plan = getPlanIdFromToken()
    setUserPlanId(plan || 0);
    console.log(plan, "planId");

    const fetchBusinessPlans = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get('/business-plans');
        if (response.success) {
          const formattedData = response.data.map((item: any, index: any) => ({
            key: index + 1,
            id: item.planId,
            name: item.name,
            description: item.description,
            features: item.features,
            price: item.price,
          }));
          setPlans(formattedData);
        } else {
          throw new Error(response.message || 'Failed to fetch plans');
        }
      } catch (error) {
        showNotification('error', 'Error Fetching Plans', (error as Error).message );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessPlans();
  }, []);

  const handlePlanSelection = (plan: any) => {
    Modal.confirm({
      title: `Confirm Purchase of ${plan.name}`,
      content: `Are you sure you want to purchase the ${plan.name} plan for Rs.${plan.price}?`,
      onOk: () => {
        setShowPaymentPopup(true);
        setSelectedPlan(plan);
      },
    });
  };

  return (
    <div className="p-6 rounded-lg mx-5">
      <Row>
        <h1 className="text-2xl font-bold mb-3">Choose a plan to start with : </h1>
      </Row>
      <Row gutter={[16, 16]}>
        {plans.map((plan: any) => (
          <Col key={plan.id} span={8}>
            <BusinessPlanCard
              title={plan.name}
              description={plan.description}
              features={plan.features}
              price={plan.price}
              disabled={userPlanId === plan.id}
              extra={
                userPlanId === plan.id ? (
                  <Tag color="green">Already Purchased</Tag>
                ) : (
                  <Button type="primary" onClick={() => handlePlanSelection(plan)} className='bg-green-50'>
                    Select Plan
                  </Button>
                )
              }
            />
          </Col>
        ))}
      </Row>

      {showPaymentPopup && selectedPlan && (
        <Elements stripe={stripePromise}>
          <CheckoutForm selectedPlan={selectedPlan} onClose={() => setShowPaymentPopup(false)} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
