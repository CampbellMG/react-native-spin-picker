import React from 'react';
import {
    FlatList,
    LayoutChangeEvent,
    ListRenderItem,
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    TouchableOpacity,
    View
} from 'react-native';
import {NOOP} from '../util/Functions';
import {Mask} from './Mask';
import {ArrowButton} from './ArrowButton';
import {FloatingInput} from './FloatingInput';
import {PickerItem, PickerProps, PickerState} from '../types';

export class Picker<T> extends React.Component<PickerProps<T>, PickerState> {
    private listRef: any;

    private isDragScrolling: boolean = false;
    private isMomentumScrolling: boolean = false;
    private isForceScrolling: boolean = false;

    private autoScrollTimer: number = 0;
    private manualScrollTimer: number = 0;

    private readonly dataLength: number;
    private data: PickerItem<T>[] = [];

    private showLength = 3;
    private scrollThreshold = 5;
    private scrollInterval = 50;

    constructor(props: PickerProps<T>) {
        super(props);

        this.dataLength = props.data.length;
        this.mapData();

        this.state = {
            height: 0,
            selectedIndex: this.findElementIndex(props.value),
            isTyping: false,
            inputValue: ''
        };
    }

    componentDidUpdate(prevProps: Readonly<PickerProps<T>>): void {
        this.mapData();
        const {value, keyExtractor} = this.props;
        if (keyExtractor(value) !== keyExtractor(prevProps.value)) {
            this.scrollToIndex(this.findElementIndex(value));
        }
    }

    private findElementIndex(element: T): number {
        const {keyExtractor} = this.props;
        for (let i = 0; i < this.data.length; i++) {
            if (keyExtractor(this.data[i].item) === keyExtractor(element)) {
                if (i == 0) {
                    return this.dataLength - 1;
                }
                return i - 1;
            }
        }

        return -1;
    }

    private mapData() {
        this.data = this.props.data.map(item => ({
            index: '1-' + this.props.keyExtractor(item),
            item: item
        }));

        this.data.push(...this.props.data.map(item => ({
            index: '2-' + this.props.keyExtractor(item),
            item: item
        })));
    }

    render() {
        const {height, showArrows, selectedIndex, isTyping, textInputProps, textInputStyle} = {...this.state, ...this.props};
        const list = (
            <View style={{height: height * this.showLength}}>

                <FlatList data={this.data}
                          renderItem={this.getRenderItem}
                          ref={ref => this.listRef = ref}
                          showsVerticalScrollIndicator={false}
                          onScrollToIndexFailed={NOOP}
                          onScroll={this.onScroll}
                          initialScrollIndex={selectedIndex}
                          getItemLayout={(data, index) => ({length: height, offset: height * index, index})}
                          keyExtractor={(item) => item.index}
                          onMomentumScrollBegin={this.onMomentumScrollBegin}
                          onMomentumScrollEnd={this.onMomentumScrollEnd}
                          onScrollBeginDrag={this.onDragScrollBegin}
                          onScrollEndDrag={this.onDragScrollEnd}
                          style={{flexGrow: 0}}/>

                <FloatingInput height={height}
                               visible={isTyping}
                               style={textInputStyle}
                               onSubmitEditing={() => this.setState({isTyping: false})}
                               value={this.state.inputValue}
                               onChangeText={this.onInputValueChanged}
                               {...textInputProps}/>

                <Mask height={height} isTop/>
                <Mask height={height}/>

            </View>
        );

        if (showArrows) {
            return (
                <View>
                    <ArrowButton height={height}
                                 onPress={this.onDecrementIndex}
                                 onLongPress={this.onStartDecrementScroll}
                                 onLift={this.onEndScroll}
                                 {...this.props}/>
                    {list}
                    <ArrowButton isPointingDown
                                 height={height}
                                 onPress={this.onIncrementIndex}
                                 onLongPress={this.onStartIncrementScroll}
                                 onLift={this.onEndScroll}
                                 {...this.props}/>
                </View>
            );
        }

        return list;
    }

    private onListItemLayout = (event: LayoutChangeEvent) => {
        const {height} = event.nativeEvent.layout;

        if (this.state.height != height) {
            if (this.state.height != 0) {
                console.warn("Dynamic heights are not supported, if you are experiencing issues set a fixed height in renderItem");
            }
            this.setState({height: height});
        }
    };

    private getRenderItem: ListRenderItem<PickerItem<T>> = info => {
        return (
            <TouchableOpacity onLayout={this.onListItemLayout}
                              onPress={() => this.onListItemClick(info)}>
                {this.props.renderItem(info.item.item, info.index)}
            </TouchableOpacity>
        );
    };

    private onInputValueChanged = (value: string) => {
        const {onInputValueChanged} = this.props;
        if (onInputValueChanged) {
            const inputValue = onInputValueChanged(value, this.state.inputValue);
            this.setState({inputValue});
        }
    };

    private onListItemClick(info: ListRenderItemInfo<PickerItem<T>>) {
        if (this.props.onInputValueChanged && info.index === this.state.selectedIndex + 1) {
            this.setState({isTyping: true});
        }
    }

    private onStartIncrementScroll = () => this.manualScrollTimer = setInterval(this.onIncrementIndex, this.scrollInterval);
    private onStartDecrementScroll = () => this.manualScrollTimer = setInterval(this.onDecrementIndex, this.scrollInterval);

    private onEndScroll = () => clearInterval(this.manualScrollTimer);

    private onIncrementIndex = () => this.scrollToIndex(this.state.selectedIndex + 1);
    private onDecrementIndex = () => this.scrollToIndex(this.state.selectedIndex - 1);

    private onIndexChanged(selectedIndex: number) {
        this.setState({selectedIndex});
        this.props.onValueChange(this.data[selectedIndex + 1].item);
    }

    private scrollToIndex(selectedIndex: number) {
        if (selectedIndex < 0) return;

        let {height, isTyping} = this.state;

        // Scroll to equivalent on duplicated list without animation before continuing
        if (selectedIndex < 1) {
            const offset = (this.dataLength + 1) * height;
            this.listRef.scrollToOffset({offset, animated: false});
            selectedIndex = this.dataLength;
        } else if (selectedIndex === this.dataLength * 2 - (this.showLength - 1)) {
            const offset = (this.dataLength - this.showLength) * height;
            this.listRef.scrollToOffset({offset, animated: false});
            selectedIndex = this.dataLength - this.showLength + 1;
        }

        const offset = selectedIndex * height;

        this.onIndexChanged(selectedIndex);
        this.listRef.scrollToOffset({offset, animated: !isTyping});
    }

    private onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {y} = event.nativeEvent.contentOffset;

        if (y < this.scrollThreshold) {
            this.listRef.scrollToOffset({offset: this.dataLength * this.state.height + y});
        } else if (y > ((this.dataLength * 2 - this.showLength) * this.state.height) - this.scrollThreshold) {
            this.listRef.scrollToOffset({offset: (this.dataLength - this.showLength) * this.state.height});
        }
    };

    private scrollToNearestElement = (verticalOffset: number) => {
        let {height} = this.state;
        let selectedIndex = Math.round(verticalOffset / height);
        let newOffset = selectedIndex * height;

        if (Platform.OS === 'ios') {
            this.isForceScrolling = true;
        }

        this.onIndexChanged(selectedIndex);
        this.listRef.scrollToOffset({offset: newOffset});
    };

    onDragScrollBegin = () => {
        this.isDragScrolling = true;
        if (Platform.OS === 'ios') {
            this.isForceScrolling = false;
        }
        this.autoScrollTimer && clearTimeout(this.autoScrollTimer);
    };

    onDragScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        event.persist();
        this.isDragScrolling = false;
        this.autoScrollTimer && clearTimeout(this.autoScrollTimer);
        this.autoScrollTimer = setTimeout(
            () => {
                if (!this.isMomentumScrolling && !this.isDragScrolling) {
                    this.scrollToNearestElement(event.nativeEvent.contentOffset.y);
                }
            },
            10
        );
    };

    onMomentumScrollBegin = () => {
        this.isMomentumScrolling = true;
        this.autoScrollTimer && clearTimeout(this.autoScrollTimer);
    };

    onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.isMomentumScrolling = false;
        if (!this.isForceScrolling && !this.isMomentumScrolling && !this.isDragScrolling) {
            this.scrollToNearestElement(event.nativeEvent.contentOffset.y);
        }
    };
}