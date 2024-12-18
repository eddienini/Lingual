import React, { useState, useEffect } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,  } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import { Button } from 'react-native-paper';
import SelectList from 'react-native-dropdown-select-list'


const CameraScreen2 = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const [text, setText] = useState(null)
    const [translation, setTranslation] = useState("")

    const [selected, setSelected] = React.useState("");
  
  const data = [
    {key:'1',value:'Select Language'},
    {key:'2',value:'Chinese'},
    {key:'3',value:'Japanese'},
    {key:'4',value:'Spanish'},
    {key:'5',value:'French'},
    {key:'6',value:'Korean'},
  ];
    
    useEffect(() => {
        (async () => {
            if (image) {
            const result = await TextRecognition.recognize(image.assets[0].uri);
            console.log(result);
            setText(result);
            }
        })();
    }, [image]);

    const scanPhoto = async () => {
        console.log(image); 
        
    };

    return (
        //camera integration here
        <ImageBackground
            source={require('../../images/purpleBackground.jpeg')}
            style={styles.background}
        >
                <View style={{flexDirection: 'row', marginTop: 70, alignSelf: 'center'}}>
                    <TouchableOpacity style={styles.touchableOpacity} onPress={() => launchImageLibrary({}, setImage) }>
                        <Text style={styles.touchableOpacityLink}>Pick a Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableOpacity} onPress={() => launchCamera({}, setImage) }>
                        <Text style={styles.touchableOpacityLink}>Take a Photo</Text>
                    </TouchableOpacity>
                </View>
               
                <View style={styles.cardContainer}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginTop: 10,}}>{text ? text : ''}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                <View style={styles.submitButton}>
                <SelectList 
                    setSelected={setSelected} 
                    data={data}  
                    search={false}
                    boxStyles={{borderRadius:0}} 
                    defaultOption={{ key:'1', value:'Select Language' }}   //default selected option
                />
                </View>
                <Button onPress={() => setTranslation("你好")} style={styles.submitButton}><Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>Translate</Text></Button>
                </View>
                <View style={styles.cardContainer}>
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginTop: 10,}}>{translation}</Text>
                </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#87ceeb',
        marginTop: 40,
        marginLeft: 35,
        padding: 5,
        borderRadius: 3,
        alignSelf: 'center',
      },
    cardContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: 340,
        height: 200,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
        marginTop: 50,
        shadowOpacity: 0.4
      },
    background: {
        width: '100%',
        height: '100%'
    },
    logo: {
        width: 350,
        height: 350,
        alignSelf: 'center',
        marginTop: 40,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
        alignSelf: 'flex-end'
    },
    textInput: {
        backgroundColor: 'white',
        width: 325,
        marginVertical: 10,
        padding: 20,
        borderRadius: 7,
        fontSize: 15,
        alignSelf: 'center',
    },
    text: {
        fontSize: 26,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        marginTop: -50,
        marginBottom: 40
    },
    button: {
        backgroundColor: 'white',
        width: 325,
        marginVertical: 50,
        padding: 5,
        borderRadius: 7,
        fontSize: 15,
        alignSelf: 'center',
    },
    touchableOpacity: {
        backgroundColor: 'white',
        marginRight: 30,
        marginLeft: 30,
        width: 125,
        padding: 10,
        borderRadius: 7,
    },
    touchableOpacityLink: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default CameraScreen2;