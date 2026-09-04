import { useRef } from "react";
import {
  FiCheckCircle,
  FiPrinter,
} from "react-icons/fi";

function OrderReceipt({ order, showPrintButton = true }) {
  const receiptRef = useRef(null);

  const handlePrint = () => {
    if (!receiptRef.current) return;

    const printWindow = window.open("", "_blank", "width=900,height=900");

    if (!printWindow) {
      alert("Please allow pop-ups to print the receipt.");
      return;
    }

    // Copy the current page styles so Tailwind classes also work
    let styles = "";

    try {
      Array.from(document.styleSheets).forEach((styleSheet) => {
        try {
          Array.from(styleSheet.cssRules).forEach((rule) => {
            styles += rule.cssText;
          });
        } catch {
          // Ignore stylesheets that cannot be accessed
        }
      });
    } catch {
      // Continue with the print window even if styles cannot be copied
    }

    const receiptHTML = receiptRef.current.outerHTML;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Niya Bags - Order Receipt</title>

          <style>
            ${styles}

            * {
              box-sizing: border-box;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: #ffffff;
            }

            body {
              font-family: Arial, Helvetica, sans-serif;
              padding: 30px;
            }

            @page {
              size: A4;
              margin: 12mm;
            }

            .print-receipt-wrapper {
              width: 100%;
              max-width: 620px;
              margin: 0 auto;
            }

            .print-button-wrapper {
              display: none !important;
            }

            @media print {
              body {
                padding: 0;
              }

              .print-receipt-wrapper {
                max-width: 100%;
              }
            }
          </style>
        </head>

        <body>
          <div class="print-receipt-wrapper">
            ${receiptHTML}
          </div>

          <script>
            window.onload = function () {
              setTimeout(function () {
                window.print();
              }, 300);
            };

            window.onafterprint = function () {
              window.close();
            };
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  if (!order) return null;

  const paymentLabel =
    order.paymentMethod === "COD"
      ? "CASH ON DELIVERY"
      : "ONLINE PAYMENT";

  return (
    <div ref={receiptRef}>
      <div className="relative overflow-hidden border border-border-soft bg-bg-secondary px-7 py-10 shadow-sm sm:px-10 md:px-14">
        {/* WATERMARK */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="rotate-[-90deg] whitespace-nowrap text-[90px] font-semibold tracking-[0.18em] text-emerald-600/[0.035] sm:text-[120px]">
            NIYA BAGS
          </span>
        </div>

        {/* RECEIPT CONTENT */}
        <div className="relative z-10">

          {/* BRAND */}
          <div className="mb-8 text-center">
            <p className="font-serif text-2xl font-semibold tracking-[0.18em] text-emerald-600">
              NIYA BAGS
            </p>

            <p className="mt-1 text-[9px] font-medium tracking-[0.25em] text-text-muted">
              EVERYDAY • ELEVATED
            </p>
          </div>

          {/* SUCCESS ICON */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FiCheckCircle size={34} strokeWidth={1.5} />
          </div>

          {/* CONFIRMATION */}
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.25em] text-emerald-600">
              ORDER CONFIRMED
            </p>

            <h1 className="mt-2 font-serif text-3xl font-medium text-text-primary md:text-4xl">
              Thank You for Shopping
            </h1>

            <p className="mx-auto mt-3 max-w-[420px] text-xs leading-relaxed text-text-secondary">
              Your order has been successfully placed. We are preparing your
              pieces for delivery.
            </p>
          </div>

          {/* DIVIDER */}
          <div className="my-8 border-t border-dashed border-border-soft" />

          {/* ORDER META */}
          <div className="grid grid-cols-2 gap-5 text-xs">
            <div>
              <p className="mb-1 text-[9px] font-semibold tracking-[0.15em] text-text-muted">
                ORDER ID
              </p>

              <p className="font-medium text-text-primary">
                {order.orderId}
              </p>
            </div>

            <div className="text-right">
              <p className="mb-1 text-[9px] font-semibold tracking-[0.15em] text-text-muted">
                ORDER DATE
              </p>

              <p className="font-medium text-text-primary">
                {order.date}
              </p>
            </div>
          </div>

          {/* STATUS + PAYMENT */}
          <div className="mt-5 grid grid-cols-2 gap-5 text-xs">
            <div>
              <p className="mb-1 text-[9px] font-semibold tracking-[0.15em] text-text-muted">
                STATUS
              </p>

              <p className="font-medium text-emerald-600">
                {order.status || "ORDER PLACED"}
              </p>
            </div>

            <div className="text-right">
              <p className="mb-1 text-[9px] font-semibold tracking-[0.15em] text-text-muted">
                PAYMENT
              </p>

              <p className="font-medium text-text-primary">
                {paymentLabel}
              </p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="my-8 border-y border-dashed border-border-soft py-6">
            <p className="mb-4 text-[9px] font-semibold tracking-[0.2em] text-text-muted">
              ORDER DETAILS
            </p>

            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div
                  key={`${item.productId || item.id || item.title}-${index}`}
                  className="flex items-start justify-between gap-4 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-text-primary">
                      {item.title || item.name}
                    </p>

                    <p className="mt-1 text-[10px] text-text-muted">
                      Qty: {item.quantity}
                    </p>

                    {item.selectedVariant && (
                      <p className="mt-1 text-[10px] text-text-muted">
                        Variant:{" "}
                        {typeof item.selectedVariant === "object"
                          ? Object.values(item.selectedVariant).join(" / ")
                          : item.selectedVariant}
                      </p>
                    )}
                  </div>

                  <p className="font-medium text-text-primary">
                    ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PRICE SUMMARY */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>

              <span className="font-medium text-text-primary">
                ₹
                {Number(order.subtotal || 0).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-text-secondary">
              <span>Shipping</span>

              <span className="font-medium text-emerald-600">
                {Number(order.shippingFee || 0) === 0
                  ? "FREE"
                  : `₹${Number(order.shippingFee).toLocaleString("en-IN")}`}
              </span>
            </div>

            <div className="mt-4 flex justify-between border-t border-border-soft pt-4">
              <span className="font-serif text-lg font-semibold text-text-primary">
                Total
              </span>

              <span className="font-serif text-xl font-semibold text-emerald-600">
                ₹
                {Number(order.totalAmount || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* SHIPPING DETAILS */}
          {order.shippingDetails && (
            <div className="my-8 border-y border-dashed border-border-soft py-6">
              <p className="mb-4 text-[9px] font-semibold tracking-[0.2em] text-text-muted">
                SHIPPING DETAILS
              </p>

              <div className="space-y-1.5 text-xs text-text-primary">
                <p className="font-medium">
                  {order.shippingDetails.fullName}
                </p>

                {order.shippingDetails.address && (
                  <p>{order.shippingDetails.address}</p>
                )}

                <p>
                  {[
                    order.shippingDetails.city,
                    order.shippingDetails.state,
                    order.shippingDetails.pincode ||
                      order.shippingDetails.pinCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>

                {order.shippingDetails.phone && (
                  <p>{order.shippingDetails.phone}</p>
                )}

                {order.shippingDetails.email && (
                  <p>{order.shippingDetails.email}</p>
                )}
              </div>
            </div>
          )}

          {/* THANK YOU */}
          <div className="my-8 border-y border-dashed border-border-soft py-6 text-center">
            <p className="font-serif text-lg text-text-primary">
              Made for your everyday.
            </p>

            <p className="mt-2 text-[10px] leading-relaxed text-text-secondary">
              Thank you for choosing Niya Bags.
              <br />
              Your order is now on its way to you.
            </p>
          </div>

          {/* PRINT BUTTON */}
          {showPrintButton && (
            <div className="print-button-wrapper mt-6">
              <button
                type="button"
                onClick={handlePrint}
                className="flex h-11 w-full items-center justify-center gap-2 border border-text-primary bg-bg-primary px-5 text-[10px] font-semibold tracking-[0.16em] text-text-primary transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
              >
                <FiPrinter size={14} />
                PRINT RECEIPT
              </button>
            </div>
          )}

          {/* FOOTER */}
          <div className="mt-8 text-center">
            <p className="text-[9px] tracking-[0.12em] text-text-muted">
              THANK YOU FOR SHOPPING WITH NIYA BAGS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderReceipt;