import styles from './modalCrearProyecto.module.css';

const ModalConfirmar = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: any }) => {

  return (
    <div className={styles.modalContainer} style={{ display: isOpen ? 'grid' : 'none' }}>
      <div className={styles.modalBody}>
        <div className='flex flex-row-reverse'>
          <button
            onClick={onClose}
            type="button" className="flex flex-row-reverse text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center  items-center me-2 dark:bg-red-600 dark:hover:bg-bred-700 dark:focus:ring-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalConfirmar;