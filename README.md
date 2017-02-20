# ReactNativeDemo
Android原生嵌入ReactNative模块Demo

![image](https://github.com/ysq1051838264/ReactNativeDemo/blob/master/1.jpg)

###安装过程
1.npm install

2.npm start

3.react-native run-android

如果报错
Application QNReport has not been registered. This is either due to a require() error during initialization or failure to call AppRegistry.registerComponent.
这是因为没有加载，选择 Reload Js就可以了

如果是这个错误的话
Unable to download JS bundle java.net.ConnectException: failed to connect to localhost/127.0.0.1 (port 8081) after 5000ms: isConnected failed: ECONNREFUSED (Connection refused)
是没有配置ip地址。如果Android 5.0以上的手机运行这个命令即可adb reverse tcp:8081 tcp:8081，否则请配置ip地址


**[DownLoad Apk](https://github.com/ysq1051838264/ReactNativeDemo/blob/master/apk/app-debug.apk?raw=true)**
