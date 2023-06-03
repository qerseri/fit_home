import { StyleSheet, Text, View, SafeAreaView, TextInput} from 'react-native';

export default CustomInput = ({value, setValue, placeholder, secureTextEntry, type = 'PRIMARY', keyboardtype = 'default'}) => {
    return (
        <View style={styles[`container_${type}`]}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles[`input_${type}`]}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardtype}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container_PRIMARY: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input_PRIMARY: {
        fontSize: 16,
        padding: 10,
    },
    container_SECONDARY: {
        backgroundColor: 'white',
        padding: 5,

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 10,
        width: '70%'
    },
    input_SECONDARY: {
        fontSize: 18,
        borderBottomWidth: 2,
        borderColor: 'black',
        textAlign: 'center',
        marginVertical: '1%',
    },
});
