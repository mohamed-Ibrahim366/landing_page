import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Container 
} from '@mui/material';
import { 
  AccessTime as AccessTimeIcon, 
  DescriptionOutlined as DescriptionIcon,
  MailOutline as MailIcon 
} from '@mui/icons-material';

// If you have a custom AuthLayout, keep it. Otherwise, this Box serves as the wrapper.
const RegistrationSubmitted = () => {
  const [searchParams] = useSearchParams();
  const registrationType = (searchParams.get('registrationType') || '').toLowerCase();
  const entityType = searchParams.get('entityType') || '';
  const isProvider = registrationType === 'healthcare-provider';

  const entityLabel = isProvider
    ? 'Healthcare Provider'
    : entityType
      ? `${entityType} Center`
      : 'Registration';

  const entityLower = isProvider
    ? 'healthcare provider'
    : entityType
      ? `${entityType.toLowerCase()} center`
      : 'registration';

  const centerLabel = isProvider ? 'Provider name' : 'Center name';

  return (
    <Box sx={{ 
      bgcolor: '#f0f7f9', 
      minHeight: '100vh', 
      minWidth: '100vw', 
      px: 4, 
      py: 8, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      {/* Platform Header */}
      <Typography variant="h3" sx={{ fontFamily: 'serif', fontWeight: 'bold', mb: 1 }}>
        Sijill Medical Platform
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: 'serif', mb: 4 }}>
        {entityLabel} Registration
      </Typography>

      {/* Main Card */}
      <Box sx={{ 
        bgcolor: 'white', 
        borderRadius: 4, 
        p: 6, 
        width: '100%', 
        maxWidth: 900, 
        boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}>
        
        {/* Yellow Clock Icon */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 3 
        }}>
          <Box sx={{ 
            bgcolor: '#f9f3d1', 
            borderRadius: '50%', 
            p: 2, 
            display: 'inline-flex' 
          }}>
            <AccessTimeIcon sx={{ color: '#b28900', fontSize: 40 }} />
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'serif' }}>
          Registration Submitted
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Your {entityLower} registration is under review
        </Typography>

        {/* What happens next box */}
        <Box sx={{ 
          bgcolor: '#f4f6ec', 
          borderRadius: 3, 
          p: 4, 
          mb: 4, 
          border: '1px solid #d4d9c5',
          textAlign: 'left'
        }}>
          <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
            What happens next?
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ 
              bgcolor: '#e6a543', 
              color: 'white', 
              borderRadius: '50%', 
              width: 32, 
              height: 32, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mr: 2, 
              flexShrink: 0,
              fontWeight: 'bold'
            }}>1</Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>Document Verification</Typography>
              <Typography variant="body1" color="text.secondary">
                An authorized approver will review your registration and verify all submitted information.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box sx={{ 
              bgcolor: '#e6a543', 
              color: 'white', 
              borderRadius: '50%', 
              width: 32, 
              height: 32, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mr: 2, 
              flexShrink: 0,
              fontWeight: 'bold'
            }}>2</Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>Decision Notification</Typography>
              <Typography variant="body1" color="text.secondary">
                You will receive an email notification with the approval decision or rejection reasons.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Center Details Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ 
              bgcolor: '#f8f9fa', 
              p: 2, 
              borderRadius: 2, 
              display: 'flex', 
              alignItems: 'center',
              textAlign: 'left',
              width: '100%',
              maxWidth: 380
            }}>
              <DescriptionIcon sx={{ color: '#1976d2', mr: 2 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{centerLabel}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ 
              bgcolor: '#f8f9fa', 
              p: 2, 
              borderRadius: 2, 
              display: 'flex', 
              alignItems: 'center',
              textAlign: 'left',
              width: '100%',
              maxWidth: 380
            }}>
              <AccessTimeIcon sx={{ color: '#1976d2', mr: 2 }} />
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>status</Typography>
                <Typography variant="body2" sx={{ color: '#c37d45', fontWeight: 'bold' }}>
                  Pending Verification
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Email Note */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'text.secondary' }}>
          <MailIcon sx={{ fontSize: 20, mr: 1 }} />
          <Typography variant="body2">
            Check you email for updates on your registration status
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationSubmitted;
