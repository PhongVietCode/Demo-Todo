import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Component/Header/Header";
import Tasks from "./Component/Tasks/Tasks";
import User from "./Component/User/User";
import axios from "axios";

function App() {
  const [selectedUserId, setSelectedUserId] = useState(Object);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadUser = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(
        response.data.map((item: { name: string; id: number }) => ({
          name: item.name,
          id: item.id,
        }))
      );
      console.log("user", response.data);
    };
    loadUser()
  }, []);

  return (
    <>
      <Header />
      <div style={{ height: 60, backgroundColor:'transparent' }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: "24px 40px 0px 40px",
        }}
      >
        <User
          users={users}
          setSelectedUserId={(value) => {
            setSelectedUserId(value);
            console.log("Selected User: ", value);
          }}
        />
        <Tasks selectedUserId={selectedUserId}/>
      </div>
    </>
  );
}

export default App;
