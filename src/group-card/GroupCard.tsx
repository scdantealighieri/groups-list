import { Group } from "../models/group";
import { dayMapping } from "../services/group-service";

import styles from "./GroupCard.module.css";

export const GroupCard = ({
  group,
  onShowGroupDetails,
  onShowSignIn,
}: {
  group: Group;
  onShowGroupDetails: (groupId: string) => Promise<void>;
  onShowSignIn: (groupId: string) => Promise<void>;
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
      <div className={styles.groupLevel}>{group.groupShortName}</div>
      <div className={styles.groupDays}>
        {getFormattedGroupDays(group.groupDays)}{" "}
        {getFormattedGroupHours(group.groupHours)}
      </div>
      <div className={styles.groupLector}>{group.groupLector}</div>
      <div className={styles.buttonsContainer}>
        <div
          className={`${styles.showMoreBtn} ${styles.danteButton}`}
          onClick={() => onShowGroupDetails(group.groupId)}
        >
          Info
        </div>
        <div
          className={`${styles.signInBtn} ${styles.danteButton}`}
          onClick={() => onShowSignIn(group.groupId)}
        >
          Zapisz się
        </div>
      </div>
    </div>
  );
};
