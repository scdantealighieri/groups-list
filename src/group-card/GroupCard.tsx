import { Group } from "../models/group";
import "./GroupCard.module.css";

export const GroupCard = ({ group }: { group: Group }) => {
  return (
    <div>
      <div>{group.groupType}</div>
      <div>{group.groupLevel}</div>
      <div>
        {group.groupDays} - {group.groupHours}
      </div>
      <div>{group.groupLector}</div>
    </div>
  );
};
