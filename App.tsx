import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NotificationListen, requestUserPermission} from './src/utilities/pushnotification.utility';

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    };

    useEffect(() => {
        requestUserPermission();
        NotificationListen();
    }, []);

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
            <View style={styles.container}>
                <Text>Push notification</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default App;
