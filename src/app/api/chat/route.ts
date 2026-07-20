import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─── Local Knowledge Base ─────────────────────────────────────────────────────
// This runs entirely server-side with zero external API calls.
// Responses are matched against the user's question using keyword detection.

const KNOWLEDGE_BASE: { keywords: string[]; response: string }[] = [
  {
    keywords: ["big o", "time complexity", "space complexity", "algorithm analysis"],
    response: `## Big O Notation — Quick Reference

**Big O** describes the upper bound of an algorithm's growth rate as input size increases.

### Common Complexities (fastest → slowest)

| Notation | Name | Example |
|----------|------|---------|
| \`O(1)\` | Constant | Array access by index |
| \`O(log n)\` | Logarithmic | Binary search |
| \`O(n)\` | Linear | Linear search |
| \`O(n log n)\` | Linearithmic | Merge sort, Quick sort (avg) |
| \`O(n²)\` | Quadratic | Bubble sort, Nested loops |
| \`O(2ⁿ)\` | Exponential | Recursive Fibonacci (naive) |
| \`O(n!)\` | Factorial | Permutation generation |

### Examples

\`\`\`python
# O(1) — Constant time
def get_first(arr):
    return arr[0]

# O(n) — Linear time
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# O(n²) — Quadratic time
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
\`\`\`

**Key rule:** Drop constants and lower-order terms. \`O(2n + 5)\` → \`O(n)\``,
  },
  {
    keywords: ["sql", "nosql", "relational", "database", "dbms", "normalization", "acid"],
    response: `## SQL vs NoSQL — When to Use What

### SQL Databases (PostgreSQL, MySQL, SQLite)

| Feature | Details |
|---------|---------|
| **Structure** | Tables with rows and columns |
| **Schema** | Fixed, predefined schema |
| **Relationships** | Foreign keys, JOINs |
| **ACID** | Atomicity, Consistency, Isolation, Durability |
| **Best for** | Structured data, complex queries, transactions |

### NoSQL Databases (MongoDB, Redis, Cassandra)

| Type | Example | Use Case |
|------|---------|----------|
| Document | MongoDB | JSON-like documents, flexible schema |
| Key-Value | Redis | Caching, session storage |
| Column-Family | Cassandra | Time-series, large-scale analytics |
| Graph | Neo4j | Social networks, recommendation engines |

### When to Choose SQL
- Your data has clear relationships (orders ↔ customers ↔ products)
- You need ACID transactions
- You need complex JOINs and aggregations

### When to Choose NoSQL
- Your schema changes frequently
- You need horizontal scaling across many servers
- You're storing large volumes of unstructured data
- You need fast key-value lookups

### ACID Properties Explained
- **Atomicity**: A transaction is all-or-nothing
- **Consistency**: Data follows all validation rules before and after
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed data survives system failures`,
  },
  {
    keywords: ["garbage collection", "gc", "java", "memory management", "jvm"],
    response: `## Garbage Collection in Java — How It Works

Java's garbage collector automatically identifies and reclaims memory no longer referenced by the program.

### Key Concepts

**Heap is divided into generations:**
1. **Young Generation** — New objects are allocated here
   - Eden space
   - Survivor spaces (S0, S1)
2. **Old Generation** — Long-lived objects promoted from Young
3. **Metaspace** — Class metadata (replaced PermGen in Java 8)

### How GC Works (Simplified)

\`\`\`
1. New object → allocated in Eden
2. Minor GC runs → live objects move to S0
3. Next Minor GC → live objects move to S1 (S0 and S1 swap)
4. Objects surviving multiple GC cycles → promoted to Old Gen
5. Major GC (Full GC) → cleans Old Generation
\`\`\`

### Common GC Algorithms

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| **Serial GC** | Single-threaded, pauses all threads | Small apps, single-core |
| **Parallel GC** | Multi-threaded for minor GC | Throughput-focused apps |
| **G1 GC** (default since Java 9) | Region-based, predictable pause times | Large heaps, low-latency |
| **ZGC** | Ultra-low pause times (<10ms) | Very large heaps, real-time |

### When Objects Become Eligible for GC
- All references to the object are set to \`null\`
- The object goes out of scope
- There are circular references with no external references

\`\`\`java
// Eligible for GC after method returns
void example() {
    MyObject obj = new MyObject();
    obj.doSomething();
}
\`\`\``,
  },
  {
    keywords: ["tcp", "ip", "tcp/ip", "osi", "network", "protocol stack", "http"],
    response: `## TCP/IP Protocol Stack Explained

The TCP/IP model has 4 layers that govern how data travels across networks.

### The 4 Layers

| Layer | Protocols | Function |
|-------|-----------|----------|
| **Application** | HTTP, HTTPS, FTP, DNS, SMTP, SSH | User-facing data |
| **Transport** | TCP, UDP | Reliable delivery, flow control |
| **Internet** | IP, ICMP, ARP | Routing, addressing |
| **Link** | Ethernet, WiFi, PPP | Physical transmission |

### TCP Three-Way Handshake

\`\`\`
Client                          Server
  │   SYN (seq=x)                │
  │─────────────────────────────>│
  │   SYN-ACK (seq=y, ack=x+1)   │
  │<─────────────────────────────│
  │   ACK (seq=x+1, ack=y+1)     │
  │─────────────────────────────>│
  │      Connection Established   │
\`\`\`

### TCP vs UDP

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Guaranteed delivery | No guarantee |
| Ordering | Preserves order | No ordering |
| Speed | Slower (overhead) | Faster |
| Use Cases | Web, email, file transfer | Streaming, gaming, DNS |

### Key TCP Features
- **Flow Control**: Prevents sender from overwhelming receiver (sliding window)
- **Congestion Control**: Slow start, congestion avoidance, fast recovery
- **Error Detection**: Checksums on every segment`,
  },
  {
    keywords: ["rest", "restful", "api", "rest api", "http methods"],
    response: `## RESTful APIs — Design Guide

REST (Representational State Transfer) is an architectural style for building web APIs.

### Core Principles

1. **Stateless** — Each request contains all information needed
2. **Resource-based** — URLs represent resources (\`/users/123\`)
3. **Standard HTTP Methods** — Uniform interface
4. **Representation** — Resources can be JSON, XML, etc.

### HTTP Methods

| Method | Action | Example | Success Code |
|--------|--------|---------|--------------|
| \`GET\` | Read | \`GET /users/123\` | 200 |
| \`POST\` | Create | \`POST /users\` | 201 |
| \`PUT\` | Replace | \`PUT /users/123\` | 200 |
| \`PATCH\` | Partial update | \`PATCH /users/123\` | 200 |
| \`DELETE\` | Delete | \`DELETE /users/123\` | 204 |

### URL Design Best Practices

\`\`\`
GET    /users                    # List users
GET    /users/123                # Get user 123
POST   /users                    # Create user
PUT    /users/123                # Update user 123
DELETE /users/123                # Delete user 123
GET    /users/123/orders         # List orders for user 123
GET    /orders/456               # Get order 456
\`\`\`

### Status Codes

- **2xx** — Success (200 OK, 201 Created, 204 No Content)
- **3xx** — Redirection (301 Moved, 304 Not Modified)
- **4xx** — Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found)
- **5xx** — Server Error (500 Internal, 503 Service Unavailable)

### Example JSON Response

\`\`\`json
{
  "id": 123,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "courses": [
    { "id": 1, "title": "Data Structures" }
  ]
}
\`\`\``,
  },
  {
    keywords: ["hash", "hash table", "hash map", "hashmap", "hashing", "collision"],
    response: `## Hash Tables — How They Work

A hash table maps keys to values using a hash function. Average time: **O(1)** for insert, search, delete.

### Core Components

1. **Hash Function** — Converts a key into an array index
   \`\`\`python
   def simple_hash(key, table_size):
       return hash(key) % table_size
   \`\`\`

2. **Bucket Array** — Stores the actual key-value pairs

3. **Collision Resolution** — Handles when two keys hash to the same index

### Collision Resolution Methods

**Chaining** — Each bucket stores a linked list of entries
\`\`\`
Index 5: [("apple", 5)] → [("grape", 3)]
Index 6: [("banana", 2)]
\`\`\`

**Open Addressing** — Find the next empty slot
- Linear probing: \`hash(key) + 1, +2, +3...\`
- Quadratic probing: \`hash(key) + 1², +2², +3²...\`
- Double hashing: \`hash1(key) + i × hash2(key)\`

### Load Factor & Rehashing

\`\`\`
load_factor = number_of_entries / table_size
When load_factor > threshold (usually 0.75):
    → Create new table (2× size)
    → Rehash all entries into new table
\`\`\`

### Time Complexities

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Search | O(1) | O(n) |
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |

### Real-World Uses
- Database indexing
- Caching (Redis, Memcached)
- Symbol tables in compilers
- Object properties in JavaScript/Python`,
  },
  {
    keywords: ["process", "thread", "multithreading", "concurrency", "parallel", "scheduling"],
    response: `## Process vs Thread — Key Differences

### Process
- **Independent** — Each process has its own memory space
- **Heavyweight** — More overhead to create and switch
- **Isolated** — One process can't directly access another's memory
- **Communication** — IPC (pipes, sockets, shared memory)

### Thread
- **Lightweight** — Shares memory within a process
- **Fast switching** — Less context switch overhead
- **Shared memory** — All threads in a process share heap space
- **Risk** — Race conditions, deadlocks

### Comparison Table

| Feature | Process | Thread |
|---------|---------|--------|
| Memory | Separate address space | Shared within process |
| Creation | Slow | Fast |
| Context Switch | Heavy | Light |
| Communication | IPC mechanisms | Direct memory access |
| Isolation | High (crash-safe) | Low (one thread crash = all crash) |
| Synchronization | Not needed | Mutexes, semaphores |

### Common Scheduling Algorithms

| Algorithm | Description | Starvation? |
|-----------|-------------|-------------|
| **FCFS** | First come, first served | Convoy effect |
| **SJF** | Shortest job first | Possible (long jobs) |
| **Round Robin** | Fixed time quantum per process | Fair |
| **Priority** | Higher priority runs first | Possible (low priority) |
| **Multilevel Queue** | Processes grouped by type | Configurable |

### Python Example: Threading vs Multiprocessing

\`\`\`python
# Threading (I/O-bound tasks)
import threading
def download(url):
    # I/O operation
t = threading.Thread(target=download, args=("url",))
t.start()

# Multiprocessing (CPU-bound tasks)
from multiprocessing import Process
p = Process(target=cpu_intensive_fn)
p.start()
\`\`\``,
  },
  {
    keywords: ["binary search", "binary tree", "bst", "tree traversal", "graph", "dfs", "bfs"],
    response: `## Trees & Graphs — Essential Algorithms

### Binary Search Tree (BST)

**Property:** Left child < Parent < Right child

\`\`\`python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def search(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search(root.left, target)
    return search(root.right, target)

# Insert — O(log n) average
def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root
\`\`\`

### Tree Traversals

| Traversal | Order | Use Case |
|-----------|-------|----------|
| **Inorder** | Left → Root → Right | Sorted output (BST) |
| **Preorder** | Root → Left → Right | Copy tree |
| **Postorder** | Left → Right → Root | Delete tree |
| **Level-order** | BFS | Shortest path |

### Graph BFS & DFS

\`\`\`python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    while queue:
        node = queue.popleft()
        if node in visited: continue
        visited.add(node)
        print(node)
        for neighbor in graph[node]:
            queue.append(neighbor)

def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
\`\`\`

### When to Use BFS vs DFS

| BFS | DFS |
|-----|-----|
| Shortest path in unweighted graph | All paths, topological sort |
| Web crawling | Maze solving |
| Social network (degrees of separation) | Detecting cycles |
| Uses more memory (queue) | Uses less memory (stack/recursion) |`,
  },
  {
    keywords: ["dynamic programming", "dp", "memoization", "tabulation", "optimal substructure"],
    response: `## Dynamic Programming — Pattern Guide

Dynamic Programming solves problems by breaking them into overlapping subproblems and storing results.

### When to Use DP
1. **Optimal substructure** — Best solution depends on best solutions to subproblems
2. **Overlapping subproblems** — Same subproblems recur

### Two Approaches

#### 1. Top-Down (Memoization)
\`\`\`python
def fib(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
\`\`\`

#### 2. Bottom-Up (Tabulation)
\`\`\`python
def fib(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
\`\`\`

### Classic DP Problems

#### 0/1 Knapsack
\`\`\`python
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    values[i-1] + dp[i-1][w-weights[i-1]],
                    dp[i-1][w]
                )
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][capacity]
\`\`\`

#### Longest Common Subsequence
\`\`\`python
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
\`\`\`

### Common DP Patterns
- **Linear DP** — Fibonacci, House Robber, Climbing Stairs
- **Grid DP** — Unique Paths, Minimum Path Sum
- **Knapsack** — Partition Equal Subset Sum, Coin Change
- **String DP** — LCS, Edit Distance, Palindromic Substrings
- **DP on Trees** — Diameter of Tree, Max Path Sum`,
  },
  {
    keywords: ["object oriented", "oop", "encapsulation", "inheritance", "polymorphism", "abstraction"],
    response: `## Object-Oriented Programming — Core Principles

The four pillars of OOP with examples.

### 1. Encapsulation
Bundling data and methods that operate on that data within a single unit (class). Restricting direct access to internal state.

\`\`\`java
public class BankAccount {
    private double balance;  // hidden from outside

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public double getBalance() {
        return balance;  // read-only access
    }
}
\`\`\`

### 2. Inheritance
A class inherits properties and methods from a parent class.

\`\`\`java
public class Animal {
    public void sound() {
        System.out.println("Some sound");
    }
}

public class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Bark!");
    }
}
\`\`\`

### 3. Polymorphism
The ability to take many forms — same interface, different implementations.

\`\`\`java
Animal myPet = new Dog();
myPet.sound();  // Prints "Bark!" (runtime polymorphism)
\`\`\`

### 4. Abstraction
Hiding complex implementation details and showing only essential features.

\`\`\`java
abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double radius;
    Circle(double r) { radius = r; }
    double area() { return Math.PI * radius * radius; }
}
\`\`\`

### SOLID Principles (Bonus)
| Letter | Principle | Meaning |
|--------|-----------|---------|
| **S** | Single Responsibility | One class, one reason to change |
| **O** | Open/Closed | Open for extension, closed for modification |
| **L** | Liskov Substitution | Subtypes must be replaceable for their base types |
| **I** | Interface Segregation | Many specific interfaces > one general interface |
| **D** | Dependency Inversion | Depend on abstractions, not concretions |`,
  },
  {
    keywords: ["deadlock", "deadlocks", "starvation", "race condition", "synchronization", "mutex", "semaphore"],
    response: `## Deadlocks & Synchronization — Complete Guide

### What is a Deadlock?
A deadlock occurs when two or more processes are each waiting for resources held by the others.

### Four Necessary Conditions (Coffman Conditions)
1. **Mutual Exclusion** — Resource can only be held by one process at a time
2. **Hold and Wait** — Process holds resources while waiting for others
3. **No Preemption** — Resources cannot be forcibly taken
4. **Circular Wait** — A cycle of processes each waiting for the next

### Deadlock Prevention (Break one condition)
| Condition | Prevention Strategy |
|-----------|-------------------|
| Mutual Exclusion | Use shareable resources where possible |
| Hold and Wait | Request all resources at once |
| No Preemption | Allow preemption of resources |
| Circular Wait | Impose a strict ordering on resource acquisition |

### Deadlock Avoidance — Banker's Algorithm
Check if granting a resource leaves the system in a **safe state**.

### Synchronization Primitives

**Mutex** — Mutual exclusion lock
\`\`\`python
import threading
lock = threading.Lock()
lock.acquire()
# critical section
lock.release()
\`\`\`

**Semaphore** — Controls access to a pool of resources
\`\`\`python
semaphore = threading.Semaphore(3)  # Allow 3 concurrent accesses
semaphore.acquire()
# access shared resource
semaphore.release()
\`\`\`

### Race Condition Example
\`\`\`python
counter = 0
def increment():
    global counter
    for _ in range(100000):
        temp = counter
        temp += 1
        counter = temp
        # Without lock: thread interleaving causes wrong result!
\`\`\`

### Classic Synchronization Problems
- **Dining Philosophers** — Resource allocation with circle dependency
- **Reader-Writer Problem** — Multiple readers, single writer
- **Producer-Consumer** — Bounded buffer with empty/full signaling`,
  },
  {
    keywords: ["sorting", "sort", "merge sort", "quick sort", "bubble sort", "insertion sort", "selection sort"],
    response: `## Sorting Algorithms — Comparison Guide

### Comparison Table

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | No |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| **Counting Sort** | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |

### Quick Sort Implementation
\`\`\`python
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\`

### Merge Sort Implementation
\`\`\`python
def mergesort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = mergesort(arr[:mid])
    right = mergesort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]
\`\`\`

### When to Use Which
- **Small or nearly sorted arrays** → Insertion sort (O(n) for nearly sorted)
- **Large, general-purpose** → Quick sort or Merge sort
- **Stability needed** → Merge sort
- **Memory-constrained** → Heap sort (O(1) extra space)
- **Small integer range** → Counting sort (O(n))`,
  },
  {
    keywords: ["os", "operating system", "memory management", "paging", "segmentation", "virtual memory"],
    response: `## Operating System — Memory Management

### Memory Management Techniques

**Contiguous Allocation** — Each process occupies a single contiguous block
- **Fixed partitioning**: Memory divided into fixed-size partitions
- **Dynamic partitioning**: Partitions created dynamically as needed
- **Fragmentation**: External fragmentation is a major problem

**Paging** — Memory divided into fixed-size frames (physical) and pages (virtual)
- Eliminates external fragmentation
- Page table maps virtual → physical addresses
- TLB (Translation Lookaside Buffer) caches recent translations

**Segmentation** — Memory divided into logical segments (code, data, stack)
- Each segment has a base and limit
- Segments can grow dynamically
- Leads to external fragmentation

### Virtual Memory
Allows processes to use more memory than physically available.

**Page Replacement Algorithms:**
| Algorithm | Description | Problem? |
|-----------|-------------|----------|
| **FIFO** | First-in, first-out | Belady's anomaly |
| **LRU** | Least recently used | Hardware support needed |
| **Optimal** | Replace page used farthest in future | Impossible (needs future knowledge) |
| **Clock (Second Chance)** | Circular list with reference bits | Approximation of LRU |

### Thrashing
When the system spends more time swapping pages than executing.  
**Cause:** Too many processes competing for memory.  
**Solution:** Working set model, adjusting degree of multiprogramming.

### Key Formulas
\`\`\`
Physical Address = Frame Number × Frame Size + Offset
Page Number = Virtual Address / Page Size
Offset = Virtual Address % Page Size
\`\`\`
  
**Effective Access Time (EAT):**
\`\`\`
EAT = (1 - p) × memory_access_time + p × page_fault_time
where p = page fault rate
\`\`\``,
  },
  {
    keywords: ["linked list", "linkedlist", "list", "stack", "queue", "deque"],
    response: `## Linked Lists, Stacks & Queues — Quick Reference

### Singly Linked List

\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Traversal
def traverse(head):
    while head:
        print(head.val)
        head = head.next

# Reverse
def reverse(head):
    prev = None
    while head:
        nxt = head.next
        head.next = prev
        prev = head
        head = nxt
    return prev

# Detect cycle (Floyd's algorithm)
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
\`\`\`

### Stack (LIFO — Last In, First Out)

| Operation | Complexity |
|-----------|------------|
| push(val) | O(1) |
| pop() | O(1) |
| peek() | O(1) |

\`\`\`python
# Using Python list as a stack
stack = []
stack.append(1)  # push
stack.append(2)
top = stack[-1]  # peek
popped = stack.pop()  # pop
\`\`\`

### Queue (FIFO — First In, First Out)

| Operation | Complexity |
|-----------|------------|
| enqueue(val) | O(1) |
| dequeue() | O(1) |
| peek() | O(1) |

\`\`\`python
from collections import deque
queue = deque()
queue.append(1)   # enqueue
queue.append(2)
first = queue.popleft()  # dequeue
\`\`\`

### Common Problems
- **Valid Parentheses** — Stack (push opening, pop on closing)
- **LRU Cache** — Doubly linked list + hash map (O(1) get/put)
- **Min Stack** — Stack that returns minimum in O(1)
- **Queue using Stacks** — Two stacks, transfer on dequeue`,
  },
  {
    keywords: ["hello", "introduction", "who are you", "what can you do", "help"],
    response: `## Hello! I'm Suresh AI — Your Engineering Tutor 👋

I'm here to help you with:

🔹 **Computer Science** — Data Structures, Algorithms, Operating Systems, DBMS, Networks  
🔹 **Programming** — C, C++, Java, Python, JavaScript, and more  
🔹 **Interview Prep** — Technical questions, system design, coding problems  
🔹 **Engineering Topics** — Mathematics, Electronics, Mechanical, and core subjects  
🔹 **Project Guidance** — Ideas, architecture, implementation help  
🔹 **Code Debugging** — Spot and fix errors in your code

### How to Ask

Try asking me:
- *"Explain Big O notation with examples"*
- *"What's the difference between SQL and NoSQL?"*
- *"Show me how to reverse a linked list"*
- *"How does garbage collection work in Java?"*
- *"What are the OSI model layers?"*

I'm also integrated with the full Suresh.AI platform — you can explore **subjects, notes, MCQs, interview questions, roadmaps, and the code playground** from the navigation menu.

What would you like to learn today?`,
  },
  {
    keywords: ["api design", "system design", "architecture", "microservices", "load balancing", "scalability"],
    response: `## System Design — Core Concepts

### Scalability Patterns

**Vertical Scaling** — Add more power to a single machine (CPU, RAM, disk)  
**Horizontal Scaling** — Add more machines to distribute the load

### Load Balancing
Distributes incoming traffic across multiple servers.

| Algorithm | How It Works |
|-----------|-------------|
| Round Robin | Cycles through servers in order |
| Least Connections | Sends to server with fewest active connections |
| IP Hash | Routes based on client IP (sticky sessions) |
| Weighted | Servers with higher capacity get more traffic |

### Caching Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Cache Aside | App checks cache first, falls back to DB | General purpose |
| Write Through | Write to cache AND DB simultaneously | Data consistency critical |
| Write Behind | Write to cache, async write to DB | High write throughput |
| Read Through | Cache is primary, DB is fallback | Read-heavy workloads |

### Database Scaling
- **Read Replicas** — Multiple copies for read-heavy workloads
- **Sharding** — Partition data across multiple databases by key
- **Denormalization** — Reduce JOINs by duplicating data

### CAP Theorem
| Property | Meaning |
|----------|---------|
| **Consistency** | Every read gets the most recent write |
| **Availability** | Every request gets a non-error response |
| **Partition Tolerance** | System works despite network failures |

**Pick at most 2:** CP (traditional databases), AP (NoSQL), CA (not practical in distributed systems)

### Key Metrics
- **Latency** — Time for a single request to complete (ms)
- **Throughput** — Requests processed per second
- **Availability** — Uptime percentage (99.9% = ~8.7 hrs/year downtime)
- **P99 Latency** — The worst 1% of request times`,
  },
  {
    keywords: ["html", "css", "javascript", "frontend", "web", "react", "dom"],
    response: `## Web Development Fundamentals

### HTML — Structure
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

### CSS — Styling
\`\`\`css
/* Selectors */
h1 { color: blue; }
.container { max-width: 1200px; margin: auto; }
#main { background: #f0f0f0; }

/* Flexbox — one-dimensional layout */
.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
}

/* Grid — two-dimensional layout */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}
\`\`\`

### JavaScript — Behavior
\`\`\`javascript
// DOM Manipulation
document.getElementById('btn').addEventListener('click', () => {
    document.querySelector('.container').classList.toggle('active');
});

// Fetch API
async function getData() {
    const res = await fetch('/api/data');
    const data = await res.json();
    console.log(data);
}

// Array methods
const doubled = [1, 2, 3].map(x => x * 2);
const evens = [1, 2, 3, 4].filter(x => x % 2 === 0);
const sum = [1, 2, 3].reduce((a, b) => a + b, 0);
\`\`\`

### Box Model (Essential)
\`\`\`
┌──────────────────────────┐
│         Margin            │
│  ┌────────────────────┐   │
│  │     Border         │   │
│  │  ┌──────────────┐  │   │
│  │  │   Padding    │  │   │
│  │  │ ┌──────────┐ │  │   │
│  │  │ │ Content  │ │  │   │
│  │  │ └──────────┘ │  │   │
│  │  └──────────────┘  │   │
│  └────────────────────┘   │
└──────────────────────────┘
\`\`\`

### Key Concepts
- **Event Delegation** — Handle events on parent element
- **Closures** — Function remembers variables from its creation scope
- **Prototype Chain** — Every object has a prototype (inheritance)
- **Event Loop** — JavaScript is single-threaded; async via callback queue`,
  },
  {
    keywords: ["sql query", "join", "index", "query", "postgresql", "mysql", "database design"],
    response: `## SQL — Essential Queries & Concepts

### Basic Queries
\`\`\`sql
-- Select with conditions
SELECT name, email FROM users WHERE age > 18 ORDER BY name ASC;

-- Aggregation
SELECT department, COUNT(*) as employee_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;

-- LIMIT and pagination
SELECT * FROM products ORDER BY price DESC LIMIT 10 OFFSET 20;
\`\`\`

### JOINs Explained
\`\`\`sql
-- INNER JOIN: Only matching rows from both tables
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN: All rows from left table, NULLs for non-matching right
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN: All rows from both tables
SELECT u.name, o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;
\`\`\`

### Indexing for Performance
\`\`\`sql
-- B-Tree Index (default)
CREATE INDEX idx_users_email ON users(email);

-- Composite Index (column order matters!)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Unique Index
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Partial Index
CREATE INDEX idx_active_users ON users(email) WHERE active = true;
\`\`\`

### Subqueries vs CTEs
\`\`\`sql
-- Subquery
SELECT name FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 100);

-- CTE (Common Table Expression) — more readable
WITH high_value_orders AS (
    SELECT user_id, COUNT(*) as order_count
    FROM orders WHERE total > 100
    GROUP BY user_id
)
SELECT u.name, h.order_count
FROM users u
JOIN high_value_orders h ON u.id = h.user_id;
\`\`\`

### Normalization Forms
| Form | Rule | Example Violation |
|------|------|------------------|
| **1NF** | Each column has atomic values | Column with comma-separated tags |
| **2NF** | No partial dependencies | Order total in order-item table |
| **3NF** | No transitive dependencies | Author name in book table (depends on author_id → author_name) |`,
  },
  {
    keywords: ["machine learning", "ml", "regression", "classification", "neural network", "deep learning", "overfitting"],
    response: `## Machine Learning — Key Concepts

### Types of Learning

| Type | Description | Example |
|------|-------------|---------|
| **Supervised** | Labeled training data | Classification, Regression |
| **Unsupervised** | No labels, find patterns | Clustering, Dimensionality Reduction |
| **Reinforcement** | Agent learns from rewards | Game playing, Robotics |
| **Semi-supervised** | Small labeled + large unlabeled data | Real-world scenarios |

### Key Algorithms

**Regression** — Predict continuous values
\`\`\`python
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
\`\`\`

**Classification** — Predict categories
\`\`\`python
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
accuracy = model.score(X_test, y_test)
\`\`\`

### Bias-Variance Tradeoff
- **High Bias (Underfitting)** — Model too simple, misses patterns
- **High Variance (Overfitting)** — Model too complex, memorizes noise
- **Goal**: Find the sweet spot that generalizes well

### Preventing Overfitting
| Technique | Description |
|-----------|-------------|
| **Train/Test Split** | Hold out test data for evaluation |
| **Cross-Validation** | Multiple train/validation splits |
| **Regularization** | L1 (Lasso), L2 (Ridge) — penalize large weights |
| **Dropout** | Randomly drop neurons during training |
| **Early Stopping** | Stop training when validation loss increases |
| **Data Augmentation** | Create synthetic training examples |

### Evaluation Metrics

| Problem | Metric | Formula |
|---------|--------|---------|
| Classification | Accuracy | (TP + TN) / (Total) |
| Classification | Precision | TP / (TP + FP) |
| Classification | Recall | TP / (TP + FN) |
| Classification | F1 Score | 2 × (Prec × Recall) / (Prec + Recall) |
| Regression | MSE | Mean of (actual - predicted)² |
| Regression | R² | 1 - (SS_res / SS_tot) |

### Neural Network Basics
\`\`\`python
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
\`\`\``,
  },
  {
    keywords: ["python", "python programming", "list comprehension", "decorator", "generator"],
    response: `## Python — Essential Features

### List Comprehensions
\`\`\`python
# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(50) if x % 2 == 0]

# Nested
matrix = [[i * j for j in range(5)] for i in range(5)]

# Dictionary comprehension
square_map = {x: x**2 for x in range(10)}
\`\`\`

### Decorators
\`\`\`python
from functools import wraps
import time

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.3f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)

slow_function()  # "slow_function took 1.001s"
\`\`\`

### Generators
\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

### Context Managers
\`\`\`python
# With classes
class ManagedFile:
    def __init__(self, filename):
        self.filename = filename
    def __enter__(self):
        self.file = open(self.filename, 'w')
        return self.file
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()

# Using it
with ManagedFile('hello.txt') as f:
    f.write('Hello, world!')
\`\`\`

### Useful Built-ins
\`\`\`python
# zip — combine iterables
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# enumerate — get index while iterating
for i, item in enumerate(['a', 'b', 'c'], start=1):
    print(f"{i}: {item}")

# any / all — check conditions
nums = [1, 2, 3, 4, 5]
has_even = any(x % 2 == 0 for x in nums)  # True
all_positive = all(x > 0 for x in nums)    # True

# collections.Counter
from collections import Counter
counts = Counter("mississippi")
# Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})
\`\`\``,
  },
];

// ─── Off-topic detection ──────────────────────────────────────────────────────
const OFF_TOPIC_KEYWORDS = [
  "weather", "sports scores", "stock price", "political", "celebrity",
  "horoscope", "fortune telling", "lottery numbers",
];

function isOffTopic(content: string): boolean {
  const lower = content.toLowerCase();
  const wordCount = lower.split(/\s+/).length;
  // Short greetings are always allowed
  if (wordCount <= 4) return false;
  return OFF_TOPIC_KEYWORDS.some((kw) => lower.includes(kw));
}

// ─── Response matching ────────────────────────────────────────────────────────
function getLocalResponse(content: string): { response: string; followUps: string[] } {
  const lower = content.toLowerCase();

  // Check off-topic
  if (isOffTopic(content)) {
    return {
      response: `I'm designed to help with engineering and computer science topics. That question seems outside my area of expertise. Could I help you with something related to programming, algorithms, data structures, or engineering instead?`,
      followUps: ["Explain sorting algorithms", "What is Big O notation?", "Help with Python", "Show me data structures"],
    };
  }

  // Find best matching knowledge base entry
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    const score = entry.keywords.reduce((count, kw) => {
      return count + (lower.includes(kw) ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry.response;
    }
  }

  if (bestMatch && bestScore > 0) {
    return {
      response: bestMatch,
      followUps: [
        "Can you explain that in simpler terms?",
        "Show me a code example",
        "What are the common mistakes?",
        "How does this apply to real projects?",
      ],
    };
  }

  // Generic fallback for unknown questions
  return {
    response: `That's an interesting question! I'm still expanding my local knowledge base. Here's what I can help with right now:

🔹 **Explain concepts**: Big O notation, SQL vs NoSQL, OOP, REST APIs, TCP/IP, garbage collection, sorting algorithms
🔹 **Data structures**: Arrays, linked lists, stacks, queues, hash tables, trees, graphs
🔹 **Algorithms**: Sorting, searching, dynamic programming, graph algorithms
🔹 **System design**: Architecture patterns, caching, load balancing, CAP theorem
🔹 **Programming**: Python, Java, JavaScript, SQL, HTML/CSS

Or try asking me one of these:
- "Explain Big O notation"
- "How do hash tables work?"
- "What is the difference between TCP and UDP?"
- "Show me how to reverse a linked list"

If you need help with something specific that isn't covered here, try the **AI Chat** feature after setting up an OpenAI API key, or visit the **Subjects** and **Notes** sections for detailed study materials.`,
    followUps: [
      "Explain Big O notation",
      "What is REST API?",
      "How do hash tables work?",
      "Show me Python examples",
    ],
  };
}

// ─── Handler ────────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, model: _requestedModel } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and must not be empty" },
        { status: 400 }
      );
    }

    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: "Each message must have a 'role' and 'content'" },
          { status: 400 }
        );
      }
    }

    // Get the last user message for response matching
    const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
    const userContent = lastUserMsg?.content || "";

    const { response, followUps } = getLocalResponse(userContent);

    return NextResponse.json({
      role: "assistant",
      content: response,
      model: "suresh-local",
      followUps,
    });
  } catch (error) {
    console.error("[Suresh AI] Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
