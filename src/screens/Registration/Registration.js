import React, { useState } from "react";

import {
  Container,
  InputText,
  Button,
  ButtonTitle,
  FooterView,
  FooterText,
  FooterLink,
} from "./Registration.styles";
import { ScrollView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/config";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        try {
          const docRef = await setDoc(doc(db, "users", uid), data);
          navigation.navigate("Main", { user: data });
        } catch (error) {
          alert(`error creating user ${error}`);
        }
      })
      .catch((error) => {
        alert(`error creating email/password ${error}`);
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
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
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
        <InputText
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button onPress={() => onRegisterPress()}>
          <ButtonTitle>Create account</ButtonTitle>
        </Button>
        <FooterView>
          <FooterText>
            Already got an account?{" "}
            <FooterLink onPress={onFooterLinkPress}>Log in</FooterLink>
          </FooterText>
        </FooterView>
      </ScrollView>
    </Container>
  );
}
