import 'styled-components'; 
import themes from '../styles/themes';

declare module 'styled-components' {
    const theme = themes.Light;
    type ThemeType = typeof theme; 
    export interface DefaultTheme extends ThemeType {}
} 