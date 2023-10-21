import { Document, Page, View, Text } from '@react-pdf/renderer';

import { documentStyles as styles } from '../PDFDocument';

export const AnnualPaid = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.text}>Тут будет заявление</Text>
            </View>
        </Page>
    </Document>
);
