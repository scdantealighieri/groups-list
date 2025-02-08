import { useState, useEffect } from "react";
import "./App.module.css";
import { Group } from "./models/group";
import { GroupsList } from "./groups-list/GroupsList";
import { GroupState } from "./enums/group-state";

function App() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dantealighieri.appblue.pl/api/get_groups.php"
        );
        const data = (await response.json()) as Group[];

        data.forEach((group) => {
          if (Date.parse(group.groupFirstMeet) > Date.now()) {
            group.groupState = GroupState.Icoming;
          } else {
            group.groupState = GroupState.Active;
          }
        });

        addAlwaysVisibleGroups(data);
        setGroups(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
