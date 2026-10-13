import { Question } from "@/types/sat";

export const MATH_QUESTIONS: Question[] = [
  {
    id: "m_alg_01",
    section: "math",
    domain: "Algebra",
    subtopic: "Linear Equations",
    difficultyRating: 1150, // Approx 380 SAT level (Easy)
    prompt: "If 4x + 7 = 27, what is the value of 2x?",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "10" },
      { id: "C", text: "15" },
      { id: "D", text: "20" },
    ],
    correctAnswer: "B",
    explanation: {
      summary: "First isolate x, then multiply by 2 to find 2x.",
      steps: [
        "Subtract 7 from both sides: 4x = 27 - 7 => 4x = 20.",
        "Divide by 4: x = 5.",
        "The question asks for the value of 2x, so calculate 2(5) = 10.",
      ],
      keyConcept: "Always double-check what the question is asking for (here, 2x instead of x).",
    },
  },
  {
    id: "m_alg_02",
    section: "math",
    domain: "Algebra",
    subtopic: "Systems of Linear Equations",
    difficultyRating: 1350, // Approx 480 SAT level (Medium-Easy)
    prompt: "A line passes through the point (0, 4) and has a slope of -3. What is the equation of the line in standard form?",
    options: [
      { id: "A", text: "3x + y = 4" },
      { id: "B", text: "-3x + y = 4" },
      { id: "C", text: "3x - y = 4" },
      { id: "D", text: "x + 3y = 12" },
    ],
    correctAnswer: "A",
    explanation: {
      summary: "Use slope-intercept form y = mx + b and rearrange to Ax + By = C.",
      steps: [
        "Given slope m = -3 and y-intercept (0, 4), the equation is y = -3x + 4.",
        "Add 3x to both sides to write in standard form: 3x + y = 4.",
      ],
      keyConcept: "Standard form is Ax + By = C where A >= 0.",
    },
  },
  {
    id: "m_adv_01",
    section: "math",
    domain: "Advanced Math",
    subtopic: "Quadratic Functions",
    difficultyRating: 1520, // Approx 560 SAT level (Medium)
    prompt: "The function f is defined by f(x) = (x - 4)(x + 2). What is the minimum value of f(x)?",
    options: [
      { id: "A", text: "-9" },
      { id: "B", text: "-8" },
      { id: "C", text: "1" },
      { id: "D", text: "-1" },
    ],
    correctAnswer: "A",
    explanation: {
      summary: "Find the x-coordinate of the vertex (the midpoint of the roots) and evaluate f(x).",
      steps: [
        "The roots of f(x) are x = 4 and x = -2.",
        "The vertex occurs at the midpoint of the roots: x = (4 + (-2)) / 2 = 1.",
        "Plug x = 1 into f(x): f(1) = (1 - 4)(1 + 2) = (-3)(3) = -9.",
      ],
      keyConcept: "A parabola opening upwards reaches its minimum at the vertex.",
    },
  },
  {
    id: "m_psda_01",
    section: "math",
    domain: "Problem-Solving & Data Analysis",
    subtopic: "Percentages & Ratios",
    difficultyRating: 1620, // Approx 610 SAT level (Medium-Hard)
    prompt: "A retail store increases the price of a jacket by 25%. A week later, it discounts the new price by 20%. How does the final price compare to the original price?",
    options: [
      { id: "A", text: "It is 5% higher than the original price" },
      { id: "B", text: "It is the exact same as the original price" },
      { id: "C", text: "It is 5% lower than the original price" },
      { id: "D", text: "It is 10% lower than the original price" },
    ],
    correctAnswer: "B",
    explanation: {
      summary: "Assume a starting price of $100 and apply sequential multipliers.",
      steps: [
        "Let original price = 100.",
        "After a 25% increase: 100 * 1.25 = 125.",
        "After a 20% discount on 125: 125 * (1 - 0.20) = 125 * 0.80 = 100.",
        "The final price equals the original price (100).",
      ],
      keyConcept: "Sequential percentage changes do not simply add together; 1.25 * 0.80 = 1.00.",
    },
  },
  {
    id: "m_adv_02",
    section: "math",
    domain: "Advanced Math",
    subtopic: "Exponential & Radical Equations",
    difficultyRating: 1780, // Approx 690 SAT level (Hard)
    prompt: "If 2^(3x - 1) = 16^(x - 2), what is the value of x?",
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "5" },
      { id: "C", text: "7" },
      { id: "D", text: "9" },
    ],
    correctAnswer: "C",
    explanation: {
      summary: "Express both sides with the common base 2 and equate the exponents.",
      steps: [
        "Notice that 16 = 2^4, so 16^(x - 2) = (2^4)^(x - 2) = 2^(4(x - 2)) = 2^(4x - 8).",
        "Set the exponents equal: 3x - 1 = 4x - 8.",
        "Subtract 3x from both sides: -1 = x - 8.",
        "Add 8 to both sides: x = 7.",
      ],
      keyConcept: "When bases are equal (a^u = a^v with a > 0, a != 1), the exponents must be equal (u = v).",
    },
  },
  {
    id: "m_geom_01",
    section: "math",
    domain: "Geometry & Trigonometry",
    subtopic: "Circles & Angles",
    difficultyRating: 1950, // Approx 780 SAT level (Very Hard)
    prompt: "In the xy-plane, the graph of x^2 + y^2 - 6x + 8y = 0 is a circle. What is the area of this circle in square units?",
    options: [
      { id: "A", text: "25π" },
      { id: "B", text: "50π" },
      { id: "C", text: "100π" },
      { id: "D", text: "5π" },
    ],
    correctAnswer: "A",
    explanation: {
      summary: "Complete the square to find r^2, then compute Area = π * r^2.",
      steps: [
        "Group x and y terms: (x^2 - 6x) + (y^2 + 8y) = 0.",
        "Complete the square for x: add (-6/2)^2 = 9 to both sides.",
        "Complete the square for y: add (8/2)^2 = 16 to both sides.",
        "(x - 3)^2 + (y + 4)^2 = 9 + 16 = 25.",
        "The standard form of a circle is (x - h)^2 + (y - k)^2 = r^2, so r^2 = 25.",
        "Area = π * r^2 = 25π.",
      ],
      keyConcept: "Standard circle equation is (x - h)^2 + (y - k)^2 = r^2. The constant on the right is already r^2.",
    },
  },
  {
    id: "m_alg_03",
    section: "math",
    domain: "Algebra",
    subtopic: "Linear Inequalities",
    difficultyRating: 1480, // Approx 540 SAT level
    prompt: "For what value of c will the system of equations 2x - 5y = 12 and 6x - 15y = c have infinitely many solutions?",
    options: [
      { id: "A", text: "24" },
      { id: "B", text: "36" },
      { id: "C", text: "4" },
      { id: "D", text: "-36" },
    ],
    correctAnswer: "B",
    explanation: {
      summary: "A system of two linear equations has infinitely many solutions if the equations are multiples of each other.",
      steps: [
        "Notice the coefficients of x and y in the second equation: 6x is 3 * (2x), and -15y is 3 * (-5y).",
        "For infinitely many solutions, the constant term must also be multiplied by 3.",
        "Therefore, c = 3 * 12 = 36.",
      ],
      keyConcept: "Infinitely many solutions mean both equations describe the exact same line.",
    },
  },
];
