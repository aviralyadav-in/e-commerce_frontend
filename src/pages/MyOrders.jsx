import { useEffect, useState } from "react";

import { FiPackage, FiPrinter, FiArrowLeft, FiX } from "react-icons/fi";

import { Link } from "react-router-dom";

import OrderReceipt from "../components/order/OrderReceipt";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("niyaOrders") || "[]",
    );
    setOrders(savedOrders);
  }, []);

  const handlePrint = (order) => {
    setSelectedOrder(order);
  };

  return (
    <>
      <main className="min-h-[70vh] bg-bg-primary px-5 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-[900px]">
          <Link
            to="/account"
            className="mb-7 inline-flex items-center gap-2 text-xs text-text-secondary hover:text-accent"
          >
            <FiArrowLeft size={14} />
            Back to Account
          </Link>

          <div className="mb-10">
            <p className="mb-3 text-[10px] font-medium tracking-[0.25em] text-accent">
              MY ACCOUNT
            </p>

            <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
              My Orders
            </h1>

            <p className="mt-3 text-xs text-text-secondary">
              View, track and manage your Niya Bags orders.
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-sm border border-border-soft bg-bg-secondary p-10 text-center">
              <FiPackage
                size={32}
                strokeWidth={1.2}
                className="mx-auto mb-5 text-accent"
              />

              <h2 className="font-serif text-2xl text-text-primary">
                No orders yet
              </h2>

              <p className="mt-2 text-xs text-text-secondary">
                Your completed orders will appear here.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-flex border border-text-primary px-6 py-3 text-[10px] font-semibold tracking-widest hover:bg-accent hover:text-white"
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="rounded-sm border border-border-soft bg-bg-secondary p-6 md:p-8"
                >
                  {/* ORDER HEADER */}
                  <div className="flex flex-col justify-between gap-4 border-b border-border-soft pb-5 sm:flex-row">
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest text-accent">
                        ORDER ID
                      </p>

                      <p className="mt-1 text-sm font-medium text-text-primary">
                        {order.orderId}
                      </p>

                      <p className="mt-1 text-[10px] text-text-muted">
                        {order.date}
                      </p>
                    </div>

                    <span className="h-fit rounded-full bg-emerald-50 px-3 py-1 text-[9px] font-semibold tracking-wider text-emerald-600">
                      {order.status || "ORDER PLACED"}
                    </span>
                  </div>

                  {/* ITEMS */}
                  <div className="py-5">
                    <p className="mb-4 text-[10px] font-semibold tracking-widest text-text-secondary">
                      ITEMS
                    </p>

                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between gap-4 text-xs"
                        >
                          <div>
                            <p className="font-medium text-text-primary">
                              {item.title}
                            </p>

                            <p className="mt-1 text-[10px] text-text-muted">
                              Qty: {item.quantity}
                            </p>
                          </div>

                          <p className="font-semibold text-text-primary">
                            ₹
                            {Number(
                              item.price * item.quantity,
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="border-t border-border-soft pt-5">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">
                        Subtotal
                      </span>

                      <span>
                        ₹
                        {Number(order.subtotal).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-xs">
                      <span className="text-text-secondary">
                        Shipping
                      </span>

                      <span>
                        {order.shippingFee === 0
                          ? "FREE"
                          : `₹${order.shippingFee}`}
                      </span>
                    </div>

                    <div className="mt-4 flex justify-between border-t border-border-soft pt-4">
                      <span className="font-serif text-lg">
                        Total
                      </span>

                      <span className="font-serif text-lg font-semibold text-accent">
                        ₹
                        {Number(
                          order.totalAmount,
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handlePrint(order)}
                      className="flex items-center gap-2 border border-text-primary px-5 py-3 text-[9px] font-semibold tracking-widest hover:bg-text-primary hover:text-white"
                    >
                      <FiPrinter size={13} />
                      PRINT RECEIPT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* RECEIPT MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-[620px]">
            {/* CLOSE BUTTON */}
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-sm transition hover:bg-text-primary hover:text-white"
                aria-label="Close receipt"
              >
                <FiX size={17} />
              </button>
            </div>

            {/* EXISTING ORDER RECEIPT */}
            <OrderReceipt
              order={selectedOrder}
              showPrintButton={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MyOrders;