
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import { PokemonDetailResponse } from '../interfaces/pokemonResponse';

interface Props {
  pokemon: PokemonDetailResponse;
  types: string[];
}

const traduccionTipos: { [key: string]: string } = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

const traduccionStats: { [key: string]: string } = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. especial',
  'special-defense': 'Def. especial',
  speed: 'Velocidad',
};

const limitarNombre = (nombre: string) =>
  nombre.replace(/-/g, ' ');

export const PokemonFull = ({ pokemon, types }: Props) => {
  const mainColor = types[0] || '#C65D5D';

  const tiposEnEspanol = pokemon.types
    ?.map(({ type }) => traduccionTipos[type.name] || type.name)
    .join(', ');

  const totalStats = pokemon.stats?.reduce(
    (total, stat) => total + stat.base_stat,
    0
  ) ?? 0;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Información del Pokémon</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos generales</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Tipo</Text>
            <Text style={styles.value}>
              {tiposEnEspanol || 'No disponible'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Peso</Text>
            <Text style={styles.value}>{pokemon.weight / 10} kg</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Altura</Text>
            <Text style={styles.value}>{pokemon.height / 10} m</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Experiencia base</Text>
            <Text style={styles.value}>
              {pokemon.base_experience ?? 'No disponible'}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Estadísticas base</Text>

        <View style={styles.section}>
          {pokemon.stats?.map((stat) => {
            const porcentaje = Math.min(
              (stat.base_stat / 255) * 100,
              100
            );

            return (
              <View key={stat.stat.name} style={styles.statContainer}>
                <View style={styles.statHeader}>
                  <Text style={styles.label}>
                    {traduccionStats[stat.stat.name] || stat.stat.name}
                  </Text>

                  <Text style={styles.value}>{stat.base_stat}</Text>
                </View>

                <View style={styles.statBar}>
                  <View
                    style={[
                      styles.statFill,
                      {
                        width: `${porcentaje}%`,
                        backgroundColor: mainColor,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}

          <View style={styles.totalRow}>
            <Text style={styles.label}>Total de estadísticas</Text>
            <Text style={styles.totalValue}>{totalStats}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Habilidades</Text>

        <View style={styles.section}>
          {pokemon.abilities?.map((ability, index) => {
            if (!ability.ability) return null;

            return (
              <View
                key={`${ability.ability.name}-${index}`}
                style={styles.listItem}
              >
                <Text style={styles.value}>
                  • {limitarNombre(ability.ability.name)}
                </Text>

                <Text style={styles.description}>
                  {ability.is_hidden
                    ? 'Habilidad oculta'
                    : 'Habilidad normal'}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Movimientos</Text>

        <View style={styles.section}>
          <Text style={styles.description}>
            Algunos movimientos que puede aprender:
          </Text>

          <View style={styles.movesContainer}>
            {pokemon.moves?.slice(0, 12).map((move) => (
              <View key={move.move.name} style={styles.moveItem}>
                <Text style={styles.moveText}>
                  {limitarNombre(move.move.name)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Otras apariencias</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.spritesContainer}
        >
          {pokemon.sprites?.front_shiny && (
            <View style={styles.spriteItem}>
              <Image
                style={styles.picture}
                source={{ uri: pokemon.sprites.front_shiny }}
              />
              <Text style={styles.spriteLabel}>Shiny frontal</Text>
            </View>
          )}

          {pokemon.sprites?.back_shiny && (
            <View style={styles.spriteItem}>
              <Image
                style={styles.picture}
                source={{ uri: pokemon.sprites.back_shiny }}
              />
              <Text style={styles.spriteLabel}>Shiny trasero</Text>
            </View>
          )}

          {pokemon.sprites?.front_female && (
            <View style={styles.spriteItem}>
              <Image
                style={styles.picture}
                source={{ uri: pokemon.sprites.front_female }}
              />
              <Text style={styles.spriteLabel}>Hembra frontal</Text>
            </View>
          )}

          {pokemon.sprites?.back_female && (
            <View style={styles.spriteItem}>
              <Image
                style={styles.picture}
                source={{ uri: pokemon.sprites.back_female }}
              />
              <Text style={styles.spriteLabel}>Hembra trasera</Text>
            </View>
          )}

          {pokemon.sprites?.front_shiny_female && (
            <View style={styles.spriteItem}>
              <Image
                style={styles.picture}
                source={{ uri: pokemon.sprites.front_shiny_female }}
              />
              <Text style={styles.spriteLabel}>Shiny hembra</Text>
            </View>
          )}

          {pokemon.sprites?.back_shiny_female && (
            <View style={styles.spriteItem}>
              <Image
                style={styles.picture}
                source={{ uri: pokemon.sprites.back_shiny_female }}
              />
              <Text style={styles.spriteLabel}>Shiny hembra trasera</Text>
            </View>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4D6D6',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#633D43',
    textAlign: 'center',
    marginVertical: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C65D5D',
    marginTop: 18,
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#FFF9F7',
    borderRadius: 12,
    padding: 15,
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1DADA',
  },
  label: {
    color: '#9B7478',
    fontSize: 14,
  },
  value: {
    color: '#633D43',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statContainer: {
    marginBottom: 15,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  statBar: {
    height: 8,
    backgroundColor: '#F1DADA',
    borderRadius: 10,
    overflow: 'hidden',
  },
  statFill: {
    height: '100%',
    borderRadius: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1DADA',
    paddingTop: 12,
    marginTop: 5,
  },
  totalValue: {
    color: '#C65D5D',
    fontSize: 17,
    fontWeight: 'bold',
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1DADA',
  },
  description: {
    color: '#9B7478',
    fontSize: 13,
    marginTop: 5,
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  moveItem: {
    backgroundColor: '#FCEAEA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  moveText: {
    color: '#633D43',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  spritesContainer: {
    paddingVertical: 5,
  },
  spriteItem: {
    alignItems: 'center',
    backgroundColor: '#FFF9F7',
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
  },
  picture: {
    width: 100,
    height: 100,
  },
  spriteLabel: {
    color: '#9B7478',
    fontSize: 12,
    marginTop: 5,
  },
});
