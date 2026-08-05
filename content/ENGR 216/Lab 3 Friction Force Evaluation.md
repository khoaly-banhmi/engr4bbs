---
title: Lab 3 Friction Forces Evaluation
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

This lab asks a simple question: does friction care how much surface is touching? Your block has two different sides, a large face and a small face, and your team will measure the coefficients of static friction $\mu_s$ and kinetic friction $\mu_k$ on both. The final deliverable is a data-backed verdict on whether contact area matters.

Choose wood as your material for better results. You will run four full experiments: static and kinetic friction, each on the large side and the small side, with at least 9 trials every time. That is 36+ trials, so an efficient team workflow matters more in this lab than any before it.

---

## Before Lab

### Concepts you need

**Two kinds of friction.** Static friction holds a stationary object in place, and it adjusts itself up to a maximum of $\mu_s N$, where $N$ is the normal force. Kinetic friction acts on a sliding object with a constant magnitude $\mu_k N$. Both coefficients are dimensionless, and typically $\mu_k < \mu_s$: it takes more to start a slide than to keep one going.

**Static friction from the slip angle.** Tilt the plane slowly. At the exact angle $\theta_s$ where the block first slips, gravity along the incline equals the maximum static friction:

$$ mg\sin\theta_s = \mu_s , mg\cos\theta_s \quad\Rightarrow\quad \mu_s = \tan\theta_s $$

The mass cancels, so you never need to weigh the block.

> [!question]- Why does the slip angle alone give the coefficient? 
> On an incline, both the pull of gravity along the surface ($mg\sin\theta$) and the normal force pressing the surfaces together ($mg\cos\theta$) depend on the same angle. Their ratio is $\tan\theta$. The block slips at the moment the pull exceeds the maximum grip $\mu_s N$, so the tangent of that threshold angle is the coefficient itself. Steeper slip angle, grippier surface.

**Kinetic friction from acceleration.** Once the block is sliding at a fixed angle $\theta$, Newton's second law along the incline gives $ma = mg\sin\theta - \mu_k mg\cos\theta$. Mass cancels again:

$$ \mu_k = \tan\theta - \frac{a}{g\cos\theta} $$

Measure the sliding acceleration $a$ with the tracking camera, and you have $\mu_k$. For $g$, the accepted value is $9.81\ \text{m/s}^2$ (you measured this yourself in [[Lab 2 Visual Odometry]]).

**Deciding whether two results agree.** Deliverable 5 hinges on this. Every measurement $x \pm \delta$ defines a range, from $x - \delta$ up to $x + \delta$. To compare two results, overlay their ranges: if the ranges **overlap**, the two values agree within uncertainty. If there is a gap between them, they genuinely differ.

$$
\text{agree if} \quad |x_1 - x_2| \le \delta_1 + \delta_2
$$

A quick sketch of the two error bars on a number line makes this check visual, and makes a convincing figure for your conclusion.

> [!question]- Going further: how strong is the agreement?
> Everything in this callout is worth knowing but **not required** by the manual or the instruction slides. The overlap rule above is all you need for the report; this is for the curious.
>
> The overlap rule gives a yes or no, but you can quantify *how* confidently. Here is the idea, derived in two steps:
>
> 1. The difference between your results, $D = x_1 - x_2$, is itself a calculated quantity, so it has its own uncertainty. Propagation of error for a subtraction follows the same quadrature rule from [[Lab 1 Error Analysis and Orientation]]: $\delta_D = \sqrt{\delta_1^2 + \delta_2^2}$.
> 2. If the two quantities were truly identical, $D$ would be zero. So the question "do they agree?" becomes "is $D$ consistent with zero, given its uncertainty?" Dividing the gap by its uncertainty answers that:
>
> $$
> t = \frac{|x_1 - x_2|}{\sqrt{\delta_1^2 + \delta_2^2}}
> $$
>
> This counts how many uncertainties separate your two results. Random error alone regularly produces small $t$ values and only rarely produces large ones, so the conventional reading is:
>
> - $t \le 1$: the values agree
> - $1 < t < 2$: gray zone, inconclusive at your current precision
> - $t \ge 2$: genuine disagreement (random error alone does this only about 5% of the time)
>
> **A quick example.** Suppose your coefficients came out to $0.62 \pm 0.03$ (large area) and $0.58 \pm 0.04$ (small area). The ranges are $0.59$ to $0.65$ and $0.54$ to $0.62$, which overlap, so the simple rule says they agree. The $t$ value confirms it and adds nuance:
>
> $$
> t = \frac{|0.62 - 0.58|}{\sqrt{0.03^2 + 0.04^2}} = \frac{0.04}{0.05} = 0.8
> $$
>
> Since $t \le 1$, the two results agree comfortably, not just barely.
>
> A gray-zone result is a legitimate finding, not a failure. Saying "our data cannot distinguish the two at this precision, and more trials would sharpen the test" is exactly the kind of honest conclusion that earns respect.

**Averages and uncertainty** work exactly as in [[Lab 1 Error Analysis and Orientation]]: compute a coefficient for every trial, then report the mean and standard error of each set of 9.

> [!info] Theory in practice 
> Spreadsheets compute trig in radians by default, so convert first. Both Excel and Google Sheets have the same functions:
> 
> ```
> =TAN(RADIANS(A2))
> ```
> 
> This turns a slip angle in degrees (cell A2) directly into that trial's value of the coefficient.

### Know before you walk in

- You can skip measuring the angle entirely for static trials. Since $\mu_s = \tan\theta_s$, and tangent is rise over run, measuring the raised height and the horizontal base of the plane at the slip moment gives $\mu_s = h / x$ directly with a meter stick. 
- You can also use the tracking camera and stickers on the planes to help you calculate tangent. Since camera measurements have fewer errors, you should prefer this method over the meter stick.
- The tracking script is new this lab: it converts to S.I. units and computes velocity and acceleration for you, but only if you set the `camera_distance` parameter correctly (in cm). Plan to measure the camera-to-plane distance at your station.
- Decide your team's division of labor before lab: one person tilting, one watching for first motion, one recording. With 36+ trials, a smooth loop saves you half an hour.
- Keep the surfaces clean and consistent: dust or sticker patches change the coefficient mid-experiment.

---

## During Lab

> [!info]- Linux Commands Cheatsheat 
> Common commands such as connecting to Jetson and working with files are outline in [[Getting Started with ENGR 216]].

### Commands you'll use

This lab introduces a new script. As always, copy it out of the write-protected directory first:

```bash
cp examples/tracking/6_track_motion_and_print.py ~
```

Before running it, open the copy and set the `camera_distance` parameter (in cm) to match your station:

```bash
nano 6_track_motion_and_print.py
```

Then run it for your kinetic friction trials:

```bash
python3 6_track_motion_and_print.py
```

Stop the recording with ⌃ Ctrl + C when your run is complete. The output now includes position, velocity, and acceleration already converted to S.I. units, so there is no manual pixel conversion this time.

### Procedure tips

- **Raise the plane slowly and smoothly for static trials.** A jerky lift adds vibration that shakes the block loose early, which biases your slip angle low. Aim for a slow, steady tilt every trial.
- **Reset consistently between static trials.** Same starting spot on the plane, same block orientation. Consistency between trials is what makes your 9 values a fair sample.
- **For kinetic trials, fix the angle steep enough for a steady slide.** Comfortably above the slip angle works well: the block should accelerate smoothly down the full length of the plane while the camera tracks its sticker.
- **Record the fixed angle carefully for kinetic trials.** Unlike the static method, the kinetic formula needs $\theta$ explicitly. Measure it with the tracking camera and stickers on the incline planes. 
- **Watch the camera feed for flickering.** Same as previous labs: if the sticker color drops in and out, the lighting is insufficient. Look for a PT.

### Troubleshooting

|Symptom|Likely cause|Fix|
|---|---|---|
|Cannot connect with Jetson|Cable unplugged / loose|Unplug then plug in again. If problem prevails, ask a PT to change the cable.|
|Cannot connect with Jetson **(MacOS)**|Port not recognized|Change the to a different USB port and open a **new** terminal to connect.|
|Camera not detected|Cable unplugged / loose|Look for the USB connection between the camera and the table. Disconnect then connect again.|
|A sticker isn't tracked or flickering tracking|Duplicate color, glare, not enough ligting, or sticker out of frame|Swap to an unused color; reposition to reduce glare; check the camera's view; use an additional flashlight|
|Script output distances look wrong|camera_distance not edited, or entered in the wrong unit|Open your copy of the script and set camera_distance in cm, measured at your station|
|Block slips at wildly different angles|Raising too fast, table vibration, or dirty surfaces|Tilt slower and more smoothly; wipe both surfaces; reset the block to the same spot each trial|
|Block sticks and slides in bursts during kinetic runs|Angle barely above the slip angle|Increase the tilt so the block slides smoothly down the whole plane|
|Laggy video feed|Resource exhaustion|Restarting the camera by unplugging, or restarting Jetson. This is a slow process, ask a PT to move to an empty table.|
|`Permission denied` when script writes output|You're running from the `examples` directory (write-protected)|Copy the script to your own folder first, run it there|
|CSV is missing position columns|Sticker never detected during recording|Fix tracking, record again|

### Before you leave the lab

- [ ] All **four** data sets collected: static and kinetic, each on the large side and the small side
- [ ] At least **9 trials** in every set, recorded per trial (not just a running average)
- [ ] For kinetic runs: the fixed plane angle is measured and written down, and camera_distance was set before recording
- [ ] **Every teammate** has a copy of the lab data
- [ ] Have a PT sanity-check one static trial and one kinetic slide with you
- [ ] You can explain, in one sentence, why the block's mass never appears in either calculation. You'll want that clarity when writing your process descriptions.

---

## After Lab

### What the deliverables are really testing

The grade splits into three ideas:

1. **Process descriptions (static and kinetic).** These test reproducibility: a student who was not there should be able to repeat your exact procedure, including how you detected "first motion" and how you measured angles. Vague descriptions lose the most points here.
2. **The two tables.** These test honest data reporting: every single trial's coefficient, with the average and its uncertainty in the bottom row, in the exact format the manual shows. The uncertainty is the standard error of your 9 trials.
3. **The conclusion (the big one at 20%).** This tests whether you can make a quantitative claim. "The values look similar" earns little. "The large and small area coefficients differ by less than their combined uncertainty, so our data shows no dependence on contact area" earns full credit, whichever direction your data points.

The classic friction model predicts that the coefficients do not depend on contact area, which surprises most people. Your job is not to assume that answer but to test it: let the agreement criterion decide, and discuss what your data actually supports.

### Analysis checklist

- Compute $\mu_s$ for each static trial (rise over run, or $\tan\theta_s$) and $\mu_k$ for each kinetic trial
- For each of the four sets: mean and standard error across the 9+ trials
- Fill both tables in the manual's format, every trial listed, average and uncertainty in the last row
- Apply the agreement test to large versus small area, separately for $\mu_s$ and for $\mu_k$
- Sanity checks: both coefficients should be positive, of order 0.1 to 1, and $\mu_k$ should come out below $\mu_s$ for the same surfaces

### Common mistakes that cost points

- **Degrees fed into a radian function**, the same silent killer as Lab 2: `TAN(35)` in radian mode is nonsense, use `TAN(RADIANS(35))`
- **Units attached to the coefficients**, they are dimensionless ratios, no units
- **Tables missing individual trials**, the manual explicitly wants every trial's value, not just the summary row
- **A qualitative conclusion**, deliverable 5 requires comparing the difference against the combined uncertainty with numbers
- **Mixed-up configurations**, label your raw data large/small and static/kinetic the moment you record it, not afterward from memory
- **Uncertainty with too many digits**, round to 1 or 2 significant figures and match the value's decimal place
- **Ignoring the report template**, still the easiest 10% you'll ever earn or lose

---

## Up next

You now have the full experimental toolkit: uncertainty analysis, calibrated motion tracking, and quantitative agreement testing. The labs ahead put these to work on new physics.

> [!info] Your next stop [[Lab 4 Collisions]]