import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar
} from "react-native";
import firebase from "firebase";
import Fire from "../Fire";
import UserPermissions from "../utilities/UserPermission";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from '@expo/vector-icons';

export default class RegisterScreen extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: "",
      avatar: null,
    },

    errorMessage: null
  };

  handleSignUp = () => {
    Fire.shared.createUser(this.state.user)
 };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3]   //4:3 , 16:9, 16:10, 1:1
    });

    if (!result.cancelled) {
      this.setState({ user: { ...this.state.user, avatar: result.uri } });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>
        <TouchableOpacity style={{ alignItems: "center" }} onPress={this.handlePickAvatar} >
          <Image source={{ uri: this.state.user.avatar }} style={styles.avatar} />
          <Ionicons
            name="ios-add"
            size={80}
            color="#FCC"
          />
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={name => this.setState({user:{...this.state.user, name }})}
            value={this.state.name}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={email => this.setState({user:{...this.state.user, email }})}
            value={this.state.email}
          />
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={password => this.setState({user:{...this.state.user, password }})}
            value={this.state.password}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: 700 }}>
            {" "}
            Sign Up{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ textAlign: "center", marginTop: 10 }}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text>
            Already have an account?
            <Text style={{ color: "#FE0000", fontWeight: 600 }}>
              {" "}
              Login{" "}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    color: "#FF3300",
    textAlign: "center",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#FF3399",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  avatar: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50
  }

  //password:{}
});
