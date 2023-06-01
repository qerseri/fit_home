import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  ActivityIndicator,
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';
import { getDoc, doc, updateDoc, onSnapshot, addDoc, collection } from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import useAuth from '../../../config/useAuth';

export default Account = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const chatId = user.chat;
      const messagesCollectionRef = collection(firestore, `chats/${chatId}/messages`);
  
      const unsubscribe = onSnapshot(messagesCollectionRef, (snapshot) => {
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
   
    const chatId = user.chat;
    const messagesCollectionRef = collection(firestore, `chats/${chatId}/messages`);

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

  if (!user || loading) {
    return (
      <ActivityIndicator size="large" color="#58754B" style={styles.loadingScreen} />
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: user.uid,
            name: user.firstname,
          }}
        />
      </View>
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
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
});