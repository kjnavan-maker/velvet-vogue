import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import Loader from "../../components/common/Loader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import formatCurrency from "../../utils/formatCurrency";
import { deleteProduct, fetchProducts } from "../../features/products/productSlice";

function ManageProductsPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 100 }));
  }, [dispatch]);

  const handleDelete = async () => {
    if (!selectedProduct?._id) return;
    await dispatch(deleteProduct(selectedProduct._id));
    setSelectedProduct(null);
    dispatch(fetchProducts({ limit: 100 }));
  };

  return (
    <AdminLayout
      title="Manage Products"
      subtitle="Create, edit, and remove products from the Velvet Vogue store catalog."
    >
      <div className="mb-6 flex justify-end">
        <Link to="/admin/products/add">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="admin-surface p-6">
        {loading ? (
          <Loader text="Loading products..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="px-3 py-3 font-medium">Product</th>
                  <th className="px-3 py-3 font-medium">Category</th>
                  <th className="px-3 py-3 font-medium">Price</th>
                  <th className="px-3 py-3 font-medium">Stock</th>
                  <th className="px-3 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-slate-100">
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500">{product.clothingType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-slate-600">{product.category}</td>
                    <td className="px-3 py-4 font-semibold text-slate-900">{formatCurrency(product.price)}</td>
                    <td className="px-3 py-4 text-slate-600">{product.stock}</td>
                    <td className="px-3 py-4">
                      <div className="flex gap-3">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="text-sm font-semibold text-slate-900 hover:text-velvet-gold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-sm font-semibold text-red-500 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        title="Delete Product"
      >
        <p className="text-sm leading-7 text-slate-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-900">{selectedProduct?.name}</span>?
        </p>

        <div className="mt-6 flex gap-3">
          <Button onClick={handleDelete}>Delete</Button>
          <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default ManageProductsPage;