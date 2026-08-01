import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Profile() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  useEffect(() => {
    if (!user) return;

    const profileKey = `profile_${user.email}`;

    const savedProfile = JSON.parse(localStorage.getItem(profileKey)) || {};

    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: savedProfile.phone || "",
      address: savedProfile.address || "",
      city: savedProfile.city || "",
      state: savedProfile.state || "",
      pinCode: savedProfile.pinCode || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    const profileKey = `profile_${profile.email}`;
    localStorage.setItem(
      profileKey,
      JSON.stringify({
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        pinCode: profile.pinCode,
      }),
    );

    alert("Profile Updated Successfully");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <div className="flex flex-col items-center">
          <img
            src="https://ui-avatars.com/api/?name=User&background=22c55e&color=fff&size=150"
            alt=""
            className="w-36 h-36 rounded-full"
          />

          <h1 className="text-4xl font-bold mt-5">My Profile</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div>
            <label>Name</label>

            <input
              type="text"
              value={profile.name}
              disabled
              className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>City</label>

            <input
              type="text"
              name="city"
              value={profile.city}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>
        </div>

        <div className="mt-6">
          <label>Address</label>

          <textarea
            rows="4"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <label>State</label>

            <input
              type="text"
              name="state"
              value={profile.state}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>PIN Code</label>

            <input
              type="text"
              name="pinCode"
              value={profile.pinCode}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>
        </div>

        <button
          onClick={saveProfile}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
