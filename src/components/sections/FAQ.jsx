import React from 'react';

const FAQ = () => {
  const faqItems = [
    {
      question: "How do I place an order?",
      answer: "You can place an order by Browse our menu, adding desired items to your cart, and then proceeding to checkout. You'll need to provide your delivery address and payment information."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), UPI, and popular digital wallets."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order is confirmed, you'll receive a tracking link via SMS or email, allowing you to monitor its real-time progress until it reaches your doorstep."
    },
    {
      question: "What are your delivery hours?",
      answer: "Our delivery hours typically run from 10:00 AM to 11:00 PM, seven days a week. Specific hours might vary based on location and restaurant availability."
    },
    {
      question: "Is there a minimum order value?",
      answer: "A minimum order value may apply depending on your location and the restaurant. This will be clearly displayed during the checkout process."
    },
    {
      question: "How can I cancel or modify my order?",
      answer: "To cancel or modify an order, please contact our customer support team immediately. Please note that once an order has been dispatched, cancellation or modification may not be possible."
    },
    {
      question: "What if I receive the wrong or damaged food?",
      answer: "We apologize for any inconvenience. Please contact our customer support with details and photos of the issue, and we'll arrange for a refund or a replacement order."
    },
    {
      question: "Do you offer vegetarian/vegan/gluten-free options?",
      answer: "Many of our partner restaurants offer a variety of dietary options. You can use the filters on our menu page to find vegetarian, vegan, or gluten-free dishes."
    },
    {
      question: "How do I apply a discount code?",
      answer: "During the checkout process, you'll see a field to enter your discount code. Simply type it in and click 'Apply' to see the discount reflected in your total."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support team via the 'Help' or 'Contact Us' section on our website, through live chat, or by calling our helpline number."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-100">

      {/* Added 'text-center' to center align the heading and paragraph */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 mb-12">Find answers to common questions about our food delivery service.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {faqItems.map((item, index) => (
          <div key={index} className="mb-6 text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.question}</h3>
            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            {index < faqItems.length - 1 && (
              <hr className="my-6 border-gray-300" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
