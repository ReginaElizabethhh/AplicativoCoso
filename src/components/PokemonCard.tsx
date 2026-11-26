
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";

import { NewPokemon } from "../interfaces/pokemonResponse";
import { useTypeColorPokemon } from "../hooks/useTypeColorPokemon";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PokemonParams } from "../navigator/PokemonNavigator";

interface Props {
  pokemon: NewPokemon;
}

const windowWidth = Dimensions.get("window").width;
const cardWidth = windowWidth / 3 - 16;

export const PokemonCard = ({ pokemon }: Props) => {

  const { color, isLoading } = useTypeColorPokemon(`${pokemon.id}`);

  const navigation =
    useNavigation<StackNavigationProp<PokemonParams>>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("PokemonDetail", {
          NewPokemon: pokemon
        })
      }
    >
      <View
        style={{
          ...style.containerCard,
          width: cardWidth
        }}
      >

        <View
          style={{
            ...style.backgroundTop,
            backgroundColor: isLoading
              ? "#F0DCDC"
              : color.length > 1
                ? color[1]
                : color[0]
          }}
        />

        <View
          style={{
            ...style.backgroundBottom,
            backgroundColor: isLoading ? "#E8CACA" : color[0]
          }}
        />

        <Text style={style.name} numberOfLines={1}>
          {pokemon.name}
        </Text>

        <Text style={style.number}>
          #{pokemon.id}
        </Text>

        <Image
          style={style.pokeball}
          source={require("./../../assets/pokeball-light.png")}
        />

        <Image
          style={style.pokemon}
          source={{ uri: pokemon.image }}
        />

      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({

  containerCard: {
    height: 160,
    marginHorizontal: 6,
    marginBottom: 18,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#FFF9F7",
    borderWidth: 1.5,
    borderColor: "#E8B8B8",
    elevation: 4
  },

  backgroundTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "50%",
    transform: [
      { rotateX: "20deg" },
      { rotateY: "-45deg" },
      { scale: 2 }
    ]
  },

  backgroundBottom: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    bottom: 0,
    transform: [
      { rotateX: "20deg" },
      { rotateY: "-45deg" },
      { scale: 2 }
    ]
  },

  pokeball: {
    height: 120,
    width: 120,
    position: "absolute",
    bottom: -15,
    right: -18,
    opacity: 0.35
  },

  pokemon: {
    height: 115,
    width: 115,
    position: "absolute",
    right: -5,
    bottom: -8,
    opacity: 1
  },

  name: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginHorizontal: 5,
    marginTop: 8,
    textTransform: "capitalize"
  },

  number: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 5,
    marginTop: 3,
    opacity: 0.85
  }

});
