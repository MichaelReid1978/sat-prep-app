import { UserProfile, SectionType } from "@/types/sat";
import { createInitialStats } from "@/lib/scoring";

const STORAGE_KEY = "sat_adaptive_profiles_v1";
const ACTIVE_USER_KEY = "sat_adaptive_active_user";

export function getStoredProfiles(): Record<string, UserProfile> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
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
  if (username) {
    localStorage.setItem(ACTIVE_USER_KEY, username);
  } else {
    localStorage.removeItem(ACTIVE_USER_KEY);
  }
}

export function loginOrRegister(username: string, pin: string): { profile: UserProfile; isNew: boolean } | null {
  const cleanUser = username.trim().toLowerCase();
  const cleanPin = pin.trim();

  if (!cleanUser || !cleanPin) return null;

  const profiles = getStoredProfiles();
  const existing = profiles[cleanUser];

  if (existing) {
    if (existing.pin !== cleanPin) {
      // PIN mismatch
      return null;
    }
    existing.lastActive = new Date().toISOString();
    profiles[cleanUser] = existing;
    saveProfiles(profiles);
    setActiveUsername(cleanUser);
    return { profile: existing, isNew: false };
  }

  // Create new profile
  const newProfile: UserProfile = {
    username: cleanUser,
    pin: cleanPin,
    math: createInitialStats(),
    readingWriting: createInitialStats(),
    history: [],
    lastActive: new Date().toISOString(),
  };

  profiles[cleanUser] = newProfile;
  saveProfiles(profiles);
  setActiveUsername(cleanUser);
  return { profile: newProfile, isNew: true };
}

export function saveUserProfile(profile: UserProfile) {
  const profiles = getStoredProfiles();
  profiles[profile.username] = {
    ...profile,
    lastActive: new Date().toISOString(),
  };
  saveProfiles(profiles);
}
