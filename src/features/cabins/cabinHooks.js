import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createEditCabin, deleteCabin, getCabins } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCabins() {
  const { data: cabins, isLoading } = useQuery({ queryKey: ['cabins'], queryFn: getCabins });

  return { cabins, isLoadingCabins: isLoading };
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationKey: ['cabins'],
    mutationFn: deleteCabin,

    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Cabin Deleted');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
  });

  return { isDeleting: isLoading, deleteCabin: mutate };
}

//

export function useCreateEditCabin() {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin.data, newCabin.id),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      // toast.success(successMessage);
      // reset();
      // setShowForm((show) => !show);
    },
  });

  return { isCreating, createEdit: mutate };
}
