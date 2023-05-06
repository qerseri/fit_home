import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default Main = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Text>Hello Tolya</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B0D3A1',
  },
});
