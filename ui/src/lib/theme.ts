import { DARK, LIGHT } from "@/constants/theme"

export const UpdateTheme = (theme = DARK) => {
    const root = window.document.documentElement
    root.classList.remove(LIGHT, DARK)
    root.classList.add(theme)
}
