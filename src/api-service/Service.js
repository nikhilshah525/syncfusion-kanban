import axios from "axios";

const headers = {
  Accept: "application/json;odata=nometadata",
};

export const insertObject = (data) => {
  const payload = {
    ...data,
    PartitionKey: data.id,
    RowKey: data.id,
  };

  return axios.post(
    "https://nikhilstorage35.table.core.windows.net/Resource?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-10-31T21:03:08Z&st=2024-09-03T13:03:08Z&spr=https&sig=XrxZXbzc8aG1AIxpe5Eburli0cPxAFuEtKI5bfQfKCU%3D",
    payload,
    {
      headers: headers,
    }
  );
};

export const updateObject = (data) => {
  const payload = {
    ...data,
    PartitionKey: data.id,
    RowKey: data.id,
  };

  return axios.put(
    `https://nikhilstorage35.table.core.windows.net/Resource(PartitionKey='${data.id}',RowKey='${data.id}')?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-10-31T21:03:08Z&st=2024-09-03T13:03:08Z&spr=https&sig=XrxZXbzc8aG1AIxpe5Eburli0cPxAFuEtKI5bfQfKCU%3D`,
    payload,
    {
      headers: headers,
    }
  );
};

export const getListData = () => {
  return axios.get(
    `https://nikhilstorage35.table.core.windows.net/Resource?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-10-31T21:03:08Z&st=2024-09-03T13:03:08Z&spr=https&sig=XrxZXbzc8aG1AIxpe5Eburli0cPxAFuEtKI5bfQfKCU%3D`,

    {
      headers: headers,
    }
  );
};

export const deleteRow = (id) => {
  return axios
    .delete(
      `https://nikhilstorage35.table.core.windows.net/Resource(PartitionKey='${id}',RowKey='${id}')?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-10-31T21:03:08Z&st=2024-09-03T13:03:08Z&spr=https&sig=XrxZXbzc8aG1AIxpe5Eburli0cPxAFuEtKI5bfQfKCU%3D`,
      null,
      {
        headers: headers,
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
