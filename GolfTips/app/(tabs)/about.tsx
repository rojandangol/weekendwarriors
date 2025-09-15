//About.tsx 
import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert } from 'react-native';
import { Card, Button, TextInput } from 'react-native-paper';
import Accordion from '@/components/Accordian';
import { colors } from '@/constants/colors';
import { images } from '@/constants/images';
import Header from '@/components/Header';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const About: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleDonate = async () => {
    const amountInCents = Math.round(Number(donationAmount) * 100);

    if (!amountInCents || amountInCents < 100) {
      Alert.alert("Invalid Amount", "Please enter a valid donation amount (minimum $1).");
      return;
    }

    try {
      const res = await axios.post('localhost/create-payment-intent', {
        amount: amountInCents,
      });
      if (res.status !== 200) {
        Alert.alert("Server Error", "Unable to process your donation at this time.");
        return;
      }
      // const { clientSecret } = res.data;
      const clientSecret = res.data.clientSecret;

      const initResult = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Weekend Warrior', // or your app name
      });

      if (initResult.error) {
        console.error("Init error:", initResult.error);
        Alert.alert("Error", initResult.error.message);
        return;
      }

      const paymentResult = await presentPaymentSheet();

      if (paymentResult.error) {
        Alert.alert("Payment Failed", paymentResult.error.message);
      } else {
        Alert.alert("Success", "Thank you for your donation!");
        setDonationAmount(''); // clear input
      }
    } catch (err) {
      console.error("Stripe error:", err);
      Alert.alert("Server Error", "Something went wrong while processing the donation.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView className="flex flex-1 h-full m-3 mt-20">
        <Header />
        <Card style={styles.card}>
          <Card.Cover source={images.golfCourse} />
        </Card>

        <Accordion title="About Us">
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </Accordion>

        <Accordion title="Donate">
          <Text style={styles.text}>Support our mission by donating any amount below.</Text>
          <TextInput
            label="Donation Amount (USD)"
            mode="outlined"
            keyboardType="numeric"
            value={donationAmount}
            onChangeText={setDonationAmount}
            style={styles.input}
          />
          <Button mode="contained" style={styles.button} onPress={handleDonate}>
            Give
          </Button>
        </Accordion>

        <Accordion title="Contact Us">
          <TextInput label="Full Name" mode="outlined" style={styles.input} />
          <TextInput label="Email" mode="outlined" style={styles.input} />
          <TextInput
            label="Leave us feedback..."
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />
        </Accordion>

        <Accordion title="Tutorial">
          <Button mode="contained" style={styles.button}>
            Run Tutorial
          </Button>
        </Accordion>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.primary,
    marginBottom: 70,
  },
  card: {
    marginBottom: 16,
  },
  text: {
    color: colors.white,
    marginBottom: 10,
  },
  button: {
    alignSelf: 'center',
    marginTop: 10,
    color: colors.primary200,
  },
  input: {
    marginBottom: 10,
    backgroundColor: colors.shadow,
  },
});

export default About;
