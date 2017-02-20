import React, {Component,} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    Image,
    View,
    TouchableHighlight,
    NativeModules,
    Platform,
} from 'react-native';

import Dimensions from 'Dimensions';

//布局固定宽度 320，好分享
const layoutWidth = 320;
const barHeight = 10;

export default class ReportActivity extends Component {

    constructor(props) {
        super(props);
        console.log("初始化属性", props);

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
            user: {},
            score: 0,
            description: "",
            bodyshape: "",
            measureDate: "",
            list: [],
        };

        this.prepareStyle(this.props.themeColor)
    }

    componentWillMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // console.log("视图高度",this.refs.container.style);

    }

    loadData() {

        NativeModules.QNReport.fetchReportDataWithDataId(this.props.dataId + "").then(e => {

            console.log('ysq打印出来的：list的值是', e);

            this.setState(e);

        }).catch(error => {
            console.log(error);
        });
    }

    //获取数据
    fetchData() {
        this.loadData()

    }

    onLayout(e) {
        const {width,height} =  e.nativeEvent.layout;

        if (height > 350) {
            NativeModules.QNUI.onGetViewSize(width, height)
        }
    }

    render() {
        var f = this.state.score.toFixed(1) * 10;
        const scoreString = f + "分";
        const bigScore = scoreString.substr(0, scoreString.length - 2);
        const smallScore = "." + scoreString.substr(scoreString.length - 2, scoreString.length);

        const avatarUrl = this.state.user.avatar;
        if (avatarUrl == "")
            var icon = this.state.user.gender == 1 ? require("../imgs/avatar_man@3x.png") : require("../imgs/avatar_woman@3x.png");

        console.log('ysq打印出来的：score 的值是', this.state.score);
        const bodyshape = this.state.bodyshape;
        var bodyshapeView;
        if (bodyshape == "") {
            bodyshapeView = null;
        } else {
            var bgImg, frImg;
            switch (bodyshape) {
                case "隐形肥胖型": {
                    bgImg = require("../imgs/bodyshape/invisible_fat_1.png");
                    frImg = require("../imgs/bodyshape/invisible_fat_2.png");
                    break;
                }
                case "偏胖型": {
                    bgImg = require("../imgs/bodyshape/pianpang_1.png");
                    frImg = require("../imgs/bodyshape/pianpang_2.png");
                    break;
                }
                case "肥胖型": {
                    bgImg = require("../imgs/bodyshape/fat_1.png");
                    frImg = require("../imgs/bodyshape/fat_2.png");
                    break;
                }
                case "偏瘦肌肉型": {
                    bgImg = require("../imgs/bodyshape/pianmuscle_1.png");
                    frImg = require("../imgs/bodyshape/pianmuscle_2.png");
                    break;
                }
                case "标准型": {
                    bgImg = require("../imgs/bodyshape/standard_1.png");
                    frImg = require("../imgs/bodyshape/standard_2.png");
                    break;
                }
                case "非常肌肉型": {
                    bgImg = require("../imgs/bodyshape/more_muscle_1.png");
                    frImg = require("../imgs/bodyshape/more_muscle_2.png");
                    break;
                }
                case "偏瘦型": {
                    bgImg = require("../imgs/bodyshape/pianshou_1.png");
                    frImg = require("../imgs/bodyshape/pianshou_2.png");
                    break;
                }
                case "标准肌肉型": {
                    bgImg = require("../imgs/bodyshape/standard_muscle_1.png");
                    frImg = require("../imgs/bodyshape/standard_muscle_2.png");
                    break;
                }
                case "运动不足型": {
                    bgImg = require("../imgs/bodyshape/lack_sport_1.png");
                    frImg = require("../imgs/bodyshape/lack_sport_2.png");
                    break;
                }

            }
            bodyshapeView = (<View style={styles.bodyshapeContainer}>
                <Image source={bgImg}>
                    <Image source={frImg}
                           style={styles.bodyshapeLogo}/>
                </Image>
                <View>
                    <Image source={require('../imgs/report_bodyshape_name_bg.png')}
                           style={styles.bodyshapeNameContainer}>
                    </Image>
                    <Text style={styles.bodyshapeName}>{this.state.bodyshape}</Text>
                </View>
            </View>)
        }
        return (
            <View style={styles.container}>
                <View onLayout={(e) => this.onLayout(e)}>
                    <View style={styles.rightTopQrImg}>
                        <Image source={require('../imgs/qr_code_app.png')}/>
                        <Text style={styles.rightTopQrImgText}>轻牛APP</Text>
                    </View>
                    <Image source={require('../imgs/report_head.png')} style={styles.head}>

                        <View style={styles.user}>
                            <Image source={(avatarUrl == "" ? icon : {uri: avatarUrl}) }
                                   style={styles.avatar}>
                            </Image>

                            <View style={styles.usernameTextContainer}>
                                <Text style={styles.username}>
                                    {this.state.user.username}
                                </Text>
                                <Text style={styles.measureDate}>
                                    {this.state.measureDate}
                                </Text>
                                {bodyshapeView}
                            </View>
                            {/*这里是分数*/}
                            <View style={styles.scoreContainerOuter}>
                                <View style={styles.scoreContainerInner}>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                        <Text style={[styles.score, styles.scoreBig]}>
                                            {bigScore}
                                        </Text>
                                        <Text style={[styles.score, styles.scoreSmall]}>
                                            {smallScore}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Image>

                    <Text style={styles.description}>
                        {this.state.description}
                    </Text>
                    <View style={{flexDirection: 'row', width: layoutWidth - 50, alignSelf: 'center'}}>
                        <View style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            width: layoutWidth,
                            alignItems: 'center'
                        }}>
                            <Image source={require('../imgs/report_stand_line_icon.png')}/>
                            <View style={{
                                width: 1,
                                height: this.state.list.length * (barHeight + 10),
                                borderColor: '#abca33',
                                borderWidth: 0.5,
                                borderStyle: 'dashed'
                            }}/>
                        </View>
                        {<View style={styles.contentList}>
                            {
                                this.state.list.map((item) => {
                                    return ReportActivity.renderRow(item)
                                })
                            }
                        </View>}
                    </View>

                    <Image source={require('../imgs/report_bottom_bg.png')} style={styles.bottom}>
                        <View style={styles.bottomContainer}>
                            <Image source={require('../imgs/qr_code_tmall.png')}
                                   style={{marginLeft: 20}}>
                            </Image>
                            <View style={styles.bottomTextContainer}>
                                <Text style={styles.bottomText}>云康宝智能设备</Text>
                                <Text style={styles.bottomBuyText}>购买链接，扫描二维码进行购买备</Text>
                            </View>
                        </View>
                    </Image>
                </View>
            </View>
        );
    }

    static renderRow(rowData) {

        const viewWidth = layoutWidth - 50;

        const renderData = rowData.isStand ? {
                length: viewWidth * 0.75,
                color: '#abca33'
            } : {
                length: viewWidth * 0.35,
                color: '#fdbf3d'
            };
        return (
            <View key={rowData.name}
                  style={styles.rowData}>
                <View style={[styles.indexBar, {width: renderData.length}]}>
                    <View style={[styles.indexBarDot, {backgroundColor: renderData.color}]}/>
                    <View style={styles.indexBarDotMask}/>
                </View>

                <Text style={{
                    marginLeft: 10,
                    fontSize: 11,
                    color: '#999',
                }}>{rowData.name}</Text>
            </View >
        )
    }

    prepareStyle(themeColor) {
        styles = StyleSheet.create({
            container: {
                backgroundColor: '#F5FCFF',
                alignSelf: 'center',
                width: layoutWidth,
            },
            rightTopQrImg: {
                position: 'absolute',
                right: 5,
                top: 10,
                alignSelf: 'flex-end',
                alignItems: "center"
            },
            rightTopQrImgText: {
                fontSize: 9,
                color: themeColor
            },
            head: {
                paddingTop: 0,
                width: layoutWidth,
            },
            user: {
                marginTop: 10,
                flexDirection: 'row',
                marginLeft: 20,
            },
            avatar: {
                width: 50,
                height: 50,
                borderRadius: 25,
            },
            usernameTextContainer: {
                justifyContent: 'space-between',
                marginLeft: 5,
            },
            username: {
                color: '#333',
                fontWeight: 'bold',
                marginTop: 3,
                backgroundColor: 'transparent'
            },
            measureDate: {
                textAlign: 'center',
                color: '#000',
                fontSize: 11,
                marginTop: 8,
                backgroundColor: 'transparent',

            },
            bodyshapeContainer: {
                flexDirection: 'row',
                marginTop: 3,
            },
            bodyshapeLogo: {
                tintColor: themeColor
            },
            bodyshapeNameContainer: {
                marginLeft: 3,
                tintColor: themeColor,
            },
            bodyshapeName: {
                fontSize: 11,
                padding: 0,
                width: 67,
                top: Platform.OS == 'ios' ? 4 : 2,
                left: 3,
                textAlign: 'center',
                color: 'white',
                backgroundColor: 'transparent',
                position: 'absolute',
                alignSelf: 'center',
            },
            scoreContainerOuter: {
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: themeColor,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 8,
                marginTop: 22,
            },
            scoreContainerInner: {
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: themeColor,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
            },
            score: {
                color: 'white',
                backgroundColor: "transparent",
                flexWrap: "nowrap",
            },
            scoreBig: {
                fontSize: 20,
            },
            scoreSmall: {
                fontSize: 15,
            },
            description: {
                color: themeColor,
                fontSize: 14,
                marginLeft: 25,
                paddingBottom: 10,
            },
            contentList: {
                marginTop: 20,
            },
            rowData: {
                height: barHeight + 10,
                flexDirection: 'row',
                alignItems: 'center',
            },
            indexBar: {
                height: barHeight,
                borderRadius: barHeight / 2,
                backgroundColor: '#eaeff4',
                flexDirection: 'row',
                justifyContent: 'flex-end'
            },
            indexBarDot: {
                height: barHeight,
                width: barHeight,
                borderRadius: barHeight / 2,
            },
            indexBarDotMask: {
                backgroundColor: '#eaeff4',
                width: barHeight / 2,
                height: barHeight,
                position: 'absolute',
                right: barHeight / 2,
                top: 0
            },
            bottom: {
                width: layoutWidth,
                height: 50,
                marginTop: 5,
            },
            bottomContainer: {
                flexDirection: 'row',
                backgroundColor: themeColor + "b2",
                width: layoutWidth,
                height: 50,
                alignItems: 'center',
            },
            bottomTextContainer: {
                height: 35,
                marginLeft: 15,
                justifyContent: 'space-between',
            },
            bottomText: {
                color: "white",
                fontSize: 16,
                backgroundColor: 'transparent',
            },
            bottomBuyText: {
                color: "white",
                fontSize: 9,
                backgroundColor: 'transparent',
            },
        });
    }
}


var styles;