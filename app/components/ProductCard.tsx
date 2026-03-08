import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { responsiveFontSize, scale, verticalScale } from "../../lib/responsive";

export type ProductCardProps = {
  title: string;
  price: number | string;
  currency?: string;
  imageUri: string;
  stockLabel?: string;
  isFavorite?: boolean;
  onPressFavorite?: () => void;
  onPress?: () => void;
};

export default function ProductCard({
  title,
  price,
  currency = "TND",
  imageUri,
  stockLabel = "En Stock",
  isFavorite = false,
  onPressFavorite,
  onPress,
}: ProductCardProps) {
  const formattedPrice =
    typeof price === "number" ? price.toFixed(2) : String(price);

  return (
    <Card
      style={styles.card}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`${title} ${formattedPrice} ${currency}`}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        {stockLabel ? (
          <View style={styles.stockBadge}>
            <Text style={styles.stockText}>{stockLabel}</Text>
          </View>
        ) : null}
        <Ionicons
          name={isFavorite ? "star" : "star-outline"}
          size={scale(24)}
          color="#f9b418"
          style={styles.favorite}
          onPress={onPressFavorite}
        />
      </View>

      <Card.Content>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formattedPrice}</Text>
          <Text style={styles.currency}> {currency}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: scale(170),
    borderRadius: scale(16),
    margin: scale(10),
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    height: verticalScale(200),
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
  },
  stockBadge: {
    position: "absolute",
    bottom: verticalScale(10),
    left: scale(10),
    backgroundColor: "#5cb85c",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(10),
  },
  stockText: {
    color: "#fff",
    fontSize: responsiveFontSize(12),
  },
  favorite: {
    position: "absolute",
    top: verticalScale(10),
    right: scale(10),
  },
  title: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(16),
    marginTop: verticalScale(10),
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(5),
  },
  price: {
    fontSize: responsiveFontSize(20),
    fontWeight: "bold",
  },
  currency: {
    fontSize: responsiveFontSize(14),
    marginLeft: scale(4),
  },
});
