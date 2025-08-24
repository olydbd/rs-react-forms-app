import ModalPortal from './components/ModalPortal/ModalPortal';

export default function App() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-10">
      <ModalPortal text="Controlled">
        <p className="text-white">Controlled</p>
      </ModalPortal>
      <ModalPortal text="Uncontrolled">
        <p className="text-white">Uncontrolled</p>
      </ModalPortal>
    </div>
  );
}
