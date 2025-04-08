import { useState, useEffect } from "react";
import "./App.module.css";
import { Group } from "./models/group";
import { GroupsList } from "./groups-list/GroupsList";
import { fetchGroups } from "./api/groups-api";
import { IndividualGroup } from "./special-groups/individual-group";
import { DuettoGroup } from "./special-groups/duetto-group";

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
    groups.push(IndividualGroup);
    groups.push(DuettoGroup);
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
