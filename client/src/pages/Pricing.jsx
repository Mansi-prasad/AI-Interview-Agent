import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaBolt, FaCrown } from "react-icons/fa6";
import { LuSparkle } from "react-icons/lu";
import axios from "axios";
import { ServerUrl } from "../App";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: 100,
    description: "Get started with AI-powered interview practice.",
    features: [
      "100 AI interview credits",
      "Basic performance report",
      "Voice interview access",
      "Limited interview history",
    ],
    icon: FaBolt,
    buttonText: "Choose Free",
    subtitle: "Get started",
    default: true,
  },
  {
    id: "basic",
    name: "Starter Pack",
    price: 100,
    credits: 150,
    description: "Build confidence with detailed feedback and insights.",
    features: [
      "150 AI interview credits",
      "Detailed AI feedback",
      "Performance analytics",
      "Full interview history",
    ],
    icon: LuSparkle,
    buttonText: "Choose Starter",
    subtitle: "For focused practice",
  },
  {
    id: "pro",
    name: "Pro Pack",
    price: 500,
    credits: 650,
    description: "Get the tools you need for serious job preparation.",
    features: [
      "650 AI interview credits",
      "Advanced AI feedback",
      "Skill trend analytics",
      "Priority AI processing",
    ],
    icon: FaCrown,
    buttonText: "Choose Pro",
    subtitle: "For serious preparation",
    popular: true,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState("free");
  const dispatch = useDispatch();

  const currentPlan = plans.find((plan) => plan.id === selectedPlan);


  const handleContinue = () => {
    if (!currentPlan || currentPlan.id === "free") return;

    navigate("/checkout", {
      state: { plan: currentPlan },
    });
  };

  const handleCardKeyDown = (event, planId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedPlan(planId);
    }
  };

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const amount = plan.id === "basic" ? 100 : plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, {withCredentials: true});
      console.log(result.data);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterView.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          console.log(response);
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, {withCredentials: true});
          dispatch(setUserData(verifypay.data.user))

          toast.success("Payment Successful Credits Added!");
          navigate("/");
        },
        theme: {
          color: "#09a873",
        },
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoadingPlan(null);
      
    } catch (error) {
      console.log("Handle payment error: ", error);
      setLoadingPlan(null);
    }
  };
  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-6 text-[var(--ink)] transition-colors duration-300 sm:px-8 sm:py-10 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-[var(--surface-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <FaArrowLeft aria-hidden="true" size={13} />
          Back
        </button>

        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--accent)]">
            <LuSparkle size={15} aria-hidden="true" />
            Simple, transparent pricing
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-[var(--ink)]">
            Invest in your{" "}
            <span className="block text-[var(--accent)]">
              next opportunity.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--ink-muted)] sm:text-base sm:leading-7">
            Practice real interview questions and track your progress. Choose
            the plan that fits your career goals.
          </p>
        </motion.header>

        <section
          aria-label="Choose a pricing plan"
          role="radiogroup"
          className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const Icon = plan.icon;

            return (
              <motion.article
                key={plan.id}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${plan.name}, ₹${plan.price}, ${plan.credits} AI credits`}
                tabIndex={0}
                onClick={() => setSelectedPlan(plan.id)}
                onKeyDown={(event) => handleCardKeyDown(event, plan.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -3 }}
                className={`relative flex h-full min-w-0 cursor-pointer flex-col rounded-2xl border bg-[var(--surface)] p-6 outline-none transition-[border-color,box-shadow,background-color] duration-200 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:p-7 ${
                  isSelected
                    ? "border-[var(--accent)] shadow-lg ring-1 ring-[var(--accent)]"
                    : "border-[var(--border)] shadow-sm hover:border-[var(--accent)]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm">
                    BEST VALUE
                  </div>
                )}

                <div className="flex min-h-12 items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon size={19} aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-lg font-bold leading-6 text-[var(--ink)]">
                        {plan.name}
                      </h2>
                      <p className="mt-1 text-xs text-[var(--ink-muted)]">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <FaCheckCircle
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-[var(--accent)]"
                      size={18}
                    />
                  )}
                </div>

                <p className="mt-4 min-h-[48px] text-sm leading-6 text-[var(--ink-muted)]">
                  {plan.description}
                </p>

                <div className="mt-4 flex flex items-center justify-between gap-4 border-b border-[var(--border)] pb-2">
                  {/* Price */}
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-4xl font-bold tracking-tight text-[var(--ink)]">
                      ₹{plan.price}
                    </span>

                    <span className="text-sm text-[var(--ink-muted)]">
                      {plan.price === 0 ? "forever free" : "one-time payment"}
                    </span>
                  </div>

                  {/* AI Credits */}
                  <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-[var(--surface-2)] px-3 py-2 text-sm font-semibold text-[var(--accent)]">
                    <FaBolt size={13} aria-hidden="true" />
                    <span>{plan.credits} AI credits</span>
                  </div>
                </div>

                <div className="flex-1 py-4">
                  <h3 className="mb-4 text-sm font-semibold text-[var(--ink)]">
                    What's included
                  </h3>

                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-5 text-[var(--ink-muted)]"
                      >
                        <FaCheckCircle
                          className="mt-0.5 shrink-0 text-[var(--success)]"
                          size={15}
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* pay button */}
                {!plan.default && (
                  <button
                    disabled={loadingPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSelected) {
                        setSelectedPlan(plan.id);
                      } else {
                        handlePayment(plan);
                      }
                    }}
                    className={`mt-auto flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                        : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--ink)]"
                    }`}
                  >
                    {loadingPlan === plan.id
                      ? "Processing...."
                      : isSelected
                        ? "Proceed to Pay"
                        : plan.buttonText}
                    {!isSelected && (
                      <FaArrowRight size={13} aria-hidden="true" />
                    )}
                  </button>
                )}
              </motion.article>
            );
          })}
        </section>

        <footer className="mt-12 border-t border-[var(--border)] pt-6 text-center sm:mt-14">
          <p className="text-xs leading-6 text-[var(--ink-muted)] sm:text-sm">
            Start with a free plan and upgrade when you're ready.
          </p>
        </footer>
      </div>
    </main>
  );
}
