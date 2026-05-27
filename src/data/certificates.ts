/**
 * Certificates — stored data, NOT rendered in v1 (per PLAN.md non-goals).
 * Populate freely; UI will be added in a later pass.
 */

export interface Certificate {
  title: string;
  issuer: string;
  issuedAt: string; // ISO date (YYYY-MM or YYYY-MM-DD)
  credentialUrl?: string;
  credentialId?: string;
  skills?: string[];
}

export const certificates: Certificate[] = [];
