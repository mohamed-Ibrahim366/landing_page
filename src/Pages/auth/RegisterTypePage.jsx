import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Paper,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ScienceIcon from '@mui/icons-material/Science';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_light-removebg.png';

const RegisterTypePage = () => {
  const navigate = useNavigate();

  const registrationTypes = [
    {
      id: 'doctor_registration',
      title: 'Healthcare Provider',
      description: 'Register as a hospital, or clinical to access and manage patient records',
      icon: <MedicalServicesIcon fontSize="inherit" />,
      color: '#eef4ff',
      borderColor: '#d0e1ff',
      textColor: '#1976d2',
      iconBg: '#1976d2'
    },
    {
      id: 'lab_registration',
      title: 'Laboratory Center',
      description: 'Register your testing lab to submit laboratory results and diagnostic results',
      icon: <ScienceIcon fontSize="inherit" />,
      color: '#f0fff4',
      borderColor: '#c6f6d5',
      textColor: '#2e7d32',
      iconBg: '#2e7d32'
    },
    {
      id: 'imaging_registration',
      title: 'Imaging Center',
      description: 'Register your imaging facility to upload radiology and diagnostic imaging studies',
      icon: <ImageOutlinedIcon fontSize="inherit" />,
      color: '#fdf2ff',
      borderColor: '#f3d9fa',
      textColor: '#9c27b0',
      iconBg: '#9c27b0'
    }
  ];

  return (
    <Box 
      sx={{ 
        backgroundColor: '#0a54a3', 
        minHeight: '100vh', 
        minWidth: '100vw',
        py: { xs: 4, md: 8 }, 
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* 1. Centered Logo */}
      <Box 
        component="img"
        src={logo}
        alt="Logo"
        sx={{ 
          width: 120, 
          bgcolor: 'white', 
          p: 1.5, 
          borderRadius: 2, 
          mb: 4,
          boxShadow: 3
        }}
      />

      {/* 2. Main White Container */}
      <Container maxWidth="lg">
        <Paper elevation={10} sx={{ borderRadius: 4, p: { xs: 3, md: 6 }, overflow: 'hidden' }}>
          
          {/* Back Button */}
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: 'text.secondary', fontWeight: 'bold', mb: 4, textTransform: 'none' }}
          >
            Back
          </Button>

          <Box textAlign="center" mb={6}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 1, fontFamily: 'serif' }}>
              Select Your Registration Type
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              Please choose the type of entity you want to register as.
            </Typography>
          </Box>

        <Grid container spacing={3} mb={6} justifyContent="center" wrap="nowrap" sx={{ overflowX: 'auto', pb: 2 }}>
  {registrationTypes.map((type) => (
    /* استخدام xs={4} يضمن أن كل كرت يأخذ ثلث المساحة (12/4 = 3) 
       على الموبايل، التابلت، واللابتوب.
    */
    <Grid item key={type.id} xs={4} sx={{ minWidth: { xs: '120px', sm: 'auto' } }}>
      <Card 
        onClick={() => navigate(`/register/${type.id}`)}
        sx={{ 
          height: '100%', 
          mt: 1,
          textAlign: 'center', 
          cursor: 'pointer',
          bgcolor: type.color,
          border: `1px solid ${type.borderColor}`, // تقليل سمك البرواز للشاشات الصغيرة
          borderRadius: { xs: 2, md: 4 }, // زوايا أقل حدة في الموبايل
          transition: 'all 0.3s ease',
          '&:hover': { 
            transform: 'translateY(-5px)', 
            boxShadow: 4,
            borderColor: type.textColor 
          }
        }}
      >
        <CardContent sx={{ p: { xs: 1, md: 3 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* تصغير حجم دائرة الأيقونة في الشاشات الصغيرة */}
          <Box sx={{ 
            width: { xs: 40, md: 60 }, 
            height: { xs: 40, md: 60 }, 
            bgcolor: type.iconBg, 
            borderRadius: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: { xs: '1.2rem', md: '1.8rem' },
            color: 'white',
            mb: 1,
            boxShadow: 1
          }}>
            {type.icon}
          </Box>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              mb: 1, 
              fontFamily: 'serif',
              fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1.1rem' } 
            }}
          >
            {type.title}
          </Typography>

          {/* إخفاء الوصف في الموبايل الصغير جداً للحفاظ على المساحة أو تصغيره */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2, 
              display: { xs: 'none', sm: 'block' }, // يظهر فقط من أول التابلت
              fontSize: '0.8rem' 
            }}
          >
            {type.description}
          </Typography>
          
          <Button 
            endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.6rem !important' }} />}
            sx={{ 
              color: type.textColor, 
              fontWeight: 'bold', 
              textTransform: 'none',
              fontSize: { xs: '0.6rem', md: '0.8rem' },
              p: 0,
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
            }}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

          {/* 4. Information Alert Area */}
          <Box sx={{ 
            p: 3, 
            bgcolor: '#fffdf0', 
            border: '1px solid #ffeeba', 
            borderRadius: 2,
            mb: 5
          }}>
            <Box display="flex" alignItems="center" mb={1}>
              <WarningAmberIcon sx={{ color: '#ed6c02', mr: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Important Registration Information
              </Typography>
            </Box>
            <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 0.5, fontSize: '0.85rem', color: 'text.secondary' } }}>
              <li>All entities must provide valid accreditation or registration documents</li>
              <li>Registration requests are reviewed and verified by authorized personnel</li>
              <li>Email verification (OTP) is required during the registration process</li>
              <li>You will receive notification of approval or rejection via email</li>
              <li>Patient self-registration is not permitted on this platform</li>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* 5. Switch to Login */}
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Button 
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 'bold', textTransform: 'none', p: 0, minWidth: 'auto', ml: 0.5 }}
              >
                Sign in here
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterTypePage;

