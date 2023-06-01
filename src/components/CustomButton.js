import { StyleSheet, Text, View, Pressable, TouchableOpacity} from 'react-native';

export default CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles[`container_${type}`]}>
            <Text style={styles[`text_${type}`]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    //PRIMARY
    container_PRIMARY: {
        width: '100%',
        marginTop: '2%',

        backgroundColor: '#58754B',
        padding: 15,

        alignItems:'center',
        borderRadius: 5,
    },
    text_PRIMARY: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
    },

    //SECONDARY
    container_SECONDARY: {
        marginVertical: 15,
        alignItems:'center',
    },
    text_SECONDARY: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'gray'
    },

    //TERTIARY
    container_TERTIARY: {
        alignItems:'center',
    },
    text_TERTIARY: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#006DB0'
    },

    //BLUE PRIMARY
    container_BLUE_PRIMARY: {
        width: '100%',
        marginTop: '2%',

        backgroundColor: '#008080',
        padding: 10,

        alignItems:'center',
        borderRadius: 5,
    },
    text_BLUE_PRIMARY: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#F5FCFF',
    },

    //CANCEL PRIMARY
    container_CANCEL_PRIMARY: {
        width: '100%',
        marginTop: '2%',

        backgroundColor: '#d1877c',
        padding: 10,

        alignItems:'center',
        borderRadius: 5,
    },
    text_CANCEL_PRIMARY: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#F5FCFF',
    }
});