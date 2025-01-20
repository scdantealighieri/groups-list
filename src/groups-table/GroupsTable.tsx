import { Group } from "../models/group";
import { dayMapping } from "../services/group-service";

import styles from "./GroupsTable.module.css";

export const GroupsTable = ({
  groups,
  onShowGroupDetails,
  onShowSignIn,
}: {
  groups: Group[];
  onShowGroupDetails: (groupId: string) => Promise<void>;
  onShowSignIn: (groupId: string) => Promise<void>;
}) => {
  return (
    <div className={styles.groupsTable}>
      <div className={styles.tableHeader}>
        <div className={styles.firstColumn}>POZIOM</div>
        <div>DZIEŃ</div>
        <div>GODZINA</div>
        <div>TRYB</div>
        <div>NAUCZYCIEL</div>
        <div>INFO</div>
        <div>ZAPISZ SIĘ</div>
      </div>
      <div className={styles.tableBody}>
        {groups.map((group) => (
          <div key={group.groupId} className={styles.tableRow}>
            <div className={styles.firstColumn}>{group.groupShortName}</div>
            <div>
              {group.groupDays
                .split("-")
                .map((d) => dayMapping[d])
                .join(", ")}
            </div>
            <div>{group.groupHours.split("$")[0]}</div>
            <div>{group.groupType}</div>
            <div>{group.groupLector}</div>
            <div
              className={`${styles.showMoreBtn} ${styles.danteButton} ${styles.infoButton}`}
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
        ))}
      </div>
    </div>
  );
};
