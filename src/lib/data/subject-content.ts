// Subject-specific content: topics, chapter notes, and resources
// Written for actual engineering curricula — not generic placeholders

interface SubjectTopic {
  name: string;
  completed: boolean;
}

interface SubjectChapter {
  title: string;
  description: string;
  readTime: string;
}

interface SubjectResource {
  name: string;
  description: string;
  type: "book" | "course" | "video" | "reference";
}

interface SubjectContent {
  topics: SubjectTopic[];
  chapters: SubjectChapter[];
  resources: SubjectResource[];
}

const subjectContents: Record<string, SubjectContent> = {
  "engineering-mathematics": {
    topics: [
      { name: "Calculus & Limits", completed: true },
      { name: "Linear Algebra & Matrices", completed: true },
      { name: "Differential Equations", completed: true },
      { name: "Probability & Distributions", completed: false },
      { name: "Laplace & Fourier Transforms", completed: false },
      { name: "Numerical Methods & Optimization", completed: false },
    ],
    chapters: [
      { title: "Differential and Integral Calculus", description: "Limits, continuity, differentiation, integration, Taylor series, partial derivatives, multiple integrals, and applications to engineering problems.", readTime: "25 min" },
      { title: "Matrix Theory and Linear Algebra", description: "Matrix operations, rank, inverse, eigenvalues, eigenvectors, Cayley-Hamilton theorem, diagonalization, and solving systems of linear equations.", readTime: "20 min" },
      { title: "Ordinary and Partial Differential Equations", description: "First and second order ODEs, series solutions, Laplace transform method, wave equation, heat equation, and separation of variables.", readTime: "30 min" },
      { title: "Probability and Statistical Methods", description: "Probability axioms, random variables, binomial/Poisson/normal distributions, sampling, hypothesis testing, and regression analysis.", readTime: "25 min" },
    ],
    resources: [
      { name: "Advanced Engineering Mathematics — Erwin Kreyszig", description: "The standard textbook covering all engineering mathematics topics with thousands of solved examples.", type: "book" },
      { name: "NPTEL Mathematics for Engineers", description: "Video lecture series by IIT professors covering calculus, linear algebra, and differential equations.", type: "video" },
      { name: "Engineering Mathematics — B.S. Grewal", description: "Popular reference book with topic-wise problems arranged by engineering branch.", type: "reference" },
      { name: "MIT 18.03: Differential Equations", description: "Free online course from MIT covering ODEs, Laplace transforms, and linear algebra applications.", type: "course" },
    ],
  },

  "data-structures": {
    topics: [
      { name: "Arrays & Linked Lists", completed: true },
      { name: "Stacks & Queues", completed: true },
      { name: "Trees & Binary Search Trees", completed: true },
      { name: "Graphs & Traversals", completed: false },
      { name: "Hashing & Hash Tables", completed: false },
      { name: "Advanced Data Structures (Trie, Segment Tree, Disjoint Set)", completed: false },
    ],
    chapters: [
      { title: "Linear Data Structures", description: "Arrays, dynamic arrays, singly/doubly/circular linked lists, stack operations, queue variants (circular, priority, deque), and their real-world applications.", readTime: "30 min" },
      { title: "Trees and Hierarchical Structures", description: "Binary trees, BST operations, AVL trees, Red-Black trees, B-trees, tree traversals (inorder, preorder, postorder), and heap data structures.", readTime: "35 min" },
      { title: "Graph Algorithms", description: "Adjacency matrix/list representations, BFS, DFS, topological sort, shortest paths (Dijkstra, Bellman-Ford), MST (Kruskal, Prim), and cycle detection.", readTime: "40 min" },
      { title: "Hashing and Hash-Based Structures", description: "Hash functions, collision resolution (chaining, open addressing), load factor, rehashing, bloom filters, and applications in database indexing.", readTime: "20 min" },
    ],
    resources: [
      { name: "Introduction to Algorithms — CLRS", description: "The definitive textbook (MIT Press) covering data structures and algorithms with rigorous analysis.", type: "book" },
      { name: "Data Structures and Algorithms — Narasimha Karumanchi", description: "Campus interview-focused book with clear explanations and placement-oriented problem sets.", type: "book" },
      { name: "MIT 6.006: Introduction to Algorithms", description: "Undergraduate course covering fundamental data structures and algorithmic thinking.", type: "course" },
      { name: "VisuAlgo — Data Structure Visualizations", description: "Interactive visualizations of data structure operations with step-by-step animations.", type: "reference" },
    ],
  },

  "algorithms": {
    topics: [
      { name: "Sorting & Searching Algorithms", completed: true },
      { name: "Divide & Conquer Paradigm", completed: true },
      { name: "Dynamic Programming", completed: true },
      { name: "Greedy Algorithms", completed: false },
      { name: "Graph Algorithms", completed: false },
      { name: "NP-Completeness & Approximation", completed: false },
    ],
    chapters: [
      { title: "Fundamental Algorithm Analysis", description: "Asymptotic notation (Big O, Omega, Theta), recurrence relations, master theorem, amortized analysis, and complexity classes.", readTime: "25 min" },
      { title: "Divide and Conquer Strategies", description: "Merge sort, quicksort, binary search, Strassen's matrix multiplication, closest pair of points, and maximum subarray problem.", readTime: "30 min" },
      { title: "Dynamic Programming", description: "Optimal substructure, overlapping subproblems, memoization, tabulation, knapsack, LCS, matrix chain multiplication, and DP on trees.", readTime: "45 min" },
      { title: "Greedy Algorithms and Graph Theory", description: "Huffman coding, activity selection, fractional knapsack, minimum spanning trees, shortest paths, and network flow (Ford-Fulkerson).", readTime: "35 min" },
    ],
    resources: [
      { name: "Algorithm Design — Kleinberg & Tardos", description: "Modern approach to algorithm design with emphasis on real-world applications and case studies.", type: "book" },
      { name: "The Algorithm Design Manual — Steven Skiena", description: "Practical guide with a comprehensive catalog of algorithmic problems and solutions.", type: "book" },
      { name: "MIT 6.006 + 6.046: Design and Analysis of Algorithms", description: "Two-course sequence covering algorithm design paradigms and advanced topics.", type: "course" },
      { name: "CP-Algorithms — Competitive Programming", description: "Community-maintained reference with implementations in C++ and Python for standard algorithms.", type: "reference" },
    ],
  },

  "operating-systems": {
    topics: [
      { name: "Process Management & Scheduling", completed: true },
      { name: "Memory Management", completed: true },
      { name: "File Systems & Storage", completed: true },
      { name: "Concurrency & Synchronization", completed: false },
      { name: "Deadlocks & Resource Allocation", completed: false },
      { name: "Security & Protection Mechanisms", completed: false },
    ],
    chapters: [
      { title: "Process Management and CPU Scheduling", description: "Process states, PCB, context switching, scheduling algorithms (FCFS, SJF, Round Robin, Multilevel Queue), and real-time scheduling.", readTime: "35 min" },
      { title: "Memory Management and Virtualization", description: "Contiguous/non-contiguous allocation, paging, segmentation, virtual memory, page replacement algorithms (FIFO, LRU, Optimal), and thrashing.", readTime: "30 min" },
      { title: "Concurrency and Synchronization", description: "Race conditions, critical section problem, mutexes, semaphores, monitors, reader-writer problem, dining philosophers, and lock-free data structures.", readTime: "30 min" },
      { title: "File Systems and I/O Management", description: "File concepts, directory structures, allocation methods (contiguous, linked, indexed), free space management, disk scheduling, and RAID levels.", readTime: "25 min" },
    ],
    resources: [
      { name: "Operating System Concepts — Silberschatz, Galvin, Gagne", description: "The dinosaur book — comprehensive coverage of OS principles used worldwide in university curricula.", type: "book" },
      { name: "Modern Operating Systems — Andrew Tanenbaum", description: "In-depth treatment of OS design with case studies of Linux, Windows, and MINIX.", type: "book" },
      { name: "NPTEL Operating Systems by IIT Kharagpur", description: "Complete video lecture series covering all major OS topics with Indian curriculum focus.", type: "video" },
      { name: "OSDev.org Wiki", description: "Technical reference for OS development enthusiasts covering low-level system programming.", type: "reference" },
    ],
  },

  "dbms": {
    topics: [
      { name: "Relational Model & SQL", completed: true },
      { name: "Entity-Relationship Modeling", completed: true },
      { name: "Normalization Theory", completed: true },
      { name: "Transaction Processing", completed: false },
      { name: "Concurrency Control", completed: false },
      { name: "Indexing & Query Optimization", completed: false },
    ],
    chapters: [
      { title: "Relational Database Design", description: "ER diagrams, relational schema, integrity constraints, keys, functional dependencies, and the entire normalization process (1NF through BCNF and 4NF).", readTime: "35 min" },
      { title: "SQL: Queries and Advanced Features", description: "DDL, DML, joins (inner, outer, self, cross), subqueries, correlated queries, aggregation, window functions, CTEs, and recursive queries.", readTime: "30 min" },
      { title: "Transaction Management and Recovery", description: "ACID properties, transaction states, serializability, conflict/view serializability, locking protocols, timestamp ordering, and ARIES recovery.", readTime: "30 min" },
      { title: "Indexing, Storage, and Query Processing", description: "B+ trees, hash indexing, bitmap indexing, query evaluation plans, cost estimation, join strategies, and query optimization heuristics.", readTime: "25 min" },
    ],
    resources: [
      { name: "Database System Concepts — Silberschatz, Korth, Sudarshan", description: "Comprehensive textbook covering theory, design, and implementation of database systems.", type: "book" },
      { name: "Fundamentals of Database Systems — Elmasri & Navathe", description: "Alternative standard textbook with strong coverage of ER modeling and relational algebra.", type: "book" },
      { name: "Stanford DB: Introduction to Databases", description: "Free online course by Professor Jennifer Widom covering relational databases and SQL.", type: "course" },
      { name: "Use The Index, Luke — PostgreSQL Performance", description: "Practical guide to SQL indexing and database performance optimization.", type: "reference" },
    ],
  },

  "computer-networks": {
    topics: [
      { name: "OSI & TCP/IP Models", completed: true },
      { name: "Physical & Data Link Layers", completed: true },
      { name: "Network Layer & Routing", completed: true },
      { name: "Transport Layer Protocols", completed: false },
      { name: "Application Layer & HTTP", completed: false },
      { name: "Network Security & Wireless", completed: false },
    ],
    chapters: [
      { title: "Network Architectures and Physical Layer", description: "OSI reference model, TCP/IP stack, network topologies, transmission media (copper, fiber, wireless), multiplexing, and switching techniques.", readTime: "25 min" },
      { title: "Data Link Layer and MAC Protocols", description: "Framing, error detection/correction (CRC, Hamming codes), flow control, sliding window protocols, Ethernet, WiFi (CSMA/CA), and MAC addressing.", readTime: "30 min" },
      { title: "Network Layer and Routing", description: "IP addressing (IPv4, IPv6), subnetting, CIDR, NAT, routing algorithms (distance vector, link state), OSPF, BGP, and router architecture.", readTime: "35 min" },
      { title: "Transport and Application Layers", description: "TCP (flow control, congestion control, slow start, fast recovery), UDP, socket programming, DNS, HTTP/2, SMTP, FTP, and CDN architecture.", readTime: "30 min" },
    ],
    resources: [
      { name: "Computer Networking: A Top-Down Approach — Kurose & Ross", description: "Most widely used networking textbook with a practical, application-first approach to networking concepts.", type: "book" },
      { name: "Data Communications and Networking — Behrouz Forouzan", description: "Detailed coverage of physical and data link layers with hundreds of solved examples.", type: "book" },
      { name: "NPTEL Computer Networks by IIT Kharagpur", description: "Video lectures covering the entire networking syllabus for Indian engineering curricula.", type: "video" },
      { name: "Beej's Guide to Network Programming", description: "Classic free online guide to socket programming in C with practical examples.", type: "reference" },
    ],
  },

  "machine-learning": {
    topics: [
      { name: "Supervised Learning: Regression", completed: true },
      { name: "Supervised Learning: Classification", completed: true },
      { name: "Unsupervised Learning", completed: true },
      { name: "Neural Networks & Deep Learning", completed: false },
      { name: "Natural Language Processing", completed: false },
      { name: "Model Deployment & MLOps", completed: false },
    ],
    chapters: [
      { title: "Regression and Supervised Learning Fundamentals", description: "Linear regression, polynomial regression, gradient descent, regularization (L1, L2), bias-variance tradeoff, and cross-validation techniques.", readTime: "30 min" },
      { title: "Classification Algorithms", description: "Logistic regression, decision trees, random forests, SVM, k-NN, Naive Bayes, ensemble methods (bagging, boosting), and evaluation metrics (precision, recall, F1, ROC-AUC).", readTime: "35 min" },
      { title: "Unsupervised and Reinforcement Learning", description: "K-means clustering, hierarchical clustering, DBSCAN, PCA, t-SNE, association rules (Apriori), and Q-learning fundamentals.", readTime: "30 min" },
      { title: "Deep Learning Architectures", description: "Multilayer perceptrons, backpropagation, CNNs (convolution, pooling, architectures like ResNet), RNNs, LSTMs, transformers, and attention mechanisms.", readTime: "45 min" },
    ],
    resources: [
      { name: "Pattern Recognition and Machine Learning — Christopher Bishop", description: "Comprehensive ML textbook with strong mathematical foundations and Bayesian perspective.", type: "book" },
      { name: "Hands-On Machine Learning — Geron", description: "Practical guide with Scikit-Learn, Keras, and TensorFlow — ideal for implementation-focused learning.", type: "book" },
      { name: "Andrew Ng's Machine Learning Specialization", description: "Stanford/Coursera course that launched a generation of ML practitioners — clear and intuitive explanations.", type: "course" },
      { name: "Scikit-Learn Documentation & User Guide", description: "Well-maintained reference with examples for every ML algorithm implementation in Python.", type: "reference" },
    ],
  },

  "engineering-physics": {
    topics: [
      { name: "Classical Mechanics", completed: true },
      { name: "Electromagnetism", completed: true },
      { name: "Optics & Wave Physics", completed: true },
      { name: "Quantum Mechanics", completed: false },
      { name: "Semiconductor Physics", completed: false },
      { name: "Lasers & Fiber Optics", completed: false },
    ],
    chapters: [
      { title: "Mechanics and Properties of Matter", description: "Newtonian mechanics, work-energy theorem, rotational dynamics, elasticity (Hooke's law, Young's modulus), viscosity, and surface tension.", readTime: "25 min" },
      { title: "Electromagnetic Theory", description: "Coulomb's law, Gauss law, electric potential, capacitance, Biot-Savart law, Ampere's law, Faraday's induction, Maxwell's equations, and EM waves.", readTime: "30 min" },
      { title: "Wave Optics and Interference", description: "Huygens principle, Young's double-slit experiment, diffraction (single slit, grating), polarization, interference in thin films, and resolving power.", readTime: "25 min" },
      { title: "Quantum and Semiconductor Physics", description: "Planck's hypothesis, photoelectric effect, de Broglie waves, Schrödinger equation, particle in a box, tunneling, energy bands, and doping.", readTime: "30 min" },
    ],
    resources: [
      { name: "University Physics — Young & Freedman", description: "Standard university physics textbook with extensive problem sets and conceptual explanations.", type: "book" },
      { name: "Concepts of Modern Physics — Arthur Beiser", description: "Clear introduction to quantum mechanics, atomic physics, and semiconductor physics.", type: "book" },
      { name: "NPTEL Engineering Physics by IIT Madras", description: "Comprehensive video series covering the full engineering physics curriculum.", type: "video" },
      { name: "Walter Lewin's MIT Physics Lectures", description: "Classic MIT lecture series on electromagnetism and classical mechanics available on YouTube.", type: "video" },
    ],
  },

  "engineering-chemistry": {
    topics: [
      { name: "Atomic Structure & Bonding", completed: true },
      { name: "Thermodynamics & Electrochemistry", completed: true },
      { name: "Organic Chemistry", completed: true },
      { name: "Materials Science", completed: false },
      { name: "Water Chemistry & Treatment", completed: false },
      { name: "Spectroscopy & Characterization", completed: false },
    ],
    chapters: [
      { title: "Chemical Bonding and Molecular Structure", description: "Molecular orbital theory, hybridization, VSEPR theory, ionic/covalent/metallic bonding, crystal field theory, and intermolecular forces.", readTime: "25 min" },
      { title: "Electrochemistry and Corrosion", description: "Electrochemical cells, Nernst equation, conductance, pH measurements, corrosion types (galvanic, pitting, stress), and corrosion prevention methods.", readTime: "25 min" },
      { title: "Organic Reaction Mechanisms", description: "Functional groups, nucleophilic/electrophilic substitution, elimination, addition reactions, rearrangement reactions, and stereochemistry fundamentals.", readTime: "30 min" },
      { title: "Water Chemistry and Treatment Technologies", description: "Hardness of water, alkalinity, dissolved oxygen, BOD/COD, water softening (lime-soda, ion exchange), reverse osmosis, and wastewater treatment.", readTime: "20 min" },
    ],
    resources: [
      { name: "Engineering Chemistry — Jain & Jain", description: "Standard textbook for Indian engineering chemistry curricula with coverage of all major topics.", type: "book" },
      { name: "Physical Chemistry — Atkins & de Paula", description: "Authoritative reference for thermodynamics, kinetics, and quantum chemistry with rigorous derivations.", type: "book" },
      { name: "NPTEL Chemistry for Engineers by IIT Bombay", description: "Video lectures tailored for first-year engineering chemistry courses.", type: "video" },
      { name: "Organic Chemistry — Morrison & Boyd", description: "Classic textbook with clear explanations of organic reaction mechanisms and synthesis.", type: "reference" },
    ],
  },

  "computer-architecture": {
    topics: [
      { name: "CPU Design & Datapath", completed: true },
      { name: "Memory Hierarchy & Cache", completed: true },
      { name: "Pipeline Architecture", completed: true },
      { name: "I/O Organization", completed: false },
      { name: "RISC vs CISC Architectures", completed: false },
      { name: "Parallel & Multi-Core Systems", completed: false },
    ],
    chapters: [
      { title: "Digital Logic and CPU Fundamentals", description: "Number systems, Boolean algebra, combinational/sequential circuits, ALU design, registers, and the instruction execution cycle (fetch-decode-execute).", readTime: "30 min" },
      { title: "Memory Hierarchy and Cache Design", description: "SRAM, DRAM, ROM, cache organization (direct mapped, set associative), cache coherence protocols, virtual memory, TLB, and memory interleaving.", readTime: "30 min" },
      { title: "Pipeline Architecture and Hazards", description: "Classic 5-stage RISC pipeline, structural/data/control hazards, forwarding, branch prediction, out-of-order execution, and superscalar architectures.", readTime: "35 min" },
      { title: "I/O Systems and Storage Architecture", description: "Programmed I/O, interrupt-driven I/O, DMA, bus arbitration, storage hierarchy, RAID, and modern I/O interfaces (PCIe, USB, SATA).", readTime: "25 min" },
    ],
    resources: [
      { name: "Computer Organization and Design — Patterson & Hennessy", description: "The definitive RISC-V textbook covering hardware-software interface and modern CPU design.", type: "book" },
      { name: "Computer Architecture: A Quantitative Approach — Hennessy & Patterson", description: "Advanced coverage of performance analysis, memory systems, and multi-core architectures.", type: "book" },
      { name: "NPTEL Computer Architecture by IIT Delhi", description: "Video lecture series covering the complete computer architecture syllabus.", type: "video" },
      { name: "Digital Design and Computer Architecture — Harris & Harris", description: "Accessible introduction covering from digital logic to ARM and RISC-V processor design.", type: "reference" },
    ],
  },

  "compiler-design": {
    topics: [
      { name: "Lexical Analysis & Regular Expressions", completed: true },
      { name: "Syntax Analysis & Parsing", completed: true },
      { name: "Semantic Analysis & Type Checking", completed: true },
      { name: "Intermediate Code Generation", completed: false },
      { name: "Code Optimization", completed: false },
      { name: "Target Code Generation", completed: false },
    ],
    chapters: [
      { title: "Lexical Analysis and Finite Automata", description: "Role of lexer, regular expressions, NFA/DFA conversion, lex/flex tools, tokenization, and symbol table management.", readTime: "25 min" },
      { title: "Syntax Analysis and Parsing Techniques", description: "Context-free grammars, derivation and parse trees, top-down parsing (recursive descent, LL), bottom-up parsing (LR, SLR, LALR), and error recovery.", readTime: "35 min" },
      { title: "Semantic Analysis and Type Systems", description: "Syntax-directed definitions, attribute grammars, S-attributed/L-attributed SDTs, type checking, type inference, and symbol table organization.", readTime: "30 min" },
      { title: "Code Generation and Optimization", description: "Intermediate representations (AST, 3-address code, SSA), basic blocks and flow graphs, register allocation, peephole optimization, and machine code generation.", readTime: "30 min" },
    ],
    resources: [
      { name: "Compilers: Principles, Techniques, and Tools — Aho, Lam, Sethi, Ullman", description: "The dragon book — classic textbook covering all phases of compilation with theoretical rigor.", type: "book" },
      { name: "Modern Compiler Implementation in C/Java/ML — Andrew Appel", description: "Practical compiler implementation guide with complete project-based learning approach.", type: "book" },
      { name: "NPTEL Compiler Design by IIT Kanpur", description: "Video lectures covering lexical analysis through code generation with examples.", type: "video" },
      { name: "LLVM Compiler Infrastructure Documentation", description: "Industry-standard compiler framework documentation for understanding modern compiler backends.", type: "reference" },
    ],
  },

  "software-engineering": {
    topics: [
      { name: "SDLC & Process Models", completed: true },
      { name: "Agile & Scrum Methodologies", completed: true },
      { name: "Requirements Engineering", completed: true },
      { name: "Design Patterns & Architecture", completed: false },
      { name: "Software Testing & QA", completed: false },
      { name: "DevOps & CI/CD", completed: false },
    ],
    chapters: [
      { title: "Software Process and Project Management", description: "Waterfall, iterative, spiral, and Agile models, project estimation (COCOMO), risk management, and team structures.", readTime: "25 min" },
      { title: "Requirements Analysis and UML Modeling", description: "Functional/non-functional requirements, use case diagrams, class diagrams, sequence diagrams, activity diagrams, and SRS documentation.", readTime: "30 min" },
      { title: "Architectural Design and Design Patterns", description: "Layered architecture, microservices, MVC, Singleton, Factory, Observer, Strategy patterns, and architectural decision records.", readTime: "35 min" },
      { title: "Testing, Quality Assurance, and DevOps", description: "Unit testing, integration testing, system testing, TDD, code coverage, Jenkins/GitHub Actions, Docker, Kubernetes, and monitoring.", readTime: "30 min" },
    ],
    resources: [
      { name: "Software Engineering: A Practitioner's Approach — Roger Pressman", description: "Comprehensive textbook covering the entire software engineering lifecycle with industry case studies.", type: "book" },
      { name: "Design Patterns: Elements of Reusable Software — Gang of Four", description: "The foundational catalog of 23 design patterns with detailed examples in C++ and Smalltalk.", type: "book" },
      { name: "The Clean Architecture — Robert C. Martin", description: "Practical guide to software architecture principles, SOLID design, and system decomposition.", type: "book" },
      { name: "NPTEL Software Engineering by IIT Bombay", description: "Video lectures aligned with university curricula covering both theory and practical aspects.", type: "video" },
    ],
  },

  "artificial-intelligence": {
    topics: [
      { name: "Problem Solving & Search", completed: true },
      { name: "Knowledge Representation", completed: true },
      { name: "Probabilistic Reasoning", completed: true },
      { name: "Natural Language Processing", completed: false },
      { name: "Planning & Decision Making", completed: false },
      { name: "Robotics & Computer Vision", completed: false },
    ],
    chapters: [
      { title: "Search Algorithms and Problem Solving", description: "Uninformed search (BFS, DFS, IDDFS, uniform cost), informed search (A*, greedy best-first, heuristic functions), constraint satisfaction, and adversarial search (minimax, alpha-beta pruning).", readTime: "35 min" },
      { title: "Knowledge Representation and Logic", description: "Propositional logic, first-order logic, resolution, unification, forward/backward chaining, ontologies, and semantic networks.", readTime: "30 min" },
      { title: "Probabilistic Reasoning and Bayesian Networks", description: "Uncertainty, Bayes rule, Bayesian network structure learning, inference (variable elimination, Gibbs sampling), Markov models, and HMMs.", readTime: "30 min" },
      { title: "Planning, NLP, and Computer Vision Fundamentals", description: "STRIPS planning, partial-order planning, NLP pipeline (tokenization, parsing, NER, sentiment), image processing, edge detection, and object recognition.", readTime: "35 min" },
    ],
    resources: [
      { name: "Artificial Intelligence: A Modern Approach — Russell & Norvig", description: "The standard AI textbook covering everything from search algorithms to robotics with clarity and depth.", type: "book" },
      { name: "NPTEL Artificial Intelligence by IIT Madras", description: "Comprehensive video lecture series covering all core AI topics with Indian curriculum alignment.", type: "video" },
      { name: "UC Berkeley CS188: Intro to AI", description: "Project-based AI course with Pacman-based assignments covering search, MDPs, RL, and Bayes nets.", type: "course" },
      { name: "Artificial Intelligence — Patrick Winston (MIT)", description: "Classic MIT lecture series with intuitive explanations of AI fundamentals.", type: "video" },
    ],
  },

  "cyber-security": {
    topics: [
      { name: "Cryptography Fundamentals", completed: true },
      { name: "Network Security", completed: true },
      { name: "Web Application Security", completed: true },
      { name: "Ethical Hacking & Penetration Testing", completed: false },
      { name: "Digital Forensics", completed: false },
      { name: "Blockchain & Security Trends", completed: false },
    ],
    chapters: [
      { title: "Cryptography and Encryption", description: "Symmetric ciphers (DES, AES), asymmetric cryptography (RSA, ECC), hash functions (SHA, MD5), digital signatures, and PKI infrastructure.", readTime: "30 min" },
      { title: "Network and Infrastructure Security", description: "Firewalls, IDS/IPS, VPN, SSL/TLS, secure routing, DDoS mitigation, DNS security (DNSSEC), and zero-trust architectures.", readTime: "30 min" },
      { title: "Web and Application Security", description: "OWASP Top 10, SQL injection, XSS, CSRF, authentication bypass, session management, secure coding practices, and security headers.", readTime: "35 min" },
      { title: "Ethical Hacking, Forensics, and Blockchain", description: "Kali Linux tools, reconnaissance, exploitation, privilege escalation, evidence collection, chain of custody, and blockchain security fundamentals.", readTime: "35 min" },
    ],
    resources: [
      { name: "The Web Application Hacker's Handbook — Stuttard & Pinto", description: "Practical guide to web application security testing with real-world vulnerability scenarios.", type: "book" },
      { name: "Applied Cryptography — Bruce Schneier", description: "Encyclopedic coverage of cryptographic protocols, algorithms, and real-world implementations.", type: "book" },
      { name: "TryHackMe — Hands-On Security Training", description: "Interactive platform with real-world cybersecurity challenges and guided learning paths.", type: "course" },
      { name: "PortSwigger Web Security Academy", description: "Free online training platform for web security with interactive labs and detailed explanations.", type: "reference" },
    ],
  },

  "cloud-computing": {
    topics: [
      { name: "Cloud Fundamentals & Virtualization", completed: true },
      { name: "AWS Core Services", completed: true },
      { name: "Docker & Containerization", completed: true },
      { name: "Kubernetes & Orchestration", completed: false },
      { name: "Serverless & Microservices", completed: false },
      { name: "Cloud Security & DevSecOps", completed: false },
    ],
    chapters: [
      { title: "Cloud Architecture and Virtualization", description: "IaaS, PaaS, SaaS models, public/private/hybrid cloud, hypervisors (Type 1, Type 2), virtual machines, and cloud deployment strategies.", readTime: "25 min" },
      { title: "AWS Compute, Storage, and Networking", description: "EC2 instances, S3 storage classes, VPC design, load balancers, Auto Scaling, RDS, DynamoDB, Route 53, and CloudFront CDN.", readTime: "35 min" },
      { title: "Containerization with Docker", description: "Docker architecture, images, containers, Dockerfiles, multi-stage builds, Docker Compose, volumes, networking, and container registries.", readTime: "30 min" },
      { title: "Kubernetes and Serverless Computing", description: "Pods, deployments, services, ConfigMaps, Helm charts, AWS Lambda, API Gateway, Step Functions, and event-driven architectures.", readTime: "35 min" },
    ],
    resources: [
      { name: "AWS Certified Solutions Architect — Official Study Guide", description: "Comprehensive guide to AWS services, architecture best practices, and exam preparation.", type: "book" },
      { name: "Docker Deep Dive — Nigel Poulton", description: "Clear and practical guide to Docker and containerization fundamentals.", type: "book" },
      { name: "Kubernetes in Action — Marko Lukša", description: "Hands-on guide to deploying and managing applications with Kubernetes.", type: "book" },
      { name: "A Cloud Guru / Pluralsight Courses", description: "Video-based cloud computing training with hands-on labs for AWS, Azure, and GCP.", type: "course" },
    ],
  },

  "dsa": {
    topics: [
      { name: "Arrays, Strings & Matrix", completed: true },
      { name: "Linked Lists & Stacks & Queues", completed: true },
      { name: "Trees & Binary Search Trees", completed: true },
      { name: "Graphs & Shortest Paths", completed: false },
      { name: "Dynamic Programming", completed: false },
      { name: "Advanced Topics: Trie, BIT, Segment Tree", completed: false },
    ],
    chapters: [
      { title: "Arrays, Strings, and Matrix Manipulation", description: "Two-pointer technique, sliding window, prefix sum, Kadane's algorithm, spiral traversal, string pattern matching (KMP, Rabin-Karp), and matrix operations.", readTime: "40 min" },
      { title: "Linked Lists, Stacks, and Queues", description: "Singly/doubly linked list operations, fast & slow pointer, merge/intersection of lists, stack applications (expression evaluation, parenthesis matching), and queue-based BFS patterns.", readTime: "35 min" },
      { title: "Trees, BSTs, and Heaps", description: "Tree traversals (recursive + iterative), LCA, diameter of tree, serialization, BST validation, kth smallest in BST, heap sort, and priority queue problems.", readTime: "40 min" },
      { title: "Graphs, DP, and Advanced Structures", description: "BFS/DFS patterns, topological sort, union-find, Dijkstra, Floyd-Warshall, 0/1 knapsack, LCS, edit distance, palindrome partitioning, trie, and segment tree.", readTime: "50 min" },
    ],
    resources: [
      { name: "Cracking the Coding Interview — Gayle Laakmann McDowell", description: "The most popular interview prep book with 189 real coding questions and detailed solutions.", type: "book" },
      { name: "LeetCode Premium", description: "Curated problem set with company-specific interview questions from FAANG and top tech companies.", type: "course" },
      { name: "Elements of Programming Interviews — Aziz, Lee, Prakash", description: "Comprehensive problem-solving guide with varied difficulty levels and detailed explanations.", type: "book" },
      { name: "GeeksforGeeks — DSA Self-Paced", description: "Extensive online resource with articles, code examples, and practice problems for every DSA topic.", type: "reference" },
    ],
  },

  "digital-electronics": {
    topics: [
      { name: "Number Systems & Boolean Algebra", completed: true },
      { name: "Combinational Logic Circuits", completed: true },
      { name: "Sequential Logic Circuits", completed: true },
      { name: "Counters & Shift Registers", completed: false },
      { name: "Memory & Programmable Logic", completed: false },
      { name: "ADC/DAC & Logic Families", completed: false },
    ],
    chapters: [
      { title: "Number Systems and Boolean Algebra", description: "Binary, octal, hexadecimal conversions, 1s and 2s complement, Boolean algebra theorems, K-map minimization (2-6 variables), and Quine-McCluskey algorithm.", readTime: "25 min" },
      { title: "Combinational Logic Design", description: "Adders (half, full, ripple carry, carry lookahead), subtractors, multiplexers, demultiplexers, encoders, decoders, comparators, and ALU design.", readTime: "30 min" },
      { title: "Sequential Logic: Flip-Flops and Registers", description: "SR, JK, D, T flip-flops, edge triggering, master-slave configuration, shift registers (SISO, SIPO, PISO, PIPO), and timing analysis.", readTime: "30 min" },
      { title: "Counters, Memory, and Logic Families", description: "Ripple and synchronous counters, ring counters, Johnson counters, RAM/ROM organization, PLA/PAL, TTL vs CMOS logic families, and fan-out characteristics.", readTime: "25 min" },
    ],
    resources: [
      { name: "Digital Design: Principles and Practices — John Wakerly", description: "Industry-standard textbook with balanced coverage of theory and practical design considerations.", type: "book" },
      { name: "Digital Logic and Computer Design — Morris Mano", description: "Classic textbook covering digital logic from basic gates to computer organization.", type: "book" },
      { name: "NPTEL Digital Electronics by IIT Madras", description: "Video lecture series covering combinational and sequential logic with circuit simulations.", type: "video" },
      { name: "Digital Electronics — Anand Kumar", description: "Popular reference for GATE and university exam preparation with solved numerical problems.", type: "reference" },
    ],
  },

  "analog-electronics": {
    topics: [
      { name: "Semiconductor Diodes & Applications", completed: true },
      { name: "Bipolar Junction Transistors", completed: true },
      { name: "MOSFETs & Amplifier Design", completed: true },
      { name: "Operational Amplifiers", completed: false },
      { name: "Feedback Amplifiers & Oscillators", completed: false },
      { name: "Active Filters & Power Amplifiers", completed: false },
    ],
    chapters: [
      { title: "Diode Circuits and Rectifiers", description: "PN junction theory, V-I characteristics, half/full-wave rectifiers, filters, Zener diode regulation, clipping/clamping circuits, and voltage multipliers.", readTime: "25 min" },
      { title: "BJT Biasing and Amplifiers", description: "BJT operation, biasing techniques (fixed, voltage divider), hybrid-pi model, CE/CB/CC configurations, h-parameters, frequency response, and multistage amplifiers.", readTime: "35 min" },
      { title: "MOSFETs and CMOS Circuits", description: "MOSFET characteristics, enhancement/depletion modes, biasing, common source/drain/gate amplifiers, CMOS inverter, and differential amplifier design.", readTime: "30 min" },
      { title: "Operational Amplifiers and Applications", description: "Ideal op-amp characteristics, inverting/non-inverting amplifiers, integrator, differentiator, instrumentation amplifier, comparators, and active filter design (Butterworth, Chebyshev).", readTime: "30 min" },
    ],
    resources: [
      { name: "Microelectronic Circuits — Sedra & Smith", description: "The most widely used analog electronics textbook worldwide with comprehensive coverage and SPICE simulations.", type: "book" },
      { name: "Electronic Devices and Circuit Theory — Boylestad & Nashelsky", description: "Accessible introduction to semiconductor devices and basic analog circuit design.", type: "book" },
      { name: "NPTEL Analog Electronics by IIT Madras", description: "Video lectures with circuit simulations covering the full analog electronics curriculum.", type: "video" },
      { name: "Design of Analog CMOS Circuits — Behzad Razavi", description: "Advanced reference for CMOS analog circuit design used in VLSI industry.", type: "reference" },
    ],
  },

  "signals-and-systems": {
    topics: [
      { name: "Signal Classification & Properties", completed: true },
      { name: "Fourier Series & Transforms", completed: true },
      { name: "Laplace Transform", completed: true },
      { name: "Z-Transform & Discrete Systems", completed: false },
      { name: "Sampling & Reconstruction", completed: false },
      { name: "LTI Systems & Convolution", completed: false },
    ],
    chapters: [
      { title: "Signal Classification and Operations", description: "Continuous/discrete-time signals, unit step, impulse, ramp, periodic/aperiodic signals, even/odd decomposition, energy and power signals, and signal transformations.", readTime: "20 min" },
      { title: "Fourier Analysis of Signals", description: "Trigonometric and exponential Fourier series, Gibbs phenomenon, Fourier transform, properties (time shifting, frequency shifting, convolution), and Parseval's theorem.", readTime: "30 min" },
      { title: "Laplace Transform and System Analysis", description: "Region of convergence, properties, inverse Laplace, partial fraction expansion, transfer function, poles and zeros, stability analysis, and initial/final value theorems.", readTime: "30 min" },
      { title: "Z-Transform and Discrete-Time Systems", description: "Z-transform definition, ROC properties, inverse Z-transform, DTFT, difference equations, system function, and digital filter structures (FIR, IIR).", readTime: "30 min" },
    ],
    resources: [
      { name: "Signals and Systems — Oppenheim, Willsky", description: "The definitive textbook on signals and systems used in top engineering programs worldwide.", type: "book" },
      { name: "Linear Systems and Signals — B.P. Lathi", description: "Intuitive and accessible coverage with emphasis on practical applications and solved examples.", type: "book" },
      { name: "MIT 6.003: Signals and Systems", description: "Lecture series by Professor Oppenheim himself — the gold standard for learning signals.", type: "course" },
      { name: "NPTEL Signals and Systems by IIT Bombay", description: "Complete video course aligned with Indian university curricula covering all major topics.", type: "video" },
    ],
  },

  "control-systems": {
    topics: [
      { name: "Modeling & Transfer Functions", completed: true },
      { name: "Time Domain Analysis", completed: true },
      { name: "Stability Analysis", completed: true },
      { name: "Root Locus Technique", completed: false },
      { name: "Frequency Domain Analysis", completed: false },
      { name: "State Space Analysis", completed: false },
    ],
    chapters: [
      { title: "System Modeling and Transfer Functions", description: "Differential equations of physical systems, Laplace transform applications, transfer functions, block diagram reduction, signal flow graphs, and Mason's gain formula.", readTime: "30 min" },
      { title: "Time Response Analysis", description: "Standard test signals, first and second order system responses, time domain specifications (rise time, peak time, settling time, overshoot), and steady-state error analysis.", readTime: "25 min" },
      { title: "Stability and Root Locus", description: "Routh-Hurwitz criterion, relative stability, root locus rules, construction steps, angle/magnitude conditions, and design using root locus.", readTime: "30 min" },
      { title: "Frequency Response and Compensation", description: "Bode plots, Nyquist stability criterion, gain/phase margins, M-N circles, lead/lag compensators, PID controller design, and tuning methods (Ziegler-Nichols).", readTime: "35 min" },
    ],
    resources: [
      { name: "Control Systems Engineering — Norman Nise", description: "Student-friendly textbook with emphasis on practical design examples and MATLAB integration.", type: "book" },
      { name: "Modern Control Engineering — Katsuhiko Ogata", description: "Comprehensive reference covering classical and modern control theory with numerous solved problems.", type: "book" },
      { name: "NPTEL Control Systems by IIT Bombay", description: "Video lectures covering time domain, frequency domain, and state space analysis.", type: "video" },
      { name: "MATLAB Control System Toolbox Documentation", description: "Reference for practical control system analysis and design using MATLAB/Simulink.", type: "reference" },
    ],
  },

  "thermodynamics": {
    topics: [
      { name: "Fundamental Concepts & Laws", completed: true },
      { name: "First Law of Thermodynamics", completed: true },
      { name: "Second Law & Entropy", completed: true },
      { name: "Thermodynamic Cycles", completed: false },
      { name: "Heat Transfer", completed: false },
      { name: "Refrigeration & Air Conditioning", completed: false },
    ],
    chapters: [
      { title: "Basic Concepts and Properties", description: "Thermodynamic systems, properties and state, zeroth law, temperature scales, pure substances, PVT surfaces, and equations of state (ideal gas, van der Waals).", readTime: "25 min" },
      { title: "First Law of Thermodynamics", description: "Internal energy, enthalpy, specific heats, first law for closed/open systems, steady flow processes, and applications to nozzles, turbines, compressors.", readTime: "30 min" },
      { title: "Second Law and Entropy", description: "Kelvin-Planck and Clausius statements, reversible/irreversible processes, Carnot cycle, entropy principle, T-s diagrams, and exergy analysis.", readTime: "30 min" },
      { title: "Power Cycles and Refrigeration", description: "Rankine cycle (steam power), Otto and Diesel cycles (IC engines), Brayton cycle (gas turbines), vapor-compression refrigeration, and psychrometric charts.", readTime: "35 min" },
    ],
    resources: [
      { name: "Thermodynamics: An Engineering Approach — Cengel & Boles", description: "Most widely used engineering thermodynamics textbook with clear explanations and extensive problem sets.", type: "book" },
      { name: "Engineering Thermodynamics — P.K. Nag", description: "Popular textbook for Indian engineering curricula with solved examples from university exams.", type: "book" },
      { name: "NPTEL Thermodynamics by IIT Madras", description: "Video lecture series covering fundamental concepts and applied thermodynamics.", type: "video" },
      { name: "MIT 2.005: Thermal Fluids Engineering", description: "Course covering thermodynamics, fluid mechanics, and heat transfer fundamentals.", type: "course" },
    ],
  },

  "fluid-mechanics": {
    topics: [
      { name: "Fluid Properties & Statics", completed: true },
      { name: "Fluid Kinematics", completed: true },
      { name: "Fluid Dynamics & Bernoulli", completed: true },
      { name: "Flow Measurement", completed: false },
      { name: "Turbines & Pumps", completed: false },
      { name: "Compressible Flow & CFD Basics", completed: false },
    ],
    chapters: [
      { title: "Fluid Properties and Hydrostatics", description: "Density, viscosity, surface tension, capillarity, vapor pressure, Pascal's law, hydrostatic pressure, manometers, and hydrostatic forces on submerged surfaces.", readTime: "25 min" },
      { title: "Fluid Kinematics and Dynamics", description: "Lagrangian/Eulerian descriptions, velocity and acceleration fields, streamlines, continuity equation, Euler's equation, Bernoulli's equation, and applications (venturi, orifice, pitot tube).", readTime: "30 min" },
      { title: "Flow Through Pipes and Losses", description: "Laminar and turbulent flow, Reynolds number, Darcy-Weisbach equation, Moody chart, minor losses, pipe network analysis, and water hammer.", readTime: "25 min" },
      { title: "Turbomachinery and Pumps", description: "Centrifugal and axial flow pumps, pump characteristic curves, NPSH, cavitation, impulse and reaction turbines (Pelton, Francis, Kaplan), and specific speed.", readTime: "30 min" },
    ],
    resources: [
      { name: "Fluid Mechanics — Frank White", description: "Comprehensive textbook with strong theoretical foundations and practical engineering applications.", type: "book" },
      { name: "Fluid Mechanics and Machinery — Cengel & Cimbala", description: "Visual and intuitive approach with CFD examples and real-world engineering applications.", type: "book" },
      { name: "NPTEL Fluid Mechanics by IIT Madras", description: "Video lectures covering fluid statics, dynamics, and turbomachinery.", type: "video" },
      { name: "Fox and McDonald's Introduction to Fluid Mechanics", description: "Classic textbook with balanced coverage of theory and applications with extensive problem sets.", type: "reference" },
    ],
  },

  "python-programming": {
    topics: [
      { name: "Python Basics & Data Types", completed: true },
      { name: "Control Flow & Functions", completed: true },
      { name: "Object-Oriented Programming", completed: true },
      { name: "NumPy & Pandas", completed: false },
      { name: "Web Development with Flask/Django", completed: false },
      { name: "Advanced Topics: Decorators, Generators, Async", completed: false },
    ],
    chapters: [
      { title: "Python Fundamentals and Data Structures", description: "Variables, data types, lists, tuples, dictionaries, sets, string manipulation, list comprehensions, and built-in functions with practical examples.", readTime: "20 min" },
      { title: "Functions, Modules, and File I/O", description: "Function definitions, arguments (positional, keyword, default, *args, **kwargs), lambda functions, modules, packages, pip, and file handling (text, binary, CSV, JSON).", readTime: "25 min" },
      { title: "Object-Oriented and Functional Python", description: "Classes, inheritance, polymorphism, encapsulation, magic methods, decorators, generators, context managers, and itertools module.", readTime: "30 min" },
      { title: "Data Science and Web Frameworks", description: "NumPy arrays and vectorization, Pandas DataFrames (groupby, merge, pivot), Flask routing and templates, Django models and views, and REST API development.", readTime: "35 min" },
    ],
    resources: [
      { name: "Automate the Boring Stuff with Python — Al Sweigart", description: "Practical Python book focused on real-world automation tasks accessible to beginners.", type: "book" },
      { name: "Fluent Python — Luciano Ramalho", description: "Advanced Python coverage with deep dives into idiomatic Python, concurrency, and metaprogramming.", type: "book" },
      { name: "Python Crash Course — Eric Matthes", description: "Project-based introduction to Python with hands-on projects like games and web applications.", type: "book" },
      { name: "Real Python Tutorials", description: "High-quality Python tutorials and articles covering everything from basics to advanced topics.", type: "reference" },
    ],
  },

  "java-programming": {
    topics: [
      { name: "Java Language Fundamentals", completed: true },
      { name: "Object-Oriented Programming", completed: true },
      { name: "Collections Framework", completed: true },
      { name: "Multithreading & Concurrency", completed: false },
      { name: "JDBC & Database Connectivity", completed: false },
      { name: "Spring Boot & Microservices", completed: false },
    ],
    chapters: [
      { title: "Java Core Concepts", description: "JVM architecture, primitive types, operators, control flow, arrays, strings (String pool, StringBuilder), exception handling, and packaging with JAR files.", readTime: "25 min" },
      { title: "OOP Principles and Design", description: "Classes, objects, inheritance, polymorphism (overloading, overriding), interfaces, abstract classes, method references, streams API, and functional interfaces.", readTime: "30 min" },
      { title: "Collections, Generics, and Utilities", description: "List, Set, Map implementations (ArrayList, LinkedList, HashSet, TreeMap, HashMap), sorting, comparable/comparator, generics, and java.util.concurrent collections.", readTime: "30 min" },
      { title: "Multithreading, JDBC, and Spring Boot", description: "Thread lifecycle, synchronized blocks, executors, locks, JDBC connection pooling, JPA, REST controllers, dependency injection, and Spring Boot auto-configuration.", readTime: "40 min" },
    ],
    resources: [
      { name: "Effective Java — Joshua Bloch", description: "Essential best-practices guide with 90+ items covering Java design patterns, APIs, and language idioms.", type: "book" },
      { name: "Head First Java — Sierra & Bates", description: "Visually engaging introduction to Java programming with focus on OOP concepts and real-world examples.", type: "book" },
      { name: "Spring in Action — Craig Walls", description: "Practical guide to Spring Boot, Spring MVC, and building production-ready microservices.", type: "book" },
      { name: "Java: The Complete Reference — Herbert Schildt", description: "Comprehensive Java reference covering language features, libraries, and tools.", type: "reference" },
    ],
  },

  "c-programming": {
    topics: [
      { name: "C Language Basics & Control Flow", completed: true },
      { name: "Functions & Storage Classes", completed: true },
      { name: "Arrays, Strings & Pointers", completed: true },
      { name: "Structures & Unions", completed: false },
      { name: "Dynamic Memory Allocation", completed: false },
      { name: "File I/O & Preprocessor Directives", completed: false },
    ],
    chapters: [
      { title: "C Language Fundamentals", description: "Data types, operators, type conversion, input/output (printf, scanf), control statements (if, switch, loops), and bitwise operations with practical examples.", readTime: "20 min" },
      { title: "Functions, Pointers, and Arrays", description: "Function declaration/definition, recursion, call by value/reference, pointer arithmetic, arrays and pointer relationship, multi-dimensional arrays, and string manipulation.", readTime: "30 min" },
      { title: "Structures, Unions, and Dynamic Memory", description: "Structure definition and nesting, array of structures, union vs struct, bit fields, malloc/calloc/realloc/free, memory leaks, and linked list implementation in C.", readTime: "25 min" },
      { title: "File Handling and Preprocessor", description: "File modes, fread/fwrite, fseek, ftell, error handling, command-line arguments, macro definitions (#define, #ifdef), conditional compilation, and header file organization.", readTime: "20 min" },
    ],
    resources: [
      { name: "The C Programming Language — Kernighan & Ritchie", description: "The definitive C book written by the language creators — concise, clear, and authoritative.", type: "book" },
      { name: "Let Us C — Yashwant Kanetkar", description: "Most popular C programming book in India with simple explanations and ample practice problems.", type: "book" },
      { name: "Pointers in C — Yashwant Kanetkar", description: "Dedicated guide to understanding pointers with detailed examples and memory diagrams.", type: "book" },
      { name: "NPTEL C Programming by IIT Madras", description: "Video lecture series covering C programming from basics to advanced topics.", type: "video" },
    ],
  },

  "vlsi-design": {
    topics: [
      { name: "CMOS Technology & Fabrication", completed: true },
      { name: "MOS Transistor Theory", completed: true },
      { name: "CMOS Circuit Design", completed: true },
      { name: "Verilog/VHDL & RTL Design", completed: false },
      { name: "FPGA & ASIC Design Flow", completed: false },
      { name: "Testing & Design for Testability", completed: false },
    ],
    chapters: [
      { title: "CMOS Fabrication and Transistor Theory", description: "Wafer processing, photolithography, diffusion, ion implantation, MOS transistor structure, I-V characteristics, body effect, channel length modulation, and short-channel effects.", readTime: "30 min" },
      { title: "CMOS Logic Gates and Circuit Design", description: "CMOS inverter static/dynamic characteristics, noise margins, power dissipation (static, dynamic, short-circuit), propagation delay, logic gate design, transmission gates, and pass transistor logic.", readTime: "35 min" },
      { title: "Verilog HDL and RTL Design", description: "Module structure, dataflow modeling, behavioral modeling, structural modeling, finite state machines, testbench writing, and simulation with ModelSim/iverilog.", readTime: "30 min" },
      { title: "ASIC and FPGA Design Flow", description: "Synthesis, place and route, timing analysis, constraints (SDC), clock tree synthesis, FPGA architecture (LUTs, CLBs, routing), and design for manufacturability.", readTime: "30 min" },
    ],
    resources: [
      { name: "CMOS VLSI Design: A Circuits and Systems Perspective — Weste & Harris", description: "Industry-standard textbook covering CMOS circuits, layout, and system design with modern perspectives.", type: "book" },
      { name: "Digital Integrated Circuits — Rabaey, Chandrakasan, Nikolic", description: "Deep dive into digital circuit design from transistor-level to architecture-level optimization.", type: "book" },
      { name: "NPTEL VLSI Design by IIT Bombay", description: "Video lectures covering CMOS design, fabrication, and digital VLSI system design.", type: "video" },
      { name: "Verilog HDL: A Guide to Digital Design — Samir Palnitkar", description: "Practical Verilog guide with numerous design examples and simulation techniques.", type: "reference" },
    ],
  },

  "embedded-systems": {
    topics: [
      { name: "Microcontroller Architecture", completed: true },
      { name: "GPIO & Peripheral Programming", completed: true },
      { name: "Interrupts & Timers", completed: true },
      { name: "Real-Time Operating Systems", completed: false },
      { name: "ARM Cortex-M Programming", completed: false },
      { name: "IoT & Wireless Protocols", completed: false },
    ],
    chapters: [
      { title: "Microcontroller Fundamentals and ARM Architecture", description: "Harvard vs von Neumann architecture, RISC vs CISC, ARM Cortex-M processor modes, register set, memory map, and the instruction set (Thumb-2).", readTime: "30 min" },
      { title: "GPIO, Timers, and Interrupt Handling", description: "GPIO configuration (input, output, alternate function), interrupt priorities (NVIC), SysTick timer, general-purpose timers, PWM generation, and input capture.", readTime: "35 min" },
      { title: "Serial Communication Protocols", description: "UART, I2C, SPI, CAN protocol frames, clock synchronization, multi-master arbitration, and practical implementation on STM32 microcontrollers.", readTime: "30 min" },
      { title: "RTOS and IoT Integration", description: "Task scheduling (preemptive, cooperative), semaphores, mutexes, queues, FreeRTOS porting, MQTT protocol, ESP32 WiFi/BLE, and sensor integration.", readTime: "35 min" },
    ],
    resources: [
      { name: "Embedded Systems: Real-Time Interfacing to ARM Cortex-M Microcontrollers — Jonathan Valvano", description: "Hands-on textbook with extensive examples for ARM-based embedded systems design.", type: "book" },
      { name: "Mastering STM32 — Carmine Noviello", description: "Practical guide to STM32 development with HAL and LL drivers covering peripherals and middleware.", type: "book" },
      { name: "NPTEL Embedded Systems by IIT Madras", description: "Video lectures covering microcontroller programming, RTOS, and IoT applications.", type: "video" },
      { name: "FreeRTOS Documentation and Tutorials", description: "Official documentation for the most popular open-source RTOS for microcontrollers.", type: "reference" },
    ],
  },

  "power-electronics": {
    topics: [
      { name: "Power Semiconductor Devices", completed: true },
      { name: "AC-DC Converters (Rectifiers)", completed: true },
      { name: "DC-DC Converters (Choppers)", completed: true },
      { name: "DC-AC Inverters", completed: false },
      { name: "AC-AC Converters", completed: false },
      { name: "Motor Drives & Applications", completed: false },
    ],
    chapters: [
      { title: "Power Semiconductor Switches", description: "Power diode, SCR, TRIAC, GTO, power MOSFET, IGBT — structure, characteristics, turn-on/turn-off mechanisms, switching losses, and snubber circuits.", readTime: "30 min" },
      { title: "AC to DC Conversion (Rectifiers)", description: "Single/three-phase uncontrolled rectifiers, phase-controlled rectifiers, half-controlled bridges, commutation, input power factor, and harmonic analysis.", readTime: "30 min" },
      { title: "DC to DC Conversion (Choppers)", description: "Buck, boost, buck-boost converters, Cuk converter, isolated converters (flyback, forward, push-pull), continuous/discontinuous conduction, and output voltage regulation.", readTime: "35 min" },
      { title: "DC to AC Inverters and Motor Drives", description: "Single/three-phase voltage source inverters, PWM techniques (sinusoidal, space vector), multilevel inverters, DC motor drives, and induction motor speed control (V/f).", readTime: "35 min" },
    ],
    resources: [
      { name: "Power Electronics: Circuits, Devices, and Applications — Rashid", description: "Comprehensive textbook covering power semiconductor devices, converter topologies, and applications.", type: "book" },
      { name: "Power Electronics: Converters, Applications, and Design — Mohan, Undeland, Robbins", description: "Industry-standard reference with detailed converter analysis and simulation examples.", type: "book" },
      { name: "NPTEL Power Electronics by IIT Madras", description: "Video lectures covering converters, inverters, and motor drive applications.", type: "video" },
      { name: "PSIM/PowerSim Simulations", description: "Power electronics simulation software documentation for circuit design and analysis.", type: "reference" },
    ],
  },

  "engineering-mechanics": {
    topics: [
      { name: "Statics & Equilibrium", completed: true },
      { name: "Dynamics & Kinematics", completed: true },
      { name: "Friction & Applications", completed: true },
      { name: "Moment of Inertia", completed: false },
      { name: "Virtual Work & Energy Methods", completed: false },
      { name: "Vibration Analysis", completed: false },
    ],
    chapters: [
      { title: "Statics: Forces and Equilibrium", description: "Force systems, resolution and composition, free-body diagrams, equilibrium equations (2D and 3D), reactions at supports, and analysis of simple trusses (method of joints, method of sections).", readTime: "30 min" },
      { title: "Dynamics: Kinematics and Kinetics", description: "Rectilinear and curvilinear motion, projectile motion, relative velocity, Newton's laws, D'Alembert's principle, work-energy theorem, impulse-momentum, and impact of elastic bodies.", readTime: "30 min" },
      { title: "Friction and Its Applications", description: "Laws of dry friction, angles of friction, ladder friction, wedge friction, belt friction, rolling resistance, and screw friction with practical problem solving.", readTime: "25 min" },
      { title: "Moment of Inertia and Vibrations", description: "Area moment of inertia, parallel axis theorem, radius of gyration, mass moment of inertia, simple harmonic motion, undamped/damped free vibrations, and forced vibrations.", readTime: "25 min" },
    ],
    resources: [
      { name: "Engineering Mechanics: Statics and Dynamics — Hibbeler", description: "Industry-standard textbook with clear problem-solving methodology and extensive practice problems.", type: "book" },
      { name: "Engineering Mechanics — Irving Shames", description: "Rigorous treatment of statics and dynamics with vector approach and engineering applications.", type: "book" },
      { name: "NPTEL Engineering Mechanics by IIT Madras", description: "Video lectures covering complete engineering mechanics curriculum with solved examples.", type: "video" },
      { name: "Engineering Mechanics — A.K. Tayal", description: "Popular Indian textbook with syllabus-aligned content and university exam problem sets.", type: "reference" },
    ],
  },

  "probability-statistics": {
    topics: [
      { name: "Probability & Random Variables", completed: true },
      { name: "Probability Distributions", completed: true },
      { name: "Sampling & Estimation", completed: true },
      { name: "Hypothesis Testing", completed: false },
      { name: "Regression & Correlation", completed: false },
      { name: "Statistical Quality Control", completed: false },
    ],
    chapters: [
      { title: "Probability Theory and Random Variables", description: "Axioms of probability, conditional probability, Bayes' theorem, independence, discrete/continuous random variables, probability mass/density functions, and cumulative distribution functions.", readTime: "30 min" },
      { title: "Probability Distributions and Expectation", description: "Binomial, Poisson, geometric, uniform, normal, exponential distributions, expected value, variance, moment generating functions, Chebyshev's inequality, and law of large numbers.", readTime: "30 min" },
      { title: "Sampling Theory and Estimation", description: "Random sampling, sampling distributions, central limit theorem, point estimators, properties (unbiasedness, consistency, efficiency), maximum likelihood estimation, and confidence intervals.", readTime: "25 min" },
      { title: "Hypothesis Testing and Regression", description: "Null/alternative hypotheses, type I and II errors, p-values, t-tests, chi-square tests, ANOVA, simple/multiple linear regression, correlation coefficient, and residual analysis.", readTime: "30 min" },
    ],
    resources: [
      { name: "Probability and Statistics for Engineers and Scientists — Walpole, Myers", description: "Standard engineering statistics textbook with application-oriented approach and real datasets.", type: "book" },
      { name: "Introduction to Probability — Bertsekas & Tsitsiklis", description: "Clear and rigorous introduction to probability with excellent problem sets from MIT's course.", type: "book" },
      { name: "MIT 18.05: Introduction to Probability and Statistics", description: "MIT's undergraduate course with interactive materials and R integration for data analysis.", type: "course" },
      { name: "NPTEL Probability and Statistics by IIT Kharagpur", description: "Video lectures covering probability, distributions, and statistical inference.", type: "video" },
    ],
  },
};

export function getSubjectContent(slug: string): SubjectContent | undefined {
  return subjectContents[slug];
}

export type { SubjectTopic, SubjectChapter, SubjectResource, SubjectContent };
