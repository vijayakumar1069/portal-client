"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import {  FreshdeskFormData, HubSpotFormData } from '@/types';
import { freshdeskSchema, hubspotSchema } from '@/schema/connectionFormSchema';
import useAccessToken from '@/hooks/useAccessToken';
import useFetch from '@/hooks/useFetch';
import Link from 'next/link';

interface ConnectionStatus {
  freshdesk: boolean;
  hubspot: boolean;
}

interface ConnectionError {
  type: 'freshdesk' | 'hubspot' | null;
  message: string;
}

export default function Connect() {
  const [activeForm, setActiveForm] = useState<'freshdesk' | 'hubspot' | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    freshdesk: false,
    hubspot: false
  });
  
  const [error, setError] = useState<ConnectionError>({ type: null, message: '' });
  const [success, setSuccess] = useState<string>('');

  // Freshdesk form
  const freshdeskForm = useForm<FreshdeskFormData>({
    resolver: zodResolver(freshdeskSchema),
    defaultValues: {
      freshdeskDomain: '',
      freshdeskApiKey: ''
    }
  });

  // HubSpot form
  const hubspotForm = useForm<HubSpotFormData>({
    resolver: zodResolver(hubspotSchema),
    defaultValues: {
    hubspotAccessToken: ''
    }
  });
  const { token } = useAccessToken();
  console.log(token);
  const {loading:isLoading,fetchData} = useFetch();

  const onFreshdeskSubmit = async (data: FreshdeskFormData) => {

  setError({ type: null, message: '' });
  setSuccess('');

  try {
    const response = await fetchData('/api/integration/freshdesk-save', 'POST', data, token ?? undefined);

    if (response.success) {
    

      setConnectionStatus(prev => ({ ...prev, freshdesk: true }));
      setSuccess('Freshdesk account connected successfully!');
      setActiveForm(null);
      freshdeskForm.reset();
    } else {
      throw new Error(response.message || "Freshdesk connection failed");
    }
  } catch (err: unknown) {
    setError({
      type: 'freshdesk',
      message: (err instanceof Error && err.message) ? err.message : 'Failed to connect to Freshdesk.'
    });
  } 
  
};

const onHubSpotSubmit = async (data: HubSpotFormData) => {
 
  setError({ type: null, message: '' });
  setSuccess('');

  try {
    const response = await fetchData('/api/integration/hubSpot-save', 'POST', data, token ?? undefined);

    if (response.success) {
   

      setConnectionStatus(prev => ({ ...prev, hubspot: true }));
      setSuccess('HubSpot account connected successfully!');
      setActiveForm(null);
      hubspotForm.reset();
    } else {
      throw new Error(response.message || "HubSpot connection failed");
    }
  } catch (err: unknown) {
    setError({
      type: 'hubspot',
      message: (err instanceof Error && err.message) ? err.message : 'Failed to connect to HubSpot.'
    });
  } 
};



  // Check if both connections are established
  const canProceedToTickets = connectionStatus.freshdesk && connectionStatus.hubspot;



  return (
    <div className="container mx-auto max-w-4xl p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Connect Your Accounts</h1>
        <p className="text-muted-foreground">
          Connect both Freshdesk and HubSpot to start managing your tickets
        </p>
      </div>

      {/* Success Alert */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error.message && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Freshdesk Connection Card */}
        <Card className={`transition-all ${connectionStatus.freshdesk ? 'border-green-200 bg-green-50' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Connect Freshdesk Account
              {connectionStatus.freshdesk && <CheckCircle className="h-5 w-5 text-green-600" />}
            </CardTitle>
            <CardDescription>
              Connect your Freshdesk account to manage support tickets
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!connectionStatus.freshdesk ? (
              <>
                {activeForm !== 'freshdesk' ? (
                  <Button 
                    onClick={() => setActiveForm('freshdesk')} 
                    className="w-full"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Connect Freshdesk
                  </Button>
                ) : (
                  <Form {...freshdeskForm}>
                    <div className="space-y-4">
                      <FormField
                        control={freshdeskForm.control}
                        name="freshdeskDomain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Freshdesk Domain</FormLabel>
                            <FormControl>
                              <Input placeholder="company.freshdesk.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={freshdeskForm.control}
                        name="freshdeskApiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your Freshdesk API key" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          onClick={() => freshdeskForm.handleSubmit(onFreshdeskSubmit)()}
                          disabled={isLoading}
                          className="flex-1"
                        >
                          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                          Test & Connect
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setActiveForm(null);
                            freshdeskForm.reset();
                          }}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-medium">Freshdesk Connected</p>
                <p className="text-sm text-muted-foreground">Account successfully connected</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* HubSpot Connection Card */}
        <Card className={`transition-all ${connectionStatus.hubspot ? 'border-green-200 bg-green-50' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Connect HubSpot Account
              {connectionStatus.hubspot && <CheckCircle className="h-5 w-5 text-green-600" />}
            </CardTitle>
            <CardDescription>
              Connect your HubSpot account to sync customer data
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!connectionStatus.hubspot ? (
              <>
                {activeForm !== 'hubspot' ? (
                  <Button 
                    onClick={() => setActiveForm('hubspot')} 
                    className="w-full"
                    variant="outline"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Connect HubSpot
                  </Button>
                ) : (
                  <Form {...hubspotForm}>
                    <div className="space-y-4">
                      <FormField
                        control={hubspotForm.control}
                        name="hubspotAccessToken"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Private App Token</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="pat-xxxxxxxxxx" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          onClick={() => hubspotForm.handleSubmit(onHubSpotSubmit)()}
                          disabled={isLoading}
                          className="flex-1"
                        >
                          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                          Test & Connect
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setActiveForm(null);
                            hubspotForm.reset();
                          }}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-medium">HubSpot Connected</p>
                <p className="text-sm text-muted-foreground">Account successfully connected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Proceed to Tickets Button */}
      {canProceedToTickets && (
        <div className="text-center pt-6">
          <Alert className="border-green-200 bg-green-50 mb-4">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Both accounts are connected! You can now proceed to manage tickets.
            </AlertDescription>
          </Alert>
          <Button 
            asChild
            size="lg"
            className="px-8"
          >
            <Link href="/tickets">
            
            Proceed to Tickets
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}