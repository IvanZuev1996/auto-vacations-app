/* eslint-disable babun4ek-fsd-plugin/layer-imports-checker */
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useUserData } from '@/entities/User';
import { useVacation } from '@/features/ApproveVacationModal';
import {
    DynamicModuleLoader,
    ReducerList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getWeekendCount } from '@/shared/lib/helpers/dates';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
    getEditVacationModalError,
    getEditVacationModalInited,
    getEditVacationModalIsLoading,
    getEditVacationModalIsSuccess
} from '../../model/selectors/editVacationModal';
import {
    editVacationModalActions,
    editVacationModalReducer
} from '../../model/slice/editVacationModalSlice';
import { EditVacationFromContent } from '../EditVacationFromContent/EditVacationFromContent';

interface EditVacationFormProps {
    onCancel?: () => void;
    onSuccess?: () => void;
    className?: string;
}

const reducers: ReducerList = {
    editVacationModal: editVacationModalReducer
};

const EditVacationForm = (props: EditVacationFormProps) => {
    const { className, onCancel, onSuccess } = props;
    const { id = '' } = useParams<{ id: string }>();
    const { data: vacationData } = useVacation({ id });
    const dispatch = useAppDispatch();
    const [daysCount, setDaysCount] = useState<string>('');
    const [weekendCount, setWeekendCount] = useState<number>(0);
    const [isApprove, setIsApprove] = useState<boolean>(false);
    const { data: userData } = useUserData({
        userId: vacationData?.user?._id || ''
    });
    const isSuccess = useSelector(getEditVacationModalIsSuccess);
    const isInited = useSelector(getEditVacationModalInited);
    const isLoading = useSelector(getEditVacationModalIsLoading);
    const error = useSelector(getEditVacationModalError);

    useEffect(() => {
        if (!isInited && vacationData) {
            dispatch(editVacationModalActions.initVacation(vacationData));
        }
    }, [dispatch, isInited, vacationData]);

    const onChangeDates = useCallback(
        (dayjsDates: any, dates: [string, string]) => {
            if (!dates[1] && dates[0]) {
                dispatch(editVacationModalActions.setStartDate(dates[0]));

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

            dispatch(editVacationModalActions.setStartDate(dates[0]));
            dispatch(editVacationModalActions.setEndDate(dates[1]));
        },
        [dispatch, userData?.balance]
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <EditVacationFromContent
                daysCount={daysCount}
                isApprove={isApprove}
                onCancel={onCancel}
                onChangeDates={onChangeDates}
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

export default EditVacationForm;
