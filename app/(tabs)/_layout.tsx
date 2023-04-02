import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Logo from '../../components/Logo';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        headerStyle: { backgroundColor: Colors.blue.dark},
        headerTintColor:"white" ,
        headerTitleStyle:{fontSize:20}
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Designs',
          tabBarIcon: ({ color }) => <Entypo name="home" size={20} color={Colors.red.reg}/>,
          headerRight: () => (
            <Link href="/FAQ" asChild>
              <Pressable>
                {({ pressed }) => (
                  <AntDesign name="questioncircleo" size={20} color={"white"} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1,fontSize:pressed ? 24:20, }} />
                )}
              </Pressable>
            </Link>
          ),
          headerBackground: () => <Logo />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact US',
          tabBarIcon: ({ color }) => <MaterialIcons name="contact-page" size={20} color={Colors.blue.reg}  />,
        }}
      />
      
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Vidoes',
          tabBarIcon: ({ color }) => <Entypo name="video" size={20} color={Colors.green.light} />,
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: 'Packages',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="package" size={20} color={Colors.yellow.dark} />,
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: 'Blogs',
          tabBarIcon: ({ color }) => <FontAwesome5 name="blogger" size={20} color={Colors.teal.medium} />,
        }}
      />
    </Tabs>
  );
}
