import { GroupDetails } from "../models/group-details";
import { dayMapping } from "../services/group-service";

import styles from "./GroupDetailsModal.module.css";

export const GroupDetailsModal = ({
  groupDetails,
  onClose,
}: {
  groupDetails: GroupDetails;
  onClose: () => void;
}) => {
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.details}>
          <div className={styles.header}>
            <div className={styles.level}>{groupDetails.groupLevel}</div>
            <div className={styles.separator}></div>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div className={styles.infoValue}>{groupDetails.groupType}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div className={styles.infoValue}>
                  {groupDetails.groupHours.split("$").join(", ")}
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
          <div className={styles.classDates}>
            <div className={styles.datesHeader}>Terminy zajęć</div>
            <div className={styles.dates}>
              <span>{formatDate(groupDetails.groupFirstMeet)}</span>
              <span>{formatDate(groupDetails.groupLastMeet)}</span>
            </div>
          </div>
        </div>

        <div className={styles.photo}>
          <img
            src={`data:${groupDetails.groupLectorFotoType};base64,${groupDetails.groupLectorFotoContent}`}
            alt={groupDetails.groupLector}
          />
          <div className={styles.photoTitle}>{groupDetails.groupLector}</div>
        </div>
      </div>
      <div className={styles.toolbar}>
        <button className={styles.closeBtn} onClick={onClose}>
          Zamknij
        </button>
      </div>
    </div>
  );
};
