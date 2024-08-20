// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
  const [heroes, setHeroes] = useState('');
  const [villains, setVillains] = useState('');
  const [plot, setPlot] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a helpful assistant. Please generate a fairy tale for children." },
          { role: "user", content: `Create a story with heroes: ${heroes}, villains: ${villains}, and plot: ${plot}` },
        ],
        model: "gpt-4o"
      });

      const { data } = response;
      setStory(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Fairy Tale Generator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter heroes"
          value={heroes}
          onChangeText={setHeroes}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter villains"
          value={villains}
          onChangeText={setVillains}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter plot"
          value={plot}
          onChangeText={setPlot}
        />
        <Button title="Generate Story" onPress={generateStory} />
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
          <View style={styles.storyContainer}>
            <Text style={styles.story}>{story}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  storyContainer: {
    marginTop: 20,
  },
  story: {
    fontSize: 16,
    lineHeight: 24,
  },
});