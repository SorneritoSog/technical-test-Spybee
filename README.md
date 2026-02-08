# Technical Test Spybee - Project Management Dashboard

A React/Next.js application developed as a technical challenge to manage and visualize a portfolio of projects. The application includes list views, interactive maps, filtering, sorting, and a dynamic summary dashboard.

## Overview

This project implements a dashboard to manage construction/engineering projects. It features a synchronized dual view (List + Map), real-time filtering, and a detailed side panel for statistical summaries.

## Key Features

1. Project List
   - Displays projects in a grid/list format (locally paginated).
   - Shows key milestones, status, teams, and pending items.
   - Interactive rows that sync with the map view.

2. Interactive Map (Mapbox)
   - Renders project locations using custom markers.
   - Fully synchronized with the list: clicking a marker highlights the project in the list and vice versa.
   - Updates dynamically based on active filters.

3. State Management (Zustand)
   - Centralized store for project data, active filters, search terms, and map state.
   - Handles sorting logic (numeric and alphabetic) and "fly-to" map actions.

4. Dynamic Resume Sidebar
   - Provides specific statistics for the current selection.
   - **Important**: The data shown in the "Resume" sidebar (charts, upcoming items, events) is calculated based on the *filtered projects*, not the entire database. This ensures the summary is always context-relevant to the user's current search or filter criteria.
   - Visualizes "Items Due" using custom SVG circular charts.
   - Lists upcoming deadlines and scheduled tasks.

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **State Management**: Zustand
- **Maps**: Mapbox GL JS + react-map-gl
- **Styling**: CSS Modules
- **Icons**: Custom SVG component system

## Installation

1. Clone the repository.
2. Install dependencies:
   `ash
   npm install
   `
3. Set up environment variables:
   - Create a .env.local file.
   - Add your Mapbox token (required for the map view to render correctly):
     `
     NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
     `
     *Note: You may also need to manually insert the token in src/components/ProjectsMap.jsx if environment variables are not strictly enforced in development.*

4. Run the development server:
   `ash
   npm run dev
   `

## Project Structure

- src/app: Page routes and layouts.
- src/components: Reusable UI components (ProjectsList, ProjectsMap, ProjectsResume, CircleChart, etc.).
- src/store: Zustand store definitions (useProjectsStore.js).
- src/data: Mock JSON data (projectsData.json).
- src/icons: SVG icon collection.

## Usage Guide

- **Search**: Use the top toolbar to search projects by title.
- **Sort**: Use the sort sort menu to order projects by title or date.
- **View Details**: Click "Ver resumen" or the sidebar trigger to open the detailed metrics panel.
- **Navigate**: Click on a project in the list to fly to its location on the map.
