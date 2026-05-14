'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

type GalleryItem = {
    id: string;
    image: string;
    title?: string | null;
    description?: string | null;
};

type Props = {
    gallery: GalleryItem[];
};

export default function ProjectGalleryLightbox({
    gallery,
}: Props) {
    const [index, setIndex] =
        useState<number>(-1);

    return (
        <>
            <div
                className="grid gap-px grid-cols-1 md:grid-cols-2"
                style={{
                    background: 'var(--color-dark4)',
                }}
            >
                {gallery.map((project: any, i: number) => {
                    const spanClass =
                        i % 4 === 0
                            ? 'md:row-span-2'
                            : i % 4 === 1
                                ? 'md:row-span-1'
                                : i % 4 === 2
                                    ? 'md:row-span-1'
                                    : 'md:row-span-2';

                    const heightClass =
                        i % 4 === 0
                            ? 'h-[600px]'
                            : i % 4 === 1
                                ? 'h-[280px]'
                                : i % 4 === 2
                                    ? 'h-[420px]'
                                    : 'h-[600px]';

                    return (
                        <div
                            key={project.id}
                            onClick={() =>
                                setIndex(i)
                            }
                            className={`group block ${spanClass}`}
                        >
                            <div
                                className={`relative ${heightClass} overflow-hidden`}
                            >

                                {/* Background image */}
                                <div
                                    className="
                                  absolute inset-0
                                  bg-cover bg-center
                                  transition-all duration-700
                                  scale-100 group-hover:scale-110
                                "
                                    style={{
                                        backgroundImage: `url(${project.image})`,
                                    }}
                                />

                                {/* Main luxury overlay */}
                                <div
                                    className="
                                absolute inset-0
                                opacity-0 group-hover:opacity-100
                                transition-all duration-700
                                bg-gradient-to-t
                                from-black via-black/40 to-transparent
                                backdrop-blur-[2px]
                              "
                                />

                                {/* Diagonal sweep */}
                                <div className="absolute top-0 -left-[120%] w-[60%] h-full bg-white/10 skew-x-[-25deg] group-hover:left-[160%] transition-all duration-1000" />

                                {/* Gold border animation */}
                                <div className="absolute inset-6 border border-transparent group-hover:border-[var(--color-primary)] transition-all duration-700" />

                                {/* Content */}
                                <div className="absolute inset-0 z-20 flex items-end p-6 md:p-10">
                                    <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">

                                        <h3
                                            style={{
                                                fontFamily: "var(--font-playfair)",
                                                fontSize: "1.8rem",
                                                fontWeight: 700,
                                                color: "var(--color-white)",
                                                marginBottom: ".5rem",
                                            }}
                                        >
                                            {project.title}
                                        </h3>

                                        <p
                                            style={{
                                                fontSize: ".85rem",
                                                color: "rgba(255,255,255,.75)",
                                            }}
                                        >
                                            {project.description}
                                        </p>

                                    </div>
                                </div>

                            </div>
                        </div>
                    );
                })}


            </div>
            <Lightbox
                open={index >= 0}
                close={() => setIndex(-1)}
                index={index}
                slides={gallery.map((item) => ({
                    src: item.image,
                    title: item.title || '',
                    description:
                        item.description || '',
                }))}
                plugins={[
                    Zoom,
                    Counter,
                    Thumbnails,
                ]}
                render={{
                    slideHeader: ({
                        slide,
                    }: any) => (
                        <div className="absolute left-0 top-0 z-50 w-[380px] p-10 flex flex-col justify-end bg-gradient-to-r from-black/95 via-black/80 to-transparent">
                            {slide.title && (
                                <h2
                                    style={{
                                        fontFamily:
                                            'var(--font-playfair)',
                                        fontSize: '2rem',
                                        fontWeight: 700,
                                        color:
                                            'var(--color-white)',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    {slide.title}
                                </h2>
                            )}

                            {slide.description && (
                                <p
                                    style={{
                                        fontSize: '.9rem',
                                        lineHeight: 1.8,
                                        color:
                                            'rgba(255,255,255,.75)',
                                    }}
                                >
                                    {slide.description}
                                </p>
                            )}
                        </div>
                    ),
                }}
            />
            {/* <Lightbox
                open={index >= 0}
                close={() =>
                    setIndex(-1)
                }
                index={index}
                slides={gallery.map(
                    (item) => ({
                        src: item.image,
                        title:
                            item.title ||
                            '',
                        description:
                            item.description ||
                            '',
                    })
                )}
                plugins={[
                    Zoom,
                    Counter,
                    Thumbnails,
                ]}
            /> */}
        </>
    );
}