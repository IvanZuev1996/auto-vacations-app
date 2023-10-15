import { DatePickerProps } from 'antd';
import { ChangeEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    DynamicModuleLoader,
    ReducerList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
    getAddEmployeeError,
    getAddEmployeeIsLoading,
    getAddEmployeeIsSuccess,
    getAddEmployeeUserData
} from '../../model/selectors/addEmployeeModal';
import {
    addEmployeeModalActions,
    addEmployeeModalReducer
} from '../../model/slice/addEmployeeModalSlice';

import { AddEmployeeFormContent } from './AddEmployeeFormContent/AddEmployeeFormContent';

interface AddEmployeeFormProps {
    onCancel?: () => void;
    onSuccess?: () => void;
    className?: string;
}

const reducers: ReducerList = {
    addEmployeeModal: addEmployeeModalReducer
};

const AddEmployeeForm = (props: AddEmployeeFormProps) => {
    const { className, onCancel, onSuccess } = props;
    const data = useSelector(getAddEmployeeUserData);
    const isLoading = useSelector(getAddEmployeeIsLoading);
    const isSuccess = useSelector(getAddEmployeeIsSuccess);
    const error = useSelector(getAddEmployeeError);
    const dispatch = useAppDispatch();

    const onChangeFirstname = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(addEmployeeModalActions.setFirstname(e.target.value));
        },
        [dispatch]
    );

    const onChangeLastName = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(addEmployeeModalActions.setLastname(e.target.value));
        },
        [dispatch]
    );

    const onChangePatronymic = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(addEmployeeModalActions.setPatronymic(e.target.value));
        },
        [dispatch]
    );

    const onChangePost = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(addEmployeeModalActions.setPost(e.target.value));
        },
        [dispatch]
    );

    const onChangeDivision = useCallback(
        (divisionId: string) => {
            dispatch(addEmployeeModalActions.setDivision(divisionId));
        },
        [dispatch]
    );

    const onChangeBalance = useCallback(
        (value: string) => {
            dispatch(addEmployeeModalActions.setBalance(Number(value)));
        },
        [dispatch]
    );

    const onChangeIntersections = useCallback(
        (value: string[]) => {
            dispatch(addEmployeeModalActions.setIntersections(value));
        },
        [dispatch]
    );

    const onChangeStartWork: DatePickerProps['onChange'] = useCallback(
        (_: any, date: string) => {
            dispatch(addEmployeeModalActions.setStartWork(new Date(date)));
        },
        [dispatch]
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <AddEmployeeFormContent
                data={data}
                isLoading={isLoading}
                isSuccess={isSuccess}
                error={error}
                onCancel={onCancel}
                onSuccess={onSuccess}
                onChangeBalance={onChangeBalance}
                onChangeDivision={onChangeDivision}
                onChangeFirstname={onChangeFirstname}
                onChangeIntersections={onChangeIntersections}
                onChangeLastName={onChangeLastName}
                onChangePatronymic={onChangePatronymic}
                onChangePost={onChangePost}
                onChangeStartWork={onChangeStartWork}
                className={className}
            />
        </DynamicModuleLoader>
    );
};

export default AddEmployeeForm;
