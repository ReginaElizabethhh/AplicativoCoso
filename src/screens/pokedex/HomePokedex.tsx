
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { usePokemonPaginated } from '../../hooks/usePokemonPaginated';
import { appTheme } from '../../theme/appTheme';
import { PokemonCard } from '../../components/PokemonCard';

export const HomePokedex = () => {

  const { pokemonList, loadPokemon } = usePokemonPaginated();

  return (
    <View
      style={[
        appTheme.container,
        {
          backgroundColor: '#F4D6D6',
        }
      ]}
    >
      {/* Pokebola decorativa */}
      <Image
        source={require('./../../../assets/pokeball-dark.png')}
        style={{
          height: 300,
          position: 'absolute',
          right: -100,
          top: -100,
          width: 300,
          opacity: 0.10,
        }}
      />

      <FlatList
        key="three-columns"
        data={pokemonList}
        keyExtractor={(pokemon, index) => `${pokemon.id}${index}`}
        showsVerticalScrollIndicator={false}
        numColumns={3}

        ListHeaderComponent={(
          <View
            style={{
              height: 130,
              borderRadius: 20,
              marginHorizontal: 20,
              marginTop: 20,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                ...appTheme.text,
                color: '#633D43',
                fontSize: 42,
                fontWeight: 'bold',
                marginBottom: 5,
                marginTop: 10,
                textShadowColor: 'rgba(198, 93, 93, 0.15)',
                textShadowRadius: 10,
              }}
            >
              Pokédex
            </Text>

            <Text
              style={{
                color: '#C65D5D',
                fontWeight: 'bold',
                backgroundColor: '#FCEAEA',
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                fontSize: 15,
                letterSpacing: 1,
                alignSelf: 'flex-start',
              }}
            >
              ¡¡ Atrápalos a todos !!
            </Text>
          </View>
        )}

        renderItem={({ item }) => (
          <PokemonCard pokemon={item} />
        )}

        onEndReached={loadPokemon}
        onEndReachedThreshold={0.2}

        ListFooterComponent={(
          <ActivityIndicator
            style={{ height: 120 }}
            size={40}
            color="#C65D5D"
          />
        )}
      />
    </View>
  );
};