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
  Image,
} from "react-native";
import { CheckBox } from "react-native-web";

import Equation from "./components/Equation";

const numberOfColumns = 12;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    textAlign: "center",
    marginLeft: 10,
  },
  btnsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 5,
    maxWidth: 230,
    alignSelf: "center",
  },
  scoreBtn: {
    width: 105,
    paddingVertical: 0,
    color: "#daded4",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#3c403d",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    color: "#3c403d",
    fontWeight: "bold",
    fontSize: 30,
    marginRight: 15,
    marginLeft: 10,
    paddingBottom: 5,
  },
  checkboxes: {
    marginLeft: 10,
  },
  resizeMode: {
    height: 50,
    width: 120,
  },
});

const moreStyles = (text, width, height) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#daded4",
      color: "#3c403d",
      height: "100%",
      minHeight: height ? height : Dimensions.get("window").height,
    },
    head: {
      width: width
        ? width / numberOfColumns
        : Dimensions.get("window").width / numberOfColumns,
      height: width
        ? width / numberOfColumns
        : Dimensions.get("window").width / numberOfColumns,
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
      ["", "\u002b", "", "", "", "", "", "", "", "", "", ""],
      ["", "\u2212", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
    ],
    nextVisible: false,
    correct: true,
    windowHeight: Dimensions.get("window").height,
    windowWidth: Dimensions.get("window").width,
  };

  componentDidMount() {
    this.createNewProblem();

    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowHeight: Dimensions.get("window").height,
      windowWidth: Dimensions.get("window").width,
    });
  };

  createNewProblem = () => {
    let newFirstNum = Math.floor(Math.random() * 21) - 10;
    let newSecondNum = Math.floor(Math.random() * 21) - 10;
    const newSign = this.state.possibleSigns[
      Math.floor(Math.random() * this.state.possibleSigns.length)
    ];
    //remove divide by 0.
    if (newSign === "\u00f7" && newSecondNum === 0) {
      while (newSecondNum === 0) {
        newSecondNum = Math.floor(Math.random() * 21) - 10;
      }
    }
    let newThirdNum = newFirstNum * newSecondNum;
    if (newSign === "\u002b") {
      newThirdNum = newFirstNum + newSecondNum;
    } else if (newSign === "\u2212") {
      newThirdNum = newFirstNum - newSecondNum;
    } else if (newSign === "\u00f7") {
      newFirstNum = newThirdNum;
      newThirdNum = newFirstNum / newSecondNum;
    }
    let newPosition = Math.floor(Math.random() * 3) + 1;
    //check position on multiply by 0
    if (newPosition === 1 && newSecondNum === 0) {
      while (newPosition === 1) {
        newPosition = Math.floor(Math.random() * 3) + 1;
      }
    } else if (newPosition === 2 && newFirstNum === 0) {
      while (newPosition === 2) {
        newPosition = Math.floor(Math.random() * 3) + 1;
      }
    }
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

  setInputText = (text) => {
    this.setState({ numInput: text });
  };

  onSubmitEditing = (text) => {
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
        if (newPossibleSigns.length && sign === this.state.sign) {
          this.createNewProblem();
        }
      }
    } else {
      newPossibleSigns.push(sign);
    }
    if (newPossibleSigns.length) {
      this.setState({
        [symbol]: !this.state[symbol],
        possibleSigns: newPossibleSigns,
      });
    }
  };

  resetDataTable = () => {
    this.setState({
      dataTable: [
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", "", ""],
      ],
    });
  };

  render() {
    return (
      <SafeAreaProvider>
        <ScrollView
          style={moreStyles("", this.state.width, this.state.height).container}
        >
          <View style={styles.headerContainer}>
            <View style={styles.playLinkImg}>
              <Image
                resizeMode="contain"
                source={"logo.jpg"}
                style={styles.resizeMode}
              />
            </View>
            <Text style={styles.header}>Integer Operations Practice</Text>
            <View style={styles.playLinkImg}>
              <a href="https://play.google.com/store/apps/details?id=com.integertiles&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                <Image
                  resizeMode="contain"
                  source={
                    "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  }
                  style={styles.resizeMode}
                />
              </a>
            </View>
          </View>
          <Text style={styles.score}>
            Select operations to include in the questions.
          </Text>
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
          <Text style={styles.score}>
            Complete the equation by filling in the box provided.
          </Text>
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
            setInputText={this.setInputText}
          />
          {this.state.nextVisible ? (
            <View style={styles.submitBtn}>
              <Button
                title="NEXT"
                color="#39603d"
                onPress={() => {
                  this.createNewProblem();
                  this.setState({
                    nextVisible: false,
                  });
                }}
              />
            </View>
          ) : (
            <View style={styles.submitBtn}>
              <Button
                title="SUBMIT"
                color="#39603d"
                onPress={() => {
                  this.onSubmitEditing(this.state.numInput);
                }}
              />
            </View>
          )}
          <View style={styles.scoreRow}>
            <Text style={styles.score}>Score: {this.state.score}</Text>
            <View style={styles.btnsRow}>
              <View style={styles.scoreBtn}>
                <Button
                  title="Reset Score"
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
              <View style={styles.scoreBtn}>
                <Button
                  title="Reset Tiles"
                  color="#a3bcb6"
                  onPress={() => {
                    this.resetDataTable();
                  }}
                />
              </View>
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
                    <View
                      style={
                        moreStyles(
                          cell,
                          this.state.windowWidth,
                          this.state.windowHeight
                        ).head
                      }
                    >
                      <Text
                        style={
                          moreStyles(
                            cell,
                            this.state.windowWidth,
                            this.state.windowHeight
                          ).text
                        }
                      >
                        {cell}
                      </Text>
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
