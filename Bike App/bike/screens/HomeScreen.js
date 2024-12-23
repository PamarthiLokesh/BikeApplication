import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation(); 
  const scrollRef = useRef(null);

  
  const [bikes, setBikes] = useState([]); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedBike, setSelectedBike] = useState(null); 
  const [email, setEmail] = useState(""); 
  const [mobile, setMobile] = useState(""); 

  
  const images = [
    { id: 1, uri: "https://www.nsbpictures.com/cb-bike-backgrounds/cb-bikes-backgrounds-1/" },
    { id: 2, uri: "https://c4.wallpaperflare.com/wallpaper/565/558/457/heavy-bike-harley-davidson-harley-davidson-modified-wallpaper-preview.jpg" },
    { id: 3, uri: "https://c4.wallpaperflare.com/wallpaper/121/626/428/yamaha-fz-10-sportbike-best-bikes-wallpaper-preview.jpg" },
  ];

  const brands = [
    { id: 1, uri: "https://e1.pxfuel.com/desktop-wallpaper/383/232/desktop-wallpaper-honda-motorcycle-racing-logo-honda-motorcycle-logo-thumbnail.jpg" },
    { id: 2, uri: "https://wallpapers.com/images/hd/red-harley-davidson-logo-with-eagle-8oq3k5j92mdmyh6s.jpg" },
    { id: 3, uri: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ed67ae20658687.562eefc31f60a.jpg" },
    { id: 4, uri: "https://wallpapers.com/images/hd/bmw-logo-pictures-1vpyk0cc3rcxcuyk.jpg" },
    { id: 5, uri: "https://i.pinimg.com/originals/4f/f5/09/4ff509a7f661b99574cb6b0d86e14232.png" },
    { id: 6, uri: "https://www.shutterstock.com/image-illustration/zhytomyr-ukraine-september-23-2023-260nw-2365566519.jpg" },
    { id: 7, uri: "https://1000logos.net/wp-content/uploads/2020/03/Triumph-Logo.png" },
    { id: 8, uri: "https://toppng.com/uploads/preview/moto-guzzi-logo-vector-free-download-11573939504stse7dwj7i.png" },
    { id: 9, uri: "https://i.pinimg.com/originals/f6/78/51/f67851cfd480f059cb810d1e1d50c6ae.jpg" },
    { id: 10, uri: "https://www.shutterstock.com/image-vector/logo-british-motorcyle-called-royal-260nw-2433567443.jpg" },
  ];

  
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await axios.get("http://192.168.29.180:5000/api/bikemarket/bikes");
        setBikes(response.data); 
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };
    fetchBikes();
  }, []);

  
  const openBikeDetails = (bike) => {
    setSelectedBike(bike); 
    setModalVisible(true); 
  };

  
  const closeModal = () => {
    setModalVisible(false); 
    setEmail(""); 
    setMobile(""); 
  };

  
  const handleBuyButton = async () => {
    const formData = new FormData();
    formData.append("companyName", selectedBike.companyName);
    formData.append("price", selectedBike.price);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("bikeImage", {
      uri: selectedBike.imageUrl,  
      type: 'image/jpeg',           
      name: 'bikeImage.jpg',        
    });
  
    try {
      const response = await axios.post("http://localhost:5000/api/bikes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  
        },
      });
  
      console.log("Bike purchased:", response.data);
      closeModal();  
    } catch (error) {
      console.error("Error buying bike:", error.response || error);
    }
  };
  


useEffect(() => {
  let currentIndex = 0;

  const interval = setInterval(() => {
    if (scrollRef.current) {
      currentIndex = (currentIndex + 1) % images.length; 
      scrollRef.current.scrollTo({
        x: currentIndex * width, 
        animated: true,
      });
    }
  }, 3000); 

  return () => clearInterval(interval); 
}, [images.length]);



  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.navBar}>
        <Image
          source={{ uri: "https://www.11cart.com/cdn/shop/files/269950E3-CAFA-43E6-AA39-C59FA9B223F0.png?v=1722885627" }} 
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>

      
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
        >
          {images.map((item) => (
            <Image key={item.id} source={{ uri: item.uri }} style={styles.carouselImage} />
          ))}
        </ScrollView>
      </View>

      
      <View style={styles.section}>
        <Text style={styles.heading}>Top Brands</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.brandContainer}
        >
          {brands.map((brand) => (
            <View key={brand.id} style={styles.brandWrapper}>
              <Image source={{ uri: brand.uri }} style={styles.brandLogo} />
            </View>
          ))}
        </ScrollView>
      </View>

     
      <View style={styles.section}>
        <Text style={styles.heading}>Popular Bikes</Text>
        <View style={styles.bikeGrid}>
          {bikes.map((bike) => (
            <TouchableOpacity key={bike._id} onPress={() => openBikeDetails(bike)}>
              <View style={styles.bikeCard}>
                <Image
                  source={{ uri: bike.imageUrl }}
                  style={styles.bikeImage}
                  onError={(error) => console.error("Image load error:", error.nativeEvent.error)}
                />
                <Text style={styles.bikeCompany}>{bike.companyName}</Text>
                <Text style={styles.bikePrice}>{bike.price}</Text>
                <Text style={styles.lowestPrice}>Lowest price ever</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      
      {selectedBike && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close-circle" size={30} color="red" />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedBike.imageUrl }}
                style={styles.modalBikeImage}
              />
              <Text style={styles.modalBikeCompany}>{selectedBike.companyName}</Text>
              <Text style={styles.modalBikePrice}>{selectedBike.price}</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.inputField}
                placeholder="Enter your mobile number"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
              />
              <Button title="Buy Now" onPress={handleBuyButton} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  
  carouselContainer: {
    height: 200,
    marginBottom: 20,
  },
  carouselImage: {
    width: width,
    height: "100%",
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
  brandContainer: {
    paddingHorizontal: 10,
  },
  brandWrapper: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  brandLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  
  bikeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  bikeCard: {
    width: "100%",
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
  
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalBikeImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  modalBikeCompany: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalBikePrice: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
  },
  inputField: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

