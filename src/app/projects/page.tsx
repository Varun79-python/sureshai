"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { FlaskConical, Globe, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const projects = [
  { title: "AI-Powered Study Assistant", slug: "ai-study-assistant", tech: ["Python", "LLM", "RAG"], difficulty: "Advanced", description: "Build an AI tutor that answers engineering questions using retrieval-augmented generation." },
  { title: "Real-Time Operating System", slug: "rtos-project", tech: ["C", "ARM", "FreeRTOS"], difficulty: "Advanced", description: "Implement a bare-metal RTOS for ARM Cortex-M microcontrollers with task scheduling and IPC." },
  { title: "Chat Application using TCP/IP", slug: "chat-app", tech: ["Python", "Socket", "Threading"], difficulty: "Intermediate", description: "Build a multi-client chat application using TCP sockets with encryption support." },
  { title: "Library Management System", slug: "library-management", tech: ["Java", "Spring Boot", "PostgreSQL"], difficulty: "Intermediate", description: "A full-stack library management system with user authentication and book tracking." },
  { title: "Image Classifier with CNN", slug: "image-classifier", tech: ["Python", "TensorFlow", "CNN"], difficulty: "Intermediate", description: "Build a convolutional neural network to classify images from the CIFAR-10 dataset." },
  { title: "Compiler for Mini Language", slug: "mini-compiler", tech: ["C++", "Lex", "Yacc"], difficulty: "Advanced", description: "Implement a compiler for a simple programming language with lexical analysis and code generation." },
  { title: "Network Traffic Analyzer", slug: "network-analyzer", tech: ["Python", "Scapy", "Wireshark"], difficulty: "Intermediate", description: "Capture and analyze network packets to detect anomalies and security threats." },
  { title: "Smart Home IoT System", slug: "smart-home-iot", tech: ["ESP32", "MQTT", "AWS IoT"], difficulty: "Intermediate", description: "Build an IoT system with sensors, cloud connectivity, and a mobile dashboard." },
  { title: "Data Visualization Dashboard", slug: "data-viz-dashboard", tech: ["React", "D3.js", "Python"], difficulty: "Beginner", description: "Create interactive visualizations for engineering datasets using D3.js and React." },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <Badge variant="premium" size="lg" className="mb-4">
            <FlaskConical className="h-3.5 w-3.5 mr-1" />
            Projects
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Build Real-World <span className="text-gradient">Engineering Projects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Hands-on projects with step-by-step guides to build your portfolio and strengthen your skills.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.04}>
              <Card className="group h-full cursor-pointer hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant={
                      project.difficulty === "Beginner" ? "success" : project.difficulty === "Intermediate" ? "warning" : "destructive"
                    } size="sm">{project.difficulty}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="outline" size="sm">{t}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 text-primary"><Globe className="h-4 w-4" /> Source Code</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><ExternalLink className="h-4 w-4" /> Live Demo</span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
