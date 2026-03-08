import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { products, Product } from "../../lib/data/products";
import { scale, verticalScale } from "../../lib/responsive";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_WIDTH = SCREEN_WIDTH - scale(40);

const CATEGORIES = [
  { label: "All", icon: "grid-outline" as const },
  { label: "Home Kits", icon: "shirt-outline" as const },
  { label: "Training", icon: "fitness-outline" as const },
  { label: "Accessories", icon: "glasses-outline" as const },
  { label: "Lifestyle", icon: "cafe-outline" as const },
  { label: "Goalkeeper", icon: "hand-left-outline" as const },
];

const BANNERS = [
  {
    id: "1",
    title: "Champions League\nCollection",
    subtitle: "Official matchday gear — available now",
    cta: "Shop Now",
    bgColor: "#C8102E",
    accentColor: "#f9b418",
  },
  {
    id: "2",
    title: "New Season\n24/25 Kits",
    subtitle: "Be the first to wear the new colors",
    cta: "Explore",
    bgColor: "#111",
    accentColor: "#f9b418",
  },
  {
    id: "3",
    title: "Up to 30% Off\nTraining Gear",
    subtitle: "Limited-time offer on selected items",
    cta: "View Deals",
    bgColor: "#1a1a1a",
    accentColor: "#C8102E",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeBanner, setActiveBanner] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.categories.includes(selectedCategory));

  const newArrivals = products.filter((p) =>
    ["New", "Pre-order", "Limited Edition"].includes(p.stockLabel ?? "")
  );

  const searchFiltered = searchQuery.trim()
    ? filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  const handleBannerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setActiveBanner(index);
  };

  const navigateToProduct = (id: string) => {
    router.push({ pathname: "/product/[id]", params: { id } });
  };

  const renderNewArrivalCard = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      style={styles.arrivalCard}
      activeOpacity={0.85}
      onPress={() => navigateToProduct(product.id)}
    >
      <Image source={{ uri: product.heroImage }} style={styles.arrivalImage} />
      <View style={styles.arrivalOverlay}>
        {product.stockLabel && (
          <View style={styles.arrivalBadge}>
            <Text style={styles.arrivalBadgeText}>{product.stockLabel}</Text>
          </View>
        )}
      </View>
      <View style={styles.arrivalInfo}>
        <Text style={styles.arrivalTitle} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.arrivalPrice}>
          {product.price.toFixed(2)}{" "}
          <Text style={styles.arrivalCurrency}>{product.currency}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>Oussema</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons
                name="notifications-outline"
                size={scale(20)}
                color="#fff"
              />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={scale(18)} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={scale(18)}
                color="#999"
              />
            </TouchableOpacity>
          )}
          <View style={styles.searchDivider} />
          <TouchableOpacity>
            <Ionicons name="options-outline" size={scale(20)} color="#f9b418" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.label;
            return (
              <TouchableOpacity
                key={cat.label}
                style={[
                  styles.categoryChip,
                  isActive && styles.categoryChipActive,
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedCategory(cat.label)}
              >
                <Ionicons
                  name={cat.icon}
                  size={scale(16)}
                  color={isActive ? "#9b1917" : "#777"}
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    isActive && styles.categoryLabelActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.bannerSection}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={BANNER_WIDTH + scale(12)}
            decelerationRate="fast"
            contentContainerStyle={styles.bannerScroll}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false, listener: handleBannerScroll }
            )}
            scrollEventThrottle={16}
          >
            {BANNERS.map((banner) => (
              <View
                key={banner.id}
                style={[
                  styles.bannerCard,
                  { backgroundColor: banner.bgColor },
                ]}
              >
                <View
                  style={[
                    styles.bannerAccentCircle,
                    { backgroundColor: `${banner.accentColor}20` },
                  ]}
                />
                <View
                  style={[
                    styles.bannerAccentCircleSmall,
                    { backgroundColor: `${banner.accentColor}15` },
                  ]}
                />
                <View style={styles.bannerContent}>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                  <TouchableOpacity
                    style={[
                      styles.bannerCta,
                      { backgroundColor: banner.accentColor },
                    ]}
                  >
                    <Text
                      style={[
                        styles.bannerCtaText,
                        {
                          color:
                            banner.accentColor === "#f9b418"
                              ? "#9b1917"
                              : "#fff",
                        },
                      ]}
                    >
                      {banner.cta}
                    </Text>
                    <Ionicons
                      name="arrow-forward"
                      size={scale(14)}
                      color={
                        banner.accentColor === "#f9b418" ? "#9b1917" : "#fff"
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Animated.ScrollView>

          <View style={styles.dotsRow}>
            {BANNERS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeBanner === index && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {newArrivals.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>New Arrivals</Text>
                <Text style={styles.sectionSubtitle}>
                  Fresh drops you don't want to miss
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.arrivalsScroll}
            >
              {newArrivals.map(renderNewArrivalCard)}
            </ScrollView>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                {selectedCategory === "All"
                  ? "Popular Products"
                  : selectedCategory}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {searchFiltered.length} product
                {searchFiltered.length !== 1 ? "s" : ""} available
              </Text>
            </View>
          </View>

          {searchFiltered.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="search-outline"
                size={scale(48)}
                color="#ddd"
              />
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptySubtitle}>
                Try a different search or category
              </Text>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {searchFiltered.map((item) => (
                <ProductCard
                  key={item.id}
                  title={item.title}
                  price={item.price}
                  currency={item.currency}
                  imageUri={item.heroImage}
                  stockLabel={item.stockLabel}
                  onPress={() => navigateToProduct(item.id)}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#111",
    paddingTop: verticalScale(52),
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
    borderBottomLeftRadius: scale(24),
    borderBottomRightRadius: scale(24),
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  greeting: {
    fontSize: scale(13),
    color: "rgba(255,255,255,0.55)",
    fontWeight: "500",
  },
  userName: {
    fontSize: scale(20),
    fontWeight: "700",
    color: "#fff",
    marginTop: verticalScale(2),
  },
  headerActions: {
    flexDirection: "row",
    gap: scale(10),
  },
  headerBtn: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: scale(14),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    gap: scale(10),
  },
  searchInput: {
    flex: 1,
    fontSize: scale(14),
    color: "#fff",
    paddingVertical: 0,
  },
  searchDivider: {
    width: 1,
    height: scale(20),
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  scrollContent: {
    paddingTop: verticalScale(14),
  },
  categoriesRow: {
    paddingHorizontal: scale(20),
    gap: scale(8),
    paddingBottom: verticalScale(4),
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(9),
    borderRadius: scale(12),
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  categoryChipActive: {
    backgroundColor: "#f9b418",
    elevation: 3,
    shadowOpacity: 0.12,
  },
  categoryLabel: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#777",
  },
  categoryLabelActive: {
    color: "#9b1917",
    fontWeight: "700",
  },
  bannerSection: {
    marginTop: verticalScale(16),
  },
  bannerScroll: {
    paddingHorizontal: scale(20),
  },
  bannerCard: {
    width: BANNER_WIDTH,
    borderRadius: scale(20),
    marginRight: scale(12),
    overflow: "hidden",
    position: "relative",
  },
  bannerAccentCircle: {
    position: "absolute",
    top: -scale(30),
    right: -scale(30),
    width: scale(160),
    height: scale(160),
    borderRadius: scale(80),
  },
  bannerAccentCircleSmall: {
    position: "absolute",
    bottom: -scale(20),
    left: scale(60),
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
  },
  bannerContent: {
    padding: scale(24),
    minHeight: verticalScale(160),
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: scale(24),
    fontWeight: "800",
    color: "#fff",
    lineHeight: scale(30),
    marginBottom: verticalScale(6),
  },
  bannerSubtitle: {
    fontSize: scale(13),
    color: "rgba(255,255,255,0.7)",
    marginBottom: verticalScale(16),
    lineHeight: scale(18),
  },
  bannerCta: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    gap: scale(6),
  },
  bannerCtaText: {
    fontSize: scale(13),
    fontWeight: "700",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(12),
    gap: scale(6),
  },
  dot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(4),
    backgroundColor: "#ddd",
  },
  dotActive: {
    width: scale(22),
    backgroundColor: "#f9b418",
  },
  section: {
    marginTop: verticalScale(22),
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(12),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: "700",
    color: "#1a1a1a",
  },
  sectionSubtitle: {
    fontSize: scale(11),
    color: "#aaa",
    marginTop: verticalScale(2),
  },
  seeAllText: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#f9b418",
  },
  arrivalsScroll: {
    paddingHorizontal: scale(20),
    gap: scale(12),
  },
  arrivalCard: {
    width: scale(150),
    borderRadius: scale(16),
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  arrivalImage: {
    width: "100%",
    height: verticalScale(170),
  },
  arrivalOverlay: {
    position: "absolute",
    top: scale(8),
    left: scale(8),
  },
  arrivalBadge: {
    backgroundColor: "#C8102E",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(6),
  },
  arrivalBadgeText: {
    fontSize: scale(10),
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.3,
  },
  arrivalInfo: {
    padding: scale(10),
  },
  arrivalTitle: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: verticalScale(4),
  },
  arrivalPrice: {
    fontSize: scale(14),
    fontWeight: "800",
    color: "#C8102E",
  },
  arrivalCurrency: {
    fontSize: scale(10),
    fontWeight: "600",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: scale(10),
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: verticalScale(40),
  },
  emptyTitle: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#999",
    marginTop: verticalScale(12),
  },
  emptySubtitle: {
    fontSize: scale(12),
    color: "#ccc",
    marginTop: verticalScale(4),
  },
  bottomSpacer: {
    height: verticalScale(20),
  },
});
