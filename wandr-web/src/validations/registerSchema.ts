// src/validationSchemas/registerSchema.ts
import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  businessName: yup.string().required('Business Name is required'),
  businessImage: yup.string().required('Business Image is required'),
  businessContact: yup
    .string()
    .matches(/^\d{10}$/, 'Contact Number should have exactly 10 digits')
    .required('Contact Number is required'),
  businessDescription: yup.string().required('Business Description is required'),

  ownerName: yup.string().required('Owner Name is required'),
  ownerContact: yup
    .string()
    .matches(/^\d{10}$/, 'Contact Number should have exactly 10 digits')
    .required('Contact Number is required'),
  ownerNIC: yup
    .string()
    .matches(/^\d{9,12}$/, 'NIC should have 9 to 12 digits')
    .required('NIC Number is required'),

  businessLocation: yup.string().required('Business Location is required'),
  businessAddress: yup.string().required('Business Address is required'),
  businessLanguages: yup
    .array()
    .of(yup.string().required('Each language is required'))
    .min(1, 'At least one language is required')
    .required('Business Language is required'),
  businessCategory: yup.string().required('Business Category is required'),
  businessServices: yup.array().of(
    yup.object().shape({
        service: yup.string().required('Service is required'), // Validation for each service item
    })
  ),

//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),

//   websiteURL: yup
//     .string()
//     .url('Must be a valid URL')
//     .nullable(), // Optional field, can be null or an empty string
});
