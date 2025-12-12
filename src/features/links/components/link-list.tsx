"use client";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Link as LinkType } from "@prisma/client";
import { useState, useEffect } from "react";
import LinkItem from "./link-item";
import { reorderLinksAction } from "../actions";

interface LinkListProps {
    links: LinkType[];
}

export default function LinkList({ links: initialLinks }: LinkListProps) {
    const [links, setLinks] = useState(initialLinks);

    // Sync state with props if they change (server revalidation)
    useEffect(() => {
        setLinks(initialLinks);
    }, [initialLinks]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setLinks((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);

                // Optimistic update done, trigger server action
                // Map new items to {id, order}
                const updates = newItems.map((item, index) => ({
                    id: item.id,
                    order: index
                }));

                reorderLinksAction(updates); // Fire and forget (optimistic)

                return newItems;
            });
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={links.map((l) => l.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {links.map((link) => (
                        <LinkItem key={link.id} link={link} />
                    ))}
                    {links.length === 0 && (
                        <div className="text-center py-12 text-slate-500 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
                            No links yet. Add one above!
                        </div>
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
}
