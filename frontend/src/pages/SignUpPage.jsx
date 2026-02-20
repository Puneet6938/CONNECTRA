import { MessageSquare, User, Mail, Lock, Eye, EyeOff  } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.jsx';
import { Link } from "react-router-dom";

import AuthImagePattern from '../components/AuthImagePattern.jsx';
import { Loader } from 'lucide-react';

import { toast } from 'react-hot-toast';


const SignUpPage = () => {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ formData, setFormData ] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim() ) return toast.error("Full name is required");
    if(!formData.email.trim() ) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Email is invalid");
    if(!formData.password.trim() ) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();

    if(success === true) {
      await signup(formData);
    }
  }

  return (
  <div className="min-h-screen grid lg:grid-cols-2">

    {/* Left Side */}
    <div className="flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">

        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>

            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started with your Connectra account
            </p>

          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 ">

          <div className="form-control">

            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 z-50">
                <User className="size-5 text-base-content/40" />
              </div>

              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full pl-12 
                    border-2 border-base-content/20 
                    focus:border-primary 
                    focus:outline-none 
                    transition-all duration-200 "
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

          </div>

          <div className="form-control">

            <label className="label">
              <span className="label-text font-medium ">Email</span>
            </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 z-50">
                  <Mail className="size-5 text-base-content/40" />
                </div>

                <input
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full pl-12 
                            border-2 border-base-content/20 
                            focus:border-primary 
                            focus:outline-none 
                            transition-all duration-200"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
           </div>

          </div>

          <div className="form-control">

            <label className="label">
              <span className="label-text font-medium ">Password</span>
            </label>

            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 z-50">
                <Lock className="size-5 text-base-content/40" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full pl-12 
                          border-2 border-base-content/20 
                          focus:border-primary 
                          focus:outline-none 
                          transition-all duration-200"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 z-50"
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>

          </div>

          <button type='submit' className='btn btn-primary w-full bg-blue-600' disabled={isSigningUp}>
                {isSigningUp ? (
                <>
                <Loader className="animate-spin size-5"/>
                Loading...
                </>
              ) : (
                "Create Account"
                )}
          </button>

        </form>

        <div className="text-center">
          <p className="text-base-content/60">
          Already have an account?{" "}
           <Link to="/login" className="text-primary hover:underline hover:text-primary-focus transition-colors duration-200">
             Sign in
           </Link>
          </p>
        </div>


      </div>
    </div>

    {/* Right Side */}
    <AuthImagePattern
        title="Join Connectra Today!"
        description="Connect with friends, share your moments, and explore the world around you. Sign up now to start your journey with Connectra!"
    />


  </div>
)

}

export default SignUpPage