import { useState, useEffect } from "react";
import "./App.module.css";
import { Group } from "./models/group";
import { GroupsList } from "./groups-list/GroupsList";
import { GroupState } from "./enums/group-state";
import { fetchGroups } from "./api/groups-api";

function App() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGroups();
      
      addAlwaysVisibleGroups(data);
      setGroups(data);
    };

    fetchData();
  }, []);

  const addAlwaysVisibleGroups = (groups: Group[]): void => {
    groups.push({
      groupId: "-1",
      groupType: "",
      groupLevel: "",
      groupDays: "",
      groupHours: "",
      groupLector: "Stwórz swoją grupę, podając swoje preferencje!",
      groupFirstMeet: "",
      groupState: GroupState.Active,
      groupShortName: "Indywidualna ",
      groupFreePlaces: 5,
      groupAlwaysVisible: true,
    });

    groups.push({
      groupId: "-2",
      groupType: "",
      groupLevel: "",
      groupDays: "",
      groupHours: "",
      groupLector: "Stwórz swoją grupę, podając swoje preferencje!",
      groupFirstMeet: "",
      groupState: GroupState.Active,
      groupShortName: "Duetto",
      groupFreePlaces: 5,
      groupAlwaysVisible: true,
    });
  };

  return (
    <div className="App">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />
      <GroupsList groups={groups} />
    </div>
  );
}

export default App;
