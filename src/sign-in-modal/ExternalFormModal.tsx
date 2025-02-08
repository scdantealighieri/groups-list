import { useEffect, useRef, useState } from "react";
import { GroupDetails } from "../models/group-details";

import styles from "./ExternalFormModal.module.css";
import { dayMapping } from "../services/group-service";

export const ExternalFormModal = ({
  groupDetails,
  formSectionId,
  onClose,
}: {
  groupDetails: GroupDetails;
  formSectionId: string;
  onClose: () => void;
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const groupDetailsRef = useRef<HTMLDivElement>(null);
  const [externalFormSection, setExternalFormSection] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const externalFormSectionElement = document.querySelector(
      `#${formSectionId}`
    );
    if (externalFormSectionElement) {
      (externalFormSectionElement as HTMLElement).style.display = "block";

      const externalForm = (
        externalFormSectionElement as HTMLElement
      ).querySelector("form");

      if (externalForm) {
        const groupIdContainer = externalForm?.querySelector(".group-id");
        const groupIdInput = groupIdContainer?.querySelector("input");
        if (groupIdInput) {
          groupIdInput.value = groupDetails.groupId;
        }

        const groupNameContainer = externalForm?.querySelector(".group-name");
        const groupNameInput = groupNameContainer?.querySelector("input");
        if (groupNameInput) {
          groupNameInput.value = groupDetails.groupName;
        }
      }

      setExternalFormSection(externalFormSectionElement as HTMLElement);
    }
  }, [groupDetails.groupId, groupDetails.groupName]);

  useEffect(() => {
    if (modalContentRef.current) {
      const modalWidth = getElementWidthWithoutPadding(modalContentRef.current);
      if (modalWidth) {
        const groupDetailsWidth = groupDetailsRef.current?.offsetWidth;
        if (groupDetailsWidth && groupDetailsWidth >= modalWidth) {
          let fontSize = parseFloat(
            window.getComputedStyle(groupDetailsRef.current).fontSize
          );

          while (
            groupDetailsRef.current.offsetWidth >= modalWidth &&
            fontSize > 0
          ) {
            fontSize -= 1;
            groupDetailsRef.current.style.fontSize = `${fontSize}px`;
          }
        }
      }
    }
  }, []);

  const getElementWidthWithoutPadding = (element: HTMLElement): number => {
    const computedStyle = window.getComputedStyle(element);
    const width = element.clientWidth; // Width including padding
    const paddingLeft = parseFloat(computedStyle.paddingLeft);
    const paddingRight = parseFloat(computedStyle.paddingRight);
    return width - paddingLeft - paddingRight;
  };

  const handleClose = () => {
    if (externalFormSection) {
      document.body.appendChild(externalFormSection);
      externalFormSection.style.display = "none";
    }
    onClose();
  };

  return (
    <div className={styles.modal} id="externalFormModal">
      <div className={styles.modalClose}>
        <span className="material-symbols-outlined" onClick={handleClose}>
          close
        </span>
      </div>
      <div className={styles.modalContent} ref={modalContentRef}>
        <div className={styles.header}>
          <div className={styles.groupName}>{groupDetails.groupShortName}</div>
          {groupDetails.groupDays && (
            <div className={styles.details} ref={groupDetailsRef}>
              <span>
                {groupDetails.groupDays
                  .split("-")
                  .map((d) => dayMapping[d])
                  .join(", ")}{" "}
              </span>
              <span>{groupDetails.groupHours.split("$")[0]}</span> |{" "}
              <span>{groupDetails.groupLector}</span>
            </div>
          )}
        </div>
        {externalFormSection && modalContentRef.current && (
          <div
            className={styles.externalFormContainer}
            ref={(el) => el?.appendChild(externalFormSection)}
          />
        )}
      </div>
    </div>
  );
};
