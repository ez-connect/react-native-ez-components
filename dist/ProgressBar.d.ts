/// <reference types="react" />
import { ProgressViewProps } from '@react-native-community/progress-view';
import { ProgressBarAndroidProps } from '@react-native-community/progress-bar-android';
interface ProgressBarProps extends ProgressBarAndroidProps, ProgressViewProps {
    visible?: boolean;
}
export declare const ProgressBar: (props: ProgressBarProps) => JSX.Element;
export {};
