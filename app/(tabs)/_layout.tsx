import { NativeTabs, Icon, Label, Badge } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabLayout() {

  return (
    <NativeTabs>
          <NativeTabs.Trigger name="index">
            <Label>ደጀን</Label>
            <Icon sf={"house.fill"} 
            drawable="ic_menu_mylocation" />
          </NativeTabs.Trigger>

          <NativeTabs.Trigger name="translate">
            <Label>ትርጉም</Label>
            <Icon sf={"paperplane.fill"} 
            drawable="ic_menu_manage" />
          </NativeTabs.Trigger>
          

          <NativeTabs.Trigger name="dictionary">
            <Label>መዝገብ</Label>
            <Icon sf={"paperplane.fill"} 
            drawable="ic_menu_manage" />
          </NativeTabs.Trigger>
    

          
    </NativeTabs>
  );
}
