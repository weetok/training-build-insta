import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { auth, register, login, logout } from './api/firebase';


export default function App() {
  const [ user, setUser ] = useState(auth.currentUser);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  auth.onAuthStateChanged((user) => {
    console.log('auth state changed', user);
    setUser(user);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text> Current user is {user ? user.email : "lonely"}! </Text>
      <Text>========================================</Text>
      { user ? (
        <TouchableOpacity style={styles.button} onPress={() => {
          logout()
          .then(() => console.log("Logged out!"));
        } }>
          <Text>Sign out</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text>Email:</Text>
          <TextInput placeholder="email@example.com" onChangeText={
            (text) => setEmail(text)
          } />
          <Text>Password:</Text>
          <TextInput placeholder="password" secureTextEntry onChangeText={
            (text) => setPassword(text)
          } />
          <TouchableOpacity style={styles.button} onPress={() => {
            register(email, password)
            .then((userObj) => console.log("Registered!", userObj))
            .catch((error) => console.log("Error!", error));
          } }>
            <Text>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            login(email, password)
            .then((userObj) => console.log("Logged in!", userObj))
            .catch((error) => console.log("Error logging in!", error));
          } }>
            <Text>Sign in</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={() => {
        console.log(auth.currentUser);
      } }>
        <Text>Print User in console</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#DFD',
    foregroundColor: '#422',
    padding: 10,
    borderRadius: 5,
  },
});
