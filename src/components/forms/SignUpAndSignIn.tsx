"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Eye, EyeOff, Loader2, Mail, Lock, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AuthFormData, AuthResponse } from '@/types';
import { authSchema } from '@/schema/authSchema';
import Link from 'next/link';
import { signInAction, signUpAction } from '@/app/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface SignUpAndSignInProps {
  mode: 'signin' | 'signup';
}

const SignUpAndSignIn: React.FC<SignUpAndSignInProps> = ({ mode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const router = useRouter();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    // mode: 'onChange',
  });

  const handleFormSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      setApiError('');

      
      if (mode === "signup") {
        const response: AuthResponse = await signUpAction(data);
    
        if (response.success) {
          toast.success("Account created successfully! Welcome aboard! 🎉");
          setApiError('');
          form.reset();
          router.push("/connect");
        } else {
         
          setApiError(response.message || 'An unexpected error occurred. Please try again.');
        }
      } else {
        const response: AuthResponse = await signInAction(data);
        if (response.success) {
          toast.success("Welcome back! Login successful! ✨");
          setApiError('');
          form.reset();
          router.push("/tickets");
        } else {
          setApiError(response.message || 'An unexpected error occurred. Please try again.');
        }
      }
    } catch (error) {
      setApiError(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };



  const isSignIn = mode === 'signin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
     

      <div className="w-full max-w-md space-y-2 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            {isSignIn ? (
              <Shield className="w-8 h-8 text-white" />
            ) : (
              <Sparkles className="w-8 h-8 text-white" />
            )}
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {isSignIn ? 'Welcome Back' : 'Join Us Today'}
          </h1>
          <p className="text-gray-600 text-lg">
            {isSignIn 
              ? 'Sign in to continue your journey' 
              : 'Create your account and get started'
            }
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg space-y-0">
          <CardHeader className="space-y-2 pb-0">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {isSignIn ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-base">
              {isSignIn 
                ? 'Enter your credentials to access your account'
                : 'Fill in your details to create a new account'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* API Error Alert */}
            {apiError && (
              <Alert variant="destructive" className="bg-red-50/80 border-red-200 backdrop-blur-sm">
                <AlertDescription className="text-red-800 font-medium">
                  {apiError}
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)}  className="space-y-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-indigo-500" />
                        Email Address
                      </FormLabel>
                      <div className="relative group">
                        <FormControl>
                          <Input
                            type="email"
                            
                            placeholder="Enter your email address"
                            className={`h-12 text-base bg-white/50 backdrop-blur-sm border-2 transition-all duration-200 focus:scale-[1.02] ${
                              form.formState.errors.email 
                                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 shadow-red-100' 
                                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-indigo-300 shadow-indigo-100/20'
                            }`}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-sm text-red-600 font-medium flex items-center gap-1">
                        {form.formState.errors.email && (
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-indigo-500" />
                        Password
                      </FormLabel>
                      <div className="relative group">
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className={`pr-12 h-12 text-base bg-white/50 backdrop-blur-sm border-2 transition-all duration-200 focus:scale-[1.02] ${
                              form.formState.errors.password 
                                ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 shadow-red-100' 
                                : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 hover:border-indigo-300 shadow-indigo-100/20'
                            }`}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-colors p-1 rounded-full hover:bg-indigo-50"
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <FormMessage className="text-sm text-red-600 font-medium flex items-center gap-1">
                        {form.formState.errors.password && (
                          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        )}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:ring-indigo-500/50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      {isSignIn ? 'Signing In...' : 'Creating Account...'}
                    </>
                  ) : (
                    <>
                      {isSignIn ? (
                        <>
                          <Shield className="mr-2 h-5 w-5" />
                          Sign In
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Create Account
                        </>
                      )}
                    </>
                  )}
                </Button>

              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 pt-1">
            {/* Mode Toggle */}
            <div className="text-center">
              <p className="text-gray-600">
                {isSignIn ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <Link
                href={isSignIn ? "/" : "/signin"}
                className="inline-flex items-center mt-2 font-semibold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 hover:scale-105"
              >
                {isSignIn ? (
                  <>
                    <Sparkles className="mr-1 h-4 w-4 text-indigo-500" />
                    Create your account
                  </>
                ) : (
                  <>
                    <Shield className="mr-1 h-4 w-4 text-indigo-500" />
                    Sign in instead
                  </>
                )}
              </Link>
            </div>

          
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpAndSignIn;