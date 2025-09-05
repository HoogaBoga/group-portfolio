"use client"

import React, { useState, useEffect, useRef } from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
}

interface ProjectInfo {
    title: string;
    description: string;
    image: string;
}

function ProjectCard({ title, description, image }: ProjectCardProps) {
    return (
        <div className="bg-black rounded-xl shadow-lg p-6 mb-4 min-h-[280px] border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-white text-2xl font-bold">
                    {title.split(' ')[0]}
                </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                {title}
            </h3>
            <p className="text-white text-sm leading-relaxed line-clamp-4">
                {description}
            </p>
        </div>
    );
}

interface CarouselColumnProps {
    items: ProjectInfo[];
    direction: 'up' | 'down';
    speed?: number;
    onHoverChange: (isHovered: boolean) => void;
}

function CarouselColumn({ items, direction, speed = 50, onHoverChange }: CarouselColumnProps) {
    const [translateY, setTranslateY] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isManualScrolling, setIsManualScrolling] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Duplicate items for seamless scrolling
    const duplicatedItems = [...items, ...items];

    useEffect(() => {
        if (isPaused || isManualScrolling) return;

        const interval = setInterval(() => {
            setTranslateY(prev => {
                const contentHeight = contentRef.current?.scrollHeight || 0;
                const containerHeight = containerRef.current?.clientHeight || 0;
                const itemHeight = contentHeight / 2; // Since we duplicated items

                if (direction === 'up') {
                    const newValue = prev - 1;
                    return newValue <= -itemHeight ? 0 : newValue;
                } else {
                    const newValue = prev + 1;
                    return newValue >= 0 ? -itemHeight : newValue;
                }
            });
        }, speed);

        return () => clearInterval(interval);
    }, [isPaused, isManualScrolling, direction, speed]);

    const handleMouseEnter = () => {
        setIsPaused(true);
        onHoverChange(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        onHoverChange(false);
        setTimeout(() => setIsManualScrolling(false), 100);
    };

    const handleScroll = (e: React.WheelEvent) => {
        if (!isPaused) return;

        e.preventDefault();
        e.stopPropagation();
        setIsManualScrolling(true);

        const contentHeight = contentRef.current?.scrollHeight || 0;
        const itemHeight = contentHeight / 2;
        const delta = e.deltaY;

        setTranslateY(prev => {
            const newValue = prev - delta * 0.5;
            if (newValue <= -itemHeight) return 0;
            if (newValue >= 0) return -itemHeight;
            return newValue;
        });
    };

    return (
        <div
            ref={containerRef}
            className="h-full overflow-hidden relative cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onWheel={handleScroll}
        >
            <div
                ref={contentRef}
                className="transition-transform ease-linear"
                style={{
                    transform: `translateY(${translateY}px)`,
                    transitionDuration: isPaused || isManualScrolling ? '0ms' : '100ms'
                }}
            >
                {duplicatedItems.map((project, index) => (
                    <ProjectCard
                        key={`${project.title}-${index}`}
                        {...project}
                    />
                ))}
            </div>

            {/* Gradient overlays for seamless effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10" />
        </div>
    );
}

function Project() {
    const [isCarouselHovered, setIsCarouselHovered] = useState(false);
    const [hoveredColumns, setHoveredColumns] = useState(new Set<number>());

    const projectInfo: ProjectInfo[] = [
        {
            title: "Linya Pub - 2025",
            description: "Linya Publication is a student-run organization dedicated to delivering news and stories about iACADEMY's events and activities. Built with Laravel and powered by AWS (EC2, RDS, and S3), Linya provides students with a reliable and accessible platform for campus updates.",
            image: "",
        },
        {
            title: "Roam Rome - 2024",
            description: "A responsive travel website built using Tailwind CSS and TypeScript that showcases tourist attractions in Rome. The site features an elegant design with interactive elements, allowing users to explore famous landmarks, historical sites, and local experiences in the Eternal City.",
            image: "",
        },
        {
            title: "TaskTracker - 2024",
            description: "Task-Management-System is a web application built with Laravel, TailwindCSS, and Supabase. It is designed for managing your own tasks efficiently, providing a clean interface and robust backend for personal productivity.",
            image: "",
        },
        {
            title: "EcoStore - 2024",
            description: "An e-commerce platform focused on sustainable products. Built with React and Node.js, featuring inventory management, payment processing, and environmental impact tracking for conscious consumers.",
            image: "",
        },
        {
            title: "MindSpace - 2023",
            description: "A mental wellness application that combines meditation, mood tracking, and community support. Developed using Flutter and Firebase, providing cross-platform accessibility for mental health resources.",
            image: "",
        },
        {
            title: "MindSpace - 2023",
            description: "A mental wellness application that combines meditation, mood tracking, and community support. Developed using Flutter and Firebase, providing cross-platform accessibility for mental health resources.",
            image: "",
        },
        {
            title: "MindSpace - 2023",
            description: "A mental wellness application that combines meditation, mood tracking, and community support. Developed using Flutter and Firebase, providing cross-platform accessibility for mental health resources.",
            image: "",
        }
    ];

    const column1 = projectInfo.filter((_, index) => index % 3 === 0);
    const column2 = projectInfo.filter((_, index) => index % 3 === 1);
    const column3 = projectInfo.filter((_, index) => index % 3 === 2);

    const handleColumnHover = (columnIndex: number, isHovered: boolean) => {
        setHoveredColumns(prev => {
            const newSet = new Set(prev);
            if (isHovered) {
                newSet.add(columnIndex);
            } else {
                newSet.delete(columnIndex);
            }
            return newSet;
        });

        setIsCarouselHovered(isHovered || hoveredColumns.size > 0);
    };

    // Lock/unlock body scroll based on carousel hover state
    useEffect(() => {
        const body = document.body;
        const shouldLock = hoveredColumns.size > 0;

        if (shouldLock) {
            // Only lock if not already locked
            if (!body.hasAttribute('data-scroll-locked')) {
                // Calculate scrollbar width to prevent layout shift
                const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

                // Store the current scroll position before locking
                const scrollY = window.scrollY;

                // Apply lock styles using overflow hidden instead of position fixed
                body.style.overflow = 'hidden';
                body.style.paddingRight = `${scrollbarWidth}px`;
                body.style.height = '100vh';

                // Mark as locked and store scroll position
                body.setAttribute('data-scroll-locked', 'true');
                body.setAttribute('data-scroll-y', scrollY.toString());
            }
        } else {
            // Only unlock if currently locked
            if (body.hasAttribute('data-scroll-locked')) {
                // Clear all lock styles
                body.style.overflow = '';
                body.style.paddingRight = '';
                body.style.height = '';
                body.removeAttribute('data-scroll-locked');
                body.removeAttribute('data-scroll-y');
            }
        }

        return () => {
            // Cleanup on unmount - only if locked
            if (body.hasAttribute('data-scroll-locked')) {
                body.style.overflow = '';
                body.style.paddingRight = '';
                body.style.height = '';
                body.removeAttribute('data-scroll-locked');
                body.removeAttribute('data-scroll-y');
            }
        };
    }, [hoveredColumns.size]);

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="font-inter font-bold text-[64px] underline text-brand-white text-center text-stroke-shadow">Our Projects</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[600px] w-full">
                    <CarouselColumn
                        items={column1}
                        direction="up"
                        speed={90}
                        onHoverChange={(isHovered) => handleColumnHover(0, isHovered)}
                    />

                    <CarouselColumn
                        items={column2}
                        direction="down"
                        speed={90}
                        onHoverChange={(isHovered) => handleColumnHover(1, isHovered)}
                    />

                    <CarouselColumn
                        items={column3}
                        direction="up"
                        speed={90}
                        onHoverChange={(isHovered) => handleColumnHover(2, isHovered)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Project;
