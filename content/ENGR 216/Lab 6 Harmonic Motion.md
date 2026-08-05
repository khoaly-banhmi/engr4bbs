---

title: Lab 6 Harmonic Motion 
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

The last lab of the semester, and it runs **online**: there is no lab station session this week. Your data arrives as files in the Canvas module, recorded with the same tracking camera you have used all semester, showing a mass bouncing on a spring. Your team's job is pure analysis: determine the spring constant $k$ for three different springs, with uncertainties.

Here is the puzzle the manual builds in on purpose: no meter stick was available, so all positions are in **pixels**, and there is no way to convert them to meters. It sounds fatal, and it is not. The spring constant hides in the _timing_ of the oscillation, not its size, so a full-credit answer in real S.I. units comes out of data that never leaves pixel units. Seeing why is the whole point of the lab.

---

## Before Lab

### Concepts you need

**Simple harmonic motion.** A mass on a spring oscillates as a cosine in time:

$$ 
x(t) = A\cos(\omega t + \varphi) 
$$

where $A$ is the amplitude (how far it swings), $\omega$ is the angular frequency (how fast it cycles), and $\varphi$ is the phase (where in the cycle it started). In your data the oscillation rides on top of the equilibrium position, so expect a cosine wobbling around some constant pixel value rather than around zero. That offset is harmless.

**The two frequency relations.** For a mass $m$ on a spring of constant $k$:

$$ 
\omega = \sqrt{\frac{k}{m}} \qquad \text{and} \qquad \omega = \frac{2\pi}{T} 
$$

where $T$ is the period, the time for one complete cycle. Setting them equal and solving for $k$ gives the working equation of the lab:

$$ 
k = \frac{4\pi^2 m}{T^2} 
$$

**Why pixels are enough.** Look at that equation: $k$ depends on the mass and the period, and nothing else. The period is a _time_ measurement, read off the timestamps, and time was never in pixel units. The amplitude, the only length in the problem, cancels out of the physics entirely: a spring oscillates with the same period whether you pull it 2 cm or 5 cm. So position can stay in pixels forever, and $k$ still comes out in honest N/m.

**Measuring the period well.** The timestamp of any single peak is uncertain by a frame or so, but that error does not grow with distance. Measure the time from the first clean peak to a peak $N$ cycles later and divide:

$$ 
T = \frac{t_{\text{last}} - t_{\text{first}}}{N} 
$$

The timing uncertainty gets divided by $N$ along with everything else, the same telescoping trick that made the swept angle method strong in [[Lab 5 Rotational Motion]]. Counting across 10 cycles beats timing one cycle by a factor of 10. For the uncertainty $\delta T$, measure $T$ from several different stretches of the recording and take the mean and standard error, as in [[Lab 1 Error Analysis and Orientation]].

**Propagating into $k$: the power rule.** One new propagation rule closes out the semester. When a quantity enters a formula raised to a power, its relative uncertainty gets multiplied by that power. Because $T$ appears squared:

$$ 
\frac{\delta k}{k} = \sqrt{\left(\frac{\delta m}{m}\right)^2 + \left(2,\frac{\delta T}{T}\right)^2} 
$$

The factor of 2 in front of the period term is the fingerprint of $T^2$. If the mass uncertainty is negligible, this collapses to $\delta k / k = 2,\delta T / T$.

> [!info] Theory in practice 
> 
> The whole analysis fits in a spreadsheet. Scatter-plot the oscillating position column against the timestamp column, read the timestamps of a first clean peak and a peak $N$ cycles later, and then:
> 
> ```
> =(B47-B12)/10
> ```
> 
> gives the period from a 10-cycle stretch, with the two peak timestamps in B47 and B12. Repeat over a few different stretches for the spread, then:
> 
> ```
> =4*PI()^2*0.550/A2^2
> ```
> 
> turns a period (cell A2, in seconds) and a mass (here 0.550 kg) into the spring constant.

> [!question]- Doesn't gravity change things? And what about the spring's own weight? 
> 
> Everything in this callout is worth knowing but **not required** by the manual or the instruction slides.
> 
> **Gravity:** the mass hangs vertically, so gravity is pulling on it the whole time, yet it appears nowhere in the working equation. That is because a constant force only shifts _where_ the mass oscillates, stretching the equilibrium down by $mg/k$, without changing _how fast_ it oscillates. The period of a vertical spring-mass system is identical to a horizontal one. This is also why the equilibrium offset in your data is harmless.
> 
> **The spring's own mass:** the formula treats the spring as massless, but a real spring carries some of itself along as it oscillates, effectively adding about a third of the spring's mass to $m$. With a heavy hanging mass this correction is buried in the noise, which is one quiet reason the recordings use substantial masses. If your three $k$ values came from very different hanging masses and drift slightly in a consistent direction, this is a classy effect to name in your discussion.

### Know before you walk in

- This lab is **analysis only**: no Jetson, no terminal, no camera setup. Everything happens in Canvas, a spreadsheet, and your report.
- Find the data files in the Canvas module early, one per spring, and note which file belongs to which **spring color**. The plots must be labeled by color, and the filenames are your only link.
- Confirm the **mass used** for each recording from the file or the Canvas description. The working equation needs it, and no analysis can recover it from pixels.
- Mass set values are usually stamped in **grams**; the formula needs **kilograms**. Decide the conversion once, at the start, before any numbers flow.
- The position columns are in pixels, and they are staying in pixels. Label plot axes as px and move on with confidence.

---

## During Lab

### Getting your data

No commands this week. Download each spring's data file from the Canvas module and open it in Google Sheets or Excel. The columns match the tracking output you have seen all semester: a frame number, a timestamp, and position components in pixels.

The mass oscillates along one axis in the camera frame, so one position column swings up and down as a clean wave while the other stays roughly flat. Plot both against time once; the oscillating one is unmistakable, and that column plus the timestamps is your entire raw material.

### Analysis tips

- **Scatter plot first, calculate second.** One glance at position versus time confirms the data is clean, shows the equilibrium offset, and lets you count cycles visually before touching a formula.
- **Pick peaks you trust.** Use well-shaped peaks away from the very start of the recording, where the release may still be settling.
- **Count cycles carefully.** Off-by-one in $N$ is the quiet disaster here: 10 peaks bound 9 cycles, not 10. Count the gaps between peaks, not the peaks themselves.
- **Use several stretches per spring.** Three or four period measurements from different parts of the same recording give you a mean and a standard error, which is your $\delta T$.
- **Expect gentle damping.** The amplitude shrinking over the recording is real friction at work, and it barely affects the period. Count cycles straight through it.
- **Keep a tidy sheet per spring.** Three springs, three tabs, same layout: peak times, $N$, $T$ values, mass, then $k$. Symmetry between tabs is your best defense against unit slips.

### Troubleshooting

|Symptom|Likely cause|Fix|
|---|---|---|
|Cannot tell which column oscillates|Both components plotted together, or wrong columns selected|Plot each position column against time separately; the oscillation axis is obvious on sight|
|The wave is not centered on zero|Equilibrium sits at some pixel value in the camera frame|Expected and harmless; the period does not care where the center is|
|Amplitude shrinks over the recording|Natural damping from air resistance and spring friction|Also expected; count cycles straight through, the period is essentially unaffected|
|Small wiggle in the flat component|The hanging mass swayed slightly side to side during recording|Analyze the main oscillation axis only; a small sway does not disturb the vertical period|
|Two teammates get different periods from one file|Different cycle counts or an off-by-one in N|Recount together: 10 peaks bound 9 cycles; agree on the exact first and last peak before dividing|
|The k values look absurdly large|Mass left in grams instead of kilograms|Convert to kg before the formula; a factor of 1000 in m is a factor of 1000 in k|
|The k values differ wildly between springs|Possibly nothing wrong at all|Different springs genuinely have different constants; stiffer spring, shorter period, larger k. Check the pairing holds|
|Chart looks like bars or a scrambled line|Spreadsheet guessed the chart type|Insert a scatter chart with the timestamp column as x and the position column as y|

### Before you wrap up

- [ ] All **three** spring data files downloaded, and the file-to-spring-color pairing written down
- [ ] The oscillating position column identified in each file
- [ ] The **mass** for each recording confirmed, converted to kilograms
- [ ] At least three independent period measurements per spring, cycle counts double-checked
- [ ] **Every teammate** has a copy of the data and the shared analysis sheet
- [ ] You can explain, in one sentence, why the spring constant comes out in N/m even though every position is in pixels. That sentence is the heart of deliverable 1.

---

## After Lab

### What the deliverables are really testing

1. **The procedure (20%).** This tests whether you understand the chain, not just the arithmetic: which column, how peaks became a period, how many cycles, how the period became $k$, and where every uncertainty entered. The pixel question belongs here too; a procedure that explains _why_ no length calibration was needed reads like it was written by someone who understood the lab, because it was.
2. **The three plots (30%).** Position versus time, one per spring, each labeled with its spring color, axes labeled with units (seconds and px). These are the cheapest 30 points of the semester if the labeling is complete, and the most silently expensive if it is not.
3. **The three constants (30%).** Each $k$ with its propagated uncertainty, in N/m, with sensible significant figures. A quick internal consistency check makes this section shine: the spring with the shortest period must report the largest $k$, and your numbers should line up with how stiff the springs plainly are.

### Analysis checklist

- Plot each spring's oscillating position against time, labeled by spring color
- Extract $T$ per spring from multi-cycle stretches, several stretches each, mean and standard error
- Confirm each recording's mass and convert to kilograms
- Compute $k = 4\pi^2 m / T^2$ per spring
- Propagate uncertainty with the power rule, remembering the factor of 2 on the period term
- Rank check: periods and constants should order inversely, stiffest spring to shortest period

### Common mistakes that cost points

- **Timing a single cycle**, one frame of peak error on a one-second period is a percent-level mistake that a 10-cycle stretch would have shrunk tenfold
- **Off-by-one in the cycle count**, peaks minus one equals cycles, every time
- **Grams in the formula**, the mass set is stamped in grams and the equation eats kilograms; this alone moves $k$ by a factor of 1000
- **Frequency for angular frequency**, $\omega = 2\pi/T$ carries the $2\pi$; dropping it silently scales $k$ by $4\pi^2 \approx 39$
- **Forgetting the factor of 2** in the uncertainty, $T$ enters squared, so its relative uncertainty counts double
- **Unlabeled or uncolored plots**, each plot is worth 10% and the color label is an explicit requirement
- **Apologizing for pixels**, pixel units on the position axis are correct and expected; convertting them is impossible here and unnecessary everywhere
- **Ignoring the report template**, one last time: still the easiest 10% you'll ever earn or lose

---

## The end of the road

That's the semester. Look back at what the six labs actually taught: every measurement carries an uncertainty, uncertainties propagate by rules you now know, calibration turns a camera into an instrument, conservation laws can be verified and then trusted as tools, and a clever choice of method, swept angles, multi-cycle timing, can beat noise without better equipment. Those habits transfer to every lab course and every engineering job after this one.

If these pages helped you, the best thank-you is to make them better for the next class. Fix a typo, add a tip your team learned the hard way, or draft the page for a lab that tripped you up.

> [!info] Pay it forward at [[Contribute]]