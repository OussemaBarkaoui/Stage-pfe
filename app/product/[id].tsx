import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useCallback, useRef } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { products } from '../../lib/data/products';
import { scale, verticalScale } from '../../lib/responsive';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.82;
const DISMISS_THRESHOLD = 80;
const OVERSCROLL_DISMISS = 55;

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((p) => p.id === id);

  const translateY = useRef(new Animated.Value(0)).current;

  const dismiss = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home');
    }
  }, [router]);

  const closeSheet = useCallback(() => {
    Animated.timing(translateY, {
      toValue: SHEET_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => dismiss());
  }, [dismiss, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dy, vy } = gestureState;
        if (dy > DISMISS_THRESHOLD || vy > 0.3) {
          closeSheet();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 80,
            friction: 12,
          }).start();
        }
      },
    })
  ).current;

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y;
      if (y < -OVERSCROLL_DISMISS) {
        closeSheet();
      }
    },
    [closeSheet]
  );

  return (
    <View style={styles.root}>
      {/* Tap the dim backdrop to dismiss */}
      <TouchableWithoutFeedback onPress={dismiss}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Bottom sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Drag handle - drag down to dismiss */}
        <View style={styles.handleWrapper} {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>

        {!product ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>Product not found.</Text>
            <TouchableOpacity onPress={dismiss}>
              <Text style={styles.backLink}>Go back</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <Image
              source={{ uri: product.heroImage }}
              style={styles.heroImage}
            />

            <View style={styles.body}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.sku}>SKU: {product.sku}</Text>

              <Text style={styles.price}>
                {product.price.toFixed(2)}{' '}
                <Text style={styles.currency}>{product.currency}</Text>
              </Text>

              {product.stockLabel ? (
                <Text style={styles.stock}>{product.stockLabel}</Text>
              ) : null}

              <Text style={styles.sectionLabel}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>

              {product.sizes.length > 0 && (
                <>
                  <Text style={styles.sectionLabel}>Sizes</Text>
                  <View style={styles.sizeRow}>
                    {product.sizes.map((size) => (
                      <View key={size} style={styles.sizeChip}>
                        <Text style={styles.sizeText}>{size}</Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    overflow: 'hidden',
  },
  handleWrapper: {
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  handle: {
    width: scale(40),
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: { fontSize: scale(16), color: '#333' },
  backLink: {
    marginTop: verticalScale(8),
    fontSize: scale(14),
    color: '#C8102E',
  },
  content: {
    paddingBottom: verticalScale(40),
  },
  heroImage: {
    width: '100%',
    height: verticalScale(260),
    resizeMode: 'cover',
  },
  body: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(14),
  },
  title: {
    fontSize: scale(18),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: verticalScale(3),
  },
  sku: {
    fontSize: scale(11),
    color: '#aaa',
    marginBottom: verticalScale(8),
  },
  price: {
    fontSize: scale(22),
    fontWeight: '800',
    color: '#C8102E',
    marginBottom: verticalScale(3),
  },
  currency: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#C8102E',
  },
  stock: {
    fontSize: scale(13),
    color: '#2e7d32',
    marginBottom: verticalScale(10),
  },
  sectionLabel: {
    fontSize: scale(12),
    fontWeight: '700',
    color: '#555',
    marginTop: verticalScale(14),
    marginBottom: verticalScale(6),
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  description: {
    fontSize: scale(14),
    color: '#555',
    lineHeight: scale(21),
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  sizeChip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: scale(6),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
  },
  sizeText: {
    fontSize: scale(13),
    color: '#333',
    fontWeight: '600',
  },
  addButton: {
    marginTop: verticalScale(22),
    backgroundColor: '#C8102E',
    borderRadius: scale(10),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: scale(15),
    fontWeight: '700',
  },
});
