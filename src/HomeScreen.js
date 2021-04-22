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
    return (
      <View style={styles.container}>
        <ImageBackground source={ MainBg } style={styles.background}>
          <TouchableHighlight 
            style={ styles.button }
            onPress={ () => this.props.navigation.navigate('Practice', { op: '+'}) } 
            underlayColor='#f7bcc7'>
            <Image source={ Plus } />
          </TouchableHighlight>
          <TouchableHighlight 
            style={ styles.button }
            onPress={ () => this.props.navigation.navigate('Practice',  { op: '-'}) } 
            underlayColor='#f7bcc7'>
            <Image source={ Minus } />
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
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Home;