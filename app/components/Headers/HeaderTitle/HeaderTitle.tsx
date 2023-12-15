import CustomIcon from "@/components/CustomIcon/CustomIcon";
import { Text, View } from "react-native";

function HeaderTitle(props: any): React.JSX.Element {
    return (
    <View style={{position: 'absolute'}}>
        <CustomIcon name="cooky-dashboard" />
    </View>)
}

export default HeaderTitle