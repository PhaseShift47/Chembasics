/**
 * ChemBasics - Data Store
 */

window.ChemData = {
    fundamentals: [
        {
            id: 'atomic_structure',
            category: 'Atomic Structure',
            topics: [
                {
                    id: 'atom_basics',
                    title: 'Mole Concept',
                    explanation: 'The mole is the standard unit for continuous amount of substance in chemistry. It bridges the gap between the micro world of atoms and the macro world of grams we measure in the lab.',
                    formula: 'moles (n) = mass (g) / Molar Mass (g/mol)',
                    example: 'Ordering 1 mole of water is like ordering 1 dozen eggs, except a mole is exactly 6.022 × 10²³ "eggs" (molecules) and weighs about 18 grams.',
                    notes: 'Avogadro\'s number (6.022 × 10²³) is the exact number of particles (atoms, molecules, ions) in one mole.'
                },
                {
                    id: 'orbitals',
                    title: 'Atomic Orbitals',
                    explanation: 'Orbitals are specific 3D regions around a nucleus where there is the highest probability of finding an electron. Unlike planets orbiting the sun, electrons exist in electron "clouds" of specific shapes.',
                    formula: 'Max electrons per shell = 2n² (where n is the principal quantum number)',
                    example: 'Think of orbitals like different-shaped balloons (s is a sphere, p is a dumbbell) tied around a central knot (the nucleus) where electrons "live".',
                    notes: 'The main types of orbitals are s, p, d, and f. An s-subshell holds 2 electrons max, p holds 6, d holds 10, and f holds 14.'
                },
                {
                    id: 'quantum_numbers',
                    title: 'Quantum Numbers',
                    explanation: 'A set of four numbers used to completely describe the state and address of an electron in an atom.',
                    formula: 'n = 1,2,3... ; l = 0 to (n-1) ; ml = -l to +l ; ms = +1/2 or -1/2',
                    example: 'Finding an electron is like mailing a letter. You need the state (n, shell), city (l, subshell), street (ml, specific orbital), and house number (ms, electron spin).',
                    notes: 'Pauli Exclusion Principle states no two electrons in the same atom can have the exact same four quantum numbers.'
                },
                {
                    id: 'periodic_trends',
                    title: 'Periodic Trends',
                    explanation: 'Predictable patterns in elemental properties across the periodic table, driven by the number of valence electrons and nuclear charge (number of protons).',
                    formula: 'Effective Nuclear Charge (Z_eff) = Z (protons) - S (shielding electrons)',
                    example: 'Electronegativity is like a game of tug-of-war for electrons. Fluorine is the reigning champion, pulling electrons hardest toward itself.',
                    notes: 'Atomic Radius: Increases down, decreases right. Electronegativity & Ionization Energy: Increases up and to the right.'
                }
            ]
        },
        {
            id: 'chemical_interactions',
            category: 'Chemical Interactions',
            topics: [
                {
                    id: 'bond_types',
                    title: 'Chemical Bonding Types',
                    explanation: 'The electrostatic forces holding atoms together to form molecules or crystal lattices, aiming to achieve a stable octet (8 valence electrons).',
                    formula: 'ΔEN (Electronegativity Difference): >1.7 usually Ionic, 0.4-1.7 Polar Covalent, <0.4 Non-polar Covalent',
                    example: 'Ionic: NaCl (table salt) where Na gives an electron to Cl. Covalent: H₂O (water) where H and O share electrons.',
                    notes: 'Ionic bonds occur between metals + non-metals. Covalent bonds occur between non-metals + non-metals.'
                },
                {
                    id: 'imfs',
                    title: 'Intermolecular Forces (IMFs)',
                    explanation: 'The attractive or repulsive forces between molecules (not within them). They determine physical properties like boiling and melting points.',
                    formula: 'Strength order: Ion-Dipole > Hydrogen Bonding > Dipole-Dipole > London Dispersion Forces (LDF)',
                    example: 'Water beads up on a waxed car due to strong Hydrogen Bonding pulling water molecules together (surface tension), while the wax only has weak LDFs.',
                    notes: 'Hydrogen bonding only occurs when H is covalently bonded directly to N, O, or F.'
                }
            ]
        },
        {
            id: 'reactions_systems',
            category: 'Reactions & Systems',
            topics: [
                {
                    id: 'thermodynamics',
                    title: 'Thermodynamics Basics',
                    explanation: 'The study of heat, energy, and work in chemical reactions.',
                    formula: 'ΔG = ΔH - TΔS (Gibbs Free Energy equation)',
                    example: 'An ice pack getting cold when you crack it is an endothermic reaction (+ΔH) absorbing heat from your skin. Burning wood is exothermic (-ΔH).',
                    notes: 'A process is spontaneous if ΔG is negative. Enthalpy (ΔH) measures heat flow, and Entropy (ΔS) measures disorder or randomness.'
                },
                {
                    id: 'kinetics',
                    title: 'Chemical Kinetics Basics',
                    explanation: 'The study of reaction rates and the mechanisms (steps) by which chemical reactions occur.',
                    formula: 'Rate = k[A]^m[B]^n (Rate Law Equation)',
                    example: 'Food spoils much slower in a refrigerator because lowering the temperature decreases the kinetic energy of molecules, slowing down the spoiling reactions.',
                    notes: 'Reaction rate generally increases with higher temperature, higher concentration, greater surface area, and the presence of a catalyst.'
                },
                {
                    id: 'equilibrium',
                    title: 'Equilibrium Concepts',
                    explanation: 'The state representing a dynamic balance where the forward and reverse reaction rates are perfectly equal, so concentrations of products and reactants stop changing.',
                    formula: 'Kc = [Products]^coefficients / [Reactants]^coefficients',
                    example: 'A busy bridge between two islands. If the number of cars driving left equals the number of cars driving right, the total number of cars on each island remains constant, even though cars are still moving.',
                    notes: 'Le Chatelier\'s Principle states that if stress (temp, pressure, or concentration change) is applied to a system at equilibrium, it will shift to counteract the stress.'
                },
                {
                    id: 'ph_buffers',
                    title: 'pH and Buffer Systems',
                    explanation: 'The pH scale measures the acidity or basicity of an aqueous solution. A buffer is a solution that resists changes in pH when small amounts of acid or base are added.',
                    formula: 'pH = -log[H+] and pH = pKa + log([A-]/[HA]) (Henderson-Hasselbalch equation)',
                    example: 'Human blood contains a carbonic acid/bicarbonate buffer system that strictly maintains our blood pH around 7.4. Without it, drinking a soda could be lethal!',
                    notes: 'pH < 7 is acidic, pH 7 is neutral, and pH > 7 is basic. A buffer is made of a weak acid and its conjugate base (or a weak base and its conjugate acid).'
                }
            ]
        }
    ],
    flashcards: [
        { q: 'What is Avogadro\'s Number?', a: '6.022 × 10²³ particles per mole.' },
        { q: 'Which element is the most electronegative?', a: 'Fluorine (F).' },
        { q: 'What defines an Isotope?', a: 'Atoms of the same element with different numbers of neutrons (different mass number).' },
        { q: 'What is the standard unit of concentration used in chemistry?', a: 'Molarity (M), defined as moles of solute per liter of solution.' },
        { q: 'What does a catalyst do?', a: 'It lowers the activation energy of a reaction, increasing the rate without being consumed.' },
        { q: 'What are the three main subatomic particles?', a: 'Protons, Neutrons, and Electrons.' }
    ],
    labEquipment: [
        { name: 'Beaker', desc: 'Used for holding, mixing, and heating liquids. It has rough volume markings but is <strong>not</strong> accurate for precise measurements.', icon: '🫙' },
        { name: 'Graduated Cylinder', desc: 'Used for accurately measuring the volume of liquids. Always read the measurement from the bottom of the meniscus.', icon: '⚗️' },
        { name: 'Erlenmeyer Flask', desc: 'Features a conical shape and narrow neck, making it ideal for mixing chemicals by swirling without splashing.', icon: '🧪' },
        { name: 'Volumetric Flask', desc: 'Used to prepare solutions to an extremely precise volume at a specific temperature (usually 20°C).', icon: '🍷' },
        { name: 'Pipette', desc: 'A slender tube used to transport a measured volume of liquid with high precision.', icon: '🪄' }
    ]
};
