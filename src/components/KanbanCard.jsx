import { useState } from "react";

const KanbanCard = ({ data = {}, dataOnChange }) => {
  const {
    id,
    title,
    description,
    startDate,
    endDate,
    actualHours,
    estimatedHours,
    resourceName,
    resourceImgUrl,
  } = data;

  const [edit, setEdit] = useState(false);

  return (
    <div className="kanban-card" key={id}>
      <div className="kanban-card-header">
        <img
          src={resourceImgUrl}
          alt="Resource Image"
          className="resource-img"
        />
        <div className="resource-details">
          <h4 className="resource-name">{resourceName}</h4>
          <p className="task-dates">
            {startDate} - {endDate}
          </p>
        </div>
      </div>
      <div className="kanban-card-body">
        <h3 className="task-title">{title}</h3>
        <p className="task-desc">{description}</p>
      </div>
      <div className="kanban-card-footer">
        <div className="card-footer">
          <p className="hours">Estimated : {estimatedHours}hr</p>
          {edit ? (
            <p className="hours">
              Actual :{" "}
              <select
                name="hours"
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  dataOnChange({ ...data, actualHours: e.target.value });
                }}
                value={actualHours}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1} hour{index > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div
                className={`indicator ${
                  actualHours > estimatedHours ? "exceeded" : ""
                } ${actualHours <= estimatedHours ? "under" : ""}`}
              />{" "}
              <p className="hours" onClick={() => setEdit(true)}>
                Actual : {actualHours}hr
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
