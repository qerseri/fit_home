import { StyleSheet, Text, View, Pressable, TouchableOpacity} from 'react-native';

export default CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles[`container_${type}`]}>
            <Text style={styles[`text_${type}`]}>{text}</Text>
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
    container_BLUE_PRIMARY: {
        width: '100%',
        marginTop: '2%',

        backgroundColor: '#008080',
        padding: 10,

        alignItems:'center',
        borderRadius: 5,
    },
    text_PRIMARY: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
    },
    text_SECONDARY: {
        fontWeight: 'bold',
        color: 'gray'
    },
    text_TERTIARY: {
        fontWeight: 'bold',
        color: '#006DB0'
    },
    text_BLUE_PRIMARY: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#F5FCFF',
    }
});