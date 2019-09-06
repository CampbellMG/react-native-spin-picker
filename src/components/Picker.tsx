import React from 'react';
import {FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, Platform, View} from 'react-native';
import {PickerItem, PickerProps, PickerState} from "../types/Picker";
import {NOOP} from '../util/Functions';

export class Picker<T> extends React.Component<PickerProps<T>, PickerState> {
    private listRef: any;

    private isDragScrolling: boolean;
    private isMomentumScrolling: boolean;
    private isForceScrolling: boolean;

    private timer: number;

    private showLength = 3;
    private readonly dataLength = 0;
    private scrollThreshold = 5;
    private data: PickerItem[] = [];

    constructor(props: PickerProps<T>) {
        super(props);

        this.dataLength = props.data.length;
        this.mapData();
        this.state = {
            height: 0
        };
    }

    componentDidUpdate(prevProps: Readonly<PickerProps<T>>, prevState: Readonly<PickerState>, snapshot?: any): void {
        this.mapData();
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
        const {height} = this.state;
        return (
            <View style={{height: height * this.showLength}}>
                <FlatList data={this.data}
                          renderItem={this.getRenderItem}
                          ref={ref => this.listRef = ref}
                          showsVerticalScrollIndicator={false}
                          onScrollToIndexFailed={NOOP}
                          onScroll={this.onScroll}
                          initialScrollIndex={this.dataLength - 1}
                          getItemLayout={(data, index) => ({length: height, offset: height * index, index})}
                          keyExtractor={(item) => item.index}
                          onMomentumScrollBegin={this.onMomentumScrollBegin}
                          onMomentumScrollEnd={this.onMomentumScrollEnd}
                          onScrollBeginDrag={this.onScrollBeginDrag}
                          onScrollEndDrag={this.onScrollEndDrag}
                          style={{flexGrow: 0}}/>
            </View>
        );
    }

    private getRenderItem = (info: ListRenderItemInfo<T>) => (
        <View onLayout={event => {
            const {height} = event.nativeEvent.layout;

            if (this.state.height != height) {
                if (this.state.height != 0) {
                    throw Error("Dynamic heights are not supported, please ensure all items render at the same height");
                }
                this.setState({height: height});
            }
        }}>
            {this.props.renderItem(info.item, info.index)}
        </View>
    );

    private onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {y} = event.nativeEvent.contentOffset;

        if (y < this.scrollThreshold) {
            this.listRef.scrollToOffset({offset: this.dataLength * this.state.height + y});
        } else if (y > ((this.dataLength * 2 - this.showLength) * this.state.height) - this.scrollThreshold) {
            this.listRef.scrollToOffset({offset: (this.dataLength - this.showLength) * this.state.height});
        }
    };

    private scrollToNearestElement = (verticalOffset) => {
        let {height} = this.state;
        let selectedIndex = Math.round(verticalOffset / height);
        let newOffset = selectedIndex * height;

        if (Platform.OS === 'ios') {
            this.isForceScrolling = true;
        }

        this.listRef.scrollToOffset({offset: newOffset});
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



