/* REACT */
import { useState, useMemo } from "react";

/* STORE */
import { useProjectsStore } from "../store/useProjectsStore";

/* STYLES */
import styles from "./ProjectsResume.module.css";

/* ICONS */
import ApplicationIcons from "../icons/ApplicationIcons";

/* COMPONENTS */
import Hexagon from "./Hexagon";
import CircleChart from "./CircleChart";

function ProjectsResume({ isDetailsSidebarActive, setIsDetailsSidebarActive }) {
    const { filteredProjects } = useProjectsStore();
    const [activeTab, setActiveTab] = useState("general");
    
    // Helper for date format
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    const formatHour = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(date);
    };

    // Colors for users
    const colorsForUsers = ["#FAD75F", "#FAC30F", "#EBB400"];

    const { stats, sortedItems } = useMemo(() => {
        const counts = {
            incidents: { total: 0, due: 0 },
            rfi: { total: 0, due: 0 },
            task: { total: 0, due: 0 }
        };

        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);
        
        let allItems = [];

        filteredProjects.forEach(project => {
            if (project.incidents && Array.isArray(project.incidents)) {
                project.incidents.forEach(item => {
                    // Normalize item type to match keys (incidents, rfi, task)
                    // Data values: "incidents", "RFI", "task"
                    let typeKey = null;
                    if (item.item === 'incidents') typeKey = 'incidents';
                    else if (item.item === 'RFI') typeKey = 'rfi';
                    else if (item.item === 'task') typeKey = 'task';

                    if (typeKey && item.status === 'active') {
                        // Add to counts
                        counts[typeKey].total++;
                        
                        let isDue = false;
                        if (item.limitDate) {
                            const date = new Date(item.limitDate);
                            if (date <= nextWeek) { // Overdue or soon to be due
                                counts[typeKey].due++;
                                isDue = true;
                            }
                        }

                        // Add to items list if it has a limit date
                        if (item.limitDate) {
                            allItems.push({
                                ...item,
                                projectTitle: project.title,
                                projectUsers: project.users || [],
                                typeKey: typeKey // standardized key
                            });
                        }
                    }
                });
            }
        });

        const getPercent = (due, total) => total > 0 ? Math.round((due / total) * 100) : 0;
        
        // Sort items by date ascending (closest date first)
        allItems.sort((a, b) => new Date(a.limitDate) - new Date(b.limitDate));

        return {
            stats: {
                incidents: { ...counts.incidents, percent: getPercent(counts.incidents.due, counts.incidents.total) },
                rfi: { ...counts.rfi, percent: getPercent(counts.rfi.due, counts.rfi.total) },
                task: { ...counts.task, percent: getPercent(counts.task.due, counts.task.total) }
            },
            sortedItems: allItems
        };
    }, [filteredProjects]);

    // Data for tables
    const itemsToBeat = sortedItems.slice(0, 3);
    // For events, we filter only tasks ('task') and take the top 3
    const nextEvents = sortedItems.filter(item => item.typeKey === 'task').slice(0, 3);

  return (
    <div className={`${styles["details-content"]} ${isDetailsSidebarActive ? styles["active"] : ""}`}>
        <button className={styles["close-details-button"]} onClick={() => setIsDetailsSidebarActive(false)}><ApplicationIcons iconName="arrowicon" direction="right" /></button>
        <header className={styles["resume-header"]}>
            <ApplicationIcons iconName="PresentationIcon" />
            <h3 className="text-lg font-bold text-primary">Resumen</h3>
        </header>

        <div className={`${styles["resume-toolbar-actions"]} `}>
            <button className={`${styles["tab-button"]} ${activeTab === "general" ? styles["active"] : ""} text-md font-regular text-secondary`} onClick={() => {setActiveTab("general")}}>General</button>
            <button className={`${styles["tab-button"]} ${activeTab === "updates" ? styles["active"] : ""} text-md font-regular text-secondary`} onClick={() => {setActiveTab("updates")}}>Mis actualizaciones</button>
            <button className={`${styles["filter-button"]} text-md font-regular text-primary`}>
                <ApplicationIcons iconName="FilterIcon" />
                Filtros
            </button>
        </div>

        {
            activeTab === "general" ? (
                <div className={`${styles["general-resume"]} container-scrollbar`}>
                    <header>
                        <h5 className="text-lg font-medium text-primary">
                            <ApplicationIcons iconName="ChronometerIcon" />
                            Próximos a vencer
                        </h5>
                        
                        <button className="text-md font-medium">Ver todos</button>
                    </header>

                    <div className={styles["elements-to-beat-wrapper"]}>
                        <div className={styles["item-card"]}>
                            <p className="text-md font-bold text-primary">Incidencias</p>
                            <p className="text-xl font-bold text-primary">{stats.incidents.total}</p>
                            <p className="text-sm font-medium text-secondary">Total abiertas</p>
                            <div className={styles["chart-wrapper"]}>
                                <CircleChart 
                                    percentage={stats.incidents.percent} 
                                    value={stats.incidents.due} 
                                />
                            </div>
                        </div>
                        <div className={styles["item-card"]}>
                            <p className="text-md font-bold text-primary">RFI</p>
                            <p className="text-xl font-bold text-primary">{stats.rfi.total}</p>
                            <p className="text-sm font-medium text-secondary">Total abiertas</p>
                            <div className={styles["chart-wrapper"]}>
                                <CircleChart 
                                    percentage={stats.rfi.percent} 
                                    value={stats.rfi.due} 
                                />
                            </div>
                        </div>
                        <div className={styles["item-card"]}>
                            <p className="text-md font-bold text-primary">Tareas</p>
                            <p className="text-xl font-bold text-primary">{stats.task.total}</p>
                            <p className="text-sm font-medium text-secondary">Total abiertas</p>
                            <div className={styles["chart-wrapper"]}>
                                <CircleChart 
                                    percentage={stats.task.percent} 
                                    value={stats.task.due} 
                                />
                            </div>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th className="text-md font-light text-primary">Proyecto</th>
                                <th className="text-md font-light text-primary">Item</th>
                                <th className="text-md font-light text-primary">Fecha Límite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsToBeat.length > 0 ? itemsToBeat.map((item, index) => (
                                <tr key={`beat-${index}`}>
                                    <td className="text-md font-regular text-primary">
                                        {item.projectTitle} <br />
                                        <span className="text-sm font-regular text-secondary">{item.description || "Sin descripción"}</span>
                                    </td>
                                    <td className="text-sm font-regular text-secondary" style={{textTransform: 'capitalize'}}>
                                        {/* We translate item.item manually or show it directly */}
                                        {item.item === 'incidents' ? 'Incidencia' : (item.item === 'task' ? 'Tarea' : item.item)}
                                    </td>
                                    <td className="text-md font-regular text-primary">
                                        {formatDate(item.limitDate)} <br />
                                        <span className="text-secondary">
                                            <ApplicationIcons iconName="ClockIcon" /> {formatHour(item.limitDate)}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr className={styles["no-items-row"]}>
                                    <td className="text-secondary">No hay items próximos a vencer</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                     <header>
                        <h5 className="text-lg font-medium text-primary">
                            <ApplicationIcons iconName="CalendarIcon" />
                            Próximos eventos
                        </h5>
                        
                        <button className="text-md font-medium">Ver todos</button>
                    </header>

                    <table>
                        <thead>
                            <tr>
                                <th className="text-md font-light text-primary">Proyecto</th>
                                <th className="text-md font-light text-primary">Equipo</th>
                                <th className="text-md font-light text-primary">Fecha Límite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nextEvents.length > 0 ? nextEvents.map((item, index) => (
                                <tr key={`event-${index}`}>
                                    <td className="text-md font-regular text-primary">
                                        {item.projectTitle} <br />
                                        <span className="text-sm font-regular text-secondary">{item.description || "Sin descripción"}</span>
                                    </td>
                                    <td className={`${styles["users-column"]} text-sm font-regular text-secondary`}>
                                        {item.projectUsers.length > 0 ? (
                                            item.projectUsers.slice(0, 3).map((member, i) => (
                                                <div key={i} style={{ marginRight: '-5px' }}>
                                                    <Hexagon size="1.25rem" backgroundColor={colorsForUsers[i % colorsForUsers.length]}>
                                                        <p className="text-xs font-bold">{member.name?.[0] || '?'}{member.lastName?.[0] || '?'}</p>
                                                    </Hexagon>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="text-xs">Sin equipo</span>
                                        )}
                                    </td>
                                    <td className="text-md font-regular text-primary">
                                        {formatDate(item.limitDate)} <br />
                                        <span className="text-secondary">
                                            <ApplicationIcons iconName="ClockIcon" /> {formatHour(item.limitDate)}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr className={styles["no-events-row"]}>
                                    <td className="text-secondary">No hay eventos próximos</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-md font-medium text-secondary" style={{width: "100%", textAlign: "center"}}>Nada que mostrar</p>
            )
        }
    </div>
  )
}

export default ProjectsResume