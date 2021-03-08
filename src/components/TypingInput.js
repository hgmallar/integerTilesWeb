import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-web";

const styles = (placeholder, correct) =>
  StyleSheet.create({
    letterInput: {
      height: 44,
      borderColor: "#39603d",
      color: "#39603d",
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor:
        placeholder === "" ? "#daded4" : correct ? "#a3bcb6" : "red",
      fontWeight: placeholder === "" ? "normal" : "bold",
      fontSize: 30,
      marginRight: 10,
      paddingHorizontal: 5,
      width: 100,
      textAlignVertical: "center",
      paddingVertical: 5,
    },
  });

const TypingInput = ({
  keyType,
  onSubmitEditing,
  maxLen,
  placeholder,
  correct,
  inputDisabled,
}) => {
  const [text, setText] = useState(placeholder);

  return (
    <View>
      <TextInput
        style={styles(placeholder, correct).letterInput}
        disabled={inputDisabled}
        maxLength={maxLen}
        keyboardType={keyType}
        // textAlign="center"
        placeholderTextColor="#39603d"
        autoCapitalize="none"
        autoFocus={true}
        clearTextOnFocus={true}
        blurOnSubmit={true}
        numberOfLines={100}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={(evt) => {
          onSubmitEditing(evt);
          setText("");
        }}
        value={placeholder ? placeholder : text}
      />
    </View>
  );
};

export default TypingInput;
