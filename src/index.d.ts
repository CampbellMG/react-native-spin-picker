declare module 'react-native-spin-picker' {
    import {SpinPickerProps} from './types/SpinPicker';
    import {Component} from 'react';

    export {SpinPickerProps} from './types/SpinPicker';
    export class SpinPicker extends Component<SpinPickerProps, {}>{}
}