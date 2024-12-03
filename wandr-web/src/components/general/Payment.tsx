import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Script from "next/script";

// Declare the window object with payhere to avoid TypeScript errors
declare global {
  interface Window {
    payhere: any;
  }
}

interface PayHerePaymentProps {
  amount: number;
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
}

const PayHerePayment = ({
  amount,
  orderId,
  customerName,
  email,
  phone,
}: PayHerePaymentProps) => {
  const [payhereLoaded, setPayhereLoaded] = useState(false);

  useEffect(() => {
    if (window.payhere) {
      setPayhereLoaded(true); // Mark PayHere as loaded once window.payhere is available
    }
  }, []);

  const handlePayment = () => {
    if (payhereLoaded) {
      const payment = {
        sandbox: true,
        merchant_id: "1228916", // Replace with your actual Merchant ID
        return_url: "http://localhost:3000/success", // Modify as needed
        cancel_url: "http://localhost:3000/cancel",
        notify_url: "http://localhost:8080/api/payments/notify", // Backend notify URL

        order_id: orderId,
        items: "Order Payment",
        amount: amount,
        currency: "LKR",
        first_name: customerName.split(" ")[0],
        last_name: customerName.split(" ")[1] || "",
        email: email,
        phone: phone,
      };

      // Initiate the payment
      if (window.payhere) {
        window.payhere.startPayment(payment);
      } else {
        console.error("PayHere script is not loaded.");
      }
    } else {
      console.error("PayHere script is not ready yet.");
    }
  };

  return (
    <div>
      {/* Load the PayHere script dynamically */}
      <Script
        strategy="afterInteractive"
        src="https://www.payhere.lk/lib/payhere.js"
        onLoad={() => {
          console.log("PayHere script loaded successfully.");
          setPayhereLoaded(true); // Update state when the script is fully loaded
        }}
        onError={(e) => {
          console.error("Error loading PayHere script:", e);
        }}
      />
      {payhereLoaded ? (
        <Button type="primary" onClick={handlePayment}>
          Pay Now
        </Button>
      ) : (
        <div>Loading payment system...</div> // Show loading message until script is ready
      )}
    </div>
  );
};

export default PayHerePayment;
