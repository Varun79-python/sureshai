"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogIn, Sparkles, Globe, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-gradient">Suresh</span>.AI
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isSignUp
              ? "Start your engineering learning journey"
              : "Sign in to continue your learning"}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button variant="outline" className="w-full gap-2 h-12">
                <Globe className="h-5 w-5" />
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full gap-2 h-12">
                <Mail className="h-5 w-5" />
                Continue with Google
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  or continue with email
                </span>
              </div>

              <div className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <Input placeholder="John Doe" className="h-12" />
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <Input type="email" placeholder="you@example.com" className="h-12" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button className="w-full h-12 gap-2" variant="premium">
                  <LogIn className="h-5 w-5" />
                  {isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setIsSignUp(false)} className="text-primary hover:underline font-medium">
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <button onClick={() => setIsSignUp(true)} className="text-primary hover:underline font-medium">
                    Sign up
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-[10px] text-muted-foreground text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
