import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "../../lib/responsive";

type Transaction = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  icon: keyof typeof Ionicons.glyphMap;
};

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Order #TST-4821",
    description: "Champions League Jersey",
    amount: -149.9,
    date: "Mar 6, 2026",
    type: "debit",
    icon: "shirt-outline",
  },
  {
    id: "2",
    title: "Wallet Top Up",
    description: "Via Visa •••• 4532",
    amount: 300.0,
    date: "Mar 4, 2026",
    type: "credit",
    icon: "arrow-down-circle-outline",
  },
  {
    id: "3",
    title: "Cashback Reward",
    description: "5% on last purchase",
    amount: 7.5,
    date: "Mar 2, 2026",
    type: "credit",
    icon: "gift-outline",
  },
  {
    id: "4",
    title: "Order #TST-4799",
    description: "Retro Scarf",
    amount: -59.9,
    date: "Feb 28, 2026",
    type: "debit",
    icon: "shirt-outline",
  },
  {
    id: "5",
    title: "Points Redemption",
    description: "500 pts → 5.00 TND",
    amount: 5.0,
    date: "Feb 25, 2026",
    type: "credit",
    icon: "star-outline",
  },
  {
    id: "6",
    title: "Order #TST-4765",
    description: "Matchday Hoodie",
    amount: -179.0,
    date: "Feb 20, 2026",
    type: "debit",
    icon: "shirt-outline",
  },
];

const QUICK_ACTIONS = [
  { icon: "add-circle-outline" as const, label: "Top Up", color: "#2e7d32" },
  { icon: "swap-horizontal-outline" as const, label: "Transfer", color: "#1565c0" },
  { icon: "time-outline" as const, label: "History", color: "#f9b418" },
  { icon: "qr-code-outline" as const, label: "Scan", color: "#C8102E" },
];

export default function WalletScreen() {
  const [balance] = useState(923.7);
  const [loyaltyPoints] = useState(2450);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Ionicons
            name="notifications-outline"
            size={scale(22)}
            color="#fff"
          />
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceCardAccent} />
        <View style={styles.balanceContent}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>{balance.toFixed(2)}</Text>
            <Text style={styles.balanceCurrency}>TND</Text>
          </View>
          <View style={styles.cardFooter}>
            <View style={styles.cardChip}>
              <View style={styles.chipLine} />
              <View style={styles.chipLine} />
              <View style={styles.chipLine} />
            </View>
            <Text style={styles.cardNumber}>•••• •••• •••• 4532</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActionsRow}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={styles.quickAction}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.quickActionIcon,
                { backgroundColor: `${action.color}14` },
              ]}
            >
              <Ionicons
                name={action.icon}
                size={scale(22)}
                color={action.color}
              />
            </View>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.loyaltyCard}>
        <View style={styles.loyaltyLeft}>
          <View style={styles.loyaltyIconWrap}>
            <Ionicons name="star" size={scale(20)} color="#f9b418" />
          </View>
          <View>
            <Text style={styles.loyaltyTitle}>Loyalty Points</Text>
            <Text style={styles.loyaltySubtitle}>
              Earn points with every purchase
            </Text>
          </View>
        </View>
        <View style={styles.loyaltyRight}>
          <Text style={styles.loyaltyPoints}>
            {loyaltyPoints.toLocaleString()}
          </Text>
          <Text style={styles.loyaltyPts}>pts</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Gold Tier Progress</Text>
          <Text style={styles.progressValue}>2,450 / 5,000</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: "49%" }]} />
        </View>
        <Text style={styles.progressHint}>
          Earn 2,550 more points to unlock Gold tier benefits
        </Text>
      </View>

      <View style={styles.transactionsSection}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {TRANSACTIONS.map((tx, index) => (
          <View
            key={tx.id}
            style={[
              styles.transactionItem,
              index < TRANSACTIONS.length - 1 && styles.transactionBorder,
            ]}
          >
            <View
              style={[
                styles.txIcon,
                {
                  backgroundColor:
                    tx.type === "credit"
                      ? "rgba(46,125,50,0.1)"
                      : "rgba(200,16,46,0.08)",
                },
              ]}
            >
              <Ionicons
                name={tx.icon}
                size={scale(18)}
                color={tx.type === "credit" ? "#2e7d32" : "#C8102E"}
              />
            </View>
            <View style={styles.txContent}>
              <Text style={styles.txTitle}>{tx.title}</Text>
              <Text style={styles.txDescription}>{tx.description}</Text>
            </View>
            <View style={styles.txRight}>
              <Text
                style={[
                  styles.txAmount,
                  { color: tx.type === "credit" ? "#2e7d32" : "#C8102E" },
                ]}
              >
                {tx.type === "credit" ? "+" : ""}
                {tx.amount.toFixed(2)}
              </Text>
              <Text style={styles.txDate}>{tx.date}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: verticalScale(30),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(55),
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(16),
    backgroundColor: "#111",
  },
  headerTitle: {
    fontSize: scale(22),
    fontWeight: "700",
    color: "#fff",
  },
  bellBtn: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bellDot: {
    position: "absolute",
    top: scale(8),
    right: scale(9),
    width: scale(8),
    height: scale(8),
    borderRadius: scale(4),
    backgroundColor: "#C8102E",
    borderWidth: 1.5,
    borderColor: "#111",
  },
  balanceCard: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(-1),
    borderRadius: scale(20),
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  balanceCardAccent: {
    position: "absolute",
    top: -scale(40),
    right: -scale(40),
    width: scale(140),
    height: scale(140),
    borderRadius: scale(70),
    backgroundColor: "rgba(249,180,24,0.12)",
  },
  balanceContent: {
    padding: scale(24),
  },
  balanceLabel: {
    fontSize: scale(13),
    color: "rgba(255,255,255,0.55)",
    fontWeight: "500",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: verticalScale(6),
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: verticalScale(24),
  },
  balanceAmount: {
    fontSize: scale(36),
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.5,
  },
  balanceCurrency: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#f9b418",
    marginLeft: scale(8),
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardChip: {
    width: scale(32),
    height: scale(24),
    borderRadius: scale(4),
    backgroundColor: "rgba(249,180,24,0.35)",
    justifyContent: "center",
    paddingHorizontal: scale(4),
    gap: scale(3),
  },
  chipLine: {
    height: 1.5,
    backgroundColor: "rgba(249,180,24,0.6)",
    borderRadius: 1,
  },
  cardNumber: {
    fontSize: scale(13),
    color: "rgba(255,255,255,0.4)",
    fontWeight: "500",
    letterSpacing: 2,
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  quickAction: {
    alignItems: "center",
    flex: 1,
  },
  quickActionIcon: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(6),
  },
  quickActionLabel: {
    fontSize: scale(11),
    fontWeight: "600",
    color: "#555",
  },
  loyaltyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
    backgroundColor: "#fff",
    borderRadius: scale(16),
    padding: scale(16),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  loyaltyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },
  loyaltyIconWrap: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: "rgba(249,180,24,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  loyaltyTitle: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#1a1a1a",
  },
  loyaltySubtitle: {
    fontSize: scale(11),
    color: "#aaa",
    marginTop: verticalScale(1),
  },
  loyaltyRight: {
    alignItems: "flex-end",
  },
  loyaltyPoints: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#f9b418",
  },
  loyaltyPts: {
    fontSize: scale(11),
    color: "#aaa",
    fontWeight: "500",
  },
  progressSection: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(16),
    backgroundColor: "#fff",
    borderRadius: scale(16),
    padding: scale(16),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  progressLabel: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#1a1a1a",
  },
  progressValue: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#888",
  },
  progressTrack: {
    height: verticalScale(8),
    backgroundColor: "#f0f0f0",
    borderRadius: scale(4),
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#f9b418",
    borderRadius: scale(4),
  },
  progressHint: {
    fontSize: scale(11),
    color: "#aaa",
    marginTop: verticalScale(8),
  },
  transactionsSection: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  transactionsTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#1a1a1a",
  },
  seeAllText: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#f9b418",
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
  },
  transactionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  txIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  txContent: {
    flex: 1,
  },
  txTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: verticalScale(2),
  },
  txDescription: {
    fontSize: scale(11),
    color: "#aaa",
  },
  txRight: {
    alignItems: "flex-end",
  },
  txAmount: {
    fontSize: scale(15),
    fontWeight: "700",
    marginBottom: verticalScale(2),
  },
  txDate: {
    fontSize: scale(10),
    color: "#bbb",
  },
  bottomSpacer: {
    height: verticalScale(10),
  },
});
