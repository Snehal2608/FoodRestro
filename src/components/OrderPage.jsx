import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({}); // { itemId: quantity }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false); // State for modal visibility
  const [customerInfo, setCustomerInfo] = useState({ // State for customer details in modal
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'Cash on Delivery', // Default payment method
  });
  const [orderSubmissionMessage, setOrderSubmissionMessage] = useState('');
  const [isOrderSubmitting, setIsOrderSubmitting] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const API_BASE_URL = 'http://localhost:5000'; // Match your backend URL

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorBody.substring(0, 100)}...`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError(`Failed to load menu. Please ensure your backend is running and accessible at ${API_BASE_URL}. Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [item._id]: (prevCart[item._id] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.keys(cart).reduce((total, itemId) => {
      const item = menuItems.find(menuItem => menuItem._id === itemId);
      return total + (item ? item.price * cart[itemId] : 0);
    }, 0);
  };

  // Function to open the checkout modal
  const handleCheckout = () => {
    if (Object.keys(cart).length === 0) {
      setOrderSubmissionMessage('Your cart is empty. Please add items before proceeding to checkout.');
      setTimeout(() => setOrderSubmissionMessage(''), 3000); // Clear message after 3 seconds
      return;
    }
    setShowCheckoutModal(true);
    setOrderSubmissionMessage(''); // Clear previous messages
  };

  // Function to handle order submission from the modal
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    setIsOrderSubmitting(true);
    setOrderSubmissionMessage('');

    // Basic validation for customer info
    if (!customerInfo.name || !customerInfo.address || !customerInfo.phone || !customerInfo.paymentMethod) {
      setOrderSubmissionMessage('Please fill in all delivery details and select a payment method.');
      setIsOrderSubmitting(false);
      return;
    }

    // Retrieve the authentication token
    const token = localStorage.getItem('token');
    if (!token) {
      setOrderSubmissionMessage('You must be logged in to place an order. Please log in.');
      setIsOrderSubmitting(false);
      // Optionally redirect to login
      // navigate('/login');
      return;
    }

    const orderDetails = {
      customerName: customerInfo.name,
      customerAddress: customerInfo.address,
      customerPhone: customerInfo.phone,
      items: Object.keys(cart).map(itemId => ({
        menuItemId: itemId,
        quantity: cart[itemId]
      })),
      totalAmount: getCartTotal(),
      paymentMethod: customerInfo.paymentMethod,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // IMPORTANT: Sending the token here
        },
        body: JSON.stringify(orderDetails)
      });

      if (!response.ok) {
        const errorData = await response.json(); // Assuming backend sends JSON error
        throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order placed successfully:', data);
      setOrderSubmissionMessage('Order placed successfully! Thank you for your order.');
      setCart({}); // Clear cart after successful order
      setCustomerInfo({ name: '', address: '', phone: '', paymentMethod: 'Cash on Delivery' }); // Reset form
      
      localStorage.setItem('hasOrders', 'true'); 

      setTimeout(() => {
        setShowCheckoutModal(false); // Close modal after success
        setOrderSubmissionMessage('');
        navigate('/'); // Redirect to home page after successful order
      }, 2000); // Close after 2 seconds and redirect
    } catch (err) {
      console.error('Error placing order:', err);
      setOrderSubmissionMessage(`Failed to place order: ${err.message}. Please try again.`);
    } finally {
      setIsOrderSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-700">Loading menu...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  // Group menu items by category for better display
  const categorizedMenuItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Uncategorized'; // Default category if not provided
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#b53247]">Order Online</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Menu Items Section */}
        <div className="lg:w-2/3">
          {Object.keys(categorizedMenuItems).length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No menu items available at the moment. Please check back later!</p>
          ) : (
            Object.keys(categorizedMenuItems).map(category => (
              <div key={category} className="mb-10">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2 capitalize">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {categorizedMenuItems[category].map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                      <img
                        src={item.image || `https://placehold.co/400x250/f0f0f0/cccccc?text=${item.name.replace(/\s/g, '+')}`}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/400x250/f0f0f0/cccccc?text=${item.name.replace(/\s/g, '+')}`; }}
                      />
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                          <p className="text-lg font-bold text-[#b53247]">${item.price.toFixed(2)}</p>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-[#b53247] text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#b53247] focus:ring-opacity-50"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Shopping Cart Section */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow-md p-6 sticky top-24 h-fit border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>
          {Object.keys(cart).length === 0 ? (
            <p className="text-gray-600">Your cart is empty. Start adding some delicious items!</p>
          ) : (
            <div>
              {Object.keys(cart).map((itemId) => {
                const item = menuItems.find(menuItem => menuItem._id === itemId);
                if (!item) return null; // Should not happen if data is consistent
                return (
                  <div key={itemId} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {cart[itemId]}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-150"
                      >
                        -
                      </button>
                      <span className="font-semibold">{cart[itemId]}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-150"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-gray-300">
                <p className="text-lg font-bold text-gray-900">Total:</p>
                <p className="text-lg font-bold text-[#b53247]">${getCartTotal().toFixed(2)}</p>
              </div>
              {orderSubmissionMessage && (
                <p className={`text-sm mt-4 text-center ${orderSubmissionMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                  {orderSubmissionMessage}
                </p>
              )}
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition duration-200 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Confirm Your Order</h2>
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>

            <form onSubmit={handleConfirmOrder}>
              <div className="mb-4">
                <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">Your Name</label>
                <input
                  type="text"
                  id="customerName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  required
                  disabled={isOrderSubmitting}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="customerAddress" className="block text-gray-700 text-sm font-bold mb-2">Delivery Address</label>
                <textarea
                  id="customerAddress"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  required
                  disabled={isOrderSubmitting}
                ></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="customerPhone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <input
                  type="tel" // Use type="tel" for phone numbers
                  id="customerPhone"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  required
                  disabled={isOrderSubmitting}
                />
              </div>

              <div className="mb-6">
                <p className="block text-gray-700 text-sm font-bold mb-2">Payment Method</p>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#b53247] h-5 w-5"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={customerInfo.paymentMethod === 'Cash on Delivery'}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
                      disabled={isOrderSubmitting}
                    />
                    <span className="ml-2 text-gray-700">Cash on Delivery</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#b53247] h-5 w-5"
                      name="paymentMethod"
                      value="Online Payment"
                      checked={customerInfo.paymentMethod === 'Online Payment'}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
                      disabled={isOrderSubmitting}
                    />
                    <span className="ml-2 text-gray-700">Online Payment</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Order Total:</span>
                <span className="text-[#b53247]">${getCartTotal().toFixed(2)}</span>
              </div>

              {orderSubmissionMessage && (
                <p className={`text-sm text-center mb-4 ${orderSubmissionMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                  {orderSubmissionMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isOrderSubmitting}
              >
                {isOrderSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
