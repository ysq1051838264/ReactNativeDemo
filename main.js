/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';

import {
    AppRegistry,
} from 'react-native';

import ReportActivity from './app/report/report'

export default class Main {
    register() {
        AppRegistry.registerComponent('QNReport', () => ReportActivity);
    }
}

