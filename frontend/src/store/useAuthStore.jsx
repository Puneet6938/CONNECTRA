import React from "react";
import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";
import { io } from "socket.io-client";
// import { logout } from "../../../backend/src/controllers/auth.controllers";

    const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    onlineUsers: [],
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data});
            get().connectSocket();
        } catch (error) {
            console.error('Error checking auth:', error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup : async (data) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post('/auth/signup', data);
              const user = res.data.user || res.data;
            set({authUser: user});
            toast.success(res.data.message || "Account created successfully!");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create account");
        } finally {
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post('/auth/login', data);
            const user = res.data.user || res.data;
            set({authUser: user});
            toast.success(res.data.message || "Logged in successfully!");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({isLoggingIn: false});
        }   
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser: null});
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

    connectSocket: () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            query: {
                userId: authUser._id
            },
        });
        socket.connect();
        set({socket : socket});
            socket.on("getOnlineUsers", (userIds) => {
                set({onlineUsers: userIds});
            }
            );    
    },

    disconnectSocket: () => {
          if (get().socket?.connected) get().socket.disconnect();
    }

}));