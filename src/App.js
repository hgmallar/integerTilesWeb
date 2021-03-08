import React, { Component } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-web";

import Equation from "./components/Equation";

const windowWidth = Dimensions.get("window").width;
const numberOfColumns = 12;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#daded4",
    color: "#3c403d",
  },
  headerContainer: {
    backgroundColor: "#daded4",
    color: "#3c403d",
    borderBottomColor: "#daded4",
    paddingVertical: 0,
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3c403d",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textShadowColor: "#a3bcb6",
  },
  submitBtn: {
    width: 120,
    alignSelf: "center",
    paddingVertical: 0,
    marginVertical: 10,
  },
  directions: {
    color: "#3c403d",
    fontSize: 18,
    textAlign: "center",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  score: {
    color: "#3c403d",
    fontSize: 18,
    textAlign: "left",
    marginLeft: 5,
  },
  scoreBtn: {
    width: 80,
    alignSelf: "center",
    marginRight: 5,
    paddingVertical: 0,
    color: "#daded4",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#3c403d",
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    color: "#3c403d",
    fontWeight: "bold",
    fontSize: 30,
    marginRight: 5,
    marginLeft: 10,
    paddingBottom: 5,
  },
  checkboxes: {
    marginLeft: 10,
  },
});

const moreStyles = (text) =>
  StyleSheet.create({
    head: {
      width: windowWidth / numberOfColumns,
      height: windowWidth / numberOfColumns,
      maxWidth: 50,
      maxHeight: 50,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#3c403d",
      backgroundColor:
        text === "" ? "#daded4" : text === "\u002b" ? "black" : "red",
    },
    text: {
      fontSize: "1.5em",
      fontWeight: "bold",
      color: text === "" ? "#3c403d" : "#fff",
      textAlign: "center",
    },
  });

class App extends Component {
  state = {
    firstNum: "0",
    secondNum: "0",
    thirdNum: "0",
    numInput: "",
    position: 2,
    sign: "\u002b",
    add: true,
    sub: false,
    mult: false,
    divide: false,
    possibleSigns: ["\u002b"],
    score: 0,
    inputDisabled: false,
    dataTable: [
      [
        "",
        "\u002b",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "\u2212",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
      [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
       ],
    ],
    nextVisible: false,
    correct: true,
  };

  componentDidMount() {
    this.createNewProblem();
  }

  createNewProblem = () => {
    let newFirstNum = Math.floor(Math.random() * 21) - 10;
    const newSecondNum = Math.floor(Math.random() * 21) - 10;
    const newSign = this.state.possibleSigns[
      Math.floor(Math.random() * this.state.possibleSigns.length)
    ];
    let newThirdNum = newFirstNum * newSecondNum;
    if (newSign === "\u002b") {
      newThirdNum = newFirstNum + newSecondNum;
    } else if (newSign === "\u2212") {
      newThirdNum = newFirstNum - newSecondNum;
    } else if (newSign === "\u00f7") {
      newFirstNum = newThirdNum;
      newThirdNum = newFirstNum / newSecondNum;
    }
    const newPosition = Math.floor(Math.random() * 3) + 1;
    this.setState({
      firstNum: `${newFirstNum}`,
      secondNum: `${newSecondNum}`,
      thirdNum: `${newThirdNum}`,
      position: newPosition,
      sign: newSign,
      numInput: "",
      inputDisabled: false,
    });
  };

  onSubmitEditing = ({ nativeEvent: { text } }) => {
    let numberInput = text;
    let correct = false;
    let score = this.state.score;
    if (
      this.state.position === 1 &&
      parseInt(numberInput) === parseInt(this.state.firstNum)
    ) {
      correct = true;
      score = score + 1;
    } else if (
      this.state.position === 2 &&
      parseInt(numberInput) === parseInt(this.state.secondNum)
    ) {
      correct = true;
      score = score + 1;
    } else if (
      this.state.position === 3 &&
      parseInt(numberInput) === parseInt(this.state.thirdNum)
    ) {
      correct = true;
      score = score + 1;
    }
    this.setState({
      numInput: numberInput,
      nextVisible: true,
      correct: correct,
      score: score,
      inputDisabled: true,
    });
  };

  onTileClicked = (row, col) => {
    console.log(row, col);
    let newData = this.state.dataTable;
    if (newData[row][col] === "") {
      newData[row][col] = "\u002b";
    } else if (newData[row][col] === "\u002b") {
      newData[row][col] = "\u2212";
    } else {
      newData[row][col] = "";
    }
    this.setState({ dataTable: newData });
  };

  updateSign = (symbol, sign) => {
    let newPossibleSigns = this.state.possibleSigns;
    if (this.state[symbol]) {
      const index = newPossibleSigns.indexOf(sign);
      if (index > -1) {
        newPossibleSigns.splice(index, 1);
      }
    } else {
      newPossibleSigns.push(sign);
    }
    if (newPossibleSigns.length) {
      this.createNewProblem();
      this.setState({
        [symbol]: !this.state[symbol],
        possibleSigns: newPossibleSigns,
      });
    }
  };

  render() {
    return (
      <SafeAreaProvider>
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Integer Tiles</Text>
          </View>
          <View style={styles.row}>
            {[
              ["add", "\u002b"],
              ["sub", "\u2212"],
              ["mult", "\u00d7"],
              ["divide", "\u00f7"],
            ].map((data, index) => (
              <View style={styles.checkboxContainer} key={index}>
                <CheckBox
                  onValueChange={() => this.updateSign(data[0], data[1])}
                  value={this.state[data[0]]}
                  color="#39603d"
                  style={styles.checkboxes}
                />
                <Text style={styles.checkboxText}>{data[1]}</Text>
              </View>
            ))}
          </View>
          <Equation
            onSubmitEditing={this.onSubmitEditing}
            position={this.state.position}
            numInput={this.state.numInput}
            sign={this.state.sign}
            firstNum={this.state.firstNum}
            secondNum={this.state.secondNum}
            thirdNum={this.state.thirdNum}
            answerVisible={this.state.nextVisible}
            correct={this.state.correct}
            inputDisabled={this.state.inputDisabled}
          />
          {this.state.nextVisible && (
            <View style={styles.submitBtn}>
              <Button
                title="NEXT"
                color="#39603d"
                onPress={() => {
                  this.createNewProblem();
                  this.setState({
                    nextVisible: false,
                    numInput: "",
                  });
                }}
              />
            </View>
          )}
          <View style={styles.scoreRow}>
            <Text style={styles.score}>Score: {this.state.score}</Text>
            <View style={styles.scoreBtn}>
              <Button
                title="Reset"
                color="#a3bcb6"
                onPress={() => {
                  this.createNewProblem();
                  this.setState({
                    nextVisible: false,
                    numInput: "",
                    score: 0,
                  });
                }}
              />
            </View>
          </View>
          <Text style={styles.directions}>
            Use the integer tiles to help you solve the equation. Touch the
            tiles to flip them.
          </Text>
          <View style={{ marginBottom: 50 }}>
            {this.state.dataTable.map((rowData, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                {rowData.map((cell, cellIndex) => (
                  <TouchableOpacity
                    key={cellIndex}
                    onPress={() => this.onTileClicked(rowIndex, cellIndex)}
                  >
                    <View style={moreStyles(cell).head}>
                      <Text style={moreStyles(cell).text}>{cell}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

export default App;
