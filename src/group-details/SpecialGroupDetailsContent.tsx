import { GroupDetails } from "../models/group-details";
import styles from "./GroupDetailsModal.module.css";

export const SpecialGroupDetailsContent = ({ groupDetails }: {
    groupDetails: GroupDetails;
}) => {
    return (
        <div className={styles.detailsTop}>
            <div className={styles.detailsLeft}>
                <div className={styles.header}>
                    <div className={`${styles.level} ${styles.levelSpecial}`}>
                        {groupDetails.groupShortName}
                    </div>
                </div>
                <div className={styles.description}>{groupDetails.groupDescription}</div>
            </div>
        </div>
    );
};