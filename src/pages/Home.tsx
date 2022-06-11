import React, { useState } from 'react';
import { 
  Alert, 
  StyleSheet, 
  View,
} from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { AddTodo, TaskProps } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(task: TaskProps) {
    if (tasks.find(item => item.title == task.title)) return Alert.alert("Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome");

    console.log('Aquii ', task.price)

    const data = {
      id: new Date().getTime(),
      title: task.title,
      count: task.count.replace(/[^0-9]+/ig, ""),
      price: task.price.replace(/[^0-9]+/ig, ".")
    };

    setTasks(oldTasks => [...oldTasks, data]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel"
        },
        { text: "Sim", onPress: () => setTasks(oldTasks => oldTasks.filter(task => task.id != id)) }
      ]
    );
  }

  function handleEditTask(taskId: number, editedTask: Task) {
    const updatedTasks = tasks.map(task => {
      if (task.id == taskId) {
        task = editedTask;
      }

      return task;
    })

    setTasks(updatedTasks);
  }

  function sumAllPrices(): number {
    let total = 0;
    for (const task of tasks) {
      total += (Number(task.price) * Number(task.count));
    }
    return total;
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={sumAllPrices()}/>

      <AddTodo addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  },
  keyboardAvoid: {
    flex: 1
  }
})