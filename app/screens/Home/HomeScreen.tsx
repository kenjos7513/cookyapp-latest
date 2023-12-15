import { useAppSelector } from "@/hooks/defaultHooks"
import { selectCurrentTheme } from "@/slices/themeSlice"
import { Text, View } from "react-native"

function HomeScreen(): React.JSX.Element {

    const currentTheme = useAppSelector(selectCurrentTheme)
    return (
    <View style={{flex: 1}}>
        <Text>asdfsdf</Text>
    </View>)
}

export default HomeScreen