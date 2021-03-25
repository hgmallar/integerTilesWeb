import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-web";

const styles = (answerVisible, correct) =>
  StyleSheet.create({
    letterInput: {
      height: 44,
      borderColor: "#39603d",
      color: "#39603d",
      borderRadius: 5,
      borderWidth: 1,
      backgroundColor: !answerVisible ? "#daded4" : correct ? "#a3bcb6" : "red",
      fontWeight: !answerVisible ? "normal" : "bold",
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
  answerVisible,
  correct,
  inputDisabled,
  setInputText,
}) => {
  const [text, setText] = useState(placeholder);

  if (placeholder === "" && text) {
    setText("");
  }

  return (
    <View>
      <TextInput
        style={styles(answerVisible, correct).letterInput}
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
        onChangeText={(text) => {
          setText(text);
          setInputText(text);
        }}
        onSubmitEditing={({ nativeEvent: { text } }) => {
          onSubmitEditing(text);
          setText("");
        }}
        value={placeholder ? placeholder : text}
      />
    </View>
  );
};

export default TypingInput;
