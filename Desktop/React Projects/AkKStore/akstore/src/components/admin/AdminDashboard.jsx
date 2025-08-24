import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, DollarSign, Users, ShoppingCart, Home } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { isAdmin, getAuthToken } from '../../utils/auth';
import { Navigate, Link } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const { showToast } = useToast();

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  const handleSaveProduct = async (result) => {
    console.log('handleSaveProduct called with result:', result);
    
    try {
      setRefreshTrigger(prev => prev + 1);
      
      setShowForm(false);
      setSelectedProduct(null);
      
      console.log('Form closed and refresh triggered');
    } catch (error) {
      console.error('Error in handleSaveProduct:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('https://zikohost.bsite.net/Products/GetAllProducts');
      
      if (response.ok) {
        const data = await response.json();

        setProducts(Array.isArray(data) ? data : []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    console.log('handleDeleteProduct called with productId:', productId); // Debug log
    console.log('productId type:', typeof productId); // Debug log
    
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        showToast('You must be logged in to perform this action', 'error');
        return;
      }

      const url = `https://zikohost.bsite.net/Products/DeleteProduct?ProductID=${productId}`;
      console.log('Delete URL:', url); // Debug log

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Delete response status:', response.status); // Debug log

      if (response.ok) {
        showToast('Product deleted successfully!', 'success');
        // Trigger refresh
        setRefreshTrigger(prev => prev + 1);
      } else {
        const errorText = await response.text();
        console.log('Delete error response:', errorText); // Debug log
        showToast(`Failed to delete product: ${errorText}`, 'error');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showToast('Error deleting product', 'error');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Package },
    { id: 'products', label: 'Products', icon: ShoppingCart },
  ];

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-blue-500' },
    { label: 'Categories', value: new Set(products.map(p => p.category)).size, icon: Users, color: 'bg-green-500' },
    { label: 'Total Value', value: `$${products.reduce((sum, p) => sum + (parseFloat(p.productPrice) || 0), 0).toFixed(2)}`, icon: DollarSign, color: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header*/}
        <div className="mb-8 flex justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-red-500">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your store products and inventory</p>
          </div>
          <Link to="/" title="Back to Home" className='flex items-center gap-x-2'>
            <Home className="h-5 w-5 text-red-600 hover:text-red-700 transition" />
            <span className="font-poppins font-light">Back to Home</span>
          </Link>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm hover:cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className={`${stat.color} rounded-md p-3`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleAddProduct}
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition"
                >
                  <Plus className="h-5 w-5" />
                  Add New Product
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition"
                >
                  <Edit className="h-5 w-5" />
                  Manage Products
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Products Management</h2>
              <button
                onClick={handleAddProduct}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 hover:cursor-pointer flex items-center gap-2 transition"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>

            <ProductList
              refreshTrigger={refreshTrigger}
              onEdit={(product) => {
                setSelectedProduct(product);
                setShowForm(true);
              }}
              onDelete={handleDeleteProduct}
            />
          </div>
        )}

        {showForm && (
          <ProductForm
            product={selectedProduct}
            onSave={handleSaveProduct}
            onClose={() => {
              setShowForm(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
