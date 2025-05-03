import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { router } from "expo-router";

const Profile = () => {
  // Temporary hardcoded values — replace with real user data
  const user = {
    name: "Leo",
    email: "leo@gmail.com",
    avatar: images.avatar,
    savedCount: 12,
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="items-center mt-12">
          <Image
            source={user.avatar}
            className="w-24 h-24 rounded-full border-2 border-accent"
          />
          <Text className="text-white font-bold text-xl mt-4">
            {user.name}
          </Text>
          <Text className="text-light-200 text-sm mt-1">{user.email}</Text>
        </View>

        <View className="mt-10 px-5 space-y-6">
          <View className="bg-dark-100 p-5 rounded-lg">
            <Text className="text-white font-semibold text-lg">Interest</Text>
            <Text className="text-light-200 mt-2 text-sm">
              Sci-fi, Thriller, Animation, Drama
            </Text>
          </View>

          <View className="bg-dark-100 p-5 rounded-lg mt-8">
            <Text className="text-white font-semibold text-lg">Watched Movies</Text>
            <Text className="text-light-200 mt-2 text-sm">
              You’ve watched 84 movies so far.
            </Text>
          </View>

          <View className="bg-dark-100 p-5 rounded-lg mt-8">
            <Text className="text-white font-semibold text-lg">Settings</Text>
            <Text className="text-light-200 mt-2 text-sm">
              Notifications, Theme, Account Preferences
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
