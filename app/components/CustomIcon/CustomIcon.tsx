import { Image, View } from "react-native"
import { CustomIconPropsType } from "./types/CustomIconPropsType"

import { SvgUri } from 'react-native-svg'

function CustomIcon({ name, width, height }: CustomIconPropsType): React.JSX.Element {


    width = (typeof width == 'undefined') ? 20 : width
    height = (typeof height == 'undefined') ? 20 : height


    return (
        <View>
            {
                name == "cooky" &&
                <Image source={require("@/assets/images/cooky.png")} />
            }
            {
                name == "cooky-dashboard" &&
                <Image source={require("@/assets/images/cooky-dashboard.png")} />
            }
            {
                name == "pencil" &&
                <Image width={width} height={height} source={require("@/assets/images/pen.png")} />
            }
        </View>
    )

}
export default CustomIcon

