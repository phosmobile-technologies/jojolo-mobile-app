import React, { ComponentType } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLORS } from "../../../constants";

export interface InPageTabsRoute {
  key: string;
  title: string;
}

export interface InPageTabsComponentProps {
  tabRoutes: InPageTabsRoute[];
  sceneMap: { [key: string]: ComponentType };
}

/**
 * Component used to create in page tabs that do not rely on navigation
 *
 * @returns
 */
const InPageTabs = (props: InPageTabsComponentProps) => {
  const { tabRoutes, sceneMap } = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState(tabRoutes);
  const renderScene = SceneMap(sceneMap);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      inactiveColor={COLORS.APP_GRAY_TEXT}
      activeColor={COLORS.APP_PRIMARY_COLOR}
      labelStyle={styles.tabBarLabel}
      pressColor={COLORS.TRANSPARENT}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      sceneContainerStyle={styles.sceneContainer}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.TRANSPARENT,
    elevation: 0,
    borderColor: COLORS.TRANSPARENT,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.APP_GRAY_BACKGROUND,
  },

  indicator: {
    backgroundColor: COLORS.APP_PRIMARY_COLOR,
    height: 4,
    borderRadius: 5,
  },

  sceneContainer: {
    paddingTop: 20,
  },

  tabBarLabel: {
    fontSize: 12,
  },
});

export default InPageTabs;
