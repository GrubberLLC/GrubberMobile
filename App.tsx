import { ActivityIndicator, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import { UserContext, UserContextProvider } from './src/Context/UserContext';
import BottomTabNavigation from './src/Navigation/BottomTabNavigation';
import { ListContextProvider } from './src/Context/ListContext';
import { useContext, useEffect, useState } from 'react';
import imageSrc from './src/Assets/restaurant4.jpg'
import AuthenticationStackNavigation from './src/Navigation/AuthenticationStackNavigation';

Amplify.configure(amplifyconfig);

const AuthenticatedApp = () => {
  const { user, grabUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    grabUser().finally(() => setIsLoading(false)); // Update loading state after checking user
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator style={{marginTop: 24}} size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user != null ? (
        <View style={styles.containerTab}>
          <StatusBar barStyle="light-content" translucent={false} backgroundColor={'black'} />
          <SafeAreaView style={styles.container}>
            <BottomTabNavigation />
          </SafeAreaView>
        </View>
      ) : (
        <View style={styles.container}>
          <Image style={styles.backgroundImage} source={imageSrc} />
          <View style={styles.backgroundOverlay} />
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
          <View style={styles.subContainer}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
              <AuthenticationStackNavigation />
            </SafeAreaView>
          </View>
        </View>
      )}
    </View>
  );
};

export default function App() {
  return (
    <UserContextProvider>
      <ListContextProvider>
        <AuthenticatedApp />
      </ListContextProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  containerTab: {
    flex: 1,
    backgroundColor: 'black'
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, 
    position: 'absolute'
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '120%',
    position: 'absolute'
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    zIndex: 0, 
    position: 'absolute'
  },
  subContainer: {
    zIndex: 1,
    flex: 1,
  },
  safecontainer: {
    flex: 1,
  },
  spash: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContiainer: {
    height: 100,
    width: 100
  },
  mainImage: {
    height: 100,
    width: 100
  }
});
