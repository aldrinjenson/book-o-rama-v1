import React from 'react';
import {Text, View, StyleSheet, TextInput, Alert, Image} from 'react-native';
import {globalStyles} from '../global/globalStyles';
import {Formik} from 'formik';
import * as yup from 'yup';

import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../config/firebaseConfig';
import CustomButton from '../components/CustomButton';
import {Paragraph} from 'react-native-paper';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const dbh = firebase.firestore();

const handleSubmit = (values) => {
  dbh.collection('feedback').doc(values.name).set({
    email: values.email,
    feedback: values.feedback,
  });
  Alert.alert('Your feedback has been sent. Thank you :)');
};

const feedbackSchema = yup.object({
  name: yup.string().required().min(3),
  email: yup.string().required().min(6).email(),
  feedback: yup.string().required().min(4),
});

const FeedbackPage = () => {
  return (
    <View style={styles.feedbackPage}>
      <View style={styles.textContent}>
        <Paragraph>Found a bug or met with an error ?</Paragraph>
        <Paragraph>Have an idea for a cool new feature ?</Paragraph>
        <Paragraph>Just drop in your contact details</Paragraph>
        <Paragraph>&</Paragraph>
        <Paragraph> send a feedback to the developer!!</Paragraph>
      </View>

      <Formik
        initialValues={{name: '', email: '', feedback: ''}}
        validationSchema={feedbackSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.resetForm();
        }}>
        {(props) => (
          <View>
            <TextInput
              placeholder="Name"
              onChangeText={props.handleChange('name')}
              style={styles.feedbackInput}
              value={props.values.name}
              onBlur={props.handleBlur('name')}
            />
            <Text style={styles.errorText}>
              {props.touched.name && props.errors.name}
            </Text>
            <TextInput
              placeholder="E-mail"
              onChangeText={props.handleChange('email')}
              style={styles.feedbackInput}
              value={props.values.email}
              onBlur={props.handleBlur('email')}
            />
            <Text style={styles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <TextInput
              placeholder="Feedback"
              multiline
              minHeight={75}
              onChangeText={props.handleChange('feedback')}
              style={styles.feedbackInput}
              value={props.values.feedback}
              onBlur={props.handleBlur('feedback')}
            />
            <Text style={styles.errorText}>
              {props.touched.feedback && props.errors.feedback}
            </Text>
            <CustomButton text="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
      <Text style={globalStyles.footer}>
        Made With <Image source={require('../assets/heart.png')} />
      </Text>
    </View>
  );
};

export default FeedbackPage;

const styles = StyleSheet.create({
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: '#2196F3',
    marginBottom: 10,
  },
  textContent: {
    // justifyContent:'center',
    alignItems: 'center',
    marginBottom: 40,
    paddingVertical: 10,
  },
  feedbackPage: {
    ...globalStyles.container,
  },
});
