"use client";

import { useState, useTransition } from "react";
import { switchProfileAction, createProfileAction } from "@/features/profile/actions";
import { AuthProfile } from "@/lib/auth";

interface ProfileSwitcherProps {
    profiles: AuthProfile[];
    activeProfileId: string;
}

export default function ProfileSwitcher({ profiles, activeProfileId }: ProfileSwitcherProps) {
    const [isPending, startTransition] = useTransition();
    const [showCreateForm, setShowCreateForm] = useState(profiles.length === 0);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleSwitch = (profileId: string) => {
        if (profileId === "CREATE_NEW") {
            setShowCreateForm(true);
            return;
        }
        startTransition(async () => {
            await switchProfileAction(profileId);
        });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) {
            setError("Username is required");
            return;
        }
        setError("");

        startTransition(async () => {
            const formData = new FormData();
            formData.append("username", username.trim());
            const result = await createProfileAction(formData);
            if (result?.error) {
                setError(result.error.username?.[0] || "Failed to create profile");
            } else {
                setShowCreateForm(false);
                setUsername("");
            }
        });
    };

    // If no profiles exist or creating new, show the create form
    if (showCreateForm) {
        return (
            <form onSubmit={handleCreate} className="space-y-3">
                <input
                    type="text"
                    placeholder="Enter username (e.g., johndoe)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isPending}
                    className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2 text-sm focus:outline-none focus:border-green-500"
                    autoFocus
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-3 rounded transition-colors disabled:opacity-50"
                    >
                        {isPending ? "Creating..." : "Create Profile"}
                    </button>
                    {profiles.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowCreateForm(false)}
                            className="text-gray-400 hover:text-white text-sm py-2 px-3"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        );
    }

    return (
        <select
            disabled={isPending}
            value={activeProfileId}
            onChange={(e) => handleSwitch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2 text-sm focus:outline-none focus:border-green-500"
        >
            {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                    @{p.username} {p.name ? `(${p.name})` : ""}
                </option>
            ))}
            <option value="CREATE_NEW">+ Create New Profile</option>
        </select>
    );
}
