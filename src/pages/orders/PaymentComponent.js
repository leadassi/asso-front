import React, { useEffect } from "react";

const PaymentComponent = () => {
  const userId = sessionStorage.getItem("utilisateurId");
  const orderId = sessionStorage.getItem("idCommande");
  const paymentServiceURL = "http://192.168.93.101:9090/";
  const orderServiceURL = "http://192.168.93.234:8081/";

  useEffect(() => {
    if (!userId || !orderId) {
      console.error("User ID or Order ID not found in session storage.");
    }
  }, []);

  const getPaymentData = async () => {
    try {
      const response = await fetch(
        `${paymentServiceURL}cinetpaypayments/${userId}/${orderId}`
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const getDeliveryPaymentData = async () => {
    try {
      const response = await fetch(
        `${paymentServiceURL}cinetpaydeliverypayments/${userId}/${orderId}`
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching delivery payment data:", error);
    }
  };

  const handleCheckout = async () => {
    const userData = await getPaymentData();
    if (window.CinetPay) {
      window.CinetPay.setConfig({
        apikey: userData.apikey,
        site_id: userData.site_id,
        notify_url: userData.notify_url,
        return_url: userData.return_url,
        mode: userData.mode,
      });

      window.CinetPay.getCheckout({
        transaction_id: userData.transaction_id,
        amount: userData.amount,
        currency: userData.currency,
        channels: userData.channels,
        description: userData.description,
        customer_name: userData.customer_name,
        customer_surname: userData.customer_surname,
        customer_email: userData.customer_mail,
        customer_phone_number: userData.customer_phone_number,
        customer_address: userData.customer_address,
        customer_city: userData.customer_city,
        customer_country: userData.customer_country,
        customer_state: userData.customer_state,
        customer_zip_code: userData.customer_zip_code,
      });

      window.CinetPay.waitResponse(async (data) => {
        console.log(data);

        if (data.status === "REFUSED") {
          alert("Votre paiement a échoué");
          window.location.reload();
        } else if (data.status === "ACCEPTED") {
          await reduceQuantity(orderId);
          alert("Votre paiement a été effectué avec succès");
          window.location.reload();
        }
        await updatePaymentStatus(userData.transaction_id, data.status);
        await saveTransaction(
          userData.transaction_id,
          data.status,
          data.payment_method,
          userData.amount
        );
      });

      window.CinetPay.onError((data) => {
        console.error(data);
      });
    } else {
      console.error("CinetPay library is not loaded.");
    }
  };

  const reduceQuantity = async (orderId) => {
    try {
      const response = await fetch(
        `${paymentServiceURL}payments/orders/contenancepanier/${orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Quantity reduced:", result);
    } catch (error) {
      console.error("Error reducing quantity:", error);
    }
  };

  const updatePaymentStatus = async (orderId, status) => {
    try {
      const response = await fetch(
        `${orderServiceURL}commande/historique-commandes/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            statutCommande: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Payment status updated:", result);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const saveTransaction = async (orderId, status, paymentMethod, amount) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          customer_id: userId,
          amount,
          payment_method: paymentMethod,
          payment_state: status,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Transaction saved:", result);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} className="btn btn-primary">
        Payer avec CinetPay
      </button>
    </div>
  );
};

export default PaymentComponent;
