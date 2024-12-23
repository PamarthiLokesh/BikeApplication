import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const BikeSellPage = () => {
  const [bikeModel, setBikeModel] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const pickImage = async () => {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(URL.createObjectURL(file));
          setImageFile(file);
          console.log("File selected on web:", file);
        } else {
          console.log("No file selected on web.");
        }
      };
      input.click();
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Required", "Please grant permission to access your media library.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setImage(result.assets[0].uri);
        setImageFile({
          uri: result.assets[0].uri,
          name: `bike_${Date.now()}.jpg`,
          type: "image/jpeg",
        });
        console.log("Image selected on mobile:", result.assets[0]);
      } else {
        console.log("No image selected on mobile.");
      }
    }
  };

  const handleSubmit = async () => {
    if (!bikeModel || !companyName || !price || !imageFile) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("bikeModel", bikeModel);
    formData.append("companyName", companyName);
    formData.append("price", price);

    if (Platform.OS === "web") {
      formData.append("image", imageFile); 
    } else {
      formData.append("image", {
        uri: imageFile.uri,
        name: imageFile.name,
        type: imageFile.type,
      });
    }

    try {
      const response = await axios.post("http://192.168.1.17:5000/api/bikes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        Alert.alert("Success", "Bike details uploaded successfully");
        setBikeModel("");
        setCompanyName("");
        setPrice("");
        setImage(null);
        setImageFile(null);
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload bike details");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell Your Bike</Text>

      <Text style={styles.label}>Bike Model</Text>
      <TextInput
        style={styles.input}
        value={bikeModel}
        onChangeText={setBikeModel}
        placeholder="Enter bike model"
      />

      <Text style={styles.label}>Company Name</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={setCompanyName}
        placeholder="Enter company name"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />

      <Button title="Pick Image" onPress={pickImage} color="#4CAF50" />
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#007BFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
  },
});

export default BikeSellPage;
