import { StyleSheet } from "react-native"

export default function Logo() {
    return (
        <>
            <View style={logoStyle.a}></View>
            <View style={logoStyle.b}></View>
            <View style={logoStyle.c}></View>
            <View style={logoStyle.d}></View>
        </>
    )
}

const logoStyle = StyleSheet.create({
    base: {
        backgroundColor: '#dd1111',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopThickness: 1,
        borderTopColor: '#ffffff',
        borderLeftThickness: 1,
        borderLeftColor: '#ffffff',
        borderBottomThickness: 1,
        borderBottomColor: '#ffffff',
    },

    a: {
        top: 100,
        left: 100,
        height: 100,
        width: 60,
        borderTopThickness: 1,
        borderTopColor: '#000000',
        borderLeftThickness: 1,
        borderLeftColor: '#000000',
        borderBottomThickness: 1,
        borderBottomColor: '#000000',
        borderRightThickness: 1,
        borderRightColor: '#000000',
    },

   b: {
        top: 110,
        left: 110,
        height: 80,
        width: 50,
    },

    c: {
        top: 120,
        left: 120,
        height: 60,
        width: 40,
    },

    d: {
        top: 130,
        left: 130,
        height: 40,
        width: 30,
        backgroundColor: '#ffffff',
        borderTopThickness: 1,
        borderTopColor: '#000000',
        borderLeftThickness: 1,
        borderLeftColor: '#000000',
        borderBottomThickness: 1,
        borderBottomColor: '#000000',
        borderRightThickness: 1,
        borderRightColor: '#ffffff',
    }

})
    