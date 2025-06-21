import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    console.log("Form data", values);
    setTimeout(() => {
      const userData = {
        name: values.name,
        email: values.email,
      };

      login(userData);
      toast.success(
        `🎬 Welcome to Disney+, ${values.name}! Your account has been created successfully.`,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: "🕷️",
        }
      );
      setSubmitting(false);
      navigate("/");
    }, 400);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white relative overflow-hidden px-4"
      style={{
        background:
          "linear-gradient(45deg, #ff0000, #0000ff, #ff6b35, #f7931e)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 8s ease infinite",
      }}
    >
      {/* Animated overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-1000"></div>
      </div>

      <div className="relative z-10 w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] my-4 mx-auto max-w-[600px]">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl">🎬</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
              Join Disney+
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              Create your account to start streaming
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base ${
                      errors.name && touched.name
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-blue-400"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-400 text-xs sm:text-sm mt-1 flex items-center"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base ${
                      errors.email && touched.email
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/20 focus:border-blue-400"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400 text-xs sm:text-sm mt-1 flex items-center"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-white/10 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base ${
                        errors.password && touched.password
                          ? "border-red-400 focus:border-red-400"
                          : "border-white/20 focus:border-blue-400"
                      } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <HiEyeOff size={18} className="sm:w-5 sm:h-5" />
                      ) : (
                        <HiEye size={18} className="sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400 text-xs sm:text-sm mt-1 flex items-center"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-white/10 border rounded-lg text-white placeholder-gray-400 transition-all duration-300 text-sm sm:text-base ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-400 focus:border-red-400"
                          : "border-white/20 focus:border-blue-400"
                      } focus:outline-none focus:ring-2 focus:ring-blue-400/20`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <HiEyeOff size={18} className="sm:w-5 sm:h-5" />
                      ) : (
                        <HiEye size={18} className="sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-400 text-xs sm:text-sm mt-1 flex items-center"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>

                <div className="text-center">
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
