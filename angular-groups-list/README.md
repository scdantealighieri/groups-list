# Dante Groups List - Angular Component

Angular version of the Dante Groups List application, converted from the original React implementation.

## Installation

1. Copy the `angular-groups-list` directory to your Angular project
2. Install required dependencies:

```bash
npm install swiper
```

3. Import the module in your app:

```typescript
import { DanteGroupsModule } from './path/to/angular-groups-list';

@NgModule({
  imports: [
    // ... other imports
    DanteGroupsModule
  ],
  // ...
})
export class AppModule { }
```

## Usage

### Basic List Mode

```html
<dante-groups-app mode="list"></dante-groups-app>
```

### Overview Mode with Carousel

```html
<dante-groups-app mode="overview"></dante-groups-app>
```

### Overview Mode with Filtering Attributes

```html
<div #overviewElement
     class="dante-groups-overview"
     dante-level="A1"
     dante-lector="rossi"
     dante-city="warszawa">
  <dante-groups-app 
    mode="overview" 
    [rootElement]="overviewElement">
  </dante-groups-app>
</div>
```

### Landing Page Mode

```html
<div #landingElement
     class="dante-groups-overview"
     dante-lp="true"
     dante-hide-ind="true"
     dante-level="B1">
  <dante-groups-app 
    mode="overview" 
    [rootElement]="landingElement">
  </dante-groups-app>
</div>
```

## Available Data Attributes for Filtering

When using overview mode, you can add these attributes to the container element:

- `dante-level` - Filter by course level (e.g., "A1", "B1", "C2")
- `dante-type` - Filter by course type ("online", "stacjonarna")
- `dante-lector` - Filter by lecturer name
- `dante-city` - Filter by city
- `dante-name` - Filter by course name
- `dante-hide-ind` - Hide individual courses ("true"/"false")
- `dante-hide-duetto` - Hide duetto courses ("true"/"false")
- `dante-lp` - Landing page mode ("true"/"false")

## Components

### Main Components

- **GroupsAppComponent** - Main container component
- **GroupsListComponent** - Full list view with filtering and sorting
- **GroupsOverviewComponent** - Carousel overview with Swiper
- **GroupCardComponent** - Individual group card
- **GroupsTableComponent** - Table view of groups
- **ModalManagerComponent** - Modal dialogs for details, sign-in, notifications

### Services

- **GroupsApiService** - Handles API calls to fetch groups and lectors
- **GroupService** - Utility functions for formatting and data manipulation

## Styling

The component uses CSS custom properties (CSS variables) for theming:

```css
:root {
  --dante-light-background: #f8f2e6;
  --dante-dark-brown: #6f2b2c;
  --dante-filter-option-background: #f4d09c;
  --dante-main-background: #f8ead0;
  --dante-black: #353f4f;
  --dante-grey: #6c757d;
  --dante-white: #faefdd;
  --dante-red: red;
  --dante-inactive-grey: #303633;
}
```

## Material Symbols Icons

The component uses Material Symbols Outlined icons. Make sure to include the font:

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
```

## Swiper Integration

For the overview carousel, this component uses Swiper as web components. The Swiper library is imported and configured automatically.

## API Integration

The component connects to the Dante Alighieri API endpoints:

- `GET /api/get_groups.php` - Fetch all groups
- `POST /api/get_group_details.php` - Fetch group details
- `GET /api/get_lectors.php` - Fetch all lectors

The base URL is configured in `GroupsApiService` and defaults to `https://dantealighieri.appblue.pl`.

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm run test
```

## Migration from React

This Angular component maintains the same functionality as the original React version:

- ✅ Two display modes (list and overview)
- ✅ Group filtering and sorting
- ✅ Swiper carousel for overview mode
- ✅ Modal dialogs for group details, sign-in, and notifications
- ✅ Responsive design
- ✅ Special groups (Individual and Duetto)
- ✅ Data attribute-based filtering for overview mode
- ✅ Landing page mode support

## License

MIT