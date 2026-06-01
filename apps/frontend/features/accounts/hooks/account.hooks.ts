import { UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accountService } from '../services/account.client.service';
import { QUERIES } from '../../../queries/queries';
import { ProfileSchemaType, PasswordSchemaType, AddressSchemaType } from '../schema/accountSchema';
import { UserOrderType } from '../types/account.types';
import { authClientService } from '@/features/auth/services/auth.client.service';

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ProfileSchemaType | AddressSchemaType) => accountService.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERIES.ME] });
        },
    });
};

export const useUpdatePassword = () => {
    return useMutation({
        mutationFn: (data: PasswordSchemaType) => accountService.updatePassword(data),
    });
};

export const useGetOrders = (): UseQueryResult<UserOrderType[]> => {
    return useQuery({
        queryKey: [QUERIES.user.orders],
        queryFn: () => accountService.orders(),
    })
}