export const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);
export const toMeters = (decimeters) => `${(decimeters / 10).toFixed(1)} m`;
export const toKilograms = (hectograms) => `${(hectograms / 10).toFixed(1)} kg`;