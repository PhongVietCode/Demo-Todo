/* eslint-disable react-hooks/exhaustive-deps */
import { CheckCircleTwoTone, MinusSquareTwoTone } from "@ant-design/icons";
import { Button, Divider, List } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
interface TasksProps {
  selectedUserId: number;
}
function Tasks(props: TasksProps) {
  const [tasks, setTasks] = useState<
    { title: string; id: number; completed: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [loadingsTask, setLoadingsTask] = useState<boolean[]>([]);
  const [completedTasks, setCompletedTask] = useState(0);
  useEffect(() => {
    const loadTask = async () => {
      setTasks([]);
      setCompletedTask(0)
      setLoading(true);

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${props.selectedUserId}/todos`
      );
      setTimeout(() => {
        setTasks(
          response.data
            .map((item: { title: string; id: number; completed: boolean }) => ({
              title: item.title,
              id: item.id,
              completed: item.completed,
            }))
            .sort(
              (
                x: { title: string; id: number; completed: boolean },
                y: { title: string; id: number; completed: boolean }
              ) => {
                if (x.completed && !y.completed) return 1; // false first
                if (!x.completed && y.completed) return -1;
                return 0; // No change in order
              }
            )
        );
        setCompletedTask(response.data.map((item: {completed:boolean}) => (item.completed)).filter((item: boolean) => (item == true)).length)
        setLoading(false);
      }, 1000);
    };
    loadTask();
  }, [props.selectedUserId]);

  const enterLoading = (index: number) => {
    const markTask = async () => {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/todos/${index}`,
        { completed: true }
      );
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        for (let i = 0; i < newTasks.length; i++) {
          if (newTasks[i].id == index) {
            newTasks[i].completed = response.data.completed;
            break;
          }
        }
        newTasks.sort(
          (
            x: { title: string; id: number; completed: boolean },
            y: { title: string; id: number; completed: boolean }
          ) => {
            if (x.completed && !y.completed) return 1; // false first
            if (!x.completed && y.completed) return -1;
            return 0; // No change in order
          }
        );
        setCompletedTask((prevTasks) => prevTasks + 1)
        return newTasks;
      });
    };

    setLoadingsTask((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    markTask();
    setTimeout(() => {
      setLoadingsTask((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          placeItems: "center",
          paddingRight: 40,
          gap: 10,
        }}
      >
        <h3 style={{ fontWeight: "500", fontSize: 19 }}>Task</h3>
        <Divider style={{ flexGrow: 1 }} />
      </div>
      <List
        style={{ height: 500, overflow: "scroll" }}
        size="large"
        bordered
        loading={loading}
        dataSource={tasks}
        renderItem={(item: {
          title: string;
          id: number;
          completed: boolean;
        }) => (
          <List.Item
            onClick={() => {}}
            actions={[
              <Button
                type="primary"
                onClick={() => {
                  enterLoading(item.id);
                }}
                loading={loadingsTask[item.id]}
                style={{ display: item.completed ? "none" : "block" }}
              >
                Mark done
              </Button>,
            ]}
          >
            {item.completed ? (
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ marginRight: 5 }}
              />
            ) : (
              <MinusSquareTwoTone
                twoToneColor="#52c41a"
                style={{ marginRight: 5 }}
              />
            )}
            {item.title}
          </List.Item>
        )}
      />
      <div>
        Done {completedTasks}/{tasks.length} Tasks
      </div>
    </>
  );
}
export default Tasks;
