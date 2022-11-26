import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  SafeAreaView,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

type SkillData = {
  id: string;
  name: string;
};

export function Home() {
  const [greettings, setGreettings] = useState('');
  const [newSkill, setNewSkill] = useState<string>('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);

  function handleAddNewSkill() {
    if (newSkill?.trim() !== '') {
      const data: SkillData = {
        id: String(new Date().getTime()),
        name: newSkill,
      };

      setMySkills(oldState => [...oldState, data]);
      setNewSkill('');
    }
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreettings('Good morning!');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreettings('Good afternoon!');
    } else {
      setGreettings('Good night!');
    }
  }, [greettings]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Welcome,{' '}
        <Text style={[styles.title, { color: '#a370f7' }]}>Yago Neno</Text>
      </Text>

      <Text style={styles.greettings}>{greettings}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
        value={newSkill}
      />

      <Button title="Add" onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginTop: 40, marginBottom: 20 }]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 30,
    paddingHorizontal: 25,
  },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greettings: { color: '#fff', fontSize: 16, marginTop: 5 },
});
