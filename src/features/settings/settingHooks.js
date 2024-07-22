import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSettings, updateSetting } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useGetSetting() {
  const { isLoading, error, data } = useQuery({ queryKey: ['setting'], queryFn: getSettings });

  return { islSetting: isLoading, setting: data, settingError: error };
}

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    onError: (e) => toast.error(e.message),
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setting'] });
      toast.success('Settings Updated');
    },
  });

  return { isUpdating: isLoading, updateSetting: mutate };
}
