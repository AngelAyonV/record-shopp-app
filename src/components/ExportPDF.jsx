import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Importa autoTable correctamente
import { Button } from "react-bootstrap";

const ExportPDF = ({ movements }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();

    // 🏢 🔹 Datos del "Estado de Cuenta"
    const companyName = "Mi Empresa S.A. de C.V.";
    const reportTitle = "Estado de Cuenta - Movimientos de Compras";
    const generatedDate = new Date().toLocaleDateString();
    const totalTransactions = movements.length;
    const totalAmount = movements.reduce((sum, movement) => sum + parseFloat(movement.monto || 0), 0);

    // 🎨 🔹 Estilos del Encabezado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(companyName, 14, 15);
    doc.setFontSize(14);
    doc.text(reportTitle, 14, 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha de generación: ${generatedDate}`, 14, 35);
    doc.text(`Total de compras: ${totalTransactions}`, 14, 42);
    doc.text(`Monto total: $${totalAmount.toFixed(2)}`, 14, 49);

    // 📌 🔹 Línea Separadora
    doc.setLineWidth(0.5);
    doc.line(14, 52, 190, 52);

    // 📊 🔹 Configuración de la Tabla
    const tableColumn = ["#", "Asunto", "Método de Pago", "Categoría", "Monto", "Fecha"];
    const tableRows = movements.map((movement, index) => [
      index + 1,
      movement.asunto,
      movement.metodoPago,
      movement.categoria,
      `$${parseFloat(movement.monto || 0).toFixed(2)}`,
      movement.fecha,
    ]);

    // 🛠️ 🔹 Generar la Tabla
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 60, // La tabla empieza después del encabezado
      theme: "striped",
      headStyles: { fillColor: [44, 62, 80] }, // Color oscuro para el header
      alternateRowStyles: { fillColor: [240, 240, 240] }, // Filas intercaladas en gris claro
      styles: { fontSize: 10 },
      margin: { top: 10 },
    });

    // 📌 🔹 Pie de Página con Paginación
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.text(`Página ${i} de ${totalPages}`, 90, doc.internal.pageSize.height - 10);
    }

    // 📁 🔹 Guardar el PDF
    doc.save("Estado_de_Cuenta.pdf");
  };

  return (
    <Button variant="success" className="mb-3" onClick={exportToPDF}>
      📄 Exportar Estado de Cuenta
    </Button>
  );
};

export default ExportPDF;
