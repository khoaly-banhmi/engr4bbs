---

title: Lab 4 Collisions 
draft: false 
tags:

- engr216

---

> [!warning] Heads up! 
> Your official lab manual and Canvas rubric are the source of truth for deliverables and grading. Use this page to prepare faster, work smoother, and avoid the classic mistakes.
> 
> Quick reminder before you write that lab report:
> - This site is public. If you found it, so can plagiarism checkers.
> - Screenshotting a LaTeX derivation or re-typing it word for word is still copying.
> - The whole point of these notes is that you understand the steps. If you can re-derive it without looking, you're safe. If you can't, you're not ready to write it yet.
> - "An Aggie does not lie, cheat or steal." Your report should sound like you.

## Overview

This lab tests two of the deepest bookkeeping rules in physics on real, imperfect hardware: conservation of momentum and conservation of kinetic energy. Your team will crash two pucks together on the air table at least 8 times, at collision angles spread from head-on (about 180°) to glancing, then check whether the totals before each collision match the totals after.

The twist is that you do not get to just claim the collision angle you aimed for. Every angle must be calculated from your own tracking data, and every plot must carry uncertainties. This lab uses everything the course has built so far: calibrated tracking, velocity extraction, propagation of error, and honest judgment about agreement.

---

## Before Lab

### Concepts you need

**Momentum is a vector.** Each puck carries momentum $\vec{p} = m\vec{v}$, and the total is the vector sum of both pucks. Conservation applies to each component separately, which is exactly why the manual asks for separate x and y plots:

$$ 
m_1 v_{1x} + m_2 v_{2x} \Big|_{\text{before}} = m_1 v_{1x} + m_2 v_{2x} \Big|_{\text{after}} 
$$

and the same for the y components. Keep the signs: a puck moving in the negative x direction has negative $p_x$, and dropping that sign destroys the bookkeeping.

**Kinetic energy is a scalar.** Each puck contributes $KE = \frac{1}{2}mv^2$, where $v^2 = v_x^2 + v_y^2$. No components, no signs, just a total before and a total after. A collision is **elastic** if kinetic energy is conserved and **inelastic** if some is lost to sound, deformation, and friction during contact. Momentum can be conserved even when kinetic energy is not; that difference is the entire point of assignment 2.

**Collision angle from data.** The angle between the two incoming velocity vectors comes from the dot product:

$$ 
\cos\phi = \frac{\vec{v}_1 \cdot \vec{v}_2}{|\vec{v}_1||\vec{v}_2|} = \frac{v_{1x}v_{2x} + v_{1y}v_{2y}}{|\vec{v}_1||\vec{v}_2|} 
$$

Use each puck's velocity from the frames _before_ impact. A head-on collision gives $\phi$ near 180°, a right-angle collision near 90°.

**Uncertainty for the ratio plots.** The before/after momentum ratio is a division, so its uncertainty follows the same quadrature rule from [[Lab 2 Visual Odometry]]:

$$ 
\frac{\delta R}{R} = \sqrt{\left(\frac{\delta p_{\text{before}}}{p_{\text{before}}}\right)^2 + \left(\frac{\delta p_{\text{after}}}{p_{\text{after}}}\right)^2} 
$$

A ratio consistent with 1 within its error bar is what conservation looks like on a plot. The manual says you may ignore the uncertainty in the puck masses, so all uncertainty flows from your velocity measurements: average each velocity over its clean frames and use the standard error, exactly as in [[Lab 1 Error Analysis and Orientation]].

> [!info] Theory in practice 
> Spreadsheets can do the angle calculation directly. With components in cells, the pattern is:
> 
> ```
> =DEGREES(ACOS((B2*D2 + C2*E2) / (SQRT(B2^2+C2^2) * SQRT(D2^2+E2^2))))
> ```
> 
> where columns B, C hold puck 1's velocity components and D, E hold puck 2's. `ACOS` returns radians, so wrap it in `DEGREES` for a readable angle. 
### Know before you walk in

- The air table must be **level** this time. 
- Two pucks means two stickers in **two different colors**, one per puck, tracked simultaneously.
- You need the puck masses for every momentum and energy calculation. Your puck mass is $0.028 kg±0.001 kg$.
- Plan your 8+ trials before lab: one head-on near 180°, one near 90°, three between 0° and 90°, three between 90° and 180°. You aim for these, then compute the actual angle from data afterward.
- Think about your analysis windows now: velocities "before" and "after" come from averaging frames well clear of the impact itself, never from frames during contact.

---

## During Lab

> [!info]- Linux Commands Cheatsheat 
> Common commands such as connecting to Jetson and working with files are outline in [[Getting Started with ENGR 216]].

### Commands you'll use

The manual introduces no new script for this lab, so the Lab 3 workflow carries over: the tracking script with built-in S.I. conversion, with `camera_distance` set for your station. Confirm the script choice with the intro slides or a PT if in doubt.

```bash
cp examples/tracking/6_track_motion_and_print.py ~
```

```bash
nano 6_track_motion_and_print.py
```

```bash
python3 6_track_motion_and_print.py
```

Stop each recording with ⌃ Ctrl + C after the collision fully plays out. Record one file per trial and name or log them immediately (trial number plus target angle), because eight unlabeled CSV files look identical two days later.

### Procedure tips

- **Level the table and confirm the air is on before trial 1.**  The table is not always perfectly leveled. It is acceptable that pucks may drift slowly to one side.
- **Practice a few launches before recording.** Getting two hand-launched pucks to collide mid-table at a chosen angle takes a couple of attempts to calibrate your push.
- **Keep the collision away from the walls.** A wall bounce just before or after the collision adds an outside force and wrecks the momentum comparison. Analyze only the stretch between wall contacts, and aim collisions for the middle of the table.
- **Moderate speeds track better.** Very fast pucks blur and skip frames; very slow pucks let friction eat a visible share of the momentum. 
- **Avoid spinning the pucks as you launch.** Spin stores energy the camera cannot see and shows up as mysterious kinetic energy loss.
- **Log the target angle for every trial as you go.** The actual angle comes from data later, but the log is how you confirm your 8 trials cover the required ranges before you leave.
- **Watch the camera feed for flickering.** Same as previous labs: if a sticker color drops in and out, the lighting is insufficient. Look for a PT.

### Troubleshooting

| Symptom                                        | Likely cause                                                        | Fix                                                                                                                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Cannot connect with Jetson                     | Cable unplugged / loose                                             | Unplug then plug in again. If problem prevails, ask a PT to change the cable.                                                                                                  |
| Cannot connect with Jetson **(MacOS)**         | Port not recognized                                                 | Change the to a different USB port and open a **new** terminal to connect.                                                                                                     |
| Camera not detected                            | Cable unplugged / loose                                             | Look for the USB connection between the camera and the table. Disconnect then connect again.                                                                                   |
| A sticker isn't tracked or flickering tracking | Duplicate color, glare, not enough ligting, or sticker out of frame | Swap to an unused color; reposition to reduce glare; check the camera's view; use an additional flashlight                                                                     |
| Pucks drift quickly without being pushed       | Table not level                                                     | Set the tilt back to 0° and re-check; ask a PT if the table will not level out                                                                                                 |
| Momentum changes before the pucks even touch   | Wall bounce inside your analysis window, or leftover tilt           | Trim the analysis window to frames between wall contacts; re-verify the table is level                                                                                         |
| Hard to tell which frames are before vs after  | Impact moment not obvious in the raw numbers                        | Plot velocity against time for one puck; the collision shows up as a sharp step, and you can read the frame range off it. This is one of the required graphs before you leave. |
| One puck's data vanishes mid-trial             | Puck left the camera frame or puck moves too fast                   | Check that the puck's sticker is clear and not flickering. Ask PT to move to a table with better lighting.                                                                     |
| Laggy video feed                               | Resource exhaustion                                                 | Restarting the camera by unplugging, or restarting Jetson. This is a slow process, ask a PT to move to an empty table.                                                         |
| `Permission denied` when script writes output  | You're running from the `examples` directory (write-protected)      | Copy the script to your own folder first, run it there                                                                                                                         |

### Before you leave the lab

- [ ] At least **8 trials** recorded: one near 180°, one near 90°, three between 0° and 90°, three between 90° and 180°
- [ ] Both pucks tracked cleanly through every collision, before and after impact
- [ ] Puck **masses** recorded.
- [ ] Trial log matches your data files one to one
- [ ] **Every teammate** has a copy of the lab data
- [ ] Have a PT sanity-check the velocity-versus-time plot for one trial with you
- [ ] You can explain, in one sentence, how the collision angle will be computed from the data. That sentence is deliverable 1.

---

## After Lab

### What the deliverables are really testing

1. **The collision angle method (15%).** This tests whether you treat velocity as a vector. The dot product formula, applied to before-impact velocities, is the clean answer; describe which frames you averaged and why.
2. **The four momentum plots (30%).** Before/after totals and their ratios, for x and y separately, all with error bars. These test the full chain from raw tracking to propagated uncertainty. The ratio plots are the punchline: conservation predicts every ratio sits at 1 within its error bar.
3. **The momentum discussion (10%).** The manual explicitly wants the real-world part: what weakens conservation in practice. Residual table tilt, air drag and leftover surface friction, wall interactions, puck spin, and tracking noise are all fair game; pick the ones your data actually shows.
4. **The kinetic energy plot and elasticity verdict (25%).** Momentum can survive a collision that kinetic energy does not. If your after-collision energy runs consistently below the before value, your collisions are partially inelastic, and saying so with numbers is the correct conclusion. Perfectly elastic results on real pucks would be the suspicious outcome.

### Analysis checklist

- For each trial and each puck: average velocity components over clean frames before impact and after impact, with standard errors
- Compute the actual collision angle for every trial from the before-impact velocities
- Total $p_x$ and $p_y$ before and after each collision, plus total kinetic energy before and after
- Build all five plots against collision angle, with error bars, in the style of the Canvas example file. You can also plug your numbers in directly to the example file.

> [!question]- Why won't my momentum ratio be exactly 1?
> Everything in this callout is worth knowing but **not required** by the manual or the instruction slides; it is background for writing a sharper discussion.
>
> Momentum is only perfectly conserved when no outside forces touch the pucks, and the air table minimizes outside forces without eliminating them. Real data essentially always shows small deviations, so ratios like 0.95 or 1.05 are normal. Your job is not to get exactly 1, it is to explain the gap.
>
> Before blaming physics, rule out **analysis error** first: averaging through the impact frames, a wall bounce inside your analysis window, or a badly tracked stretch of frames all fake a momentum change that never happened. Fix the window, then look at what remains.
>
> The remaining, genuine effects each leave a different fingerprint:
>
> - **Residual surface friction and air drag** slow both pucks in whatever direction they move, so they show up as a modest, consistent shortfall: the "after" totals run slightly low in both components, and more so the longer your analysis window.
> - **Leftover table tilt** pushes in one fixed direction, so it shows up asymmetrically, inflating one component while deflating another. If your x ratios behave and your y ratios drift, suspect the level, not friction.
> - **Friction during the impact itself** rubs the pucks against each other, converting some kinetic energy to heat and spin the camera cannot see. This mostly appears in the energy plot rather than the momentum plots.
>
> A discussion that names the effect *and* points to its fingerprint in your own plots is exactly what deliverable 4 is asking for.

- Apply the overlap test (or the more detailed version) from [[Lab 3 Friction Forces Evaluation]] when judging whether ratios agree with 1 and whether energy was conserved

### Common mistakes that cost points

- **Dropped signs on components**, a leftward-moving puck has negative $v_x$, and forcing everything positive fabricates momentum changes that never happened
- **Averaging through the impact**, frames during contact belong to neither "before" nor "after" and contaminate both
- **Wall bounces inside the analysis window**, the single most common source of "momentum was not conserved" panic
- **Missing error bars**, the manual demands uncertainties on the momentum and ratio plots explicitly
- **Radians read as degrees** out of `ACOS`, wrap it in `DEGREES` or your angles will all sit between 0 and 3.14
- **Confusing the two conservation laws**, momentum holding while kinetic energy drops is not a contradiction, it is the expected signature of a real, partially inelastic collision
- **Ignoring the report template**, still the easiest 10% you'll ever earn or lose

---

## Up next

You have now audited nature's accounting on real hardware and seen which quantities survive a collision and which leak away. The remaining labs build on this full analysis pipeline.

> [!info] Your next stop [[Lab 5 Rotational Motion]]

