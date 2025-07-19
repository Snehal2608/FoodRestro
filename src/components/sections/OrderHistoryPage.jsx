import React, { useState, useEffect } from 'react';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000'; // Match your backend URL

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        // Retrieve the authentication token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          setError("You must be logged in to view order history.");
          setLoading(false);
          return;
        }
        
        // Fetch orders, including the authentication token in the Authorization header
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
          headers: {
            'Authorization': `Bearer ${token}` // Send the JWT token
          }
        });

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorBody.substring(0, 100)}...`);
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setError(`Failed to load order history. Please ensure your backend is running and accessible at ${API_BASE_URL}. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div className="text-center py-20 text-gray-700">Loading order history...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#b53247]">Your Order History</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">You haven't placed any orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order ID: {order._id.substring(0, 8)}...</h3>
              <p className="text-gray-700 mb-1">Customer: {order.customerName}</p>
              <p className="text-gray-700 mb-1">Address: {order.customerAddress}</p>
              <p className="text-gray-700 mb-1">Phone: {order.customerPhone}</p>
              <p className="text-gray-700 mb-1">Payment: {order.paymentMethod}</p>
              <p className={`font-bold mt-2 ${order.orderStatus === 'Delivered' ? 'text-green-600' : order.orderStatus === 'Cancelled' ? 'text-red-600' : 'text-blue-600'}`}>
                Status: {order.orderStatus}
              </p>
              <p className="text-lg font-bold text-[#b53247] mt-3">Total: ${order.totalAmount.toFixed(2)}</p>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Items:</h4>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name} x {item.quantity} (${item.price.toFixed(2)} each)</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-gray-500 mt-4">Order Placed: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
