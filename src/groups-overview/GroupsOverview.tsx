import { useEffect, useState } from "react";
import { GroupCard } from "../group-card/GroupCard";
import { Group } from "../models/group";
import { GroupDetails } from "../models/group-details";
import { fetchGroup } from "../api/groups-api";
import { SpecialGroup } from "../models/special-group";
import { ModalManager } from "../modal-manager/ModalManager";
import { ModalType } from "../enums/modal-type";

import styles from "./GroupsOverview.module.css";

export const GroupsOverview = ({ groups }: { groups: Group[] }) => {
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [isGroupDetailsOpen, setIsGroupDetailsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.None);

  const fetchGroupDetails = async (groupId: string) => {
    const group = groups.find((group) => group.groupId === groupId);

    if (group && group instanceof SpecialGroup) {
      setGroupDetails(group.details);
      return;
    }

    const data = await fetchGroup(groupId);
    setGroupDetails(data);
  };

  const closeModals = () => {
    setIsGroupDetailsOpen(false);
    setModalType(ModalType.None);
    setGroupDetails(null);
  };

  const onShowGroupDetails = async (groupId: string) => {
    await fetchGroupDetails(groupId);
    setIsGroupDetailsOpen(true);
    setModalType(ModalType.Details);
  };

  const onShowSignIn = async (groupId: string) => {
    await fetchGroupDetails(groupId);
    setModalType(ModalType.SignIn);
  };

  const onShowNotify = async (groupId: string) => {
    await fetchGroupDetails(groupId);
    setModalType(ModalType.Notify);
  };

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.groupList}>
        {groups.map((group) => (
          <GroupCard
            group={group}
            onShowGroupDetails={onShowGroupDetails}
            onShowSignIn={onShowSignIn}
            onShowNotify={onShowNotify}
            key={group.groupId}
          />
        ))}
      </div>
      <ModalManager
        groupDetails={groupDetails}
        onCloseModal={closeModals}
        modalType={modalType}
        isGroupDetailsOpen={isGroupDetailsOpen}
        onShowSignIn={onShowSignIn}
        onShowNotify={onShowNotify}
      />
    </div>
  );
};