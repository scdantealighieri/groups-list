# Angular Groups List Installation Guide

## Prerequisites

- Angular 17.x or later
- Node.js 18+ and npm

## Quick Start

### 1. Install Dependencies

```bash
npm install swiper
```

### 2. Import Swiper Styles

Add to your `angular.json` styles array or import in your global styles:

```css
/* In your global styles.css or angular.json */
@import 'swiper/css';
@import 'swiper/css/navigation';
```

### 3. Register Swiper Elements

In your `main.ts` file, register Swiper elements:

```typescript
import { register } from 'swiper/element/bundle';

// Register Swiper web components
register();

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### 4. Import the Module

```typescript
import { DanteGroupsModule } from './path-to/angular-groups-list';

@NgModule({
  imports: [
    // ... other imports
    DanteGroupsModule
  ],
  // ...
})
export class AppModule { }
```

### 5. Add Material Symbols Font

Add to your `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
```

### 6. Use the Component

```html
<dante-groups-app mode="list"></dante-groups-app>
```

## Integration Examples

### Basic Usage

```html
<!-- List view -->
<dante-groups-app mode="list"></dante-groups-app>

<!-- Overview/carousel view -->
<dante-groups-app mode="overview"></dante-groups-app>
```

### With Filtering (Overview Mode)

```html
<div #overviewContainer
     class="dante-groups-overview"
     dante-level="A1"
     dante-city="warszawa">
  <dante-groups-app 
    mode="overview" 
    [rootElement]="overviewContainer">
  </dante-groups-app>
</div>
```

## Troubleshooting

### Swiper Not Working

1. Make sure Swiper is registered in `main.ts`
2. Verify Swiper CSS is imported
3. Check that `CUSTOM_ELEMENTS_SCHEMA` is included in the module

### CORS Issues

The component connects to `https://dantealighieri.appblue.pl` API. For development, you may need to configure a proxy or handle CORS appropriately.

### Styling Issues

Make sure CSS custom properties are available or override them in your global styles:

```css
:root {
  --dante-main-background: #f8ead0;
  --dante-dark-brown: #6f2b2c;
  /* ... other variables */
}
```