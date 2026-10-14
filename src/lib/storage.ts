import { UserProfile } from "@/types/sat";
import { createInitialStats } from "@/lib/scoring";

const STORAGE_KEY = "sat_adaptive_profiles_v1";
const ACTIVE_USER_KEY = "sat_adaptive_active_user";
const BACKUP_PROFILE_KEY = "sat_adaptive_last_profile";

export function getStoredProfiles(): Record<string, UserProfile> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch (e) {
    console.error("Failed to load profiles:", e);
    return {};
  }
}

export function saveProfiles(profiles: Record<string, UserProfile>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.error("Failed to save profiles:", e);
  }
}

export function getActiveUsername(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACTIVE_USER_KEY);
}

export function setActiveUsername(username: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (username) {
      localStorage.setItem(ACTIVE_USER_KEY, username.trim().toLowerCase());
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY);
    }
  } catch (e) {
    console.error("Failed to set active username:", e);
  }
}

/**
 * Searches stored profiles case-insensitively by username or display name,
 * with backup recovery.
 */
export function findProfile(identifier: string): UserProfile | null {
  const clean = identifier.trim().toLowerCase();
  if (!clean) return null;

  const profiles = getStoredProfiles();

  // 1. Exact key match
  if (profiles[clean]) return profiles[clean];

  // 2. Case-insensitive key or property search
  for (const key of Object.keys(profiles)) {
    const p = profiles[key];
    if (
      key.toLowerCase() === clean ||
      p.username.toLowerCase() === clean ||
      (p.displayName && p.displayName.toLowerCase() === clean)
    ) {
      return p;
    }
  }

  // 3. Fallback to backup profile if matches
  if (typeof window !== "undefined") {
    try {
      const backupRaw = localStorage.getItem(BACKUP_PROFILE_KEY);
      if (backupRaw) {
        const backup = JSON.parse(backupRaw) as UserProfile;
        if (
          backup &&
          (backup.username.toLowerCase() === clean ||
            (backup.displayName && backup.displayName.toLowerCase() === clean))
        ) {
          return backup;
        }
      }
    } catch {
      // ignore
    }
  }

  return null;
}

/**
 * Loads the active user's profile across sessions.
 * Falls back to the latest saved profile if the active username pointer was lost.
 */
export function getActiveProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const activeUsername = getActiveUsername();
    if (activeUsername) {
      const profile = findProfile(activeUsername);
      if (profile) return profile;
    }

    // Direct backup fallback: recover the last session's profile
    const backupRaw = localStorage.getItem(BACKUP_PROFILE_KEY);
    if (backupRaw) {
      const backup = JSON.parse(backupRaw) as UserProfile;
      if (backup && backup.username) {
        // Restore active username pointer
        setActiveUsername(backup.username);
        return backup;
      }
    }

    // If there's only 1 profile stored, auto-load it
    const profiles = getStoredProfiles();
    const profileKeys = Object.keys(profiles);
    if (profileKeys.length === 1) {
      const single = profiles[profileKeys[0]];
      setActiveUsername(single.username);
      return single;
    }
  } catch (e) {
    console.error("Error loading active profile:", e);
  }
  return null;
}

export function getAllProfilesList(): UserProfile[] {
  const profiles = getStoredProfiles();
  return Object.values(profiles).sort((a, b) => {
    return new Date(b.lastActive || 0).getTime() - new Date(a.lastActive || 0).getTime();
  });
}

export type LoginResult =
  | { success: true; profile: UserProfile; isNew: boolean }
  | { success: false; error: string; existingProfile?: UserProfile };

export function loginOrRegister(username: string, pin: string): LoginResult {
  const cleanUser = username.trim().toLowerCase();
  const cleanPin = pin.trim();

  if (!cleanUser) {
    return { success: false, error: "Please enter your name." };
  }

  const existing = findProfile(cleanUser);

  if (existing) {
    // If PIN is provided and doesn't match
    if (existing.pin && cleanPin && existing.pin !== cleanPin) {
      return {
        success: false,
        error: "Incorrect PIN for this username. Please try again.",
        existingProfile: existing,
      };
    }

    // PIN matched or PIN not required
    existing.lastActive = new Date().toISOString();
    saveUserProfile(existing);
    setActiveUsername(cleanUser);
    return { success: true, profile: existing, isNew: false };
  }

  // Create new profile
  if (!cleanPin || cleanPin.length < 4) {
    return { success: false, error: "PIN must be at least 4 digits for a new account." };
  }

  const newProfile: UserProfile = {
    username: cleanUser,
    displayName: username.trim(),
    pin: cleanPin,
    math: createInitialStats(),
    readingWriting: createInitialStats(),
    history: [],
    lastActive: new Date().toISOString(),
  };

  saveUserProfile(newProfile);
  setActiveUsername(cleanUser);
  return { success: true, profile: newProfile, isNew: true };
}

export function saveUserProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;
  try {
    const cleanUser = profile.username.trim().toLowerCase();
    const profiles = getStoredProfiles();

    // Preserve history length up to 500 attempts to prevent localStorage overflow
    const trimmedHistory = profile.history.slice(0, 500);

    const updated: UserProfile = {
      ...profile,
      username: cleanUser,
      displayName: profile.displayName || profile.username,
      history: trimmedHistory,
      lastActive: new Date().toISOString(),
    };

    profiles[cleanUser] = updated;
    saveProfiles(profiles);

    // Save as primary backup profile
    localStorage.setItem(BACKUP_PROFILE_KEY, JSON.stringify(updated));
    setActiveUsername(cleanUser);
  } catch (e) {
    console.error("Failed to save user profile:", e);
  }
}
