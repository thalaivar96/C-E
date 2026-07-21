import { Chapter, Flashcard, PhysicsUnit } from '../types';

export const PHYSICS_UNITS: { id: PhysicsUnit; name: string; description: string; color: string }[] = [
  { id: 'mechanics', name: 'Mechanics', description: 'Kinematics, Rotational Mechanics, Gravitation & Fluids', color: 'text-amber-400' },
  { id: 'electrodynamics', name: 'Electrodynamics', description: 'Electrostatics, Magnetism, EMI & AC Networks', color: 'text-blue-400' },
  { id: 'thermodynamics', name: 'Thermal Physics', description: 'KTG, Thermodynamic Cycles & Heat Transfer', color: 'text-red-400' },
  { id: 'waves_optics', name: 'Waves & Optics', description: 'SHM, Wave Motion, Ray Optics & Wave Optics', color: 'text-emerald-400' },
  { id: 'modern_physics', name: 'Modern Physics', description: 'Photoelectric Effect, Bohr Model, Nuclear & X-Rays', color: 'text-purple-400' },
  { id: 'experimental', name: 'Experimental Physics', description: 'Vernier Calipers, Screw Gauge, Error Analysis & Labs', color: 'text-cyan-400' },
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'rotational-dynamics',
    unit: 'mechanics',
    unitTitle: 'Mechanics',
    title: 'Rotational Dynamics & Rigid Body Mechanics',
    subtitle: 'Torque, Angular Momentum Tensors, ICR & Pure Rolling',
    badge: 'HIGH WEIGHTAGE (14%)',
    description: 'Master rigid body kinematics, parallel and perpendicular axis theorems, Instantaneous Center of Rotation (ICR), conservation of angular momentum, and pure rolling on inclined/movable surfaces.',
    difficulty: 'Extreme (Pathfinder Level)',
    estimatedStudyTime: '12 Hours',
    weightagePercentage: 14,
    keyTopics: [
      'Moment of Inertia Tensors & Mass Distributions',
      'Instantaneous Center of Zero Velocity (ICR)',
      'Torque Vector Equation: τ = dL/dt in Rotating Frames',
      'Pure Rolling vs Slipping Dynamics on Inclined Planes',
      'Angular Impulse & Sudden Constraint Changes',
    ],
    theorySections: [
      {
        sectionTitle: '1. Moment of Inertia & Parallel/Perpendicular Axis Theorems',
        content: `The Moment of Inertia $I$ measures a body's resistance to angular acceleration. For continuous mass distributions:
$$I = \\int r^2 dm$$
Parallel Axis Theorem: $I = I_{cm} + Md^2$, where $d$ is the perpendicular distance between the center of mass axis and the parallel axis.
Perpendicular Axis Theorem (Valid ONLY for planar laminar bodies in xy-plane): $I_z = I_x + I_y$.`,
        keyTakeaway: 'Always verify planar symmetry before using Perpendicular Axis Theorem. For 3D symmetrical bodies like spheres or cylinders, use integration by cylindrical shells or spherical disks.',
        derivation: 'For a solid uniform cylinder of mass M and radius R about its longitudinal axis:\n$dm = \\rho (2\\pi r dr L) = \\frac{M}{\\pi R^2 L} (2\\pi r L dr) = \\frac{2M}{R^2} r dr$\n$I = \\int_0^R r^2 \\left(\\frac{2M}{R^2} r dr\\right) = \\frac{2M}{R^2} \\int_0^R r^3 dr = \\frac{1}{2}MR^2$.'
      },
      {
        sectionTitle: '2. Instantaneous Center of Rotation (ICR)',
        content: `For any 2D rigid body undergoing general planar motion (translation + rotation), there exists a point in space (inside or outside the body) at any instant that has ZERO velocity.
Velocity of any point P relative to ICR:
$$\\vec{v}_P = \\vec{\\omega} \\times \\vec{r}_{P/ICR}$$
This converts complex combined translation-rotation problems into pure rotation about the ICR.`,
        keyTakeaway: 'In pure rolling without slipping, the contact point on the surface is the ICR! Thus $\\vec{v}_{cm} = \\omega R$.',
      },
      {
        sectionTitle: '3. Angular Momentum & Conservation Principles',
        content: `Angular momentum about an arbitrary point O:
$$\\vec{L}_O = \\vec{r}_{cm/O} \\times M\\vec{v}_{cm} + I_{cm}\\vec{\\omega}$$
If net external torque about point O is zero ($\\vec{\\tau}_{ext, O} = 0$), then $\\vec{L}_O$ is strictly conserved. Note: The point O must be either an inertial fixed point OR the center of mass.`,
        keyTakeaway: 'For collision problems involving hinges or rough surfaces, always choose a reference point where reaction forces exert zero torque!',
      },
    ],
    formulas: [
      {
        id: 'f-1',
        title: 'Torque & Angular Acceleration Relationship',
        expression: '\\tau_{\\text{ext}} = I_{\\text{axis}} \\cdot \\alpha',
        variables: [
          { name: 'Torque', symbol: 'τ', unit: 'N·m' },
          { name: 'Moment of Inertia', symbol: 'I', unit: 'kg·m²' },
          { name: 'Angular Acceleration', symbol: 'α', unit: 'rad/s²' },
        ],
        keyConcept: 'Torque must be calculated about a fixed inertial point or the center of mass.',
        jeeTip: 'In non-inertial frames, include torque due to pseudo-force acting at the Center of Mass!',
      },
      {
        id: 'f-2',
        title: 'Total Kinetic Energy of Rigid Body',
        expression: 'K_{\\text{total}} = \\frac{1}{2} M v_{\\text{cm}}^2 + \\frac{1}{2} I_{\\text{cm}} \\omega^2',
        variables: [
          { name: 'Mass', symbol: 'M', unit: 'kg' },
          { name: 'Velocity of CM', symbol: 'v_cm', unit: 'm/s' },
          { name: 'Angular Velocity', symbol: 'ω', unit: 'rad/s' },
        ],
        keyConcept: 'Decomposition into translational kinetic energy of CM plus rotational kinetic energy relative to CM.',
        jeeTip: 'Alternatively, K_{\\text{total}} = \\frac{1}{2} I_{\\text{ICR}} \\omega^2 using the Instantaneous Center of Rotation.',
      },
      {
        id: 'f-3',
        title: 'Pure Rolling Condition',
        expression: 'v_{\\text{cm}} = \\omega R \\quad \\text{and} \\quad a_{\\text{cm}} = \\alpha R',
        variables: [
          { name: 'CM Velocity', symbol: 'v_cm', unit: 'm/s' },
          { name: 'Radius', symbol: 'R', unit: 'm' },
        ],
        keyConcept: 'Zero relative velocity between bottom-most contact point and supporting surface.',
      },
    ],
    solvedExamples: [
      {
        id: 'ex-1',
        title: 'Uniform Disc Rolling on Moving Plank',
        type: 'multi',
        question: 'A uniform solid disc of mass M and radius R is placed on a rough plank of mass 2M. The plank rests on a smooth horizontal floor. A horizontal force F is applied to the plank. Friction between disc and plank is sufficient for pure rolling. Which of the following statements are correct?',
        options: [
          'A) Acceleration of the plank is F / (3M)',
          'B) Friction force acting on the disc is F / 7',
          'C) Acceleration of center of mass of disc is F / (7M)',
          'D) Angular acceleration of disc is 2F / (7M R)',
        ],
        correctAnswer: ['B', 'C', 'D'],
        stepByStepSolution: [
          'Let a_p be the plank acceleration to the right.',
          'Let f be static friction acting to the right on the disc (and to the left on the plank).',
          'For plank: F - f = (2M) * a_p  =>  a_p = (F - f) / (2M).',
          'For disc translation: f = M * a_d  =>  a_d = f / M.',
          'For disc rotation about CM: f * R = I_cm * α = (1/2 M R²) * α  =>  α = 2f / (M R).',
          'Pure rolling condition relative to plank: a_contact_disc = a_p  =>  a_d + α R = a_p.',
          'Substitute a_d and α: f/M + (2f/M) = (F - f)/(2M)  =>  3f/M = (F - f)/(2M).',
          'Cross multiply: 6f = F - f  =>  7f = F  =>  f = F / 7.',
          'Thus a_d = F / (7M), α = 2F / (7M R), and a_p = (6F/7)/(2M) = 3F / (7M).',
        ],
        jeeTrap: 'Students often assume plank acceleration is F / (3M) ignoring the rotational inertia contribution of the disc!',
      },
      {
        id: 'ex-2',
        title: 'Sphere Impacting Rigid Step',
        type: 'integer',
        question: 'A uniform solid sphere of mass M and radius R rolls without slipping with velocity v_0 on a horizontal floor. It collides with a step of height h = R/2. Assuming the sphere does not slip against the corner of the step during impact, find the minimum velocity v_0 (in terms of sqrt(gR)) required for the sphere to climb the step.',
        correctAnswer: 'sqrt(140gR / 121)',
        stepByStepSolution: [
          'During the instantaneous impact with the corner P of the step, normal force from the floor drops to zero, and a large impulse acts at P.',
          'Calculate angular momentum about corner P before impact:',
          'L_before = M v_0 (R - h) + I_cm ω_0 = M v_0 (R/2) + (2/5 M R²) (v_0/R) = (9/10) M R v_0.',
          'Since impact force passes through corner P, torque about P during collision is zero, conserving L about P.',
          'L_after = I_P ω_after = (I_cm + M R²) ω_after = (7/5 M R²) ω_after.',
          'Equating L_before = L_after: (9/10) M R v_0 = (7/5 M R²) ω_after  =>  ω_after = (45 / 70) (v_0 / R) = (9 / 14) (v_0 / R).',
          'To just climb the step, kinetic energy immediately after impact must overcome increase in potential energy as CM rises to be directly above P (height rise Δh = R/2).',
          '(1/2) I_P ω_after² >= M g (R/2).',
          '(1/2) (7/5 M R²) (81 / 196) (v_0² / R²) >= M g R / 2  =>  v_0 >= sqrt(140 g R / 81).',
        ],
        jeeTrap: 'Linear momentum is NOT conserved because of external impulse at the step corner! Only Angular Momentum about point P is conserved.',
      },
    ],
    interactiveSimType: 'rotation',
  },
  {
    id: 'electrostatics-capacitance',
    unit: 'electrodynamics',
    unitTitle: 'Electrodynamics',
    title: 'Electrostatics & Advanced Capacitance',
    subtitle: 'Gauss Law, Field Equations, Image Charges & Dielectric Insertion',
    badge: 'CORE MODULE (12%)',
    description: 'Deep dive into electric potential surfaces, Gauss Law differential form, method of image charges, conductor shielding, and energy changes during dielectric insertion.',
    difficulty: 'Extreme (Pathfinder Level)',
    estimatedStudyTime: '10 Hours',
    weightagePercentage: 12,
    keyTopics: [
      'Gauss Law in Solid Geometry & Non-Uniform Charge Distributions',
      'Method of Image Charges for Spherical and Planar Conductors',
      'Electrostatic Pressure & Stress Tensor on Charged Conductors',
      'Dielectric Boundary Conditions & Variable Dielectric Constants',
      'Transient Energy Flow in Capacitive Circuits',
    ],
    theorySections: [
      {
        sectionTitle: '1. Gauss Law & Spherical / Cylindrical Charge Distributions',
        content: `Integral Form of Gauss Law:
$$\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{enclosed}}{\\varepsilon_0}$$
For non-uniform volume charge density $\\rho(r) = \\rho_0 (1 - r/R)$, the enclosed charge within radius $r < R$ is:
$$Q_{enc}(r) = 4\\pi \\int_0^r r'^2 \\rho(r') dr'$$`,
        keyTakeaway: 'The electric field inside a non-uniformly charged sphere peaks where $dE/dr = 0$.',
      },
      {
        sectionTitle: '2. Method of Image Charges',
        content: `To solve boundary-value electrostatic problems near grounded conductors without solving Poisson's PDE directly, replace the conductor with imaginary "image charges" that satisfy the equipotential boundary conditions ($V=0$ on surface).
For a point charge $q$ at distance $d$ from a grounded conducting sphere of radius $R$:
Image charge magnitude: $q' = -q \\frac{R}{d}$
Image charge position: $x' = \\frac{R^2}{d}$ from the center of the sphere.`,
        keyTakeaway: 'Image charges lie INSIDE the conductor and mimic boundary conditions outside the conductor.',
      },
    ],
    formulas: [
      {
        id: 'f-4',
        title: 'Electrostatic Pressure on Conductor Surface',
        expression: 'P = \\frac{\\sigma^2}{2 \\varepsilon_0} = \\frac{1}{2} \\varepsilon_0 E^2',
        variables: [
          { name: 'Surface Charge Density', symbol: 'σ', unit: 'C/m²' },
          { name: 'Electric Field', symbol: 'E', unit: 'V/m' },
        ],
        keyConcept: 'Outward electrostatic repulsive pressure exerted on any charged conductor surface.',
      },
      {
        id: 'f-5',
        title: 'Capacitance with Variable Dielectric k(x)',
        expression: '\\frac{1}{C} = \\int \\frac{dx}{k(x) \\varepsilon_0 A}',
        variables: [
          { name: 'Dielectric Profile', symbol: 'k(x)', unit: 'dimensionless' },
          { name: 'Plate Area', symbol: 'A', unit: 'm²' },
        ],
        keyConcept: 'Slice into series micro-capacitors when dielectric varies along plate separation x.',
      },
    ],
    solvedExamples: [
      {
        id: 'ex-3',
        title: 'Force on Dielectric Slab Being Pulled into Capacitor',
        type: 'single',
        question: 'A parallel plate capacitor with plate area A and separation d is connected to a battery of voltage V. A dielectric slab of dielectric constant K is inserted to length x. What is the electrostatic force pulling the dielectric slab inside?',
        options: [
          'A) F = (ε_0 b V² / 2d) * (K - 1)',
          'B) F = (ε_0 b V² / d) * (K - 1)',
          'C) F = (ε_0 A V² / 2d²) * K',
          'D) F = 0',
        ],
        correctAnswer: 'A',
        stepByStepSolution: [
          'Capacitance as a function of insertion length x (where plate width is b, so A = b*L):',
          'C(x) = C_air + C_dielectric = ε_0 (L - x) b / d + K ε_0 x b / d = (ε_0 b / d) [ L + (K - 1) x ].',
          'Since battery maintains constant voltage V:',
          'Force F = +(1/2) V² (dC / dx).',
          'dC/dx = (ε_0 b / d) (K - 1).',
          'F = (1/2) V² * (ε_0 b / d) (K - 1) = [ ε_0 b V² / (2d) ] (K - 1).',
        ],
        jeeTrap: 'Do NOT use F = -dU/dx with negative sign when battery is connected! With battery connected, F = +d(1/2 C V²)/dx because battery does work W_b = ΔC V².',
      },
    ],
    interactiveSimType: 'circuit',
  },
  {
    id: 'electromagnetic-induction',
    unit: 'electrodynamics',
    unitTitle: 'Electrodynamics',
    title: 'Electromagnetic Induction & AC Circuits',
    subtitle: 'Faradays Law, Motional EMF, Mutual Inductance & LCR Resonance',
    badge: 'MUST STUDY (10%)',
    description: 'Faraday-Lenz law, motional EMF in rotating conductors, induced electric field in cylindrical magnetic fields, mutual inductance matrix, and complex phasor analysis of LCR resonance.',
    difficulty: 'Extreme (Pathfinder Level)',
    estimatedStudyTime: '10 Hours',
    weightagePercentage: 10,
    keyTopics: [
      'Induced Non-Conservative Electric Field: ∮ E·dl = -dΦ/dt',
      'Motional EMF in Rotating Conductors & Sliding Rods',
      'Self & Mutual Inductance (Coupling Coefficient k = M / √(L1 L2))',
      'Transient Response in RL, RC, and RLC Circuits',
      'AC Power Factor, Quality Factor Q = (1/R) √(L/C) & Resonance',
    ],
    theorySections: [
      {
        sectionTitle: '1. Induced Non-Conservative Electric Field',
        content: `A time-varying magnetic field induces a non-conservative electric field $\\vec{E}_{ind}$:
$$\\oint \\vec{E}_{ind} \\cdot d\\vec{l} = -\\frac{d\\Phi_B}{dt}$$
Inside a cylindrical region of radius $R$ where $B(t)$ varies with time ($dB/dt$):
For $r < R$: $E_{ind}(r) = \\frac{r}{2} \\frac{dB}{dt}$
For $r > R$: $E_{ind}(r) = \\frac{R^2}{2r} \\frac{dB}{dt}$`,
        keyTakeaway: 'The induced electric field field lines form closed concentric loops! Potential difference between two points depends on the path taken.',
      },
    ],
    formulas: [
      {
        id: 'f-6',
        title: 'Motional EMF in Rotating Rod',
        expression: '\\varepsilon = \\frac{1}{2} B \\omega L^2',
        variables: [
          { name: 'Magnetic Field', symbol: 'B', unit: 'Tesla' },
          { name: 'Angular Speed', symbol: 'ω', unit: 'rad/s' },
          { name: 'Length of Rod', symbol: 'L', unit: 'm' },
        ],
        keyConcept: 'EMF induced across a conductor of length L rotating in uniform perpendicular magnetic field.',
      },
      {
        id: 'f-7',
        title: 'LCR Circuit Quality Factor Q',
        expression: 'Q = \\frac{1}{R} \\sqrt{\\frac{L}{C}} = \\frac{\\omega_0 L}{R}',
        variables: [
          { name: 'Resonance Frequency', symbol: 'ω_0', unit: 'rad/s' },
          { name: 'Resistance', symbol: 'R', unit: 'Ω' },
        ],
        keyConcept: 'Sharpeness of resonance peak in series AC LCR circuit.',
      },
    ],
    solvedExamples: [
      {
        id: 'ex-4',
        title: 'Superconducting Ring in Uniform Magnetic Field',
        type: 'integer',
        question: 'A superconducting ring of radius R and self-inductance L is initially in a region with zero magnetic field. A uniform magnetic field B perpendicular to the plane of the ring is switched on. Find the current induced in the ring.',
        correctAnswer: 'π R² B / L',
        stepByStepSolution: [
          'For a superconductor, resistance R_res = 0.',
          'By Faraday Law: ε = -dΦ_total / dt = I * R_res = 0.',
          'Therefore, total magnetic flux through superconducting loop remains CONSTANT (Flux Preservation).',
          'Φ_total = Φ_external + Φ_self = B * (π R²) + L * I = 0.',
          'Induced current magnitude |I| = π R² B / L.',
        ],
        jeeTrap: 'Because resistance is zero, the current does NOT decay with time! Flux is frozen inside the loop.',
      },
    ],
    interactiveSimType: 'circuit',
  },
  {
    id: 'thermodynamics-ktg',
    unit: 'thermodynamics',
    unitTitle: 'Thermal Physics',
    title: 'Thermodynamics & Kinetic Theory of Gases',
    subtitle: 'Polytropic Processes, First & Second Laws, Real Gases & Heat Transfer',
    badge: 'HIGH SCORING (11%)',
    description: 'Polytropic processes PV^n = C, molar heat capacity calculations, van der Waals equation for real gases, Maxwell-Boltzmann velocity distribution, and Stefan-Boltzmann radiation law.',
    difficulty: 'Moderate',
    estimatedStudyTime: '8 Hours',
    weightagePercentage: 11,
    keyTopics: [
      'First Law of Thermodynamics: dQ = dU + dW',
      'Polytropic Process Heat Capacity: C = C_v + R / (1 - n)',
      'Van der Waals Equation: (P + a/V²)(V - b) = RT',
      'Maxwell-Boltzmann Speed Distribution (v_rms, v_av, v_mp)',
      'Heat Conduction Differential Equation & Radiation Wien Law',
    ],
    theorySections: [
      {
        sectionTitle: '1. Polytropic Processes & Heat Capacity',
        content: `A process represented by $P V^n = \\text{constant}$ is called a polytropic process.
Molar Heat Capacity $C$:
$$C = C_v + \\frac{R}{1 - n}$$
Work done in polytropic process:
$$W = \\frac{P_1 V_1 - P_2 V_2}{n - 1} = \\frac{n R (T_1 - T_2)}{n - 1}$$`,
        keyTakeaway: 'For adiabatic n = γ (C = 0), for isothermal n = 1 (C = ∞), for isobaric n = 0 (C = C_p).',
      },
    ],
    formulas: [
      {
        id: 'f-8',
        title: 'Molar Heat Capacity in Polytropic Process',
        expression: 'C = C_v + \\frac{R}{1 - n}',
        variables: [
          { name: 'Specific Heat at Const Vol', symbol: 'C_v', unit: 'J/(mol·K)' },
          { name: 'Polytropic Index', symbol: 'n', unit: 'dimensionless' },
        ],
        keyConcept: 'Direct calculation of heat capacity for non-standard PV^n processes.',
      },
    ],
    solvedExamples: [
      {
        id: 'ex-5',
        title: 'Process with Linear P-V Relationship',
        type: 'multi',
        question: 'One mole of an ideal monoatomic gas (C_v = 3R/2) undergoes a process P = P_0 - α V where P_0 and α are positive constants. Which of the following statements are true?',
        options: [
          'A) Maximum temperature reached by gas is P_0² / (4 α R)',
          'B) Molar heat capacity becomes negative in part of the process',
          'C) Heat capacity C = 0 when V = P_0 / (4 α)',
          'D) Gas expands absorbing heat initially and then releasing heat',
        ],
        correctAnswer: ['A', 'B', 'D'],
        stepByStepSolution: [
          'P = P_0 - α V. Using PV = RT  =>  T(V) = (P_0 V - α V²) / R.',
          'To find maximum temperature, dT/dV = (P_0 - 2αV)/R = 0  =>  V_max = P_0 / (2α).',
          'T_max = (P_0 (P_0 / 2α) - α (P_0 / 2α)²) / R = P_0² / (4 α R).',
          'dQ = dU + dW = n C_v dT + P dV.',
          'C = dQ / (n dT) = C_v + P / (dT/dV).',
          'dT/dV = (P_0 - 2αV)/R.',
          'C = 3R/2 + (P_0 - αV) R / (P_0 - 2αV).',
          'Notice when P_0/2α < V < P_0/α, numerator is positive but denominator is negative! So C becomes negative.',
        ],
        jeeTrap: 'Gas can expand while RELEASING heat when molar heat capacity is negative!',
      },
    ],
    interactiveSimType: 'projectile',
  },
  {
    id: 'wave-optics',
    unit: 'waves_optics',
    unitTitle: 'Waves & Optics',
    title: 'Wave Optics & Interference Phenomena',
    subtitle: 'Youngs Double Slit, Thin Film Interference, Diffraction & Polarization',
    badge: 'CONCEPT DENSE (9%)',
    description: 'Path difference equations, glass slab insertion shift, Lloyd mirror Lloyd mirror phase change, Fresnel diffraction, resolving power, and Brewster law polarization.',
    difficulty: 'Hard',
    estimatedStudyTime: '9 Hours',
    weightagePercentage: 9,
    keyTopics: [
      'Youngs Double Slit Experiment (YDSE) with Inclined Waves',
      'Optical Path Length Shift: Δx = (μ - 1) t',
      'Lloyds Mirror & Phase Inversion on Reflection',
      'Single Slit Diffraction Minima: a sin θ = n λ',
      'Brewster Angle Polarization: tan θ_p = μ',
    ],
    theorySections: [
      {
        sectionTitle: '1. Optical Path Difference & Glass Slab Insertion',
        content: `When a transparent sheet of thickness $t$ and refractive index $\\mu$ is placed in front of one slit in YDSE:
Optical path added: $(\\mu - 1) t$
Fringe pattern shift on screen:
$$y_{shift} = \\frac{D}{d} (\\mu - 1) t$$`,
        keyTakeaway: 'The central bright fringe shifts towards the slit covered by the glass slab.',
      },
    ],
    formulas: [
      {
        id: 'f-9',
        title: 'Fringe Width in YDSE',
        expression: '\\beta = \\frac{\\lambda D}{d}',
        variables: [
          { name: 'Wavelength', symbol: 'λ', unit: 'm' },
          { name: 'Screen Distance', symbol: 'D', unit: 'm' },
          { name: 'Slit Separation', symbol: 'd', unit: 'm' },
        ],
        keyConcept: 'Distance between two consecutive bright or dark fringes on screen.',
      },
    ],
    solvedExamples: [
      {
        id: 'ex-6',
        title: 'YDSE with White Light and Film Inversion',
        type: 'single',
        question: 'In a YDSE, light of wavelength 600 nm is used. A thin glass plate (μ = 1.5) is inserted in the upper beam, shifting the central maximum to the position previously occupied by the 5th bright fringe. What is the thickness of the glass plate?',
        options: ['A) 6 μm', 'B) 8 μm', 'C) 10 μm', 'D) 12 μm'],
        correctAnswer: 'A',
        stepByStepSolution: [
          'Shift y_shift = (D / d) * (μ - 1) t.',
          'Position of 5th bright fringe y_5 = 5 * (λ D / d).',
          'Equating: (D / d) * (μ - 1) t = 5 * (λ D / d).',
          '(μ - 1) t = 5 λ.',
          '(1.5 - 1) t = 5 * 600 nm  =>  0.5 t = 3000 nm  =>  t = 6000 nm = 6 μm.',
        ],
        jeeTrap: 'Make sure not to confuse bright fringe count with dark fringe count!',
      },
    ],
    interactiveSimType: 'optics',
  },
  {
    id: 'modern-physics',
    unit: 'modern_physics',
    unitTitle: 'Modern Physics',
    title: 'Modern Physics, Bohr Model & Nuclear Physics',
    subtitle: 'Photoelectric Effect, X-Rays Moseley Law, Radioactive Chains & Mass Defect',
    badge: 'HIGH RETURN (12%)',
    description: 'Bohr-Sommerfeld atomic orbits, De Broglie matter waves, Photoelectric stopping potential, Characteristic X-Ray Moseley law, radioactive decay equilibrium, and nuclear Q-value.',
    difficulty: 'Moderate',
    estimatedStudyTime: '8 Hours',
    weightagePercentage: 12,
    keyTopics: [
      'Einstein Photoelectric Equation: K_max = hν - Φ',
      'Bohr Atomic Model Energy Levels: E_n = -13.6 Z² / n² eV',
      'Moseley Law for Characteristic X-Rays: √ν = a (Z - b)',
      'Radioactive Decay Chains & Successive Decay Equilibrium',
      'Nuclear Binding Energy Curve & Q-Value Calculations',
    ],
    theorySections: [
      {
        sectionTitle: '1. Photoelectric Effect & Stopping Potential',
        content: `Photon energy $E = h\\nu = \\frac{hc}{\\lambda}$.
Einstein\'s Photoelectric Equation:
$$K_{max} = e V_s = h\\nu - \\Phi$$
where $V_s$ is the stopping potential and $\\Phi$ is the metal work function.`,
        keyTakeaway: 'Stopping potential depends ONLY on photon frequency and work function, NOT on beam intensity!',
      },
    ],
    formulas: [
      {
        id: 'f-10',
        title: 'Moseley Law for K-alpha X-Rays',
        expression: '\\sqrt{\\nu} = a (Z - 1)',
        variables: [
          { name: 'X-Ray Frequency', symbol: 'ν', unit: 'Hz' },
          { name: 'Atomic Number', symbol: 'Z', unit: 'dimensionless' },
        ],
        keyConcept: 'Screening constant b = 1 for K-alpha X-ray transitions.',
      },
    ],
    solvedExamples: [
      {
        id: 'ex-7',
        title: 'Radioactive Decay Equilibrium',
        type: 'integer',
        question: 'A radioactive nucleus A decays into nucleus B with decay constant λ_A. Nucleus B further decays into stable nucleus C with decay constant λ_B = 2 λ_A. Initially only N_0 nuclei of A are present. Find the time t at which the population of nucleus B reaches its maximum.',
        correctAnswer: 'ln(2) / λ_A',
        stepByStepSolution: [
          'Rate equations: dN_A/dt = -λ_A N_A  =>  N_A(t) = N_0 e^(-λ_A t).',
          'dN_B/dt = λ_A N_A - λ_B N_B = λ_A N_0 e^(-λ_A t) - λ_B N_B.',
          'To find maximum N_B, set dN_B/dt = 0.',
          'λ_A N_A(t_max) = λ_B N_B(t_max).',
          'N_B(t) solution: N_B(t) = [ λ_A N_0 / (λ_B - λ_A) ] * ( e^(-λ_A t) - e^(-λ_B t) ).',
          'Plugging in λ_B = 2 λ_A: N_B(t) = N_0 ( e^(-λ_A t) - e^(-2 λ_A t) ).',
          'Set derivative dN_B/dt = 0  =>  -λ_A e^(-λ_A t) + 2 λ_A e^(-2 λ_A t) = 0.',
          'e^(-λ_A t) = 1/2  =>  -λ_A t = ln(1/2)  =>  t = ln(2) / λ_A.',
        ],
        jeeTrap: 'Maximum population of daughter B occurs when production rate equals its decay rate!',
      },
    ],
    interactiveSimType: 'projectile',
  },
  {
    id: 'experimental-physics',
    unit: 'experimental',
    unitTitle: 'Experimental Physics',
    title: 'Errors, Vernier Calipers & Experimental Setup',
    subtitle: 'Error Propagation, Least Count Analysis, Screw Gauge & Lab Instruments',
    badge: 'ESSENTIAL MARKS (6%)',
    description: 'Master practical lab physics for JEE Advanced: Vernier calipers zero errors, micrometer screw gauge pitch, error estimation in Ohm law, resonance tube experiment, and focal length measurement.',
    difficulty: 'Moderate',
    estimatedStudyTime: '5 Hours',
    weightagePercentage: 6,
    keyTopics: [
      'Vernier Calipers Least Count = 1 MSD - 1 VSD',
      'Screw Gauge Pitch and Zero Correction (Positive/Negative)',
      'Error Propagation Math: Fractional Error in X = A^a B^b / C^c',
      'Resonance Tube Experiment for Speed of Sound & End Correction',
      'Searle Apparatus for Youngs Modulus Measurement',
    ],
    theorySections: [
      {
        sectionTitle: '1. Least Count & Zero Error Calculations',
        content: `Vernier Calliper Least Count (LC):
$$LC = 1 \\text{ MSD} - 1 \\text{ VSD}$$
If $N$ VSD divisions equal $(N-1)$ MSD divisions, then $LC = \\frac{1 \\text{ MSD}}{N}$.
True Reading Formula:
$$\\text{True Reading} = \\text{Observed Reading} - \\text{Zero Error}$$`,
        keyTakeaway: 'Positive zero error is SUBTRACTED; Negative zero error is ADDED to the observed reading!',
      },
    ],
    formulas: [
      {
        id: 'f-11',
        title: 'Fractional Error Propagation',
        expression: '\\frac{\\Delta Z}{Z} = |a| \\frac{\\Delta A}{A} + |b| \\frac{\\Delta B}{B} + |c| \\frac{\\Delta C}{C}',
        variables: [
          { name: 'Quantity Z', symbol: 'Z = \\frac{A^a B^b}{C^c}', unit: 'various' },
        ],
        keyConcept: 'Maximum percentage errors are ALWAYS added, never subtracted!',
      },
    ],
    solvedExamples: [
      {
        id: 'ex-8',
        title: 'Screw Gauge Measurement with Zero Error',
        type: 'single',
        question: 'A screw gauge has a pitch of 0.5 mm and 50 circular scale divisions. When the jaws are closed, the 5th division of circular scale coincides with reference line and zero lies below reference line (positive zero error). When a wire is clamped, main scale reads 2.5 mm and 20th circular division coincides. What is the true diameter of the wire?',
        options: ['A) 2.65 mm', 'B) 2.70 mm', 'C) 2.85 mm', 'D) 2.55 mm'],
        correctAnswer: 'A',
        stepByStepSolution: [
          'Least Count (LC) = Pitch / Total Circular Divisions = 0.5 mm / 50 = 0.01 mm.',
          'Zero Error = +5 * LC = +0.05 mm.',
          'Observed Reading = Main Scale Reading + (Coinciding Circular Division * LC)',
          'Observed Reading = 2.5 mm + (20 * 0.01 mm) = 2.5 + 0.20 = 2.70 mm.',
          'True Diameter = Observed Reading - Zero Error = 2.70 mm - 0.05 mm = 2.65 mm.',
        ],
        jeeTrap: 'Always subtract positive zero error from the observed reading!',
      },
    ],
    interactiveSimType: 'projectile',
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    chapterId: 'rotational-dynamics',
    chapterTitle: 'Rotational Dynamics',
    unit: 'mechanics',
    front: 'What is the Parallel Axis Theorem for Moment of Inertia?',
    back: 'I_{\\text{axis}} = I_{\\text{cm}} + M d^2, where d is the perpendicular distance between the axis through Center of Mass and the parallel axis.',
    formula: 'I_{\\text{axis}} = I_{\\text{cm}} + M d^2',
  },
  {
    id: 'fc-2',
    chapterId: 'rotational-dynamics',
    chapterTitle: 'Rotational Dynamics',
    unit: 'mechanics',
    front: 'What is the velocity of the top-most point of a sphere rolling without slipping with CM velocity v?',
    back: 'v_{\\text{top}} = v_{\\text{cm}} + \\omega R = v + v = 2v (forward relative to ground).',
    formula: 'v_{\\text{top}} = 2 v_{\\text{cm}}',
  },
  {
    id: 'fc-3',
    chapterId: 'electrostatics-capacitance',
    chapterTitle: 'Electrostatics',
    unit: 'electrodynamics',
    front: 'What is the image charge magnitude and location for point charge q near grounded sphere of radius R at distance d?',
    back: 'Image charge q\' = -q \\left(\\frac{R}{d}\\right), located at distance x\' = \\frac{R^2}{d} from the sphere center.',
    formula: 'q\' = -q \\left(\\frac{R}{d}\\right), \\quad x\' = \\frac{R^2}{d}',
  },
  {
    id: 'fc-4',
    chapterId: 'electromagnetic-induction',
    chapterTitle: 'EMI & AC',
    unit: 'electrodynamics',
    front: 'What is the quality factor Q of a series LCR resonant circuit?',
    back: 'Q = \\frac{1}{R} \\sqrt{\\frac{L}{C}} = \\frac{\\omega_0 L}{R}. High Q factor implies a sharp resonance peak.',
    formula: 'Q = \\frac{1}{R} \\sqrt{\\frac{L}{C}}',
  },
  {
    id: 'fc-5',
    chapterId: 'thermodynamics-ktg',
    chapterTitle: 'Thermodynamics',
    unit: 'thermodynamics',
    front: 'What is the molar heat capacity C for a polytropic process PV^n = Constant?',
    back: 'C = C_v + \\frac{R}{1 - n}. For monoatomic gas, C_v = \\frac{3}{2}R.',
    formula: 'C = C_v + \\frac{R}{1 - n}',
  },
  {
    id: 'fc-6',
    chapterId: 'wave-optics',
    chapterTitle: 'Wave Optics',
    unit: 'waves_optics',
    front: 'What is the fringe shift in YDSE when a glass slab of thickness t and refractive index μ is inserted?',
    back: 'Shift y_{\\text{shift}} = \\frac{D}{d}(\\mu - 1)t towards the side of the slab.',
    formula: 'y_{\\text{shift}} = \\frac{D}{d}(\\mu - 1)t',
  },
];
