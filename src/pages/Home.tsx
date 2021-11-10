import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };
    setTasks((prevValues) => [...prevValues, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newTasksArr = [...tasks];
    const taskToChangeIndex = newTasksArr.findIndex((item) => item.id === id);
    newTasksArr[taskToChangeIndex].done = true;
    setTasks(newTasksArr);
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((item) => item.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
