import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [bikes, setBikes] = useState([]);

  
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get("http://192.168.29.2:5000/api/spareparts/bikes");
        setBikes(response.data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };
    fetchBikes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.section}>
        <Text style={styles.heading}>Spare Parts</Text>
        <View style={styles.bikeGrid}>
          {bikes.map((bike) => (
            <View key={bike._id} style={styles.bikeCard}>
              <Image
                               source={{ uri: bike.imageUrl }}
                               style={styles.bikeImage}
                               onError={(error) => console.error("Image load error:", error.nativeEvent.error)}
                             />
              <Text style={styles.bikeCompany}>{bike.companyName}</Text>
              <Text style={styles.bikePrice}>{bike.price}</Text>
              <Text style={styles.lowestPrice}>Lowest price ever</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bikeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  bikeCard: {
    width: "45%",
    backgroundColor: "#F5F5F5",
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    elevation: 3,
  },
  bikeImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  bikePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  bikeCompany: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  lowestPrice: {
    fontSize: 14,
    color: "green",
    marginTop: 5,
  },
});










