import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from "@/lib/utils";
import { clsx } from "clsx";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface SubscriptionCardProps {
  id: string;
  name: string;
  price: number;
  currency?: string;
  icon: any;
  billing: string;
  color?: string;
  renewalDate?: string;
  category?: string;
  plan?: string;
  paymentMethod?: string;
  status?: string;
  expanded?: boolean;
  onPress?: () => void;
}

const SubscriptionCard = ({
  id,
  name,
  price,
  currency = "USD",
  icon,
  billing,
  color,
  renewalDate,
  category,
  plan,
  paymentMethod,
  status,
  expanded,
  onPress,
}: SubscriptionCardProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={clsx("sub-card", "bg-card", expanded && "expanded")}
      style={{
        backgroundColor: expanded ? (color || "#f3f4f6") : (color ? color : undefined),
        opacity: expanded ? 0.9 : 1,
        transform: [{ scale: expanded ? 0.98 : 1 }],
      }}
    >
      <View className="sub-head flex-row">
        <Image source={icon} className="sub-icon" />
        <View className="sub-copy ml-4">
          <Text numberOfLines={1} className="sub-title">{name}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="sub-meta"
          >
            {category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate) : "")}
          </Text>
        </View>
        <View className="sub-price-box">
          <Text numberOfLines={1} className="sub-price">{formatCurrency(price, currency)}</Text>
          <Text numberOfLines={1} className="sub-billing">{billing}</Text>
        </View>
      </View>
      {expanded && (
        <View className="sub-body">
          <View className="sub-details">
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Payment:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {paymentMethod?.trim()}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Category:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {category?.trim()}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Renewal Date:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {renewalDate ? formatSubscriptionDateTime(renewalDate) : ""}
                </Text>
              </View>
            </View>
            <View className="sub-row">
              <View className="sub-row-copy">
                <Text className="sub-label">Status:</Text>
                <Text
                  className="sub-value"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {status ? formatStatusLabel(status) : ""}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default SubscriptionCard;