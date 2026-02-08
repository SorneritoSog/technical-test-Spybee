import { useState, useEffect } from 'react';
import Image from 'next/image';

import styles from './ProjectsList.module.css';

/* COMPONENTS */
import Hexagon from './Hexagon';

/* UTILS */
import { formatDate } from '../utils/formatDate';

/* ICONS */
import ApplicationIcons from '../icons/ApplicationIcons';

/* STORE */
import { useProjectsStore } from '../store/useProjectsStore';

export default function ProjectsList({ projects, viewMode, isDetailsSidebarActive }) {

    const { flyToProject, selectedProjectId } = useProjectsStore();

    const colorsForUsers = ["#FFF5D7", "#FFEBAF", "#FAD75F", "#FAC30F", "#EBB400", "#FFF5D7"];

    /* PAGINATION STATE */
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    /* Reset page on data change */
    useEffect(() => {
        setCurrentPage(1);
    }, [projects]);

    /* PAGINATION LOGIC */
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

    const renderPagination = () => {
        if (totalPages <= 1) return null;
        
        return (
            <div className={styles["pagination-controls"]}>
                <button 
                    className={styles["pagination-button"]} 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                     <ApplicationIcons iconName="arrowicon" direction="left" />
                </button>
                
                <p className={`${styles["pagination-info"]} text-md font-regular text-primary`}>
                    Página <span className='font-bold'>{currentPage}</span> de <span className='font-bold'>{totalPages}</span>
                </p>

                <button 
                    className={styles["pagination-button"]}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                     <ApplicationIcons iconName="arrowicon" direction="right" />
                </button>
            </div>
        );
    };

    if (viewMode === "list" || viewMode === "map") {
        return (
            <table className={`${styles['projects-table']} ${isDetailsSidebarActive ? styles["shrunken-table"] : styles["normal-table"]}`}>
                <thead>
                    <tr>
                        <th className='text-md font-regular text-primary'>Proyecto</th>
                        <th className='text-md font-regular text-primary'>Plan</th>
                        <th className='text-md font-regular text-primary'>Estado</th>
                        <th className='text-md font-regular text-primary'>Equipo</th>
                        <th className='text-md font-regular text-primary'>Items por vencer</th>
                    </tr>
                </thead>
                <tbody className='container-scrollbar'>
                    {
                        currentProjects.map((project, index) => (
                            <tr 
                                key={project._id} 
                                style={{ animationDelay: `${index * 0.05}s`,}} 
                                onClick={() => flyToProject(project)}
                                className={selectedProjectId === project._id ? styles["active-row"] : ""}
                            >
                                <td className={styles["project-info"]}>
                                    <div>
                                        <Image 
                                            src={project.img === 'xxx' ? `https://picsum.photos/seed/${project._id}/600/400` : project.img} 
                                            alt="Project Image" 
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <p className={`${styles["project-title"]} "text-md font-medium text-primary"`}>{project.title}</p>
                                    <p className='text-md font-medium text-secondary'>
                                        <ApplicationIcons iconName="ClockIcon" /> {formatDate(project.createdAt)}
                                    </p>
                                    <p className='text-md font-medium text-secondary'>
                                        <ApplicationIcons iconName="UpdateIcon" /> {formatDate(project.lastUpdated)}
                                    </p>
                                </td>
                                <td className={styles["plan-info"]}>
                                    <p className={`${styles[`${project.projectPlanData.plan}-plan`]} text-sm font-light`}>{project.projectPlanData.plan}</p>
                                </td>
                                <td className={styles["status-info"]}>
                                    <p className={`${styles[`${project.status}-status`]} text-sm font-regular`}>{project.status}</p>
                                </td>
                                <td className={styles["team-info"]}>
                                    {
                                        isDetailsSidebarActive ?
                                        project.users.slice(0, 3).map((member, index) => {
                                            if (project.users.length > 3 && index === 2) {
                                                return (
                                                    <Hexagon key={index} backgroundColor="#EBB400">
                                                         <p className='text-md font-bold'>+{project.users.length - 3}</p>
                                                    </Hexagon>
                                                )
                                            }
                                            return (
                                                <Hexagon key={index} backgroundColor={ colorsForUsers[index] }>
                                                    <p className='text-md font-bold'>{member.name[0] + member.lastName[0]}</p>
                                                </Hexagon>
                                            )
                                        }) :
                                        project.users.slice(0, 6).map((member, index) => {
                                            if (project.users.length > 6 && index === 5) {
                                                return (
                                                    <Hexagon key={index} backgroundColor={ colorsForUsers[index] }>
                                                         <p className='text-md font-bold'>+{project.users.length - 6}</p>
                                                    </Hexagon>
                                                )
                                            }
                                            return (
                                                <Hexagon key={index} backgroundColor={ colorsForUsers[index] }>
                                                    <p className='text-md font-bold'>{member.name[0] + member.lastName[0]}</p>
                                                </Hexagon>
                                            )
                                        })
                                    }
                                </td>
                                <td className={styles["due-items-info"]}>
                                    <p className='text-md font-bold text-primary'>
                                        {project.incidents.filter(i => i.item === 'incidents').length} <br />
                                        <span className='text-secondary'>Incidencias</span>
                                    </p>
                                    <p className='text-md font-bold text-primary'>
                                        {project.incidents.filter(i => i.item === 'RFI').length} <br />
                                        <span className='text-secondary'>RFI</span>
                                    </p>
                                    <p className='text-md font-bold text-primary'>
                                        {project.incidents.filter(i => i.item === 'task').length} <br />
                                        <span className='text-secondary'>Tareas</span>
                                    </p>
                                </td>
                            </tr>
                        ))
                    }
                    {/* PAGINATION ROW */}
                    {totalPages > 1 && (
                    <tr className={styles["table-pagination-wrapper"]}>
                        <td colSpan="5">
                            {renderPagination()}               
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        );
    } else if (viewMode === "grid") {
        return (
            <div className={`${styles["projects-grid"]} container-scrollbar`}>
                {
                    currentProjects.map((project, index) => (
                        <div key={project._id} className={`${styles["project-card"]} ${selectedProjectId === project._id ? styles["active-card"] : ""}`} style={{ animationDelay: `${index * 0.05}s` }}>
                            <div className={styles["card-header"]}>
                                <span className={`${styles["grid-status-badge"]} ${styles[`${project.status}-status`]}`}>
                                    {project.status.replace('_', ' ')}
                                </span>
                                <span className={`${styles["grid-plan-badge"]} ${styles[`${project.projectPlanData.plan}-plan`]}`}>
                                    {project.projectPlanData.plan}
                                </span>
                            </div>
                            
                            <div className={styles["card-content"]}>
                                <div className={styles["card-image-container"]}>
                                    <Image 
                                        src={project.img === 'xxx' ? `https://picsum.photos/seed/${project._id}/600/400` : project.img} 
                                        alt="Project Image" 
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className={styles["card-details"]}>
                                    <p className={styles["project-title"]}>{project.title}</p>
                                    <div className={styles["card-dates"]}>
                                        <p>
                                            <ApplicationIcons iconName="ClockIcon" /> {formatDate(project.createdAt)}
                                        </p>
                                        <p>
                                            <ApplicationIcons iconName="UpdateIcon" /> {formatDate(project.lastUpdated)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles["card-divider"]}></div>

                            <div className={styles["card-footer"]}>
                                <div className={styles["footer-section"]}>
                                    <h4>Equipo</h4>
                                    <div className={styles["team-avatars"]}>
                                        {
                                            project.users.slice(0, 4).map((member, index) => {
                                                if (project.users.length > 4 && index === 3) {
                                                    return (
                                                        <Hexagon key={index} backgroundColor="#EBB400">
                                                                <p className='text-md font-bold'>+{project.users.length - 4}</p>
                                                        </Hexagon>
                                                    )
                                                }
                                                return (
                                                    <Hexagon key={index} backgroundColor={ colorsForUsers[index] }>
                                                        <p className='text-md font-bold'>{member.name[0] + member.lastName[0]}</p>
                                                    </Hexagon>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={styles["footer-section"]}>
                                    <h4 style={{ textAlign: 'right' }}>Items por vencer</h4>
                                    <div className={styles["due-items-row"]}>
                                        <div className={styles["due-item"]}>
                                            <span className={styles["count"]}>{project.incidents.filter(i => i.item === 'incidents').length}</span>
                                            <span className={styles["label"]}>Incidencias</span>
                                        </div>
                                        <div className={styles["due-item"]}>
                                            <span className={styles["count"]}>{project.incidents.filter(i => i.item === 'RFI').length}</span>
                                            <span className={styles["label"]}>RFI</span>
                                        </div>
                                        <div className={styles["due-item"]}>
                                            <span className={styles["count"]}>{project.incidents.filter(i => i.item === 'task').length}</span>
                                            <span className={styles["label"]}>Tareas</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
                {/* GRID PAGINATION */}
                {totalPages > 1 && (
                <div className={styles["grid-pagination-wrapper"]}>
                    {renderPagination()}
                </div>
                )}
            </div>
        );
    } else {
        return null;
    }
}