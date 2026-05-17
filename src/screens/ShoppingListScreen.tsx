import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Share } from 'react-native';
import { Text, Button, Checkbox, Card } from 'react-native-paper';
import { useMealPlan } from '../context/MealPlanContext';
import { ShoppingListItem } from '../types';
import { colors } from '../theme';

const ShoppingListScreen: React.FC<any> = ({ navigation }) => {
  const { generateShoppingList, updateShoppingListItem, portions } = useMealPlan();
  const [shoppingList] = useState(() => generateShoppingList());

  const categories: ShoppingListItem['category'][] = ['produce', 'proteins', 'dairy', 'pantry', 'other'];
  const categoryLabels = {
    produce: '🧭 Produce',
    proteins: '🥩 Proteins',
    dairy: '🥛 Dairy & Eggs',
    pantry: '🌾 Pantry',
    other: '📦 Other',
  };

  const handleCopyList = async () => {
    const listText = shoppingList
      .map(item => `${item.name} x${item.multiplier} (${item.quantity})`)
      .join('\n');
    await Share.share({
      message: `Shopping List for ${portions} portions:\n\n${listText}`,
      title: 'MealForge Shopping List',
    });
  };

  const ShoppingListRow = ({ item }: { item: ShoppingListItem }) => (
    <View style={styles.listRow}>
      <Checkbox
        status={item.checked ? 'checked' : 'unchecked'}
        onPress={() => updateShoppingListItem(item.id, !item.checked)}
        color={colors.orange}
      />
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, item.checked && styles.itemChecked]}>
          {item.name}
        </Text>
        <Text style={styles.itemQuantity}>×{item.multiplier} ({item.quantity})</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        <Text style={styles.subtitle}>{portions} portions</Text>
      </View>

      <ScrollView style={styles.content}>
        {categories.map(category => {
          const itemsInCategory = shoppingList.filter(item => item.category === category);
          if (itemsInCategory.length === 0) return null;

          return (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryHeader}>{categoryLabels[category]}</Text>
              {itemsInCategory.map(item => (
                <ShoppingListRow key={item.id} item={item} />
              ))}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.bottomActions}>
        <Button
          mode="contained"
          onPress={handleCopyList}
          style={styles.shareButton}
          labelStyle={styles.buttonLabel}
          icon="share-variant"
        >
          Share List
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CookMode')}
          style={styles.cookButton}
          labelStyle={styles.buttonLabel}
          icon="chef-hat"
        >
          Cook Mode
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.muted,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.orange,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  itemInfo: {
    marginLeft: 8,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },
  itemChecked: {
    textDecorationLine: 'line-through',
    color: colors.muted,
  },
  itemQuantity: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  shareButton: {
    flex: 1,
    backgroundColor: colors.orange,
    borderRadius: 4,
  },
  cookButton: {
    flex: 1,
    backgroundColor: colors.green,
    borderRadius: 4,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default ShoppingListScreen;