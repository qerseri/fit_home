import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import { getDoc, doc, updateDoc, onSnapshot, addDoc, collection, query, orderBy } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import useAuth from '../../../config/useAuth';

export default Account = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar)
      const connectionId = user.connection;
      const messagesCollectionRef = collection(firestore, `connection/${connectionId}/chat`);
      const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'asc'));
  
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          ...doc.data(),
          _id: doc.id,
        }));

        
        setMessages(newMessages);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }
    
  }, [user]);

  const onSend = async (newMessages = []) => {
   
    const connectionId = user.connection;
    const messagesCollectionRef = collection(firestore, `connection/${connectionId}/chat`);

    const formattedMessages = newMessages.map((message) => ({
      ...message,
      createdAt: message.createdAt.toISOString(),
    }));

    try {
      await Promise.all(
        formattedMessages.map((message) => addDoc(messagesCollectionRef, message))
      );
      console.log('Сообщения успешно отправлены!');
    } catch (error) {
      console.error('Ошибка при отправке сообщений:', error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  if (!user || loading) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen} />
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <TouchableWithoutFeedback accessible={false} onPress={dismissKeyboard}>
        <View style={styles.container}>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
              _id: user.uid,
              name: user.firstname,
              avatar: avatar,
            }}
            inverted={false}

            placeholder='Введите текст...'

            containerStyle={{
              backgroundColor: 'white',
              borderRadius: 10,
              margin: 5
            }}
            textStyle={{
              fontSize: 16,
              color: '#133337'
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5'
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});