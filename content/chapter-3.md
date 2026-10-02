# Chapter 3 — Fluid Flow (through Bernoulli)

## 1. Overview & learning map

| Topic | Core idea |
|-------|-----------|
| Fluid (flow context) | Continuously changes shape under force; liquids & gases |
| Laminar vs turbulent | Smooth parallel layers vs swirling chaos |
| Mass flow rate | ρ A v |
| Volume flow rate Q | A v |
| Continuity | ρ₁A₁v₁ = ρ₂A₂v₂; for blood ≈ A₁v₁ = A₂v₂ |
| Bernoulli | P + ½ρv² + ρgh = constant |
| Medical | Stenosis, TIA framing, Venturi mask, murmurs, Doppler |

**Link continuity → Bernoulli:** Narrowing raises velocity (continuity); higher velocity lowers pressure (Bernoulli).

---

## 2. What is a fluid? (flow chapter framing)

A fluid can **flow** and **continuously change shape** under an external force. Fluids cannot resist static shear the way solids do.

| Liquids (examples) | Gases (examples) |
|--------------------|------------------|
| Blood, lymph, plasma | O₂, CO₂, air in the respiratory system |

---

## 3. Types of fluid flow

### Streamline (laminar)

- Smooth, orderly flow  
- Fluid moves in **parallel layers**  
- In vessels: **highest velocity in the centre**, lowest near the wall  
- Velocity profile ≈ **parabolic**  
- Normal flow in **healthy arteries**

### Turbulent

- Above a certain speed (or with irregularities): **wild swirl**  
- Layers mix radially and axially  
- Increases **energy loss** and **resistance**  
- Can reduce tissue perfusion; may produce **murmurs**  
- Triggers: high velocity, vessel irregularity, or a sudden narrowing

### Medical examples

| Situation | Flow type |
|-----------|-----------|
| Healthy artery | Laminar |
| Narrowed artery (stenosis) | Often turbulent |
| Diseased heart valve | Turbulence → audible murmurs |

**Why it matters:** Laminar flow spends energy pushing blood forward. Turbulence wastes energy in sideways motion → poorer perfusion and audible noise.

---

## 4. Mass flow rate & volume flow rate

### Mass flow rate

Amount of **mass** passing a point per unit time.

```
Mass flow rate = m / t
Since m = ρ V and V = A × ℓ:
Mass flow rate = ρ A (ℓ / t) = ρ A v
```

Unit check: (kg/m³)·(m²)·(m/s) = **kg/s**.

### Volume flow rate

```
Q = A v
```

Unit: **m³/s**.

Often both are written with symbol Q in slides — check whether mass or volume is meant from context (ρAv vs Av).

---

## 5. Equation of continuity

### Statement

If no fluid is added or removed between two sections of a tube, **flow rate is conserved**.

```
General:     ρ₁ A₁ v₁ = ρ₂ A₂ v₂
Incompressible (liquids / blood ≈ constant ρ):
             A₁ v₁ = A₂ v₂
```

| Geometry | Velocity |
|----------|----------|
| Wider pipe / larger A | Slower v |
| Narrower pipe / smaller A | Faster v |

If area decreases by 10×, speed increases by 10× (idealised steady incompressible case).

### Blood

Blood is treated as **essentially incompressible** → use A₁v₁ = A₂v₂.

### Worked example — stenosis

A₁ = 0.1 m², v₁ = 0.5 m/s; A₂ = 0.01 m².

```
A₁ v₁ = A₂ v₂
v₂ = (0.1 × 0.5) / 0.01 = 5 m/s
```

Velocity rises **10×** in the narrowed section.

**Clinical framing:** vascular narrowing (stenosis) → higher blood speed in the throat of the stenosis (continuity), before pressure effects (Bernoulli).

### Exam MCQ style fact

*Why does velocity increase at a carotid stenosis?* Primary continuity answer: **A decreases → v increases** (Bernoulli explains the accompanying **pressure drop**, not the velocity rise itself).

---

## 6. Bernoulli's equation

### Assumptions (ideal fluid)

Steady flow · incompressible · non-viscous · streamline (laminar).

### Statement

Total mechanical energy **per unit volume** stays constant along a streamline:

```
P + ½ ρ v² + ρ g h = constant

Along two points:
P₁ + ½ ρ v₁² + ρ g h₁ = P₂ + ½ ρ v₂² + ρ g h₂
```

| Term | Meaning | Unit |
|------|---------|------|
| P | Pressure energy per unit volume | Pa |
| ½ ρ v² | Kinetic energy per unit volume | Pa |
| ρ g h | Potential energy per unit volume | Pa |

### Trade-off (same height)

```
v ↑  ⇒  P ↓
v ↓  ⇒  P ↑
```

### Connecting continuity and Bernoulli at a stenosis

1. Continuity: A↓ → v↑  
2. Bernoulli: v↑ → P↓  
3. Result: fast, low-pressure blood in the narrow region; tissue beyond may be under-perfused; low pressure can promote further vessel issues downstream.

---

## 7. Medical applications of Bernoulli (and related continuity)

### Blood flow through narrowed arteries (stenosis / atherosclerosis)

- Area ↓ → velocity ↑ → pressure ↓ inside the narrowed segment.  
- Linked clinically to reduced supply (e.g. framing of **TIA** when brain-supplying arteries are constricted: higher speed past constriction, lower pressure).

### Venturi mask

Uses Bernoulli's principle to entrain room air and deliver a **controlled O₂ concentration**.

### Heart murmurs

High velocity through a narrowed valve → turbulence → **audible murmur** (stethoscope). Increased v and reduced P follow from Bernoulli + geometry.

### Doppler ultrasound & blood flow measurement

Non-invasive measurement of **velocity and direction** of blood flow. Applications listed in lecture:

- Carotid blood flow  
- Detection of **DVT**  
- Fetal circulation assessment  
- Cardiac valve assessment (**Doppler echocardiography**) — pressure gradients relate to velocity via Bernoulli-type relations in clinical practice  

### Conclusion (lecture)

Bernoulli relates pressure, velocity, and height in moving fluids; explains pressure drop when velocity rises; underpins understanding of arterial/valve flow, stenosis assessment, Doppler-based gradients, and devices such as Venturi masks.

---

## 8. Formula sheet — Chapter 3

```
Mass flow rate = ρ A v
Volume flow rate Q = A v
Continuity (general): ρ₁ A₁ v₁ = ρ₂ A₂ v₂
Continuity (blood ≈ incompressible): A₁ v₁ = A₂ v₂
Bernoulli: P + ½ ρ v² + ρ g h = constant
At same height: higher v ↔ lower P
```

---

## 9. Quick clinical checklist

| Finding | Physics to cite |
|---------|-----------------|
| Faster blood in a narrow segment | Continuity (A↓ → v↑) |
| Lower pressure in that segment | Bernoulli (v↑ → P↓) |
| Murmur over stenotic valve | High v → turbulence |
| Controlled O₂ mask | Venturi / Bernoulli |
| Velocity imaging of vessels | Doppler ultrasound |

---

*End of Chapter 3 study content (through Bernoulli only).*
