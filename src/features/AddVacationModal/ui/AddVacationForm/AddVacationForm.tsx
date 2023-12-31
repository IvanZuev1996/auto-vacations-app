import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { VacationType } from '@/entities/Vacation';
import {
    DynamicModuleLoader,
    ReducerList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getWeekendCount } from '@/shared/lib/helpers/dates';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
    getAddVacationModalError,
    getAddVacationModalIsLoading,
    getAddVacationModalIsSuccess,
    getAddVacationModalVacationType
} from '../../model/selectors/addVacationModal';
import {
    addVacationModalActions,
    addVacationModalReducer
} from '../../model/slice/addVacationModalSlice';
import { AddVacationFromContent } from '../AddVacationFromContent/AddVacationFromContent';

interface AddVacationFormProps {
    onCancel?: () => void;
    onSuccess?: () => void;
    className?: string;
}

const reducers: ReducerList = {
    addVacationModal: addVacationModalReducer
};

const AddVacationForm = (props: AddVacationFormProps) => {
    const { className, onCancel, onSuccess } = props;
    const dispatch = useAppDispatch();
    const [daysCount, setDaysCount] = useState<string>('');
    const [weekendCount, setWeekendCount] = useState<number>(0);
    const [isApprove, setIsApprove] = useState<boolean>(false);
    const userData = useSelector(getUserAuthData);
    const type = useSelector(getAddVacationModalVacationType);
    const isSuccess = useSelector(getAddVacationModalIsSuccess);
    const isLoading = useSelector(getAddVacationModalIsLoading);
    const error = useSelector(getAddVacationModalError);

    const onChangeType = useCallback(
        (value: string) => {
            dispatch(
                addVacationModalActions.setVacationType(value as VacationType)
            );
        },
        [dispatch]
    );

    const onChangeDates = useCallback(
        (dayjsDates: any, dates: [string, string]) => {
            if (!dates[1] && dates[0]) {
                dispatch(addVacationModalActions.setStartDate(dates[0]));

                return;
            }

            if (dayjsDates) {
                const currentDaysCount =
                    dayjsDates[1].diff(dates[0], 'day') + 1;
                setDaysCount(currentDaysCount);

                if (userData?.balance) {
                    if (userData.balance - Number(currentDaysCount) < 0) {
                        setIsApprove(false);
                    } else {
                        setIsApprove(true);
                    }
                }
            } else {
                setDaysCount('');
                setIsApprove(false);
            }

            setWeekendCount(
                getWeekendCount({ startDate: dates[0], endDate: dates[1] })
            );

            dispatch(addVacationModalActions.setStartDate(dates[0]));
            dispatch(addVacationModalActions.setEndDate(dates[1]));
        },
        [dispatch, userData?.balance]
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <AddVacationFromContent
                daysCount={daysCount}
                isApprove={isApprove}
                onCancel={onCancel}
                onChangeDates={onChangeDates}
                onChangeType={onChangeType}
                onSuccess={onSuccess}
                userData={userData}
                weekendCount={weekendCount}
                isSuccess={isSuccess}
                error={error}
                isLoading={isLoading}
                className={className}
            />
        </DynamicModuleLoader>
    );
};

export default AddVacationForm;
