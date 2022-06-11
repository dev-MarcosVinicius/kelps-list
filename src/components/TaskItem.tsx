import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png';
import PenEditIcon from '../assets/icons/pen-edit/pen-edit.png';
import { Task, TaskListEventsProps } from '../components/TasksList';
import ModalView from './ModalView';

interface TasksListProps extends TaskListEventsProps {
    task: Task;
    index: number;
}

export function TaskItem({task, index, removeTask, editTask}: TasksListProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setEditedTask(task);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, editedTask);
        setIsEditing(false);
    }

    return (
        <>
            <View
                testID={`item-list-${index}`}
                style={styles.taskButton}
            >
                <Text
                    testID={`count-${index}`}
                    style={styles.count}
                >
                    {task.count}x
                </Text>

                {
                    isEditing 
                    ?
                    (
                        <ModalView visible={isEditing} closeModal={handleCancelEditing}>
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
                                    value={editedTask.title}
                                    onChangeText={(title) => setEditedTask({...editedTask, title})}
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
                                        value={editedTask.count}
                                        onChangeText={(count) => setEditedTask({...editedTask, count})}
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
                                        value={editedTask.price}
                                        onChangeText={(price) => setEditedTask({...editedTask, price})}
                                    />
                                    </View>
                                </View>
                
                            </View>
                
                            <TouchableOpacity
                                testID="add-new-task-button"
                                activeOpacity={0.4}
                                style={styles.addButtonModal}
                                onPress={handleSubmitEditing}
                            >
                            <Text style={styles.confirmButton}>
                                Atualizar
                            </Text>
                            </TouchableOpacity>
                        </ModalView>
                    )
                    : null
                }

                <Text
                    style={styles.taskText}                  
                >
                    {task.title}
                </Text>
            </View>

            <View style={styles.iconsContainer}>
                <TouchableOpacity
                    onPress={handleStartEditing}
                >
                    <Image source={PenEditIcon} />
                </TouchableOpacity>
                <View style={styles.iconsDivider}/>
                <TouchableOpacity
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }}/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    count: {
        color: '#666',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 5,
    },
    taskText: {
        color: '#666',
        paddingTop: 5,
        paddingBottom: 5
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginRight: 20
    },
    iconsDivider: {
        width: 1,
        height: 16,
        marginHorizontal: 10,
        backgroundColor: "rgba(196, 196, 196, 0.24)"
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
})