# GeoTrack

## Requirements
==============================================================================================================================
1. Overview
    The goal of this application is to visually track and analyze the movement timeline of individuals using geolocation data.
    The system will allow investigators to view historical movement paths, replay travel routes, and query location data for 
    specific timestamps.
    This requirement document focuses primarily on the UI layer and interaction capabilities.
==============================================================================================================================
2. Functional Requirements
    2.1 Location Tracking
      - The system should capture and store user location periodically on weekdays.
        Location data must include:
         1. User ID
         2. Latitude
         3. Longitude
         4. Timestamp (date + time)
        The captured data must be stored in a user-specific timeline.
    
    2.2 Travel Path Visualization
      - When a user is selected, the application should display their travel path on an interactive map.
        
        The map should show:
        1. The movement trajectory
        2. Each recorded location point.
        
        Hover Interaction
        When hovering over a location point on the path, the UI should display:
            1. Timestamp
            2. Date
            3. Exact coordinates (optional)
   
    2.3 Map Integration
      - The application should integrate with OpenStreetMap (OSM) for map rendering.
        Additional requirement:
        Replay functionality should allow investigators to replay a user's movement timeline on the map.
        Replay features:
            1. Play
            2. Pause
            3. Fast forward
            4. Timeline slider
    2.4 Search Capability
      - The system should support location lookup using the following parameters:
        Search inputs:
            1. User ID
            2. Date
            3. Time
        Expected result:
            Display the exact location of the user at that timestamp.
            If an exact match is unavailable:
             - Show the closest recorded location.
    2.5 Time Range Filtering
      - Users should be able to filter a specific time range for a selected user.
        Example:
         - User: A
         - Date: 10 March 2026
         - Time Range: 10:00 AM – 2:00 PM
        Result:
            Only the movement path within that time range should be shown on the map.

    2.6 Additional UI Inputs / Controls
    The UI may include the following controls:
        1. User selection dropdown
        2. Date picker
        3. Time range selector
        4. Timeline slider
        5. Replay controls
        6. Map zoom and navigation
        7. Location point highlighting
        8. Heatmap view (optional)
        9. Movement speed visualization (optional)
==============================================================================================================================
3. Non-Functional Requirements
    3.1 Data Capture Frequency
        The frequency of location capture needs to be defined.
        
        Possible options:
            1. Every 5 seconds
            2. Every 30 seconds
            3. Every 1 minute
        
        This should be decided based on:
            1. Tracking accuracy requirements
            2. Storage capacity
            3. System performance
    
    3.2 Scalability
        The system should support high write throughput, potentially up to:
         ~1 million location writes per second
    
    3.3 Storage / Database
        Due to the high-volume time-based data, the system should use a Time-Series Database.
        
        Recommended options:
            1. InfluxDB
            2. TimescaleDB
            3. Apache Druid
            4. Cassandra (with time-series model)
    
    3.4 Performance
     - Map rendering should be fast and responsive
     - Query results should return within a few seconds
     - Timeline replay should be smooth and interactive
    
    3.5 Reliability
     - Location data must be durably stored
     - System should support large-scale historical data retrieval
==============================================================================================================================
4. Future Enhancements (Optional)
Possible future improvements:
    1. Suspicious movement detection
    2. Geo-fencing alerts
    3. AI-based anomaly detection
    4. Multi-user timeline comparison
    5. Heatmap visualization of criminal activity
    6. Mobile companion tracking app
==============================================================================================================================
Open questions - 
Q.1. Rendering for table row fails if click/routerLink applied in button in template. - feature-bug/v1
Q.2. Without Signal the onChanges/updated state of timelines doesn't reflect in child compoenent. - feature-bug/v1

## Steps followed
1. Clarify requirements.
 - Functional and Non Functional requirements.
2. Fix the Tech stack.
 - Angular in this case as this is requirement.
 - still justify why angular is best/ones of the best choice of Tech stack for this.
3. Install Latest Node.js version. -> https://nodejs.org/en/download
4. Install latest angular cli version. -> npm i @angular/cli@latest -g
5. Initialise/Create new angular application. -> ng new geo_track -> stylesheet = tailwind and AI tool = Claude
    Q - in my latest angular version i.e. cli - 21.2.1
    what tool will be I using for bundle creation?

==============================================================================================================================
# GeoTrack

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
