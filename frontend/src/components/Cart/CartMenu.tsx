import { useState } from "react";
import { useCart } from "../../contexts/cartContext";
import { useTheme } from "../../contexts/ThemeContext";
import { BASE_URL } from "../../config/api";
import IconMenuOpen from "../logos/IconMenuOpen";

const CartMenu = () => {
  const {
    items,
    increment,
    decrement,
    removeFromCart,
    cartIsOpen,
    setCartIsOpen,
  } = useCart();
  const { theme } = useTheme();
  const [showDemoPopup, setShowDemoPopup] = useState(false);

  const unitPrice = (price: number) =>
    theme === "sale" ? price * 0.9 : price;

  const total = items.reduce(
    (sum, item) => sum + unitPrice(item.price) * item.qty,
    0
  );

  const confirmDemo = () => {
    setShowDemoPopup(false);
    setCartIsOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          cartIsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartIsOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 h-full w-[340px] max-w-[90vw] bg-[#201030] text-white z-50 flex flex-col transform transition-transform duration-300 shadow-2xl ${
          cartIsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setCartIsOpen(false)}
            aria-label="Close cart"
            className="opacity-80 hover:opacity-100 hover:cursor-pointer"
          >
            <IconMenuOpen size={30} />
          </button>
        </div>
        <h2 className="text-2xl font-bold px-6 pb-4">Your cart</h2>

        <div className="px-6 pb-4 flex flex-col gap-4 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <p className="opacity-70">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.documentId} className="flex gap-3 items-center">
                {item.coverUrl && (
                  <img
                    src={BASE_URL + item.coverUrl}
                    alt={item.title}
                    className="w-[44px] h-[64px] object-cover rounded"
                  />
                )}
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="truncate text-sm font-bold">{item.title}</p>
                  {theme === "sale" ? (
                    <div className="flex gap-2 items-baseline">
                      <p className="text-sm">
                        ${(item.price * 0.9).toFixed(2)}
                      </p>
                      <p className="text-xs text-red-500 line-through opacity-70">
                        ${item.price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm opacity-80">${item.price}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrement(item.documentId)}
                    aria-label="Decrease quantity"
                    className="w-[24px] h-[24px] pb-[2px] rounded-full bg-[#35353f] hover:bg-[#5c5c6b] hover:cursor-pointer flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="min-w-[16px] text-center text-sm">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => increment(item.documentId)}
                    aria-label="Increase quantity"
                    className="w-[24px] h-[24px] pb-[2px] rounded-full bg-[#35353f] hover:bg-[#5c5c6b] hover:cursor-pointer flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.documentId)}
                  aria-label="Remove from cart"
                  className="opacity-60 hover:opacity-100 hover:cursor-pointer pl-1"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/20 flex flex-col gap-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setShowDemoPopup(true)}
              className="my-button hoverColor rounded-lg py-3 text-lg hover:cursor-pointer"
            >
              Buy
            </button>
          </div>
        )}
      </div>

      {showDemoPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-black/50 p-4">
          <div className="bg-[#f5f0f9] text-[#32302D] p-8 rounded-lg shadow-lg text-center max-w-[400px] flex flex-col gap-6">
            <p className="text-lg">
              This is a demo store, no payment will be processed.
            </p>
            <button
              onClick={confirmDemo}
              className="my-button hoverColor text-white rounded-lg py-3 px-8 self-center hover:cursor-pointer"
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMenu;
