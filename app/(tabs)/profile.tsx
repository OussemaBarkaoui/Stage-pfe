import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "../../lib/responsive";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle: string;
  onPress: () => void;
};

const USER = {
  firstName: "Oussema",
  lastName: "Ben Ali",
  email: "oussema.benali@taraji.tn",
  phone: "+216 55 123 456",
  memberSince: "Jan 2024",
  avatar: null as string | null,
};

const STATS = [
  { label: "Orders", value: "12" },
  { label: "Wishlist", value: "8" },
  { label: "Points", value: "2,450" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const initials = `${USER.firstName[0]}${USER.lastName[0]}`;

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: "My Account",
      items: [
        {
          icon: "receipt-outline",
          label: "My Orders",
          subtitle: "Track & manage your orders",
          onPress: () => {},
        },
        {
          icon: "location-outline",
          label: "Shipping Addresses",
          subtitle: "Manage delivery addresses",
          onPress: () => {},
        },
        {
          icon: "card-outline",
          label: "Payment Methods",
          subtitle: "Cards & saved payments",
          onPress: () => {},
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: "notifications-outline",
          label: "Notifications",
          subtitle: notificationsEnabled ? "Enabled" : "Disabled",
          onPress: () => setNotificationsEnabled((prev) => !prev),
        },
        {
          icon: "language-outline",
          label: "Language",
          subtitle: "English",
          onPress: () => {},
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: "help-circle-outline",
          label: "Help & Support",
          subtitle: "FAQs, contact us",
          onPress: () => {},
        },
        {
          icon: "shield-checkmark-outline",
          label: "Privacy Policy",
          subtitle: "Data & security",
          onPress: () => {},
        },
        {
          icon: "information-circle-outline",
          label: "About TarajiMobile",
          subtitle: "Version 1.0.0",
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={scale(22)} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarSection}>
          {USER.avatar ? (
            <Image source={{ uri: USER.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.editAvatarBtn}>
            <Ionicons name="camera" size={scale(14)} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>
          {USER.firstName} {USER.lastName}
        </Text>
        <Text style={styles.userEmail}>{USER.email}</Text>
        <Text style={styles.memberBadge}>
          Member since {USER.memberSince}
        </Text>
      </View>

      <View style={styles.statsRow}>
        {STATS.map((stat, index) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            {index < STATS.length - 1 && <View style={styles.statDivider} />}
          </View>
        ))}
      </View>

      {menuSections.map((section) => (
        <View key={section.title} style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.menuItem,
                  index < section.items.length - 1 && styles.menuItemBorder,
                ]}
                activeOpacity={0.6}
                onPress={item.onPress}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons
                    name={item.icon}
                    size={scale(20)}
                    color="#f9b418"
                  />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={scale(18)}
                  color="#ccc"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.8}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={scale(20)} color="#C8102E" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

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
    backgroundColor: "#111",
    paddingTop: verticalScale(55),
    paddingBottom: verticalScale(30),
    paddingHorizontal: scale(24),
    alignItems: "center",
    borderBottomLeftRadius: scale(28),
    borderBottomRightRadius: scale(28),
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(20),
  },
  headerTitle: {
    fontSize: scale(22),
    fontWeight: "700",
    color: "#fff",
  },
  settingsBtn: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSection: {
    position: "relative",
    marginBottom: verticalScale(12),
  },
  avatar: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: 3,
    borderColor: "#f9b418",
  },
  avatarPlaceholder: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    backgroundColor: "#f9b418",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(249,180,24,0.4)",
  },
  avatarInitials: {
    fontSize: scale(32),
    fontWeight: "800",
    color: "#9b1917",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: -2,
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: "#C8102E",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#111",
  },
  userName: {
    fontSize: scale(20),
    fontWeight: "700",
    color: "#fff",
    marginBottom: verticalScale(2),
  },
  userEmail: {
    fontSize: scale(13),
    color: "rgba(255,255,255,0.65)",
    marginBottom: verticalScale(8),
  },
  memberBadge: {
    fontSize: scale(11),
    color: "#f9b418",
    fontWeight: "600",
    backgroundColor: "rgba(249,180,24,0.15)",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
    overflow: "hidden",
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: scale(20),
    marginTop: verticalScale(-18),
    borderRadius: scale(16),
    paddingVertical: verticalScale(16),
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  statValue: {
    fontSize: scale(18),
    fontWeight: "800",
    color: "#111",
    marginBottom: verticalScale(2),
  },
  statLabel: {
    fontSize: scale(11),
    color: "#888",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statDivider: {
    position: "absolute",
    right: 0,
    top: "15%",
    height: "70%",
    width: 1,
    backgroundColor: "#eee",
  },
  menuSection: {
    marginTop: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    fontSize: scale(13),
    fontWeight: "700",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: verticalScale(8),
    marginLeft: scale(4),
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: scale(16),
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  menuIconContainer: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(10),
    backgroundColor: "rgba(249,180,24,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: verticalScale(1),
  },
  menuSubtitle: {
    fontSize: scale(12),
    color: "#aaa",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(28),
    marginHorizontal: scale(20),
    paddingVertical: verticalScale(14),
    borderRadius: scale(14),
    borderWidth: 1.5,
    borderColor: "#C8102E",
    backgroundColor: "rgba(200,16,46,0.04)",
    gap: scale(8),
  },
  logoutText: {
    fontSize: scale(15),
    fontWeight: "700",
    color: "#C8102E",
  },
  bottomSpacer: {
    height: verticalScale(10),
  },
});
