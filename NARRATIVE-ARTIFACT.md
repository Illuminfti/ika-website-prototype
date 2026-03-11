# Ika Website Narrative Artifact Pack

**Version:** 2.0  
**Created:** 2026-03-11  
**Purpose:** Production-ready copy + implementation redlines for engineering  

---

## Narrative Spine

**Core thesis:** Ika is the infrastructure layer for institutional-grade cross-chain execution. Not a bridge. Not a relayer. A new cryptographic primitive that makes every chain indistinguishable from a local wallet.

**Tone:** Capital markets precision. Zero theatre. Every sentence earns its place.

**Differentiation anchors:**
1. 2PC-MPC: key never reconstructed, mathematically impossible to compromise
2. Sub-second: 10,000× faster than legacy MPC
3. Universal: any ECDSA/EdDSA chain, not pair-specific
4. Agent-native: programmable policies for AI agents, not just human operators

---

## Section-by-Section Copy

### HERO

**Status pill:** `LIVE ON SOLANA & SUI`

**Headline:**
> **The key that doesn't exist.**

**Sub-headline:**
> Your code signs on any chain. The private key is never in one place.

**Body:**
> Ika splits every signature across hundreds of nodes using 2PC-MPC. No single party ever holds your key. Not even us. Sub-second. Trustless. Every chain.

**CTAs:**
- Primary: `Start Building →` → `https://docs.ika.network`
- Secondary: `Read the Docs` → `https://docs.ika.network`

---

### METRICS BAR

| 10,000× | < 1s | 100+ |
|---------|------|------|
| Faster than legacy MPC | Signing latency | Validator nodes |

---

### HOW IT WORKS / BUILT DIFFERENT

**Section header:** `How it works.`

**Intro:** `Not another bridge. Not another MPC committee. A new cryptographic primitive.`

#### 01 — SPEED

**Headline:** `While they wait, you ship.`

> Legacy MPC: 30 seconds. Ika: under one. That's not an improvement. That's a different category.

#### 02 — TRUST MODEL

**Headline:** `Nobody holds your key.`

> Not Ika. Not any node. Not any committee. 2PC-MPC ensures the full private key never exists anywhere, ever. Not trust-minimized. Trustless.

#### 03 — SCALE

**Headline:** `8 nodes is a toy.`

> Every MPC network you've heard of maxes out at 4-8 signers. Ika runs hundreds in parallel. Same speed. No ceiling.

#### 04 — PROGRAMMABILITY

**Headline:** `Your rules. Their chains.`

> Write signing policies as Move smart contracts. Require 3-of-5 approval. Cap daily spend. Gate by on-chain conditions. Your logic controls keys on every chain.

#### 05 — UNIVERSALITY

**Headline:** `If it has a private key, Ika signs it.`

> Bitcoin. Ethereum. Solana. Cosmos. Any chain that supports ECDSA or EdDSA. Not wrapped tokens. Not relayed messages. Real, native signatures that the destination chain can't distinguish from a local wallet.

---

### THE PROBLEM

**Section header:** `The problem`

**Headline:** `$2.8 billion lost to bridges.`

> Bridges get hacked because they ask you to trust middlemen with your assets. MPC committees max out at 8 signers and call it "decentralized." Wrapped tokens are IOUs. The entire cross-chain stack is built on trust assumptions that keep breaking.

---

### THE IKA APPROACH

**Section header:** `The Ika approach`

**Headline:** `What if the key never existed?`

> Ika doesn't store your private key, split it into shares, or hand it to a committee. The full key never exists anywhere, at any point, ever. 2PC-MPC is a new cryptographic primitive: two parties jointly compute a signature without either one being able to reconstruct the key. Not trust-minimized. Mathematically impossible to compromise.

---

### USE CASES (Bento Grid)

**Section header:** `Build with Ika`

**Headline:** `Things that weren't possible before.`

#### Programmable Custody
> Fireblocks-grade custody, but permissionless. Write your own signing policies in Move. No vendor lock-in. No monthly invoices.

#### Real Bitcoin DeFi
> Not wBTC. Not an IOU. Your Solana program holds a real Bitcoin UTXO and signs real Bitcoin transactions. The Bitcoin network can't tell the difference.

#### Unified Liquidity
> Borrow against ETH on Solana. Lend USDC into an Arbitrum vault. One interface, every chain's liquidity. No fragmentation.

#### Chain-Abstracted Wallets
> One wallet address. Every chain. Social recovery, spending limits, multi-sig. All enforced cryptographically, not by a centralized server.

#### AI Agents with Keys
> Let AI agents trade across chains with hard cryptographic limits. They can sign, but only within the policy your Move contract enforces. No trust required.

#### Cross-chain Restaking
> Stake ETH to secure a Solana protocol. Use BTC as collateral for a Cosmos validator. Economic security that flows wherever it's needed.

---

### COMPARISON

**Section header:** `Why Ika`

**Headline:** `Not another bridge.`

|  | Ika | Bridges | Legacy MPC | Multisig |
|--|-----|---------|-----------|----------|
| Latency | < 1 second | Minutes | 30+ seconds | Manual |
| Trust | Zero-trust | Trusted relayers | Trusted committee | Trusted signers |
| Key security | Non-collusive | N/A | Collusion risk | Key exposure |
| Programmability | Move smart contracts | Limited | None | None |
| Chains | Universal | Pair-specific | Limited | Per-chain |

**Chain logos:** Bitcoin, Ethereum, Solana, Sui, Aptos, Cosmos, Polkadot, Arbitrum

---

### FINAL CTA

**Headline:** `The key that doesn't exist is waiting for you.`

**Sub-headline:** `Your code. Any chain's signature. Under a second. Start building what wasn't possible until now.`

**CTA:** `Start Building →` → `https://docs.ika.network`

---

## Implementation Redlines

These are the specific changes engineering needs to patch the live hero and proof sections without guessing.

### Hero Section

| Element | Current | Change To |
|---------|---------|-----------|
| Status pill | `NOW LIVE ON SOLANA` | `LIVE ON SOLANA & SUI` |
| Headline | `The key thatdoesn't exist.` (broken line) | `The key that doesn't exist.` |
| Sub-headline | Current is fine | Keep as-is |
| Metrics | `10,000× Faster than any MPC network` | `10,000× Faster than legacy MPC` |
| Metric middle | `< 1s Time to sign` | `< 1s Signing latency, any chain` |
| Metric right | `100+ Nodes. Zero hold your key.` | `100+ Validator nodes` |

### Proof Strip (How It Works)

| Element | Current | Change To |
|---------|---------|-----------|
| Section header | `How it works.` | Keep as-is |
| Card 01 headline | `While theywait, you ship.` (broken) | `While they wait, you ship.` |
| Card 02 headline | `Nobody holdsyour key.` (broken) | `Nobody holds your key.` |
| Card 03 headline | `8 nodes isa toy.` (broken) | `8 nodes is a toy.` |
| Card 04 headline | `Your rules.Theier chains.` (broken) | `Your rules. Their chains.` |
| Card 05 headline | `If it has aprivate key, Ika signs it.` (broken) | `If it has a private key, Ika signs it.` |

### Key Observations

1. **Line-break bugs:** Several headlines have missing spaces where line breaks were inserted incorrectly. Fix: ensure proper word spacing in all headlines.

2. **Status pill update:** The live site shows "NOW LIVE ON SOLANA" but the refined version should include Sui for completeness.

3. **Metrics tightening:** The middle metric ("Time to sign, any chain") should be shortened to match the rhythm of the other two metrics.

---

## What Materially Changed

1. **Line-break fixes:** All broken-headline issues resolved (5 headlines had missing spaces)
2. **Status pill expansion:** Added Sui to align with product reality
3. **Metrics bar rhythm:** Tightened middle metric to match two-word pattern
4. **Capital-markets language:** Replaced softer phrases with sharper equivalents:
   - "Faster than any MPC network" → "Faster than legacy MPC"
   - "Time to sign" → "Signing latency"
   - "Nodes. Zero hold your key." → "Validator nodes" (metrics bar only; keep longer version in body)

---

## Next-Step Recommendation

**Priority:** Medium-Low (cosmetic only)

The current live copy is already 90% aligned with this artifact. The primary value is:
1. Documenting the canonical version for future iterations
2. Fixing the 5 line-break bugs in headlines
3. Updating the status pill to include Sui

**Action:** Hand off to engineering for hero/proof patch. No design changes required.

---

**Proof of completion:**
- Artifact written to: `/tmp/ika-prototype/NARRATIVE-ARTIFACT.md`
- This file contains full narrative spine, section copy, and implementation redlines
