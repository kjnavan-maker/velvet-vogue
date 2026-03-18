import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCreditCard, FiShield, FiSmartphone, FiLock, FiUser } from "react-icons/fi";
import { SiVisa, SiMastercard, SiAmericanexpress } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../components/common/AnimatedPage";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";
import formatCurrency from "../utils/formatCurrency";
import { PAYMENT_METHODS } from "../utils/constants";
import { clearCart } from "../features/cart/cartSlice";
import { clearOrderState, createOrder } from "../features/orders/orderSlice";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  paymentMethod: "Card Payment (Demo)",
};

const initialDemoData = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  bankName: "",
  bankUsername: "",
  bankPassword: "",
  transferReference: "",
  otp: "",
};

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingFee } = useSelector((state) => state.cart);
  const { authData, profile } = useSelector((state) => state.auth);
  const { currentOrder, loading, error } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState(initialForm);
  const [demoData, setDemoData] = useState(initialDemoData);
  const [localError, setLocalError] = useState("");
  const [processingDemoPayment, setProcessingDemoPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const sourceUser = profile || authData?.user;

    if (sourceUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: sourceUser.name || "",
        email: sourceUser.email || "",
        street: sourceUser.address?.street || "",
        city: sourceUser.address?.city || "",
        state: sourceUser.address?.state || "",
        postalCode: sourceUser.address?.postalCode || "",
        country: sourceUser.address?.country || "",
      }));
    }
  }, [authData, profile]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    if (currentOrder?._id) {
      dispatch(clearCart());
      navigate(`/order-confirmation/${currentOrder._id}`);
    }

    return () => {
      dispatch(clearOrderState());
    };
  }, [currentOrder, dispatch, navigate]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const total = subtotal + (cartItems.length > 0 ? shippingFee : 0);

  const isDemoPayment =
    formData.paymentMethod === "Card Payment (Demo)" ||
    formData.paymentMethod === "Online Bank Transfer (Demo)";

  const isDemoCard = formData.paymentMethod === "Card Payment (Demo)";
  const isDemoBank = formData.paymentMethod === "Online Bank Transfer (Demo)";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDemoChange = (event) => {
    const { name, value } = event.target;
    setDemoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCommonFields = () => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "postalCode",
      "country",
      "paymentMethod",
    ];

    return requiredFields.every((field) => formData[field]?.trim());
  };

  const validateDemoPaymentFields = () => {
    if (isDemoCard) {
      return (
        demoData.cardName.trim() &&
        demoData.cardNumber.trim() &&
        demoData.expiry.trim() &&
        demoData.cvv.trim()
      );
    }

    if (isDemoBank) {
      return (
        demoData.bankName.trim() &&
        demoData.bankUsername.trim() &&
        demoData.bankPassword.trim()
      );
    }

    return true;
  };

  const createOrderPayload = () => ({
    orderItems: cartItems.map((item) => ({
      product: item.product,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    })),
    shippingInfo: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
    },
    paymentMethod: formData.paymentMethod,
    paymentResult: {
      id: `DEMO-${Date.now()}`,
      status:
        formData.paymentMethod === "Cash on Delivery" || formData.paymentMethod === "Bank Transfer"
          ? "PENDING"
          : "COMPLETED",
      updateTime: new Date().toISOString(),
      emailAddress: formData.email,
      mode: formData.paymentMethod.includes("Demo") ? "demo" : "manual",
    },
    itemsPrice: subtotal,
    shippingPrice: shippingFee,
    totalAmount: total,
  });

  const handlePlaceOrder = () => {
    dispatch(createOrder(createOrderPayload()));
  };

  const handleOpenPaymentModal = (event) => {
    event.preventDefault();
    setLocalError("");

    if (!validateCommonFields()) {
      setLocalError("Please complete all required shipping and contact fields.");
      return;
    }

    if (isDemoPayment) {
      setShowPaymentModal(true);
      return;
    }

    handlePlaceOrder();
  };

  const handleContinueFromPaymentModal = () => {
    setLocalError("");

    if (!validateDemoPaymentFields()) {
      setLocalError("Please complete the selected demo payment details.");
      return;
    }

    setShowPaymentModal(false);

    if (isDemoCard) {
      setShowOtpModal(true);
      return;
    }

    setProcessingDemoPayment(true);

    setTimeout(() => {
      setProcessingDemoPayment(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        dispatch(createOrder(createOrderPayload()));
      }, 1400);
    }, 1600);
  };

  const handleConfirmOtp = () => {
    setLocalError("");

    if (!demoData.otp.trim() || demoData.otp.trim().length < 4) {
      setLocalError("Please enter a valid demo OTP.");
      return;
    }

    setShowOtpModal(false);
    setProcessingDemoPayment(true);

    setTimeout(() => {
      setProcessingDemoPayment(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        dispatch(createOrder(createOrderPayload()));
      }, 1400);
    }, 1800);
  };

  if ((loading && !currentOrder) || processingDemoPayment) {
    return (
      <AnimatedPage className="section-padding">
        <div className="container-custom">
          <Loader
            text={
              processingDemoPayment
                ? "Securing and processing demo payment..."
                : "Processing your order..."
            }
          />
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="section-padding">
      <div className="container-custom">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
            Checkout
          </p>
          <h1 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">
            Complete your premium order
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <form onSubmit={handleOpenPaymentModal} className="card-surface p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-slate-900">Shipping & Contact Details</h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">Full Name</label>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">Street Address</label>
                <input
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">State / Province</label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="State or province"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Postal Code</label>
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Postal code"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Country</label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Country"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="select-field"
                >
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(localError || error) && (
              <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {localError || error}
              </p>
            )}

            <Button type="submit" className="mt-8">
              {isDemoPayment ? "Pay Now (Demo)" : "Place Order"}
            </Button>
          </form>

          <div className="card-surface h-fit p-6">
            <h3 className="text-2xl font-semibold text-slate-900">Order Summary</h3>

            <div className="mt-6 space-y-5">
              {cartItems.map((item) => (
                <div key={item.cartKey} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {item.size || "N/A"} • {item.color || "N/A"} • Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Items</span>
                <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Delivery</span>
                <span className="font-semibold text-slate-900">{formatCurrency(shippingFee)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Demo Mode Notice</p>
              <p className="mt-2 leading-7">
                Card and bank transfer payments are simulated for client presentation. No real money
                is charged in this version.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title={isDemoCard ? "Secure Demo Card Payment" : "Bank Login Verification"}
      >
        {isDemoCard ? (
          <div>
            <div className="mb-5 flex items-center justify-between rounded-[1.5rem] bg-slate-50 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-velvet-gold">
                  Accepted Cards
                </p>
                <div className="mt-3 flex items-center gap-3 text-2xl text-slate-700">
                  <SiVisa />
                  <SiMastercard />
                  <SiAmericanexpress />
                </div>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-soft">
                <FiCreditCard size={24} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">Cardholder Name</label>
                <input
                  name="cardName"
                  className="input-field"
                  placeholder="Name on card"
                  value={demoData.cardName}
                  onChange={handleDemoChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-800">Card Number</label>
                <input
                  name="cardNumber"
                  className="input-field"
                  placeholder="4111 1111 1111 1111"
                  value={demoData.cardNumber}
                  onChange={handleDemoChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">Expiry</label>
                <input
                  name="expiry"
                  className="input-field"
                  placeholder="12/28"
                  value={demoData.expiry}
                  onChange={handleDemoChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-800">CVV</label>
                <input
                  name="cvv"
                  className="input-field"
                  placeholder="123"
                  value={demoData.cvv}
                  onChange={handleDemoChange}
                />
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] bg-velvet-cream p-4 text-sm text-slate-700">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <FiShield />
                Demo Secure Checkout
              </div>
              <p className="mt-2 leading-7">
                This payment step simulates an OTP-based secured card transaction for client demo purposes.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5 overflow-hidden rounded-[1.5rem] border border-slate-200">
              <div className="bg-velvet-black px-5 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-velvet-gold">
                  Demo Internet Banking
                </p>
                <h4 className="mt-1 text-xl font-semibold">Secure Bank Login</h4>
              </div>

              <div className="space-y-4 bg-white p-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-800">Select Bank</label>
                  <select
                    name="bankName"
                    className="select-field"
                    value={demoData.bankName}
                    onChange={handleDemoChange}
                  >
                    <option value="">Select bank</option>
                    <option value="Commercial Bank">Commercial Bank</option>
                    <option value="Sampath Bank">Sampath Bank</option>
                    <option value="HNB">HNB</option>
                    <option value="BOC">BOC</option>
                    <option value="People's Bank">People&apos;s Bank</option>
                    <option value="DFCC">DFCC</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-800">Username</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="bankUsername"
                      className="input-field pl-11"
                      placeholder="Enter bank username"
                      value={demoData.bankUsername}
                      onChange={handleDemoChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-800">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      name="bankPassword"
                      type="password"
                      className="input-field pl-11"
                      placeholder="Enter bank password"
                      value={demoData.bankPassword}
                      onChange={handleDemoChange}
                    />
                  </div>
                </div>

                <div className="rounded-[1.25rem] bg-slate-50 p-4 text-sm text-slate-600">
                  This is a simulated online banking login screen for presentation only.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button onClick={handleContinueFromPaymentModal}>
            {isDemoCard ? "Continue to OTP" : "Login & Continue"}
          </Button>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        title="Enter Demo OTP"
      >
        <div className="rounded-[1.5rem] bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-slate-900">
            <FiShield />
            <span className="font-semibold">Two-Factor Verification</span>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            A demo OTP has been sent to your registered mobile number. Use any 4 to 6 digits to continue.
          </p>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-800">Demo OTP</label>
          <input
            name="otp"
            className="input-field text-center text-lg tracking-[0.4em]"
            placeholder="123456"
            value={demoData.otp}
            onChange={handleDemoChange}
          />
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={handleConfirmOtp}>Verify & Pay</Button>
          <Button variant="secondary" onClick={() => setShowOtpModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-premium"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 12, opacity: 0 }}
            >
              <motion.div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                initial={{ scale: 0.7 }}
                animate={{ scale: [0.7, 1.08, 1] }}
                transition={{ duration: 0.6 }}
              >
                <motion.span
                  className="text-4xl text-green-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ✓
                </motion.span>
              </motion.div>

              <h3 className="mt-5 text-2xl font-semibold text-slate-900">Payment Successful</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Your demo payment was completed successfully. Preparing your order confirmation now.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
}

export default CheckoutPage;