import { Group } from "../models/group";
import { dayMappingShort } from "../services/group-service";

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
        <div className={`${styles.firstColumn} ${styles.levelHeader}`}>
          POZIOM
        </div>
        <div className={styles.dayHeader}>DZIEŃ</div>
        <div className={styles.hourHeader}>GODZINA</div>
        <div className={styles.lectorHeader}>NAUCZYCIEL</div>
        <div className={styles.typeHeader}>TRYB</div>
        <div className={styles.infoHeader}>INFO</div>
        <div className={styles.signInHeader}></div>
      </div>
      <div className={styles.tableBody}>
        {groups.map((group) => (
          <div key={group.groupId} className={styles.tableRow}>
            <div className={`${styles.firstColumn} ${styles.level}`}>
              {group.groupShortName}
            </div>
            {!group.groupDays && (
              <>
                <div className={styles.specialRow}>{group.groupLector}</div>
                <div className={styles.type}>
                  <span className={styles.icon}>
                    <span className="material-symbols-outlined">home</span>
                  </span>

                  <span className={styles.icon}>
                    <span className="material-symbols-outlined">computer</span>
                  </span>
                </div>
              </>
            )}
            {group.groupDays && (
              <>
                {" "}
                <div className={styles.day}>
                  {group.groupDays
                    .split("-")
                    .map((d) => dayMappingShort[d])
                    .join(", ")}
                </div>
                <div className={styles.hour}>
                  {group.groupHours.split("$")[0]}
                </div>
                <div className={styles.lector}>{group.groupLector}</div>{" "}
                <div className={styles.type}>
                  {group.groupType === "stacjonarna" ? (
                    <div className={styles.icon}>
                      <span className="material-symbols-outlined">home</span>
                    </div>
                  ) : (
                    <div className={styles.icon}>
                      <span className="material-symbols-outlined">
                        computer
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            <div
              className={`${styles.icon} ${styles.infoIcon} ${styles.info}`}
              onClick={() => onShowGroupDetails(group.groupId)}
            >
              <span className="material-symbols-outlined">info</span>
            </div>
            <div
              className={`${styles.signInBtn} ${styles.danteButton} ${styles.signIn}`}
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
