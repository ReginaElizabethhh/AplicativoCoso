
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { PokemonParams } from '../../navigator/PokemonNavigator';
import { useTypeColorPokemon } from '../../hooks/useTypeColorPokemon';
import { useDetailPokemon } from '../../hooks/useDetailPokemon';
import { PokemonFull } from '../../components/PokemonFull';

interface Props extends StackScreenProps<PokemonParams, 'PokemonDetail'> {}

export const PokemonDetail = ({ navigation, route }: Props) => {
  const data = route.params.NewPokemon;
  const { id, name, image } = data;

  const { isLoading, color } = useTypeColorPokemon(id);
  const { detailPokemon } = useDetailPokemon(id);

  const mainColor = color[0] || '#C65D5D';

  const secondaryColor =
    color.length > 1 ? color[1] : mainColor;

  return (
    <View style={styles.container}>

      {/* Tarjeta del Pokémon */}
      <View style={styles.header}>

        {/* Fondo izquierdo */}
        <View
          style={[
            styles.leftBackground,
            {
              backgroundColor: isLoading ? '#C65D5D' : mainColor,
            },
          ]}
        />

        {/* Fondo derecho */}
        <View
          style={[
            styles.rightBackground,
            {
              backgroundColor: isLoading ? '#E8B8B8' : secondaryColor,
            },
          ]}
        />

        {/* Decoración */}
        <View style={styles.decorativeCircle} />

        {/* Botón para regresar */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>‹ Volver</Text>
        </TouchableOpacity>

        {/* Número del Pokémon */}
        <Text style={styles.pokemonId}>
          #{String(id).padStart(3, '0')}
        </Text>

        {/* Nombre */}
        <Text style={styles.pokemonName}>
          {name}
        </Text>

        {/* Imagen */}
        <Image
          source={{ uri: image }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />

        {/* Sombra decorativa */}
        <View style={styles.imageShadow} />

      </View>

      {/* Información adicional */}
      <View style={styles.infoContainer}>
        {!detailPokemon ? (
          <ActivityIndicator size="large" color="#C65D5D" />
        ) : (
          <PokemonFull
            pokemon={detailPokemon}
            types={color}
          />
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4D6D6',
  },

  header: {
    flex: 1.15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 5,
    paddingTop: 35,
    overflow: 'hidden',
    backgroundColor: '#C65D5D',
    elevation: 5,
    shadowColor: '#633D43',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  leftBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    opacity: 0.9,
  },

  rightBackground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    opacity: 0.9,
  },

  decorativeCircle: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: 'rgba(255,255,255,0.15)',
    top: 80,
    right: -70,
  },

  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    zIndex: 2,
  },

  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  pokemonId: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    opacity: 0.85,
    marginTop: 20,
  },

  pokemonName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 3,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowRadius: 8,
  },

  pokemonImage: {
    width: 160,
    height: 160,
    marginTop: 1,
    marginBottom: 12,
    zIndex: 2,
  },

  imageShadow: {
    position: 'absolute',
    width: 120,
    height: 16,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.12)',
    bottom: 1.5,
  },

  infoContainer: {
    flex: 2.85,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: '#F4D6D6',
  },

});