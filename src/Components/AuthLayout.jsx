import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_light-removebg.png';

const AuthLayout = ({ children, showBackButton = true }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f0f7ff',
        px: { xs: 1, sm: 2 }
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={6}
          sx={{
            borderRadius: 4,
            width: '100%'
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, sm: 4, md: 5 }
            }}
          >
            {/* Back Button */}
            {showBackButton && (
              <Button
                variant="text"
                onClick={() => navigate(-1)}
                sx={{
                  mb: 2,
                  px: 0,
                  color: 'text.secondary',
                  fontWeight: 600,
                  textTransform: 'none',
                  justifyContent: 'flex-start'
                }}
              >
                ← Back
              </Button>
            )}

            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4
              }}
            >
              <Box
                sx={{
                  width: { xs: 75, sm: 90 },
                  height: { xs: 75, sm: 90 },
                  borderRadius: '50%',
                  bgcolor: '#f8f9fa',
                  border: '1px solid #eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 1
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{
                    width: { xs: 45, sm: 55 }
                  }}
                />
              </Box>
            </Box>

            {/* Content */}
            <Box width="100%">
              {children}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AuthLayout;
