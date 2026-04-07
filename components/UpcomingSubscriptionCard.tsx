import { formatCurrency } from "@/lib/utils";
import React from "react";
import { Image, Text, View } from "react-native";

interface UpcomingSubscriptionCardProps {
  data: {
    name: string;
    price: number;
    currency?: string;
    daysLeft: number;
    icon: any;
  };
}

const UpcomingSubscriptionCard = ({ data: { name, price, currency = "USD", daysLeft, icon } }: UpcomingSubscriptionCardProps) => {
  const getDaysText = () => {
    if (daysLeft > 1) {
      return `${daysLeft} days left`;
    } else if (daysLeft === 1) {
      return `${daysLeft} day left`;
    } else if (daysLeft === 0) {
      return `Due today`;
    } else {
      return `${Math.abs(daysLeft)} days overdue`;
    }
  };

  const getDaysTextStyle = () => {
    if (daysLeft < 0) {
      return "text-red-500"; // Overdue - red color
    } else if (daysLeft === 0) {
      return "text-orange-500"; // Due today - orange color
    }
    return "upcoming-meta"; // Upcoming - default style
  };

  return (
    <View className="upcoming-card">
      <View className="flex-row justify-between items-start">
        <View className="items-center">
          <Image source={icon} className="upcoming-icon" />
          <Text className="upcoming-name">{name}</Text>
        </View>
        <View className="items-start ml-2">
          <Text className="upcoming-price">{formatCurrency(price, currency)}</Text>
          <Text className={getDaysTextStyle()} numberOfLines={1}>
            {getDaysText()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UpcomingSubscriptionCard;