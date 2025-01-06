import { useEffect, useRef, useState } from "react";
import { GroupDetails } from "../models/group-details";

import styles from "./SignInModal.module.css";
import { dayMapping } from "../services/group-service";

export const SignInModal = ({
  groupDetails,
  onClose,
}: {
  groupDetails: GroupDetails;
  onClose: () => void;
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const groupDetailsRef = useRef<HTMLDivElement>(null);
  const [externalFormSection, setExternalFormSection] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const externalFormSectionElement =
      document.querySelector("#signInFormSection");
    if (externalFormSectionElement) {
      (externalFormSectionElement as HTMLElement).style.display = "block";

      const externalForm = (
        externalFormSectionElement as HTMLElement
      ).querySelector("form");

      if (externalForm) {
        var groupIdContainer = externalForm?.querySelector(".group-id");
        var groupIdInput = groupIdContainer?.querySelector("input");
        if (groupIdInput) {
          groupIdInput.value = groupDetails.groupId;
        }

        var groupNameContainer = externalForm?.querySelector(".group-name");
        var groupNameInput = groupNameContainer?.querySelector("input");
        if (groupNameInput) {
          groupNameInput.value = groupDetails.groupName;
        }

        var inputs = externalForm.querySelectorAll(".wpforms-field");
        inputs.forEach((input) => {
          (input as HTMLInputElement).style.paddingTop = "10px";
          (input as HTMLInputElement).style.paddingBottom = "10px";
        });
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
    <div className={styles.modal}>
      <div className={styles.modalClose}>
        <span className="material-symbols-outlined" onClick={handleClose}>
          close
        </span>
      </div>
      <div className={styles.modalContent} ref={modalContentRef}>
        <div className={styles.header}>
          <div className={styles.groupName}>{groupDetails.groupShortName}</div>
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
        </div>
        {externalFormSection && modalContentRef.current && (
          <div ref={(el) => el?.appendChild(externalFormSection)} />
        )}
      </div>
    </div>
  );
};
