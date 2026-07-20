export interface NoteContent {
  title: string;
  subject: string;
  subjectSlug: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const notesContent: Record<string, NoteContent> = {
  "complete-guide-data-structures": {
    title: "Complete Guide to Data Structures",
    subject: "Data Structures",
    subjectSlug: "data-structures",
    author: "Dr. Suresh Kumar",
    readTime: "25 min",
    excerpt: "Arrays, Linked Lists, Stacks, Queues, Trees, Graphs — everything covered with examples.",
    tags: ["arrays", "linked lists", "trees", "graphs", "algorithms"],
    content: `## Introduction to Data Structures

Data structures are a way of organizing and storing data so that it can be accessed and modified efficiently. They are fundamental to computer science and programming.

### Why Data Structures Matter

- **Efficiency**: Choose the right structure for optimal time/space complexity
- **Organization**: Keep data organized for easy access
- **Reusability**: Standard structures are well-tested and reliable

---

## Arrays

An array is a collection of elements stored at contiguous memory locations.

### Properties
- Fixed size (in most languages)
- O(1) random access
- O(n) insertion/deletion
- Cache-friendly

### Common Operations
| Operation | Time Complexity |
|-----------|----------------|
| Access by index | O(1) |
| Search (unsorted) | O(n) |
| Search (sorted, binary) | O(log n) |
| Insert at end | O(1) amortized |
| Insert at beginning | O(n) |
| Delete | O(n) |

---

## Linked Lists

A linked list consists of nodes where each node contains data and a reference to the next node.

### Types
1. **Singly Linked List** — Each node points to the next node
2. **Doubly Linked List** — Each node points to both next and previous
3. **Circular Linked List** — Last node points back to the first

### When to Use
- Dynamic size requirements
- Frequent insertions/deletions
- When random access is not needed

---

## Stacks

A stack follows **LIFO** (Last In, First Out) principle.

### Operations
- \`push()\`: Add element to top — O(1)
- \`pop()\`: Remove element from top — O(1)
- \`peek()\`: View top element — O(1)
- \`isEmpty()\`: Check if empty — O(1)

### Applications
- Function call management (recursion)
- Undo operations in editors
- Expression evaluation (infix to postfix)
- Syntax parsing

---

## Queues

A queue follows **FIFO** (First In, First Out) principle.

### Types
- **Simple Queue** — Basic FIFO
- **Circular Queue** — Better memory utilization
- **Priority Queue** — Elements ordered by priority
- **Deque** — Insert/delete from both ends

### Applications
- BFS (Breadth-First Search)
- Task scheduling
- Print spooling
- Message queues

---

## Trees

A tree is a hierarchical data structure with a root node and child nodes.

### Binary Tree
Each node has at most 2 children (left and right).

### Binary Search Tree (BST)
For any node: left subtree < node < right subtree
- Search: O(log n) average
- Insert: O(log n) average
- Delete: O(log n) average

### Tree Traversals
- **Inorder** (Left → Root → Right): Sorted order for BST
- **Preorder** (Root → Left → Right): Tree copying
- **Postorder** (Left → Right → Root): Tree deletion
- **Level Order**: BFS traversal

### Balanced Trees
- **AVL Tree**: Self-balancing BST with height difference ≤ 1
- **Red-Black Tree**: Self-balancing with color constraints
- **B-Tree**: Optimized for disk storage

---

## Graphs

A graph consists of vertices (nodes) and edges connecting them.

### Representations
- **Adjacency Matrix**: O(V²) space, O(1) edge lookup
- **Adjacency List**: O(V+E) space, O(degree) edge lookup

### Traversals
- **DFS** (Depth-First Search): Uses stack/recursion
- **BFS** (Breadth-First Search): Uses queue

### Applications
- Social networks (friendship graphs)
- Maps and navigation (shortest path)
- Recommendation systems
- Network routing

---

## Hashing

Hash tables store key-value pairs using a hash function.

### Collision Resolution
1. **Chaining**: Each bucket stores a linked list
2. **Open Addressing**: Linear probing, quadratic probing, double hashing

### Performance
- Average: O(1) for insert, delete, search
- Worst: O(n) with poor hash function

### Key Takeaway
Choose the right data structure based on your access patterns, memory constraints, and performance requirements.`,
  },

  "os-concepts-explained": {
    title: "Operating System Concepts Explained",
    subject: "Operating Systems",
    subjectSlug: "operating-systems",
    author: "Prof. Meena Sharma",
    readTime: "30 min",
    excerpt: "Deep dive into process management, memory management, file systems, and I/O.",
    tags: ["processes", "memory", "scheduling", "file systems"],
    content: `## Introduction to Operating Systems

An Operating System (OS) is system software that manages computer hardware and software resources and provides common services for computer programs.

### Key Functions
- **Process Management**: Creation, scheduling, synchronization of processes
- **Memory Management**: Allocation and deallocation of memory space
- **File System Management**: Organization and manipulation of files
- **Device Management**: I/O device communication
- **Security**: Protection from unauthorized access

---

## Process Management

### Process vs Thread
| Feature | Process | Thread |
|---------|---------|--------|
| Memory Space | Separate | Shared |
| Creation Time | Slow | Fast |
| Context Switch | Expensive | Inexpensive |
| Isolation | Fully isolated | Shares with siblings |
| Communication | IPC needed | Direct memory access |

### Process States
1. **New** — Process is created
2. **Ready** — Waiting for CPU
3. **Running** — CPU is executing
4. **Waiting** — Waiting for I/O or event
5. **Terminated** — Finished execution

### CPU Scheduling Algorithms
- **FCFS** (First Come First Serve): Non-preemptive, simple
- **SJF** (Shortest Job First): Minimizes average waiting time
- **Round Robin**: Time-sharing, fair allocation
- **Priority Scheduling**: Higher priority runs first
- **MLFQ**: Multiple queues with different priorities

---

## Memory Management

### Techniques
1. **Contiguous Allocation**: Process occupies contiguous memory
2. **Paging**: Fixed-size pages, eliminates external fragmentation
3. **Segmentation**: Variable-sized segments based on logical divisions
4. **Virtual Memory**: Allows execution of processes larger than physical RAM

### Page Replacement Algorithms
- **FIFO**: First-in, first-out (suffers from Belady's anomaly)
- **LRU**: Least Recently Used (good performance, expensive)
- **Optimal**: Replace page that won't be used longest (theoretical)
- **Clock**: Approximation of LRU with reference bits

---

## File Systems

### File Allocation Methods
- **Contiguous**: Fast sequential access, external fragmentation
- **Linked**: No fragmentation, slow random access
- **Indexed**: Fast random access, index block overhead

### Directory Structure
- Single-level
- Two-level
- Tree-structured
- Acyclic graph

---

## Deadlocks

### Necessary Conditions
1. **Mutual Exclusion**: Resources are non-sharable
2. **Hold and Wait**: Process holds resources while waiting
3. **No Preemption**: Resources cannot be forcibly taken
4. **Circular Wait**: Circular chain of processes waiting

### Handling Strategies
- **Prevention**: Break one of the four conditions
- **Avoidance**: Banker's algorithm
- **Detection & Recovery**: Detect cycles, kill processes
- **Ignore**: Ostrich algorithm (used in most systems)`,
  },

  "ml-fundamentals": {
    title: "Machine Learning Fundamentals",
    subject: "Machine Learning",
    subjectSlug: "machine-learning",
    author: "Dr. Rajesh Patel",
    readTime: "35 min",
    excerpt: "From linear regression to neural networks — a comprehensive overview of ML.",
    tags: ["regression", "classification", "neural networks", "deep learning"],
    content: `## Introduction to Machine Learning

Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

### Types of Machine Learning
1. **Supervised Learning**: Learn from labeled data
2. **Unsupervised Learning**: Find patterns in unlabeled data
3. **Reinforcement Learning**: Learn through trial and error

---

## Supervised Learning

### Regression
Predicts continuous values.

**Linear Regression**: \`y = mx + c\`
- Simple, interpretable
- Assumes linear relationship

**Multiple Regression**: Multiple features
- \`y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ\`

### Classification
Predicts discrete categories.

**Logistic Regression**: Binary classification using sigmoid function
**Decision Trees**: Tree-based decision rules
**Random Forest**: Ensemble of decision trees
**SVM**: Finds optimal hyperplane for separation
**K-NN**: Classifies based on nearest neighbors

### Evaluation Metrics
- **Accuracy**: (TP + TN) / Total
- **Precision**: TP / (TP + FP)
- **Recall**: TP / (TP + FN)
- **F1 Score**: 2 × (Precision × Recall) / (Precision + Recall)
- **ROC-AUC**: Area under ROC curve

---

## Unsupervised Learning

### Clustering
- **K-Means**: Partition into K clusters
- **DBSCAN**: Density-based clustering
- **Hierarchical Clustering**: Tree of clusters

### Dimensionality Reduction
- **PCA**: Principal Component Analysis
- **t-SNE**: Visualization of high-dimensional data
- **Autoencoders**: Neural network-based reduction

---

## Neural Networks

### Perceptron
The simplest neural network — a single neuron.

### Multi-Layer Perceptron (MLP)
- Input layer → Hidden layers → Output layer
- Activation functions: ReLU, Sigmoid, Tanh
- Backpropagation for training

### Deep Learning
- **CNNs**: For image data (convolutional layers)
- **RNNs**: For sequential data (LSTM, GRU)
- **Transformers**: Attention-based architecture (BERT, GPT)

### Training Process
1. Forward pass: Compute predictions
2. Loss calculation: Compare predictions to targets
3. Backward pass: Compute gradients
4. Weight update: Gradient descent

---

## Model Evaluation & Validation

### Overfitting vs Underfitting
- **Overfitting**: Model learns noise, poor generalization
- **Underfitting**: Model too simple, poor on training data

### Solutions
- Cross-validation (k-fold)
- Regularization (L1, L2)
- Early stopping
- Dropout (for neural networks)
- More training data

### Bias-Variance Tradeoff
- High bias → Underfitting
- High variance → Overfitting
- Goal: Find optimal balance`,
  },

  "dbms-interview-qa": {
    title: "DBMS Interview Questions & Answers",
    subject: "DBMS",
    subjectSlug: "dbms",
    author: "Ananya Gupta",
    readTime: "20 min",
    excerpt: "Most frequently asked DBMS interview questions with detailed explanations.",
    tags: ["SQL", "normalization", "transactions", "indexing"],
    content: `## DBMS Interview Questions

### Q1: What is the difference between DBMS and RDBMS?

**DBMS** (Database Management System) stores data as files. **RDBMS** (Relational DBMS) stores data in tables with relationships.

| Feature | DBMS | RDBMS |
|---------|------|-------|
| Data Storage | File-based | Table-based |
| Relationships | No | Yes (Foreign Keys) |
| Normalization | Not supported | Supported |
| ACID | Partial | Full |
| Example | MongoDB | PostgreSQL |

---

### Q2: Explain the ACID properties.

**Atomicity**: Transaction is all-or-nothing. If any part fails, the entire transaction rolls back.

**Consistency**: Transaction brings database from one valid state to another. All constraints and rules are maintained.

**Isolation**: Concurrent transactions don't interfere with each other. Each transaction appears to run in isolation.

**Durability**: Once committed, changes persist even after system failure.

---

### Q3: What is normalization? Explain normal forms.

Normalization is the process of organizing data to eliminate redundancy and anomalies.

**1NF**: Atomic columns, no repeating groups
**2NF**: 1NF + no partial dependencies
**3NF**: 2NF + no transitive dependencies
**BCNF**: Every determinant is a candidate key
**4NF**: No multi-valued dependencies

**Example**: 
Before normalization: Student(ID, Name, Courses)
After 3NF: Student(ID, Name), Enrollment(ID, CourseID), Course(CourseID, Name)

---

### Q4: What is indexing? Types of indexes?

Indexing is a technique to speed up data retrieval operations.

**Types**:
- **Primary Index**: On primary key (clustered)
- **Secondary Index**: On non-primary key (non-clustered)
- **Unique Index**: Ensures unique values
- **Composite Index**: On multiple columns
- **Hash Index**: For equality searches
- **B-Tree Index**: For range queries

---

### Q5: Explain SQL Joins.

**INNER JOIN**: Returns matching rows from both tables
**LEFT JOIN**: All rows from left, matching from right
**RIGHT JOIN**: All rows from right, matching from left
**FULL OUTER JOIN**: All rows from both tables
**CROSS JOIN**: Cartesian product
**SELF JOIN**: Table joined with itself

---

### Q6: What is a transaction and its states?

A transaction is a logical unit of work that contains one or more SQL statements.

**States**: Active → Partially Committed → Committed
                     → Failed → Aborted

---

### Q7: Difference between DELETE, TRUNCATE, and DROP?

| Command | Type | Speed | Rollback | Structure |
|---------|------|-------|----------|-----------|
| DELETE | DML | Slow | Yes | Preserved |
| TRUNCATE | DDL | Fast | No | Preserved |
| DROP | DDL | Fastest | No | Removed |

---

### Q8: What is a deadlock in databases?

A deadlock occurs when two or more transactions hold locks on resources that each other needs, causing them to wait indefinitely.

**Solutions**:
- **Deadlock Prevention**: Resource ordering
- **Deadlock Detection**: Wait-for graph
- **Deadlock Avoidance**: Wound-wait, wait-die
- **Timeout**: Rollback after timeout`,
  },

  "computer-networks-notes": {
    title: "Computer Networks — Complete Notes",
    subject: "Computer Networks",
    subjectSlug: "computer-networks",
    author: "Prof. Vikram Singh",
    readTime: "40 min",
    excerpt: "TCP/IP, OSI model, routing protocols, network security, and more.",
    tags: ["TCP/IP", "OSI", "routing", "security"],
    content: `## Introduction to Computer Networks

A computer network is a set of devices (nodes) connected by communication links that enable data exchange and resource sharing.

### Network Types
- **PAN** (Personal Area Network): ~10m range
- **LAN** (Local Area Network): Building/campus
- **MAN** (Metropolitan Area Network): City-wide
- **WAN** (Wide Area Network): Country/global

---

## OSI Model (7 Layers)

| Layer | Function | Example Protocols |
|-------|----------|------------------|
| 7. Application | User interface | HTTP, FTP, SMTP, DNS |
| 6. Presentation | Data formatting, encryption | SSL/TLS |
| 5. Session | Session management | NetBIOS, RPC |
| 4. Transport | End-to-end delivery | TCP, UDP |
| 3. Network | Routing, logical addressing | IP, ICMP, ARP |
| 2. Data Link | Framing, MAC addressing | Ethernet, PPP |
| 1. Physical | Raw bit transmission | Cables, hubs |

---

## TCP/IP Model (4 Layers)

1. **Network Interface**: Physical + Data Link
2. **Internet**: IP, routing
3. **Transport**: TCP, UDP
4. **Application**: HTTP, FTP, SMTP, DNS

---

## TCP vs UDP

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | No guarantee |
| Ordering | In-order delivery | No ordering |
| Speed | Slower | Faster |
| Use Cases | Web, email, file transfer | Streaming, gaming, VoIP |

### TCP Three-Way Handshake
1. Client sends SYN (seq=x)
2. Server replies SYN-ACK (seq=y, ack=x+1)
3. Client sends ACK (ack=y+1)

---

## Routing Protocols

### Interior Gateway Protocols
- **RIP** (Routing Information Protocol): Distance vector, hop count
- **OSPF** (Open Shortest Path First): Link state, Dijkstra algorithm
- **EIGRP**: Cisco proprietary, hybrid

### Exterior Gateway Protocols
- **BGP** (Border Gateway Protocol): Path vector, internet backbone

---

## Network Security

### Threats
- Eavesdropping, Man-in-the-Middle
- Denial of Service (DoS)
- Packet sniffing, IP spoofing

### Security Measures
- **Firewalls**: Filter traffic based on rules
- **Encryption**: SSL/TLS, IPsec
- **Authentication**: Passwords, certificates
- **IDS/IPS**: Detect and prevent intrusions

### Common Attacks & Protections
- **XSS**: Sanitize user input
- **SQL Injection**: Parameterized queries
- **CSRF**: Anti-CSRF tokens
- **DDoS**: Rate limiting, CDN`,
  },
};

export function getNoteContent(slug: string): NoteContent | undefined {
  return notesContent[slug];
}

export function getAllNotes(): NoteContent[] {
  return Object.values(notesContent);
}
