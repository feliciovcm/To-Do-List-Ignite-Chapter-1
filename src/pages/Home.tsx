import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTask = tasks.some((item) => item.title === newTaskTitle);
    if (hasTask) {
      Alert.alert(
        "Task ja cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }
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
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const filteredTasks = tasks.filter((item) => item.id !== id);
            setTasks(filteredTasks);
          },
        },
      ]
    );
  }

  function handleEditTask (taskId: number, taskNewTitle: string) {
    const newTasksArr = [...tasks];
    const taskToChangeIndex = newTasksArr.findIndex((item) => item.id === taskId);
    newTasksArr[taskToChangeIndex].title = taskNewTitle;
    setTasks(newTasksArr);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
