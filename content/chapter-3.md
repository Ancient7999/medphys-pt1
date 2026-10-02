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

## 2. What is a fluid?

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

**How mass flow rate is assembled:**
- Start from definition: mass passing a cross-section per time → m/t.
- Mass of a fluid slug is density × volume: m = ρV.
- That volume is the tube’s cross-section times how far the fluid moves: V = A × ℓ.
- Distance per time is speed: ℓ/t = v.
- Combine: mass flow rate = ρ A v. Symbols: ρ = density, A = cross-sectional area, v = speed.

Unit check: (kg/m³)·(m²)·(m/s) = **kg/s**.

### Volume flow rate

```
Q = A v
```

**How volume flow rate is assembled (separate from mass flow):** Q is volume per time. A fluid slug of cross-section A advancing at speed v sweeps volume A×v each second — so Q = A v. No density here: this tracks space occupied, not mass. Unit: **m³/s**.

Often both use the symbol Q — check whether mass or volume is meant from context (ρAv vs Av).

---

## 5. Equation of continuity

### Statement

If no fluid is added or removed between two sections of a tube, **flow rate is conserved**.

```
General:     ρ₁ A₁ v₁ = ρ₂ A₂ v₂
Incompressible (liquids / blood ≈ constant ρ):
             A₁ v₁ = A₂ v₂
```

**How the general continuity equation is made:** mass is conserved — whatever mass enters section 1 per second must leave section 2 per second (no leaks, no sources). Mass flow at a section is ρAv, so set ρ₁A₁v₁ = ρ₂A₂v₂. This form keeps density free to differ between sections (e.g. a compressible gas).

**How the incompressible form is made (separate variant):** when density is the same at both sections (liquids; blood ≈ constant ρ), ρ cancels and you are left with A₁v₁ = A₂v₂ — volume flow rate is conserved. Narrower A means larger v so the product stays equal.

| Geometry | Velocity |
|----------|----------|
| Wider pipe / larger A | Slower v |
| Narrower pipe / smaller A | Faster v |

If area decreases by 10×, speed increases by 10× (idealised steady incompressible case).

### Blood

Blood is treated as **essentially incompressible** → use A₁v₁ = A₂v₂.

### Worked example — stenosis

A₁ = 0.08 m², v₁ = 0.4 m/s; A₂ = 0.02 m².

```
A₁ v₁ = A₂ v₂
v₂ = (0.08 × 0.4) / 0.02 = 1.6 m/s
```

Velocity rises **4×** in the narrowed section.

**Clinical framing:** vascular narrowing (stenosis) raises blood speed in the throat of the stenosis (continuity), before pressure effects (Bernoulli).

### Why speed rises at a stenosis

Velocity increases at a carotid stenosis because **area decreases**, so **speed increases** to keep A v constant (continuity). Bernoulli then explains the accompanying **pressure drop** — it does not cause the velocity rise itself.

---

## 6. Bernoulli's equation

### Assumptions (ideal fluid)

Steady flow · incompressible · no drag between fluid layers · streamline (laminar).

### Statement

Total mechanical energy **per unit volume** stays constant along a streamline:

```
P + ½ ρ v² + ρ g h = constant

Along two points:
P₁ + ½ ρ v₁² + ρ g h₁ = P₂ + ½ ρ v₂² + ρ g h₂
```

**How the full Bernoulli equation is assembled:** along a streamline for an ideal fluid, mechanical energy **per unit volume** is conserved. Three contributions add to a constant:
- **P** — pressure energy per unit volume (the “push” stored in the fluid).
- **½ ρ v²** — kinetic energy per unit volume (from KE = ½mv², divide by volume V, and m/V = ρ).
- **ρ g h** — gravitational potential energy per unit volume (from mgh / V, again with m/V = ρ).

Writing the sum at point 1 equal to the sum at point 2 gives the two-point form. Symbols: P = pressure, ρ = density, v = speed, g = gravity, h = height above a reference.

| Term | Meaning | Unit |
|------|---------|------|
| P | Pressure energy per unit volume | Pa |
| ½ ρ v² | Kinetic energy per unit volume | Pa |
| ρ g h | Potential energy per unit volume | Pa |

### Trade-off at the same height

**How the same-height form is made (separate from the full equation):** if two points lie at the same height, h₁ = h₂ so the ρgh terms match and cancel when you rearrange. What remains is a trade-off between pressure and speed alone: P + ½ρv² stays constant. Therefore, when fluid speeds up, pressure must fall; when fluid slows down, pressure must rise. In words: faster flow at constant height means lower pressure; slower flow at constant height means higher pressure.

### Connecting continuity and Bernoulli at a stenosis

1. Continuity: smaller area raises speed.  
2. Bernoulli (same height): higher speed lowers pressure.  
3. Result: fast, low-pressure blood in the narrow region; tissue beyond may be under-perfused; low pressure can promote further vessel issues downstream.

---

## 7. Medical applications of Bernoulli

### Blood flow through narrowed arteries (stenosis / atherosclerosis)

- Smaller area raises velocity; higher velocity lowers pressure inside the narrowed segment.  
- Linked clinically to reduced supply (e.g. framing of **TIA** when brain-supplying arteries are constricted: higher speed past constriction, lower pressure).

### Venturi mask

Uses Bernoulli's principle to entrain room air and deliver a **controlled O₂ concentration**.

### Heart murmurs

High velocity through a narrowed valve → turbulence → **audible murmur** (stethoscope). Increased v and reduced P follow from Bernoulli + geometry.

### Doppler ultrasound & blood flow measurement

Non-invasive measurement of **velocity and direction** of blood flow. Applications:

- Carotid blood flow  
- Detection of **DVT**  
- Fetal circulation assessment  
- Cardiac valve assessment (**Doppler echocardiography**) — pressure gradients relate to velocity via Bernoulli-type relations in clinical practice  

### Conclusion

Bernoulli relates pressure, velocity, and height in moving fluids; explains pressure drop when velocity rises; underpins understanding of arterial/valve flow, stenosis assessment, Doppler-based gradients, and devices such as Venturi masks.

---

## 8. Formula sheet — Chapter 3

```
Mass flow rate = ρ A v                 ← density × area × speed (mass/time)
Volume flow rate Q = A v               ← area × speed (volume/time)
Continuity (general): ρ₁ A₁ v₁ = ρ₂ A₂ v₂   ← mass flow conserved
Continuity (blood ≈ incompressible): A₁ v₁ = A₂ v₂   ← volume flow conserved (ρ cancels)
Bernoulli: P + ½ ρ v² + ρ g h = constant   ← energy per volume conserved
At same height: higher speed means lower pressure (ρgh drops out)
```

---

## 9. Quick clinical checklist

| Finding | Physics to cite |
|---------|-----------------|
| Faster blood in a narrow segment | Continuity: smaller area raises speed |
| Lower pressure in that segment | Bernoulli at same height: higher speed lowers pressure |
| Murmur over stenotic valve | High speed can produce turbulence |
| Controlled O₂ mask | Venturi / Bernoulli |
| Velocity imaging of vessels | Doppler ultrasound |
