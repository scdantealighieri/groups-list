import { GroupCard } from "../group-card/GroupCard";
import { Group } from "../models/group";

export const GroupsList = ({ groups }: { groups: Group[] }) => {
  return (
    <div>
      {groups.map((group) => (
        <GroupCard group={group} />
      ))}
    </div>
  );
};
