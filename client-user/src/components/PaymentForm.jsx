import { useState, useEffect, useCallback } from "react";
import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "../stripe.utils";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/users/courses/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const p = res.data.course.price;

        try {
          const res2 = await axios.post(
            "http://localhost:3000/payment/create-payment-intent",
            {
              course: { price: p },
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          setClientSecret(res2.data.clientSecret);
          setLoading(false); // Set loading to false when clientSecret is fetched
        } catch (error) {
          setError("Error creating payment intent");
          setLoading(false); // Set loading to false on error
        }
      } catch (error) {
        setError("Error fetching course data");
        setLoading(false); // Set loading to false on error
      }
    };

    fetchClientSecret();
  }, [id]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (loading) {
    // Display a loading spinner or message
    return <div>Loading...</div>;
  }

  if (error) {
    // Display an error message
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <Elements options={options} stripe={stripePromise} key={clientSecret}>
        <CheckoutForm id={id} />
      </Elements>
    </div>
  );
};

export default PaymentForm;
