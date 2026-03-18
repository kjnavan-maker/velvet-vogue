import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { getInquiriesRequest } from "../../services/inquiryService";

function ManageInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        setLoading(true);
        const data = await getInquiriesRequest();
        setInquiries(data);
      } finally {
        setLoading(false);
      }
    };

    loadInquiries();
  }, []);

  return (
    <AdminLayout
      title="Manage Inquiries"
      subtitle="Review customer messages, support requests, and product inquiries."
    >
      <div className="admin-surface p-6">
        {loading ? (
          <Loader text="Loading inquiries..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="px-3 py-3 font-medium">Name</th>
                  <th className="px-3 py-3 font-medium">Email</th>
                  <th className="px-3 py-3 font-medium">Subject</th>
                  <th className="px-3 py-3 font-medium">Date</th>
                  <th className="px-3 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="border-b border-slate-100">
                    <td className="px-3 py-4 font-medium text-slate-900">{inquiry.name}</td>
                    <td className="px-3 py-4 text-slate-600">{inquiry.email}</td>
                    <td className="px-3 py-4 text-slate-600">{inquiry.subject}</td>
                    <td className="px-3 py-4 text-slate-600">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4">
                      <button
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="text-sm font-semibold text-slate-900 hover:text-velvet-gold"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={Boolean(selectedInquiry)}
        onClose={() => setSelectedInquiry(null)}
        title={selectedInquiry?.subject || "Inquiry Details"}
      >
        <div className="space-y-4 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">From:</span> {selectedInquiry?.name}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Email:</span> {selectedInquiry?.email}
          </p>
          <p className="leading-7">
            <span className="font-semibold text-slate-900">Message:</span> {selectedInquiry?.message}
          </p>
        </div>

        <div className="mt-6">
          <Button variant="secondary" onClick={() => setSelectedInquiry(null)}>
            Close
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default ManageInquiriesPage;