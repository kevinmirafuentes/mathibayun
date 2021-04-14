import React, { Component } from 'react';
import { TouchableHighlight, Text, View, StyleSheet, ImageBackground } from 'react-native';
import Dab from '../assets/img/dab.jpg';
import Bg from '../assets/img/bg.jpg';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

let audioCorrect = new Sound('correct.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
let audioWrong = new Sound('wrong.mp3');

class PracticeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      ...this.initQuestion(),
      selected: null,
      isCorrect: false,
      isEnded: false
    };
  }
  restart() {
    this.setState(this.initQuestion())
  }
  initQuestion() {
    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    let operator = '+';
    let correct;
    let answers = [];

    switch (operator) {
      case '+': 
        correct = a + b;
        break;
    }

    let randomAnswer = (except) => {
      let ans = Math.floor(Math.random() * 10) + 1;
      if (answers.includes(ans)) {
        return randomAnswer(except);
      }
      return ans;
    }

    answers.push(correct);
    answers.push(randomAnswer(correct));
    answers.push(randomAnswer(correct));

    answers = answers.sort(() => Math.random() - 0.5);

    return {
      a, b, operator, correct, answers,
      selected: null,
      isCorrect: false,
      isEnded: false
    };
  }
  renderQuestion() {
    return (
      <View style={ {...styles.inline, ...{ flex: 3, alignItems: 'center' } } }>
        <View style={ styles.questionBox }>
          <Text style={ styles.leadText }>{ this.state.a}</Text>
        </View>
        <View style={ styles.questionBox }>
          <Text style={ styles.leadText }>{ this.state.operator}</Text>
        </View>
        <View style={ styles.questionBox }>
          <Text style={ styles.leadText }>{ this.state.b}</Text>
        </View>
      </View>
    );
  }
  validateAnswer(a) {
    if (this.state.isEnded)
      return;

    this.setState({ 
      selected: a, 
      isCorrect: a == this.state.correct,
      isEnded: a == this.state.correct,
    });

    if (a == this.state.correct) {
      audioCorrect.play();
    } else {
      audioWrong.play();
    }
  }
  renderAnswers() {
    return (
      <View style={ {...styles.inline, ...{ flex: 1 }} }>
        { this.state.answers.map((a, i) => (
          <TouchableHighlight 
            style={ {...styles.answerBox, ...{backgroundColor: this.state.selected == a ? '#f7bcc7' : '#fff'  }} } 
            onPress={() => this.validateAnswer(a)} 
            underlayColor='#f7bcc7'
            key={ i }>
            <View>
              <Text style={ styles.answerBoxText }>{ a }</Text>
            </View>
          </TouchableHighlight>
        )) }
      </View>
    );
  }
  renderResults() {
    if (!this.state.selected) 
      return;

    let correct = (
      <View style={ {flex: 1} }>
        <View style={ {...styles.centered, ...{ alignItems: 'center' }} }>
          <Text style={ styles.textCorrect }>Correct!</Text>
        </View>
        <TouchableHighlight 
          style={ styles.buttonNext }
          onPress={ () => this.restart() } 
          underlayColor='#f70848'>
          <Text style={ { color: '#fff', fontSize: 20 } }>Restart</Text>
        </TouchableHighlight>
      </View>
    );

    let wrong = (
      <View style={ {...styles.centered, ...{ alignItems: 'center' }} }>
        <Text style={ styles.textWrong }>Wrong!</Text>
      </View>
    );
       
    return (
      <View style={ {...styles.results, ...{ flex: 2 }} }>
        { this.state.isCorrect ? correct : wrong }   
        
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={ this.state.isEnded ? Dab : Bg } style={styles.background}>
          { this.renderQuestion() }
          { this.renderAnswers() }
          { this.renderResults() }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  inline: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  centered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leadText: {
    fontSize: 100,
    fontWeight: 'bold',
  },
  questionBox: {
    padding: 20,
  },
  questionsRow: {

  },
  answerBox: {
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f78ea7'
  },
  answerBoxText: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  results: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  buttonNext: {
    backgroundColor: '#f43265',
    alignItems: 'center',
    padding: 10,
  },
  textCorrect: {
    fontSize: 50,
    color: '#5fb766',
    fontWeight: 'bold'
  },
  textWrong: {
    fontSize: 80,
    color: 'red',
    fontWeight: 'bold'
  }
});

export default PracticeScreen;