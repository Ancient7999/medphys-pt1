# Chapter 1 — Matter & Mechanical Properties

---

## 1. Overview & learning map

### Intended outcomes

- Define a physical quantity and distinguish base vs derived quantities and unit systems.
- Compare solid, liquid, and gas (plus plasma / Bose–Einstein condensate (BEC)) with medical examples.
- Define elasticity, plasticity, ductility, malleability, and strength.
- Define stress and strain; state Hooke's law up to the elastic limit.
- Write and use Young's, Shear, and Bulk moduli.
- Link Young's modulus of bone to stiffness, osteoporosis, and fracture.

### Topics map

| Topic | Core idea |
|-------|-----------|
| Physical quantities | Measured property = number × unit |
| Unit systems | centimetre–gram–second (CGS), foot–pound–second (FPS), metre–kilogram–second (MKS), International System of Units (SI) (7 base units) |
| Phases of matter | Solid / liquid / gas; fluids = liquid + gas |
| Mechanical properties | Elasticity ↔ plasticity; ductility, malleability, strength |
| Stress & strain | F/A and ΔL/L₀ |
| Hooke's law | Stress ∝ strain up to elastic limit |
| Three moduli | Y (length), G (shape), B (volume) |
| Medical | Bone stiffness; vessel elasticity |

**Study order:** Units → Phases → Mechanical properties → Stress/Strain → Hooke → Moduli → Bone. Stress is meaningless without area; Hooke's law is meaningless without stress and strain.

---

## 2. Physical quantities & units

### Definition

A **physical quantity** is a property that can be **measured**, expressed by a **numerical value and a unit**, and that describes the state of a system.

```
Physical Quantity = Numerical Value × Unit
```

Examples: length = 5 m; mass = 70 kg; time = 10 s; temperature = 37 °C.  
Both parts matter — "5" alone is not a quantity; "metres" alone is not a quantity.

### Two families

| Family | Meaning | Examples |
|--------|---------|----------|
| **Fundamental / base** | Cannot be defined in terms of other quantities | Length, mass, time, temperature, current, luminous intensity, amount of substance |
| **Derived** | Built from base by × or ÷ | Area (L×L), speed (L/T), force (M·L/T²), pressure (force/area) |

### Four unit systems

| System | Base length / mass / time |
|--------|---------------------------|
| **centimetre–gram–second (CGS)** | centimetre, gram, second |
| **foot–pound–second (FPS)** | foot, pound (lb), second |
| **metre–kilogram–second (MKS)** | metre, kilogram, second |
| **International System of Units (SI)** | 7 base units |

### Seven International System of Units (SI) base units

| Quantity | Unit | Symbol |
|----------|------|--------|
| Length | metre | m |
| Mass | kilogram | kg |
| Time | second | s |
| Temperature | kelvin | K |
| Electric current | ampere | A |
| Luminous intensity | candela | Cd |
| Amount of substance | mole | mol |

---

## 3. Phases of matter

### What is matter?

Anything that has **mass** and **occupies space**. In the body: bones, blood, muscles, air in the lungs.  
Matter is composed of atoms and molecules. **Light is NOT matter** (photons have no rest mass and take up no volume).

Common states: **solid, liquid, gas**. Liquids and gases together are **fluids**.  
Additional states: **plasma** (ionised gas) and **Bose–Einstein condensate (BEC)** (near absolute zero).

### Three common states

| State | Shape / volume | Density & IMF | Compressibility | Medical example |
|-------|----------------|---------------|-----------------|-----------------|
| **Solid** | Definite shape & volume | High density; strong intermolecular forces | Cannot be compressed | Bone |
| **Liquid** | No definite shape; nearly fixed volume at constant pressure | Low–moderate density; moderate IMF | Not easily compressible | Blood |
| **Gas** | No definite shape or volume | Very low density; very weak IMF | Easily compressible | Air in the lungs |

### Key comparisons

| Property | Order |
|----------|-------|
| Intermolecular forces | Solid > Liquid > Gas |
| Diffusion rate | Gas > Liquid > Solid |
| Kinetic energy (T-dependent) | Gas > Liquid > Solid |
| Particle motion | Vibration (solid) → Flow (liquid) → Rapid/random (gas) |
| Compressibility | Gas > Liquid > Solid |

### Phase changes

<div class="phase-diagram" role="img" aria-label="Phase-change diagram linking solid, liquid, and gas">
<svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg" width="100%" height="auto">
  <defs>
    <linearGradient id="pgSolid" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="rgba(var(--accent-0-rgb),0.35)"/><stop offset="100%" stop-color="rgba(var(--accent-4-rgb),0.15)"/></linearGradient>
    <linearGradient id="pgLiquid" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="rgba(var(--accent-1-rgb),0.35)"/><stop offset="100%" stop-color="rgba(var(--accent-6-rgb),0.15)"/></linearGradient>
    <linearGradient id="pgGas" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="rgba(var(--accent-8-rgb),0.35)"/><stop offset="100%" stop-color="rgba(var(--accent-2-rgb),0.12)"/></linearGradient>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-0)"/></marker>
  </defs>
  <rect x="40" y="90" width="140" height="72" rx="12" fill="url(#pgSolid)" stroke="var(--accent-0)" stroke-width="2"/>
  <text x="110" y="132" text-anchor="middle" fill="var(--col-text-main)" font-family="Outfit,sans-serif" font-size="18" font-weight="600">Solid</text>
  <rect x="250" y="90" width="140" height="72" rx="12" fill="url(#pgLiquid)" stroke="var(--accent-1)" stroke-width="2"/>
  <text x="320" y="132" text-anchor="middle" fill="var(--col-text-main)" font-family="Outfit,sans-serif" font-size="18" font-weight="600">Liquid</text>
  <rect x="460" y="90" width="140" height="72" rx="12" fill="url(#pgGas)" stroke="var(--accent-8)" stroke-width="2"/>
  <text x="530" y="132" text-anchor="middle" fill="var(--col-text-main)" font-family="Outfit,sans-serif" font-size="18" font-weight="600">Gas</text>
  <!-- Melting / Freezing -->
  <path d="M185 108 H245" stroke="var(--accent-0)" stroke-width="2" marker-end="url(#arr)" fill="none"/>
  <text x="215" y="98" text-anchor="middle" fill="var(--accent-0)" font-size="11" font-family="Space Mono,monospace">melting</text>
  <path d="M245 144 H185" stroke="var(--accent-0)" stroke-width="2" marker-end="url(#arr)" fill="none"/>
  <text x="215" y="168" text-anchor="middle" fill="var(--col-text-muted)" font-size="11" font-family="Space Mono,monospace">freezing</text>
  <!-- Vaporization / Condensation -->
  <path d="M395 108 H455" stroke="var(--accent-1)" stroke-width="2" marker-end="url(#arr)" fill="none"/>
  <text x="425" y="98" text-anchor="middle" fill="var(--accent-1)" font-size="11" font-family="Space Mono,monospace">vaporization</text>
  <path d="M455 144 H395" stroke="var(--accent-1)" stroke-width="2" marker-end="url(#arr)" fill="none"/>
  <text x="425" y="168" text-anchor="middle" fill="var(--col-text-muted)" font-size="11" font-family="Space Mono,monospace">condensation</text>
  <!-- Sublimation / Deposition (arcs) -->
  <path d="M110 90 C110 28, 530 28, 530 90" stroke="var(--accent-8)" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <text x="320" y="24" text-anchor="middle" fill="var(--accent-8)" font-size="11" font-family="Space Mono,monospace">sublimation (solid → gas)</text>
  <path d="M530 162 C530 240, 110 240, 110 162" stroke="var(--col-text-muted)" stroke-width="2" fill="none" marker-end="url(#arr)"/>
  <text x="320" y="258" text-anchor="middle" fill="var(--col-text-muted)" font-size="11" font-family="Space Mono,monospace">deposition (gas → solid · e.g. CO₂ ↔ dry ice)</text>
</svg>
</div>

### Tip — ideal liquids

Ideal liquids are **not** compressible — but **no ideal liquid exists in nature**. Real liquids have tiny compressibility. Blood is ~95% water and behaves almost ideally under pressure, which is why pressure waves (pulse) travel through it predictably.

### Clinical notes

- **Diffusion:** O₂ moves from alveoli → blood by diffusion (short distance). Long-distance transport uses **bulk flow** (circulation).
- **Bone vs air:** bone resists compression (rigid lattice); lung air compresses/expands for ventilation.

---

## 4. Mechanical properties of solids

| Property | Definition |
|----------|------------|
| **Elasticity** | Original shape is **regained** when the external force is removed. Mechanical properties do **not** change. |
| **Plasticity** | Opposite of elasticity — **permanent deformation**; shape does **not** return. Many mechanical properties change. |
| **Ductility** | Ability to be drawn into thin wires. |
| **Malleability** | Ability to be hammered/rolled into sheets. |
| **Strength** | Ability to withstand applied stress **without failure**. |

### Memory cues

- Elastic ↔ returns; plastic ↔ stays deformed.
- Ductile ↔ wire (duct); malleable ↔ mallet (hammer).
- Bone is **strong and elastic within limits** — not ductile/malleable like metals.

### Clinical tip

Bone is a composite: **collagen** (elastic flex) + **hydroxyapatite** (compressive strength). Stiff enough to support, tough enough not to shatter under normal walking loads.  
Lack of elasticity of blood vessels contributes to cardiovascular disease.

---

## 5. Stress & strain

### Stress

**Stress** is the internal **restoring force** (response to an external deforming force) **per unit area**.

```
Stress = F / A
SI unit: N/m² = Pascal (Pa)
```

**How this formula is made:** F is the restoring force inside the material (newtons); A is the cross-sectional area that force acts through (m²). Stress is force divided by area — same push concentrated on a smaller area means larger stress. When you apply an external force, a restoring force develops in the opposite direction inside the material; that restoring force per unit area is stress.

### Strain

**Strain** is a measure of **deformation** relative to a reference dimension. Strain occurs **as a result of** stress.

```
Strain = (deformation in direction of force) / (original dimension)
For length: Strain = ΔL / L₀
Dimensionless — NO units
```

**How this formula is made:** ΔL is the change in length; L₀ is the original length. Strain is a ratio of two lengths, so the units cancel — it is a pure number. It answers “how much did the object stretch (or shorten) relative to how long it was?”

### Stress in the human body (examples)

- Blood pressure acting on vessel walls  
- Forces on the knee joint during walking  
- Pressure on teeth during chewing  

### Why thinner / weaker bone fractures more easily

Same force F through a smaller cross-section A → larger stress F/A. When stress exceeds strength → fracture. Osteoporosis reduces effective load-bearing area/density → higher stress for the same fall.

### Units check

- Strain is a ratio of lengths — if your value has units, it is wrong.  
- Stress is force per area — if your value has no units, it is wrong.

---

## 6. Hooke's law & the stress–strain curve

### Hooke's law

Within the **elastic (proportional) limit**, stress and strain are proportional; the object still returns to its original shape after unloading.

```
Stress ∝ Strain  (within elastic limit)
Stress = Modulus × Strain
Modulus = Stress / Strain
```

**How these are assembled (each form separately):**
- **Stress ∝ Strain:** within the elastic limit, doubling the stress doubles the strain — a direct proportion, not yet a full equation.
- **Stress = Modulus × Strain:** insert the constant of proportionality (the modulus) so the proportion becomes an equation you can calculate with.
- **Modulus = Stress / Strain:** rearrange to isolate that constant — how much stress you need per unit of strain. Larger modulus means stiffer material.

Beyond the elastic limit → **permanent (plastic) deformation**. At the **breaking point** the material fails.

### Three regimes

| Regime | Behaviour |
|--------|-----------|
| **1 · Elastic** | Approx. straight line; stress/strain constant; remove load → original shape |
| **2 · Plastic** | Curve flattens; permanent set; remove load → stays deformed |
| **3 · Fracture** | Breaking point — crack, snap, or shatter |

### Modulus of elasticity

The constant of proportionality is the **modulus of elasticity**. There are **three** moduli depending on geometry (next section): Young's (Y), Shear (G), Bulk (B).

**Golden sequence:** Hooke's law → proportionality. Modulus → the constant. Stress type → the geometry. Each modulus is Stress/Strain for one geometry.

---

## 7. Three types of stress & strain

### 1 · Longitudinal stress

Force along the **axis (length)** of the object.

- **Tensile** — ends pulled apart (stretch)  
- **Compressive** — ends pushed together  

```
Longitudinal strain = ΔL / L
```

**How this formula is made:** ΔL is the length change along the axis; L is the original length. Same idea as general strain, specialised to stretch or compression along one axis.

### 2 · Shear stress

Force **parallel to the surface** (tangential). Material slides like a pack of cards.

```
Shear strain = Δx / L
```

**How this formula is made:** Δx is the sideways (tangential) displacement of one face; L is the perpendicular height or thickness. Dividing sideways shift by height gives a dimensionless measure of how much the material has been skewed (like sliding a pack of cards).

### 3 · Hydraulic (volume) stress

Uniform pressure from a fluid **from all sides**. Shape unchanged; **volume** changes.

```
Hydraulic (volume) strain = ΔV / V
```

**How this formula is made:** ΔV is the change in volume; V is the original volume. Uniform pressure from all sides changes size, not shape — so strain is written as a volume ratio, again dimensionless.

### Body examples

| Type | Example |
|------|---------|
| Tensile | Tendon pulled by contracting muscle |
| Compressive | Knee cartilage on landing |
| Shear | Intervertebral disc under torso twist |
| Hydraulic | Fluid pressure on vessel walls / tissues |

**Distinction:** longitudinal and shear act in a preferred direction; hydraulic stress acts equally in all directions.

---

## 8. The three moduli

### Young's modulus (Y)

```
Y = (Longitudinal stress) / (Longitudinal strain)
Y = (F / A) / (ΔL / L) = (F L) / (A ΔL)
Unit: Pa
```

**How Young’s modulus is assembled:**
- Start from Hooke: modulus = stress / strain for this geometry.
- Longitudinal stress is F/A (axial force over cross-section).
- Longitudinal strain is ΔL/L (length change over original length).
- Divide: Y = (F/A) ÷ (ΔL/L). Multiplying by L/L flips the strain fraction and gives the compact form Y = (F L) / (A ΔL).

Larger Y → stiffer → more stress needed for a small length change. Cortical bone Y ≈ **16 × 10⁹ Pa** (≈ 15–20 GPa in literature).

### Shear modulus (G)

```
G = (Shear stress) / (Shear strain)
G = (F / A) / (Δx / L)
Unit: Pa
```

**How the shear modulus is assembled:** shear stress is the tangential force per area F/A; shear strain is Δx/L. G is that stress divided by that strain — how much tangential stress you need for a given sideways skew. Resistance to **shape** change without volume change.

### Bulk modulus (B)

```
B = (Hydraulic stress) / (Hydraulic strain)
B = (F / A) / (ΔV / V)
Unit: Pa
```

**How the bulk modulus is assembled:** hydraulic stress is the uniform pressure F/A from all sides; hydraulic strain is ΔV/V. B is pressure divided by fractional volume change — how much pressure you need to squeeze the volume by a given fraction. Resistance to **volume** change. Water B ≈ 2.2 × 10⁹ Pa (nearly incompressible).

### Side-by-side

| Modulus | Stress | Strain | Deforms |
|---------|--------|--------|---------|
| Young's Y | F/A along axis | ΔL/L | Length |
| Shear G | F/A tangential | Δx/L | Shape (angle) |
| Bulk B | F/A uniform | ΔV/V | Volume |

**Quick recall:** stretching/compression → **Y**; twisting/sliding → **G**; underwater/uniform pressure → **B**.

---

## 9. Medical application — bone

### Principle

Larger Young's modulus → more stress required for a small length change → **stiffer** bone.

Under load (e.g. femur):

- One side often under **compression**, opposite under **tension**  
- Excessive stress → **fracture / stress fracture**

### Clinical conditions

| Condition | Effect on Y / behaviour |
|-----------|-------------------------|
| Healthy bone | Large Y — stiff, resists elastic deformation |
| **Osteoporosis** | Lower Y / weaker structure — brittle, fractures easily |
| **Osteogenesis imperfecta** | Brittle bone disease — lower effective strength/Y, fractures easily |

Physiological behaviour of the body depends heavily on these mechanical properties. Vessel walls that lose elasticity raise cardiac workload and cardiovascular risk.

---

## 10. Worked problems

### Problem A — Cortical bone Young's modulus

**Given:** L = 0.25 m; A = 1.5 × 10⁻⁴ m²; F = 1500 N (tensile); ΔL = 0.15 mm = 1.5 × 10⁻⁴ m.

```
Stress = F/A = 1500 / 1.5×10⁻⁴ = 1.0 × 10⁷ Pa
Strain = ΔL/L = 1.5×10⁻⁴ / 0.25 = 6.0 × 10⁻⁴
Y = Stress/Strain = 1.0×10⁷ / 6.0×10⁻⁴ = 1.67 × 10¹⁰ Pa ≈ 16.7 GPa
```

Matches typical cortical bone (15–20 GPa).

### Problem B — Femur compression before break

**Given:** L = 0.50 m; Y = 18 × 10⁹ Pa; max stress = 180 × 10⁶ Pa.

```
Strain at break = Stress / Y = 180×10⁶ / 18×10⁹ = 0.010
ΔL = strain × L = 0.010 × 0.50 = 0.0050 m = 5.0 mm
```

A 50 cm femur compresses only ~5.0 mm (1%) before failure — narrow safety margin.

---

## 11. Formula sheet — Chapter 1

```
Physical quantity = Numerical value × Unit
Stress = F / A                         [Pa]   ← force ÷ area
Strain = ΔL / L₀                       [dimensionless]   ← change ÷ original
Hooke (elastic): Stress ∝ Strain       ← proportion; modulus = stress/strain
Y = (F/A) / (ΔL/L)                     ← axial stress ÷ length strain
G = (F/A) / (Δx/L)                     ← tangential stress ÷ shear strain
B = (F/A) / (ΔV/V)                     ← uniform pressure ÷ volume strain
```

### States quick table

- IMF: S > L > G  
- Diffusion / KE / compressibility: G > L > S  
- Fluids = liquids + gases  

### Mechanical one-liners

- Elasticity → returns · Plasticity → permanent · Ductility → wires · Malleability → sheets · Strength → no failure  

### Medical anchors

- Bone → solid, elastic then plastic then fracture  
- Blood → liquid · Air in lungs → gas  
- BP on vessels / knee load / chewing → stress examples  
- High Y bone → healthy stiffness; low Y → osteoporosis / OI risk  

---

*End of Chapter 1 study content.*
