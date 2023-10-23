import { StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer';

import timesNewRomanBold from '../../fonts/TimesNewRomanBold.ttf';
import timesNewRoman from '../../fonts/timesnewromanpsmt.ttf';

import { AnnualPaid } from './AnnualPaid/AnnualPaid';

Font.register({
    family: 'Times New Roman',
    fonts: [
        { src: timesNewRoman },
        { src: timesNewRomanBold, fontWeight: 'bold' }
    ]
});

export const documentStyles = StyleSheet.create({
    page: {
        fontFamily: 'Times New Roman',
        flexDirection: 'column',
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 50,
        paddingBottom: '35%',
        paddingLeft: 70,
        paddingRight: 70
    },
    section: {
        width: '100%',
        paddingBottom: 40
    },
    centeredSection: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 25,
        width: '100%'
    },
    rightSection: {
        width: '100%',
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    leftSection: {
        textAlign: 'left'
    },
    text: {
        fontSize: 14,
        textAlign: 'justify',
        width: '100%'
    },
    fromPlace: {
        marginTop: 20
    },
    header: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10
    },
    date: {
        fontSize: 13,
        marginTop: 30
    },
    line: {
        fontSize: 13,
        height: 20
    }
});

interface PDFDocumentProps {
    isOpen?: boolean;
    onOpen: (newState: boolean) => void;
    date: string;
    name: string;
    currentDate: string;
    daysCount: number;
}

export const PDFDocument = (props: PDFDocumentProps) => {
    const { isOpen, onOpen, currentDate, date, daysCount, name } = props;

    if (isOpen) {
        return (
            <PDFDownloadLink
                document={
                    <AnnualPaid
                        date={date}
                        name={name}
                        currentDate={currentDate}
                        daysCount={daysCount}
                    />
                }
                fileName="Заявление на отпуск.pdf"
            >
                {({ blob, url, loading, error }) => {
                    let link;

                    if (blob !== null) {
                        link = URL.createObjectURL(blob);
                        window.open(link);
                        onOpen(false);
                    }

                    return null;
                }}
            </PDFDownloadLink>
        );
    }

    return null;
};
