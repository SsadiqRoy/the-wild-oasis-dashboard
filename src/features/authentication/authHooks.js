import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, login, logout, signUp, updateUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

//

export function useSignup() {
  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('New user has been added');
    },
    onError: (e) => toast.error(e.message),
  });

  return { signup: mutate, isSigningUP: isLoading };
}

//

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard');
    },
    onError: (error) => toast.error(error.message),
  });

  return { login: mutate, isLogingIn: isLoading };
}

//

export function useCurrentUser() {
  const { data, isLoading, error } = useQuery({ queryFn: getCurrentUser, queryKey: ['user'] });

  return { user: data, isGettingUser: isLoading, userError: error, isAuthenticated: data?.aud === 'authenticated' };
}

//

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ user }) => {
      toast.success('Account details updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser: mutate, isUpdatingUser: isLoading };
}

//

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout: mutate, isLogingOut: isLoading, loginOutError: error };
}
