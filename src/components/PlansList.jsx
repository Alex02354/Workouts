import React, { useEffect } from "react"
import { View, Text, ActivityIndicator, FlatList } from "react-native"
import { gql } from "graphql-request"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import client from "../graphqlClient"
import { useAuth } from "../providers/AuthContext"
import PlanListItem from "./PlanListItem"
import ProgressBar from "./ProgressBar"

const plansQuery = gql`
  query plans($username: String!) {
    plans(username: $username) {
      documents {
        _id
        username
        exercise
        reps
        weight
        completed
      }
    }
  }
`

const deletePlanMutation = gql`
  mutation DeletePlan($exercise: String!) {
    deletePlan(
      filter: { exercise: $exercise }
      dataSource: "Cluster0"
      database: "workouts"
      collection: "plans"
    ) {
      deletedCount
    }
  }
`

const updatePlanMutation = gql`
  mutation UpdatePlan(
    $exercise: String!
    $completed: Boolean!
    $reps: Int!
    $username: String!
    $weight: Float!
  ) {
    updatePlan(
      collection: "plans"
      dataSource: "Cluster0"
      database: "workouts"
      filter: { exercise: $exercise }
      update: {
        exercise: $exercise
        completed: $completed
        reps: $reps
        username: $username
        weight: $weight
      }
    ) {
      matchedCount
      modifiedCount
    }
  }
`

const PlansList = () => {
  const { username } = useAuth()
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ["plans", username],
    queryFn: () => client.request(plansQuery, { username }),
  })

  const { mutate: deletePlan } = useMutation({
    mutationFn: (exercise) => client.request(deletePlanMutation, { exercise }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans", username] })
    },
  })

  const handleDelete = (exercise) => {
    deletePlan(exercise)
  }

  const { mutate: updatePlan } = useMutation({
    mutationFn: ({ exercise, completed, reps, username, weight }) => {
      return client.request(updatePlanMutation, {
        exercise,
        completed,
        reps,
        username,
        weight,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans", username] })
    },
  })

  const handleUpdate = (exercise, completed, reps, weight, username) => {
    updatePlan({ exercise, completed, reps, username, weight, username })
  }

  if (error) {
    console.error("Error fetching plans:", error)
    return <Text>Error fetching plans. Please try again later.</Text>
  }
  if (isLoading) {
    return <ActivityIndicator />
  }

  const completedCount = data.plans.documents.reduce((count, plan) => {
    if (plan.completed) {
      return count + 1
    } else {
      return count
    }
  }, 0)

  const calculatePercCompleted = () => {
    //(totalChapterCompleted/CompletedChapter)*100
    const perc = completedCount / data?.plans?.documents?.length

    return perc.toFixed(2)
  }

  return (
    <View>
      <FlatList
        data={data.plans.documents}
        showsVerticalScrollIndicator={false}
        style={{ zIndex: 100 }}
        renderItem={({ item }) => (
          <PlanListItem
            plan={item}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
        keyExtractor={(item) => item.exercise} // Use exercise as the unique key
      />
      <ProgressBar perc={calculatePercCompleted()} />
    </View>
  )
}

export default PlansList
