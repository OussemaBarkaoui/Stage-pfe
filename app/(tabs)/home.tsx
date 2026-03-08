import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import ProductCard from "../components/ProductCard";
import { products } from "../../lib/data/products";
import { scale, verticalScale } from "../../lib/responsive";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topPlaceholder} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            currency={item.currency}
            imageUri={item.heroImage}
            stockLabel={item.stockLabel}
            onPress={() =>
              router.push({ pathname: "/product/[id]", params: { id: item.id } })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topPlaceholder: {
    height: verticalScale(120),
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
    paddingTop: verticalScale(8),
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
  },
});
