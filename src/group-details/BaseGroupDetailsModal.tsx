import { ReactNode } from "react";
import styles from "./GroupDetailsModal.module.css";

export const BaseGroupDetailsModal = ({
    onClose,
    children,
    toolbar,
    centerToolbar = false,
}: {
    onClose: () => void;
    children: ReactNode;
    toolbar?: ReactNode;
    centerToolbar?: boolean;
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
                <div className={styles.modalContent}>
                    {children}
                </div>
                {toolbar && <div className={`${styles.toolbar} ${centerToolbar ? styles.centeredToolbar : ''}`}>{toolbar}</div>}
            </div>
        </>
    );
};