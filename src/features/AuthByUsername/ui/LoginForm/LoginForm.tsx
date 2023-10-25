import { Button } from 'antd';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    DynamicModuleLoader,
    ReducerList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import {
    getLoginError,
    getLoginIsLoading,
    getLoginPassword,
    getLoginUsername
} from '../../model/selectors/login';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

import cls from './LoginForm.module.scss';

const title: string = 'Введите свой логин и пароль';

const initialReducers: ReducerList = {
    loginForm: loginReducer
};

const LoginForm = () => {
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const isDisabled = !password || !username;
    const dispatch = useAppDispatch();

    const onUserLogin = () => {
        dispatch(
            loginByUsername({
                password: 'Y7LYJIWUeE',
                username: '3sxayIOEc4'
            })
        );
    };

    const onDirectorLogin = () => {
        dispatch(
            loginByUsername({
                password: '1fbsERrKYc',
                username: '0mspSno8fo'
            })
        );
    };

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch]
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch]
    );

    const onEnter = useCallback(() => {
        dispatch(
            loginByUsername({
                password: password.trim(),
                username: username.trim()
            })
        );
    }, [dispatch, password, username]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterAnmount>
            <Text weight="bold_weight" className={cls.logo}>
                ОтпускПлюс!
            </Text>
            <VStack justify="center" gap="12" className={cls.content} max>
                <Text size="M" weight="bold_weight" align="center" max>
                    {title}
                </Text>
                {error && (
                    <Text align="center" theme="error" max>
                        Не верный логин или пароль
                    </Text>
                )}
                <Button
                    type="primary"
                    onClick={onDirectorLogin}
                    style={{ width: '100%' }}
                >
                    Войти как руководитель
                </Button>
                <Button
                    type="default"
                    onClick={onUserLogin}
                    style={{ width: '100%' }}
                >
                    Войти как сотрудник
                </Button>
                <VStack gap="4" max>
                    <Text className={cls.subText}>Логин</Text>
                    <Input
                        placeholder="Ваш логин"
                        value={username}
                        isError={!!error}
                        onChange={onChangeUsername}
                    />
                </VStack>
                <VStack gap="4" max>
                    <Text className={cls.subText}>Пароль</Text>
                    <Input
                        placeholder="Ваш пароль"
                        value={password}
                        isError={!!error}
                        onChange={onChangePassword}
                    />
                </VStack>

                <Button
                    type="primary"
                    className={cls.btn}
                    onClick={onEnter}
                    loading={isLoading}
                    disabled={isDisabled}
                >
                    Войти
                </Button>
            </VStack>
            <Text align="center" className={cls.quations} max>
                Нет данных для входа? Обратитесь к своему руководителю
            </Text>
        </DynamicModuleLoader>
    );
};

export default LoginForm;
