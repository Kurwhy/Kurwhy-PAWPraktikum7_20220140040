import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Heading, useColorModeValue, Link, CloseButton, useToast, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Login({ setSession }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSession(data.session);
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
            <Heading as="h1" size="xl" color={textColor}>Login</Heading>
            {error && (
                <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Login Failed!</AlertTitle>
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
            <Button onClick={handleLogin} colorScheme="blue" isLoading={loading} width="full">
                Login
            </Button>
            <Text>
                Don't have an account? <Link as={RouterLink} to="/signup" color="blue.500">Sign Up</Link>
            </Text>
            </VStack>
        </Box>
        </Box>
    );
}