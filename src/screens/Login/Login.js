import React, { useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import firebase, { auth } from "../../firebase/config";
import { ScrollView } from "react-native";
import {
  Container,
  InputText,
  Button,
  ButtonTitle,
  FooterView,
  FooterText,
  FooterLink,
} from "./Login.styles";

export default function LoginScreen({ navigation }) {
  useEffect(() => {
    if (auth.currentUser) {
      navigation.navigate("Main");
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate("Main");
        }
      });
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert("User does not exist anymore.");
              return;
            }
            const user = firestoreDocument.data();
            navigation.navigate("Main", { user: user });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Container>
      <ScrollView
        style={{
          flexGrow: 1,
          width: "100%",
        }}
        extraScrollHeight={100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        <InputText
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <InputText
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button onPress={() => onLoginPress()}>
          <ButtonTitle>Log in</ButtonTitle>
        </Button>

        <FooterView>
          <FooterText>
            Don't have an account?{" "}
            <FooterLink onPress={onFooterLinkPress}>Sign up</FooterLink>
          </FooterText>
        </FooterView>
      </ScrollView>
    </Container>
  );
}
