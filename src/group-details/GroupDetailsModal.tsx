import { useEffect, useRef } from "react";
import { GroupDetails } from "../models/group-details";
import { dayMapping } from "../services/group-service";

import styles from "./GroupDetailsModal.module.css";

export const GroupDetailsModal = ({
  groupDetails,
  onClose,
  showSignInModal,
}: {
  groupDetails: GroupDetails;
  onClose: () => void;
  showSignInModal: (groupId: string) => void;
}) => {
  const shortNameRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (
      shortNameRef.current &&
      shortNameRef.current.offsetWidth > 220 &&
      shortNameRef.current.offsetWidth < 500
    ) {
      shortNameRef.current.classList.add(styles.medium);
    } else if (shortNameRef.current && shortNameRef.current.offsetWidth > 450) {
      shortNameRef.current.classList.add(styles.small);
    }
  }, []);

  return (
    <div className={styles.modal}>
      <div className={styles.modalClose}>
        <span className="material-symbols-outlined" onClick={onClose}>
          close
        </span>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.detailsTop}>
          <div className={styles.detailsLeft}>
            <div className={styles.header}>
              <div className={styles.level} ref={shortNameRef}>
                {groupDetails.groupShortName}
              </div>
              <div className={styles.separator}></div>
              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <div className={styles.icon}>
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                  </div>
                  <div className={styles.infoValue}>
                    {groupDetails.groupType}
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.icon}>
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div className={`${styles.infoValue} ${styles.hours}`}>
                    {groupDetails.groupHours.split("$")[0]}
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.icon}>
                    <span className="material-symbols-outlined">
                      calendar_month
                    </span>
                  </div>
                  <div className={styles.infoValue}>
                    {groupDetails.groupDays
                      .split("-")
                      .map((d) => dayMapping[d])
                      .join(", ")}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.description}>
              {groupDetails.groupDescription}
            </div>
          </div>

          <div className={styles.detailsRight}>
            <div className={styles.description}>
              {groupDetails.groupDescription}
            </div>
            <div className={styles.photo}>
              <img
                src={`data:${groupDetails.groupLectorFotoType};base64,${groupDetails.groupLectorFotoContent}`}
                alt={groupDetails.groupLector}
              />
              <div className={styles.photoTitle}>
                {groupDetails.groupLector}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.detailsBottom}>
          <div className={styles.classDates}>
            <div className={styles.datesHeader}>Terminy zajęć</div>
            <div className={styles.dates}>
              <span>{formatDate(groupDetails.groupFirstMeet)}</span>
              <span>{formatDate(groupDetails.groupLastMeet)}</span>
            </div>
          </div>

          {groupDetails.groupFreePlaces < 3 &&
            groupDetails.groupFreePlaces > 0 && (
              <div className={styles.freePlacesContainer}>
                <div className={styles.freePlacesHeader}>Wolne miejsca</div>
                <div className={styles.freePlaces}>
                  Ostatnie {groupDetails.groupFreePlaces}!
                </div>
              </div>
            )}
        </div>
      </div>
      <div className={styles.toolbar}>
        <button
          className={styles.signInButton}
          onClick={() => showSignInModal(groupDetails.groupId)}
        >
          Zapisz się
        </button>
      </div>
    </div>
  );
};
