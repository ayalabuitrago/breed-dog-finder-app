declare module "*.svg" {
    import { SvgProps } from "react-native-svg";
    const content: FunctionComponent<SvgProps>;
    export default content;
}