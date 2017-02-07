/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    Image,
    View,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';

let list = [];

var {NativeModules} = require('react-native');
// var { RNTestModules } = require('react-native');

class CustomButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

class ReportActivity extends Component {

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            pathText: ''
            // dataSource:ds.cloneWithRows(['yang','shu','quan','yan','Yang'])
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    test2() {
        NativeModules.RNTest.measureLayout(100, 100).then(e => {
            console.log('ysq打印出来的：' + e.relativeX + ':' + e.relativeY + ':' + e.width + ':' + e.height);
            this.setState({
                relativeX: e.relativeX,
                relativeY: e.relativeY,
                width: e.width,
                height: e.height,
            })

            list.push(e.relativeX)
            list.push(e.relativeY)
            list.push(e.width)
            list.push(e.height)

            console.log('ysq打印出来的：list的值是' + list);

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(list)
            });

        }).catch(error => {
            console.log(error);
        });
    }

    //获取数据
    fetchData() {
        list = [];
        this.test2()

        if (list.length === 0) {
            NativeModules.ToastCustomAndroid.show("list集合没有值", NativeModules.ToastCustomAndroid.SHORT)
            console.log('ysq打印出来的：list没有值');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    我是 原生项目嵌入的 ReactNative
                </Text>

                <Image source={require('./app/imgs/avatar_baby.png')} style={styles.thumb}></Image>

                <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'} }
                       style={{width: 400, height: 60}}></Image>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <View style={{flexDirection: 'row'}}>
                        <Text style={styles.instructions}> if({rowData} === number) hh else ReactNative __ </Text>
                        <Text >{rowData}</Text>
                    </View>}

                    // renderRow={(rowData) => <Text>{rowData}</Text>}
                />

                <Text style={styles.welcome}>
                    自定义弹出Toast消息
                </Text>
                <CustomButton
                    text="点击自定义Toast方法"
                    onPress={() => NativeModules.ToastCustomAndroid.show("我是ToastCustomAndroid弹出消息", NativeModules.ToastCustomAndroid.SHORT)}
                />

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },

    thumb: {
        width: 50,
        height: 50,
    },

    button: {
        margin: 5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    },
});

AppRegistry.registerComponent('TestDemo', () => ReportActivity);
