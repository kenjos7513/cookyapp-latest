import StyleConfig from "@/config/StyleConfig"
import ThemeConfig from "@/config/ThemeConfig"
import { ThemeFactoryInteface } from "@/interfaces/ThemeFactoryInterface"


export function ThemeFactory(currentTheme: string) {
    console.log('theme factory ' + currentTheme)
    return new ThemeClass(currentTheme)
}

export class ThemeClass implements ThemeFactoryInteface {

    private currentTheme: string = ""
    public constructor(getTheme: string) {
        this.currentTheme = getTheme
    }
    public activeTabTextColor(): string {
        return (this.currentTheme == "dark") ? ThemeConfig.darkTheme.activeTabTextColor : ThemeConfig.lightTheme.activeTabTextColor
    }

    public inactiveTabTextColor(): string {
        return (this.currentTheme == "dark") ? ThemeConfig.darkTheme.inactiveTabTextColor : ThemeConfig.lightTheme.inactiveTabTextColor
    }

    public primaryColor(): string {
        return (this.currentTheme == "dark") ? ThemeConfig.darkTheme.primaryColor : ThemeConfig.lightTheme.primaryColor
    }
    public welcomeColor(): string {
        return (this.currentTheme == "dark") ? ThemeConfig.darkTheme.welcomeColor : ThemeConfig.lightTheme.welcomeColor
    }

    public otherTabColor(): string {
        return (this.currentTheme == "dark") ? ThemeConfig.darkTheme.otherTabColor : ThemeConfig.lightTheme.otherTabColor
    }
    public recipeCollectionLabelColor(): string {
        return (this.currentTheme == "dark") ? ThemeConfig.darkTheme.recipeCollectionLabelColor : ThemeConfig.lightTheme.recipeCollectionLabelColor
    }
}