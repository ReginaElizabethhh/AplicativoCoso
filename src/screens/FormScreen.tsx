import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useForm } from '../hooks/useForm';

export const FormScreen = () => {
  const { state, handleInputChage } = useForm();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario</Text>

      <TextInput
        style={styles.input}
        value={state.username}
        onChangeText={(text) => handleInputChage('username', text)}
        placeholder="Nombre de usuario"
        placeholderTextColor="#9B7478"
      />

      <TextInput
        style={styles.input}
        value={state.password}
        onChangeText={(text) => handleInputChage('password', text)}
        placeholder="Contraseña"
        placeholderTextColor="#9B7478"
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        value={state.age}
        onChangeText={(text) => handleInputChage('age', text)}
        placeholder="Edad"
        placeholderTextColor="#9B7478"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        value={state.stateCivil}
        onChangeText={(text) => handleInputChage('stateCivil', text)}
        placeholder="Estado civil"
        placeholderTextColor="#9B7478"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(state)}
      >
        <Text style={styles.buttonText}>Enviar datos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4D6D6',
    padding: 25,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#633D43',
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#FFF9F7',
    borderWidth: 1,
    borderColor: '#E8B8B8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#633D43',
  },
  button: {
    backgroundColor: '#C65D5D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});