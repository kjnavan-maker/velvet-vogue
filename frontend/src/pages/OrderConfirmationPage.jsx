import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AnimatedPage from "../components/common/AnimatedPage";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import formatCurrency from "../utils/formatCurrency";
import { fetchOrderById } from "../features/orders/orderSlice";

function OrderConfirmationPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state) => state.orders);
  const invoiceRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current) return;

    try {
      setDownloading(true);

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imageWidth = pdfWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;
        pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`velvet-vogue-invoice-${currentOrder._id.slice(-8)}.pdf`);
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading || !currentOrder) {
    return (
      <AnimatedPage className="section-padding">
        <div className="container-custom">
          <Loader text="Loading order confirmation..." />
        </div>
      </AnimatedPage>
    );
  }

  const isDemoPaid =
    currentOrder.paymentMethod === "Card Payment (Demo)" ||
    currentOrder.paymentMethod === "Online Bank Transfer (Demo)";

  return (
    <AnimatedPage className="section-padding print:bg-white print:py-0">
      <div className="container-custom print:max-w-full">
        <div className="mx-auto max-w-4xl print:max-w-full">
          <div
            ref={invoiceRef}
            className="card-surface bg-white p-6 md:p-8 print:shadow-none print:border-none print:rounded-none print:bg-white"
          >
            <div className="mb-8 text-center print:mb-6">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl print:hidden">
                ✓
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-velvet-gold">
                Order Confirmed
              </p>
              <h1 className="font-display text-4xl font-bold text-slate-900">
                Velvet Vogue Invoice
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Order confirmation and billing summary
              </p>

              {isDemoPaid && (
                <div className="mt-5 rounded-[1.5rem] bg-amber-50 px-5 py-4 text-sm font-medium text-amber-700 print:bg-white print:border print:border-amber-200">
                  Demo payment mode was used for this transaction. No real money was charged.
                </div>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[1.75rem] bg-velvet-cream p-5 print:border print:border-slate-200 print:bg-white">
                <h3 className="text-xl font-semibold text-slate-900">Order Details</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">Order ID:</span> {currentOrder._id}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Invoice No:</span> VV-
                    {currentOrder._id.slice(-8).toUpperCase()}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Date:</span>{" "}
                    {new Date(currentOrder.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Status:</span> {currentOrder.orderStatus}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Payment Method:</span>{" "}
                    {currentOrder.paymentMethod}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Payment Result:</span>{" "}
                    {currentOrder.paymentResult?.status || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Total:</span>{" "}
                    {formatCurrency(currentOrder.totalAmount)}
                  </p>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-velvet-cream p-5 print:border print:border-slate-200 print:bg-white">
                <h3 className="text-xl font-semibold text-slate-900">Billing & Shipping</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>{currentOrder.shippingInfo.fullName}</p>
                  <p>{currentOrder.shippingInfo.email}</p>
                  <p>{currentOrder.shippingInfo.phone}</p>
                  <p>{currentOrder.shippingInfo.street}</p>
                  <p>
                    {currentOrder.shippingInfo.city}, {currentOrder.shippingInfo.state}
                  </p>
                  <p>
                    {currentOrder.shippingInfo.postalCode}, {currentOrder.shippingInfo.country}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-slate-900">Items Ordered</h3>
              <div className="mt-5 space-y-4">
                {currentOrder.orderItems.map((item, index) => (
                  <div
                    key={`${item.product}-${item.size}-${item.color}-${index}`}
                    className="flex items-center gap-4 rounded-[1.5rem] border border-slate-100 p-4 print:rounded-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-2xl object-cover print:rounded-none"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        {item.size || "N/A"} • {item.color || "N/A"} • Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-slate-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-5 print:border print:border-slate-200 print:bg-white">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Items Total</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(currentOrder.itemsPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(currentOrder.shippingPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-base font-semibold text-slate-900">Grand Total</span>
                  <span className="text-xl font-bold text-slate-900">
                    {formatCurrency(currentOrder.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
              <p>Velvet Vogue</p>
              <p className="mt-1">Premium Fashion • Elegant Experience • Modern Style</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 print:hidden">
            <Link to="/my-orders">
              <Button>View My Orders</Button>
            </Link>
            <Link to="/shop">
              <Button variant="secondary">Continue Shopping</Button>
            </Link>
            <Button variant="secondary" onClick={handlePrintInvoice}>
              Print Invoice
            </Button>
            <Button onClick={handleDownloadPdf} disabled={downloading}>
              {downloading ? "Generating PDF..." : "Download PDF Invoice"}
            </Button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default OrderConfirmationPage;