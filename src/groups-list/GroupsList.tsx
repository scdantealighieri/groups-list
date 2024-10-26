import { GroupCard } from "../group-card/GroupCard";
import { Group } from "../models/group";

import styles from "./GroupsList.module.css";

export const GroupsList = ({ groups }: { groups: Group[] }) => {
  return (
    <div className={styles.groupList}>
      {groups.map((group) => (
        <GroupCard group={group} key={group.groupId} />
      ))}
    </div>
  );
};
