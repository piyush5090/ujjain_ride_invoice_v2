"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import { VEHICLES } from "@/context/InvoiceContext";

// Register Hindi Font
Font.register({
  family: "Mukta",
  fonts: [
    { src: "/fonts/Mukta-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Mukta-Bold.ttf", fontWeight: 700 },
  ],
});

const PRIMARY = "#0f172a";
const ACCENT = "#2563eb";
const LIGHT = "#f8fafc";
const BORDER = "#e2e8f0";
const TEXT = "#334155";
const MUTED = "#64748b";
const SUCCESS = "#16a34a";

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    paddingBottom: 65,
    paddingHorizontal: 30,
    fontFamily: "Mukta",
    fontSize: 10,
    color: TEXT,
    backgroundColor: "#ffffff",
  },

  topBar: {
    height: 8,
    backgroundColor: ACCENT,
    marginBottom: 22,
  },

  // Header
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 58,
    height: 58,
    marginRight: 12,
    borderRadius: 6,
  },

  companyNameEn: {
    fontSize: 22,
    fontWeight: "bold",
    color: PRIMARY,
    letterSpacing: 0.5,
  },

  companyNameHi: {
    fontSize: 11,
    color: MUTED,
    marginTop: 1,
  },

  companyMeta: {
    marginTop: 4,
  },

  companyMetaText: {
    fontSize: 8,
    color: MUTED,
    lineHeight: 1.5,
  },

  // Invoice Meta
  invoiceMetaSection: {
    alignItems: "flex-end",
  },

  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY,
    letterSpacing: 1,
    marginBottom: 8,
  },

  metaCard: {
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
    minWidth: 160,
  },

  metaLabel: {
    fontSize: 7,
    color: MUTED,
    textTransform: "uppercase",
    marginBottom: 2,
  },

  metaValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: PRIMARY,
  },

  statusBadge: {
    backgroundColor: "#dcfce7",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 4,
  },

  statusText: {
    fontSize: 8,
    fontWeight: "bold",
    color: SUCCESS,
  },

  // Info Cards
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  infoCard: {
    width: "48.5%",
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    padding: 12,
  },

  blockTitleEn: {
    fontSize: 10,
    fontWeight: "bold",
    color: ACCENT,
    marginBottom: 1,
    textTransform: "uppercase",
  },

  blockTitleHi: {
    fontSize: 7,
    color: MUTED,
    marginBottom: 8,
  },

  customerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: PRIMARY,
    marginBottom: 4,
  },

  contactText: {
    fontSize: 9,
    color: TEXT,
    lineHeight: 1.5,
  },

  // Table
  tableContainer: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 18,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: PRIMARY,
    paddingVertical: 8,
    alignItems: "center",
  },

  tableHeaderText: {
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  alternateRow: {
    backgroundColor: "#f8fafc",
  },

  cellText: {
    fontSize: 8,
    color: TEXT,
    lineHeight: 1.25,
  },

  colDay: {
    width: "8%",
    paddingHorizontal: 5,
  },

  colDate: {
    width: "22%",
    paddingHorizontal: 5,
  },

  colPkg: {
    width: "45%",
    paddingHorizontal: 5,
  },

  colVehicle: {
    width: "25%",
    paddingHorizontal: 5,
  },

  // Financial Summary
  financialWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 18,
  },

  financialCard: {
    width: "50%",
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    padding: 12,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  amountLabel: {
    fontSize: 9,
    color: TEXT,
    fontWeight: "bold",
  },

  amountSub: {
    fontSize: 7,
    color: MUTED,
    marginTop: 1,
  },

  amountValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: PRIMARY,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ACCENT,
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  totalLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#ffffff",
  },

  totalSub: {
    fontSize: 7,
    color: "#dbeafe",
    marginTop: 1,
  },

  totalValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },

  // Terms
  termsSection: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 12,
  },

  termsTitleEn: {
    fontSize: 10,
    fontWeight: "bold",
    color: PRIMARY,
  },

  termsTitleHi: {
    fontSize: 7,
    color: MUTED,
    marginBottom: 8,
  },

  termsText: {
    fontSize: 8,
    color: TEXT,
    lineHeight: 1.45,
    marginBottom: 2,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 18,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 8,
    alignItems: "center",
  },

  footerMain: {
    fontSize: 9,
    fontWeight: "bold",
    color: PRIMARY,
  },

  footerSub: {
    fontSize: 7,
    color: MUTED,
    marginTop: 2,
    textAlign: "center",
    lineHeight: 1.4,
  },
});

export default function InvoiceDocument({
  data,
  packagesList,
}) {
  const {
    customerName,
    days,
    totalAmount,
    advancePaid,
    invoiceId,
  } = data;

  const remaining =
    (parseFloat(totalAmount) || 0) -
    (parseFloat(advancePaid) || 0);

  const getVehicleName = (vId) => {
    const v = VEHICLES.find((v) => v.id === vId);

    return v ? v.en : vId;
  };

  const getPackageNames = (pkgIds, otherText) => {
    return pkgIds
      .map((id) => {
        if (id === "other") return otherText || "Other";

        const pkg = packagesList.find((p) => p.id === id);

        return pkg ? pkg.en : id;
      })
      .join(" • ");
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);

    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Top Bar */}
        <View style={styles.topBar} />

        {/* Header */}
        <View style={styles.headerContainer}>
          
          {/* Company */}
          <View style={styles.logoSection}>
            <Image
              src="/logo.jpeg"
              style={styles.logo}
            />

            <View>
              <Text style={styles.companyNameEn}>
                Ujjain Ride
              </Text>

              <Text style={styles.companyNameHi}>
                उज्जैन राइड
              </Text>

              <View style={styles.companyMeta}>
                <Text style={styles.companyMetaText}>
                  Premium Cab & Pilgrimage Services
                </Text>

                <Text style={styles.companyMetaText}>
                  www.ujjainride.in
                </Text>

                <Text style={styles.companyMetaText}>
                  +91 98260 95402
                </Text>
              </View>
            </View>
          </View>

          {/* Invoice Meta */}
          <View style={styles.invoiceMetaSection}>
            <Text style={styles.invoiceTitle}>
              INVOICE
            </Text>

            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>
                Invoice ID
              </Text>

              <Text style={styles.metaValue}>
                #{invoiceId}
              </Text>
            </View>

            <View style={styles.metaCard}>
              <Text style={styles.metaLabel}>
                Issue Date
              </Text>

              <Text style={styles.metaValue}>
                {new Date().toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                CONFIRMED BOOKING
              </Text>
            </View>
          </View>
        </View>

        {/* Customer & Contact */}
        <View style={styles.infoGrid}>
          
          <View style={styles.infoCard}>
            <Text style={styles.blockTitleEn}>
              Customer Details
            </Text>

            <Text style={styles.blockTitleHi}>
              ग्राहक विवरण
            </Text>

            <Text style={styles.customerName}>
              {customerName}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.blockTitleEn}>
              Support & Contact
            </Text>

            <Text style={styles.blockTitleHi}>
              सहायता एवं संपर्क
            </Text>

            <Text style={styles.contactText}>
              Phone: +91 98260 95402
            </Text>

            <Text style={styles.contactText}>
              Email: ujjainride@gmail.com
            </Text>

            <Text style={styles.contactText}>
              Ujjain, Madhya Pradesh
            </Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.tableContainer}>
          
          {/* Header */}
          <View style={styles.tableHeader}>
            
            <View style={styles.colDay}>
              <Text style={styles.tableHeaderText}>
                Day
              </Text>
            </View>

            <View style={styles.colDate}>
              <Text style={styles.tableHeaderText}>
                Date
              </Text>
            </View>

            <View style={styles.colPkg}>
              <Text style={styles.tableHeaderText}>
                Package Details
              </Text>
            </View>

            <View style={styles.colVehicle}>
              <Text style={styles.tableHeaderText}>
                Vehicle
              </Text>
            </View>
          </View>

          {/* Rows */}
          {days.map((day, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 !== 0 &&
                  styles.alternateRow,
              ]}
            >
              <View style={styles.colDay}>
                <Text style={styles.cellText}>
                  {index + 1}
                </Text>
              </View>

              <View style={styles.colDate}>
                <Text style={styles.cellText}>
                  {formatDate(day.date)}
                </Text>
              </View>

              <View style={styles.colPkg}>
                <Text style={styles.cellText}>
                  {getPackageNames(
                    day.packages,
                    day.otherText
                  )}
                </Text>
              </View>

              <View style={styles.colVehicle}>
                <Text style={styles.cellText}>
                  {getVehicleName(day.vehicle)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Financial Summary */}
        <View style={styles.financialWrapper}>
          
          <View style={styles.financialCard}>
            
            <View style={styles.amountRow}>
              <View>
                <Text style={styles.amountLabel}>
                  Total Fare
                </Text>

                <Text style={styles.amountSub}>
                  कुल यात्रा राशि
                </Text>
              </View>

              <Text style={styles.amountValue}>
                ₹
                {parseFloat(
                  totalAmount
                ).toLocaleString("en-IN")}
              </Text>
            </View>

            <View style={styles.amountRow}>
              <View>
                <Text style={styles.amountLabel}>
                  Advance Paid
                </Text>

                <Text style={styles.amountSub}>
                  अग्रिम भुगतान
                </Text>
              </View>

              <Text style={styles.amountValue}>
                ₹
                {parseFloat(
                  advancePaid
                ).toLocaleString("en-IN")}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>
                  Remaining Balance
                </Text>

                <Text style={styles.totalSub}>
                  शेष भुगतान राशि
                </Text>
              </View>

              <Text style={styles.totalValue}>
                ₹
                {remaining.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          
          <Text style={styles.termsTitleEn}>
            Terms & Conditions
          </Text>

          <Text style={styles.termsTitleHi}>
            नियम एवं शर्तें
          </Text>

          <Text style={styles.termsText}>
            • All bookings and final payments are
            non-refundable after service mobilization.
          </Text>

          <Text style={styles.termsText}>
            • For round trip cabs, the fare is valid
            only for 12 hours within a single day.
          </Text>

          <Text style={styles.termsText}>
            • Booking amount is refundable only up
            to 24 hours before the trip start time.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          
          <Text style={styles.footerMain}>
            Thank you for choosing Ujjain Ride
          </Text>

          <Text style={styles.footerSub}>
             Premium Taxi & Pilgrimage Services •
            Secure Digital Invoice
          </Text>

          <Text style={styles.footerSub}>
            This is a computer generated invoice and
            does not require a signature.
          </Text>
        </View>
      </Page>
    </Document>
  );
}