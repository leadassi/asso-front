import React, { useEffect } from "react";

const PaymentComponent = () => {
  const paymentServiceURL = "http://192.168.17.101:9090/";
  const orderServiceURL = "http://192.168.17.234:8081/";
  const userId = 1; // Remplacez par la logique pour obtenir l'ID utilisateur
  const orderId = 8; // Remplacez par la logique pour obtenir l'ID commande

  useEffect(() => {
    if (!userId || !orderId) {
      console.error("User ID or Order ID is missing.");
      return;
    }
  }, [userId, orderId]);

  // Fonctions auxiliaires
  const getPaymentData = async (userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}cinetpaypayments/${userId}/${orderId}`);
      return response.json();
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const getDeliveryPaymentData = async (userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}cinetpaydeliverypayments/${userId}/${orderId}`);
      return response.json();
    } catch (error) {
      console.error("Error fetching delivery payment data:", error);
    }
  };

  const reduceQuantity = async (orderId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/orders/contenancepanier`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Product quantity reduced.");
    } catch (error) {
      console.error("Error reducing quantity:", error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${orderServiceURL}commande/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Statut: status }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("Order status updated.");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const sendPaymentRequest = async (orderId, status, paymentMethod, amount, userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/sendpayment`, {
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
      console.log("Payment sent to delivery service.");
    } catch (error) {
      console.error("Error sending payment request:", error);
    }
  };

  const saveTransaction = async (orderId, status, paymentMethod, amount, userId) => {
    try {
      const response = await fetch(`${paymentServiceURL}payments/savepayment`, {
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
      console.log("Transaction saved.");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  // Fonction de paiement avec CinetPay
  const checkout = async () => {
    const userData = await getPaymentData(userId);
    if (!window.CinetPay) {
      console.error("CinetPay not found.");
      return;
    }

    window.CinetPay.setConfig({
      apikey: userData.apikey,
      site_id: userData.siteId,
      notify_url: userData.notifyUrl,
      return_url: userData.returnUrl,
      mode: userData.mode,
    });

    window.CinetPay.getCheckout({
      transaction_id: userData.transactionId,
      amount: userData.amount,
      currency: userData.currency,
      channels: userData.channels,
      description: userData.description,
      customer_name: userData.customerName,
      customer_surname: userData.customerSurname,
      customer_email: userData.customerMail,
      customer_phone_number: userData.customerPhoneNumber,
      customer_address: userData.customerAddress,
      customer_city: userData.customerCity,
      customer_country: userData.customerCountry,
      customer_state: userData.customerState,
      customer_zip_code: userData.customerZipCode,
    });

    window.CinetPay.waitResponse(async (data) => {
      console.log("Response from CinetPay:", data);
      if (data.status === "ACCEPTED") {
        await reduceQuantity(orderId);
        await sendPaymentRequest(orderId, data.status, data.payment_method, data.amount, userId);
      }
      await updateOrderStatus(orderId, data.status);
      await saveTransaction(orderId, data.status, data.payment_method, data.amount, userId);
    });

    window.CinetPay.onError((data) => {
      console.error("Error from CinetPay:", data);
    });
  };

  const deliveryCheckout = () => {
    getPaymentData(userId).then((userData) => {
      if (!window.CinetPay) {
        console.error("CinetPay n'est pas trouvé.");
        return;
      }

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
        customer_email: userData.customer_email,
        customer_phone_number: userData.customer_phone_number,
        customer_address: userData.customer_address,
        customer_city: userData.customer_city,
        customer_country: userData.customer_country,
        customer_state: userData.customer_state,
        customer_zip_code: userData.customer_zip_code,
      });

      window.CinetPay.waitResponse(async (data) => {
        console.log("Réponse de CinetPay:", data);

        if (data.status === "REFUSED") {
          alert("Votre paiement a échoué");
        } else if (data.status === "ACCEPTED") {
          await reduceQuantity(orderId);
          alert("Votre paiement a été effectué avec succès");
        }
        await updateOrderStatus(userData.transaction_id, "IN_PROGRESS");
        await saveTransaction(userData.transaction_id, data.status, data.payment_method, data.amount, userId);
      });

      window.CinetPay.onError((data) => {
        console.error("Erreur de CinetPay:", data);
      });
    });
  };

  // Fonction pour simuler un paiement sans transaction
  const testCheckout = () => {
    getPaymentData(userId).then((userData) => {
      updateOrderStatus(userData.transaction_id, "ACCEPTED");
      reduceQuantity(orderId);
      saveTransaction(userData.transaction_id, "ACCEPTED", "OMCM", userData.amount, userId);
    });
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={checkout}>Proceed to Payment</button>
    </div>
  );
};

export default PaymentComponent;
