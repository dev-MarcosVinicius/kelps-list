import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import logoImg from '../assets/images/logo/logo-kelps.png';

interface HeaderProps {
  tasksCounter: number;
}

export function Header({ tasksCounter }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImg} />

      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>R$ </Text>
        <Text style={styles.tasksCounterBold}>{tasksCounter.toFixed(2)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 50,
    backgroundColor: '#0583F2',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasks: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasksCounter: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  tasksCounterBold: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  logo: {
    height: 30,
    width: 140,
  }
});