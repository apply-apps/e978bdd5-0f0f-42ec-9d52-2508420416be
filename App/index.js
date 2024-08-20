// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, View, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [donation, setDonation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant. Please respond to crowdfunding donations."
          },
          {
            role: "user",
            content: `Donation Inquiry Details:\nName: ${name}\nEmail: ${email}\nDonation: ${donation}\nMessage: ${message}`
          }
        ],
        model: "gpt-4o"
      });

      const { data } = response;
      Alert.alert('Thank You!', `Your donation inquiry has been received:\n${data.response}`);
      setName('');
      setEmail('');
      setDonation('');
      setMessage('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error processing your donation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Dog Food Crowdfunding</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Donation Amount"
          keyboardType="numeric"
          value={donation}
          onChangeText={setDonation}
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          multiline={true}
          numberOfLines={4}
        />
        <Button title="Donate" onPress={handleDonate} />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
  messageInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
});