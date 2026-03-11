+# Migration Inventory: Existing Ionic v3 + Angular v5 Stack
+
+## Root Library (`ionic-audio3`)
+
+- **Package name**: `ionic-audio3`
+- **Version**: `3.2.3`
+- **Description**: An audio player for Ionic 3 and Angular 5
+- **Entry points**
+  - `"main": "./dist/index.js"`
+  - `"typings": "./dist/index.d.ts"`
+- **Scripts**
+  - `build`: `ngc` (Angular compiler) + `copyfiles` to copy SCSS into `dist`
+  - `release`: `build` then `npm publish`
+  - `test`: rebuild library and wire it into the legacy `demo/` Ionic app, then run `ionic serve`
+- **Angular / Ionic versions**
+  - `@angular/common`, `@angular/core`, etc.: `5.0.0`
+  - `ionic-angular`: `3.9.2`
+  - `rxjs`: `5.5.2`
+  - `zone.js`: `0.8.18`
+  - `typescript`: `2.4.2`
+- **Tooling**
+  - Build is based on Angular 5-era **`ngc`** + manual `copyfiles`
+  - No Angular CLI workspace; library is built directly from `src/` into `dist/`
+
+## Legacy Demo App (`demo/`)
+
+### package.json
+
+- **Framework**
+  - `type`: `ionic-angular` (Ionic v3)
+  - `ionic-angular`: `3.9.2`
+  - `@angular/*`: `5.0.0`
+  - `rxjs`: `5.5.2`
+  - `zone.js`: `0.8.18`
+  - `@ionic/app-scripts`: `^3.1.6`
+- **Storage / native wrappers**
+  - `@ionic/storage`: `2.1.3`
+  - `@ionic-native/core`: `3.12.1`
+  - `@ionic-native/splash-screen`: `3.12.1`
+  - `@ionic-native/status-bar`: `3.12.1`
+- **Ionic UI**
+  - `ionicons`: `3.0.0`
+- **Library under test**
+  - `"ionic-audio": "../dist"` — the demo consumes the built library from the root `dist/` folder.
+- **Cordova plugins (package.json)**
+  - `cordova-plugin-console` `1.0.5`
+  - `cordova-plugin-device` `1.1.4`
+  - `cordova-plugin-splashscreen` `~4.0.1`
+  - `cordova-plugin-statusbar` `2.2.1`
+  - `cordova-plugin-whitelist` `1.3.1`
+  - `ionic-plugin-keyboard` `~2.2.1`
+- **cordovaPlugins / cordova section**
+  - Mirrors the above plugins in both `cordovaPlugins` and `cordova.plugins` sections.
+- **Scripts / build tooling**
+  - `clean`: `ionic-app-scripts clean`
+  - `build`: `ionic-app-scripts build`
+  - `ionic:build`: `ionic-app-scripts build`
+  - `ionic:serve`: `ionic-app-scripts serve`
+
+### Cordova Config (`demo/config.xml`)
+
+- **App metadata**
+  - `id`: `com.ionicframework.demo289853`
+  - `name`: `demo`
+  - `description`: Ionic/Cordova sample app
+- **Navigation / intents**
+  - `<allow-navigation href="http://ionic.local/*"/>`
+  - Multiple `<allow-intent>` entries for `http`, `https`, `tel`, `sms`, `mailto`, `geo`, etc.
+- **Platforms**
+  - `android`: icons + splash images for multiple densities
+  - `ios`: `itms:*`, `itms-apps:*` intents
+- **Preferences**
+  - `android-minSdkVersion`: `16`
+  - `BackupWebStorage`: `none`
+  - Several splash-related settings (duration, first-time only, etc.)
+- **Plugins**
+  - `cordova-plugin-console` `1.0.5`
+  - `cordova-plugin-device` `1.1.4`
+  - `cordova-plugin-splashscreen` `~4.0.1`
+  - `cordova-plugin-statusbar` `2.2.1`
+  - `cordova-plugin-whitelist` `1.3.1`
+  - `ionic-plugin-keyboard` `~2.2.1`
+
+### Ionic Config (`demo/ionic.config.json`)
+
+- `name`: `demo`
+- `type`: `ionic-angular`
+- `integrations.cordova`: enabled (Cordova-integrated Ionic 3 project)
+
+## Migration Notes
+
+- The **new Angular 17 + Capacitor demo (`ng-workspace`)** already replaces the legacy `demo/` app for modern platforms.
+- The legacy stack is:
+  - Angular 5 + Ionic 3
+  - Cordova-based mobile build via `ionic-app-scripts`
+  - Small set of core Cordova plugins (status bar, splash screen, keyboard, whitelist, console, device).
+- When migrating remaining functionality, the main work will be:
+  - Replacing `ionic-angular` navigation/pages with Angular Router + modern Ionic components (in the new app).
+  - Mapping required Cordova plugins to their **Capacitor** equivalents or removing them if no longer needed (several are now built-in or not required).
+  - Decommissioning `demo/` and the root `ngc` build once consumers have fully moved to the Angular 17 library and demo.

