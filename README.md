# 🌎 geospatial-monorepo-starter

A TypeScript monorepo starter for creating a client-side (SPA) geospatial application

Currently a work in progress!

# Why?

The purpose is to implement a starter for an architecture concept I've had for a geospatial web application. Having years of experience with them, I have some concepts on good patterns and things to avoid in regards to it.

You certainly _can_ just fork this or use it as a template for a whole project, but the larger point is to be an example for the architecture as a whole.

The main guiding principles were seperating out the map, app, and ui into seperate monorepo packages/apps. While building just a single repo monolithic application works, it has some draw backs. Namely the tightly coupled nature of a map library with a front-end framework. Making each piece of the application more modular allows for easier decoupling and seperation of concerns.

The map-library is a seperate package that uses a facade design pattern for the map React client app to use and interface with. The goal being that your program to the interface of the facade rather than directly to the geospatial library. While in this example, I went with MapLibre-gl-js, you can realistically choose _any_ geospatial library (ArcGIS JS API SDK, Mapbox-gl-js, Leaflet, OpenLayers). It also allows for easier testing of the map and mocking of the map interactions with the React app.

# Features / Tech

- Bun as a JavaScript/TypeScript runtime, and also Bun's workspaces for a monorepo setup
- React as a front-end UI library
- Vite as a front-end building tool
- MapLibre as a geospatial library
- Biome for linting/formatting
- Neverthrow for better error handling in TypeScript
- TailwindCSS + DaisyUI for styling and components
- RxJs for async data handling and real-time data handling in particular

In the future I'd like to explore more backend ideas, and having a backend server within this monorepo. For now though I'll be using a BaaS like AppWrite or Convex as a stand-in.

I'd also like to show how something like Tauri can be used as a desktop application as well.

# Credits

- Used BHVR as a starting point to build from.
- Used Palantir icons from their Blueprint component library.
