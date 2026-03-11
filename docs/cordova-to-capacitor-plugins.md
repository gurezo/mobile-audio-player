## Cordova → Capacitor Plugin Mapping

Existing Ionic v3 demo (`demo/`) uses a small set of core Cordova plugins.  
This document records how they are handled in the new Angular 17 + Capacitor demo.

### Legacy Cordova plugins

- `cordova-plugin-console`
- `cordova-plugin-device`
- `cordova-plugin-splashscreen`
- `cordova-plugin-statusbar`
- `cordova-plugin-whitelist`
- `ionic-plugin-keyboard`

### Capacitor equivalents / decisions

- **Console / Whitelist**
  - `cordova-plugin-console`, `cordova-plugin-whitelist`
  - **Capacitor decision**: 不要（Capacitor / WebView がデフォルトで対応しているため追加プラグインは不要）。

- **Device**
  - `cordova-plugin-device`
  - **Capacitor decision**: 必要になったら `@capacitor/device` を追加するが、現状の demo では未使用のため導入しない。

- **Status bar**
  - `cordova-plugin-statusbar`
  - **Capacitor equivalent**: `@capacitor/status-bar`
  - **Usage**: アプリ起動時にステータスバーのスタイルを設定（例: Light/Dark）。

- **Splash screen**
  - `cordova-plugin-splashscreen`
  - **Capacitor equivalent**: `@capacitor/splash-screen`
  - **Usage**: アプリ起動後に `SplashScreen.hide()` を呼び出してスプラッシュを閉じる。

- **Keyboard**
  - `ionic-plugin-keyboard`
  - **Capacitor equivalent**: `@capacitor/keyboard`
  - **Usage**: 入力時のスクロール挙動などを制御する（必要に応じて disable など）。

### Implemented in the new demo

In the Angular 17 + Capacitor demo (`ng-workspace/projects/ionic-audio-demo`):

- We will add the following Capacitor plugins as dependencies in `ng-workspace/package.json`:
  - `@capacitor/status-bar`
  - `@capacitor/splash-screen`
  - `@capacitor/keyboard`
- We will initialize them on app startup in `AppComponent` (guarded by `Capacitor.isNativePlatform()`), to roughly mirror the Ionic v3 demo behavior regarding:
  - Hiding the splash screen after boot.
  - Setting a consistent status bar style.
  - Disabling automatic scroll adjustments from the keyboard (optional; tweakable later).

Once the new demo fully replaces the old Cordova demo in workflows, the `demo/` directory and its Cordova plugins can be safely removed in a separate cleanup PR.

