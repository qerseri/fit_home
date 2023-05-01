import { StyleSheet, Text, View, Pressable, TouchableOpacity} from 'react-native';

export default CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles[`container_${type}`]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container_PRIMARY: {
        width: '100%',
        marginTop: '2%',

        backgroundColor: '#58754B',
        padding: 15,

        alignItems:'center',
        borderRadius: 5,
    },
    container_SECONDARY: {
        marginVertical: 15,
        alignItems:'center',
    },
    container_TERTIARY: {
        alignItems:'center',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_SECONDARY: {
        color: 'gray'
    },
    text_TERTIARY: {
        color: '#6295A0'
    }
});