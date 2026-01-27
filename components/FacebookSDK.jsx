"use client";
import Script from 'next/script';

export default function FacebookSDK() {
    return (
        <Script
            id="facebook-jssdk"
            src="https://connect.facebook.net/en_US/sdk.js"
            strategy="lazyOnload"
            onLoad={() => {
                window.fbAsyncInit = function () {
                    window.FB.init({
                        appId: '1234567890', // Replace with valid App ID in production
                        cookie: true,
                        xfbml: true,
                        version: 'v18.0'
                    });
                };
            }}
        />
    );
}
