import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";

export default function MembershipScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    rcNumber: "",
    aadharNumber: "",
    state: "",
    district: "",
    address: "",
  });
  const [inputErrors, setInputErrors] = useState({});


  const openForm = (plan) => {
    setSelectedPlan(plan);
    setModalVisible(true);
  };

  
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.rcNumber) errors.rcNumber = "RC Number is required.";
    if (!formData.aadharNumber) errors.aadharNumber = "Aadhar number is required.";
    if (!formData.state) errors.state = "State is required.";
    if (!formData.district) errors.district = "District is required.";
    if (!formData.address) errors.address = "Address is required.";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email.";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }

    const aadharRegex = /^[0-9]{12}$/;
    if (formData.aadharNumber && !aadharRegex.test(formData.aadharNumber)) {
      errors.aadharNumber = "Aadhar number must be a 12-digit number.";
    }

    return errors;
  };

  
  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    try {
      const response = await fetch("http://192.168.29.2:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Membership subscribed successfully!");
      } else {
        alert(`Failed to subscribe: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setModalVisible(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        rcNumber: "",
        aadharNumber: "",
        state: "",
        district: "",
        address: "",
      }); 
      setInputErrors({}); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Membership</Text>

      
      <View style={styles.card}>
        <View style={[styles.header, { backgroundColor: "#FFD700" }]}>
          <Text style={styles.headerText}>Gold</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>• Priority customer support.</Text>
          <Text style={styles.text}>• Exclusive discounts on all purchases.</Text>
          <Text style={styles.text}>• Free annual maintenance check-ups.</Text>
          <Text style={styles.text}>• Access to premium products and early releases.</Text>
          <Text style={styles.text}>• Complimentary roadside assistance.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => openForm("Gold")}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

     
      <View style={styles.card}>
        <View style={[styles.header, { backgroundColor: "#A9A9A9" }]}>
          <Text style={styles.headerText}>Silver</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>• Discounted rates on select services.</Text>
          <Text style={styles.text}>• Free maintenance check-up once a year.</Text>
          <Text style={styles.text}>• Priority access to seasonal sales.</Text>
          <Text style={styles.text}>• Loyalty reward points for every purchase.</Text>
          <Text style={styles.text}>• Invitations to member-only events.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => openForm("Silver")}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.card}>
        <View style={[styles.header, { backgroundColor: "#CD7F32" }]}>
          <Text style={styles.headerText}>Bronze</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>• Basic discounts on services.</Text>
          <Text style={styles.text}>• Earn loyalty points on purchases.</Text>
          <Text style={styles.text}>• Access to standard promotions.</Text>
          <Text style={styles.text}>• Free installation services for certain products.</Text>
          <Text style={styles.text}>• Regular updates on deals and offers.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => openForm("Bronze")}>
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

     
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedPlan} Membership Form
            </Text>
            <TextInput
              style={[styles.input, inputErrors.name && styles.inputError]}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            {inputErrors.name && <Text style={styles.errorText}>{inputErrors.name}</Text>}

            <TextInput
              style={[styles.input, inputErrors.email && styles.inputError]}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            {inputErrors.email && <Text style={styles.errorText}>{inputErrors.email}</Text>}

            <TextInput
              style={[styles.input, inputErrors.phone && styles.inputError]}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={formData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
            />
            {inputErrors.phone && <Text style={styles.errorText}>{inputErrors.phone}</Text>}

            <TextInput
              style={[styles.input, inputErrors.rcNumber && styles.inputError]}
              placeholder="RC Number"
              value={formData.rcNumber}
              onChangeText={(text) => handleInputChange("rcNumber", text)}
            />
            {inputErrors.rcNumber && <Text style={styles.errorText}>{inputErrors.rcNumber}</Text>}

            <TextInput
              style={[styles.input, inputErrors.aadharNumber && styles.inputError]}
              placeholder="Aadhar Number"
              keyboardType="numeric"
              value={formData.aadharNumber}
              onChangeText={(text) => handleInputChange("aadharNumber", text)}
            />
            {inputErrors.aadharNumber && <Text style={styles.errorText}>{inputErrors.aadharNumber}</Text>}

            <TextInput
              style={[styles.input, inputErrors.state && styles.inputError]}
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => handleInputChange("state", text)}
            />
            {inputErrors.state && <Text style={styles.errorText}>{inputErrors.state}</Text>}

            <TextInput
              style={[styles.input, inputErrors.district && styles.inputError]}
              placeholder="District"
              value={formData.district}
              onChangeText={(text) => handleInputChange("district", text)}
            />
            {inputErrors.district && <Text style={styles.errorText}>{inputErrors.district}</Text>}

            <TextInput
              style={[styles.input, inputErrors.address && styles.inputError]}
              placeholder="Address"
              value={formData.address}
              multiline
              numberOfLines={3}
              onChangeText={(text) => handleInputChange("address", text)}
            />
            {inputErrors.address && <Text style={styles.errorText}>{inputErrors.address}</Text>}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
  },
  header: {
    padding: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 15,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  button: {
    backgroundColor: "#32CD32",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  submitButton: {
    backgroundColor: "#0000FF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeText: {
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 10,
  },
});
