import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Monitor } from 'lucide-react'

const API_URL = 'http://localhost:5000';

export default function App() {
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [error, setError] = useState('');

  const generateKey = async () => {
    try {
      const response = await fetch(`${API_URL}/generate-key`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.key) {
        throw new Error('No key received from server');
      }
      setKey(data.key);
      setError('');
    } catch (error) {
      console.error('Error generating key:', error);
      setError(`Failed to generate key: ${error.message}`);
    }
  };

  const encrypt = async () => {
    try {
      const response = await fetch(`${API_URL}/encrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, key }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.encrypted) {
        throw new Error('No encrypted message received from server');
      }
      setEncryptedMessage(data.encrypted);
      setError('');
    } catch (error) {
      console.error('Error encrypting message:', error);
      setError(`Failed to encrypt message: ${error.message}`);
    }
  };

  const decrypt = async () => {
    try {
      const response = await fetch(`${API_URL}/decrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encrypted: encryptedMessage, key }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (!data.decrypted) {
        throw new Error('No decrypted message received from server');
      }
      setDecryptedMessage(data.decrypted);
      setError('');
    } catch (error) {
      console.error('Error decrypting message:', error);
      setError(`Failed to decrypt message: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            Encrypt It
            <Monitor className="h-6 w-6 ml-2" />
          </CardTitle>
          <CardDescription>Encrypt and decrypt messages securely</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="key">Encryption Key</Label>
              <div className="flex space-x-2">
                <Input id="key" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Enter or generate a key" />
                <Button onClick={generateKey}>Generate Key</Button>
              </div>
            </div>
            <Tabs defaultValue="encrypt">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
                <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
              </TabsList>
              <TabsContent value="encrypt">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message">Message to Encrypt</Label>
                    <Input id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter a message" />
                  </div>
                  <Button onClick={encrypt}>Encrypt</Button>
                  {encryptedMessage && (
                    <div>
                      <Label htmlFor="encrypted">Encrypted Message</Label>
                      <Input id="encrypted" value={encryptedMessage} readOnly />
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="decrypt">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="encryptedMessage">Message to Decrypt</Label>
                    <Input id="encryptedMessage" value={encryptedMessage} onChange={(e) => setEncryptedMessage(e.target.value)} placeholder="Enter an encrypted message" />
                  </div>
                  <Button onClick={decrypt}>Decrypt</Button>
                  {decryptedMessage && (
                    <div>
                      <Label htmlFor="decrypted">Decrypted Message</Label>
                      <Input id="decrypted" value={decryptedMessage} readOnly />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

