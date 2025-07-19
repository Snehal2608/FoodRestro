import React, { useState, useRef, useEffect } from 'react';

// Accept onViewMenuClick as a prop
const Chatbot = ({ onViewMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Dummy data for context (you can import actual menuData and faqItems if needed)
  const menuData = {
    italian: [
      { name: 'Margherita Pizza', description: 'Classic tomato sauce, fresh mozzarella, and basil.', price: '₹350' },
      { name: 'Pepperoni Pizza', description: 'Our Margherita topped with savory pepperoni slices.', price: '₹420' },
      { name: 'Veggie Supreme Pizza', description: 'Bell peppers, onions, mushrooms, olives, and sweet corn on a classic base.', price: '₹400' },
      { name: 'Spaghetti Aglio e Olio', description: 'Simple yet exquisite spaghetti tossed with garlic, olive oil, and chili flakes.', price: '₹380' },
    ],
    junkFood: [
      { name: 'Classic Cheeseburger', description: 'Juicy patty (veg/chicken), melted cheese, lettuce, tomato, onions, and our secret sauce in a brioche bun. Served with fries.', price: '₹300 / ₹380' },
      { name: 'Loaded Fries', description: 'Crispy fries topped with cheese sauce, jalapeños, and your choice of peri-peri seasoning or spicy chicken chunks.', price: '₹250 / ₹300' },
    ],
    beverages: [
      { name: 'Soft Drinks (Coke, Sprite, Fanta)', price: '₹80' },
      { name: 'Oreo Milkshake', price: '₹180' },
    ],
  };

  const faqItems = [
    { question: "How do I place an order?", answer: "To place an order, please visit our 'Explore Foods' section to browse our delicious menu. Once you've chosen your items, add them to your cart and proceed to checkout to finalize your order." },
    { question: "What payment methods do you accept?", answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), UPI, and popular digital wallets." },
    { question: "Can I track my order?", answer: "Yes, once your order is confirmed, you'll receive a tracking link via SMS or email, allowing you to monitor its real-time progress until it reaches your doorstep." },
    { question: "What are your delivery hours?", answer: "Our delivery hours typically run from 10:00 AM to 11:00 PM, seven days a week. Specific hours might vary based on location and restaurant availability." },
  ];

  // Define quick options for the chatbot
  const quickOptions = [
    { label: "How to Order?", query: "How do I place an order?" },
    { label: "View Menu", query: "Show me the menu." },
    { label: "Suggest a Dish", query: "Can you suggest a dish?" },
    { label: "Delivery Hours", query: "What are your delivery hours?" },
    { label: "Payment Methods", query: "What payment methods do you accept?" },
  ];


  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ sender: 'ai', text: "Hello! I'm your Foodies' Delight assistant. How can I help you today? You can ask me about placing orders, our menu, or common FAQs." }]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (messageText = input) => {
    if (messageText.trim() === '') return;

    const userMessage = { sender: 'user', text: messageText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(''); // Clear input field if message was typed

    setIsLoading(true);

    let aiResponseText = '';

    // Handle specific quick option queries directly
    if (messageText.toLowerCase().includes("how to place an order?")) {
      // Updated answer to direct to Explore Foods section
      aiResponseText = faqItems.find(item => item.question.toLowerCase().includes("how do i place an order?"))?.answer || "To place an order, please visit our 'Explore Foods' section to browse our delicious menu. Once you've chosen your items, add them to your cart and proceed to checkout to finalize your order.";
    } else if (messageText.toLowerCase().includes("show me the menu.")) {
      aiResponseText = "Certainly! Please click the 'View Menu' button below to see our full selection of delicious dishes.";
      // Directly trigger onViewMenuClick for "View Menu"
      if (onViewMenuClick) {
        setTimeout(() => {
          onViewMenuClick();
          setIsOpen(false); // Close chatbot after directing to menu
        }, 500); // Small delay for better UX
      }
    } else if (messageText.toLowerCase().includes("can you suggest a dish?")) {
      const italianDish = menuData.italian[Math.floor(Math.random() * menuData.italian.length)];
      const junkFoodDish = menuData.junkFood[Math.floor(Math.random() * menuData.junkFood.length)];
      aiResponseText = `How about a delicious ${italianDish.name} (${italianDish.description}) for ₹${italianDish.price}, or if you're craving something different, try our ${junkFoodDish.name} for ₹${junkFoodDish.price}?`;
    } else if (messageText.toLowerCase().includes("what are your delivery hours?")) {
      aiResponseText = faqItems.find(item => item.question.toLowerCase().includes("delivery hours"))?.answer || "Our delivery hours typically run from 10:00 AM to 11:00 PM, seven days a week.";
    } else if (messageText.toLowerCase().includes("what payment methods do you accept?")) {
      aiResponseText = faqItems.find(item => item.question.toLowerCase().includes("payment methods"))?.answer || "We accept various payment methods including credit/debit cards, UPI, and popular digital wallets.";
    } else {
      // Fallback to Gemini API for other queries
      try {
        // Prepare chat history for Gemini API, including system instructions
        let chatHistory = [
          {
            role: "user",
            parts: [{ text: `You are a helpful AI assistant for an Italian food and junk food restaurant called "Foodies' Delight".
            You can answer questions about:
            - How to place an order.
            - Payment methods.
            - Order tracking.
            - Delivery hours.
            - Menu items (Italian, Junk Food, Beverages).
            - Common FAQs.

            Here is our menu data:
            ${JSON.stringify(menuData, null, 2)}

            Here are some frequently asked questions and answers:
            ${JSON.stringify(faqItems, null, 2)}

            If asked about ordering, guide the user to browse the menu and proceed to checkout.
            If asked for dish suggestions, provide specific dish names and descriptions from the menu.
            Keep responses concise and helpful. If you don't know the answer, politely state that you cannot help with that specific query.` }]
          },
          ...messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          })),
          { role: "user", parts: [{ text: messageText }] } // Current user input
        ];

        const payload = { contents: chatHistory };
        const apiKey = ""; // Leave as empty string, Canvas will provide it at runtime
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
          aiResponseText = result.candidates[0].content.parts[0].text;
        } else {
          aiResponseText = "Sorry, I couldn't get a response from the AI. Please try again.";
          console.error("Gemini API response structure unexpected:", result);
        }
      } catch (error) {
        console.error("Error communicating with Gemini API:", error);
        aiResponseText = "There was an error connecting to the AI. Please try again later.";
      }
    }

    setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: aiResponseText }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  const handleOptionClick = (query) => {
    // No need to setInput here, sendMessage will use the query directly
    sendMessage(query);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl flex flex-col w-80 h-96 mt-4 border border-gray-200">
          {/* Chat Header */}
          <div className="bg-red-600 text-white p-3 rounded-t-lg flex items-center justify-between">
            <h3 className="font-semibold text-lg">Foodies' Delight Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="max-w-[75%] p-2 rounded-lg text-sm bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="flex items-center">
                    <span className="dot-flashing"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll target */}
          </div>

          {/* Quick Options */}
          <div className="p-3 border-t border-gray-200 grid grid-cols-2 gap-2">
            {quickOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.query)}
                className="bg-gray-100 text-gray-700 text-xs py-1.5 px-2 rounded-md hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
                disabled={isLoading}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()} // Call sendMessage without arguments to use current input state
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Basic CSS for loading indicator and custom scrollbar */}
      <style>{`
        .dot-flashing {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #999;
          color: #999;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: 0s;
        }

        .dot-flashing::before, .dot-flashing::after {
          content: '';
          display: inline-block;
          position: absolute;
          top: 0;
        }

        .dot-flashing::before {
          left: -12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #999;
          color: #999;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: .3s;
        }

        .dot-flashing::after {
          left: 12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #999;
          color: #999;
          animation: dotFlashing 1s infinite alternate;
          animation-delay: .6s;
        }

        @keyframes dotFlashing {
          0% { background-color: #999; }
          50%, 100% { background-color: #eee; }
        }

        /* Custom scrollbar for chat messages */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
