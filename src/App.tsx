import { useState } from 'react';
import ControlledForm from './components/ControlledForm/ControlledForm';
import ModalPortal from './components/ModalPortal/ModalPortal';
import { useAppSelector } from './app/hooks';
import type { RootState } from './app/store';
import Card from './components/Card/Card';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';

export default function App() {
  const formControlledData = useAppSelector(
    (state: RootState) => state.formData.controlledForm,
  );
  const formUncontrolledData = useAppSelector(
    (state: RootState) => state.formData.uncontrolledForm,
  );

  const [modalStates, setModalStates] = useState({
    controlled: false,
    uncontrolled: false,
  });

  const handleModalClose = (modalName: keyof typeof modalStates) => {
    setModalStates((prev) => ({
      ...prev,
      [modalName]: !modalStates[modalName],
    }));
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 p-5">
      <div className="flex items-center justify-center gap-10">
        <button
          className="cursor-pointer rounded-2xl bg-pink-400 px-4 py-2 font-bold text-white shadow-xl hover:bg-pink-500"
          onClick={() => handleModalClose('controlled')}
        >
          Controlled
        </button>
        <button
          className="cursor-pointer rounded-2xl bg-pink-400 px-4 py-2 font-bold text-white shadow-xl hover:bg-pink-500"
          onClick={() => handleModalClose('uncontrolled')}
        >
          Uncontrolled
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-10">
        <Card title="Controlled" data={formControlledData} />
        <Card title="Uncontrolled" data={formUncontrolledData} />
      </div>

      {modalStates.controlled && (
        <ModalPortal onClose={() => handleModalClose('controlled')}>
          <ControlledForm onClose={() => handleModalClose('controlled')} />
        </ModalPortal>
      )}
      {modalStates.uncontrolled && (
        <ModalPortal onClose={() => handleModalClose('uncontrolled')}>
          <UncontrolledForm onClose={() => handleModalClose('uncontrolled')} />
        </ModalPortal>
      )}
    </div>
  );
}
