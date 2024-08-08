import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Heading, useColorModeValue, Link, CloseButton, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function SignUp({ setSession }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            setSession(data.session);
            alert('Check your email for the confirmation link!');
            navigate('/profile');
        } catch (error) {
            setError(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    const bgColor = useColorModeValue('gray.50', 'gray.800');
    const textColor = useColorModeValue('gray.600', 'gray.200');

    return (
        <Box maxWidth="400px" margin="0 auto" mt={8}>
            <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="lg">
                <VStack spacing={6}>
                    <Heading as="h1" size="xl" color={textColor}>Sign Up</Heading>
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle mr={2}>Sign Up Failed!</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError('')} />
                        </Alert>
                    )}
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>
                    <Button onClick={handleSignUp} colorScheme="green" isLoading={loading} width="full">
                        Sign Up
                    </Button>
                    <Text>
                        Already have an account? <Link as={RouterLink} to="/login" color="blue.500">Login</Link>
                    </Text>
                </VStack>
            </Box>
        </Box>
    );
}
