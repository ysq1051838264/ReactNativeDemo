package com.example.ysq.testreactnative.module;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by ysq on 17/2/10.
 */

public class QNUIModule extends ReactContextBaseJavaModule {
    public QNUIModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "QNUI";
    }

    @ReactMethod
    public void onGetViewSize(int width, int height) {
        Log.e("hdr", "拿到视图的宽高: " + width + " " + height);
    }
}
