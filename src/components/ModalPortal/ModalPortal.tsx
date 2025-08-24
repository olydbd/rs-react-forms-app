import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
  text: string;
}

export default function ModalPortal({ children, text }: ModalPortalProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setShowModal(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, []);

  return (
    <div>
      <button
        className="cursor-pointer rounded-2xl bg-pink-300 px-4 py-2 font-bold text-white hover:bg-pink-400"
        onClick={() => setShowModal(true)}
      >
        {text}
      </button>
      {showModal &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-white/50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="rounded-2xl bg-pink-500 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
