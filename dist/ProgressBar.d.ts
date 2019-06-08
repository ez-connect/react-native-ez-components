/// <reference types="react" />
import { ProgressBarAndroidProps, ProgressViewIOSProps } from 'react-native';
interface ProgressBarProps extends ProgressBarAndroidProps, ProgressViewIOSProps {
    visible?: boolean;
}
export declare const ProgressBar: (props: ProgressBarProps) => JSX.Element;
export {};
