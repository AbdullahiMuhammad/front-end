import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../component/input/InputField";
import logo from "../../assets/logo.png";
import { signUp } from "../../services/auth";
import statesAndLGAs from "../../assets/data.js/states";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    state: "",
    localGov: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setForm({ ...form, state: value, localGov: "" }); // Reset LGA when state changes
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirm ||
      !form.state ||
      !form.localGov ||
      !form.address
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      state: form.state,
      localGov: form.localGov,
      address: form.address,
      phone: form.phone,
    };

    console.log("Payload being sent to API:", payload);

    try {
      const response = await signUp(payload);
      if (response.success) {
        toast.success(response.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 via-black to-yellow-500 px-4 py-8 overflow-y-auto">
      <div
        className="
          w-full 
          max-w-lg 
          bg-white 
          rounded-2xl 
          shadow-xl 
          relative 
          overflow-hidden 
          h-[90%] 
          md:h-[90%] 
          lg:h-[70%] 
          flex 
          flex-col
        "
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-green-400 via-yellow-300 to-green-700 opacity-10 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 overflow-y-auto px-8 py-8">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Org Logo" className="w-16 h-16 object-contain" />
          </div>

          <h1 className="text-center text-3xl font-bold mb-8 text-green-700 tracking-tight">
            Register
          </h1>

          <form onSubmit={handleRegister} className="space-y-6">
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="py-3 px-4 text-base"
            />

            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="py-3 px-4 text-base"
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="py-3 px-4 text-base"
            />

            {/* State Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[15px] p-3 text-base focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">Select State</option>
                {Object.keys(statesAndLGAs).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Local Government Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local Government
              </label>
              <select
                name="localGov"
                value={form.localGov}
                onChange={handleChange}
                disabled={!form.state}
                className="w-full border border-gray-300 rounded-[15px] p-3 text-base focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">
                  {form.state ? "Select Local Government" : "Select a State first"}
                </option>
                {form.state &&
                  statesAndLGAs[form.state].map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
              </select>
            </div>

            <InputField
              label="Address"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="py-3 px-4 text-base"
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="py-3 px-4 text-base"
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className="py-3 px-4 text-base"
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
