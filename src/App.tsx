import { useState, useEffect } from "react";
import "./App.module.css";
import { Group } from "./models/group";
import { GroupsList } from "./groups-list/GroupsList";
import { fetchGroups, fetchLectors } from "./api/groups-api";
import { IndividualGroup } from "./special-groups/individual-group";
import { DuettoGroup } from "./special-groups/duetto-group";
import { Lector } from "./models/lector";

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [lectors, setLectors] = useState<Lector[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGroups();
      const lectorsData = await fetchLectors();

      setLectors(lectorsData);
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
      <GroupsList groups={groups} lectors={lectors} />
    </div>
  );
}

export default App;
