import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import { ReactNode } from 'react';

import 'dayjs/locale/ru';

interface AntdProviderProps {
    children: ReactNode;
}

export const AntdProvider = ({ children }: AntdProviderProps) => (
    <ConfigProvider
        locale={locale}
        theme={{
            token: {
                fontSize: 13,
                fontFamily: '\'Montserrat\', sans-serif'
            },
            components: {
                Tabs: {
                    horizontalItemPadding: '8px 0px',
                    horizontalMargin: '0px'
                },
                Card: {
                    paddingLG: 13,
                    boxShadowTertiary: '0 5px 15px -3px rgba(34, 60, 80, 0.21)'
                },
                Dropdown: {
                    controlPaddingHorizontal: 25,
                    controlHeight: 40
                },
                Skeleton: {
                    controlHeight: 50,
                    padding: 0
                }
            }
        }}
    >
        {children}
    </ConfigProvider>
);
