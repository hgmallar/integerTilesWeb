import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import TypingInput from "./TypingInput";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    fontSize: 30,
    marginVertical: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

const moreStyles = (correct) =>
  StyleSheet.create({
    answer: {
      fontSize: 30,
      color: correct ? "#39603d" : "red",
      marginVertical: 10,
      textAlign: "center",
      fontWeight: "bold",
    },
  });

export default class Equation extends Component {
  render() {
    return (
      <>
        {this.props.position === 1 && (
          <View style={styles.row}>
            <TypingInput
              placeholder={this.props.numInput}
              keyType="numeric"
              maxLen={10}
              onSubmitEditing={this.props.onSubmitEditing}
              correct={this.props.correct}
              inputDisabled={this.props.inputDisabled}
              setInputText={this.props.setInputText}
              answerVisible={this.props.answerVisible}
            />
            <Text
              style={styles.content}
            >{` ${this.props.sign} ${this.props.secondNum} = ${this.props.thirdNum}`}</Text>
          </View>
        )}
        {this.props.position === 2 && (
          <View style={styles.row}>
            <Text
              style={styles.content}
            >{`${this.props.firstNum} ${this.props.sign} `}</Text>
            <TypingInput
              placeholder={this.props.numInput}
              keyType="numeric"
              maxLen={10}
              onSubmitEditing={this.props.onSubmitEditing}
              correct={this.props.correct}
              inputDisabled={this.props.inputDisabled}
              setInputText={this.props.setInputText}
              answerVisible={this.props.answerVisible}
            />
            <Text style={styles.content}>{` = ${this.props.thirdNum}`}</Text>
          </View>
        )}
        {this.props.position === 3 && (
          <View style={styles.row}>
            <Text
              style={styles.content}
            >{`${this.props.firstNum} ${this.props.sign} ${this.props.secondNum} = `}</Text>
            <TypingInput
              placeholder={this.props.numInput}
              keyType="numeric"
              maxLen={10}
              onSubmitEditing={this.props.onSubmitEditing}
              correct={this.props.correct}
              inputDisabled={this.props.inputDisabled}
              setInputText={this.props.setInputText}
              answerVisible={this.props.answerVisible}
            />
          </View>
        )}
        {this.props.answerVisible && (
          <Text
            style={moreStyles(this.props.correct).answer}
          >{` ${this.props.firstNum} ${this.props.sign} ${this.props.secondNum} = ${this.props.thirdNum}`}</Text>
        )}
      </>
    );
  }
}
