"use client";

import { createLinkAction } from "../actions";
import { useState } from "react";

interface AddLinkModalProps {
    onClose: () => void;
}

export default function AddLinkModal({ onClose }: AddLinkModalProps) {
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        await createLinkAction(formData);
        setIsPending(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="glass rounded-2xl p-8 w-full max-w-md animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-6">Add New Link</h2>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="My awesome link"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">URL</label>
                        <input
                            name="url"
                            type="url"
                            placeholder="https://example.com"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Icon</label>
                        <div className="grid grid-cols-6 gap-2">
                            {/* Simplified Icon Picker for now */}
                            {['🚀', '📧', '🎥', '☕', '✨', '💼', '🐦', '📷', '🎵', '🛒'].map((emoji) => (
                                <label key={emoji} className="cursor-pointer">
                                    <input type="radio" name="icon" value={emoji} className="peer sr-only" defaultChecked={emoji === '🚀'} />
                                    <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl text-xl hover:border-slate-600 peer-checked:bg-primary-500/20 peer-checked:border-primary-500 flex items-center justify-center">
                                        {emoji}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center"
                        >
                            {isPending ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'Add Link'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
