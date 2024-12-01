import { useEffect, useRef } from "react";
import { GroupDetails } from "../models/group-details";

import styles from "./SignInModal.module.css";

export const SignInModal = ({
  groupDetails,
  onClose,
}: {
  groupDetails: GroupDetails;
  onClose: () => void;
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const formContainer = document.getElementById("signInGroupListForm");
    const formSection =
      formContainer?.parentNode?.parentNode?.parentNode?.parentNode;

    const copyOfFormSection = formSection?.cloneNode(true) as HTMLElement;
    const copyOfFormContainer = copyOfFormSection.querySelector(
      "#signInGroupListForm"
    );
    copyOfFormContainer?.removeAttribute("id");

    if (copyOfFormSection && modalContentRef.current) {
      modalContentRef.current.appendChild(copyOfFormSection);
    }
  }, [modalContentRef]);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} ref={modalContentRef}></div>
      <div className={styles.toolbar}>
        <button className={styles.closeBtn} onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};
