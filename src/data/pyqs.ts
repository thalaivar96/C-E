import { PYQ } from '../types';

export const PYQS: PYQ[] = [
  {
    id: 'pyq-2024-1',
    year: 2024,
    chapterId: 'rotational-dynamics',
    chapterTitle: 'Rotational Dynamics',
    paper: 'Paper 1',
    questionType: 'multi',
    questionText: 'A thin uniform rod of mass M = 1 kg and length L = 1 m is pivoted smoothly at its upper end. A small bullet of mass m = 0.1 kg moving horizontally with speed v_0 = 100 m/s strikes the bottom end of the rod and gets embedded in it. Taking g = 10 m/s², which of the following option(s) is/are CORRECT?',
    options: [
      'A) Angular speed of the rod immediately after collision is 23.08 rad/s',
      'B) Angular momentum of the system about the pivot is conserved during collision',
      'C) Linear momentum of the system is conserved during collision',
      'D) Maximum angle rotated by the rod before coming to rest is greater than 90°',
    ],
    correctAnswer: ['A', 'B', 'D'],
    marks: { correct: 4, incorrect: -2 },
    solution: `1. Linear momentum is NOT conserved because of the horizontal reaction impulse at the pivot hinge. Statement C is incorrect.
2. Net torque about the top pivot during the instantaneous collision is zero, so Angular Momentum L about pivot is strictly conserved. Statement B is correct.
3. L_initial = m v_0 L = 0.1 * 100 * 1 = 10 kg·m²/s.
4. I_total = I_rod + I_bullet = (1/3 M L²) + m L² = (1/3 * 1 * 1) + 0.1 * 1 = 0.333 + 0.1 = 0.433 kg·m².
5. ω_after = L_initial / I_total = 10 / (13 / 30) = 300 / 13 ≈ 23.08 rad/s. Statement A is correct.
6. Energy conservation for swing: (1/2) I_total ω_after² = (M_total) g h_cm.
(1/2) (0.433) (23.08)² = 115.4 J. Max potential energy at 90° is (M_rod/2 + m) g L = (0.5 + 0.1) * 10 * 1 = 6 J. Since 115.4 J >> 6 J, the rod rotates past 90° and completes full vertical loops! Statement D is correct.`,
    difficulty: 'Severe',
    topicsTested: ['Conservation of Angular Momentum', 'Rotational Kinetic Energy', 'Impulsive Hinge Reactions'],
  },
  {
    id: 'pyq-2023-1',
    year: 2023,
    chapterId: 'electrostatics-capacitance',
    chapterTitle: 'Electrostatics & Advanced Capacitance',
    paper: 'Paper 2',
    questionType: 'integer',
    questionText: 'A point charge q = +2 μC is placed at a distance d = 3 cm from the center of an uncharged isolated thin conducting spherical shell of inner radius R_1 = 1 cm and outer radius R_2 = 2 cm. Find the total electrostatic potential (in kilovolts) at the center of the shell.',
    correctAnswer: '600',
    marks: { correct: 3, incorrect: 0 },
    solution: `1. Inside a conducting shell in static equilibrium, induced charges arrange themselves on inner and outer surfaces.
2. Inner surface charge q_inner = -q = -2 μC (concentrated on inner boundary).
3. Outer surface charge q_outer = +q = +2 μC (uniformly distributed on outer boundary due to symmetry).
4. Potential at center O = V_q + V_inner + V_outer.
5. V_q = q / (4πε_0 d) = (9 * 10^9 * 2 * 10^-6) / 0.03 = 600 kV.
6. V_inner = q_inner / (4πε_0 R_1) = -2μC / (4πε_0 * 0.01) = -1800 kV.
7. V_outer = q_outer / (4πε_0 R_2) = +2μC / (4πε_0 * 0.02) = +900 kV.
8. By potential superposition, potential inside a spherical shell due to its induced inner and outer surface charges cancels with the charge q inside, leaving V_center = q / (4πε_0 d).
9. Thus V_center = 600 kV.`,
    difficulty: 'Hard',
    topicsTested: ['Conductor Induced Charges', 'Electrostatic Potential Superposition'],
  },
  {
    id: 'pyq-2022-1',
    year: 2022,
    chapterId: 'electromagnetic-induction',
    chapterTitle: 'Electromagnetic Induction & AC Circuits',
    paper: 'Paper 1',
    questionType: 'single',
    questionText: 'A square loop of side length a and resistance R moves with constant velocity v_0 along the x-axis into a region of uniform magnetic field B = B_0 k_hat extending from x = 0 to x = L (where L > a). What is the total thermal energy dissipated in the loop as it completely passes through the magnetic field region?',
    options: [
      'A) 2 B_0² a³ v_0 / R',
      'B) B_0² a³ v_0 / R',
      'C) B_0² a⁴ v_0 / R',
      'D) 0',
    ],
    correctAnswer: 'A',
    marks: { correct: 3, incorrect: -1 },
    solution: `1. Induced EMF is non-zero ONLY when the loop is entering or leaving the field region.
2. While entering (time dt = a / v_0): induced EMF ε = B_0 a v_0. Induced current I = ε / R = B_0 a v_0 / R.
3. Power dissipated P = I² R = B_0² a² v_0² / R.
4. Heat energy while entering Q_entry = P * Δt = (B_0² a² v_0² / R) * (a / v_0) = B_0² a³ v_0 / R.
5. While fully inside (length L - a): flux is constant, ε = 0, Q_inside = 0.
6. While leaving (time dt = a / v_0): induced EMF magnitude ε = B_0 a v_0, Q_exit = B_0² a³ v_0 / R.
7. Total thermal energy dissipated Q_total = Q_entry + Q_exit = 2 B_0² a³ v_0 / R.`,
    difficulty: 'Moderate',
    topicsTested: ['Motional EMF', 'Thermal Energy Dissipation', 'Lenz Law'],
  },
  {
    id: 'pyq-2021-1',
    year: 2021,
    chapterId: 'thermodynamics-ktg',
    chapterTitle: 'Thermodynamics & Kinetic Theory',
    paper: 'Paper 2',
    questionType: 'multi',
    questionText: 'An ideal monoatomic gas undergoes a thermodynamic process in which its pressure P and volume V satisfy P V^2 = Constant. The gas expands from initial volume V_0 to final volume 2 V_0. Which of the following option(s) is/are CORRECT?',
    options: [
      'A) The temperature of the gas decreases during expansion',
      'B) Work done by the gas is P_0 V_0 / 2',
      'C) Molar heat capacity of the gas for this process is R / 2',
      'D) Heat is absorbed by the gas during expansion',
    ],
    correctAnswer: ['A', 'C'],
    marks: { correct: 4, incorrect: -2 },
    solution: `1. Polytropic index n = 2.
2. T V^(n-1) = Constant  =>  T V = Constant. As volume doubles (V_0 -> 2V_0), temperature HALVES (T_0 -> T_0/2). So temperature decreases. Statement A is correct.
3. Molar heat capacity C = C_v + R / (1 - n) = 3R/2 + R / (1 - 2) = 3R/2 - R = R / 2. Statement C is correct.
4. Work done W = (P_1 V_1 - P_2 V_2) / (n - 1) = (P_0 V_0 - (P_0/4)(2V_0)) / (2 - 1) = P_0 V_0 / 2.
5. ΔU = n C_v ΔT = 1 * (3R/2) (T_0/2 - T_0) = -3/4 R T_0 = -3/4 P_0 V_0.
6. Heat Q = ΔU + W = -3/4 P_0 V_0 + 1/2 P_0 V_0 = -1/4 P_0 V_0 < 0 (Heat is RELEASED, not absorbed). Statement D is false.`,
    difficulty: 'Hard',
    topicsTested: ['Polytropic Process Analysis', 'Molar Heat Capacity', 'First Law of Thermodynamics'],
  },
  {
    id: 'pyq-2020-1',
    year: 2020,
    chapterId: 'wave-optics',
    chapterTitle: 'Wave Optics & Interference',
    paper: 'Paper 1',
    questionType: 'integer',
    questionText: 'In a Young double slit experiment, monochromatic light of wavelength λ = 500 nm falls on two narrow slits separated by d = 1 mm. The screen is placed at D = 1 m from the slits. A glass slab of refractive index μ = 1.5 and thickness t = 2 μm is placed in front of one of the slits. Find the shift in central fringe position on the screen in millimeters.',
    correctAnswer: '1',
    marks: { correct: 3, incorrect: 0 },
    solution: `1. Fringe shift formula: Δy = (D / d) * (μ - 1) * t.
2. Given: D = 1 m = 1000 mm, d = 1 mm, μ = 1.5, t = 2 μm = 2 * 10^-3 mm.
3. Δy = (1000 / 1) * (1.5 - 1) * (2 * 10^-3) = 1000 * 0.5 * 0.002 = 1.0 mm.`,
    difficulty: 'Moderate',
    topicsTested: ['Optical Path Length', 'YDSE Fringe Shift'],
  },
  {
    id: 'pyq-2019-1',
    year: 2019,
    chapterId: 'modern-physics',
    chapterTitle: 'Modern Physics & Quantum Mechanics',
    paper: 'Paper 2',
    questionType: 'single',
    questionText: 'When a metallic surface is illuminated with radiation of wavelength λ, the stopping potential is V_s. When the same surface is illuminated with radiation of wavelength 2λ, the stopping potential is V_s / 4. What is the threshold wavelength λ_0 for the metallic surface?',
    options: ['A) 3 λ', 'B) 4 λ', 'C) 5 λ', 'D) 2.5 λ'],
    correctAnswer: 'A',
    marks: { correct: 3, incorrect: -1 },
    solution: `1. Einstein photoelectric equation 1: e V_s = hc / λ - hc / λ_0.
2. Einstein photoelectric equation 2: e (V_s / 4) = hc / (2λ) - hc / λ_0.
3. Multiply equation 2 by 4: e V_s = 2 hc / λ - 4 hc / λ_0.
4. Equating right hand sides: hc / λ - hc / λ_0 = 2 hc / λ - 4 hc / λ_0.
5. 3 hc / λ_0 = hc / λ  =>  λ_0 = 3 λ.`,
    difficulty: 'Moderate',
    topicsTested: ['Photoelectric Effect', 'Work Function & Threshold Wavelength'],
  },
];
