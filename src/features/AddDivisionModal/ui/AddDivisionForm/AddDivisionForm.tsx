import { ChangeEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    DynamicModuleLoader,
    ReducerList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
    getAddDivisionModalError,
    getAddDivisionModalIsLoding,
    getAddDivisionModalIsSuccess
} from '../../model/selectors/addDivisionModal';
import {
    addDivisionModalActions,
    addDivisionModalReducer
} from '../../model/slice/addDivisionModalSlice';
import { AddDivisionFormContent } from '../AddDivisionFormContent/AddDivisionFormContent';

interface AddDivisonFormProps {
    onCancel?: () => void;
    onSuccess?: () => void;
    className?: string;
}

const reducers: ReducerList = {
    addDivisionModal: addDivisionModalReducer
};

const AddDivisionForm = (props: AddDivisonFormProps) => {
    const { className, onCancel, onSuccess } = props;
    const error = useSelector(getAddDivisionModalError);
    const isLoadong = useSelector(getAddDivisionModalIsLoding);
    const isSuccess = useSelector(getAddDivisionModalIsSuccess);
    const dispatch = useAppDispatch();

    const onChangeNumber = useCallback(
        (divisionNumber: string) => {
            dispatch(addDivisionModalActions.setNumber(Number(divisionNumber)));
        },
        [dispatch]
    );

    const onChangeName = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(addDivisionModalActions.setName(e.target.value));
        },
        [dispatch]
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <AddDivisionFormContent
                className={className}
                error={error}
                isLoading={isLoadong}
                isSuccess={isSuccess}
                onCancel={onCancel}
                onChangeName={onChangeName}
                onChangeNumber={onChangeNumber}
                onSuccess={onSuccess}
            />
        </DynamicModuleLoader>
    );
};

export default AddDivisionForm;
