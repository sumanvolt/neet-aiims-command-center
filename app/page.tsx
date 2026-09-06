"use client";

import React, { useState, useEffect } from "react";
import GoalHeader from "@/components/GoalHeader";
import DailyTracker from "@/components/DailyTracker";
import SyllabusTracker, { NeetSubjectGroup, NeetSubTopic } from "@/components/SyllabusTracker";
import PWMockLogger, { PwMockEntry } from "@/components/PWMockLogger";

const OFFICIAL_NEET_SYLLABUS: NeetSubjectGroup[] = [
  {
    key: "bio",
    title: "Biology (Botany & Zoology)",
    marks: "360 Marks (50% Weightage)",
    chapters: [
      {
        id: "bio-u1",
        title: "UNIT 1: Diversity in Living World",
        weightage: "~28-32 Marks",
        subtopics: [
          { id: "b1-1", name: "What is living? Biodiversity, Need for classification, Taxonomy & Systematics", is8020: false, status: 0, ncertDone: false, dppDone: false },
          { id: "b1-2", name: "Five Kingdom System: Monera, Protista, Fungi; Lichens, Viruses, Viroids", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b1-3", name: "Plant Kingdom: Algae, Bryophytes, Pteridophytes, Gymnosperms", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b1-4", name: "Animal Kingdom: Non-chordata up to phyla, chordata up to classes", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u2",
        title: "UNIT 2: Structural Organisation in Animals & Plants",
        weightage: "~20-24 Marks",
        subtopics: [
          { id: "b2-1", name: "Morphology of flowering plants: Root, stem, leaf, inflorescence, flower, fruit & seed", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b2-2", name: "Plant Families: Malvaceae, Cruciferae, Leguminosae, Compositae, Gramineae", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b2-3", name: "Plant Anatomy: Tissues, tissue systems & internal structure", is8020: false, status: 0, ncertDone: false, dppDone: false },
          { id: "b2-4", name: "Animal Tissues & Morphology/Anatomy of Frog (Brief Account)", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u3",
        title: "UNIT 3: Cell Structure and Function",
        weightage: "~35-40 Marks",
        subtopics: [
          { id: "b3-1", name: "Cell Theory, Prokaryotic & Eukaryotic cells, Cell envelope & organelles", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b3-2", name: "Biomolecules: Proteins, Carbohydrates, Lipids, Nucleic Acids & Enzymes", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b3-3", name: "Cell Division: Cell cycle, Mitosis, Meiosis and their significance", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u4",
        title: "UNIT 4: Plant Physiology",
        weightage: "~28-32 Marks",
        subtopics: [
          { id: "b4-1", name: "Photosynthesis: Light reaction, Cyclic/Non-cyclic, C3 & C4 pathways, Chemiosmosis", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b4-2", name: "Respiration: Glycolysis, TCA cycle, ETS & ATP generation, Respiratory quotient", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b4-3", name: "Plant Growth & Regulators: Auxin, Gibberellin, Cytokinin, Ethylene, ABA", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u5",
        title: "UNIT 5: Human Physiology",
        weightage: "~45-50 Marks",
        subtopics: [
          { id: "b5-1", name: "Breathing & Respiration: Respiratory volumes, gas transport & disorders", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b5-2", name: "Body Fluids & Circulation: Blood groups, Cardiac cycle, ECG, Double circulation", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b5-3", name: "Excretion: Urine formation, Osmoregulation, RAAS mechanism, ADH & Dialysis", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b5-4", name: "Locomotion & Movement: Muscle contraction, Skeletal system, Joints & disorders", is8020: false, status: 0, ncertDone: false, dppDone: false },
          { id: "b5-5", name: "Neural Control: Neuron, conduction of nerve impulse, CNS & PNS", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b5-6", name: "Chemical Coordination: Endocrine glands, Hormones mechanism & disorders", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u6",
        title: "UNIT 6: Reproduction",
        weightage: "~35-40 Marks",
        subtopics: [
          { id: "b6-1", name: "Sexual Reproduction in Flowering Plants: Pollination, Double fertilization, Embryo", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b6-2", name: "Human Reproduction: Gametogenesis, Menstrual cycle, Fertilization, Parturition", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b6-3", name: "Reproductive Health: Contraception, MTP, STDs, Assisted Reproductive Tech (IVF)", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u7",
        title: "UNIT 7: Genetics and Evolution",
        weightage: "~48-52 Marks",
        subtopics: [
          { id: "b7-1", name: "Mendelian Genetics: Deviations, Linkage, Sex determination & Genetic disorders", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b7-2", name: "Molecular Basis: DNA replication, Transcription, Genetic code, Lac Operon, HGP", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b7-3", name: "Evolution: Origin of life, Natural selection, Hardy-Weinberg Principle, Human evolution", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u8",
        title: "UNIT 8: Biology and Human Welfare",
        weightage: "~16-20 Marks",
        subtopics: [
          { id: "b8-1", name: "Health & Disease: Pathogens (Malaria, Typhoid, AIDS), Immunity, Vaccines, Cancer", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b8-2", name: "Microbes in Human Welfare: Household, Sewage treatment, Biogas & Biofertilizers", is8020: false, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u9",
        title: "UNIT 9: Biotechnology and Its Applications",
        weightage: "~24-28 Marks",
        subtopics: [
          { id: "b9-1", name: "Biotech Principles: Recombinant DNA technology, PCR, Restriction enzymes", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b9-2", name: "Biotech Applications: Bt Crops, Insulin, Gene therapy, Transgenic animals & Biopiracy", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "bio-u10",
        title: "UNIT 10: Ecology and Environment",
        weightage: "~32-36 Marks",
        subtopics: [
          { id: "b10-1", name: "Organisms & Environment: Population interactions, Birth/Death rates, Age pyramids", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b10-2", name: "Ecosystem: Energy flow, Productivity, Ecological pyramids", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "b10-3", name: "Biodiversity & Conservation: Loss of biodiversity, Hotspots, National parks, Sacred groves", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
    ],
  },
  {
    key: "chem",
    title: "Chemistry (Physical, Inorganic, Organic)",
    marks: "180 Marks",
    chapters: [
      {
        id: "ch-u1",
        title: "UNIT 1: Some Basic Concepts in Chemistry",
        weightage: "~8 Marks",
        subtopics: [
          { id: "c1-1", name: "Mole Concept, Molar mass, Empirical & Molecular formula", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c1-2", name: "Chemical equations, Limiting reagent & Stoichiometry", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u2",
        title: "UNIT 2: Atomic Structure",
        weightage: "~8-12 Marks",
        subtopics: [
          { id: "c2-1", name: "Bohr's Model, Hydrogen spectrum & dual nature (de Broglie)", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c2-2", name: "Heisenberg uncertainty, Quantum numbers & Aufbau/Hund's rules", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u3",
        title: "UNIT 3: Chemical Bonding & Molecular Structure",
        weightage: "~16-20 Marks",
        subtopics: [
          { id: "c3-1", name: "Ionic & Covalent bonds, Lattice enthalpy & Fajan's rule", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c3-2", name: "VSEPR Theory & Molecular geometry", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c3-3", name: "Hybridization (sp, sp2, sp3, d-orbitals) & Dipole moment", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c3-4", name: "Molecular Orbital Theory (MOT) & Hydrogen bonding", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u4",
        title: "UNIT 4: Chemical Thermodynamics",
        weightage: "~8-12 Marks",
        subtopics: [
          { id: "c4-1", name: "First Law: Heat, Work, Internal energy & Enthalpy of reactions", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c4-2", name: "Second Law: Entropy (ΔS) and Gibbs Free Energy (ΔG) spontaneity", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u5",
        title: "UNIT 5: Solutions",
        weightage: "~8 Marks",
        subtopics: [
          { id: "c5-1", name: "Concentration units & Raoult's Law (Ideal/Non-ideal)", is8020: false, status: 0, ncertDone: false, dppDone: false },
          { id: "c5-2", name: "Colligative properties & van't Hoff factor (i)", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u6",
        title: "UNIT 6: Equilibrium",
        weightage: "~12-16 Marks",
        subtopics: [
          { id: "c6-1", name: "Chemical Equilibrium: Kp, Kc & Le Chatelier's Principle", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c6-2", name: "Ionic Equilibrium: pH, Buffer solutions, Salt hydrolysis & Ksp", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u7",
        title: "UNIT 7: Redox Reactions & Electrochemistry",
        weightage: "~12 Marks",
        subtopics: [
          { id: "c7-1", name: "Redox balancing & Oxidation number methods", is8020: false, status: 0, ncertDone: false, dppDone: false },
          { id: "c7-2", name: "Nernst Equation, Electrochemical cells & Kohlrausch's law", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u8",
        title: "UNIT 8: Chemical Kinetics",
        weightage: "~8-12 Marks",
        subtopics: [
          { id: "c8-1", name: "Order and Molecularity, Integrated rate law (Zero & First Order)", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c8-2", name: "Arrhenius equation & Activation energy calculation", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u9",
        title: "UNIT 9 & 10: Periodic Table & p-Block Elements",
        weightage: "~16 Marks",
        subtopics: [
          { id: "c9-1", name: "Periodic trends: Radii, Ionization energy, Electronegativity", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c9-2", name: "p-Block (Group 13 to 18): General electronic trends & anomalous behavior", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u11",
        title: "UNIT 11: d- & f- Block Elements",
        weightage: "~12 Marks",
        subtopics: [
          { id: "c11-1", name: "Transition elements trends, K2Cr2O7 & KMnO4 chemistry", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c11-2", name: "Lanthanoids (Contraction) & Actinoids oxidation states", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u12",
        title: "UNIT 12: Coordination Compounds",
        weightage: "~12-16 Marks",
        subtopics: [
          { id: "c12-1", name: "Werner's Theory, IUPAC nomenclature & Isomerism", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c12-2", name: "Valence Bond Theory (VBT) & Crystal Field Theory (CFT)", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u14",
        title: "UNIT 14 & 15: Organic Chemistry (GOC & Hydrocarbons)",
        weightage: "~24 Marks",
        subtopics: [
          { id: "c14-1", name: "Inductive, Electromeric, Resonance & Hyperconjugation", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c14-2", name: "Carbocation/Carbanion stability & Reaction mechanisms", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c14-3", name: "Alkanes, Alkenes (Markownikoff's rule, Ozonolysis) & Alkynes", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c14-4", name: "Aromatic hydrocarbons: Electrophilic substitution & Friedel-Crafts", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u16",
        title: "UNIT 16 & 17: Halogens & Oxygen Compounds (Alcohols, Aldehydes, Acids)",
        weightage: "~28 Marks",
        subtopics: [
          { id: "c16-1", name: "Haloalkanes & Haloarenes: SN1 and SN2 mechanisms", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c16-2", name: "Alcohols, Phenols (Reimer-Tiemann) & Ethers", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c16-3", name: "Aldehydes & Ketones: Nucleophilic addition, Aldol & Cannizzaro", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c16-4", name: "Carboxylic Acids: Acidic strength & key derivatives", is8020: false, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u18",
        title: "UNIT 18 & 19: Nitrogen Compounds & Biomolecules",
        weightage: "~16 Marks",
        subtopics: [
          { id: "c18-1", name: "Amines: Basicity order, Gabriel synthesis & Diazonium salts", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "c18-2", name: "Biomolecules: Carbohydrates, Amino acids, Peptide bonds, DNA/RNA", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "ch-u20",
        title: "UNIT 20: Principles Related to Practical Chemistry",
        weightage: "~8 Marks",
        subtopics: [
          { id: "c20-1", name: "Salt analysis (Cation/Anion detection) & Volumetric titrations", is8020: false, status: 0, ncertDone: false, dppDone: false },
        ],
      },
    ],
  },
  {
    key: "phy",
    title: "Physics",
    marks: "180 Marks",
    chapters: [
      {
        id: "phy-u1",
        title: "UNIT 1: Physics and Measurement",
        weightage: "~4-8 Marks",
        subtopics: [
          { id: "p1-1", name: "SI Units, Dimensions of Physical Quantities & Applications", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p1-2", name: "Errors in measurements, Significant figures & Least count", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u2",
        title: "UNIT 2: Kinematics",
        weightage: "~8-12 Marks",
        subtopics: [
          { id: "p2-1", name: "Motion in a straight line: v-t graphs & uniformly accelerated equations", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p2-2", name: "Vectors: Resolution, dot & cross products, Unit vectors", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p2-3", name: "Projectile Motion & Uniform Circular Motion", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u3",
        title: "UNIT 3: Laws of Motion",
        weightage: "~12 Marks",
        subtopics: [
          { id: "p3-1", name: "Newton's Laws of Motion & Conservation of Linear Momentum", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p3-2", name: "Static, Kinetic & Rolling Friction", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p3-3", name: "Dynamics of circular motion: Level & banked road vehicle dynamics", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u4",
        title: "UNIT 4: Work, Energy, and Power",
        weightage: "~8-12 Marks",
        subtopics: [
          { id: "p4-1", name: "Work done by constant/variable forces & Work-Energy Theorem", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p4-2", name: "Potential energy of spring & vertical circular motion", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p4-3", name: "Elastic & Inelastic collisions in 1D and 2D", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u5",
        title: "UNIT 5: Rotational Motion",
        weightage: "~12-16 Marks",
        subtopics: [
          { id: "p5-1", name: "Center of Mass, Torque & Conservation of Angular Momentum", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p5-2", name: "Moment of Inertia, Radius of gyration & Parallel/Perpendicular axes theorems", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u6",
        title: "UNIT 6: Gravitation",
        weightage: "~8 Marks",
        subtopics: [
          { id: "p6-1", name: "Universal Law, Variation of g with altitude/depth & Kepler's Laws", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p6-2", name: "Gravitational potential, Escape velocity & Satellite orbital velocity", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u7",
        title: "UNIT 7: Properties of Solids and Liquids",
        weightage: "~12 Marks",
        subtopics: [
          { id: "p7-1", name: "Stress-Strain, Hooke's Law & Young's/Bulk Modulus", is8020: false, status: 0, ncertDone: false, dppDone: false },
          { id: "p7-2", name: "Pascal's Law, Viscosity, Stokes' Law & Bernoulli's Principle", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p7-3", name: "Surface tension, Capillary rise, Calorimetry & Heat transfer", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u8",
        title: "UNIT 8 & 9: Thermodynamics & KTG",
        weightage: "~12-16 Marks",
        subtopics: [
          { id: "p8-1", name: "First & Second Laws of Thermodynamics, Isothermal & Adiabatic processes", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p8-2", name: "Kinetic Theory of Gases: RMS speed, Degrees of freedom & Law of equipartition", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u10",
        title: "UNIT 10: Oscillations and Waves",
        weightage: "~12-16 Marks",
        subtopics: [
          { id: "p10-1", name: "SHM Equation, Phase, Spring oscillations & Simple pendulum", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p10-2", name: "Progressive waves, Standing waves in strings/organ pipes & Beats", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u11",
        title: "UNIT 11: Electrostatics",
        weightage: "~16 Marks",
        subtopics: [
          { id: "p11-1", name: "Coulomb's Law, Electric field, Electric dipole & Gauss's Law", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p11-2", name: "Electric potential, Equipotential surfaces & Capacitors (Series/Parallel)", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u12",
        title: "UNIT 12: Current Electricity",
        weightage: "~16-20 Marks",
        subtopics: [
          { id: "p12-1", name: "Ohm's Law, Drift velocity, Resistance temperature dependence", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p12-2", name: "Kirchhoff's Laws, Cell EMF & combinations, Wheatstone bridge", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u13",
        title: "UNIT 13: Magnetic Effects of Current & Magnetism",
        weightage: "~16 Marks",
        subtopics: [
          { id: "p13-1", name: "Biot-Savart Law, Ampere's Law & Force on moving charge in B-field", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p13-2", name: "Moving Coil Galvanometer conversion & Magnetic materials (Para/Dia/Ferro)", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u14",
        title: "UNIT 14 & 15: EMI, AC & EM Waves",
        weightage: "~12-16 Marks",
        subtopics: [
          { id: "p14-1", name: "Faraday's & Lenz's Law, Inductance & AC circuits (LCR Series resonance)", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p14-2", name: "Electromagnetic Spectrum & Characteristics of EM Waves", is8020: false, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u16",
        title: "UNIT 16: Optics",
        weightage: "~16-20 Marks",
        subtopics: [
          { id: "p16-1", name: "Ray Optics: Reflection, Refraction, Lens maker formula, Prisms & Optical instruments", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p16-2", name: "Wave Optics: Huygens' principle, Interference (YDSE) & Diffraction", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u17",
        title: "UNIT 17, 18 & 19: Modern Physics & Semiconductors",
        weightage: "~24-28 Marks",
        subtopics: [
          { id: "p17-1", name: "Dual Nature: Photoelectric Effect & de Broglie relation", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p17-2", name: "Atoms & Nuclei: Bohr model, Mass defect, Binding energy, Fission/Fusion", is8020: true, status: 0, ncertDone: false, dppDone: false },
          { id: "p17-3", name: "Semiconductor Diodes, Zener diode as regulator & Logic Gates", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
      {
        id: "phy-u20",
        title: "UNIT 20: Experimental Skills",
        weightage: "~8-12 Marks",
        subtopics: [
          { id: "p20-1", name: "Vernier, Screw gauge, Metre bridge, Simple pendulum & Prism deviation", is8020: true, status: 0, ncertDone: false, dppDone: false },
        ],
      },
    ],
  },
];

export default function NeetDashboard() {
  const [subjects, setSubjects] = useState<NeetSubjectGroup[]>(OFFICIAL_NEET_SYLLABUS);
  const [pwTests, setPwTests] = useState<PwMockEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"habits" | "syllabus" | "pwMocks">("habits");
  const [historyStack, setHistoryStack] = useState<NeetSubjectGroup[][]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("shekhu_neet_official_syllabus_v4");
    if (saved) {
      try {
        setSubjects(JSON.parse(saved));
      } catch (e) {}
    }
    const savedMocks = localStorage.getItem("shekhu_pw_tests_v3");
    if (savedMocks) {
      try {
        setPwTests(JSON.parse(savedMocks));
      } catch (e) {}
    }
  }, []);

  const handleUpdateSubtopic = (
    subjKey: string,
    chapterId: string,
    subtopicId: string,
    updates: Partial<NeetSubTopic>
  ) => {
    setHistoryStack((prev) => [...prev.slice(-15), JSON.parse(JSON.stringify(subjects))]);

    const updated = subjects.map((subj) => {
      if (subj.key !== subjKey) return subj;
      return {
        ...subj,
        chapters: subj.chapters.map((chap) => {
          if (chap.id !== chapterId) return chap;
          return {
            ...chap,
            subtopics: chap.subtopics.map((st) =>
              st.id === subtopicId ? { ...st, ...updates } : st
            ),
          };
        }),
      };
    });

    setSubjects(updated);
    localStorage.setItem("shekhu_neet_official_syllabus_v4", JSON.stringify(updated));
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const prev = historyStack[historyStack.length - 1];
    setHistoryStack((p) => p.slice(0, -1));
    setSubjects(prev);
    localStorage.setItem("shekhu_neet_official_syllabus_v4", JSON.stringify(prev));
  };

  const handleAddTest = (entry: PwMockEntry) => {
    const updated = [...pwTests, entry];
    setPwTests(updated);
    localStorage.setItem("shekhu_pw_tests_v3", JSON.stringify(updated));
  };

  let totalSubtopics = 0;
  let masteredSubtopics = 0;
  subjects.forEach((s) => {
    s.chapters.forEach((c) => {
      c.subtopics.forEach((st) => {
        totalSubtopics++;
        if (st.status === 3) masteredSubtopics++;
      });
    });
  });
  const overallProgress =
    totalSubtopics > 0 ? Math.round((masteredSubtopics / totalSubtopics) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafd]">
      <GoalHeader overallProgress={overallProgress} />

      <main className="max-w-7xl mx-auto w-full p-3 sm:p-6 flex-1 space-y-6">
        <div className="flex border-b-4 border-[#122056] gap-2">
          <button
            onClick={() => setActiveTab("habits")}
            className={`px-4 py-2 text-xs font-black border-2 border-[#122056] transition-all ${
              activeTab === "habits"
                ? "bg-white text-[#122056] shadow-[2px_2px_0px_0px_#122056]"
                : "bg-[#eeeffd] text-[#122056] hover:bg-white"
            }`}
          >
            📅 MONTHLY HABIT GRID (6H / 30M WALK)
          </button>
          <button
            onClick={() => setActiveTab("syllabus")}
            className={`px-4 py-2 text-xs font-black border-2 border-[#122056] transition-all ${
              activeTab === "syllabus"
                ? "bg-white text-[#122056] shadow-[2px_2px_0px_0px_#122056]"
                : "bg-[#eeeffd] text-[#122056] hover:bg-white"
            }`}
          >
            🩺 FULL NEET SYLLABUS &amp; SUBTOPICS
          </button>
          <button
            onClick={() => setActiveTab("pwMocks")}
            className={`px-4 py-2 text-xs font-black border-2 border-[#122056] transition-all ${
              activeTab === "pwMocks"
                ? "bg-white text-[#122056] shadow-[2px_2px_0px_0px_#122056]"
                : "bg-[#eeeffd] text-[#122056] hover:bg-white"
            }`}
          >
            PW TEST RADAR &amp; UPCOMING TARGETS
          </button>
        </div>

        {activeTab === "habits" && <DailyTracker />}

        {activeTab === "syllabus" && (
          <SyllabusTracker
            subjects={subjects}
            onUpdateSubtopic={handleUpdateSubtopic}
            onUndo={handleUndo}
            canUndo={historyStack.length > 0}
          />
        )}

        {activeTab === "pwMocks" && (
          <PWMockLogger tests={pwTests} onAddTest={handleAddTest} subjects={subjects} />
        )}
      </main>

      <footer className="bg-[#122056] text-[#eeeffd] border-t-4 border-[#122056] p-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="bg-[#5b65dc] text-white font-black px-2 py-0.5 text-[10px]">AIIMS 2027</span>
            <span>AQUASHEKHAR // COMMAND CENTER FOR SHEKHUBOSS</span>
          </div>
          <div className="text-[10px] text-slate-300">
            DISCIPLINE &gt; MOTIVATION. EVERY SINGLE DAY COUNTS.
          </div>
        </div>
      </footer>
    </div>
  );
}