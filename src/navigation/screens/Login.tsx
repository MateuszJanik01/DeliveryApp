import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function Login() {
  return (
      <View style={styles.container}>
        <Text style={styles.h1}>DELIVERY APP</Text>
        <Text>Please enter your credentials to log in.</Text>
      <Button screen="HomeTabs">Log in</Button>
      {/* <Button screen="HomeTabs">Log in</Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    h1: {
        fontSize: 24,
    }
});