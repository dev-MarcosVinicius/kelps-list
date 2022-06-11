import React, { useState } from 'react';
import { 
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import ModalView from './../components/ModalView'

export interface TaskProps {
  title: string;
  count: string;
  price: string;
}

interface AddTodoProps {
  addTask: (task: TaskProps) => void;
}

export function AddTodo({ addTask }: AddTodoProps) {
  const [task, setTask] = useState<TaskProps>({
    title: '',
    count: '',
    price: ''
  });
  const [ openTasksModal, setOpenTasksModal ] = useState(false);

  function handleAddNewTask() {
    if (
      task.title.trim() != '' &&
      task.count.trim() != '' &&
      task.price.trim() != ''
    ) {
      addTask(task);
      setTask({
        title: '',
        count: '',
        price: ''
      });
    }
  }

  function handleCloseModal() {
    setOpenTasksModal(false);
  }
  
  function handleOpenModal() {
    setOpenTasksModal(true);
  }

  return (
    <View style={styles.inputContainer}>
      <ModalView visible={openTasksModal} closeModal={handleCloseModal}>
          <View style={styles.inputModal}>
            <Text style={styles.label}>
              Nome do produto
            </Text>
            <TextInput 
              style={styles.input} 
              placeholder="Suco de Uva"
              keyboardType={'default'}
              placeholderTextColor="#B2B2B2"
              returnKeyType="done"
              maxLength={30}
              selectionColor="#0583F2"
              value={task.title}
              onChangeText={(title) => setTask({...task, title})}
            />

            <View style={styles.horizontal}>
              <View style={styles.halfView}>
                <Text style={styles.label}>
                  Quantidade
                </Text>

                <TextInput 
                  style={styles.halfInput} 
                  placeholder="2"
                  keyboardType={'numeric'}
                  placeholderTextColor="#B2B2B2"
                  returnKeyType="done"
                  maxLength={3}
                  selectionColor="#0583F2"
                  value={task.count}
                  onChangeText={(count) => setTask({...task, count})}
                />
              </View>

              <View style={styles.halfView}>
                <Text style={styles.label}>
                  Valor
                </Text>

                <TextInput 
                  style={styles.halfInput} 
                  placeholder="8,00"
                  keyboardType={'decimal-pad'}
                  placeholderTextColor="#B2B2B2"
                  returnKeyType="done"
                  maxLength={9}
                  selectionColor="#0583F2"
                  value={task.price}
                  onChangeText={(price) => setTask({...task, price})}
                />
              </View>
            </View>

          </View>

          <TouchableOpacity
            testID="add-new-task-button"
            activeOpacity={0.4}
            style={styles.addButtonModal}
            onPress={handleAddNewTask}
          >
            <Text style={styles.confirmButton}>
              Adicionar
            </Text>
          </TouchableOpacity>
      </ModalView>

      <TouchableOpacity
        testID="open-modal-task-button"
        activeOpacity={0.4}
        style={styles.addButton}
        onPress={handleOpenModal}
        >
        <Icon name="plus" size={24} color="#0583F2" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: -40,
    marginHorizontal: 24,
  },
  input: {
    flex: 1,
    maxHeight: 56,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666'
  },
  addButton: {
    backgroundColor: '#ffffff',
    height: 50,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  addButtonModal: {
    backgroundColor: '#ffffff',
    height: 50,
    marginBottom: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  inputModal: {
    flex: 1,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  confirmButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0583F2',
  },
  horizontal: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  halfView: {
    width: '45%',
  },
  halfInput: {
    height: 56,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderRightWidth: 1,
    borderRightColor: '#EBEBEB',
    color: '#666666'
  },
});