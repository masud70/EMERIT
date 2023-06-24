import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { gsap, Power2, AutoKillTweens } from 'gsap-rn';
import { Dimensions } from 'react-native';
const windowDimensions = Dimensions.get('window');

export default class Loading extends Component {
    boxes = [];

    onPress() {
        AutoKillTweens.tweensOf(this.tl);
        this.tl = gsap.timeline({ repeat: -1 });
        this.tl.to(this.boxes, {
            duration: 1,
            transform: { y: -40, scale: 0.8 },
            ease: Power2.easeInOut,
            stagger: { amount: 0.5 }
        });
        this.tl.to(this.boxes, {
            duration: 1,
            transform: { y: 0, scale: 1 },
            ease: Power2.all,
            stagger: { amount: 0.5 }
        });
    }

    componentDidMount() {
        this.onPress();
    }

    render() {
        if (this.props.loading)
            return (
                <View
                    style={{ minHeight: parseInt(windowDimensions.height), zIndex: 1000 }}
                    className="flex-1 h-screen w-screen bg-[#2B34675A] justify-center items-center absolute">
                    <AutoKillTweens tweens={this} />
                    <View className="bg-[#FFFFFFAA] rounded p-[80px]">
                        <View className="flex flex-row">
                            <View
                                ref={ref => this.boxes.push(ref)}
                                className="w-10 h-10 bg-[#2B3467] rounded-full mx-1"
                            />
                            <View
                                ref={ref => this.boxes.push(ref)}
                                className="w-10 h-10 bg-[#2B3467] rounded-full mx-1"
                            />
                            <View
                                ref={ref => this.boxes.push(ref)}
                                className="w-10 h-10 bg-[#2B3467] rounded-full mx-1"
                            />
                        </View>
                        <Text className="font-bold text-xl text-center text-[#2B3467]">
                            Please Wait...
                        </Text>
                    </View>
                </View>
            );
    }
}
