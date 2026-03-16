"use client";

import Link from 'next/link';
import React, { useState, useActionState, useEffect } from 'react';
import { updateAdminProfile, State } from '@/app/actions/update-admin-profile';
import { UserCircle, Lock, Key } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent } from '@/app/components/ui/card';
import { toast } from 'sonner';

type Props = {
  initialData: {
    name: string;
    email: string;
  };
};

const AdminProfileSetting = ({ initialData }: Props) => {
  const initialState: State = { message: '', errors: {}, success: false };
  const [state, dispatch, isPending] = useActionState(updateAdminProfile, initialState);

  const [adminName, setAdminName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);

  const isDirty = adminName !== initialData.name || email !== initialData.email;

  useEffect(() => {
    setAdminName(initialData.name);
    setEmail(initialData.email);
  }, [initialData]);

  useEffect(() => {
    if (state.message) {
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [state]);

  const getInitials = (name: string) =>
    name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'A';

  const handleDiscard = () => {
    setAdminName(initialData.name);
    setEmail(initialData.email);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 pb-32">
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-3">Profile Settings</h1>
            <p className="text-muted-foreground text-lg">
              Manage your account identity and contact information.
            </p>
          </div>
        </div>

        <form id="profile-form" action={dispatch}>
          {/* Section 1: Public Identity */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <UserCircle className="size-5" />
              <h3 className="text-sm font-black uppercase tracking-widest">Public Identity</h3>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-8 flex items-center gap-8">
                  <div className="size-20 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-bold shrink-0">
                    {getInitials(adminName)}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Profile Picture</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Visual identity for internal mentor directories.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label className="mb-2">Display Name</Label>
                  <Input
                    name="name"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className={state.errors?.name ? 'border-red-500' : ''}
                  />
                  {state.errors?.name && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
                  )}
                </div>
                <div>
                  <Label className="mb-2">Email</Label>
                  <Input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={state.errors?.email ? 'border-red-500' : ''}
                  />
                  {state.errors?.email && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </form>

        {/* Section 2: Security */}
        <section>
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Lock className="size-5" />
            <h3 className="text-sm font-black uppercase tracking-widest">Security</h3>
          </div>

          <Card>
            <CardContent className="p-8 flex items-center justify-between">
              <div>
                <h4 className="font-bold mb-1">Account Password</h4>
                <p className="text-muted-foreground text-sm">
                  Update your password to keep your account secure.
                </p>
              </div>
              <Link href="change-password">
                <Button className="gap-2">
                  <Key className="size-4" />
                  Change Password
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Floating Footer */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#111318] rounded-2xl p-4 flex justify-between shadow-2xl transition-all duration-500 z-50 ${isDirty ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <p className="text-white text-sm font-bold flex items-center px-2">You have unsaved changes</p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleDiscard} className="text-muted-foreground hover:text-white">
            Discard
          </Button>
          <Button type="submit" form="profile-form" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSetting;
