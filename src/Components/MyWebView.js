import React from 'react';
import {WebView} from 'react-native-webview';

export default function MyWebView({html}) {
  console.log(html);
  return (
    <WebView
      id="webview"
      originWhitelist={['*']}
      useWebView2={true}
      source={{html: html}}
    />
  );
}
