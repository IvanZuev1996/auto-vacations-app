import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font
} from '@react-pdf/renderer';

Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf'
});

const styles = StyleSheet.create({
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

export const PDFDocument = () => {
    const a = 0;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text}>Тут будет заявление</Text>
                </View>
            </Page>
        </Document>
    );
};
