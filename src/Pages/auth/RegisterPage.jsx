import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import AuthLayout from '../../Components/AuthLayout'; // Path from Pages/Auth/

// Validation Schema
const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.password, { message: "Required" });

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => console.log(data);

  return (
    <AuthLayout showBackButton={true}>
      <div className="text-center mb-4">
        <h3 className="fw-bold">Create Account</h3>
        <p className="text-muted">Register to access the HMS portal</p>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">First Name</Form.Label>
              <Form.Control 
                {...register("firstName")} 
                isInvalid={!!errors.firstName}
                placeholder="John" 
              />
              <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Last Name</Form.Label>
              <Form.Control 
                {...register("lastName")} 
                isInvalid={!!errors.lastName}
                placeholder="Doe" 
              />
              <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold">Email Address</Form.Label>
          <Form.Control 
            {...register("email")} 
            isInvalid={!!errors.email}
            placeholder="email@example.com" 
          />
          <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold">Password</Form.Label>
          <Form.Control 
            type="password"
            {...register("password")} 
            isInvalid={!!errors.password}
            placeholder="••••••••" 
          />
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 py-2 fw-bold shadow-sm">
          Register
        </Button>
      </Form>

      <div className="text-center mt-4">
        <span className="small text-muted">Already have an account? </span>
        <Button variant="link" className="p-0 small fw-bold text-decoration-none">Login</Button>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;