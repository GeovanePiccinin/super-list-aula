import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../../firebase/config";
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
import { db } from "../../firebase/config";

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
    signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        console.log("response", response);

        const uid = response.user.uid;
        console.log("uid", uid);
        const usersRef = doc(db, "users", uid);
        console.log("userRef", usersRef);
        const docSnap = await getDoc(usersRef);

        if (docSnap.exists()) {
          const user = docSnap.data();
          navigation.navigate("Main", { user: user });
        } else {
          console.log("User Profile not found");
        }
      })
      .catch((error) => {
        alert(
          `Error to authenticate. User not found. Try to signing up! ${error}`
        );
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
