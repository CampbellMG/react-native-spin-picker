import React from 'react';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, Text, View} from 'react-native';
import {NumberPickerItem, NumberPickerProps, NumberPickerState} from "../types/NumberPicker";
import {NOOP} from '../util/Functions';

export class NumberPicker extends React.Component<NumberPickerProps, NumberPickerState> {
    private ref: any;
    private numbersGenerated: number = 0;
    private isDragScrolling: boolean;
    private isMomentumScrolling: boolean;
    private timer: number;
    private isForceScrolling: boolean;
    private showLength = 3;
    private readonly dataLength = 0;
    private scrollThreshold = 5;

    private get numbers(): NumberPickerItem[] {
        this.numbersGenerated++;
        return [...Array(10).keys()]
            .map(number => ({
                index: this.numbersGenerated.toString() + number.toString(),
                value: number
            }));
    }

    constructor(props) {
        super(props);

        this.dataLength = this.numbers.length;

        this.state = {
            height: 0
        };
    }

    componentDidMount(): void {
    }

    render() {
        const {height} = this.state;
        return (
            <View style={{height: height * this.showLength}}>
                <FlatList data={[...this.numbers, ...this.numbers]}
                          renderItem={this.getRenderItem}
                          ref={ref => this.ref = ref}
                          showsVerticalScrollIndicator={false}
                          onScrollToIndexFailed={NOOP}
                          onScroll={this.onScroll}
                          initialScrollIndex={this.dataLength - 1}
                          getItemLayout={(data, index) => ({length: height, offset: height * index, index})}
                          keyExtractor={data => data.index}
                          onMomentumScrollBegin={this.onMomentumScrollBegin}
                          onMomentumScrollEnd={this.onMomentumScrollEnd}
                          onScrollBeginDrag={this.onScrollBeginDrag}
                          onScrollEndDrag={this.onScrollEndDrag}
                          style={{flexGrow: 0}}/>

            </View>
        );
    }

    private getRenderItem = ({item}) => (
        <View onLayout={event => {
            const {height} = event.nativeEvent.layout;
            if (this.state.height != height) {
                this.setState({height: height});

            }
        }}>
            <Text style={{marginHorizontal: 64, fontSize: 32}}>{item.value}</Text>
        </View>
    );

    private onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {y} = event.nativeEvent.contentOffset;

        if (y < this.scrollThreshold) {
            this.ref.scrollToOffset({offset: this.dataLength * this.state.height + y});
        } else if (y > ((this.dataLength * 2 - this.showLength) * this.state.height) - this.scrollThreshold) {
            this.ref.scrollToOffset({offset: (this.dataLength - this.showLength) * this.state.height});
        }
    };

    private scrollToNearestElement = (verticalOffset) => {
        let {height} = this.state;
        let selectedIndex = Math.round(verticalOffset / height);
        let newOffset = selectedIndex * height;

        if (Platform.OS === 'ios') {
            this.isForceScrolling = true;
        }

        this.ref.scrollToOffset({offset: newOffset});
    };

    onScrollBeginDrag = () => {
        this.isDragScrolling = true;
        if (Platform.OS === 'ios') {
            this.isForceScrolling = false;
        }
        this.timer && clearTimeout(this.timer);
    };

    onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.isDragScrolling = false;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(
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
        this.timer && clearTimeout(this.timer);
    };

    onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.isMomentumScrolling = false;
        if (!this.isForceScrolling && !this.isMomentumScrolling && !this.isDragScrolling) {
            this.scrollToNearestElement(event.nativeEvent.contentOffset.y);
        }
    };
}



