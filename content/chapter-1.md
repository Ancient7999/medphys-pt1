# Chapter 1 — Matter & Mechanical Properties

**Phys101 Medical Physics · Foundation Year · Lectures 1–2**  
Topics: physical quantities & units · phases of matter · mechanical properties · stress & strain · Hooke's law · Young's / Shear / Bulk moduli · bone biomechanics

---

## 1. Overview & learning map

### Intended outcomes

- Define a physical quantity and distinguish base vs derived quantities and unit systems.
- Compare solid, liquid, and gas (plus plasma / BEC) with medical examples.
- Define elasticity, plasticity, ductility, malleability, and strength.
- Define stress and strain; state Hooke's law up to the elastic limit.
- Write and use Young's, Shear, and Bulk moduli.
- Link Young's modulus of bone to stiffness, osteoporosis, and fracture.

### Topics map

| Topic | Core idea |
|-------|-----------|
| Physical quantities | Measured property = number × unit |
| Unit systems | CGS, FPS, MKS, SI (7 base units) |
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
| **CGS** | centimetre, gram, second |
| **FPS** | foot, pound (lb), second |
| **MKS** | metre, kilogram, second |
| **SI** | International System — 7 base units |

### Seven SI base units

| Quantity | Unit | Symbol |
|----------|------|--------|
| Length | metre | m |
| Mass | kilogram | kg |
| Time | second | s |
| Temperature | kelvin | K |
| Electric current | ampere | A |
| Luminous intensity | candela | Cd |
| Amount of substance | mole | mol |

### Key points

- In medicine, a unit mistake (mg vs g, °C vs K) can be fatal — always carry the unit.
- Force (newton), pressure (pascal), energy (joule) are **derived**, not base.

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

| Process | From → To |
|---------|-----------|
| Melting | solid → liquid |
| Freezing | liquid → solid |
| Vaporization | liquid → gas |
| Condensation | gas → liquid |
| Sublimation | solid → gas (directly) |
| Deposition | gas → solid (directly; e.g. CO₂ ↔ dry ice) |

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

When you apply an external force, a restoring force develops in the opposite direction inside the material. That restoring force per unit area is stress.

### Strain

**Strain** is a measure of **deformation** relative to a reference dimension. Strain occurs **as a result of** stress.

```
Strain = (deformation in direction of force) / (original dimension)
For length: Strain = ΔL / L₀
Dimensionless — NO units
```

### Stress in the human body (examples)

- Blood pressure acting on vessel walls  
- Forces on the knee joint during walking  
- Pressure on teeth during chewing  

### Why thinner / weaker bone fractures more easily

Same force F through a smaller cross-section A → larger stress F/A. When stress exceeds strength → fracture. Osteoporosis reduces effective load-bearing area/density → higher stress for the same fall.

### Exam tip

- If your answer for **strain** has units → wrong.  
- If your answer for **stress** has no units → wrong.

---

## 6. Hooke's law & the stress–strain curve

### Hooke's law

Within the **elastic (proportional) limit**, stress and strain are proportional; the object still returns to its original shape after unloading.

```
Stress ∝ Strain  (within elastic limit)
Stress = Modulus × Strain
Modulus = Stress / Strain
```

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

### 2 · Shear stress

Force **parallel to the surface** (tangential). Material slides like a pack of cards.

```
Shear strain = Δx / L
```

Δx = sideways displacement of one face; L = perpendicular height/thickness.

### 3 · Hydraulic (volume) stress

Uniform pressure from a fluid **from all sides**. Shape unchanged; **volume** changes.

```
Hydraulic (volume) strain = ΔV / V
```

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

Larger Y → stiffer → more stress needed for a small length change. Cortical bone Y ≈ **16 × 10⁹ Pa** (≈ 15–20 GPa in literature).

### Shear modulus (G)

```
G = (Shear stress) / (Shear strain)
G = (F / A) / (Δx / L)
Unit: Pa
```

Resistance to **shape** change without volume change.

### Bulk modulus (B)

```
B = (Hydraulic stress) / (Hydraulic strain)
B = (F / A) / (ΔV / V)
Unit: Pa
```

Resistance to **volume** change. Water B ≈ 2.2 × 10⁹ Pa (nearly incompressible).

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

## 10. Worked problems (from lecture)

### Problem A — Cortical bone Young's modulus

**Given:** L = 0.20 m; A = 1.0 × 10⁻⁴ m²; F = 1000 N (tensile); ΔL = 0.12 mm = 1.2 × 10⁻⁴ m.

```
Stress = F/A = 1000 / 1.0×10⁻⁴ = 1.0 × 10⁷ Pa
Strain = ΔL/L = 1.2×10⁻⁴ / 0.20 = 6.0 × 10⁻⁴
Y = Stress/Strain = 1.0×10⁷ / 6.0×10⁻⁴ = 1.67 × 10¹⁰ Pa ≈ 16.7 GPa
```

Matches typical cortical bone (15–20 GPa).

### Problem B — Femur compression before break

**Given:** L = 0.4 m; Y = 16 × 10⁹ Pa; max stress = 150 × 10⁶ Pa.

```
Strain at break = Stress / Y = 150×10⁶ / 16×10⁹ = 0.009375
ΔL = strain × L = 0.009375 × 0.4 = 0.00375 m = 3.75 mm
```

A 40 cm femur compresses only ~3.75 mm (~1%) before failure — narrow safety margin.

---

## 11. Formula sheet — Chapter 1

```
Physical quantity = Numerical value × Unit
Stress = F / A                         [Pa]
Strain = ΔL / L₀                       [dimensionless]
Hooke (elastic): Stress ∝ Strain
Y = (F/A) / (ΔL/L)
G = (F/A) / (Δx/L)
B = (F/A) / (ΔV/V)
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
