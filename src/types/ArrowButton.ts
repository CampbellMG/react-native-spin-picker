import {ViewStyle} from 'react-native';

export interface ExternalArrowButtonProps {
    arrowStyle?: ViewStyle
}

export interface ArrowButtonProps extends ExternalArrowButtonProps {
    height: number
    onPress?: () => void
    onLongPress?: () => void
    onLift?: () => void
    isPointingDown?: boolean
}