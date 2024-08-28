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
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="5">5 hours</option>
                <option value="6">6 hours</option>
                <option value="7">7 hours</option>
                <option value="8">8 hours</option>
                <option value="9">9 hours</option>
                <option value="10">10 hours</option>
              </select>
            </p>
          ) : (
            <p className="hours" onClick={() => setEdit(true)}>
              Actual : {actualHours}hr
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
