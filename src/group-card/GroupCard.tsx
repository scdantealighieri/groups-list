import { Group } from "../models/group";
import { dayMapping } from "../services/group-service";

import styles from "./GroupCard.module.css";

export const GroupCard = ({
  group,
  onShowModal,
}: {
  group: Group;
  onShowModal: (groupId: string) => Promise<void>;
}) => {
  const getFormattedGroupDays = (groupDays: string): string => {
    return groupDays
      .split("-")
      .map((day) => dayMapping[day] || day)
      .join("-");
  };

  const getFormattedGroupHours = (groupHours: string): string => {
    return groupHours.split("$")[0];
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupType}>{group.groupType}</div>
      <div className={styles.groupLevel}>{group.groupLevel}</div>
      <div className={styles.groupDays}>
        {getFormattedGroupDays(group.groupDays)}{" "}
        {getFormattedGroupHours(group.groupHours)}
      </div>
      <div className={styles.groupLector}>{group.groupLector}</div>
      <div className={styles.buttonsContainer}>
        <div
          className={`${styles.showMoreBtn} ${styles.danteButton}`}
          onClick={() => onShowModal(group.groupId)}
        >
          Info
        </div>
        <div className={`${styles.signInBtn} ${styles.danteButton}`}>
          Zapisz się
        </div>
      </div>
    </div>
  );
};
