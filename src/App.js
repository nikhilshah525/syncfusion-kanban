import "./App.css";
import {
  ColumnDirective,
  ColumnsDirective,
  KanbanComponent,
} from "@syncfusion/ej2-react-kanban";
import { kanbanDataCheck } from "./kanbanData";
import { useEffect, useState } from "react";
import KanbanCard from "./components/KanbanCard";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from localStorage
    const storedData = localStorage.getItem("kanbanData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(kanbanDataCheck);
    }
  }, []);

  const changeHandler = (e) => {
    const changedData = e.changedRecords || [];
    const changes = data.map((list) =>
      changedData.some((changedItem) => changedItem.id === list.id)
        ? { ...list, ...changedData.find((item) => item.id === list.id) }
        : list
    );

    setData(changes);
    localStorage.setItem("kanbanData", JSON.stringify(changes));
  };

  const dataOnChange = (changedData) => {
    const changes = data.map((list) =>
      changedData.id === list.id ? changedData : list
    );

    setData(changes);
    localStorage.setItem("kanbanData", JSON.stringify(changes));
  };

  return (
    <>
      <KanbanComponent
        dataSourceChanged={changeHandler}
        width="100%"
        keyField="status"
        dataSource={data}
        cardSettings={{
          contentField: "description",
          headerField: "id",
          template: (data) => (
            <KanbanCard key={data.id} data={data} dataOnChange={dataOnChange} />
          ),
        }}
      >
        <ColumnsDirective>
          <ColumnDirective headerText="To Do" keyField="Open" />
          <ColumnDirective headerText="In Progress" keyField="InProgress" />
          <ColumnDirective headerText="Testing" keyField="Testing" />
          <ColumnDirective headerText="Done" keyField="Close" />
        </ColumnsDirective>
      </KanbanComponent>
    </>
  );
}

export default App;
