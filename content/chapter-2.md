# Chapter 2 — Fluids at Rest

**Phys101 Medical Physics · Formative / fluids statics (Dr. Syed lectures)**  
Topics: what is a fluid · density & specific gravity · pressure · atmospheric & gauge pressure · barometer · open-tube manometer · Pascal's principle · buoyancy & Archimedes

---

## 1. Overview & learning map

### What this chapter covers

Foundational **hydrostatics**: fluids that are not flowing. Density describes how much mass sits in a volume; pressure rises with depth; atmosphere sets a baseline; manometers and barometers measure pressure with liquid columns; Pascal explains hydraulic machines; Archimedes explains floating and apparent weight.

### Topics map

| Topic | Core idea |
|-------|-----------|
| Fluids | Flow; continuously deform under shear |
| Density ρ | m / V |
| Specific gravity | ρ / ρ_water (dimensionless) |
| Pressure | F/A; at depth P = ρgh |
| Atmospheric pressure | ≈ 1.013 × 10⁵ Pa |
| Barometer | Torricelli; 76 cm Hg |
| Manometer | U-tube; P_abs = P_atm + ρgΔh |
| Absolute vs gauge | P_abs = P_atm + P_gauge |
| Pascal | Confined fluid transmits ΔP equally |
| Buoyancy | F_B = weight of fluid displaced |

**Study tip:** Formulas are simple — connect each one to the **picture** (column of fluid, U-tube, pistons, submerged object).

---

## 2. What is a fluid?

- Liquids and gases are called **fluids** because they **flow** from higher to lower pressure.
- A fluid is a substance that **continuously deforms under shear stress** (unlike solids, which can resist static shear).

**Medical fluids:** blood, lymph, plasma (liquids); O₂, CO₂, air in the respiratory system (gases).

---

## 3. Density & specific gravity

### Density

```
ρ = m / V
SI unit: kg/m³
Lab unit: g/cm³
Conversion: (g/cm³) × 1000 = kg/m³
Example: 1 g/cm³ = 1000 kg/m³  (water)
```

### Specific gravity

```
Specific gravity = ρ_substance / ρ_water
```

Dimensionless (pure number). Water: ρ = 1000 kg/m³ = 1 g/cm³ → SG = 1 by definition.

### Worked examples

**Density of a wooden block**  
Dimensions 3.00 cm × 4.00 cm × 5.00 cm; mass 20.0 g.  
V = 60.0 cm³ → ρ = 20/60 = 0.333 g/cm³ = 333 kg/m³.

**Mass from density**  
Plastic 6 cm × 5 cm × 7 cm; ρ = 0.25 g/cm³.  
V = 210 cm³ → m = ρV = 52.5 g.

**Metal block**  
4 × 5 × 6 cm; m = 480 g → V = 120 cm³ → ρ = 4.0 g/cm³ = 4000 kg/m³ → SG = 4.0.

---

## 4. Pressure — definition & behaviour in a static fluid

### Definition

```
P = Force / Area
SI unit: pascal (Pa) = N/m²
```

### Direction & depth behaviour

- At a given depth in a **static** fluid, pressure acts **equally in all directions**. If it did not, the fluid would flow.
- Force of the fluid on a submerged surface is **perpendicular** to that surface.
- Pressure **increases with depth**.

### Pressure at depth h

Pressure at depth h below the free surface is due to the weight of the liquid above:

```
P = F/A = (mg)/A = (ρ V g)/A = ρ g h
ΔP = ρ g Δh
```

(Here P often means the **gauge** contribution from the liquid column — see absolute vs gauge below.)

### Gauge pressure at depth

```
P_G = ρ g h
```

### Worked examples

**Force from room pressure**  
P = 1.123 × 10⁵ Pa on a table 2 m × 3 m → A = 6 m² → F = PA = 6.738 × 10⁵ N ≈ 6.73 × 10⁵ N.

**Diver depth from gauge**  
P_G = 2.67 × 10⁵ Pa; fresh water ρ = 1000 kg/m³.  
h = P_G/(ρg) = 2.67×10⁵/(1000×9.8) ≈ 27.2 m.

**Ocean at 1 km**  
ρ = 1000 kg/m³; h = 1000 m; P_atm = 1.10 × 10⁵ Pa (as in lecture problem).  
P_G = ρgh = 1000×9.8×1000 = 9.8 × 10⁶ Pa.  
P_abs = P_atm + P_G = 1.10×10⁵ + 9.8×10⁶ ≈ 9.91 × 10⁶ Pa.

---

## 5. Atmospheric pressure

At sea level:

```
1 atm = 1.013 × 10⁵ N/m² = 1.013 × 10⁵ Pa
1 bar = 1.00 × 10⁵ N/m²
1 atm ≈ 760 torr = 760 mmHg ≈ 14.7 lb/in²
```

Standard atmospheric pressure is just over 1 bar.  
Atmosphere does not crush us because body fluids/cells maintain an **internal pressure** that balances it.

### Clinical conversion

Approximate: **1 mmHg ≈ 133.3 Pa**.  
Systolic 135 mmHg → ≈ 135 × 133.3 ≈ 1.80 × 10⁴ Pa.

Blood pressures in mmHg look "small" because mmHg is a large unit relative to the pascal; clinically we still report in mmHg (sphygmomanometer scale).

---

## 6. Barometer (Torricelli)

- Mercury **barometer** measures atmospheric pressure.
- Height of Hg column ≈ **76 cm** at 1 atm (supported by atmosphere acting on the open mercury reservoir).
- Pressure often quoted in **mmHg** or inches of Hg.
- **Sphygmomanometer** uses the same mercury-column idea to measure blood pressure.

### Why mercury, not water?

Any liquid can work, but denser liquids need shorter columns.

```
For water: h = P_atm / (ρ g) = (1.013×10⁵) / (1000 × 9.8) ≈ 10.33 m
```

A water barometer would be > 10 m tall. Mercury (ρ ≈ 13.6 × water) needs only ~0.76 m.

---

## 7. Open-tube manometer & absolute vs gauge

### Open-tube manometer

- **U-shaped** tube partly filled with liquid.
- Used to measure **gas pressure in a container**.
- One limb connected to the gas; the other open to atmosphere.
- Height difference Δh between levels relates the pressures.

### Equilibrium

At the same height in a continuous static fluid, pressures match. For the absolute pressure of the gas:

```
P_abs = P_atm + ρ g Δh
P_gauge = ρ g Δh
P_abs = P_atm + P_gauge
```

| Term | Meaning |
|------|---------|
| **Gauge pressure** | Extra pressure from the fluid column / relative to atmosphere |
| **Absolute pressure** | Includes atmospheric pressure |
| If P_gauge = 0 | P_abs = P_atm |

### Worked examples

**Lake absolute pressure**  
h = 15 m; ρ = 1000; g = 9.8; P_atm = 1.013×10⁵ Pa.  
P_G = 1.47×10⁵ Pa; P_abs = 2.483×10⁵ Pa.

**Seawater 400 m**  
ρ = 1025 kg/m³ → P_G ≈ 4.02×10⁶ Pa; P_abs ≈ 4.12×10⁶ Pa.

---

## 8. Pascal's principle

### Statement

If an external pressure is applied to a **confined** fluid, the pressure at **every point** in the fluid increases by that amount.

```
P_in = P_out
F_in / A_in = F_out / A_out
```

Small force on a small piston → same pressure → large force on a large piston.

### Applications

- Hydraulic lifts  
- Dentist chair  
- Hydraulic brakes  
- Hydraulic presses  

### Dentist chair picture

Press small pedal piston → pressure transmits uniformly through the liquid → large piston raises the chair.

### Worked examples

**Hydraulic lift (lecture numbers)**  
A_out = 0.1 m²; A_in = 0.01 m²; lift 1500 N.  
F_in = F_out × (A_in/A_out) = 1500 × (0.01/0.1) = **150 N**.

**Another lift**  
A_out = 0.5 m²; A_in = 0.025 m²; load 2000 N → F_in = 100 N (20× advantage).

**Press**  
A_in = 0.02 m²; A_out = 1.6 m²; F_in = 250 N → F_out = 20,000 N (80×).

---

## 9. Buoyancy & Archimedes' principle

### Why buoyancy exists

A submerged object feels higher pressure on its **bottom** than on its **top** (pressure increases with depth). Net force is **upward** — the **buoyant force** F_B.

### Archimedes' principle

```
F_B = weight of the fluid displaced by the object
F_B = m_fluid g = ρ_fluid × V_displaced × g
```

### Apparent weight

```
Apparent weight = Actual weight − F_B
```

- If F_B > weight → object rises / floats (displaces until equilibrium).  
- If F_B < weight → object sinks (still feels lighter by F_B).  
- If equal → neutrally buoyant.

### Worked example

Fully submerged box V = 0.5 m³ in fresh water ρ = 1000 kg/m³.  
F_B = ρVg = 1000 × 0.5 × 9.8 = **4900 N**.

### Swimmer pressure (absolute)

8 m below fresh water surface; P_atm = 1.013×10⁵ Pa.  
P_G = ρgh = 1000×9.8×8 = 7.84×10⁴ Pa.  
P_abs = P_atm + P_G ≈ 1.80×10⁵ Pa.

---

## 10. Clinical / medical links (statics)

| Physics | Medicine |
|---------|----------|
| Pressure units mmHg | Sphygmomanometer / BP reporting |
| Gauge vs absolute | Clinical BP is gauge-like (relative to atmosphere) |
| Pascal | Hydraulic systems in equipment (chairs, lifts, brakes) |
| Buoyancy | Immersion, body composition / underwater weighing concepts |
| Density of blood / tissues | Context for later flow and imaging physics |

---

## 11. Formula sheet — Chapter 2

```
ρ = m / V
SG = ρ / ρ_water
P = F / A
P_G (depth) = ρ g h
ΔP = ρ g Δh
1 atm = 1.013 × 10⁵ Pa = 760 mmHg ≈ 760 torr
≈ 1 mmHg ≈ 133.3 Pa
P_abs = P_atm + P_gauge
Manometer: P_abs = P_atm + ρ g Δh
Pascal: F_in/A_in = F_out/A_out
F_B = ρ_fluid V_displaced g
Apparent weight = W − F_B
Water barometer height ≈ 10.33 m; Hg ≈ 0.76 m
```

### Memory anchors

- Deeper → higher P  
- Gauge ignores atmosphere; absolute includes it  
- Confined fluid → Pascal multiplies force via area ratio  
- Buoyancy = weight of **displaced** fluid, not of the object  

---

*End of Chapter 2 study content.*
