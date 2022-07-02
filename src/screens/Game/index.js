import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getCards } from "../../services/axiosClient";
import { styles } from "./style";
import bgImage4 from "../../images/teste.png";
import { useNavigation } from "@react-navigation/native";

const Game = ({ route }) => {
  const { deckId } = route.params;
  const [cards, setCards] = useState(null);
  const [primeiro, setPrimeiro] = useState(0);
  const [contador, setContador] = useState(3);
  const navegacao = useNavigation();

  const adicionarCarta = async () => {
    const deck = await getCards(deckId, 4);
    setCards(deck);
  };

  const navi = () => {
    setTimeout(() => {
      navegacao.navigate("Home");
    }, 2000);
  };

  const verificar = () => {
    const king =
      cards &&
      cards.cards.some((card) => {
        return card.value === "JACK" && card.suit === "SPADES";
      });
    if (cards === null) {
      return;
    }
    if (king) {
      Alert.alert(
        " 💀 Jack te pegou! 💀",
        " Em uma proxima vida tenha mais cuidado ao caminhar por Londres na escuridão!"
      );
      return navi();
    }
    setContador(contador - 1);
    if (contador <= 1) {
      setTimeout(() => {
        Alert.alert(
          "Ainda não chegou a sua hora.",
          "Por hoje você está seguro, mas Jack ainda caminha pela noite 👀"
        );
        return navi();
      }, 1000); 
    }
  };

  useEffect(() => {
    const get = async () => {
      const deck = await getCards(deckId, 1);
      setCards(deck);
    };
    if (primeiro > 2) {
      get();
    } else {
      setPrimeiro(primeiro + 1);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      verificar();
    }, 500);
  }, [cards]);

  return (
    <ImageBackground
      source={bgImage4}
      style={styles.container}
      imageStyle={{ resizeMode: "contain", transform: [{ scale: 1.1 }] }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2}}>
          <Text style={{ color: "white", fontSize: 15 }}>
          Depois de iniciar a partida, clique no botão e puxe 4 cartas, se uma
            delas for um valete de espadas(o Jack) você perde o jogo.
          </Text>
          <Text style={{ color: "white", fontSize: 15 }}>
          Mas se em 3 tentativas o valete de espadas não for puxado, a vitoria
            é sua e você sai vivo!
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            alignItems: "center",
            flexDirection: "row",
            marginTop: 200,
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 30,
                   }}
        >
          {cards &&
            cards.cards.map((card, index) => (
              <Image
                key={index}
                source={{ uri: card.image }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                  marginLeft: -10
                 
                }}
              />
            ))}
        </View>
        <View style={{ flex: 2, marginTop: 150, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 30,
              width: 160,
            }}
            onPress={adicionarCarta}
          >
            <Text style={{ color: "white", fontSize: 20 }}> INICIAR </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Game;
