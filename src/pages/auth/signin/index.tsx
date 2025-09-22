import UserAuthForm from './components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import {  Backend_URL, Home_URL } from '@/lib/constants/Constants';
import { useAuthHook } from '@/providers/authContext';
import { cn } from '@/lib/utils';
import { useRouter } from '@/routes/hooks';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VerifyForm from './components/verify-form';
import { loginSchema, loginVerifySchema } from '@/lib/validation/zodSchema';
import { Role } from '@/rbac/aceess-rules';

export default function SignInPage() {
  const auth = useAuthHook();
  const location = useLocation();
  const router = useRouter();
  const [loggedIn, setLoggedIn]=useState<boolean>(false);
  
  useEffect(()=>{
    
    if(auth.user)
      router.replace(location.state?.from || Home_URL)
  },[])

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r  lg:flex">
        <div className="absolute inset-0 bg-primary dark:bg-secondary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          ACS 
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              ACS Tracking
            </p>
            <footer className="text-sm">ACS Tracking</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in
            </h1>
          </div>
          {!loggedIn?
          <CustomFormLayout 
          item={{}} showNewBtn={false} 
          url='/auth/login' redirectUrl=''  
          showCancelBtn={false} 
          onSave={()=>{setLoggedIn(prev=>true)}}
          validationSchema={loginSchema}
          >
            <UserAuthForm />
          </CustomFormLayout>
          :
          <CustomFormLayout 
          validationSchema={loginVerifySchema}
          item={{}} showNewBtn={false} url='/auth/login-verify' redirectUrl=''  showCancelBtn={false}
          onSave={(data)=>{
            console.log(data)
                setLoggedIn(prev => true);
                auth.setAuthData(data.user, { access_token: data.access_token, refresh_token: data.refresh_token });
                window.location.href ='/dashboard';
          }}
           >
            <VerifyForm />
          </CustomFormLayout>
          }
          
         
        </div>
      </div>
    </div>
  );
}
