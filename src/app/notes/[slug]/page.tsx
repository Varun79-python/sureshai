"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, Download, Share2, Printer, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const notesData: Record<string, { title: string; subject: string; content: string; author: string; readTime: string }> = {
  "complete-guide-data-structures": {
    title: "Complete Guide to Data Structures",
    subject: "Data Structures",
    author: "Dr. Suresh Kumar",
    readTime: "25 min",
    content: `
## Introduction to Data Structures

Data structures are a way of organizing and storing data so that it can be accessed and modified efficiently. They are fundamental to computer science and programming.

### Why Data Structures Matter

- **Efficiency**: Choose the right structure for optimal time/space complexity
- **Organization**: Keep data organized for easy access
- **Reusability**: Standard structures are well-tested and reliable

## Arrays

An array is a collection of elements stored at contiguous memory locations.

**Properties:**
- Fixed size (in most languages)
- O(1) random access
- O(n) insertion/deletion
- Cache-friendly

**Common Operations:**
- Traversal: O(n)
- Access by index: O(1)
- Search (unsorted): O(n)
- Search (sorted, binary): O(log n)
- Insert at end: O(1) amortized
- Insert at beginning: O(n)
- Delete: O(n)

## Linked Lists

A linked list consists of nodes where each node contains data and a reference to the next node.

**Types:**
1. Singly Linked List
2. Doubly Linked List
3. Circular Linked List

**Properties:**
- Dynamic size
- O(1) insertion/deletion at known position
- O(n) access time
- Extra memory for pointers

## Stacks

A stack follows LIFO (Last In, First Out) principle.

**Operations:**
- push(): Add element to top
- pop(): Remove element from top
- peek(): View top element
- isEmpty(): Check if empty

**Applications:** Function calls, undo operations, expression evaluation

## Queues

A queue follows FIFO (First In, First Out) principle.

**Types:** Simple Queue, Circular Queue, Priority Queue, Deque

**Applications:** BFS, task scheduling, print spooling

## Trees

A tree is a hierarchical data structure with a root node and child nodes.

**Binary Tree:** Each node has at most 2 children
**Binary Search Tree (BST):** Left < Root < Right
**AVL Tree:** Self-balancing BST
**Heap:** Complete binary tree for priority queue

**Traversals:**
- Inorder: Left → Root → Right (sorted for BST)
- Preorder: Root → Left → Right
- Postorder: Left → Right → Root
- Level Order: BFS

## Graphs

A graph consists of vertices (nodes) and edges connecting them.

**Representations:** Adjacency Matrix, Adjacency List
**Traversals:** DFS (stack/recursion), BFS (queue)

**Applications:** Social networks, maps, recommendation systems
    `,
  },
};

export default function NoteDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const note = notesData[slug];

  if (!note) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/notes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Notes
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="premium" size="sm">{note.subject}</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{note.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {note.author}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {note.readTime}</span>
          </div>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" size="sm" className="gap-2"><Bookmark className="h-4 w-4" /> Save</Button>
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> PDF</Button>
            <Button variant="outline" size="sm" className="gap-2"><Printer className="h-4 w-4" /> Print</Button>
            <Button variant="outline" size="sm" className="gap-2"><Share2 className="h-4 w-4" /> Share</Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
          <div className="prose prose-zinc dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground
            prose-strong:text-foreground
            prose-code:text-sm prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
            prose-pre:bg-secondary prose-pre:rounded-xl prose-pre:border prose-pre:border-border
            prose-li:text-muted-foreground
            prose-hr:border-border
          ">
            <div className="whitespace-pre-wrap leading-relaxed">{note.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
