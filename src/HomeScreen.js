import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text, Image, View, ImageBackground } from 'react-native';
import Sound from 'react-native-sound';
import MainBg from '../assets/img/main.jpg';
import Plus from '../assets/img/plus.png';
import Minus from '../assets/img/minus.png';

Sound.setCategory('Playback');

let audioWelcome = new Sound('welcome.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

class Home extends Component {
  componentDidMount() {
    audioWelcome.play()
  }
  render() {
    let title1 = 'Addition';
    let title2 = 'Subtraction';
    return (
      <View style={styles.container}>
        <ImageBackground source={ MainBg } style={styles.background}>
          <TouchableHighlight 
            style={ {...styles.button, ...{ backgroundColor: "#6eb547"}} }
            onPress={ () => this.props.navigation.navigate('Practice', { op: '+'}) } 
            underlayColor='#f7bcc7'>
            <Text style={ styles.title }>{ title1 }</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={ {...styles.button, ...{ backgroundColor: "#ff4f4f"}} }
            onPress={ () => this.props.navigation.navigate('Practice',  { op: '-'}) } 
            underlayColor='#f7bcc7'>
            <Text style={ styles.title }>{ title2 }</Text>
          </TouchableHighlight>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  button: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#ccc',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Home;