import StyleConfig from "./StyleConfig"

const ThemeConfig = {
    
    darkTheme: { 
        welcomeColor: StyleConfig.neutralDark,
        recipeCollectionLabelColor: StyleConfig.primaryColor,
        primaryColor: StyleConfig.primaryColor,
        otherTabColor: StyleConfig.greyColor,        
        activeTabTextColor: StyleConfig.whiteColor,
        inactiveTabTextColor: StyleConfig.whiteColor
    },
    lightTheme: {
        welcomeColor: StyleConfig.neutralDark,
        recipeCollectionLabelColor: StyleConfig.primaryColor,
        primaryColor: StyleConfig.primaryColor,
        otherTabColor: StyleConfig.greyColor,
        activeTabTextColor: StyleConfig.whiteColor,
        inactiveTabTextColor: StyleConfig.greyColor
    }
}

export default ThemeConfig