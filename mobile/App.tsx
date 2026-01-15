import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>N</Text>
        </View>
        <Text style={styles.title}>NNIT AI Enterprise</Text>
        <Text style={styles.subtitle}>Professional AI Freelancer Platform</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome to NNIT AI Enterprise Mobile</Text>
        <Text style={styles.description}>
          Access powerful AI tools on the go:
        </Text>
        
        <View style={styles.features}>
          <Text style={styles.feature}>📝 Text AI - Writing & Translation</Text>
          <Text style={styles.feature}>💻 Code AI - Generate & Debug</Text>
          <Text style={styles.feature}>🎨 Image AI - Create Images</Text>
          <Text style={styles.feature}>🔊 Audio AI - TTS & STT</Text>
          <Text style={styles.feature}>🎬 Video AI - Process Videos</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonTextSecondary}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Created by Solomon Omomeje Ayodele
        </Text>
        <Text style={styles.footerText}>Network Nice IT Tec (NNIT)</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e40af',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  features: {
    marginBottom: 32,
  },
  feature: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 12,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: '#1e40af',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1e40af',
  },
  buttonTextSecondary: {
    color: '#1e40af',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
});
