import * as Yup from "yup";

export const signup = Yup.object({
  fullname: Yup.string()
    .min(3, "minimum 3 charecter")
    .max(18, "maximum 18 charecter")
    .required("Please enter your full name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).max(10).required("Please enter your password"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null, "must be match"])
    .required("Please confirm your password"),
});

export const signin = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).max(10).required("Please enter your password"),
});

export const forgetValid = Yup.object({
  email: Yup.string()
    .email("your email is not valid")
    .required("Please enter your email"),
});
