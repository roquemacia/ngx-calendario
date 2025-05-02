# NgxCalendario

`ngx-calendario` is an Angular library for displaying customizable calendars with event support.

## Installation

To install the library, use npm:

```bash
npm install ngx-calendario
```

## Usage

1. Import the `NgxCalendario` component into your Angular application.

   In your `AppModule` or standalone component:

   ```ts
   import { NgxCalendario } from 'ngx-calendario';

   @Component({
     imports: [NgxCalendario],
     templateUrl: '',
     styleUrl: '',
   })
   export class ExampleComponent {
    year = 2025
    month = 0 // January
   }
   ```

2. Add the `ngx-calendario` component to your template:

   ```html
   <ngx-calendario 
     [events]="events" 
     [selectedYear]="year" 
     [selectedMonth]="month">
   </ngx-calendario>
   ```

3. Provide the `events` input as an array of `CalendarEvent` objects:

   ```ts
   import { Component, signal } from '@angular/core';
   import { CalendarEvent } from 'ngx-calendario';

   @Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.scss']
   })
   export class AppComponent {
     events = signal<CalendarEvent[]>([
       {
         date: new Date(2025, 4, 2),
         title: 'Build the calendar'
       }
     ]);
   }
   ```

## Features

- Display a calendar for a specific year and month.
- Show events on specific dates.
- Customizable templates for calendar buttons, days, and events.

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building the Library

To build the library, run:

```bash
ng build ngx-calendario
```

This will compile the library, and the build artifacts will be placed in the `dist/ngx-calendario` directory.

## Publishing the Library

After building the library, you can publish it to npm:

1. Navigate to the `dist/ngx-calendario` directory:

   ```bash
   cd dist/ngx-calendario
   ```

2. Publish the library:

   ```bash
   npm publish
   ```

## Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on Angular libraries, visit the [Angular Libraries Overview](https://angular.io/guide/libraries).
