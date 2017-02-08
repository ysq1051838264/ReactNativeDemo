/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import Util from './app/utils';
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
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            pathText: ''
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    loadData() {
        NativeModules.RNTest.measureLayout(100, 100).then(e => {
            console.log('ysq打印出来的：' + e.weight + ':' + e.bmi + ':' + e.water + ':' + e.bodyfat);
            this.setState({
                weight: e.weight,
                bmi: e.bmi,
                water: e.water,
                bodyfat: e.bodyfat,
                bone: e.bone,
                protein: e.protein,
            })

            list.push(e.weight)
            list.push(e.bmi)
            list.push(e.water)
            list.push(e.bodyfat)
            list.push(e.bone)
            list.push(e.protein)

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
        this.loadData()
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./app/imgs/head.png')} style={styles.head}>

                    <View style={{marginRight: 20, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Image source={require('./app/imgs/qr_code.png')}
                               style={{
                                   width: 40, height: 40, resizeMode: 'stretch', right: 10,
                                   margin: 5, position: 'absolute'
                               }}>
                        </Image>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'} }
                               style={{width: 60, height: 60,resizeMode: 'stretch', position: 'absolute', left: 10, top: 20}}>
                        </Image>
                        <View style={styles.textCenter}>
                            <Text style={styles.instructions}>这是网络图片</Text>
                            <Text style={styles.instructions}>2016-11-30 08:52</Text>
                        </View>
                    </View>
                </Image>

                <Text style={styles.description}>
                    神体质,好身材,您值得拥有。GO GO GO!
                </Text>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <View style={{flexDirection: 'row', padding: 5}}>
                            <Image source={require('./app/imgs/unstandard.png')}
                                   style={{width: 250, height: 25, resizeMode: 'stretch'}}></Image>
                            <Text style={{
                                textAlign: 'center',
                                marginLeft: 5,
                                textAlignVertical: 'center'
                            }}>{rowData}</Text>
                        </View>}
                    // renderRow={(rowData) =><Text>{rowData}</Text>}
                />

                <Image source={require('./app/imgs/bottom.png')} style={styles.bottom}>
                    <View style={{flexDirection: 'row', position: 'absolute'}}>
                        <Image source={require('./app/imgs/qr_code.png')}
                               style={{width: 50, height: 55, marginLeft: 40, top: 5}}>
                        </Image>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={styles.bottomText}> 云康宝智能设备</Text>
                            <Text style={styles.bottomBuyText}> 扫描二维码进行购买备</Text>
                        </View>
                    </View>
                </Image>

                {/*  // <Text style={styles.welcome}>
                 //     自定义弹出Toast消息
                 // </Text>*/}
                {/*<CustomButton*/}
                {/*text="点击自定义Toast方法"*/}
                {/*onPress={() => NativeModules.ToastCustomAndroid.show("我是ToastCustomAndroid弹出消息", NativeModules.ToastCustomAndroid.SHORT)}*/}
                {/*/>*/}

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
    },

    textCenter: {
        flexDirection: 'column',
        alignItems: 'center',
        height: 60,
        position: 'absolute',
        top:25,
        left: 85,
    },

    instructions: {
        textAlign: 'center',
        color: '#333333',
        fontWeight: 'bold',
    },

    description: {
        textAlign: 'center',
        color: 'blue',
        top: 10,
        paddingBottom: 10,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },

    head: {
        width: Util.size.width,
        height: 100,
    },

    unstandard: {
        width: 20,
        height: 20,
    },

    bottom: {
        width: Util.size.width,
        height: 60,
    },

    bottomText: {
        top: 2,
        textAlign: 'center',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        marginLeft: 20,
    },

    bottomBuyText: {
        textAlign: 'center',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
        marginLeft: 20,
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
