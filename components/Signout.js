import React, { useEffect } from "react";
import { signOutUser } from "../store/actions/userActions";
import { Text } from "react-native";

const SignOut = () => {
  useEffect(() => {
    signOutUser();
  });
  return <Text>Loading...</Text>;
};
export default SignOut;
