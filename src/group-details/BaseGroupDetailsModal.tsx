import { ReactNode } from "react";
import styles from "./GroupDetailsModal.module.css";

export const BaseGroupDetailsModal = ({
    onClose,
    children,
    toolbar,
    showToolbar = false,
}: {
    onClose: () => void;
    children: ReactNode;
    toolbar?: ReactNode;
    showToolbar?: boolean;
}) => {

    return (
        <>
            <div className={styles.modalOverlay} onClick={onClose} />
            <div className={styles.modal}>
                <div className={styles.modalClose}>
                    <span className="material-symbols-outlined" onClick={onClose}>
                        close
                    </span>
                </div>
                <div className={` ${styles.modalContent} ${ !showToolbar ? styles.modalContentWithPadding : ''}`}>
                    {children}
                </div>
                {toolbar && <div className={`${styles.toolbar} ${styles.centeredToolbar} ${!showToolbar ? styles.hidden : ''}`}>{toolbar}</div>}
            </div>
        </>
    );
};