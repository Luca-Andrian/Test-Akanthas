import { useRef} from 'react';
import { Box, Button, Card, CardActions, CardContent } from '@mui/material';
import html2canvas from "html2canvas";
import jsPDF from "jspdf"
import { Chart } from '../components/Chart';

export const Stats = () => {

    const pdfRef = useRef()

    const generatePDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 1;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('Rapport-Statistique.pdf')
        });
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ width: "70%", px: 5 }}>
                <CardContent ref={pdfRef}>
                    <Chart />
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        onClick={() => generatePDF()}
                    >
                        Générer un rapport PDF
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
