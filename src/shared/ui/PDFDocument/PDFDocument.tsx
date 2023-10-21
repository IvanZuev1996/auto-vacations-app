import { StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer';

import { AnnualPaid } from './AnnualPaid/AnnualPaid';

Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf'
});

export const documentStyles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#ffffff'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    header: {
        fontFamily: 'Roboto',
        fontSize: 24,
        marginBottom: 10
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 16
    }
});

interface PDFDocumentProps {
    isOpen?: boolean;
    onOpen: (newState: boolean) => void;
}

export const PDFDocument = (props: PDFDocumentProps) => {
    const { isOpen, onOpen } = props;

    if (isOpen) {
        return (
            <PDFDownloadLink document={<AnnualPaid />} fileName="somename.pdf">
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
