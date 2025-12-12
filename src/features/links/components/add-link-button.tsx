"use client";

import { useState } from "react";
import AddLinkModal from "./add-link-modal";

export default function AddLinkButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/30"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Link
            </button>

            {isOpen && <AddLinkModal onClose={() => setIsOpen(false)} />}
        </>
    );
}
