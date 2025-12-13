"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link as LinkType } from "@prisma/client";
import { deleteLinkAction, toggleLinkAction } from "../actions";
import { useState } from "react";
import EditLinkModal from "./edit-link-modal";

interface LinkItemProps {
    link: LinkType;
}

export default function LinkItem({ link }: LinkItemProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: link.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : "auto",
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className={`glass rounded-2xl p-5 hover-lift group ${!link.isEnabled ? "opacity-60" : ""
                    }`}
            >
                <div className="flex items-center gap-4">
                    {/* Drag Handle */}
                    <div
                        {...attributes}
                        {...listeners}
                        className="drag-handle p-2 text-muted hover:text-foreground transition-colors cursor-grab active:cursor-grabbing"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        </svg>
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-input flex items-center justify-center shrink-0 text-xl border border-border">
                        {link.icon || "🔗"}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{link.title}</h3>
                        <p className="text-sm text-muted truncate">{link.url}</p>
                    </div>

                    {/* Stats */}
                    <div className="text-right hidden sm:block">
                        <div className="text-lg font-semibold">{link.clicks.toLocaleString()}</div>
                        <div className="text-xs text-muted">clicks</div>
                    </div>

                    {/* Toggle */}
                    <button
                        onClick={() => toggleLinkAction(link.id)}
                        className={`relative w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${link.isEnabled ? "bg-primary-500" : "bg-input"
                            }`}
                    >
                        <span
                            className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${link.isEnabled ? "translate-x-5" : ""
                                }`}
                        ></span>
                    </button>

                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="p-2 hover:bg-input rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => deleteLinkAction(link.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4 text-muted hover:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <EditLinkModal link={link} onClose={() => setIsEditModalOpen(false)} />
            )}
        </>
    );
}
