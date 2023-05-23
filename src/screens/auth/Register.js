import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, Modal, ScrollView} from 'react-native';

import { AntDesign, } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, createUserDocument } from '../../config/firebase';
import {ROUTES, CustomInput, CustomButton} from '../../components'

export default Register = ({route}) => {
  
  const {gender, age, height, weight, activity, goal, activityRatio, goalRatio} = route.params;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async() => {
    if (email && password && firstname && lastname && confirmPassword == password && agreedToTerms) {
      try {
        setLoading(true)
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        await createUserDocument(user, {
          /* username, */ 
          firstname,
          lastname,
          gender, 
          age: parseInt(age), 
          height: parseInt(height), 
          weight: parseInt(weight), 
          activity,
          goal,
          activityRatio,
          goalRatio,
        })
      } catch(err) {
        console.log('got error: ', err.message)
      } finally {
        setLoading(false)
      }
    } else {
      alert('не все заполнено или выбрано')
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <CustomInput 
          placeholder='Имя' 
          value={firstname} 
          setValue={text => setFirstName(text)}
        />
        <CustomInput 
          placeholder='Фамилия' 
          value={lastname} 
          setValue={text => setLastName(text)}
        />
        <CustomInput 
          placeholder='Почта' 
          value={email} 
          setValue={text => setEmail(text)}
        />

        <Text></Text>

        <CustomInput 
          placeholder='Пароль' 
          value={password} 
          setValue={text => setPassword(text)}
          secureTextEntry={true}
        />
        <CustomInput 
          placeholder='Подтвердите пароль' 
          value={confirmPassword} 
          setValue={text => setConfirmPassword(text)}
          secureTextEntry={true}
        />

        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <CheckBox
            checked={agreedToTerms}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
            containerStyle={{backgroundColor: '#FDF7F3', marginVertical: 8, padding: 0, }}
          />
          <View>
            <Text style={styles.text}>Я согласен с условиями</Text>
            <CustomButton text='Пользовательского соглашения' onPress={() => setModalVisible(true)} type='TERTIARY'/>
          </View>
        </View>

        <CustomButton 
          text={loading ? <ActivityIndicator size="small" color="white" /> : 'Зарегистрироваться'} 
          onPress={handleSubmit}
        />
      </View>

      <Modal visible={modalVisible} animationType='slide' transparent={true} >
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ScrollView style={{width: 350, height: 350, backgroundColor:'#CAC5C2', borderRadius: 10, borderWidth: 2, borderColor: '#A19D9B'}}>

            <View style={{flexDirection:'row-reverse', marginTop: 5, marginLeft: 5}}>
              <AntDesign name='close' style={{color: '#E52B50', fontSize: 40}} onPress={() => setModalVisible(false)}/>
            </View>

            <Text style={styles.title_agreement}>Пользовательское соглашение</Text>

            <Text style={styles.text_agreement}>
              1. Ваше здоровье и безопасность: {'\n'}
                {'\n'}
                - Прежде чем приступить к физическим упражнениям или следовать программе тренировок, проконсультируйтесь с медицинским специалистом, особенно если у вас есть какие-либо проблемы со здоровьем или травмы.{'\n'}
                - Вы должны обратить особое внимание на свое физическое состояние во время тренировок и прекратить занятия, если появятся какие-либо боли, дискомфорт или другие неприятные ощущения.{'\n'}
                - Не пренебрегайте правильной техникой выполнения упражнений, чтобы избежать травм и получить максимальную отдачу от тренировок.{'\n'}
                - Помните, что каждый человек индивидуален, и тренировочная программа, подходящая для одного, может не подойти другому. Следуйте рекомендациям и программам тренировок с учетом своих возможностей и физических характеристик.{'\n'}
                {'\n'}
              2. Конфиденциальность и безопасность данных:{'\n'}
                {'\n'}
                - Мы ценим вашу конфиденциальность и обязуемся защищать ваши персональные данные в соответствии с применимыми законами о защите данных.{'\n'}
                - Мы собираем и обрабатываем только необходимые данные для предоставления услуг и улучшения нашего фитнес-приложения.{'\n'}
                - Мы не передаем ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством или в целях предоставления услуг.{'\n'}
                {'\n'}
              3. Отказ от ответственности:{'\n'}
                {'\n'}
                - Вся информация, предоставляемая в фитнес-приложении, предназначена только для общего информационного пользования и не должна рассматриваться как медицинский совет или замена консультации с медицинским специалистом.{'\n'}
                - Мы не несем ответственности за любой ущерб или травмы, возникшие в результате использования фитнес-приложения или выполнения тренировок, рекомендованных в нем.{'\n'}
            </Text>
          </ScrollView>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: '#FDF7F3',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 15,
  },
  title_agreement: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  text_agreement: {
    fontSize: 15,
    padding: 10,
  }
});
