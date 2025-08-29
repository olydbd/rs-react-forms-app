import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function ModalPortal({ children, onClose }: ModalPortalProps) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <div>
      {createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/50 p-4"
          onClick={onClose}
        >
          <div
            className="h-5/6 max-w-md min-w-md overflow-y-auto rounded-2xl bg-white p-10 shadow-2xl shadow-pink-500/50"
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
