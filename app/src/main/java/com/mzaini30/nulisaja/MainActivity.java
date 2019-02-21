package com.mzaini30.nulisaja;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.content.Context;
import android.view.KeyEvent;
// import android.view.View;
import android.webkit.URLUtil;
// import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.ads.AdRequest;
import com.google.android.gms.ads.AdView;
import com.google.android.gms.ads.MobileAds;

public class MainActivity extends AppCompatActivity {
    private AdView mAdView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // AdMob banner ad test id: ca-app-pub-3940256099942544/6300978111
        // my banner ad id: ca-app-pub-2878374163061282/6615438108
        // change to your own ad id
        // Change in MainActivity.java and activity_main.xml
        MobileAds.initialize(this, "ca-app-pub-2238217504982060/4420139664");
        mAdView = (AdView)findViewById(R.id.adView);
        AdRequest adRequest = new AdRequest.Builder().build();
        mAdView.loadAd(adRequest);

        WebView webview = (WebView) findViewById(R.id.webview);
        // webview.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
        WebSettings webSettings = webview.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDatabaseEnabled(true);

        // settings.setJavaScriptEnabled(true);
        // settings.setDomStorageEnabled(true);
        // webSettings.setAllowUniversalAccessFromFileURLs(true);
        // webSettings.setAllowFileAccessFromFileURLs(true);
        // webSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        
        String databasePath = this.getApplicationContext().getDir("database", Context.MODE_PRIVATE).getPath();
        webSettings.setDatabasePath(databasePath);
        webSettings.setDomStorageEnabled(true);
        webSettings.setSupportMultipleWindows(true); // enable chrome client?
//        setContentView(webview);
        
        // webview.setWebChromeClient(new WebChromeClient());
        webview.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // TODO Auto-generated method stub

                if (url.contains("http://") || url.contains("https://")){
                    Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(i);
                } else {
                    view.loadUrl(url);
                }
                return true;

            }
        });

        // replace this with your own link/web app address
        if (savedInstanceState == null) {
            webview.loadUrl("file:///android_asset/index.html");
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        WebView webview = (WebView) findViewById(R.id.webview);

        if (event.getAction() == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_BACK:
                    if (webview.canGoBack()) {
                        webview.goBack();
                    } else {
                        finish();
                    }
                    return true;
            }

        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onSaveInstanceState(Bundle outState )
    {
        WebView webview = (WebView) findViewById(R.id.webview);

        super.onSaveInstanceState(outState);
        webview.saveState(outState);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState)
    {
        WebView webview = (WebView) findViewById(R.id.webview);

        super.onRestoreInstanceState(savedInstanceState);
        webview.restoreState(savedInstanceState);
    }


}
