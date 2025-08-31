import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";

const useAuthStore = create((set) => ({
  user: null,
  //for loading
  isSigning: false,
  isCheckingAuth: true,
  isLoggingIn: false,
  isProfilePic: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ user: res.data.user });
    } catch {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigning: true });
      let res = await axiosInstance.post("/auth/signup", data);
      if (res.data.success) {
        toast.success("Account created successfully");
        set({ user: res.data.user });
      }
    } catch (error) {
      console.log("Error signing up:", error);
      toast.error("Error signing up");
    } finally {
      set({ isSigning: false });
    }
  },
  login: async (user) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/auth/login", user);
      if (res.data.success) {
        toast.success(res.data.msg);
        set({ user: res.data.user });
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log("somthing error in login", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success(res.data.msg);
    } catch {
      toast.error("error while logout");
    }
  },
  updateProfileImage: async (profilePic) => {
    //the parameter is base64 image string so that why have to wrap it in an object
    set({ isProfilePic: true });
    try {
      const res = await axiosInstance.put("/auth/profile-update", {
        profilePic,
      });
      toast.success("Profile picture updated successfully");
      set({ user: res.data.user });
    } catch (error) {
      console.log("somthing goes error while updating image", error);
      toast.error("somthing goes error while updating image", error);
    } finally {
      set({ isProfilePic: false });
    }
  },
}));

export default useAuthStore;
