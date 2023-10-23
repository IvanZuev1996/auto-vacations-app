/* eslint-disable react/no-unescaped-entities */
import { Document, Page, View, Text } from '@react-pdf/renderer';

import { formatDaysEnding } from '@/shared/lib/helpers/applications/formatDaysEnding';

import { documentStyles as styles } from '../PDFDocument';

interface AnnualPaidProps {
    name: string;
    date: string;
    daysCount: number;
    currentDate: string;
}

export const AnnualPaid = ({
    date,
    name,
    daysCount,
    currentDate
}: AnnualPaidProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.rightSection}>
                <View style={styles.leftSection}>
                    <Text style={styles.line}>Руководителю</Text>
                    <Text style={styles.line}>______________________</Text>
                    <Text style={[styles.date, styles.fromPlace]}>
                        от {name}
                    </Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.centeredSection}>Заявление.</Text>
                <Text style={styles.text}>
                    Прошу предоставить мне ежегодный оплачиваемый отпуск с{' '}
                    {date} на {daysCount} {formatDaysEnding(daysCount)}.
                </Text>
            </View>
            <View style={styles.rightSection}>
                <Text style={styles.date}>
                    _____________________/_______________/
                </Text>
                <Text style={styles.date}>Дата: {currentDate}</Text>
            </View>
        </Page>
    </Document>
);
