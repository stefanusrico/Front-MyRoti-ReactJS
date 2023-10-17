import React from "react";
import Kurir from "./Components/kurir";

const getData = () => [
  {
    id: 1,
    name: "Jane Cooper",
    username: "jane.cooper@example.com",
    title: "Regional Paradigm Technician",
    password: "Optimization",
    status: "Active",
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 2,
    name: "Cody Fisher",
    username: "cody.fisher@example.com",
    title: "Product Directives Officer",
    password: "Intranet",
    status: "Active",
    role: "Owner",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 3,
    name: "Esther Howard",
    username: "esther.howard@example.com",
    title: "Forward Response Developer",
    password: "Directives",
    status: "Active",
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 4,
    name: "Jenny Wilson",
    username: "jenny.wilson@example.com",
    title: "Central Security Manager",
    password: "Program",
    status: "Active",
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 5,
    name: "Kristin Watson",
    username: "kristin.watson@example.com",
    title: "Lean Implementation Liaison",
    password: "Mobility",
    status: "Active",
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 6,
    name: "Cameron Williamson",
    username: "cameron.williamson@example.com",
    title: "Internal Applications Engineer",
    password: "Security",
    status: "Active",
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

function DummyData() {
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Nama",
        accessor: "name",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ]
  );

  const data = React.useMemo(() => getData(), []);

  return (
      <div className = "mt-4">
        <Kurir columns={columns} data={data} />
      </div>
  );
}

export default DummyData;
