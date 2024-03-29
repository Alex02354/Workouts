import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import React from "react"
import NewPlanInput from "../../components/NewPlanInput"
import PlansList from "../../components/PlansList"
import ProgressBar from "../../components/ProgressBar"

const planner = () => {
  return (
    <View style={styles.container}>
      <NewPlanInput />
      <PlansList />
      
    </View>
  )
}

export default planner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
})
