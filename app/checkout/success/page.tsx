import { checkoutServices } from "@/features/checkout/services/checkout.service";
import CheckoutStatusView from "@/features/checkout/components/CheckoutStatusView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Status",
  description: "Verify your payment status and view order details.",
  robots: { index: false, follow: false },
};

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) => {
  const params = await searchParams;
  const reference = params.reference;

  if (!reference) {
    return (
      <CheckoutStatusView
        status="error"
        reference="N/A"
        message="No payment reference found. If you believe this is an error, please contact support."
      />
    );
  }

  try {
    const response = await checkoutServices.verify(reference);

    return (
      <main>
        <CheckoutStatusView
          status={response.status === "success" ? "success" : "failed"}
          reference={reference}
          message={response.message}
        />
      </main>
    );
  } catch (error: any) {
    return (
      <main>
        <CheckoutStatusView
          status="failed"
          reference={reference}
          message={
            error.response?.data?.message ||
            "An error occurred while verifying your payment. Please try again later."
          }
        />
      </main>
    );
  }
};

export default page;
