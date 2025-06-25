"use client"
import React, { useState } from 'react';
import { LogOut, Loader2 } from 'lucide-react';
import { signOutAction } from '@/app/actions/auth.actions';
import { AuthResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { toast } from 'sonner';
import Link from 'next/link';

interface LogoutState {
  isLoading: boolean;
  error: string | null;
}

const Navbar = () => {
  const [logoutState, setLogoutState] = useState<LogoutState>({
    isLoading: false,
    error: null
  });
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      setLogoutState({ isLoading: true, error: null });
      
      // Call the logout function
      const res: AuthResponse = await signOutAction();
      
      // If we get here, logout was successful
      setLogoutState({ isLoading: false, error: null });
      
      if (res.success) {
        toast.success("Logged out successfully");
        router.push("/");
      } else {
        throw new Error(res.message || "Logout failed");
      }
      
    } catch (error) {
      // Handle logout error
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to logout. Please try again.';
      
      setLogoutState({ 
        isLoading: false, 
        error: errorMessage 
      });
      
      // Show error toast
      toast.error(errorMessage);
      
      // Auto-clear error after 3 seconds
      setTimeout(() => {
        setLogoutState(prev => ({ ...prev, error: null }));
      }, 3000);
    }
  };

  // Mock user data - replace with actual user context/props


  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-400 bg-blue-600 backdrop-blur supports-[backdrop-filter]:bg-blue-50">
      <div className="container flex h-16 max-w-full px-10 items-center">
        {/* Portal Brand */}
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/tickets">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portal
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add search or other navigation items here */}
          </div>
          
          <nav className="flex items-center space-x-2">
          

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage  />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      p
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-56" align="end" forceMount>
               
             
                
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50" 
                  onClick={handleLogout}
                  disabled={logoutState.isLoading}
                >
                  {logoutState.isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;