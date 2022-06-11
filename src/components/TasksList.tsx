import React from 'react';
import { FlatList, Text } from 'react-native';

import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  count: string;
  price: string;
}

export interface TaskListEventsProps {
  removeTask: (id: number) => void;
  editTask: (id: number, task: Task) => void;
}

interface TasksListProps extends TaskListEventsProps {
  tasks: Task[];
}

export function TasksList({ tasks, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#0583F2',
          alignSelf: 'center',
          marginTop: 30
        }}>Nenhum item na sua lista 🙁</Text> 
      )}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              task={item}
              index={index}
              removeTask={removeTask}
              editTask={editTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: -10
      }}
    />
  )
}