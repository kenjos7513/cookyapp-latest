export interface ThemeFactoryInteface {
    welcomeColor: () => string,
    recipeCollectionLabelColor: () => string,
    primaryColor: () => string,
    otherTabColor: () => string,
    activeTabTextColor: () => string,
    inactiveTabTextColor: () => string
}