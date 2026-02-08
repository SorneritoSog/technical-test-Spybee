"use client";

/* REACT */
import { useState } from "react";

import styles from "./page.module.css";

/* ICONS */
import ApplicationIcons from "../icons/ApplicationIcons";

/* COMPONENTS */
import ProjectsList from "../components/ProjectsList";
import ProjectsMap from "../components/ProjectsMap";
import ProjectsResume from "../components/ProjectsResume";

/* STORE */
import { useProjectsStore } from "../store/useProjectsStore";

export default function Projects() {
  /* Store State */
  const { 
    filteredProjects, 
    searchTerm, 
    setSearchTerm, 
    setSortBy,
    currentPage,
    itemsPerPage, 
    setPage 
  } = useProjectsStore();

  /* Local UI State */
  const [viewMode, setViewMode] = useState("list"); // 'list', 'grid'  or  'map'
  const [isDetailsSidebarActive, setIsDetailsSidebarActive] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // To show the sort menu

  return (
    <section className={styles["projects-page"]}>
      <div className={styles["projects-toolbar-wrapper"]}>
        <h1 className="text-2xl font-medium text-primary">
          Mis proyectos
          <span className="text-sm font-bold">{filteredProjects.length} Proyectos</span>
        </h1>
        <div className={styles["toolbar-actions"]}>
          
          {/* Sort / Filter Button */}
          <div className={styles["order-menu-wrapper"]}>
            <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>

              <ApplicationIcons iconName="OrderIcon" />
            </button>
            {isFilterMenuOpen && (
              <div className={styles["order-menu"]}>
                <button className="text-md font-regular text-primary" onClick={() => { setSortBy('alphabetical'); setIsFilterMenuOpen(false); }}>Orden alfabético</button>
                <button className="text-md font-regular text-primary" onClick={() => { setSortBy('incidents'); setIsFilterMenuOpen(false); }}>Número de Incidencias</button>
                <button className="text-md font-regular text-primary" onClick={() => { setSortBy('rfi'); setIsFilterMenuOpen(false); }}>Número de RFI</button>
                <button className="text-md font-regular text-primary" onClick={() => { setSortBy('tasks'); setIsFilterMenuOpen(false); }}>Número de Tareas</button>
              </div>
            )}
          </div>

          <div className={styles["view-options"]}>
            <button className={`${viewMode === "list" ? styles["active"] : ""}`} onClick={() => setViewMode("list")}><ApplicationIcons iconName="ListIcon" /></button>
            <button className={`${viewMode === "grid" ? styles["active"] : ""}`} onClick={() => setViewMode("grid")}><ApplicationIcons iconName="GridIcon" /></button>
            <button className={`${viewMode === "map" ? styles["active"] : ""}`} onClick={() => setViewMode("map")}><ApplicationIcons iconName="LocationIcon" /></button>
          </div>

          <div className={styles["search-input-container"]}>
            <input 
                type="text" 
                placeholder="Buscar" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ApplicationIcons iconName="SearchIcon" />
          </div>

          <button className={`${styles["new-project-button"]} text-md font-medium`}>
            <ApplicationIcons iconName="AddIcon" />
            Crear proyecto
          </button>
          
        </div>
      </div>

      <section className={styles["projects-content"]}>
        <section className={styles["view-container"]}>
          <div className={`${styles["map-view"]} ${viewMode === "map" ? styles["open-map"] : styles["close-map"]}`}>
            <ProjectsMap projects={filteredProjects} />
          </div>
          <div className={styles["list-view"]}>
            {/* We pass ALL filtered projects, pagination will be done within the component if desired */}
            <ProjectsList projects={filteredProjects} viewMode={viewMode} isDetailsSidebarActive={isDetailsSidebarActive} />
          </div>
        </section>

        <button className={`${styles["show-details-button"]} ${isDetailsSidebarActive ? styles["desabled"] : ""}`} onClick={() => setIsDetailsSidebarActive(true)}>

          <ApplicationIcons iconName="PresentationIcon" />
          <span><ApplicationIcons iconName="arrowicon" direction="left" /></span>
        </button>
        <section className={`${styles["details-sidebar"]} ${isDetailsSidebarActive ? styles["active"] : ""}`}>
            <ProjectsResume isDetailsSidebarActive={isDetailsSidebarActive} setIsDetailsSidebarActive={setIsDetailsSidebarActive} />
        </section>
      </section>
    </section>
  );
}