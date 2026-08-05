---

title: Lab 5 Rotational Motion 
draft: false 
tags:

- engr216
---

> [!warning] Heads up! 
> 
> Your official lab manual and Canvas rubric are the source of truth for deliverables and grading. Use this page to prepare faster, work smoother, and avoid the classic mistakes.
> 
> Quick reminder before you write that lab report:
> 
> - This site is public. If you found it, so can plagiarism checkers.
> - Screenshotting a LaTeX derivation or re-typing it word for word is still copying.
> - The whole point of these notes is that you understand the steps. If you can re-derive it without looking, you're safe. If you can't, you're not ready to write it yet.
> - "An Aggie does not lie, cheat or steal." Your report should sound like you.

## Overview

Everything you did with straight-line motion has a rotational twin, and this lab introduces the whole family at once: angle instead of position, angular velocity instead of velocity, moment of inertia instead of mass, and angular momentum instead of momentum.

Your team has two assignments. First, spin the L shape, drop a 20 g mass onto it, and check whether angular momentum survives the drop. Second, turn that same trick into a measuring tool: once conservation is confirmed, dropping the known mass onto the circle and the pentagon lets you calculate their unknown moments of inertia from the speed change alone.

Two values are handed to you by the manual, uncertainties included:

$$ 
I_{L,\text{cm}} = (9.7 \pm 0.7) \times 10^{-4}\ \text{kg}\cdot\text{m}^2 \qquad I_{20\text{g},\text{cm}} = (1.32 \pm 0.05) \times 10^{-6}\ \text{kg}\cdot\text{m}^2 
$$

Note the subscript: both are about each object's own **center of mass**. That detail matters more than it looks, and it is why the first deliverable is about finding centers of mass at all.

---

## Before Lab

### Concepts you need

**The rotational dictionary.** Every translational quantity from Labs 2 and 4 has a rotational counterpart: position $x$ becomes angle $\theta$, velocity $v$ becomes angular velocity $\omega$ (in rad/s), mass $m$ becomes moment of inertia $I$, and momentum $p = mv$ becomes angular momentum:

$$ 
L = I\omega 
$$

Moment of inertia plays the role of "rotational mass": it measures how hard an object is to spin, and it depends not just on how much mass there is but on how far that mass sits from the axis.

**Angular velocity from the swept angle.** The shape is pinned to the table by a peg, so put one sticker on the peg and one on the shape. Subtracting the peg position from the shape sticker position gives a vector that rotates with the shape, and its angle against a fixed reference direction (the positive x axis) comes from the two-argument arctangent:

$$
\theta = \operatorname{atan2}\!\left(y_{\text{shape}} - y_{\text{peg}},\; x_{\text{shape}} - x_{\text{peg}}\right)
$$

The angular velocity is then the forward finite difference of that angle between consecutive frames:

$$
\omega_i = \frac{\theta_{i+1} - \theta_i}{\Delta t}
$$

Average $\omega$ over a window of steady frames and use the standard error, exactly as in [[Lab 1 Error Analysis and Orientation]].

**Unwrapping the angle.** One catch: $\operatorname{atan2}$ only returns angles between $-\pi$ and $\pi$. Once per revolution the rotating vector crosses that boundary, and the reported angle snaps from one end of the range to the other, a fake jump of about $2\pi$ that has nothing to do with the physics. Left alone, it puts one absurd spike in your $\omega$ column every turn. The fix is applied to the *differences*: a real between-frame change is always small, so any difference larger than $\pi$ in magnitude is a wrap, and adding or subtracting $2\pi$ brings it back to the true value. After that correction, every difference is physical and the spikes vanish.

> [!question]- Why the swept angle beats velocity over radius
> Everything in this callout is worth knowing but **not required** by the manual or the instruction slides.
>
> A tempting alternative exists: the script already outputs velocity, and a sticker at radius $r$ moves at $v = \omega r$, so why not just compute $\omega = \sqrt{v_x^2 + v_y^2}\,/\,r$? It works, but the swept angle method is more accurate, for three separate reasons:
>
> - **No radius in the formula.** In $v/r$, the radius is a measured quantity whose uncertainty feeds directly into $\omega$ through the division rule. The swept angle never uses $r$: a sticker at any distance from the peg sweeps the same angle, so that entire error source disappears.
> - **Only half the noise gets in.** Tracking noise jiggles the sticker in two directions, along the line to the peg and across it. The angle only responds to the across component; jiggle toward or away from the peg changes the angle not at all. The speed $\sqrt{v_x^2 + v_y^2}$ absorbs noise from both.
> - **No built-in bias.** Squaring and square-rooting noisy components rectifies the noise, so a noisy vector's magnitude comes out slightly *too large* on average, and averaging more frames cannot remove a bias, only scatter. Angle differences have no such distortion, and their noise genuinely averages away. In fact, averaged consecutive differences telescope: everything in the middle cancels, leaving $(\theta_N - \theta_1)/[(N-1)\Delta t]$, the total swept angle over the total time, so only two frames' worth of noise survives the whole average.
>
> The subtraction of the peg position adds one more quiet benefit: any shake of the camera moves both stickers together and cancels out. The $v/r$ method still earns a place as a thirty-second sanity check that your unwrapping worked.

**The parallel axis theorem.** The given moments of inertia are about each object's center of mass. If an object actually rotates about an axis a distance $d$ away from its center of mass, the moment of inertia grows:

$$ I = I_{\text{cm}} + md^2 $$

This is the workhorse of the lab. The dropped 20 g mass lands some distance $d$ from the spindle, and its $md^2$ term is far larger than its tiny $I_{\text{cm}}$, so skipping the theorem is not a small error, it changes the answer completely.

**Conservation of angular momentum.** Dropping the mass onto the spinning shape is an internal event: friction between them grips the mass, no outside twist acts about the axis, so total angular momentum is unchanged while the spin visibly slows:

$$ 
I_{\text{shape}}\omega_{\text{before}} = \left(I_{\text{shape}} + I_{\text{mass}}\right)\omega_{\text{after}} 
$$

where $I_{\text{mass}} = I_{20\text{g},\text{cm}} + md^2$ about the rotation axis. Assignment 1 checks this equation holds for the L shape, whose $I$ you know.

**Turning the law into a ruler.** For the circle and the pentagon, $I_{\text{shape}}$ is the unknown. Solve the conservation equation for it:

$$ 
I_{\text{shape}} = I_{\text{mass}}\frac{\omega_{\text{after}}}{\omega_{\text{before}} - \omega_{\text{after}}} 
$$

Every quantity on the right side is measured or given, and their uncertainties propagate through with the same quadrature rules as always: the subtraction in the denominator first, then the division.

**Finding a center of mass.** For a flat shape, hang it freely from any point and drop a plumb line from that same point; the center of mass lies somewhere on that vertical line. Hang the shape from a second point and repeat: the two lines cross at the center of mass. A quick balance check on a fingertip confirms it. This is deliverable 1, and it earns its keep because $d$ in the parallel axis theorem is measured from the center of mass.

> [!info] Theory in practice
> With peg coordinates in D and E and shape sticker coordinates in B and C, the angle per frame is:
>
> ```
> =ATAN2(B2-D2, C2-E2)
> ```
>
> Careful: Excel and Google Sheets both take the **x argument first** in `ATAN2`, the reverse of most textbooks and programming languages. With angles in column F and the frame time step in cell H1, the wrap-corrected angular velocity is:
>
> ```
> =(F3-F2 + IF(F3-F2<-PI(), 2*PI(), IF(F3-F2>PI(), -2*PI(), 0))) / $H$1
> ```
>
> Drag it down, average a steady window, and keep everything in rad/s.
> 
> **What is `ATAN2`?** It is the two-argument arctangent: given a point's coordinates, it returns the angle of that point measured from the positive x axis. The ordinary `ATAN(y/x)` cannot do this job, because dividing throws away the signs: the points $(1, 1)$ and $(-1, -1)$ give the same ratio but sit in opposite quadrants, so `ATAN` answers within a half circle and gets the other half wrong. By taking $y$ and $x$ separately, `ATAN2` sees both signs, places the angle in the correct quadrant, and covers the full circle (it even handles the straight-up case where $x = 0$ would crash a division). Its answers run from $-\pi$ to $\pi$, which is exactly why the unwrap correction exists: once per revolution the angle snaps across that boundary, and the `IF` fix repairs it.

### Know before you walk in

- Angular velocity lives in **rad/s** for every formula on this page. This is the radians lab; degrees will quietly wreck each calculation they touch.
- The sticker works best near the **rim** of the shape: a larger radius means faster sticker motion and a cleaner $\omega$ from the same tracking noise.
- The 20 g mass gets a sticker too. Its angular momentum is on the required plot, and the radius of the circle it traces after landing _is_ your $d$ for the parallel axis theorem.
- Plan your recording windows: you need steady spin before the drop and stable rotation after it, with the drop in the middle of one continuous recording.
- The bearing is not frictionless, so the spin decays slowly on its own. Your before and after windows should hug the drop moment, not sprawl across the whole recording.

---

## During Lab

> [!info]- Linux Commands Cheatsheat 
> Common commands such as connecting to Jetson and working with files are outline in [[Getting Started with ENGR 216]].

### Commands you'll use

The tracking workflow carries over from the previous labs: the script with built-in S.I. conversion, with `camera_distance` set for your station. Confirm the script choice with the intro slides or a PT if in doubt.

```bash
cp examples/tracking/6_track_motion_and_print.py ~
```

```bash
nano 6_track_motion_and_print.py
```

```bash
python3 6_track_motion_and_print.py
```

Stop each recording with ⌃ Ctrl + C once the rotation has stabilized after the drop. One continuous file per drop, logged immediately (shape name plus trial number), keeps the analysis sane later.

### Procedure tips

- **Seat the shape on the spindle properly before spinning.** A wobbling shape adds vertical motion the camera misreads as speed changes.
- **Spin gently.** A moderate spin tracks cleanly; a fast one blurs the sticker and skips frames. You need enough rotation to survive the drop with measurable speed left, not a top-speed launch.
- **Practice the drop before recording.** The mass should land flat, grip, and ride along without bouncing or skidding outward. Dropping from barely above the shape works far better than a confident height.
- **Release and retreat.** Your hand must not touch the shape or linger in the camera frame after the drop; a brush of a finger is an external torque and voids the trial.
- **Drop the mass away from the axis, but not at the very edge.** Too close to the center and the speed change is too small to measure well; too close to the rim and the mass tends to slide off.
- **Run several drops per shape.** Repeat trials are where your uncertainties on the circle and pentagon values come from.
- **Watch the camera feed for flickering.** Same as previous labs: if a sticker color drops in and out, the lighting is insufficient. Look for a PT.

### Troubleshooting

|Symptom|Likely cause|Fix|
|---|---|---|
|Cannot connect with Jetson|Cable unplugged / loose|Unplug then plug in again. If problem prevails, ask a PT to change the cable.|
|Cannot connect with Jetson **(MacOS)**|Port not recognized|Change the to a different USB port and open a **new** terminal to connect.|
|Camera not detected|Cable unplugged / loose|Look for the USB connection between the camera and the table. Disconnect then connect again.|
|A sticker isn't tracked or flickering tracking|Duplicate color, glare, not enough ligting, or sticker out of frame|Swap to an unused color; reposition to reduce glare; check the camera's view; use an additional flashlight|
|Shape wobbles while spinning|Not seated flat on the spindle|Stop, reseat the shape on the bearing, and respin; ask a PT if the wobble persists|
|Angular velocity looks noisy or jumpy|Sticker too close to the axis, or tracking dropouts|Move the sticker toward the rim and rerecord; check lighting if frames are dropping|
|Mass bounces or slides outward on landing|Dropped from too high, or landed too near the rim|Drop from just above the surface, closer to mid-radius; redo the trial if it skidded|
|Spin dies out much faster than expected|Bearing friction, or the shape rubbing on something|Check nothing is scraping; keep analysis windows tight around the drop; ask a PT if the bearing feels rough|
|Laggy video feed|Resource exhaustion|Restarting the camera by unplugging, or restarting Jetson. This is a slow process, ask a PT to move to an empty table.|
|`Permission denied` when script writes output|You're running from the `examples` directory (write-protected)|Copy the script to your own folder first, run it there|

### Before you leave the lab

- [ ] L shape conservation run recorded: steady spin, clean drop, stable rotation after, both stickers tracked throughout
- [ ] Several drop trials recorded for the **circle** and for the **pentagon**
- [ ] Sticker radii known or extractable from the data, including the landing radius $d$ of the 20 g mass in every trial
- [ ] Center of mass procedure carried out and noted; deliverable 1 asks you to describe it
- [ ] Trial log matches your data files one to one
- [ ] **Every teammate** has a copy of the lab data
- [ ] Have a PT sanity-check an angular velocity versus time plot for one trial with you
- [ ] You can explain, in one sentence, how $\omega$ is extracted from the camera data. That sentence anchors deliverable 2.

---

## After Lab

### What the deliverables are really testing

1. **The center of mass procedure (10%).** A pure method question: describe the hang-and-plumb-line technique clearly enough that a reader could locate the center of mass of any flat shape.
2. **The angular velocity and angular momentum procedure (15%).** This tests the rotational dictionary: how sticker positions become $\omega$, and how $\omega$ and the moments of inertia become each object's $L$, equations included, parallel axis theorem included.
3. **The angular momentum plot (15%).** Three series against time: the shape, the mass, and the total, spanning the drop. The signature of conservation is visual: the shape's $L$ steps down, the mass's steps up, and the total crosses the drop without a jump.
4. **The conservation discussion (15%).** Compare the total just before and just after the drop, within uncertainty. The slow downhill drift on both sides is bearing friction, a real external torque; the test of conservation is the absence of a sudden jump at the drop, not a perfectly flat line.
5. **The unknown moment procedure (15%) and values (10%).** The elegant part: conservation, verified in assignment 1, becomes the measuring instrument for assignment 2. Present the solved equation, then the circle and pentagon results with propagated uncertainties.

> [!question]- Deja vu: this is Lab 4 again, rotated 
> Everything in this callout is worth knowing but **not required** by the manual or the instruction slides.
> 
> Dropping the mass onto the spinning shape is a perfectly inelastic collision, just in rotation: two objects meet, grip, and move on together. Friction between the mass and the shape is an _internal_ force of the pair, so it can transfer angular momentum between them but cannot change the total, exactly like the puck contact forces in [[Lab 4 Collisions]].
> 
> And just like Lab 4, kinetic energy does not survive. The gripping friction converts some rotational kinetic energy to heat, so $\frac{1}{2}I\omega^2$ after the drop comes out lower than before. If you check this in your data, you will find energy missing while angular momentum balances, and that pairing is the signature of an inelastic capture, not an error.

### Analysis checklist

- Extract $\omega(t)$ for the shape and, after the drop, for the mass, using $v/r$ per frame
- Measure each sticker's radius and the mass's landing distance $d$ from the traced circles in the data
- Apply the parallel axis theorem to the 20 g mass; use the given center of mass values with their stated uncertainties
- Compute $L(t)$ for shape, mass, and total; build the plot across the drop with the same style as the manual's example
- For the circle and pentagon: average $\omega$ in windows just before and just after each drop, solve for $I_{\text{shape}}$, and propagate uncertainty through the subtraction first, then the division
- Combine repeat trials into a mean and standard error per shape
- Sanity checks: both moments of inertia should come out positive, and in the same general range as the L shape's $10^{-4}\ \text{kg}\cdot\text{m}^2$ scale

### Common mistakes that cost points

- **Degrees anywhere in the chain**, angular momentum formulas assume rad/s, and a factor of 57.3 hides poorly
- **Skipping the parallel axis theorem for the dropped mass**, its center of mass moment alone is dozens of times too small once it lands away from the axis
- **Windows far from the drop**, bearing friction decays the spin, so averaging over long stretches biases both $\omega$ values low and unevenly
- **Reading the friction drift as non-conservation**, the gradual slope is an external torque doing its slow work; the conservation test lives in the instant of the drop
- **A bounced or sliding landing left in the data**, if the mass skidded, its final radius is not where it first touched, and the trial belongs in the redo pile
- **Missing uncertainties on the reported moments**, deliverable 6 asks for the value and the uncertainty, and the given constants carry uncertainties you must propagate too
- **Ignoring the report template**, still the easiest 10% you'll ever earn or lose

---

## Up next

The rotational dictionary is now complete, and you have used a conservation law not just to check physics but to measure with it. That move, verifying a principle and then leaning on it as an instrument, is the heart of experimental work.

> [!info] Your next stop 
> [[Lab 6 Harmonic Motion]]