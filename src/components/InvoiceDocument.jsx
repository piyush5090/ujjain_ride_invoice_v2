"use client";

import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";

// Register Hindi Font (Mukta)
// Using local font files for reliability
Font.register({
  family: "Mukta",
  fonts: [
    { src: "/fonts/Mukta-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Mukta-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Mukta",
    fontSize: 12,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#1e40af",
    paddingBottom: 10,
    marginBottom: 20,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  companyNameHi: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e40af",
  },
  companyNameEn: {
    fontSize: 12,
    color: "#4b5563",
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    color: "#f97316",
  },
  infoSection: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBox: {
    width: "45%",
  },
  labelHi: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
  },
  tableColDay: { width: "15%", padding: 5 },
  tableColDate: { width: "25%", padding: 5 },
  tableColPkg: { width: "60%", padding: 5 },
  tableCellHeader: { fontWeight: "bold" },
  
  footer: {
    marginTop: "auto",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 8,
  },
  amountSection: {
    alignItems: "flex-end",
    marginTop: 10,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 5,
  },
  amountLabel: {
    width: "150pt",
    textAlign: "right",
    marginRight: 10,
  },
  amountValue: {
    width: "80pt",
    textAlign: "right",
    fontWeight: "bold",
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#1e40af",
  },
  totalLabel: {
    fontSize: 14,
    color: "#1e40af",
  },
  totalValue: {
    fontSize: 16,
    color: "#f97316",
  }
});

export default function InvoiceDocument({ data, packagesList }) {
  const { customerName, startDate, days, totalAmount, advancePaid } = data;
  const remaining = (parseFloat(totalAmount) || 0) - (parseFloat(advancePaid) || 0);

  const getPackageNames = (pkgIds, otherText) => {
    return pkgIds.map(id => {
      if (id === "other") return otherText || "Other";
      const pkg = packagesList.find(p => p.id === id);
      return pkg ? `${pkg.hi} (${pkg.en})` : id;
    }).join(", ");
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <View>
              <Text style={styles.companyNameHi}>उज्जैन राइड</Text>
              <Text style={styles.companyNameEn}>Ujjain Ride</Text>
            </View>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={{ fontSize: 10, textAlign: "right" }}>Date: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.labelHi}>ग्राहक (Customer):</Text>
            <Text style={styles.value}>{customerName}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.labelHi}>संपर्क (Contact):</Text>
            <Text style={{ fontSize: 12 }}>+91 98260 95402</Text>
            <Text style={{ fontSize: 10 }}>ujjainride@gmail.com</Text>
          </View>
        </View>

        {/* Itinerary Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableColDay}><Text style={styles.tableCellHeader}>दिन (Day)</Text></View>
            <View style={styles.tableColDate}><Text style={styles.tableCellHeader}>तारीख (Date)</Text></View>
            <View style={styles.tableColPkg}><Text style={styles.tableCellHeader}>पैकेज (Packages)</Text></View>
          </View>
          {days.map((day, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableColDay}><Text>{index + 1}</Text></View>
              <View style={styles.tableColDate}><Text>{formatDate(day.date)}</Text></View>
              <View style={styles.tableColPkg}><Text>{getPackageNames(day.packages, day.otherText)}</Text></View>
            </View>
          ))}
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>कुल देय राशि (Total Payable):</Text>
            <Text style={styles.amountValue}>₹ {totalAmount}</Text>
          </View>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>अग्रिम भुगतान (Advance Paid):</Text>
            <Text style={styles.amountValue}>₹ {advancePaid}</Text>
          </View>
          <View style={[styles.amountRow, styles.totalRow]}>
            <Text style={[styles.amountLabel, styles.totalLabel]}>शेष राशि (Remaining Balance):</Text>
            <Text style={[styles.amountValue, styles.totalValue]}>₹ {remaining}</Text>
          </View>
        </View>

        {/* Terms & Footer */}
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>नियम एवं शर्तें (Terms & Conditions):</Text>
          <Text style={{ fontSize: 8, marginTop: 5 }}>1. All payments are non-refundable after service completion.</Text>
          <Text style={{ fontSize: 8 }}>2. Please keep this invoice for your records.</Text>
        </View>

        <View style={styles.footer}>
          <Text>उज्जैन राइड - उज्जैन, मध्य प्रदेश | Ujjain Ride - Ujjain, Madhya Pradesh</Text>
          <Text>Generated by Ujjain Ride Invoice Tool</Text>
        </View>
      </Page>
    </Document>
  );
}
