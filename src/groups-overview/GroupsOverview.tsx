import { useState } from "react";
import { GroupCard } from "../group-card/GroupCard";
import { Group } from "../models/group";
import { GroupDetails } from "../models/group-details";
import { fetchGroup } from "../api/groups-api";
import { SpecialGroup } from "../models/special-group";
import { ModalManager } from "../modal-manager/ModalManager";
import { ModalType } from "../enums/modal-type";

import styles from "./GroupsOverview.module.css";

export const GroupsOverview = ({ groups, rootElement }: { groups: Group[], rootElement?: HTMLElement }) => {
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [isGroupDetailsOpen, setIsGroupDetailsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.None);

  const getFilteredGroups = () => {
    if (!rootElement) return groups;

    const level = rootElement.getAttribute('dante-level')?.toLowerCase();
    const type = rootElement.getAttribute('dante-type')?.toLowerCase();
    const lector = rootElement.getAttribute('dante-lector')?.toLowerCase();

    let filtered = [...groups];

    if (level) {
      filtered = filtered.filter(group => 
        group.groupLevel.toLowerCase().startsWith(level)
      );
    }

    if (type) {
      filtered = filtered.filter(group => 
        group.groupType.toLowerCase().startsWith(type)
      );
    }

    if (lector) {
      filtered = filtered.filter(group => 
        group.groupLector.toLowerCase().startsWith(lector)
      );
    }

    return filtered;
  };

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

  const filteredGroups = getFilteredGroups();

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.groupList}>
        {filteredGroups.map((group) => (
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