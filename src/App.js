import "./App.css";
import {
  ColumnDirective,
  ColumnsDirective,
  KanbanComponent,
} from "@syncfusion/ej2-react-kanban";
import { useEffect, useState } from "react";
import KanbanCard from "./components/KanbanCard";
import Papa from "papaparse";
import { FiDownload } from "react-icons/fi";
import { getListData, insertObject, updateObject } from "./api-service/Service";
import { PiPlusCircle } from "react-icons/pi";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getListData()
      .then((response) => {
        console.log(response.data.value);
        setData(response.data.value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDataChange = (changedData) => {
    const updatedData = data.map((item) =>
      changedData.id === item.id ? { ...item, ...changedData } : item
    );

    setData(updatedData);
    updateObject(changedData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data.map((item) => ({
          ...item,
          order: parseInt(item.order, 10) || 0, // Ensure order is an integer
        }));
        setData(parsedData);
        localStorage.setItem("kanbanData", JSON.stringify(parsedData));
        e.target.value = "";
        insertListOfData(parsedData);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const insertListOfData = (list) => {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      insertObject(element)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="mb-0">Intelegain Work Board</h4>
        <div>
          <div className="d-flex gap-2">
            <div className="btn btn-secondary">
              <div className="d-flex justify-content-center align-items-center">
                <PiPlusCircle fontSize={17} className="me-2" />
                Add New
              </div>
            </div>
            <div className="btn btn-primary upload-button-wrapper">
              <div className="d-flex justify-content-center align-items-center">
                <FiDownload fontSize={17} className="me-2" />
                Import CSV File
              </div>
              <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>
          </div>
        </div>
      </div>
      <KanbanComponent
        dragStop={(e) => {
          setData((prev) => {
            const changes = prev.map((list) => {
              if (
                e.dropIndex >= 0 &&
                e.data.some((changedItem) => changedItem.id === list.id)
              ) {
                return {
                  ...list,
                  ...e.data.find((item) => item.id === list.id),
                  order: e.dropIndex,
                };
              } else {
                return list;
              }
            });
            setData(changes);
          });
          updateObject(e.data[0])
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
          console.log(e);
        }}
        dataSourceChanged={(e) => handleDataChange(e.changedRecords[0])}
        width="100%"
        keyField="status"
        dataSource={data}
        cardSettings={{
          contentField: "description",
          headerField: "id",
          grabberField: "id",
          template: (data) => (
            <KanbanCard
              key={data.id}
              data={data}
              dataOnChange={handleDataChange}
            />
          ),
        }}
        cardDoubleClick={(e) => (e.cancel = true)}
      >
        <ColumnsDirective>
          <ColumnDirective
            allowToggle={true}
            headerText="To Do"
            keyField="Open"
          />
          <ColumnDirective
            allowToggle={true}
            headerText="In Progress"
            keyField="InProgress"
          />
          <ColumnDirective
            allowToggle={true}
            headerText="Testing"
            keyField="Testing"
          />
          <ColumnDirective
            allowToggle={true}
            headerText="Done"
            keyField="Close"
          />
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
}

export default App;
