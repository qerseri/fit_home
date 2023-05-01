import { StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';

export default CustomInput = ({value, setValue, placeholder, secureTextEntry, keyboardtype = 'default'}) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles.input}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardtype}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {
        padding: 10,
    },
});
