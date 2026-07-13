import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ToastType = "error" | "info";

interface Toast {
  id: number;
  msg: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (msg: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback((msg: string, type: ToastType = "error") => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, msg, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl text-white text-sm ${
              t.type === "error" ? "bg-[#7a1f2b]" : "bg-[#201030]"
            }`}
          >
            <p>{t.msg}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
