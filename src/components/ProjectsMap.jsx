"use client";

import { useState, useRef, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox';
import Image from 'next/image';
import 'mapbox-gl/dist/mapbox-gl.css';

/* ICONS */
import ApplicationIcons from '../icons/ApplicationIcons';

/* STORE */
import { useProjectsStore } from '../store/useProjectsStore';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function ProjectsMap({ projects }) {
    
    const mapRef = useRef();
    // Access store to listen for changes (click in list -> fly to map)
    const { mapViewState, selectedProjectId, selectProject, flyToProject } = useProjectsStore(); 

    // Effect to "Fly" when global map state changes
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [mapViewState.longitude, mapViewState.latitude],
                zoom: mapViewState.zoom,
                duration: 2000 // Smooth animation of 2s
            });
        }
    }, [mapViewState]);

    return (
        <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
            <Map
                ref={mapRef}
                initialViewState={{
                    latitude: 4.6097, 
                    longitude: -74.0817,
                    zoom: 1
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11" // Or "light-v10" for something more minimalist
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <NavigationControl position="top-right" />
                <FullscreenControl position="top-right" />

                {projects.map((project) => (
                    project.position && project.position.lat && project.position.lng ? (
                        <Marker
                            key={project._id}
                            longitude={project.position.lng}
                            latitude={project.position.lat}
                            anchor="bottom"
                            onClick={e => {
                                // Prevent click propagation to the map
                                e.originalEvent.stopPropagation();
                                
                                // Select and fly when clicking the pin
                                flyToProject(project); 
                            }}
                        >
                            {/* Custom Pin Marker */}
                            <div 
                                className={`marker-pin ${selectedProjectId === project._id ? 'active' : ''}`}
                                style={{ 
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    transform: 'translateY(-100%)', // So the tip is at the coordinate
                                    zIndex: selectedProjectId === project._id ? 100 : 1 // The selected one always on top
                                }}
                            >
                                {/* Floating label only if active */}
                                {selectedProjectId === project._id && (
                                    <div style={{
                                        backgroundColor: '#1a1a1a',
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        marginBottom: '4px',
                                        whiteSpace: 'nowrap',
                                        fontWeight: '500',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                    }}>
                                        {project.title}
                                    </div>
                                )}
                                
                                {/* The Yellow Pin */}
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: '#FAC30F', // Spybee Color
                                    borderRadius: '50%',
                                    border: '2px solid #000', // Black border
                                    zIndex: 2,
                                    boxShadow: selectedProjectId === project._id ? '0 0 0 4px rgba(250, 195, 15, 0.4)' : 'none',
                                    transition: 'all 0.3s ease'
                                }}></div>
                                {/* The Pin "Post" */}
                                <div style={{
                                    width: '2px',
                                    height: '14px',
                                    backgroundColor: '#000',
                                    marginTop: '-2px', // Join with the ball
                                    zIndex: 1
                                }}></div>
                            </div>
                        </Marker>
                    ) : null
                ))}
            </Map>
        </div>
    );
}
