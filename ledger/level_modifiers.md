# Ledger: Level Modifiers (Function × Level)

> **Status: scaffold (v0.0).** This entry will be populated during Phase 1.1 architecture audit. The Decision below reflects pre-audit state per STR-001 thesis v1.0. **This is the most hand-wavy section of the current architecture and needs the most rigorous audit pass.**

## Decision

Stratum applies level-specific modifiers to function weights via a 15 × 6 table (15 skills × 6 levels: IC, Senior IC, Manager, Director, VP, C-Suite). Level modifiers reflect the universal pattern that the operating surface shifts from Person↔Problem (the IC's interface) toward Person↔People (the executive's interface) as level rises. Concrete instances of this pattern:

- **Tribal Intelligence** at IC = 0.3 modifier; at C-Suite = 2.5 modifier
- **Trust-Building** jumps sharply at the Manager transition (1.0 → 1.8) — you cannot manage without trust
- **First Principles Thinking** peaks at Senior IC (1.2), dips at Manager (1.0 — enabling > solving), returns at C-Suite (1.2)
- **Strength of Character** at C-Suite = 2.5 — your integrity IS the institution

Combined weight: `W_final = W_function × M_level`. Gap = `(5 − S) × W_final`. Hiring threshold: `W_final ≥ 4.0` AND `S ≤ 2` = hard no.

**Audit priority for Phase 1.1:** each of the 90 cells needs defensible reasoning OR the table needs simplification. The current values were derived from first-principles reasoning + practitioner experience, not from data — the audit must either ground each cell or shrink the table to a smaller defensible structure.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| *(populated during Phase 1.1 audit)* | | |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| *(populated during Phase 1.1 audit)* | | |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold; populated in Phase 1.1.

---

*Ledger entry per Stratum Phase 1.0 deliverable D4. Source: [PLN-020](../STAGE1.md).*
