/**
 * Cookie Signing Utilities
 *
 * Provides HMAC-SHA256 signing for cookie values to prevent forgery.
 * Uses Web Crypto API for Edge Runtime compatibility.
 *
 * Format: {value}.{signature}
 * Where signature = HMAC-SHA256(value, COOKIE_SECRET)
 */

const COOKIE_SECRET = process.env.COOKIE_SECRET || "dev-secret-change-in-production";

// Cache the crypto key to avoid re-importing on every call
let cachedKey: CryptoKey | null = null;

async function getSigningKey(): Promise<CryptoKey> {
    if (cachedKey) return cachedKey;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(COOKIE_SECRET);

    cachedKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
    );

    return cachedKey;
}

/**
 * Sign a cookie value with HMAC-SHA256.
 * @param value - The raw value to sign
 * @returns Signed value in format: value.signature
 */
export async function signCookie(value: string): Promise<string> {
    const key = await getSigningKey();
    const encoder = new TextEncoder();
    const data = encoder.encode(value);

    const signature = await crypto.subtle.sign("HMAC", key, data);
    const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

    return `${value}.${signatureBase64}`;
}

/**
 * Verify and extract the original value from a signed cookie.
 * @param signedValue - The signed cookie value (format: value.signature)
 * @returns Original value if valid, null if tampered or invalid format
 */
export async function verifyCookie(signedValue: string): Promise<string | null> {
    const lastDotIndex = signedValue.lastIndexOf(".");
    if (lastDotIndex === -1) return null;

    const value = signedValue.substring(0, lastDotIndex);
    const signature = signedValue.substring(lastDotIndex + 1);

    // Re-sign the value and compare
    const expectedSigned = await signCookie(value);
    const expectedSignature = expectedSigned.substring(expectedSigned.lastIndexOf(".") + 1);

    // Timing-safe comparison
    if (signature.length !== expectedSignature.length) return null;

    let match = true;
    for (let i = 0; i < signature.length; i++) {
        if (signature[i] !== expectedSignature[i]) match = false;
    }

    return match ? value : null;
}
