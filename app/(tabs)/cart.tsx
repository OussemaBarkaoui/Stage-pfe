import { Ionicons } from "@expo/vector-icons";
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
import { products } from "../../lib/data/products";

type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};

const INITIAL_CART: CartItem[] = [
  { productId: "1", size: "L", quantity: 1 },
  { productId: "4", size: "TU", quantity: 2 },
  { productId: "5", size: "XL", quantity: 1 },
];

const SHIPPING_FEE = 7.0;
const PROMO_DISCOUNT = 15.0;

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [promoApplied] = useState(true);

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (productId: string) => {
    Alert.alert("Remove Item", "Remove this item from your cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () =>
          setCartItems((prev) =>
            prev.filter((item) => item.productId !== productId)
          ),
      },
    ]);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  const discount = promoApplied ? PROMO_DISCOUNT : 0;
  const total = subtotal + SHIPPING_FEE - discount;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyScreen}>
        <View style={styles.emptyIconWrap}>
          <Ionicons name="cart-outline" size={scale(64)} color="#ddd" />
        </View>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Explore our collection and add your favorite Taraji gear
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {cartItems.map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;

          return (
            <View key={item.productId} style={styles.cartItem}>
              <Image
                source={{ uri: product.heroImage }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <View style={styles.itemTopRow}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeItem(item.productId)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={scale(18)}
                      color="#C8102E"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.itemMeta}>
                  <View style={styles.sizeBadge}>
                    <Text style={styles.sizeLabel}>Size: {item.size}</Text>
                  </View>
                  {product.stockLabel && (
                    <Text style={styles.stockLabel}>{product.stockLabel}</Text>
                  )}
                </View>

                <View style={styles.itemBottomRow}>
                  <Text style={styles.itemPrice}>
                    {(product.price * item.quantity).toFixed(2)}{" "}
                    <Text style={styles.itemCurrency}>{product.currency}</Text>
                  </Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQuantity(item.productId, -1)}
                    >
                      <Ionicons
                        name="remove"
                        size={scale(16)}
                        color="#333"
                      />
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={[styles.qtyBtn, styles.qtyBtnPlus]}
                      onPress={() => updateQuantity(item.productId, 1)}
                    >
                      <Ionicons name="add" size={scale(16)} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}

        {promoApplied && (
          <View style={styles.promoCard}>
            <Ionicons name="pricetag" size={scale(18)} color="#2e7d32" />
            <View style={styles.promoTextWrap}>
              <Text style={styles.promoTitle}>TARAJI15 applied</Text>
              <Text style={styles.promoSub}>
                You save {PROMO_DISCOUNT.toFixed(2)} TND
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="close-circle"
                size={scale(20)}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal ({itemCount} items)
            </Text>
            <Text style={styles.summaryValue}>{subtotal.toFixed(2)} TND</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {SHIPPING_FEE.toFixed(2)} TND
            </Text>
          </View>

          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.discountLabel]}>
                Promo Discount
              </Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>
                -{discount.toFixed(2)} TND
              </Text>
            </View>
          )}

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} TND</Text>
          </View>
        </View>

        <View style={styles.guaranteeRow}>
          <Ionicons
            name="shield-checkmark-outline"
            size={scale(16)}
            color="#2e7d32"
          />
          <Text style={styles.guaranteeText}>
            Secure checkout & 14-day return guarantee
          </Text>
        </View>

        <View style={styles.scrollBottomSpacer} />
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View style={styles.checkoutLeft}>
          <Text style={styles.checkoutTotalLabel}>Total</Text>
          <Text style={styles.checkoutTotal}>{total.toFixed(2)} TND</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
          <Text style={styles.checkoutBtnText}>Checkout</Text>
          <Ionicons
            name="arrow-forward"
            size={scale(18)}
            color="#9b1917"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  headerBadge: {
    backgroundColor: "rgba(249,180,24,0.18)",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: scale(12),
  },
  headerBadgeText: {
    fontSize: scale(12),
    fontWeight: "600",
    color: "#f9b418",
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: verticalScale(16),
    paddingHorizontal: scale(20),
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: scale(16),
    marginBottom: verticalScale(12),
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  itemImage: {
    width: scale(105),
    height: "100%",
    minHeight: verticalScale(130),
  },
  itemDetails: {
    flex: 1,
    padding: scale(12),
    justifyContent: "space-between",
  },
  itemTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: scale(8),
  },
  itemTitle: {
    fontSize: scale(13),
    fontWeight: "700",
    color: "#1a1a1a",
    flex: 1,
    lineHeight: scale(18),
  },
  itemMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    marginTop: verticalScale(6),
  },
  sizeBadge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(6),
  },
  sizeLabel: {
    fontSize: scale(11),
    fontWeight: "600",
    color: "#555",
  },
  stockLabel: {
    fontSize: scale(10),
    fontWeight: "600",
    color: "#2e7d32",
  },
  itemBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(8),
  },
  itemPrice: {
    fontSize: scale(15),
    fontWeight: "800",
    color: "#C8102E",
  },
  itemCurrency: {
    fontSize: scale(11),
    fontWeight: "600",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(2),
  },
  qtyBtn: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(8),
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnPlus: {
    backgroundColor: "#1a1a1a",
  },
  qtyValue: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#1a1a1a",
    minWidth: scale(28),
    textAlign: "center",
  },
  promoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(46,125,50,0.06)",
    borderRadius: scale(12),
    padding: scale(14),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: "rgba(46,125,50,0.15)",
    gap: scale(10),
  },
  promoTextWrap: {
    flex: 1,
  },
  promoTitle: {
    fontSize: scale(13),
    fontWeight: "700",
    color: "#2e7d32",
  },
  promoSub: {
    fontSize: scale(11),
    color: "#666",
    marginTop: verticalScale(1),
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: scale(16),
    padding: scale(18),
    marginBottom: verticalScale(12),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: scale(15),
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: verticalScale(14),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
  },
  summaryLabel: {
    fontSize: scale(13),
    color: "#888",
  },
  summaryValue: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#333",
  },
  discountLabel: {
    color: "#2e7d32",
  },
  discountValue: {
    color: "#2e7d32",
    fontWeight: "700",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: verticalScale(6),
  },
  totalLabel: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#1a1a1a",
  },
  totalValue: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#C8102E",
  },
  guaranteeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(6),
    marginBottom: verticalScale(8),
  },
  guaranteeText: {
    fontSize: scale(11),
    color: "#888",
  },
  scrollBottomSpacer: {
    height: verticalScale(20),
  },
  checkoutBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(14),
    paddingBottom: verticalScale(28),
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  checkoutLeft: {},
  checkoutTotalLabel: {
    fontSize: scale(11),
    color: "#888",
    fontWeight: "500",
  },
  checkoutTotal: {
    fontSize: scale(20),
    fontWeight: "800",
    color: "#1a1a1a",
  },
  checkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9b418",
    paddingHorizontal: scale(28),
    paddingVertical: verticalScale(14),
    borderRadius: scale(14),
    gap: scale(8),
    elevation: 4,
    shadowColor: "#f9b418",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  checkoutBtnText: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#9b1917",
  },
  emptyScreen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(40),
  },
  emptyIconWrap: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(24),
  },
  emptyTitle: {
    fontSize: scale(22),
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: verticalScale(8),
  },
  emptySubtitle: {
    fontSize: scale(14),
    color: "#aaa",
    textAlign: "center",
    lineHeight: scale(20),
  },
});
