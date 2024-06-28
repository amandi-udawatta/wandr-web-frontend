// src/validationSchemas/registerSchema.ts
import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  businessName: yup.string().required('Business Name is required'),

  businessImage: yup
    .mixed()
    .required('Business Image is required'),
    
  businessContact: yup
    .string()
    .matches(/^(07|01)\d{8}$/, 'Contact Number should have exactly 10 digits and start with 07 or 01')
    .required('Contact Number is required'),

  businessDescription: yup.string().required('Business Description is required'),

  ownerName: yup.string().required('Owner Name is required'),

  ownerContact: yup
    .string()
    .matches(/^(07|01)\d{8}$/, 'Contact Number should have exactly 10 digits')
    .required('Contact Number is required'),

  ownerNIC: yup
    .string()
    .matches(/^(\d{9}(X|V|x|v)|\d{12})$/,"NIC should be either 9 digits followed by X or V or exactly 12 digits")
    .required('NIC Number is required'),

  businessLocation: yup.string().required('Business Location is required'),

  businessAddress: yup.string().required('Business Address is required'),

  businessLanguages: yup
    .array()
    .of(yup.string().required('Each language is required'))
    .min(1, 'At least one language is required')
    .required('Business Language is required'),

  businessCategory: yup.string().required('Business Category is required'),
  
  businessServices: yup
    .array()
    .of(
      yup.object().shape({
        service: yup.string().required('Service is required'),
      })
    )
    .required('At least one service is required'),

  websiteURL: yup
    .string()
    .url('Must be a valid URL')
    .nullable(), // Optional field, can be null or an empty string

  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),

  confirmPassword: yup
  .string()
  .oneOf([yup.ref('password')], 'Passwords do not match')
  .required('Confirm Password is required'),

});
