import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text, View, ImageBackground } from 'react-native';
import Sound from 'react-native-sound';
import MainBg from '../assets/img/main.jpg';

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
            style={ {...styles.button, ...{ backgroundColor: '#197419' }} }
            onPress={ () => this.props.navigation.navigate('Practice', { op: '+'}) } 
            underlayColor='#197419'>
            <Text style={ { color: '#fff', fontSize: 20 } }>Let's Practice ADDITION (+)</Text>
          </TouchableHighlight>
          <TouchableHighlight 
            style={ styles.button }
            onPress={ () => this.props.navigation.navigate('Practice',  { op: '-'}) } 
            underlayColor='#f70848'>
            <Text style={ { color: '#fff', fontSize: 20 } }>Let's Practice SUBTRACTION (-)</Text>
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
    backgroundColor: '#f43265',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    height: 100,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Home;