import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../component/input/InputField";
import logo from "../../assets/logo.png";
import { createUser} from "../../services/auth";

// Define zones and states
const zones = {
  "North Central": ["Benue", "Kogi", "Kwara", "Nasarawa", "Niger", "Plateau", "FCT"],
  "North East": ["Adamawa", "Bauchi", "Borno", "Gombe", "Taraba", "Yobe"],
  "North West": ["Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Sokoto", "Zamfara"],
  "South East": ["Abia", "Anambra", "Ebonyi", "Enugu", "Imo"],
  "South South": ["Akwa Ibom", "Bayelsa", "Cross River", "Delta", "Edo", "Rivers"],
  "South West": ["Ekiti", "Lagos", "Ogun", "Ondo", "Osun", "Oyo"],
};

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    zone: "",
    state: "",
    localGovernment: "",
    address: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "zone") {
      // Reset state and LGA when zone changes
      setForm({ ...form, zone: value, state: "", localGovernment: "" });
    } else if (name === "state") {
      setForm({ ...form, state: value, localGovernment: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirm",
      "zone",
      "state",
      "localGovernment",
      "address",
      "phone",
    ];

    if (requiredFields.some((field) => !form[field])) {
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
      zone: form.zone,
      localGovernment: form.localGovernment,
      address: form.address,
      phone: form.phone,
    };

    console.log("Payload being sent to API:", payload);

    try {
      const response = await createUser(payload);
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
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl relative overflow-hidden h-[90%] flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-400 via-yellow-300 to-green-700 opacity-10 pointer-events-none"></div>
      
        <div className="relative z-10 flex flex-col flex-1 overflow-y-auto px-8 py-8">
          <div className="flex justify-center mb-6">
              <img src={logo} alt="Org Logo" className="w-16 h-16 object-contain" />
          </div>
          

          <h1 className="text-center text-3xl font-bold mb-8 text-green-700 tracking-tight">
            Register
          </h1>

          <form onSubmit={handleRegister} className="space-y-6">
            <InputField label="First Name" type="text" name="firstName" value={form.firstName} onChange={handleChange} />
            <InputField label="Last Name" type="text" name="lastName" value={form.lastName} onChange={handleChange} />
            <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} />

            {/* Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zone</label>
              <select
                name="zone"
                value={form.zone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[15px] p-3 text-base focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">Select Zone</option>
                {Object.keys(zones).map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                disabled={!form.zone}
                className="w-full border border-gray-300 rounded-[15px] p-3 text-base focus:ring-2 focus:ring-green-400 focus:outline-none"
              >
                <option value="">
                  {form.zone ? "Select State" : "Select a Zone first"}
                </option>
                {form.zone &&
                  zones[form.zone].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
            </div>

            {/* Local Government */}
            <InputField
              label="Local Government"
              type="text"
              name="localGovernment"
              value={form.localGovernment}
              onChange={handleChange}
              placeholder="Enter your LGA"
            />

            <InputField label="Address" type="text" name="address" value={form.address} onChange={handleChange} />
            <InputField label="Phone" type="text" name="phone" value={form.phone} onChange={handleChange} />
            <InputField label="Password" type="password" name="password" value={form.password} onChange={handleChange} />
            <InputField label="Confirm Password" type="password" name="confirm" value={form.confirm} onChange={handleChange} />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 text-lg rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Sign up
            </button>
          </form>

          <div className="text-center mt-5 space-y-1 relative z-10">
          <Link
            to="/login"
            className="text-sm text-green-600 hover:text-green-700 hover:underline transition"
          >
            Back to login 
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
