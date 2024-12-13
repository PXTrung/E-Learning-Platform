import { EmailOTPData, LoginData, OTPData, RegisterData, ResetPasswordData } from "../../services/interfaces";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import authUtils from "../../utils/auth"
import { PATHS } from "../../constants/path";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useStore from "../../store";

const useAuth = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const token = authUtils.getSessionToken();
    const { userQuery } = useStore();

    const login = async (data: LoginData) => {
      try {
        const result = await api.auth.login(data);
        if (result) {
          authUtils.setSessionToken(result.data);
        }

        const userInfor = authUtils.decodeToken(result.data);
        if(userInfor?.role == "Admin"){
          navigate("/admin");
        }
        else{
          navigate("/");
        }

      } catch (error: unknown) {
        console.error("Login failed", error);
        if(error instanceof AxiosError){
            const errorMessage = error.response?.data?.message || "Something went wrong! Please login again.";
            toast.error(errorMessage);
        }
        
      }
    };
  
    const signIn = async (data: RegisterData) => {
      try {
        const result = await api.auth.register(data);
        if(result){
          navigate(`/${PATHS.AUTH.IDENTITY}/${PATHS.AUTH.LOGIN}`);
        }
      } catch (error) {
        console.error("Login failed", error);
        if(error instanceof AxiosError){
            const errorMessage = error.response?.data?.message || "Something went wrong! Please register again.";
            toast.error(errorMessage);
        }
      }
    };

    const getProfile = () => useQuery({
      queryKey: ["profile", token],
      queryFn: async () => {
        const item = await api.auth.getProfile();
        return item;
      }
    })

    const getAllUsers = () => useQuery({
      queryKey: ["users", userQuery],
      queryFn: async () => {
        const item = await api.auth.getAllUsers(userQuery);
        return item;
      }
    })

    const editProfileMutation = useMutation({
      mutationFn: async(data: FormData) => {
        return await api.auth.editProfile(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile", token] })
      },
      onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Profile Edited fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
      }
    });

    const sendEmailMutation = useMutation({
      mutationFn: async(data: EmailOTPData) => {
        return await api.auth.sendEmailOTP(data);
      },
      onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "Mail sent fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
      }
    });

    const verifyOTPMutation = useMutation({
      mutationFn: async(data: OTPData) => {
        return await api.auth.verifyOTP(data);
      },
      onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "OTP verified fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
      }
    });

    const resetPasswordMutation = useMutation({
      mutationFn: async(data: ResetPasswordData) => {
        return await api.auth.resetPass(data);
      },
      onError: (error : unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || "change password fail";
            toast.error(errorMessage);
          } else {
            toast.error("Something wrong happen. Try again!");
          }
      }
    });

    const editProfile = (data: FormData) => {
      editProfileMutation.mutate(data);
    }

    const sendEmail = (data: EmailOTPData) => {
      sendEmailMutation.mutate(data);
    }

    const verifyOTP = (data: OTPData) => {
      verifyOTPMutation.mutate(data);
    }

    const resetPassword = (data: ResetPasswordData) => {
      resetPasswordMutation.mutate(data);
    }
  
    return {
      login,
      signIn,
      getProfile,
      editProfile,
      sendEmail,
      verifyOTP,
      resetPassword,
      getAllUsers,
      editProfileMutation,
      sendEmailMutation,
      verifyOTPMutation,
      resetPasswordMutation,
    };
  };
  
  export default useAuth;