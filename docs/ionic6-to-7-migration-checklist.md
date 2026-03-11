## Ionic 6 → 7 Migration Checklist (Angular)

This project now uses **@ionic/angular 8.x** on top of Angular 21, which already satisfies and exceeds the official Ionic 7 requirements.
This document records how the steps from the official guide _“Updating to v7”_ were addressed.

Reference: [Updating to v7 | Ionic Framework](https://ionicframework.com/docs/updating/7-0)

### 1. Framework and tooling versions

- **Angular**  
  - Requirement for Ionic 7: Angular 14+  
  - Current workspace: Angular **21.x** (via `ng-workspace/package.json`) ✔

- **RxJS**  
  - Requirement: RxJS ≥ 7.5.0  
  - Current workspace: RxJS **~7.8.0** ✔

- **Ionic Angular**  
  - Requirement: `@ionic/angular@7`  
  - Current workspace: `@ionic/angular@8.8.x` (compatible superset of v7) ✔

### 2. Code-level breaking changes (checked)

Scans were performed under `ng-workspace/` to ensure we are not using deprecated APIs mentioned in the Ionic 6 → 7 guide:

- **Deprecated attribute types**  
  - `ActionSheetAttributes`, `AlertAttributes`, `LoadingAttributes`, `ModalAttributes`  
  - **Result**: not used in the codebase.

- **Input and searchbar events**  
  - Guidance: use `event.detail.value` instead of accessing raw DOM events.  
  - **Result**: no `ion-input` or `ionInput` usages found; demo currently uses list, headers, buttons, etc. Only audio components are custom (`audio-track*`).

- **Modal options**  
  - Guidance: avoid `canDismiss: undefined` and deprecated `swipeToClose`.  
  - **Result**: no modal usage in the new Angular demo yet.

- **Checkbox / Datetime / Searchbar breaking changes**  
  - Guidance around CSS variables and timezone handling.  
  - **Result**: these components are not used in the new demo.

### 3. Configuration

- **Browserslist / browser support**  
  - Angular 21 CLI uses modern defaults which satisfy Ionic 7’s minimum browser support requirements.  
  - No additional overrides are currently required.

### 4. Conclusion

- All mandatory **Ionic 6 → 7 migration requirements** are satisfied:
  - Angular and RxJS versions are above the minimum.
  - `@ionic/angular` is already on v8 (which includes v7 changes).
  - No deprecated Ionic 6-only APIs referenced in the application code.
- No additional code changes were necessary for this repository beyond the existing upgrades to Angular 18+ and Ionic Angular 8.

