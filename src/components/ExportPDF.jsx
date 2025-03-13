import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // 🔥 Importa autoTable correctamente
import { Button } from 'react-bootstrap';

const ExportPDF = ({ movements }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Título del PDF
    doc.text('Movimientos de Compras', 14, 10);

    // Definir las columnas y filas
    const tableColumn = [
      '#',
      'Asunto',
      'Método de Pago',
      'Categoría',
      'Monto',
      'Fecha',
    ];
    const tableRows = movements.map((movement, index) => [
      index + 1,
      movement.asunto,
      movement.metodoPago,
      movement.categoria,
      `$${parseFloat(movement.monto || 0).toFixed(2)}`,
      movement.fecha,
    ]);

    // Usar autoTable correctamente
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'striped',
    });

    // Guardar el PDF
    doc.save('movimientos_compras.pdf');
  };

  return (
    <Button variant="success" className="mb-3" onClick={exportToPDF}>
      Exportar a PDF
    </Button>
  );
};

export default ExportPDF;
