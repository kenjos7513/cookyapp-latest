import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { Text, View } from "react-native";

function SplashScreen(): React.JSX.Element {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CustomIcon name={"cooky"} />
    </View>)
}

export default SplashScreen