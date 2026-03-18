import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/admin/AdminLayout";
import Button from "../../components/common/Button";
import { createProduct, fetchCategories } from "../../features/products/productSlice";
import { uploadImageRequest } from "../../services/uploadService";

const initialForm = {
  name: "",
  description: "",
  category: "",
  gender: "unisex",
  clothingType: "",
  sizes: "",
  colors: "",
  price: "",
  stock: "",
  images: [],
  featured: true,
  newArrival: true,
  bestSeller: false,
  rating: "4.5",
};

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState(initialForm);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploadError("");

    try {
      setUploading(true);

      const uploadedUrls = [];

      for (const file of files) {
        const response = await uploadImageRequest(file);
        const fullImageUrl = `http://localhost:5000${response.imageUrl}`;
        uploadedUrls.push(fullImageUrl);
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (err) {
      setUploadError(err.response?.data?.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (imageToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== imageToRemove),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(
      createProduct({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        gender: formData.gender,
        clothingType: formData.clothingType,
        sizes: formData.sizes.split(",").map((item) => item.trim()).filter(Boolean),
        colors: formData.colors.split(",").map((item) => item.trim()).filter(Boolean),
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: formData.images,
        featured: formData.featured,
        newArrival: formData.newArrival,
        bestSeller: formData.bestSeller,
        rating: Number(formData.rating),
      })
    );

    if (createProduct.fulfilled.match(resultAction)) {
      navigate("/admin/products");
    }
  };

  return (
    <AdminLayout
      title="Add Product"
      subtitle="Create a new premium fashion item for the Velvet Vogue store."
    >
      <form onSubmit={handleSubmit} className="admin-surface p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-800">Product Name</label>
            <input name="name" className="input-field" value={formData.name} onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-800">Description</label>
            <textarea
              name="description"
              rows="5"
              className="input-field resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Category</label>
            <select name="category" className="select-field" value={formData.category} onChange={handleChange}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Gender</label>
            <select name="gender" className="select-field" value={formData.gender} onChange={handleChange}>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Clothing Type</label>
            <input
              name="clothingType"
              className="input-field"
              value={formData.clothingType}
              onChange={handleChange}
              placeholder="e.g. Blazer"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Sizes (comma separated)</label>
            <input
              name="sizes"
              className="input-field"
              value={formData.sizes}
              onChange={handleChange}
              placeholder="S, M, L"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Colors (comma separated)</label>
            <input
              name="colors"
              className="input-field"
              value={formData.colors}
              onChange={handleChange}
              placeholder="Black, Beige"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Price</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              className="input-field"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Stock</label>
            <input
              name="stock"
              type="number"
              min="0"
              className="input-field"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-800">Upload Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
            />
            <p className="mt-2 text-xs text-slate-500">
              You can upload multiple images from your laptop.
            </p>
          </div>

          {uploading && (
            <div className="md:col-span-2">
              <p className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
                Uploading images...
              </p>
            </div>
          )}

          {uploadError && (
            <div className="md:col-span-2">
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {uploadError}
              </p>
            </div>
          )}

          {formData.images.length > 0 && (
            <div className="md:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {formData.images.map((image, index) => (
                  <div key={`${image}-${index}`} className="rounded-2xl border border-slate-200 p-3">
                    <img
                      src={image}
                      alt={`Uploaded preview ${index + 1}`}
                      className="h-32 w-full rounded-xl object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="mt-3 text-sm font-semibold text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">Rating</label>
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              className="input-field"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-8">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
              Featured
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="newArrival" checked={formData.newArrival} onChange={handleChange} />
              New Arrival
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" name="bestSeller" checked={formData.bestSeller} onChange={handleChange} />
              Best Seller
            </label>
          </div>
        </div>

        {error && (
          <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="mt-8">
          <Button type="submit" disabled={loading || uploading}>
            {loading ? "Saving..." : "Create Product"}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}

export default AddProductPage;