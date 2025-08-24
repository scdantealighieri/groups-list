import { GroupDetails } from "../models/group-details";
import { getFormattedGroupDays } from "../services/group-service";
import styles from "../group-details/GroupDetailsModal.module.css";
import { useFontSize } from "../hooks/useFontSize";
import { useRef, ReactNode } from "react";
import { GroupType } from "../enums/group-type";
import { Group } from "../models/group";

export const GroupDetailsContent = ({
  groupDetails,
  group,
  toolbar
}: {
  groupDetails: GroupDetails;
  group: Group | null;
  toolbar: ReactNode;
}) => {
  const levelFontSizeRef = useFontSize(200);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string): string => {
    const [ month, day] = dateString.split("-");
    return `${day}/${month}`;
  };

  return (
    <>
      <div className={styles.detailsTop}>
          <div className={styles.header} >
            <div className={styles.level} ref={levelFontSizeRef}>
              {groupDetails.groupShortName}
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.info}>
                <div className={styles.icon}>
                  {groupDetails.groupType === GroupType.OnSite ? (
                    <div className={styles.icon}>
                      <span className="material-symbols-outlined">home</span>
                    </div>
                  ) : (
                    <div className={ styles.icon}>
                      <span className="material-symbols-outlined">
                        computer
                      </span>
                    </div>
                  )} 
                </div>
                <div className={styles.infoValue}>{groupDetails.groupType === GroupType.OnSite ? group?.groupCity : "Online"}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div className={styles.infoValue}>
                  {group?.groupType === GroupType.OnSite ? group?.groupPremises[0]?.premiseAddress : "Zoom"}
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
                  {getFormattedGroupDays(groupDetails.groupDays)}
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className={styles.detailsBottom}>
        <div className={styles.detailsLeft}>
          <div className={styles.description} ref={descriptionRef}>
            {groupDetails.groupDescription}
          </div>
          <div>
          {groupDetails.groupFirstMeet && (
          <div className={styles.classDates}>
            <div className={styles.datesHeader}>Terminy zajęć: </div>
            <div className={styles.dates}>
              {`${formatDate(groupDetails.groupFirstMeet)} - ${formatDate(
                groupDetails.groupLastMeet
              )}`}
            </div>
          </div>
        )}
        {groupDetails.groupFreePlaces > 0 && (
            <div className={styles.freePlacesContainer}>
              <div className={styles.freePlacesHeader}>Wolne miejsca: </div>
              <div className={styles.freePlaces}>
                {groupDetails.groupFreePlaces}
              </div>
            </div>
          )}
        {groupDetails.groupFreePlaces === 0 && (
          <div className={styles.freePlacesContainer}>
            <div className={styles.freePlacesHeader}></div>
            <div className={styles.freePlaces}>Brak wolnych miejsc</div>
          </div>
        )}
          </div>
        </div>

        {groupDetails.groupLectorFotoContent && (
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
            <div></div>
            <div className={styles.standardToolbar}>{toolbar}</div>
          </div>
        )}

      </div>
    </>
  );
};
