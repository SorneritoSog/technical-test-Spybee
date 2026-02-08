import { create } from 'zustand';
import projectsData from '../data/projectsData.json';

// Helper: Count incidents by type
const countIncidents = (project, type) => {
  return project.incidents.filter(i => {
    // If we want to filter by date:
    // const isFuture = new Date(i.limitDate) > new Date();
    // return i.item === type && isFuture;
    
    // Count all (as agreed):
    return i.item === type; 
  }).length;
};

// Helper: Get total item count per project (for sorting)
const getTotalItems = (project) => project.incidents.length;


export const useProjectsStore = create((set, get) => ({
  // Initial state
  allProjects: projectsData,      // The complete "database"
  filteredProjects: projectsData, // What is currently displayed
  selectedProjectId: null,        // Selected project (for highlight in list and map)
  currentPage: 1
,
  itemsPerPage: 10,
  searchTerm: '',
  sortBy: 'alphabetical', // 'alphabetical', 'incidents', 'rfi', 'tasks'
  
  // For Map <-> List interaction
  mapViewState: { latitude: 4.6, longitude: -74.0, zoom: 1 }, // Default
  
  // Actions
  setMapViewState: (viewState) => set({ mapViewState: viewState }),

  selectProject: (id) => set({ selectedProjectId: id }),

  flyToProject: (project) => {
      if (project.position && project.position.lat && project.position.lng) {
          set({ 
              selectedProjectId: project._id, // Mark as selected
              mapViewState: {
                  latitude: project.position.lat,
                  longitude: project.position.lng,
                  zoom: 12 // Closer zoom on select
              }
          });
      }
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term, currentPage: 1 }); // On search, reset to page 1
    get().applyFilters();
  },

  setSortBy: (sortType) => {
    set({ sortBy: sortType });
    get().applyFilters();
  },

  setPage: (page) => {
    set({ currentPage: page });
  },

  // Central filtering and sorting logic
  applyFilters: () => {
    const { allProjects, searchTerm, sortBy } = get();
    
    // 1. Filter by search (Case insensitive)
    let result = allProjects;
    
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerTerm) 
        // You can add more fields here if you want to search by city, state, etc.
      );
    }

    // 2. Sort
    result = [...result].sort((a, b) => {
        switch (sortBy) {
            case 'alphabetical':
                // { numeric: true } fixes the issue of "Project-1, Project-10, Project-2"
                return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
            case 'incidents': // Sort by total incidents? or by incidents type 'incidents'?
                 // The test says: "quantity of incidents, RFI or tasks"
                 // We'll assume specific type. Descending (high to low) is usually better for dashboards.
                 return countIncidents(b, 'incidents') - countIncidents(a, 'incidents');
            case 'rfi':
                 return countIncidents(b, 'RFI') - countIncidents(a, 'RFI');
            case 'tasks':
                 return countIncidents(b, 'task') - countIncidents(a, 'task');
            default:
                return 0;
        }
    });

    set({ filteredProjects: result });
  }
}));
