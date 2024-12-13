import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, PermissionsAndroid,Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';


const App = () => {
  useEffect(() => {
    // Request notification permission
    
    requestNotificationPermission();
    getFCMToken();
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

   // Get the FCM token
   const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('FCM Token:', token);
      } else {
        console.log('No FCM token available');
      }
    } catch (err) {
      console.warn('Error getting FCM token:', err);
    }
  };


  const requestNotificationPermission = async () => {
    try {
      
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.warn('Permission request error: ', err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Push Notifications Demo</Text>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <Text style={styles.description}>
        This app demonstrates the functionality of Firebase push notifications.
      </Text>
      <Text style={styles.instructions}>
        Send a push notification from Firebase to see how it works!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
});

export default App;
