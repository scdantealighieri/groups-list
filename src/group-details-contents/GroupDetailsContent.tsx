import { GroupDetails } from "../models/group-details";
import { getFormattedGroupDays } from "../services/group-service";
import styles from "./GroupDetailsContent.module.css";
import { ReactNode } from "react";
import { GroupType } from "../enums/group-type";
import { Group } from "../models/group";

export const GroupDetailsContent = ({
  groupDetails,
  group,
  toolbar,
}: {
  groupDetails: GroupDetails;
  group: Group | null;
  toolbar: ReactNode;
}) => {
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const city =
    groupDetails.groupType === GroupType.OnSite ? group?.groupCity : "Online";
  const address =
    groupDetails.groupType === GroupType.OnSite
      ? group?.groupPremises[0]?.premiseAddress
      : "Zoom";
  const hours = groupDetails.groupHours.split("$")[0];
  const days = getFormattedGroupDays(groupDetails.groupDays);

  const totalSeats = groupDetails.groupType === GroupType.Online ? 10 : 12;
  const takenSeats = totalSeats - groupDetails.groupFreePlaces;
  const filledPercent = Math.min(100, Math.round((takenSeats / totalSeats) * 100));
  const availablePercent = Math.min(100, Math.round((groupDetails.groupFreePlaces / totalSeats) * 100));

  return (
    <div className={styles.container}>
      {/* Header with decorative background element */}
      <div className={styles.header}>
        <div className={styles.title}>{groupDetails.groupShortName}</div>
        <div className={styles.headerDecoration} aria-hidden="true">
          <svg
            viewBox="0 0 220 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.decorationSvg}
          >
            <ellipse
              cx="170"
              cy="20"
              rx="100"
              ry="75"
              stroke="rgba(111,43,44,0.1)"
              strokeWidth="32"
              fill="none"
            />
            <ellipse
              cx="195"
              cy="65"
              rx="70"
              ry="55"
              stroke="rgba(111,43,44,0.07)"
              strokeWidth="22"
              fill="none"
            />
            <ellipse
              cx="145"
              cy="-5"
              rx="50"
              ry="38"
              stroke="rgba(111,43,44,0.05)"
              strokeWidth="18"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Info row */}
      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <span className={`material-symbols-outlined ${styles.infoIcon}`}>
            location_city
          </span>
          <span>{city}</span>
        </div>
        <div className={styles.infoSeparator} />
        <div className={styles.infoItem}>
          <span className={`material-symbols-outlined ${styles.infoIcon}`}>
            location_on
          </span>
          <span>{address}</span>
        </div>
        <div className={styles.infoSeparator} />
        <div className={styles.infoItem}>
          <span className={`material-symbols-outlined ${styles.infoIcon}`}>
            schedule
          </span>
          <span>{hours}</span>
        </div>
        <div className={styles.infoSeparator} />
        <div className={styles.infoItem}>
          <span className={`material-symbols-outlined ${styles.infoIcon}`}>
            calendar_month
          </span>
          <span>{days}</span>
        </div>
      </div>

      {/* Two-column content: description + photo */}
      <div className={styles.contentArea}>
        <div className={styles.contentLeft}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: groupDetails.groupDescription.replace(
                /\[\[(.*?)\]\]/g,
                "<strong>$1</strong>"
              ),
            }}
          />
        </div>
        {groupDetails.groupLectorFotoContent && (
          <div className={styles.photoCard}>
            <img
              src={`data:${groupDetails.groupLectorFotoType};base64,${groupDetails.groupLectorFotoContent}`}
              alt={groupDetails.groupLector}
              className={styles.photo}
            />
            <div className={styles.lectorOverlay}>
              <div className={styles.lectorName}>{groupDetails.groupLector}</div>
              <div className={styles.lectorRole}>Lektor</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer: dates | free places | CTA */}
      <div className={styles.footer}>
        {groupDetails.groupFirstMeet && (
          <div className={styles.footerSection}>
            <span className={`material-symbols-outlined ${styles.footerIcon}`}>
              calendar_month
            </span>
            <div>
              <div className={styles.footerLabel}>Terminy zajęć</div>
              <div className={styles.footerValue}>
                {`${formatDate(groupDetails.groupFirstMeet)} – ${formatDate(
                  groupDetails.groupLastMeet
                )}`}
              </div>
            </div>
          </div>
        )}
        <div className={styles.footerSection}>
          <span className={`material-symbols-outlined ${styles.footerIcon}`}>
            group
          </span>
          <div className={styles.placesContainer}>
            <div className={styles.footerLabel}>Zajęte miejsca</div>
            <div className={styles.footerValueFraction}>
              <span className={styles.footerValueLarge}>
                {takenSeats}
              </span>
              <span className={styles.footerValueTotal}>z {totalSeats}</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${filledPercent}%` }}
              />
            </div>
            <div className={styles.availablePercent}>
              {filledPercent}% zajętych miejsc
            </div>
          </div>
        </div>
        <div className={styles.footerCta}>
          {toolbar}
          <div className={styles.secureLabel}>
            <span className={`material-symbols-outlined ${styles.secureIcon}`}>
              verified_user
            </span>
            <span>Bezpieczne zapisy online</span>
          </div>
        </div>
      </div>
    </div>
  );
};
