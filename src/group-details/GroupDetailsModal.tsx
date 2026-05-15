import { GroupDetails } from "../models/group-details";
import { BaseGroupDetailsModal } from "./BaseGroupDetailsModal";
import { GroupDetailsContent } from "../group-details-contents/GroupDetailsContent";
import { SpecialGroupDetailsContent } from "../group-details-contents/SpecialGroupDetailsContent";

import styles from "./GroupDetailsModal.module.css";
import { isSpecialGroup } from "../utils/group-utils";
import { SpecialGroupDetails } from "../models/special-group-details";
import { Group } from "../models/group";

export const GroupDetailsModal = ({
  groupDetails,
  group,
  onClose,
  showSignInModal,
  showNotifyModal,
}: {
  groupDetails: GroupDetails;
  group: Group | null;
  onClose: () => void;
  showSignInModal: (groupId: string) => void;
  showNotifyModal: (groupId: string) => void;
}) => {

  const toolbar = (
    <>
      {groupDetails.groupFreePlaces === 0 ? (
        <button
          className={`${styles.signInButton} ${styles.notifyButton}`}
          onClick={() => showNotifyModal(groupDetails.groupId)}
        >
          <span className="material-symbols-outlined">notifications</span>
          <div className={styles.signInContent}>
            <span className={styles.signInTitle}>Powiadom mnie</span>
            <span className={styles.signInSubtitle}>Gdy pojawią się wolne miejsca</span>
          </div>
        </button>
      ) : (
        <button
          className={styles.signInButton}
          onClick={() => showSignInModal(groupDetails.groupId)}
        >
          <span className="material-symbols-outlined">arrow_forward</span>

          <div className={styles.signInContent}>
            <span className={styles.signInTitle}>Zapisz się teraz!</span>
            <span className={styles.signInSubtitle}>Dołącz do kursu</span>
          </div>

          <span className={styles.hoverText}>Kliknij tutaj</span>
        </button>
      )}
    </>
  );

  return (
    <BaseGroupDetailsModal onClose={onClose} toolbar={toolbar} showToolbar={isSpecialGroup(groupDetails.groupId)}>
      {isSpecialGroup(groupDetails.groupId) ? (
        <SpecialGroupDetailsContent groupDetails={groupDetails as SpecialGroupDetails} />
      ) : (
        <GroupDetailsContent groupDetails={groupDetails} toolbar ={toolbar} group={group} />
      )}
    </BaseGroupDetailsModal>
  );
};
