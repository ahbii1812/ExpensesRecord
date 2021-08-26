import Toast from "react-native-root-toast-updated";

export default class ShowToast {
    
    static showShortCenter(message) {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            textColor: "black"
        })
    }
}