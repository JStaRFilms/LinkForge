"use client";

import { useTransition, useRef } from "react";
import { addDomain, deleteDomain } from "../actions";

interface Domain {
    id: string;
    domain: string;
    verified: boolean;
}

export default function DomainSettings({ domains }: { domains: Domain[] }) {
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);

    const handleAdd = async (formData: FormData) => {
        startTransition(async () => {
            const result = await addDomain(formData);
            if (result.error) {
                alert(result.error);
            } else {
                formRef.current?.reset();
            }
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this domain?")) return;
        startTransition(async () => {
            const result = await deleteDomain(id);
            if (result.error) {
                alert(result.error);
            }
        });
    };

    return (
        <div className="glass rounded-2xl p-6 mt-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold">Custom Domains</h2>
                    <p className="text-sm text-muted">Connect your own domain (e.g., example.com)</p>
                </div>
            </div>

            {/* Add Domain Form */}
            <form ref={formRef} action={handleAdd} className="flex gap-3 mb-6">
                <input
                    name="domain"
                    type="text"
                    placeholder="yourdomain.com"
                    className="flex-1 bg-input border-transparent focus:border-ring focus:ring-2 focus:ring-ring/20 rounded-xl px-4 py-2 outline-none transition-all"
                    required
                    disabled={isPending}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Adding..." : "Add Domain"}
                </button>
            </form>

            {/* Domain List */}
            <div className="space-y-3">
                {domains.map((domain) => (
                    <div
                        key={domain.id}
                        className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-2 h-2 rounded-full ${domain.verified ? "bg-emerald-500" : "bg-amber-500"
                                    }`}
                            />
                            <span className="font-medium">{domain.domain}</span>
                            {!domain.verified && (
                                <span className="text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                                    Unverified
                                </span>
                            )}
                        </div>
                        <button
                            onClick={() => handleDelete(domain.id)}
                            disabled={isPending}
                            className="text-muted hover:text-red-500 transition-colors p-2"
                            title="Remove Domain"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                        </button>
                    </div>
                ))}

                {domains.length === 0 && (
                    <div className="text-center py-6 text-muted text-sm border-2 border-dashed border-border/50 rounded-xl">
                        No custom domains connected yet.
                    </div>
                )}
            </div>

            {/* Instructions */}
            {domains.length > 0 && (
                <div className="mt-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl text-sm border border-border">
                    <p className="font-medium mb-2">DNS Configuration</p>
                    <p className="text-muted mb-2">
                        Add a CNAME record to your DNS provider:
                    </p>
                    <div className="flex items-center gap-4 font-mono text-xs bg-background p-2 rounded-lg border border-border">
                        <span>Type: <strong className="text-foreground">CNAME</strong></span>
                        <span>Target: <strong className="text-foreground">link.jstarstudios.com</strong></span>
                    </div>
                </div>
            )}
        </div>
    );
}
