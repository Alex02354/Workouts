import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import ExerciseListItem from '../components/ExerciseListItem';
import {useQuery} from '@tanstack/react-query';
import {gql, request} from 'graphql-request';

const url = 'https://doylestown.stepzen.net/api/vociferous-elk/__graphql';

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String){
    exercises(muscle: $muscle, name: $name){
        name
        muscle
    }
  }
`;

export default function ExercisesScreen() {
  const {data, isLoading, error} = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return request({
        url,
        document: exercisesQuery,
        requestHeaders:{
          Authorization: 
            'apikey doylestown::stepzen.io+1000::3a0611000eba6d01fad59ad708da5a198a85169b0162f2b23927b8668ed7649b'
        },
      });
    },
  });

  if (isLoading) {
    return <ActivityIndicator/>
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.exercises}
        contentContainerStyle={{gap: 5}}
        keyExtractor={(item, index)=> item.name + index}
        renderItem={({item}) => <ExerciseListItem item={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});