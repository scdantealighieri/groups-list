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
  const mapGroupDetailsToFormattedSchedule = (
    groupDetails: GroupDetails
  ): string[] => {
    const days = groupDetails.groupDays.split("-");
    const hours = groupDetails.groupHours.split("$");

    return days.map((day, index) => {
      const formattedDay = dayMapping[day] || day;
      const formattedHours = hours[index] || "";
      return `${formattedDay} ${formattedHours}`;
    });
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.details}>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>Nazwa grupy:</div>
            <div className={styles.detailValue}>{groupDetails.groupName}</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>Tryb nauki:</div>
            <div className={styles.detailValue}>{groupDetails.groupType}</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>Poziom:</div>
            <div className={styles.detailValue}>{groupDetails.groupLevel}</div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>Pierwsze zajęcia:</div>
            <div className={styles.detailValue}>
              {groupDetails.groupFirstMeet}
            </div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>Ostatnie zajęcia:</div>
            <div className={styles.detailValue}>
              {groupDetails.groupLastMeet}
            </div>
          </div>
          <div className={`${styles.detail} ${styles.detailDays}`}>
            <div className={styles.detailTitle}>Terminarz zajęć:</div>
            <div className={styles.detailValue}>
              {mapGroupDetailsToFormattedSchedule(groupDetails).map((s) => (
                <div key={s}>-{s}</div>
              ))}
            </div>
          </div>
          <div className={styles.detail}>
            <div className={styles.detailTitle}>Opis grupy:</div>
            <div className={styles.detailValue}></div>
          </div>
        </div>
        <div className={styles.photo}>
          <img
            src={`data:${groupDetails.groupLectorFotoType};base64,${groupDetails.groupLectorFotoContent}`}
            alt={groupDetails.groupLector}
          />
          <div className={styles.photoTitle}>
            <div className={styles.title}>Lektor: </div>
            <div className={styles.value}>{groupDetails.groupLector}</div>
          </div>
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
