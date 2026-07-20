import { Company, InterviewQuestion } from "@/types";

export const companies: Company[] = [
  { id: "google", name: "Google", slug: "google", logo: "G", description: "Software engineering, algorithms, system design, AI/ML", industries: ["Tech", "AI", "Cloud"], questionCount: 250 },
  { id: "microsoft", name: "Microsoft", slug: "microsoft", logo: "M", description: "Software development, OS, cloud, AI", industries: ["Tech", "Cloud", "AI"], questionCount: 200 },
  { id: "amazon", name: "Amazon", slug: "amazon", logo: "A", description: "SDE, system design, leadership principles", industries: ["Tech", "E-commerce", "Cloud"], questionCount: 220 },
  { id: "nvidia", name: "NVIDIA", slug: "nvidia", logo: "N", description: "GPU computing, CUDA, deep learning, embedded systems", industries: ["Tech", "AI", "Hardware"], questionCount: 150 },
  { id: "intel", name: "Intel", slug: "intel", logo: "I", description: "VLSI, computer architecture, embedded systems, firmware", industries: ["Hardware", "Semiconductor"], questionCount: 130 },
  { id: "qualcomm", name: "Qualcomm", slug: "qualcomm", logo: "Q", description: "Wireless, embedded systems, DSP, VLSI", industries: ["Hardware", "Telecom", "Semiconductor"], questionCount: 120 },
  { id: "texas", name: "Texas Instruments", slug: "texas-instruments", logo: "T", description: "Analog, embedded, VLSI, power electronics", industries: ["Hardware", "Semiconductor"], questionCount: 100 },
  { id: "samsung", name: "Samsung", slug: "samsung", logo: "S", description: "Embedded systems, VLSI, display, memory", industries: ["Tech", "Hardware", "Semiconductor"], questionCount: 140 },
  { id: "apple", name: "Apple", slug: "apple", logo: "A", description: "Software engineering, system design, hardware integration", industries: ["Tech", "Hardware", "AI"], questionCount: 180 },
  { id: "meta", name: "Meta", slug: "meta", logo: "M", description: "Full stack, algorithms, system design, AI", industries: ["Tech", "Social Media", "AI"], questionCount: 190 },
  { id: "infosys", name: "Infosys", slug: "infosys", logo: "I", description: "Full stack, Java, databases, cloud", industries: ["IT Services"], questionCount: 80 },
  { id: "tcs", name: "TCS", slug: "tcs", logo: "T", description: "Java, Python, databases, cloud, testing", industries: ["IT Services"], questionCount: 85 },
  { id: "accenture", name: "Accenture", slug: "accenture", logo: "A", description: "Technology consulting, full stack, cloud, AI", industries: ["IT Services", "Consulting"], questionCount: 75 },
  { id: "wipro", name: "Wipro", slug: "wipro", logo: "W", description: "Java, .NET, cloud, testing, automation", industries: ["IT Services"], questionCount: 70 },
  { id: "ibm", name: "IBM", slug: "ibm", logo: "I", description: "Cloud, AI, blockchain, mainframe, quantum", industries: ["Tech", "Cloud", "AI"], questionCount: 110 },
  { id: "oracle", name: "Oracle", slug: "oracle", logo: "O", description: "Databases, Java, cloud, ERP, middleware", industries: ["Tech", "Database", "Cloud"], questionCount: 100 },
  { id: "cisco", name: "Cisco", slug: "cisco", logo: "C", description: "Networking, security, IoT, cloud", industries: ["Tech", "Networking", "Security"], questionCount: 95 },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "g-1",
    question: "Design a URL shortening service like TinyURL.",
    answer: "Requirements: generate short unique URLs, handle millions of URLs, redirect quickly. Use Base62 encoding for short keys. Store mapping in a distributed database (Cassandra/DynamoDB). Use consistent hashing for scaling. Cache frequently accessed URLs in Redis. Rate limit API requests. Estimate: 100M URLs/month, ~38 URLs/sec writes, ~3800 reads/sec.",
    company: "Google",
    role: "SDE",
    topic: "System Design",
    difficulty: "hard",
    tags: ["system design", "scalability", "URL shortening"],
  },
  {
    id: "g-2",
    question: "Find the median of two sorted arrays in O(log(m+n)).",
    answer: "Use binary search on the smaller array. Partition both arrays such that left elements ≤ right elements. Ensure cross-condition: maxLeftA ≤ minRightB and maxLeftB ≤ minRightA. If total elements even, median = (max(left) + min(right))/2. If odd, median = max(left).",
    company: "Google",
    role: "SDE",
    topic: "Algorithms",
    difficulty: "hard",
    tags: ["binary search", "arrays", "median"],
  },
  {
    id: "g-3",
    question: "Explain MapReduce programming model.",
    answer: "MapReduce is a programming model for processing large datasets in parallel. Map phase: processes input key-value pairs and produces intermediate pairs. Shuffle phase: sorts and groups by key. Reduce phase: aggregates values per key. Example: word count — Map emits (word, 1), Reduce sums counts. Hadoop and Spark implement this model.",
    company: "Google",
    role: "SDE",
    topic: "Distributed Systems",
    difficulty: "medium",
    tags: ["MapReduce", "distributed", "big data"],
  },
  {
    id: "m-1",
    question: "Reverse a linked list in groups of K.",
    answer: "Traverse the list in chunks of K nodes. For each chunk, reverse the K nodes using iterative reversal. Connect the reversed chunk to the previous and next parts. If remaining nodes < K, leave them as-is. Time: O(n), Space: O(1) or O(n/k) for recursion.",
    company: "Microsoft",
    role: "SDE",
    topic: "Linked Lists",
    difficulty: "medium",
    tags: ["linked list", "reversal", "group"],
  },
  {
    id: "m-2",
    question: "Design a key-value store with consistency and availability.",
    answer: "Use Dynamo-style architecture: consistent hashing for partitioning, vector clocks for versioning, quorum-based replication (R+W > N for consistency). Gossip protocol for membership. Hinted handoff for availability during failures. Merkle trees for anti-entropy. Eventual consistency with tunable consistency levels.",
    company: "Microsoft",
    role: "SDE",
    topic: "System Design",
    difficulty: "hard",
    tags: ["distributed", "key-value", "consistency", "availability"],
  },
  {
    id: "a-1",
    question: "Design Amazon's product recommendation system.",
    answer: "Use collaborative filtering (user-based: find similar users; item-based: find similar items) and content-based filtering (recommend items with similar attributes). Matrix factorization (SVD, ALS) for latent factors. Handle cold start with popularity-based recommendations. Use real-time co-viewing signals. A/B test for evaluation.",
    company: "Amazon",
    role: "SDE",
    topic: "System Design",
    difficulty: "hard",
    tags: ["recommendation", "ML", "system design"],
  },
  {
    id: "n-1",
    question: "Explain CUDA architecture and memory hierarchy.",
    answer: "CUDA GPU architecture: threads grouped into warps (32 threads), warps into blocks, blocks into grids. Memory hierarchy: global memory (large, high latency), shared memory (fast, per-block), registers (fastest, per-thread), constant/texture memory. Thread synchronization via __syncthreads(). Optimize for coalesced memory access and occupancy.",
    company: "NVIDIA",
    role: "AI/ML Engineer",
    topic: "GPU Computing",
    difficulty: "hard",
    tags: ["CUDA", "GPU", "memory", "parallel"],
  },
  {
    id: "q-1",
    question: "Explain I2C protocol and its advantages over SPI.",
    answer: "I2C uses 2 wires (SDA, SCL) with addressing, supporting multiple masters and slaves. Uses open-drain lines with pull-up resistors. Acknowledge (ACK) bit ensures reliable communication. SPI uses 4 wires (MOSI, MISO, SCLK, SS), faster but needs more pins. I2C is better for connecting multiple devices with fewer pins.",
    company: "Qualcomm",
    role: "Embedded Engineer",
    topic: "Communication Protocols",
    difficulty: "medium",
    tags: ["I2C", "SPI", "embedded", "protocol"],
  },
  {
    id: "t-1",
    question: "Explain pipelining in a processor and hazards.",
    answer: "Pipelining divides instruction execution into stages (Fetch, Decode, Execute, Memory, Writeback) for parallelism. Hazards: Structural (resource conflict), Data (RAW, WAR, WAW), Control (branch prediction). Solutions: forwarding/bypassing, branch prediction, pipeline stalls, out-of-order execution.",
    company: "Texas Instruments",
    role: "Embedded Engineer",
    topic: "Computer Architecture",
    difficulty: "medium",
    tags: ["pipeline", "hazards", "architecture"],
  },
  {
    id: "cisco-1",
    question: "Explain how OSPF routing protocol works.",
    answer: "OSPF is a link-state routing protocol using Dijkstra's algorithm. Routers discover neighbors via Hello packets. LSAs (Link State Advertisements) flood network topology information. Each router builds a complete LSDB (Link State Database) and computes shortest paths. OSPF supports areas for scalability and VLSM/CIDR.",
    company: "Cisco",
    role: "Network Engineer",
    topic: "Routing Protocols",
    difficulty: "hard",
    tags: ["OSPF", "routing", "networking"],
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getQuestionsByCompany(companySlug: string): InterviewQuestion[] {
  return interviewQuestions.filter(
    (q) => q.company.toLowerCase().replace(/\s+/g, "-") === companySlug
  );
}
