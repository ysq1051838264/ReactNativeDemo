package com.example.ysq.testreactnative.module;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;

/**
 * Created by ysq on 17/2/7.
 */

public class QNReportModule extends ReactContextBaseJavaModule {

    public QNReportModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "QNReport";
    }


    /**
     * 该方法用于给JavaScript进行调用
     */
    @ReactMethod
    public void fetchReportDataWithDataId(String dataId, Promise promise) {
        try {
            WritableMap map = Arguments.createMap();

            WritableArray list = Arguments.createArray();

            WritableMap item = Arguments.createMap();
            item.putString("name", "体重");
            item.putBoolean("isStand", true);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "去脂体重");
            item.putBoolean("isStand", true);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "脂肪率");
            item.putBoolean("isStand", false);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "体水分");
            item.putBoolean("isStand", true);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "皮下脂肪");
            item.putBoolean("isStand", true);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "内脏脂肪等级");
            item.putBoolean("isStand", false);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "蛋白质");
            item.putBoolean("isStand", true);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "骨量");
            item.putBoolean("isStand", true);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "肌肉量");
            item.putBoolean("isStand", false);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "基础代谢率");
            item.putBoolean("isStand", true);
            list.pushMap(item);

            item = Arguments.createMap();
            item.putString("name", "骨骼肌率");
            item.putBoolean("isStand", true);
            list.pushMap(item);


            item = Arguments.createMap();
            item.putString("name", "体年龄");
            item.putBoolean("isStand", true);
            list.pushMap(item);


            item = Arguments.createMap();
            item.putString("name", "腰臀围");
            item.putBoolean("isStand", false);
            list.pushMap(item);


            WritableMap user = Arguments.createMap();
            user.putString("username", "呵呵哒");
            user.putString("avatar", "http://www.myexception.cn/u/cms/www/201308/29222231whm1.jpg");

            map.putArray("list", list);
            map.putMap("user", user);
            map.putDouble("score", 98.2);
            map.putString("description", "神体质，好身材，您值得拥有,GO GO GO!");
            map.putString("bodyshape", "偏瘦型");
            map.putString("measureDate", "2014-12-22 16:21");

            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject(e);
        }
    }
}
