package com.customer;

import android.app.Application;
import com.customer.generated.BasePackageList;

import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line
import com.oblador.vectoricons.VectorIconsPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.SingletonModule;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(new BasePackageList().getPackageList(), Arrays.<SingletonModule>asList());
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
  
  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGestureHandlerPackage(),
            new MapsPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNFirebasePackage(),
            new RNFirebaseAuthPackage(),
            new ReactNativeConfigPackage(),
            new VectorIconsPackage(),
            new ModuleRegistryAdapter(mModuleRegistryProvider)

      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

    @Override
    public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
    }

    @Override
    public void onCreate() {
      super.onCreate();
      AppEventsLogger.activateApp(this);
      SoLoader.init(this, /* native exopackage */ false);
  }
}
