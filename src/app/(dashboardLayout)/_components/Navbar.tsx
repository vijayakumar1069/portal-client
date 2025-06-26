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
  DropdownMenuSeparator,
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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container flex h-16 max-w-full px-6 items-center">
        {/* Portal Brand */}
        <div className="mr-8 flex">
          <Link 
            className="mr-6 flex items-center space-x-3 group transition-all duration-200 hover:scale-105" 
            href="/tickets"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="hidden font-bold text-2xl sm:inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Portal
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
         
          
          <nav className="flex items-center space-x-3">
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-11 w-11 rounded-full hover:bg-slate-100 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-white shadow-md">
                    <AvatarImage />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white font-semibold text-sm">
                      P
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className="w-64 p-2 bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-xl rounded-xl" 
                align="end" 
                forceMount
              >
                

                {/* Navigation Items */}
                <DropdownMenuItem asChild>
                  <Link 
                    href="/tickets" 
                    className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150 cursor-pointer"
                  >
                    <div className="h-5 w-5 mr-3 bg-blue-100 rounded-md flex items-center justify-center">
                      🎫
                    </div>
                    Tickets
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link 
                    href="/logs" 
                    className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-150 cursor-pointer"
                  >
                    <div className="h-5 w-5 mr-3 bg-purple-100 rounded-md flex items-center justify-center">
                      📋
                    </div>
                    Logs
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2 bg-slate-100" />

                {/* Logout Item */}
                <DropdownMenuItem 
                  className="px-3 py-2.5 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50 rounded-lg transition-colors duration-150" 
                  onClick={handleLogout}
                  disabled={logoutState.isLoading}
                >
                  <div className="flex items-center w-full">
                    {logoutState.isLoading ? (
                      <>
                        <div className="h-5 w-5 mr-3 flex items-center justify-center">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                        <span className="text-sm font-medium">Logging out...</span>
                      </>
                    ) : (
                      <>
                        <div className="h-5 w-5 mr-3 bg-red-100 rounded-md flex items-center justify-center">
                          <LogOut className="h-3 w-3" />
                        </div>
                        <span className="text-sm font-medium">Log out</span>
                      </>
                    )}
                  </div>
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